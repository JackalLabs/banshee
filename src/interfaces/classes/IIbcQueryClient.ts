import type { IWebsocketCore } from '@/interfaces'
import type { StargateClient } from '@cosmjs/stargate'

/**
 * @interface IIbcQueryClient
 * @extends StargateClient - [More here](https://cosmos.github.io/cosmjs/latest/stargate/classes/StargateClient.html)
 */
export interface IIbcQueryClient extends StargateClient, IWebsocketCore {}
