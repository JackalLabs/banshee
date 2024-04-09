import type { SigningStargateClient } from '@cosmjs/stargate'
import type { DDeliverTxResponse, DEncodeObject, TPossibleTxEvents, TQueryLibrary, TTxLibrary } from '@/types'
import type { IIbcBundle, ISignAndBroadcastOptions } from '@/interfaces'

/**
 * @interface IIbcSigningStargateClient
 * @extends SigningStargateClient - [More here](https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html)
 * @property {TQueryLibrary} queries
 * @property {TTxLibrary} txLibrary
 * @property {monitor} monitor
 * @property {disengage} disengage
 * @property {selfSignAndBroadcast} selfSignAndBroadcast
 */
export interface IIbcSigningStargateClient extends SigningStargateClient {
  readonly queries: TQueryLibrary
  readonly txLibrary: TTxLibrary

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
