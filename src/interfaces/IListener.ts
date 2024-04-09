import type { TPossibleTxEvents } from '@/types'

/**
 * @interface IListener
 * @property {next} next
 * @property {error} error
 * @property {complete} complete
 */
export interface IListener<T extends TPossibleTxEvents> {
  /**
   * @function next
   * @param {T} x
   */
  next(x: T): void

  /**
   * @function error
   * @param err
   */
  error(err: any): void

  /**
   * @function complete
   */
  complete(): void
}
