import { IIbcEngageBundle } from '@/interfaces'
import type { TPossibleTxEvents } from '@/types'

/**
 * @interface IWebsocketCore
 * @property {monitor} monitor
 */
export interface IWebsocketCore {
  /**
   * @function monitor
   * @param {IIbcEngageBundle<T> | IIbcEngageBundle<T>[]} connections
   * @returns {Promise<void>}
   */
  monitor<T extends TPossibleTxEvents>(
    connections: IIbcEngageBundle<T> | IIbcEngageBundle<T>[],
  ): void
}
