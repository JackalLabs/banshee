import type {IWebsocketCore} from '@/interfaces'
import type {StargateClient} from '@cosmjs/stargate'
import type {TQueryLibrary} from "@/types";

/**
 * @interface IIbcQueryClient
 * @extends StargateClient - [More here](https://cosmos.github.io/cosmjs/latest/stargate/classes/StargateClient.html)
 */
export interface IIbcQueryClient extends StargateClient, IWebsocketCore {
    readonly queries: TQueryLibrary
}
