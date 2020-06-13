package tel.schich.background.math

case class Vec3(x: Double, y: Double, z: Double) {
  def cross(other: Vec3): Vec3 = Vec3(
    this.y * other.z - this.z * other.y,
    this.z * other.x - this.x * other.z,
    this.x * other.y - this.y * other.x
  )

  @inline
  def dot(o: Vec3): Double = Vec3.dot(x, y, z)(o.x, o.y, o.z)
  def multiply(s: Double): Vec3 = Vec3(x * s, y * s, z * s)
  @inline
  def *(s: Double): Vec3 = multiply(s)
  def divide(s: Double): Vec3 = Vec3(x / s, y / s, z / s)
  @inline
  def /(s: Double): Vec3 = divide(s)

  def difference(o: Vec3): Vec3 = Vec3(x - o.x, y - o.y, z - o.z)
  @inline
  def -(o: Vec3): Vec3 = difference(o)
  def distanceSquared(o: Vec3): Double = {
    val d = o - this
    d.dot(d)
  }
  def distance(o: Vec3): Double = Math.sqrt(distanceSquared(o))
  def lengthSquared: Double = this.dot(this)
  def length: Double = Math.sqrt(lengthSquared)
  def normalized: Vec3 = this / length

  def add(o: Vec3): Vec3 = Vec3(x + o.x, y + o.y, z + o.z)
  @inline
  def +(o: Vec3): Vec3 = add(o)

  def vec2: Vec2 = Vec2(x, y)
  def vec4: Vec4 = vec4(0)
  def vec4(w: Double): Vec4 = Vec4(x, y, z, w)
}

object Vec3 {
  val Zero: Vec3 = apply(0, 0, 0)
  val One: Vec3 = apply(1, 1, 1)

  @inline
  def dot(ax: Double, ay: Double, az: Double)(bx: Double, by: Double, bz: Double): Double =
    ax * bx + ay * by + az * bz

  def random: Vec3 = Vec3(Math.random(), Math.random(), Math.random())
}
