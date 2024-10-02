import {StargateClient} from '@cosmjs/stargate'
import type {CometClient, HttpEndpoint} from '@cosmjs/tendermint-rpc'
import {connectComet} from '@cosmjs/tendermint-rpc'
import {processExtensions} from '@/utils/extensions'
import {WebsocketCore} from '@/classes'
import {IExtendedStargateClientOptions, IIbcEngageBundle, IIbcQueryClient, IWebsocketCore} from '@/interfaces'
import type {TPossibleTxEvents, TQueryLibrary} from '@/types'
import {warnError} from "@/utils/misc";

/**
 * @class {IIbcQueryClient} IbcQueryClient
 */
export class IbcQueryClient<TQ extends TQueryLibrary>
  extends StargateClient
  implements IIbcQueryClient<TQ>
{
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
    try {
      const client = await connectComet(endpoint)
      return new IbcQueryClient<TQ>(client, options)
    } catch (err) {
      throw warnError('IbcQueryClient connect()', err)
    }
  }

  async monitor<T extends TPossibleTxEvents>(
    connections: IIbcEngageBundle<T> | IIbcEngageBundle<T>[],
  ): Promise<void> {
    try {
      await this.wsCore.monitor(connections)
    } catch (err) {
      throw warnError('IbcQueryClient monitor()', err)
    }
  }
}
