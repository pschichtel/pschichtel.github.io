package tel.schich.background.math

case class Mat4(v11: Double, v21: Double, v31: Double, v41: Double,
                v12: Double, v22: Double, v32: Double, v42: Double,
                v13: Double, v23: Double, v33: Double, v43: Double,
                v14: Double, v24: Double, v34: Double, v44: Double) {

  def multiply(o: Mat4): Mat4 = Mat4(
    Vec4.dot(v11, v21, v31, v41)(o.v11, o.v12, o.v13, o.v14), Vec4.dot(v11, v21, v31, v41)(o.v21, o.v22, o.v23, o.v24), Vec4.dot(v11, v21, v31, v41)(o.v31, o.v32, o.v33, o.v34), Vec4.dot(v11, v21, v31, v41)(o.v41, o.v42, o.v43, o.v44),
    Vec4.dot(v12, v22, v32, v42)(o.v11, o.v12, o.v13, o.v14), Vec4.dot(v12, v22, v32, v42)(o.v21, o.v22, o.v23, o.v24), Vec4.dot(v12, v22, v32, v42)(o.v31, o.v32, o.v33, o.v34), Vec4.dot(v12, v22, v32, v42)(o.v41, o.v42, o.v43, o.v44),
    Vec4.dot(v13, v23, v33, v43)(o.v11, o.v12, o.v13, o.v14), Vec4.dot(v13, v23, v33, v43)(o.v21, o.v22, o.v23, o.v24), Vec4.dot(v13, v23, v33, v43)(o.v31, o.v32, o.v33, o.v34), Vec4.dot(v13, v23, v33, v43)(o.v41, o.v42, o.v43, o.v44),
    Vec4.dot(v14, v24, v34, v44)(o.v11, o.v12, o.v13, o.v14), Vec4.dot(v14, v24, v34, v44)(o.v21, o.v22, o.v23, o.v24), Vec4.dot(v14, v24, v34, v44)(o.v31, o.v32, o.v33, o.v34), Vec4.dot(v14, v24, v34, v44)(o.v41, o.v42, o.v43, o.v44)
  )
  def *(other: Mat4): Mat4 = multiply(other)

  def multiply(s: Double): Mat4 = Mat4(
    v11 * s, v21 * s, v31 * s, v41 * s,
    v12 * s, v22 * s, v32 * s, v42 * s,
    v13 * s, v23 * s, v33 * s, v43 * s,
    v14 * s, v24 * s, v34 * s, v44 * s
  )
  def *(s: Double): Mat4 = multiply(s)

  def divide(s: Double): Mat4 = Mat4(
    v11 / s, v21 / s, v31 / s, v41 / s,
    v12 / s, v22 / s, v32 / s, v42 / s,
    v13 / s, v23 / s, v33 / s, v43 / s,
    v14 / s, v24 / s, v34 / s, v44 / s
  )
  def /(s: Double): Mat4 = divide(s)

  def multiply(v: Vec4): Vec4 = Vec4(
    Vec4.dot(v11, v21, v31, v41)(v.x, v.y, v.z, v.w),
    Vec4.dot(v12, v22, v32, v42)(v.x, v.y, v.z, v.w),
    Vec4.dot(v13, v23, v33, v43)(v.x, v.y, v.z, v.w),
    Vec4.dot(v14, v24, v34, v44)(v.x, v.y, v.z, v.w)
  )
  def *(v: Vec4): Vec4 = multiply(v)

  def transposed: Mat4 = Mat4(
    v11, v12, v13, v14,
    v21, v22, v23, v24,
    v31, v32, v33, v34,
    v41, v42, v43, v44
  )

  def inverted: Mat4 = {
    val a = this

    val b = Mat4(
      a.v22 * a.v33 * a.v44 - a.v22 * a.v34 * a.v43 - a.v32 * a.v23 * a.v44 + a.v32 * a.v24 * a.v43 + a.v42 * a.v23 * a.v34 - a.v42 * a.v24 * a.v33,
      -a.v21 * a.v33 * a.v44 + a.v21 * a.v34 * a.v43 + a.v31 * a.v23 * a.v44 - a.v31 * a.v24 * a.v43 - a.v41 * a.v23 * a.v34 + a.v41 * a.v24 * a.v33,
      a.v21 * a.v32 * a.v44 - a.v21 * a.v34 * a.v42 - a.v31 * a.v22 * a.v44 + a.v31 * a.v24 * a.v42 + a.v41 * a.v22 * a.v34 - a.v41 * a.v24 * a.v32,
      -a.v21 * a.v32 * a.v43 + a.v21 * a.v33 * a.v42 + a.v31 * a.v22 * a.v43 - a.v31 * a.v23 * a.v42 - a.v41 * a.v22 * a.v33 + a.v41 * a.v23 * a.v32,

      -a.v12 * a.v33 * a.v44 + a.v12 * a.v34 * a.v43 + a.v32 * a.v13 * a.v44 - a.v32 * a.v14 * a.v43 - a.v42 * a.v13 * a.v34 + a.v42 * a.v14 * a.v33,
      a.v11 * a.v33 * a.v44 - a.v11 * a.v34 * a.v43 - a.v31 * a.v13 * a.v44 + a.v31 * a.v14 * a.v43 + a.v41 * a.v13 * a.v34 - a.v41 * a.v14 * a.v33,
      -a.v11 * a.v32 * a.v44 + a.v11 * a.v34 * a.v42 + a.v31 * a.v12 * a.v44 - a.v31 * a.v14 * a.v42 - a.v41 * a.v12 * a.v34 + a.v41 * a.v14 * a.v32,
      a.v11 * a.v32 * a.v43 - a.v11 * a.v33 * a.v42 - a.v31 * a.v12 * a.v43 + a.v31 * a.v13 * a.v42 + a.v41 * a.v12 * a.v33 - a.v41 * a.v13 * a.v32,

      a.v12 * a.v23 * a.v44 - a.v12 * a.v24 * a.v43 - a.v22 * a.v13 * a.v44 + a.v22 * a.v14 * a.v43 + a.v42 * a.v13 * a.v24 - a.v42 * a.v14 * a.v23,
      -a.v11 * a.v23 * a.v44 + a.v11 * a.v24 * a.v43 + a.v21 * a.v13 * a.v44 - a.v21 * a.v14 * a.v43 - a.v41 * a.v13 * a.v24 + a.v41 * a.v14 * a.v23,
      a.v11 * a.v22 * a.v44 - a.v11 * a.v24 * a.v42 - a.v21 * a.v12 * a.v44 + a.v21 * a.v14 * a.v42 + a.v41 * a.v12 * a.v24 - a.v41 * a.v14 * a.v22,
      -a.v11 * a.v22 * a.v43 + a.v11 * a.v23 * a.v42 + a.v21 * a.v12 * a.v43 - a.v21 * a.v13 * a.v42 - a.v41 * a.v12 * a.v23 + a.v41 * a.v13 * a.v22,

      -a.v12 * a.v23 * a.v34 + a.v12 * a.v24 * a.v33 + a.v22 * a.v13 * a.v34 - a.v22 * a.v14 * a.v33 - a.v32 * a.v13 * a.v24 + a.v32 * a.v14 * a.v23,
      a.v11 * a.v23 * a.v34 - a.v11 * a.v24 * a.v33 - a.v21 * a.v13 * a.v34 + a.v21 * a.v14 * a.v33 + a.v31 * a.v13 * a.v24 - a.v31 * a.v14 * a.v23,
      -a.v11 * a.v22 * a.v34 + a.v11 * a.v24 * a.v32 + a.v21 * a.v12 * a.v34 - a.v21 * a.v14 * a.v32 - a.v31 * a.v12 * a.v24 + a.v31 * a.v14 * a.v22,
      a.v11 * a.v22 * a.v33 - a.v11 * a.v23 * a.v32 - a.v21 * a.v12 * a.v33 + a.v21 * a.v13 * a.v32 + a.v31 * a.v12 * a.v23 - a.v31 * a.v13 * a.v22
    )

    val det = a.v11 * b.v11 + a.v21 * b.v12 + a.v31 * b.v13 + a.v41 * b.v14

    b / det
  }
}

object Mat4 {
  val Identity: Mat4 = Mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  )

  def perspectiveProjection(fieldOfViewYInRadians: Double, aspect: Double, near: Double, far: Double): Mat4 = {
    val f = Math.tan((Math.PI / 2) - (fieldOfViewYInRadians / 2))
    val rangeInv = 1.0 / (near - far)

    Mat4(
      f / aspect, 0, 0,                         0,
      0,          f, 0,                         0,
      0,          0, (near + far) * rangeInv,   -1,
      0,          0, near * far * rangeInv * 2, 0
    )
  }

  def orthographicProjection(left: Double, right: Double, top: Double, bottom: Double, near: Double, far: Double): Mat4 = Mat4(
    2/(right - left),                 0,                                0,                            0,
    0,                                2/(top - bottom),                 0,                            0,
    0,                                0,                                2/(far - near),               0,
    -((right + left)/(right - left)), -((top + bottom)/(top - bottom)), -((far + near)/(far - near)), 1
  )

  def orthographicProjection(width: Double, height: Double, depth: Double): Mat4 = Mat4(
    2 / width, 0,          0,         0,
    0,         2 / height, 0,         0,
    0,         0,          2 / depth, 0,
    0,         0,          0,         1
  )

  def translation(v: Vec3): Mat4 = translation(v.x, v.y, v.z)
  def translation(v: Vec4): Mat4 = translation(v.x, v.y, v.z)
  def translation(x: Double, y: Double, z: Double): Mat4 = Mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  )

  def scale(v: Vec3): Mat4 = scale(v.x, v.y, v.z)
  def scale(v: Vec4): Mat4 = scale(v.x, v.y, v.z)
  def scale(x: Double, y: Double, z: Double): Mat4 = Mat4(
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  )


  def rotation(q: Quaternion): Mat4 = rotation(q.w, q.x, q.y, q.z)
  def rotation(v: Vec4): Mat4 = rotation(v.w, v.x, v.y, v.z)
  def rotation(w: Double, x: Double, y: Double, z: Double): Mat4 = Mat4(
    1 - 2 * (y * y + z * z), 2 * (x * y - z * w),     2 * (x * z + y * w),     0,
    2 * (x * y + z * w),     1 - 2 * (x * x + z * z), 2 * (y * z - x * w),     0,
    2 * (x * z - y * w),     2 * (y * z + x * z),     1 - 2 * (x * x + y * y), 0,
    0,                       0,                       0,                       1
  ).transposed
}






