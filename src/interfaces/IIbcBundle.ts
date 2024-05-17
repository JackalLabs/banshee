import type { TPossibleTxEvents } from '@/types'

/**
 * @interface IIbcEngageBundle
 * @property {string} chainId
 * @property {string} endpoint
 * @property {string} [query]
 * @property {T[]} feed
 */
export interface IIbcEngageBundle<T extends TPossibleTxEvents> {
  chainId: string
  endpoint: string
  parser: (source: T) => any
  query?: string
  feed: T[]
}
