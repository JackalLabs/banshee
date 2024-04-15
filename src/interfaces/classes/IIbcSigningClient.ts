import type {SigningStargateClient} from '@cosmjs/stargate'
import type {DDeliverTxResponse, DEncodeObject, TQueryLibrary, TTxLibrary} from '@/types'
import type {ISignAndBroadcastOptions, IWebsocketCore} from '@/interfaces'

/**
 * @interface IIbcSigningClient
 * @extends SigningStargateClient - [More here](https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html)
 * @property {TQueryLibrary} queries
 * @property {TTxLibrary} txLibrary
 * @property {selfSignAndBroadcast} selfSignAndBroadcast
 */
export interface IIbcSigningClient
    extends SigningStargateClient,
        IWebsocketCore {
    readonly queries: TQueryLibrary
    readonly txLibrary: TTxLibrary

    /**
     * @function selfSignAndBroadcast
     * @param {DEncodeObject[]} msgs
     * @param {ISignAndBroadcastOptions} [options]
     * @returns Promise<DDeliverTxResponse>
     */
    selfSignAndBroadcast(
        msgs: DEncodeObject[],
        options?: ISignAndBroadcastOptions,
    ): Promise<DDeliverTxResponse>

  /**
   * @function getLastBlockHeight
   * @returns Promise<number>
   */
    getLastBlockHeight(): Promise<number>
}
