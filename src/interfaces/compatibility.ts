import { Event } from '@cosmjs/stargate'
import { DTxMsgData } from '@/types'

/**
 * MsgData declaration
 * @interface IMsgData
 * @property {string} msgType - Dot separated path of msg.
 * @property {Uint8Array} data - Uint8Array encoded msg data.
 */
export interface IMsgData {
  msgType: string
  data: Uint8Array
}

/**
 * IndexedTx declaration
 * @interface IIndexedTx
 * @property {number} height - Block height of the transaction.
 * @property {number} txIndex - 0-based index of the transaction within the block.
 * @property {string} hash - Hash of transaction.
 * @property {number} code - Error code, success is always 0.
 * @property {readonly Event[]} events - Tendermint34 events in response.
 * @property {string} rawLog - A string-based log document.
 * @property {Uint8Array} [data] - Message responses of included Msgs.
 * @property {Uint8Array} tx
 * @property {DTxMsgData[]} msgResponses - Always empty list for SDK 0.45 chains, typed for compatibility.
 * @property {number} gasUsed - Total gas used as calculated by chain.
 * @property {number} gasWanted - Maximum gas allowed as submitted in transaction.
 */
export interface IIndexedTx {
  readonly height: number
  readonly txIndex: number
  readonly hash: string
  readonly code: number
  readonly events: readonly Event[]
  readonly rawLog: string
  readonly data?: Uint8Array
  readonly tx: Uint8Array
  readonly msgResponses: DTxMsgData[]
  readonly gasUsed: number
  readonly gasWanted: number
}
