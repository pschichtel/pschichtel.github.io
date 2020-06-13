package tel.schich.background

import org.scalajs.dom.raw.Window

import scala.concurrent.{Future, Promise}

object GameLoop {
  def loop[T](window: Window, start: T)(logic: (T, Double) => Option[T]): Future[T] = {

    def loop(window: Window, start: T, t0: Double, logic: (T, Double) => Option[T], promise: Promise[T]): Unit = {
      window.requestAnimationFrame(t1 => {
        val dt = (t1 - t0) / 1000
        logic(start, dt) match {
          case Some(next) => loop(window, next, t1, logic, promise)
          case _ => promise.success(start)
        }
      })
    }

    val p = Promise[T]()
    loop(window, start, window.performance.now(), logic, p)
    p.future
  }
}
