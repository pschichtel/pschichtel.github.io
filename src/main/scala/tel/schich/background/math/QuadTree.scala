package tel.schich.background.math

import scala.collection.mutable.Stack
import scala.collection.mutable.ArrayBuffer
import scala.collection.mutable.HashMap
import scala.collection.mutable.HashSet

/*
  This is all based on https://stackoverflow.com/questions/41946007/efficient-and-well-explained-implementation-of-a-quadtree-for-2d-collision-det
*/

case class QuadTreeNodeData(
    val index: Int,
    val depth: Int,
    val middleX: Float,
    val middleY: Float,
    val halfWidth: Float,
    val halfHeight: Float
)
case class QuadTreeNode(val firstChild: Int, val count: Int)
case class QuadTreeElement(
    val id: Int,
    val left: Float,
    top: Float,
    right: Float,
    bottom: Float
)
type QuadTreeElementNode = List[Int]

class QuadTree(
    center: Vec2,
    halfSize: Vec2,
    val maxDepth: Int,
    val maxLeafSize: Int
) {
  private val nodes = ArrayBuffer(QuadTreeNode(-1, -1))
  private val leaves = ArrayBuffer[QuadTreeElementNode]()
  private val elements = ArrayBuffer[QuadTreeElement]()
  private val elementNodes = HashMap[Int, QuadTreeElementNode]()
  private var elementNodeNextIndex = 0
  private val rootData = QuadTreeNodeData(
    0,
    0,
    center.x.toFloat,
    center.y.toFloat,
    halfSize.x.toFloat,
    halfSize.y.toFloat
  )

  def query(topLeft: Vec2, bottomRight: Vec2): IndexedSeq[Int] = query(topLeft, bottomRight, -1)

  def query(topLeft: Vec2, bottomRight: Vec2, omitElement: Int): IndexedSeq[Int] =
    query(topLeft.x.toFloat, topLeft.y.toFloat, bottomRight.x.toFloat, bottomRight.y.toFloat, omitElement)

  private def query(left: Float, top: Float, right: Float, bottom: Float, omitElement: Int): IndexedSeq[Int] = {
    val leaves = findLeaves(rootData, left, top, right, bottom)

    val seen = HashSet[Int]()
    val out = ArrayBuffer[Int]()

    for (leafData <- leaves) {
      val node = nodes(leafData.index)
      val firstChild = node.firstChild
      if (firstChild != -1) {
        for (elementIndex <- elementNodes(firstChild)) {
          val element = elements(elementIndex)
          if (!seen.contains(element.id) && (element.id != omitElement || omitElement == -1) && intersect(left, top, right, bottom, element.left, element.top, element.right, element.bottom)) {
            out.addOne(element.id)
            seen.add(element.id)
          }
        }
      }
    }
    

    out.toIndexedSeq
  }

  private def intersect(l1: Float, t1: Float,r1: Float, b1: Float, l2: Float, t2: Float, r2: Float, b2: Float): Boolean =
    l2 <= r1 && r2 >= l1 && t2 <= b1 && b2 >= t1

  def insert(id: Int, topLeft: Vec2, bottomRight: Vec2): Unit = {
    val elementIndex = elements.size
    val element = QuadTreeElement(
      id,
      topLeft.x.toFloat,
      topLeft.y.toFloat,
      bottomRight.x.toFloat,
      bottomRight.y.toFloat
    )
    elements.addOne(element)
    insertNode(rootData, elementIndex)
  }

  private def insertNode(
      root: QuadTreeNodeData,
      elementIndex: Int
  ): Unit = {
    val element = elements(elementIndex)
    val intersectingLeafNodes =
      findLeaves(root, element.left, element.top, element.right, element.bottom)

    for (leaf <- intersectingLeafNodes) {
      insertLeaf(leaf, elementIndex)
    }
  }

  private def insertLeaf(
      data: QuadTreeNodeData,
      elementIndex: Int
  ): Unit = {
    val initialNode = nodes(data.index)
    val node = if (initialNode.firstChild == -1) {
      val elementNodeIndex = elementNodeNextIndex
      elementNodeNextIndex += 1
      elementNodes.put(elementNodeIndex, elementIndex :: Nil)
      val updatedNode = initialNode.copy(firstChild = elementNodeIndex)
      nodes(data.index) = updatedNode
      updatedNode
    } else {
      elementNodes(initialNode.firstChild) =
        elementIndex :: elementNodes(initialNode.firstChild)
      initialNode
    }

    if (node.count >= maxLeafSize && data.depth < maxDepth) {
      val newFirstChild = nodes.size
      
      nodes.addOne(QuadTreeNode(-1, -1))
      nodes.addOne(QuadTreeNode(-1, -1))
      nodes.addOne(QuadTreeNode(-1, -1))
      nodes.addOne(QuadTreeNode(-1, -1))


      val elements = elementNodes.remove(node.firstChild).get
      nodes(data.index) = node.copy(firstChild = newFirstChild)

      for (element <- elements) {
        insertNode(data, element)
      }
    } else {
      nodes(data.index) = node.copy(count = node.count + 1)
    }
  }

  private def findLeaves(
      root: QuadTreeNodeData,
      queryLeft: Float,
      queryTop: Float,
      queryRight: Float,
      queryBottom: Float
  ): IndexedSeq[QuadTreeNodeData] = {

    val out = ArrayBuffer[QuadTreeNodeData]()
    val process = Stack[QuadTreeNodeData]()
    process.push(rootData)

    while (!process.isEmpty) {
      val data = process.pop()
      val node = nodes(data.index)

      if (node.count != -1) {
        out.addOne(data)
      } else {
        val firstChild = node.firstChild

        val newHalfWidth = data.halfWidth / 2f
        val newHalfHeight = data.halfHeight / 2f
        val left = data.middleX - newHalfWidth
        val top = data.middleY - newHalfHeight
        val right = data.middleX + newHalfWidth
        val bottom = data.middleY + newHalfHeight

        if (queryTop <= data.middleY) {
          if (queryLeft <= data.middleX) {
            process.push(
              QuadTreeNodeData(
                firstChild,
                data.depth + 1,
                left,
                top,
                newHalfWidth,
                newHalfHeight
              )
            )
          }
          if (right > data.middleX) {
            process.push(
              QuadTreeNodeData(
                firstChild + 1,
                data.depth + 1,
                right,
                top,
                newHalfWidth,
                newHalfHeight
              )
            )
          }
        }

        if (queryBottom > data.middleY) {
          if (queryLeft <= data.middleX) {
            process.push(
              QuadTreeNodeData(
                firstChild + 2,
                data.depth + 1,
                left,
                bottom,
                newHalfWidth,
                newHalfHeight
              )
            )
          }
          if (queryRight > data.middleX) {
            process.push(
              QuadTreeNodeData(
                firstChild + 3,
                data.depth + 1,
                right,
                bottom,
                newHalfWidth,
                newHalfHeight
              )
            )
          }
        }
      }
    }

    out.toIndexedSeq
  }
}
