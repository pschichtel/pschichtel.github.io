package tel.schich.background.rendering

import java.util.regex.Pattern

import org.scalajs.dom.WebGLRenderingContext
import sttp.client3._

import scala.collection.mutable
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

case class Shader(vertex: String, fragment: String, inputs: Set[String], uniforms: Set[String])

object Shader {
  private val backend = FetchBackend()

  private val GLES3VersionRegex = "^\\s*#version\\s+3\\d\\d".r
  private val GLESInputsRegex = Pattern.compile("^\\s*attribute\\s+\\S+\\s+([^\\s;]+)\\s*;", Pattern.MULTILINE)
  private val GLES3InputsRegex = Pattern.compile("^\\s*in\\s+\\S+\\s+([^\\s;]+)\\s*;", Pattern.MULTILINE)
  private val GLESUniformRegex = Pattern.compile("^\\s*uniform\\s+\\S+\\s+([^\\s;]+)\\s*;", Pattern.MULTILINE)

  val ColoredPointShader: Shader = {
    val vert = """
      attribute vec4 vertexPosition;
      attribute vec4 color;

      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      uniform float size;

      varying vec4 pointColor;

      void main() {
        vec4 rounded = vec4(floor(vertexPosition.x + 0.5), floor(vertexPosition.y + 0.5), vertexPosition.z, vertexPosition.w);
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * rounded;
        gl_PointSize = size;
        pointColor = color.rgba;
      }
    """

    val frag = """
      varying mediump vec4 pointColor;

      void main() {
        gl_FragColor = pointColor;
      }
    """

    Shader(vert, frag)
  }

  def apply(vertex: String, fragment: String): Shader = {

    def extractSymbols(code: String, extractor: Pattern): Set[String] = {
      val matcher = extractor.matcher(code)
      val set = mutable.Set[String]()
      while (matcher.find()) {
        set.add(matcher.group(1))
      }
      set.toSet
    }

    val isGLES3 = GLES3VersionRegex.findFirstIn(vertex).orElse(GLES3VersionRegex.findFirstIn(fragment)).isDefined
    val inputs: Set[String] = extractSymbols(vertex, if (isGLES3) GLES3InputsRegex else GLESInputsRegex)
    val uniforms: Set[String] = extractSymbols(vertex, GLESUniformRegex)

    Shader(vertex, fragment, inputs, uniforms)
  }

  def loadShader(baseUrl: String): Future[Either[String, Shader]] =
    loadShader(s"$baseUrl.vert", s"$baseUrl.frag")

  def loadShader(vertexUrl: String, fragmentUrl: String): Future[Either[String, Shader]] = {
    Future.sequence(Seq(vertexUrl, fragmentUrl).map(ext => basicRequest.get(uri"$ext").send(backend))) map {
      case Seq(vertResponse, fragResponse) =>
        for {
          vert <- vertResponse.body
          frag <- fragResponse.body
        } yield {
          Shader(vert, frag)
        }
    }
  }

  def compileShader(shader: Shader)(implicit gl: WebGLRenderingContext): Either[String, ShaderProgram] =
    ShaderProgram(shader)

  def loadAndCompileShader(baseUrl: String)(implicit gl: WebGLRenderingContext): Future[Either[String, ShaderProgram]] =
    loadAndCompileShader(s"$baseUrl.vert", s"$baseUrl.frag")

  def loadAndCompileShader(vertexUrl: String, fragmentUrl: String)(implicit gl: WebGLRenderingContext): Future[Either[String, ShaderProgram]] = {
    loadShader(vertexUrl, fragmentUrl).map(_.flatMap(s => compileShader(s)))
  }
}
