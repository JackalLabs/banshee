import { StargateClient } from '@cosmjs/stargate'
import type { CometClient, HttpEndpoint } from '@cosmjs/tendermint-rpc'
import { connectComet } from '@cosmjs/tendermint-rpc'
import { processExtensions } from '@/utils/extensions'
import { WebsocketCore } from '@/classes'
import {
  IExtendedStargateClientOptions, IIbcDeafenBundle,
  IIbcDisengageBundle,
  IIbcEngageBundle,
  IIbcQueryClient,
  IWebsocketCore
} from '@/interfaces'
import type { TPossibleTxEvents, TQueryLibrary } from '@/types'

/**
 * @class {IIbcQueryClient} IbcQueryClient
 */
export class IbcQueryClient<TQ extends TQueryLibrary> extends StargateClient implements IIbcQueryClient<TQ> {
  public readonly queries: TQ
  protected readonly wsCore: IWebsocketCore

  protected constructor(
    tmClient: CometClient,
    options: IExtendedStargateClientOptions,
  ) {
    super(tmClient, options)
    const { queryExtensions = [] } = options
    this.queries = processExtensions(tmClient, queryExtensions) as TQ
    this.wsCore = new WebsocketCore()
  }

  /**
   * @function connect
   * @memberof IbcQueryClient
   * @async
   * @static
   */
  public static async connect<TQ extends TQueryLibrary>(
    endpoint: string | HttpEndpoint,
    options: IExtendedStargateClientOptions = {},
  ): Promise<IIbcQueryClient<TQ>> {
    const client = await connectComet(endpoint)
    return new IbcQueryClient<TQ>(client, options)
  }

  async monitor<T extends TPossibleTxEvents>(
    connections: IIbcEngageBundle<T> | IIbcEngageBundle<T>[],
  ): Promise<void> {
    await this.wsCore.monitor(connections)
  }

  disengage(connections: IIbcDisengageBundle | IIbcDisengageBundle[]): void {
    this.wsCore.disengage(connections)
  }

  deafen(connection: IIbcDeafenBundle): void {
    this.wsCore.deafen(connection)
  }
}
