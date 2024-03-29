import { SigningStargateClient } from '@cosmjs/stargate'
import { DDeliverTxResponse, DEncodeObject, TQueryLibrary, TTxLibrary  } from '@/types'
import { ISignAndBroadcastOptions } from '@/interfaces'

/**
 * @interface IJackalSigningStargateClient
 * @extends SigningStargateClient - [More here](https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html)
 * @property {TQueryExtensions} queries
 * @property {ITxLibrary} txLibrary
 * @property {selfSignAndBroadcast} selfSignAndBroadcast
 */
export interface IIbcSigningStargateClient
  extends SigningStargateClient {
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
}
