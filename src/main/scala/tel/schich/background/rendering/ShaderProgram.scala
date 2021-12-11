package tel.schich.background.rendering

import org.scalajs.dom.{WebGLProgram, WebGLRenderingContext, WebGLShader, WebGLUniformLocation}

case class ShaderProgram(source: Shader, program: WebGLProgram, inputLocations: Map[String, Int], uniformLocations: Map[String, WebGLUniformLocation]) {
  def delete()(implicit gl: WebGLRenderingContext): Boolean = {
    gl.deleteProgram(program)
    if (gl.getProgramParameter(program, WebGLRenderingContext.DELETE_STATUS).asInstanceOf[Boolean]) {
      true
    } else {
      println(gl.getProgramInfoLog(program))
      false
    }
  }
}

object ShaderProgram {

  private def compileShader(source: String, shaderType: Int)(implicit gl: WebGLRenderingContext): Either[String, WebGLShader] = {
    val shader = gl.createShader(shaderType)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS).asInstanceOf[Boolean]) {
      Right(shader)
    } else {
      val log = gl.getShaderInfoLog(shader)
      gl.deleteShader(shader)
      Left(log)
    }
  }

  private def linkProgram(vertex: WebGLShader, fragment: WebGLShader)(implicit gl: WebGLRenderingContext): Either[String, WebGLProgram] = {
    val program = gl.createProgram()
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)

    if (gl.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS).asInstanceOf[Boolean]) {
      Right(program)
    } else {
      val log = gl.getProgramInfoLog(program)
      gl.deleteProgram(program)
      Left(log)
    }

  }

  def apply(shader: Shader)(implicit gl: WebGLRenderingContext): Either[String, ShaderProgram] = {
    for {
      vertexShader <- compileShader(shader.vertex, WebGLRenderingContext.VERTEX_SHADER)
      fragmentShader <- compileShader(shader.fragment, WebGLRenderingContext.FRAGMENT_SHADER)
      program <- linkProgram(vertexShader, fragmentShader)
    } yield {
      val inputLocations = shader.inputs.map(i => (i, gl.getAttribLocation(program, i))).toMap
      val uniformLocation = shader.uniforms.map(u => (u, gl.getUniformLocation(program, u))).toMap
      ShaderProgram(shader, program, inputLocations, uniformLocation)
    }
  }
}
