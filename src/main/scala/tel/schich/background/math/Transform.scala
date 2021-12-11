package tel.schich.background.math

class Transform(position: Vec3, scale: Vec3, rotation: Quaternion) {

  lazy val translationMatrix: Mat4 = Mat4.translation(position)
  lazy val scaleMatrix: Mat4 = Mat4.scale(scale)
  lazy val rotationMatrix: Mat4 = Mat4.rotation(rotation)
  lazy val matrix: Mat4 = scaleMatrix * rotationMatrix * translationMatrix

  def withPosition(newPosition: Vec3): Transform = new Transform(newPosition, scale, rotation)
  def withScale(newScale: Vec3): Transform = new Transform(position, newScale, rotation)
  def withRotation(newRotation: Quaternion): Transform = new Transform(position, scale, newRotation)

  def translate(v: Vec2): Transform = translate(v.vec3)
  def translate(v: Vec4): Transform = translate(v.vec3)
  def translate(v: Vec3): Transform = withPosition(position + v)

  def withEulerAngles(v: Vec3): Transform = withEulerAngles(v.x, v.y, v.z)
  def withEulerAngles(roll: Double, pitch: Double, yaw: Double): Transform = {
    val cy = Math.cos(yaw * 0.5)
    val sy = Math.sin(yaw * 0.5)
    val cp = Math.cos(pitch * 0.5)
    val sp = Math.sin(pitch * 0.5)
    val cr = Math.cos(roll * 0.5)
    val sr = Math.sin(roll * 0.5)

    withRotation(Quaternion(
      cy * cp * cr + sy * sp * sr,
      cy * cp * sr - sy * sp * cr,
      sy * cp * sr + cy * sp * cr,
      sy * cp * cr - cy * sp * sr,
    ))
  }

  def withAngleAxis(angle: Double, axis: Vec3): Transform = {
    val halfAngle = angle / 2.0
    val s = Math.sin(halfAngle)
    withRotation(Quaternion(Math.cos(halfAngle), axis.x * s, axis.y * s, axis.z * s))
  }

  def angleAxis: (Double, Vec3) = {
    val angle = 2.0 * Math.acos(rotation.w)
    if (angle == 0.0) {
      return (0, Vec3(0, 1, 0))
    }
    val s = Math.sqrt(1.0 - rotation.w * rotation.w)
    val x = rotation.x / s
    val y = rotation.y / s
    val z = rotation.z / s

    (angle, Vec3(x, y, z))
  }

  def eulerAngles: (Double, Double, Double) = {
    val sinRollCosPitch = 2.0 * (rotation.w * rotation.x + rotation.y * rotation.z)
    val cosRollCosPitch = 1.0 - 2.0 * (rotation.x * rotation.x + rotation.y * rotation.y)
    val roll = Math.atan2(sinRollCosPitch, cosRollCosPitch)

    val sinPitch = 2.0 * (rotation.w * rotation.y - rotation.z * rotation.x)
    val pitch =
      if (Math.abs(sinPitch) >= 1) Math.signum(sinPitch) * (Math.PI / 2.0) // use 90 degrees if out of range
      else Math.asin(sinPitch)


    val sinYawCosPitch = 2.0 * (rotation.w * rotation.z + rotation.x * rotation.y)
    val cosYawCosPitch = 1.0 - 2.0 * (rotation.y * rotation.y + rotation.z * rotation.z)
    val yaw = Math.atan2(sinYawCosPitch, cosYawCosPitch)

    (roll, pitch, yaw)
  }
}
