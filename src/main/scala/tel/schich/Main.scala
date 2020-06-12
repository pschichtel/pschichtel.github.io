package tel.schich

import org.scalajs.dom.window

object Main {

  def main(args: Array[String]): Unit = {
    println("Hello World!")

    window.alert("Test!")

    CvLogic.doThings()
  }

}

