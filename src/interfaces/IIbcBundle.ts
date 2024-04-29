import type { TCurrentTxEvent, TPossibleTxEvents } from '@/types'

/**
 * @interface IIbcEngageBundle
 * @property {string} chainId
 * @property {string} endpoint
 * @property {string} [query]
 * @property {TCurrentTxEvent<T>[]} feed
 */
export interface IIbcEngageBundle<T extends TPossibleTxEvents> {
  chainId: string
  endpoint: string
  query?: string
  feed: TCurrentTxEvent<T>[]
}
