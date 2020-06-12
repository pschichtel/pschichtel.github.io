package tel.schich

import org.scalajs.dom.raw.MouseEvent
import org.scalajs.dom.window
import org.scalajs.dom.window._

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
  }

}
