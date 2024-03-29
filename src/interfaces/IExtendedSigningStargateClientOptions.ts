import { SigningStargateClientOptions } from '@cosmjs/stargate/build/signingstargateclient'
import { TCreateExtension, TCustomModuleMap, TTxLibrary } from '@/types/TClientDefs'

/**
 * ExtendedSigningStargateClientOptions declaration
 * @interface IExtendedSigningStargateClientOptions
 * @property {TCreateExtension[]} [queryExtensions] - Array of functions to generate query extensions.
 * @property {TTxLibrary} [txLibrary] - Library of tx msg encoders.
 *
 * @property {Registry} [registry]
 * @property {AminoTypes} [aminoTypes]
 * @property {number} [broadcastTimeoutMs]
 * @property {number} [broadcastPollIntervalMs]
 * @property {GasPrice} [gasPrice]
 */
export interface IExtendedSigningStargateClientOptions extends SigningStargateClientOptions {
  customModules?: TCustomModuleMap[]
  queryExtensions?: TCreateExtension[]
  txLibrary?: TTxLibrary,
}