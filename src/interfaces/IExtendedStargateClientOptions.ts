import type { StargateClientOptions } from '@cosmjs/stargate/build/stargateclient'
import type { TCreateExtension } from '@/types/TClientDefs'

/**
 * IExtendedStargateClientOptions declaration
 * @interface IExtendedStargateClientOptions
 * @property {TCreateExtension[]} [queryExtensions] - Array of functions to generate query extensions.
 *
 * @property {AccountParser} [accountParser]
 */
export interface IExtendedStargateClientOptions extends StargateClientOptions {
  queryExtensions?: TCreateExtension[]
}
