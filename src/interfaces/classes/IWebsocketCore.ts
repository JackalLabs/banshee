import type {IIbcBundle} from '@/interfaces'
import type {TPossibleTxEvents} from '@/types'

/**
 * @interface IWebsocketCore
 * @property {monitor} monitor
 * @property {disengage} disengage
 */
export interface IWebsocketCore {
    /**
     * @function monitor
     * @param {IIbcBundle<T> | IIbcBundle<T>[]} connections
     * @returns {Promise<void>}
     */
    monitor<T extends TPossibleTxEvents>(
        connections: IIbcBundle<T> | IIbcBundle<T>[],
    ): Promise<void>

    /**
     * @function disengage
     * @param {string | string[]} connections
     */
    disengage(connections: string | string[]): void
}
