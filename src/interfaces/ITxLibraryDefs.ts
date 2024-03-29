import { DEncodeObject } from '@/types'

/**
 * MsgData declaration
 * @interface IMsgData
 * @property {string} msgType - Dot separated path of msg.
 * @property {Uint8Array} data - Uint8Array encoded msg data.
 */
export interface ITxLibraryChapter {
  [key: string]: (msg: any) => DEncodeObject
}
