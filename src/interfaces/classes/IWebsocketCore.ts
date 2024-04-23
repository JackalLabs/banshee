import { IIbcDeafenBundle, IIbcDisengageBundle, IIbcEngageBundle } from '@/interfaces'
import type {TPossibleTxEvents} from '@/types'

/**
 * @interface IWebsocketCore
 * @property {monitor} monitor
 * @property {disengage} disengage
 */
export interface IWebsocketCore {
    /**
     * @function monitor
     * @param {IIbcEngageBundle<T> | IIbcEngageBundle<T>[]} connections
     * @returns {Promise<void>}
     */
    monitor<T extends TPossibleTxEvents>(
        connections: IIbcEngageBundle<T> | IIbcEngageBundle<T>[],
    ): Promise<void>

    /**
     * @function disengage
     * @param {IIbcDisengageBundle | IIbcDisengageBundle[]} connections
     */
    disengage(connections: IIbcDisengageBundle | IIbcDisengageBundle[]): void

    /**
     * @function deafen
     * @param {IIbcDeafenBundle} connection
     */
    deafen(connection: IIbcDeafenBundle): void
}
