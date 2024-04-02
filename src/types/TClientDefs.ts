import type { QueryClient } from '@cosmjs/stargate'
import type { GeneratedType } from '@cosmjs/proto-signing'
import type { ITxLibraryChapter } from '@/interfaces'

export type TTxLibrary = Record<string, ITxLibraryChapter>
export type TCreateExtension = (
  base: QueryClient,
) => Record<string, Record<string, (request?: any) => Promise<any>>>
export type TQueryLibrary = QueryClient &
  Record<string, Record<string, (request?: any) => Promise<any>>>

export type TCustomModule = [string, GeneratedType]
export type TCustomModuleMap = Record<string, TCustomModule>
