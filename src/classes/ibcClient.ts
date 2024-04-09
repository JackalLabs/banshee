import { SigningStargateClient } from '@cosmjs/stargate'
import { CometClient, connectComet } from '@cosmjs/tendermint-rpc'
import { createDefaultRegistry } from '@/utils/registry'
import { processExtensions } from '@/utils/extensions'
import { makeListener } from '@/utils/misc'
import type { Stream } from 'xstream'
import type { OfflineSigner } from '@cosmjs/launchpad'
import type { ISignAndBroadcastOptions } from '@/interfaces/ISignAndBroadcastOptions'
import type {
  DDeliverTxResponse,
  DEncodeObject,
  DHttpEndpoint,
  TPossibleTxEvents,
  TQueryLibrary,
  TTxLibrary
} from '@/types'
import type { IExtendedSigningStargateClientOptions, IIbcBundle, IIbcSigningStargateClient } from '@/interfaces'

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
  protected readonly wsConnections: Record<string, CometClient>
  protected readonly activeStreams: Record<string, Stream<TPossibleTxEvents>>

  protected constructor(
    tmClient: CometClient,
    signer: OfflineSigner,
    address: string,
    options: IExtendedSigningStargateClientOptions,
  ) {
    super(tmClient, signer, options)
    const { queryExtensions = [], txLibrary = {} } = options
    this.address = address
    this.queries = processExtensions(tmClient, queryExtensions)
    this.txLibrary = txLibrary

    this.wsConnections = {}
    this.activeStreams = {}
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
      const client = await connectComet(endpoint)

      const { address } = (await signer.getAccounts())[0]
      const { customModules = [] } = options
      return new IbcSigningStargateClient(client, signer, address, {
        registry: createDefaultRegistry(customModules),
        ...options,
      })
    } catch (err) {
      throw err
    }
  }

  async monitor<T extends TPossibleTxEvents>(
    connections: IIbcBundle<T> | IIbcBundle<T>[],
  ): Promise<void> {
    try {
      if (connections instanceof Array) {
        for (let conn of connections) {
          if (!this.wsConnections[conn.chainId]) {
            this.wsConnections[conn.chainId] = await connectComet(conn.endpoint)
          }
          if (!this.activeStreams[conn.chainId]) {
            this.activeStreams[conn.chainId] = this.wsConnections[
              conn.chainId
            ].subscribeTx() as Stream<TPossibleTxEvents>
          }
          this.activeStreams[conn.chainId].addListener(makeListener<T>(conn))
        }
      } else {
        if (!this.wsConnections[connections.chainId]) {
          this.wsConnections[connections.chainId] = await connectComet(
            connections.endpoint,
          )
        }
        if (!this.activeStreams[connections.chainId]) {
          this.activeStreams[connections.chainId] = this.wsConnections[
            connections.chainId
          ].subscribeTx() as Stream<TPossibleTxEvents>
        }
        this.activeStreams[connections.chainId].addListener(
          makeListener<T>(connections),
        )
      }
    } catch (err) {
      throw err
    }
  }

  disengage(connections: string | string[]): void {
    if (connections instanceof Array) {
      for (let conn of connections) {
        delete this.wsConnections[conn]
      }
    } else {
      delete this.wsConnections[connections]
    }
  }

  async selfSignAndBroadcast(
    msgs: DEncodeObject[],
    options: ISignAndBroadcastOptions = {},
  ): Promise<DDeliverTxResponse> {
    const { fee, memo, timeoutHeight } = {
      fee: {
        amount: [],
        gas: (msgs.length * 100000).toString(),
      },
      ...options,
    }
    return this.signAndBroadcast(this.address, msgs, fee, memo, timeoutHeight)
  }
}
