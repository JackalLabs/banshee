import { DStdFee } from '@/types'

/**
 * @interface ISignAndBroadcastOptions
 * @property {StdFee} [fee]
 * @property {string} [memo]
 * @property {bigint} [timeoutHeight]
 */
export interface ISignAndBroadcastOptions {
  fee?: DStdFee
  memo?: string
  timeoutHeight?: bigint
}
