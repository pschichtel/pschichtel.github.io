package tel.schich.background.math

case class Mat4(_11: Double, _21: Double, _31: Double, _41: Double,
                _12: Double, _22: Double, _32: Double, _42: Double,
                _13: Double, _23: Double, _33: Double, _43: Double,
                _14: Double, _24: Double, _34: Double, _44: Double) {

  def multiply(o: Mat4): Mat4 = Mat4(
    Vec4.dot(_11, _21, _31, _41)(o._11, o._12, o._13, o._14), Vec4.dot(_11, _21, _31, _41)(o._21, o._22, o._23, o._24), Vec4.dot(_11, _21, _31, _41)(o._31, o._32, o._33, o._34), Vec4.dot(_11, _21, _31, _41)(o._41, o._42, o._43, o._44),
    Vec4.dot(_12, _22, _32, _42)(o._11, o._12, o._13, o._14), Vec4.dot(_12, _22, _32, _42)(o._21, o._22, o._23, o._24), Vec4.dot(_12, _22, _32, _42)(o._31, o._32, o._33, o._34), Vec4.dot(_12, _22, _32, _42)(o._41, o._42, o._43, o._44),
    Vec4.dot(_13, _23, _33, _43)(o._11, o._12, o._13, o._14), Vec4.dot(_13, _23, _33, _43)(o._21, o._22, o._23, o._24), Vec4.dot(_13, _23, _33, _43)(o._31, o._32, o._33, o._34), Vec4.dot(_13, _23, _33, _43)(o._41, o._42, o._43, o._44),
    Vec4.dot(_14, _24, _34, _44)(o._11, o._12, o._13, o._14), Vec4.dot(_14, _24, _34, _44)(o._21, o._22, o._23, o._24), Vec4.dot(_14, _24, _34, _44)(o._31, o._32, o._33, o._34), Vec4.dot(_14, _24, _34, _44)(o._41, o._42, o._43, o._44)
  )
  def *(other: Mat4): Mat4 = multiply(other)

  def multiply(s: Double): Mat4 = Mat4(
    _11 * s, _21 * s, _31 * s, _41 * s,
    _12 * s, _22 * s, _32 * s, _42 * s,
    _13 * s, _23 * s, _33 * s, _43 * s,
    _14 * s, _24 * s, _34 * s, _44 * s
  )
  def *(s: Double): Mat4 = multiply(s)

  def divide(s: Double): Mat4 = Mat4(
    _11 / s, _21 / s, _31 / s, _41 / s,
    _12 / s, _22 / s, _32 / s, _42 / s,
    _13 / s, _23 / s, _33 / s, _43 / s,
    _14 / s, _24 / s, _34 / s, _44 / s
  )
  def /(s: Double): Mat4 = divide(s)

  def multiply(v: Vec4): Vec4 = Vec4(
    Vec4.dot(_11, _21, _31, _41)(v.x, v.y, v.z, v.w),
    Vec4.dot(_12, _22, _32, _42)(v.x, v.y, v.z, v.w),
    Vec4.dot(_13, _23, _33, _43)(v.x, v.y, v.z, v.w),
    Vec4.dot(_14, _24, _34, _44)(v.x, v.y, v.z, v.w)
  )
  def *(v: Vec4): Vec4 = multiply(v)

  def transposed: Mat4 = Mat4(
    _11, _12, _13, _14,
    _21, _22, _23, _24,
    _31, _32, _33, _34,
    _41, _42, _43, _44
  )

  def inverted: Mat4 = {
    val a = this
    
    val b = Mat4(
      a._22 * a._33 * a._44 - a._22 * a._34 * a._43 - a._32 * a._23 * a._44 + a._32 * a._24 * a._43 + a._42 * a._23 * a._34 - a._42 * a._24 * a._33,
      -a._21 * a._33 * a._44 + a._21 * a._34 * a._43 + a._31 * a._23 * a._44 - a._31 * a._24 * a._43 - a._41 * a._23 * a._34 + a._41 * a._24 * a._33,
      a._21 * a._32 * a._44 - a._21 * a._34 * a._42 - a._31 * a._22 * a._44 + a._31 * a._24 * a._42 + a._41 * a._22 * a._34 - a._41 * a._24 * a._32,
      -a._21 * a._32 * a._43 + a._21 * a._33 * a._42 + a._31 * a._22 * a._43 - a._31 * a._23 * a._42 - a._41 * a._22 * a._33 + a._41 * a._23 * a._32,

      -a._12 * a._33 * a._44 + a._12 * a._34 * a._43 + a._32 * a._13 * a._44 - a._32 * a._14 * a._43 - a._42 * a._13 * a._34 + a._42 * a._14 * a._33,
      a._11 * a._33 * a._44 - a._11 * a._34 * a._43 - a._31 * a._13 * a._44 + a._31 * a._14 * a._43 + a._41 * a._13 * a._34 - a._41 * a._14 * a._33,
      -a._11 * a._32 * a._44 + a._11 * a._34 * a._42 + a._31 * a._12 * a._44 - a._31 * a._14 * a._42 - a._41 * a._12 * a._34 + a._41 * a._14 * a._32,
      a._11 * a._32 * a._43 - a._11 * a._33 * a._42 - a._31 * a._12 * a._43 + a._31 * a._13 * a._42 + a._41 * a._12 * a._33 - a._41 * a._13 * a._32,

      a._12 * a._23 * a._44 - a._12 * a._24 * a._43 - a._22 * a._13 * a._44 + a._22 * a._14 * a._43 + a._42 * a._13 * a._24 - a._42 * a._14 * a._23,
      -a._11 * a._23 * a._44 + a._11 * a._24 * a._43 + a._21 * a._13 * a._44 - a._21 * a._14 * a._43 - a._41 * a._13 * a._24 + a._41 * a._14 * a._23,
      a._11 * a._22 * a._44 - a._11 * a._24 * a._42 - a._21 * a._12 * a._44 + a._21 * a._14 * a._42 + a._41 * a._12 * a._24 - a._41 * a._14 * a._22,
      -a._11 * a._22 * a._43 + a._11 * a._23 * a._42 + a._21 * a._12 * a._43 - a._21 * a._13 * a._42 - a._41 * a._12 * a._23 + a._41 * a._13 * a._22,

      -a._12 * a._23 * a._34 + a._12 * a._24 * a._33 + a._22 * a._13 * a._34 - a._22 * a._14 * a._33 - a._32 * a._13 * a._24 + a._32 * a._14 * a._23,
      a._11 * a._23 * a._34 - a._11 * a._24 * a._33 - a._21 * a._13 * a._34 + a._21 * a._14 * a._33 + a._31 * a._13 * a._24 - a._31 * a._14 * a._23,
      -a._11 * a._22 * a._34 + a._11 * a._24 * a._32 + a._21 * a._12 * a._34 - a._21 * a._14 * a._32 - a._31 * a._12 * a._24 + a._31 * a._14 * a._22,
      a._11 * a._22 * a._33 - a._11 * a._23 * a._32 - a._21 * a._12 * a._33 + a._21 * a._13 * a._32 + a._31 * a._12 * a._23 - a._31 * a._13 * a._22
    )

    val det = a._11 * b._11 + a._21 * b._12 + a._31 * b._13 + a._41 * b._14

    b / det
  }
}

object Mat4 {
  val Identity: Mat4 = Mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  )

  def perspectiveProjection(fieldOfViewYInRadians: Double, aspect: Double, near: Double, far: Double): Mat4 = {
    val f = Math.tan((Math.PI / 2) - (fieldOfViewYInRadians / 2));
    val rangeInv = 1.0 / (near - far);

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






