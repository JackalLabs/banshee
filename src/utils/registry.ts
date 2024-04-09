import { defaultRegistryTypes } from '@cosmjs/stargate'
import { Registry } from '@cosmjs/proto-signing'
import { TCustomModule, TCustomModuleMap } from '@/types'

/**
 * Accept array of custom module maps and convert into Registry.
 * @param {TCustomModuleMap[]} source
 * @returns {Registry}
 */
export function createDefaultRegistry(source: TCustomModuleMap[]): Registry {
  const full: TCustomModule[] = [...defaultRegistryTypes]
  for (let one of source) {
    full.push(...Object.values(one))
  }
  return new Registry(full)
}
