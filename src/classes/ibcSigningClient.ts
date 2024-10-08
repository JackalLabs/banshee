import {SigningStargateClient} from '@cosmjs/stargate'
import {CometClient, connectComet} from '@cosmjs/tendermint-rpc'
import {createDefaultRegistry} from '@/utils/registry'
import {processExtensions} from '@/utils/extensions'
import {WebsocketCore} from '@/classes'
import type {OfflineSigner} from '@cosmjs/launchpad'
import type {ISignAndBroadcastOptions} from '@/interfaces/ISignAndBroadcastOptions'
import type {
  DDeliverTxResponse,
  DEncodeObject,
  DHttpEndpoint,
  TPossibleTxEvents,
  TQueryLibrary,
  TTxLibrary,
} from '@/types'
import {IExtendedSigningStargateClientOptions, IIbcEngageBundle, IIbcSigningClient, IWebsocketCore,} from '@/interfaces'
import {warnError} from '@/utils/misc'

/**
 * @class {IIbcSigningClient} IbcSigningClient
 */
export class IbcSigningClient<TQ extends TQueryLibrary, TT extends TTxLibrary>
  extends SigningStargateClient
  implements IIbcSigningClient<TQ, TT>
{
  public readonly queries: TQ
  public readonly txLibrary: TT
  protected readonly address: string
  protected readonly wsCore: IWebsocketCore

  protected constructor(
    tmClient: CometClient,
    signer: OfflineSigner,
    address: string,
    options: IExtendedSigningStargateClientOptions,
  ) {
    super(tmClient, signer, options)
    const { queryExtensions = [], txLibrary = {} } = options
    this.address = address
    this.queries = processExtensions(tmClient, queryExtensions) as TQ
    this.txLibrary = txLibrary as TT
    this.wsCore = new WebsocketCore()
  }

  /**
   * @function connectWithSigner
   * @memberof IbcSigningClient
   * @async
   * @static
   */
  public static async connectWithSigner<
    TQ extends TQueryLibrary,
    TT extends TTxLibrary,
  >(
    endpoint: string | DHttpEndpoint,
    signer: OfflineSigner,
    options: IExtendedSigningStargateClientOptions = {},
  ): Promise<IIbcSigningClient<TQ, TT>> {
    try {
      const client = await connectComet(endpoint)
      const { address } = (await signer.getAccounts())[0]
      const { customModules = [] } = options
      return new IbcSigningClient<TQ, TT>(client, signer, address, {
        registry: createDefaultRegistry(customModules),
        ...options,
      })
    } catch (err) {
      throw warnError('IbcSigningClient connectWithSigner()', err)
    }
  }

  async monitor<T extends TPossibleTxEvents>(
    connections: IIbcEngageBundle<T> | IIbcEngageBundle<T>[],
  ): Promise<void> {
    try {
      await this.wsCore.monitor(connections)
    } catch (err) {
      throw warnError('IbcSigningClient monitor()', err)
    }
  }

  async selfSignAndBroadcast(
    msgs: DEncodeObject[],
    options: ISignAndBroadcastOptions = {},
  ): Promise<DDeliverTxResponse> {
    try {
      const { fee, memo, timeoutHeight } = {
        fee: {
          amount: [],
          gas: (msgs.length * 100000).toString(),
        },
        ...options,
      }
      return this.signAndBroadcast(this.address, msgs, fee, memo, timeoutHeight)
    } catch (err) {
      throw warnError('IbcSigningClient selfSignAndBroadcast()', err)
    }
  }
}
