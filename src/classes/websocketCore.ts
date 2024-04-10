import type { CometClient } from '@cosmjs/tendermint-rpc'
import { connectComet } from '@cosmjs/tendermint-rpc'
import { makeListener } from '@/utils/misc'
import type { Stream } from 'xstream'
import type { TPossibleTxEvents } from '@/types'
import type { IIbcBundle, IWebsocketCore } from '@/interfaces'

export class WebsocketCore implements IWebsocketCore {
  protected readonly wsConnections: Record<string, CometClient>
  protected readonly activeStreams: Record<string, Stream<TPossibleTxEvents>>

  constructor() {
    this.wsConnections = {}
    this.activeStreams = {}
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
}
