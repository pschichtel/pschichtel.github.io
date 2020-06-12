package tel.schich.background.math

import tel.schich.background.math.QuadTree.{Bounds, Forest}

import scala.annotation.tailrec

sealed trait QuadTree {
  def contains(point: Vec2): Boolean

  def selectRect(bounds: Bounds): LazyList[Vec2]

  def selectCircle(center: Vec2, radius: Double): LazyList[Vec2] = {
    val tl = Vec2(center.x - radius, center.y + radius)
    val br = Vec2(center.x + radius, center.y - radius)
    val radiusSqr = radius * radius
    selectRect((tl, br)).filter(v => v.distanceSquared(center) <= radiusSqr)
  }
}

object QuadTree {
  type Bounds = (Vec2, Vec2)
  type Forest = (QuadTree, QuadTree, QuadTree, QuadTree)

  def rectContains(p: Vec2, bounds: Bounds): Boolean =
    p.x >= bounds._1.x && p.x < bounds._2.x && p.y <= bounds._1.y && p.y > bounds._2.y

  def rectsOverlap(a: Bounds, b: Bounds): Boolean =
    if (a._1.x > b._2.x || b._1.x > a._2.x) false
    else if (a._1.y < b._2.y || b._1.y < a._2.y) false
    else true

  def apply(bounds: Bounds, points: Seq[Vec2], limit: Int = 20): QuadTree = {
    def cluster(bounds: Bounds, points: Seq[Vec2]): Forest = {

      val (tl, br) = bounds

      val midX = tl.x + (br.x - tl.x) / 2.0
      val midY = tl.y - (tl.y - br.y) / 2.0

      val topCenter = Vec2(midX, tl.y)
      val leftCenter = Vec2(tl.x, midY)
      val middleCenter = Vec2(midX, midY)
      val rightCenter = Vec2(br.x, midY)
      val bottomCenter = Vec2(midX, br.y)

      val topLeftBounds = (tl, middleCenter)
      val topRightBounds = (topCenter, rightCenter)
      val bottomLeftBounds = (leftCenter, bottomCenter)
      val bottomRightBounds = (middleCenter, br)

      val (topLeftPoints, topRightPoints, bottomLeftPoints, bottomRightPoints) =
        splitPoints(points, topLeftBounds, Vector.empty, topRightBounds, Vector.empty, bottomLeftBounds, Vector.empty, bottomRightBounds, Vector.empty)

      (makeTree(topLeftBounds, topLeftPoints, limit), makeTree(topRightBounds, topRightPoints, limit),
        makeTree(bottomLeftBounds, bottomLeftPoints, limit), makeTree(bottomRightBounds, bottomRightPoints, limit))
    }

    @inline
    def makeTree(bounds: Bounds, points: Seq[Vec2], limit: Int): QuadTree = {
      if (points.isEmpty) QuadTreeEmpty
      else if (points.length <= limit) QuadTreeLeaf(bounds, points)
      else QuadTreeForest(bounds, cluster(bounds, points))
    }

    @tailrec
    def splitPoints(points: Seq[Vec2], tlBounds: Bounds, tlPoints: Vector[Vec2], trBounds: Bounds, trPoints: Vector[Vec2], blBounds: Bounds, blPoints: Vector[Vec2], brBounds: Bounds, brPoints: Vector[Vec2]): (Seq[Vec2], Seq[Vec2], Seq[Vec2], Seq[Vec2]) = {
      if (points.isEmpty) (tlPoints, trPoints, blPoints, brPoints)
      else {
        val point = points.head
        val rest = points.tail
        if (rectContains(point, tlBounds)) splitPoints(rest, tlBounds, tlPoints :+ point, trBounds, trPoints, blBounds, blPoints, brBounds, brPoints)
        else if (rectContains(point, trBounds)) splitPoints(rest, tlBounds, tlPoints, trBounds, trPoints :+ point, blBounds, blPoints, brBounds, brPoints)
        else if (rectContains(point, blBounds)) splitPoints(rest, tlBounds, tlPoints, trBounds, trPoints, blBounds, blPoints :+ point, brBounds, brPoints)
        else if (rectContains(point, brBounds)) splitPoints(rest, tlBounds, tlPoints, trBounds, trPoints, blBounds, blPoints, brBounds, brPoints :+ point)
        else splitPoints(rest, tlBounds, tlPoints, trBounds, trPoints, blBounds, blPoints, brBounds, brPoints)
      }
    }

    QuadTreeForest(bounds, cluster(bounds, points))
  }
}

case object QuadTreeEmpty extends QuadTree {
  override def contains(point: Vec2): Boolean = false

  override def selectRect(bounds: (Vec2, Vec2)): LazyList[Vec2] = LazyList.empty
}

final case class QuadTreeForest(bounds: Bounds, forest: Forest) extends QuadTree {
  val quadrants: Seq[QuadTree] = Seq(forest._1, forest._2, forest._3, forest._4)


  override def contains(point: Vec2): Boolean = {
    if (forest._1.contains(point)) true
    else if (forest._2.contains(point)) true
    else if (forest._3.contains(point)) true
    else if (forest._4.contains(point)) true
    else false
  }

  override def selectRect(bounds: (Vec2, Vec2)): LazyList[Vec2] =
    quadrants.map(_.selectRect(bounds)).foldLeft(LazyList.empty[Vec2])(_ ++ _)
}

final case class QuadTreeLeaf(bounds: Bounds, points: Seq[Vec2]) extends QuadTree {
  override def selectRect(bounds: (Vec2, Vec2)): LazyList[Vec2] =
    if (QuadTree.rectsOverlap(this.bounds, bounds)) points.to(LazyList).filter(p => QuadTree.rectContains(p, bounds))
    else LazyList.empty

  override def contains(point: Vec2): Boolean =
    QuadTree.rectContains(point, bounds)
}