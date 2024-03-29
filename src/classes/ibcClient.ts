import { SigningStargateClient } from '@cosmjs/stargate'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { createDefaultRegistry } from '@/utils/registry'
import { processExtensions } from '@/utils/extensions'
import type { OfflineSigner } from '@cosmjs/launchpad'
import type { ISignAndBroadcastOptions } from '@/interfaces/ISignAndBroadcastOptions'
import type { DDeliverTxResponse, DEncodeObject, DHttpEndpoint, TTxLibrary, TQueryLibrary } from '@/types'
import type { IExtendedSigningStargateClientOptions, IIbcSigningStargateClient } from '@/interfaces'

/**
 * @class {IIbcSigningStargateClient} IbcSigningStargateClient
 */
export class IbcSigningStargateClient
  extends SigningStargateClient
  implements IIbcSigningStargateClient
{
  public readonly queries: TQueryLibrary
  public readonly txLibrary: TTxLibrary
  protected readonly address: string

  protected constructor(
    tmClient: Tendermint34Client,
    signer: OfflineSigner,
    address: string,
    options: IExtendedSigningStargateClientOptions,
  ) {
    super(tmClient, signer, options)
    const {
      queryExtensions = [],
      txLibrary = {}
    } = options
    this.address = address
    this.queries = processExtensions(tmClient, queryExtensions)
    this.txLibrary = txLibrary
  }

  /**
   * @function connectWithSigner
   * @memberof IbcSigningStargateClient
   * @async
   * @static
   */
  public static async connectWithSigner(
    endpoint: string | DHttpEndpoint,
    signer: OfflineSigner,
    options: IExtendedSigningStargateClientOptions = {},
  ): Promise<IbcSigningStargateClient> {
    try {
      const tmClient = await Tendermint34Client.connect(endpoint)
      const { address } = (await signer.getAccounts())[0]
      const { customModules = [] } = options
      return new IbcSigningStargateClient(tmClient, signer, address, {
        registry: createDefaultRegistry(customModules),
        ...options,
      })
    } catch (err) {
      throw err
    }
  }

  async selfSignAndBroadcast(
    msgs: DEncodeObject[],
    options: ISignAndBroadcastOptions = {},
  ): Promise<DDeliverTxResponse> {
    const { fee, memo } = {
      fee: {
        amount: [],
        gas: (msgs.length * 100000).toString(),
      },
      memo: '',
      ...options,
    }
    return this.signAndBroadcast(this.address, msgs, fee, memo)
  }
}


