package tel.schich.background.behavior

trait BehaviorResult

object BehaviorResult {
  case object Success extends BehaviorResult
  case object Running extends BehaviorResult
  case object Failure extends BehaviorResult
}
