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
  TTxLibrary
} from '@/types'
import type {IExtendedSigningStargateClientOptions, IIbcBundle, IIbcSigningClient, IWebsocketCore} from '@/interfaces'

/**
 * @class {IIbcSigningClient} IbcSigningClient
 */
export class IbcSigningClient
    extends SigningStargateClient
    implements IIbcSigningClient {
    public readonly queries: TQueryLibrary
    public readonly txLibrary: TTxLibrary
    protected readonly address: string
    protected readonly wsCore: IWebsocketCore

    protected constructor(
        tmClient: CometClient,
        signer: OfflineSigner,
        address: string,
        options: IExtendedSigningStargateClientOptions,
    ) {
        super(tmClient, signer, options)
        const {queryExtensions = [], txLibrary = {}} = options
        this.address = address
        this.queries = processExtensions(tmClient, queryExtensions)
        this.txLibrary = txLibrary
        this.wsCore = new WebsocketCore()
    }

    /**
     * @function connectWithSigner
     * @memberof IbcSigningClient
     * @async
     * @static
     */
    public static async connectWithSigner(
        endpoint: string | DHttpEndpoint,
        signer: OfflineSigner,
        options: IExtendedSigningStargateClientOptions = {},
    ): Promise<IIbcSigningClient> {
        try {
            const client = await connectComet(endpoint)
            const {address} = (await signer.getAccounts())[0]
            const {customModules = []} = options
            return new IbcSigningClient(client, signer, address, {
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
        await this.wsCore.monitor(connections)
    }

    disengage(connections: string | string[]): void {
        this.wsCore.disengage(connections)
    }

    async selfSignAndBroadcast(
        msgs: DEncodeObject[],
        options: ISignAndBroadcastOptions = {},
    ): Promise<DDeliverTxResponse> {
        const {fee, memo, timeoutHeight} = {
            fee: {
                amount: [],
                gas: (msgs.length * 100000).toString(),
            },
            ...options,
        }
        return this.signAndBroadcast(this.address, msgs, fee, memo, timeoutHeight)
    }

    async getLastBlockHeight(): Promise<number> {
        const client = this.forceGetCometClient()
        const {lastBlockHeight} = await client.abciInfo()
        if (!lastBlockHeight) {
            throw new Error('Invalid lastBlockHeight')
        } else {
            return lastBlockHeight
        }
    }
}
