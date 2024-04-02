import { SigningStargateClient } from '@cosmjs/stargate'
import { DDeliverTxResponse, DEncodeObject, type DHttpEndpoint, TQueryLibrary, TTxLibrary } from '@/types'
import { ISignAndBroadcastOptions } from '@/interfaces'

/**
 * @interface IIbcSigningStargateClient
 * @extends SigningStargateClient - [More here](https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html)
 * @property {TQueryLibrary} queries
 * @property {TTxLibrary} txLibrary
 * @property {selfSignAndBroadcast} selfSignAndBroadcast
 */
export interface IIbcSigningStargateClient
  extends SigningStargateClient {
  readonly queries: TQueryLibrary
  readonly txLibrary: TTxLibrary

  test(wsEndpoint: string | DHttpEndpoint): Promise<void>

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
