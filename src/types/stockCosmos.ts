import type { Event } from '@cosmjs/stargate/build/events'
import type { StdFee } from '@cosmjs/amino'
import type { Coin, DeliverTxResponse } from '@cosmjs/stargate'
import type { EncodeObject } from '@cosmjs/proto-signing'
import type { HttpEndpoint } from '@cosmjs/tendermint-rpc'
import type { IMsgData } from '@/interfaces'

export { Coin, DeliverTxResponse, EncodeObject, HttpEndpoint, StdFee }

/**
 * Coin Documentation
 *
 * Coin defines a token with a denomination and an amount.
 * @property {string} denom - Denom of token.
 * @property {string} amount - String of value parsable to number.
 */
export type DCoin = Documentation<
  {
    denom: string
    amount: string
  },
  Coin
>

/**
 * StdFee Documentation
 *
 * StdFee defines
 * @property {DCoin[]} amount - Amount and selection of tokens to use to pay gas.
 * @property {string} gas - Calculated gas amount.
 * @property {string} [granter] - The granter address that is used for paying with feegrants.
 * @property {string} [payer] - The fee payer address. The payer must have signed the transaction.
 */
export type DStdFee = Documentation<
  {
    readonly amount: readonly DCoin[]
    readonly gas: string
    readonly granter?: string
    readonly payer?: string
  },
  StdFee
>

/**
 * DeliverTxResponse Documentation
 *
 * DeliverTxResponse define the response after successfully broadcasting a transaction.
 * @property {number} height - Block height of the transaction.
 * @property {number} txIndex - 0-based index of the transaction within the block.
 * @property {number} code - Error code, success is always 0.
 * @property {string} transactionHash - Hash of transaction.
 * @property {Event[]} events - Tendermint34 events in response.
 * @property {string} [rawLog] - A string-based log document.
 * @property {IMsgData[]} [data] - Message responses of included Msgs.
 * @property {DTxMsgData[]} msgResponses - Always empty list for SDK 0.45 chains, typed for compatibility.
 * @property {number} gasUsed - Total gas used as calculated by chain.
 * @property {number} gasWanted - Maximum gas allowed as submitted in transaction.
 */
export type DDeliverTxResponse = Documentation<
  {
    readonly height: number
    readonly txIndex: number
    readonly code: number
    readonly transactionHash: string
    readonly events: readonly Event[]
    readonly rawLog?: string
    readonly data?: readonly IMsgData[]
    readonly msgResponses: readonly DTxMsgData[]
    readonly gasUsed: number
    readonly gasWanted: number
  },
  DeliverTxResponse
>

/**
 * TxMsgData Documentation
 *
 * TxMsgData defines a msg object returned from the chain.
 * @property {string} typeUrl - Identifier composed of msg type's package and its name.
 * @property {Uint8Array} value - Object created from msg parameters.
 */
export type DTxMsgData = {
  typeUrl: string
  value: Uint8Array
}

/**
 * EncodeObject Documentation
 *
 * EncodeObject defines a msg object ready to be sent to chain.
 * @property {string} typeUrl - Identifier composed of msg type's package and its name.
 * @property {any} value - Object created from msg parameters.
 */
export type DEncodeObject = Documentation<
  {
    readonly typeUrl: string
    readonly value: any
  },
  EncodeObject
>

/**
 * HttpEndpoint Documentation
 *
 * HttpEndpoint defines a http endpoint and associated headers in a reusable format.
 * @prop {string} url - The URL of the HTTP endpoint.
 * @prop {Record<string, string>} headers - HTTP headers that are sent with every request.
 */
export type DHttpEndpoint = Documentation<
  {
    readonly url: string
    readonly headers: Record<string, string>
  },
  HttpEndpoint
>
