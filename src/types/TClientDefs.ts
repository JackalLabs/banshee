import type { QueryClient } from '@cosmjs/stargate'
import type { OfflineAminoSigner } from '@cosmjs/amino'
import type { tendermint37, TxEvent } from '@cosmjs/tendermint-rpc'
import type { GeneratedType, OfflineDirectSigner } from '@cosmjs/proto-signing'
import type { ITxLibraryChapter } from '@/interfaces'

export type TTxLibrary = Record<string, ITxLibraryChapter>
export type TCreateExtension = (
  base: QueryClient,
) => Record<string, Record<string, (request?: any) => Promise<any>>>
export type TQueryLibrary = QueryClient &
  Record<string, Record<string, (request?: any) => Promise<any>>>

export type TCustomModule = [string, GeneratedType]
export type TCustomModuleMap = Record<string, TCustomModule>
export type TMergedSigner = OfflineAminoSigner & OfflineDirectSigner

export type TPossibleTxEvents = TxEvent | tendermint37.TxEvent
export type TCurrentTxEvent<T extends TPossibleTxEvents> = T
