package tel.schich

import org.scalajs.dom.raw.{HTMLCanvasElement, MouseEvent, WebGLRenderingContext}
import org.scalajs.dom.window
import org.scalajs.dom.window._
import tel.schich.background.GameLoop
import tel.schich.background.math.{QuadTree, Vec2}
import tel.schich.background.rendering.{Shader, ShaderProgram}

import scala.concurrent.ExecutionContext.Implicits.global

object CvLogic {

  def doThings(): Unit = {
    val name = document.querySelector("section#aboutme address > div:first-of-type").innerHTML
    val emailAddress = name.toLowerCase.replace(' ', '@').replaceAll("(tel)$", ".$1")

    val emailLinks = document.querySelectorAll("a.email")

    for (i <- 0 until emailLinks.length) {
      val link = emailLinks(i)
      link.innerText = emailAddress
      link.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault()
        window.location.href = s"mailto:$emailAddress"
      })
    }



    val canvas = document.querySelector("canvas").asInstanceOf[HTMLCanvasElement]
    implicit val gl = canvas.getContext("webgl").asInstanceOf[WebGLRenderingContext]

    ShaderProgram(Shader.ColoredPointShader).foreach(println)


    GameLoop.loop(window, Vector.empty[Vec2]) { (objects, dt) =>
      val tree = QuadTree((Vec2(-1, 1), Vec2(1, -1)), objects, 10)

      if (objects.size >= 100) None
      else Some(objects :+ Vec2.random)
    }
  }

}
