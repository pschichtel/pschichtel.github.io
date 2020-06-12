package tel.schich.background.math

object Vec {
  def apply(x: Double, y: Double): Vec2 = Vec2(x, y)
  def apply(x: Double, y: Double, z: Double): Vec3 = Vec3(x, y, z)
  def apply(x: Double, y: Double, z: Double, w: Double): Vec4 = Vec4(x, y, z, w)
}
