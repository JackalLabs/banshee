import type { CometClient } from '@cosmjs/tendermint-rpc'
import { connectComet } from '@cosmjs/tendermint-rpc'
import type { Stream } from 'xstream'
import type { TPossibleTxEvents } from '@/types'
import {
  IIbcDeafenBundle,
  IIbcDisengageBundle,
  IIbcEngageBundle,
  IWebsocketCore,
} from '@/interfaces'

export class WebsocketCore implements IWebsocketCore {
  protected readonly wsConnections: Record<string, CometClient>
  protected readonly activeStreams: Record<string, Stream<TPossibleTxEvents>>

  constructor() {
    this.wsConnections = {}
    this.activeStreams = {}
  }

  async monitor<T extends TPossibleTxEvents>(
    connections: IIbcEngageBundle<T> | IIbcEngageBundle<T>[],
  ): Promise<void> {
    try {
      if (connections instanceof Array) {
        for (let conn of connections) {
          await this.setupMonitoring<T>(conn)
        }
      } else {
        await this.setupMonitoring<T>(connections)
      }
    } catch (err) {
      throw err
    }
  }

  disengage(connections: IIbcDisengageBundle | IIbcDisengageBundle[]): void {
    if (connections instanceof Array) {
      for (let conn of connections) {
        delete this.activeStreams[`${conn.chainId}|${conn.query || 'all'}`]
      }
    } else {
      delete this.activeStreams[
        `${connections.chainId}|${connections.query || 'all'}`
      ]
    }
  }

  deafen(connection: IIbcDeafenBundle): void {
    this.activeStreams[
      `${connection.chainId}|${connection.query || 'all'}`
    ].removeListener(connection.listener)
  }

  protected async setupMonitoring<T extends TPossibleTxEvents>(
    conn: IIbcEngageBundle<T>,
  ) {
    if (!this.wsConnections[conn.chainId]) {
      this.wsConnections[conn.chainId] = await connectComet(conn.endpoint)
    }
    const client = this.wsConnections[conn.chainId]
    const streamId = `${conn.chainId}|${conn.query || 'all'}`
    if (!this.activeStreams[streamId]) {
      if (conn.query) {
        this.activeStreams[streamId] = client.subscribeTx(
          conn.query,
        ) as Stream<TPossibleTxEvents>
      } else {
        this.activeStreams[streamId] =
          client.subscribeTx() as Stream<TPossibleTxEvents>
      }
    }
    this.activeStreams[streamId].addListener(conn.listener)
  }
}
