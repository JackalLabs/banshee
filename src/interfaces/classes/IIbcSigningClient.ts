import type { SigningStargateClient } from '@cosmjs/stargate'
import type { DDeliverTxResponse, DEncodeObject, TQueryLibrary, TTxLibrary } from '@/types'
import type { ISignAndBroadcastOptions, IWebsocketCore } from '@/interfaces'

/**
 * @interface IIbcSigningClient
 * @extends SigningStargateClient - [More here](https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html)
 * @property {TQueryLibrary} queries
 * @property {TTxLibrary} txLibrary
 * @property {selfSignAndBroadcast} selfSignAndBroadcast
 */
export interface IIbcSigningClient<
  TQ extends TQueryLibrary,
  TT extends TTxLibrary,
> extends SigningStargateClient,
    IWebsocketCore {
  readonly queries: TQ
  readonly txLibrary: TT

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
}
