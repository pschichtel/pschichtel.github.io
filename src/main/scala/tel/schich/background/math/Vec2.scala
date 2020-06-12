package tel.schich.background.math

case class Vec2(x: Double, y: Double) {
  @inline
  def dot(o: Vec2): Double = Vec2.dot(x, y)(o.x, o.y)
  def multiply(s: Double): Vec2 = Vec2(x * s, y * s)
  @inline
  def *(s: Double): Vec2 = multiply(s)
  def divide(s: Double): Vec2 = Vec2(x / s, y / s)
  @inline
  def /(s: Double): Vec2 = divide(s)

  def difference(o: Vec2): Vec2 = Vec2(x - o.x, y - o.y)
  @inline
  def -(o: Vec2): Vec2 = difference(o)
  def distanceSquared(o: Vec2): Double = {
    val d = o - this
    d.dot(d)
  }
  def distance(o: Vec2): Double = Math.sqrt(distanceSquared(o))
  def lengthSquared: Double = this.dot(this)
  def length: Double = Math.sqrt(lengthSquared)
  def normalized: Vec2 = this / length

  def add(o: Vec2): Vec2 = Vec2(x + o.x, y + o.y)
  @inline
  def +(o: Vec2): Vec2 = add(o)

  def vec3: Vec3 = vec3(0)
  def vec3(z: Double): Vec3 = Vec3(x, y, z)
  def vec4: Vec4 = vec4(0, 0)
  def vec4(z: Double, w: Double): Vec4 = Vec4(x, y, z, w)
}

object Vec2 {
  val Zero: Vec2 = apply(0, 0)
  val One: Vec2 = apply(1, 1)

  @inline
  def dot(ax: Double, ay: Double)(bx: Double, by: Double): Double =
    ax * bx + ay * by
}
