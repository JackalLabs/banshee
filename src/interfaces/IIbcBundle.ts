import type { TCurrentTxEvent, TPossibleTxEvents } from '@/types'

/**
 * @interface IIbcBundle
 * @property {string} chainId
 * @property {string} endpoint
 * @property {TCurrentTxEvent[]} feed
 */
export interface IIbcBundle<T extends TPossibleTxEvents> {
  chainId: string
  endpoint: string
  feed: TCurrentTxEvent<T>[]
}
