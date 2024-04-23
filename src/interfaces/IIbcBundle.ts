import type { TCurrentTxEvent, TPossibleTxEvents } from '@/types'
import type { IListener } from '@/interfaces/IListener'

/**
 * @interface IIbcEngageBundle
 * @property {string} chainId
 * @property {string} endpoint
 * @property {string} [query]
 * @property {TCurrentTxEvent<T>[]} feed
 * @property {IListener<TPossibleTxEvents>} listener
 */
export interface IIbcEngageBundle<T extends TPossibleTxEvents> {
  chainId: string
  endpoint: string
  query?: string
  feed: TCurrentTxEvent<T>[]
  listener: IListener<TPossibleTxEvents>
}

/**
 * @interface IIbcDisengageBundle
 * @property {string} chainId
 * @property {string} [query]
 */
export interface IIbcDisengageBundle {
  chainId: string
  query?: string
}

/**
 * @interface IIbcDeafenBundle
 * @property {string} chainId
 * @property {string} [query]
 * @property {IListener<TPossibleTxEvents>} listener
 */
export interface IIbcDeafenBundle {
  chainId: string
  query?: string
  listener: IListener<TPossibleTxEvents>
}

/**
 * @interface IIbcMakeListenerBundle
 * @property {string} chainId
 * @property {TCurrentTxEvent<T>[]} feed
 */
export interface IIbcMakeListenerBundle<T extends TPossibleTxEvents> {
  chainId: string
  feed: TCurrentTxEvent<T>[]
}
