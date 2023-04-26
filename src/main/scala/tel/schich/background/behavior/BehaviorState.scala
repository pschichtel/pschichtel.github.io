package tel.schich.background.behavior

sealed trait BehaviorState
object BehaviorState {
  case object New extends BehaviorState
  case object Ready extends BehaviorState
  case object Starting extends BehaviorState
  case object Running extends BehaviorState
  case object Successful extends BehaviorState
  case object Failed extends BehaviorState
}
