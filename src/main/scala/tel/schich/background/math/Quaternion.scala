package tel.schich.background.math

case class Quaternion(w: Double, x: Double, y: Double, z: Double) {
  def multiply(o: Quaternion): Quaternion = Quaternion(
    x * o.w + w * o.x + y * o.z - z * o.y,
    y * o.w + w * o.y + z * o.x - x * o.z,
    z * o.w + w * o.z + x * o.y - y * o.x,
    w * o.w - x * o.x - y * o.y - z * o.z,
  )
  def *(o: Quaternion): Quaternion = multiply(o)
}
