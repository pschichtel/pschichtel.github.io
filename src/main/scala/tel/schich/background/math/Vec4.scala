package tel.schich.background.math

case class Vec4(x: Double, y: Double, z: Double, w: Double) {
  @inline
  def dot(o: Vec4): Double = Vec4.dot(x, y, z, w)(o.x, o.y, o.z, o.w)
  def multiply(s: Double): Vec4 = Vec4(x * s, y * s, z * s, w * s)
  @inline
  def *(s: Double): Vec4 = multiply(s)
  def divide(s: Double): Vec4 = Vec4(x / s, y / s, z / s, w / s)
  @inline
  def /(s: Double): Vec4 = divide(s)

  def difference(o: Vec4): Vec4 = Vec4(x - o.x, y - o.y, z - o.z, w - o.w)
  @inline
  def -(o: Vec4): Vec4 = difference(o)
  def distanceSquared(o: Vec4): Double = {
    val d = o - this
    d.dot(d)
  }
  def distance(o: Vec4): Double = Math.sqrt(distanceSquared(o))
  def lengthSquared: Double = this.dot(this)
  def length: Double = Math.sqrt(lengthSquared)
  def normalized: Vec4 = this / length

  def add(o: Vec4): Vec4 = Vec4(x + o.x, y + o.y, z + o.z, w + o.w)
  @inline
  def +(o: Vec4): Vec4 = add(o)

  def vec2: Vec2 = Vec2(x, y)
  def vec3: Vec3 = Vec3(x, y, z)
  def quaternion: Quaternion = Quaternion(w, x, y, z)
}

object Vec4 {
  val Zero: Vec4 = apply(0, 0, 0, 0)
  val One: Vec4 = apply(1, 1, 1, 1)

  @inline
  def dot(ax: Double, ay: Double, az: Double, aw: Double)(bx: Double, by: Double, bz: Double, bw: Double): Double =
    ax * bx + ay * by + az * bz + aw * bw
}
