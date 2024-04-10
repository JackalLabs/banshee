import { StargateClient } from '@cosmjs/stargate'
import type { CometClient, HttpEndpoint } from '@cosmjs/tendermint-rpc'
import { connectComet } from '@cosmjs/tendermint-rpc'
import { processExtensions } from '@/utils/extensions'
import { WebsocketCore } from '@/classes'
import type { IExtendedStargateClientOptions, IIbcBundle, IIbcQueryClient, IWebsocketCore } from '@/interfaces'
import type { TPossibleTxEvents, TQueryLibrary } from '@/types'

/**
 * @class {IIbcQueryClient} IbcQueryClient
 */
export class IbcQueryClient extends StargateClient implements IIbcQueryClient {
  public readonly queries: TQueryLibrary
  protected readonly wsCore: IWebsocketCore

  protected constructor(
    tmClient: CometClient,
    options: IExtendedStargateClientOptions,
  ) {
    super(tmClient, options)
    const { queryExtensions = [] } = options
    this.queries = processExtensions(tmClient, queryExtensions)
    this.wsCore = new WebsocketCore()
  }

  /**
   * @function connect
   * @memberof IbcQueryClient
   * @async
   * @static
   */
  public static async connect(
    endpoint: string | HttpEndpoint,
    options: IExtendedStargateClientOptions = {},
  ): Promise<IIbcQueryClient> {
    const client = await connectComet(endpoint)
    return new IbcQueryClient(client, options)
  }

  async monitor<T extends TPossibleTxEvents>(
    connections: IIbcBundle<T> | IIbcBundle<T>[],
  ): Promise<void> {
    await this.wsCore.monitor(connections)
  }

  disengage(connections: string | string[]): void {
    this.wsCore.disengage(connections)
  }
}
