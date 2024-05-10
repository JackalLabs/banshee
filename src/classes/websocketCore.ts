import type { TPossibleTxEvents } from '@/types'
import {
  IIbcEngageBundle, IIbcFeedBundle,
  IWebsocketCore
} from '@/interfaces'

import { Responses } from '@cosmjs/tendermint-rpc/build/tendermint34/adaptor'
import { tidyString } from '@/utils/misc'

export class WebsocketCore implements IWebsocketCore {
  protected readonly wsConnections: Record<string, WebSocket>

  constructor() {
    this.wsConnections = {}
  }

  monitor<T extends TPossibleTxEvents>(
    connections: IIbcEngageBundle<T> | IIbcEngageBundle<T>[],
  ): void {
    try {
      if (connections instanceof Array) {
        for (let conn of connections) {
          this.setupMonitoring<T>(conn)
        }
      } else {
        this.setupMonitoring<T>(connections)
      }
    } catch (err) {
      throw err
    }
  }

  protected setupMonitoring<T extends TPossibleTxEvents>(
    conn: IIbcEngageBundle<T>,
  ): void {
    if (!conn.endpoint.startsWith('ws://') && !conn.endpoint.startsWith('wss://')) {
      throw new Error('invalid url')
    }
    const cleanEndpoint = tidyString(conn.endpoint, '/')
    const finalEndpoint = cleanEndpoint.endsWith('websocket') ? cleanEndpoint :  `${cleanEndpoint}/websocket`
    if (!this.wsConnections[conn.chainId]) {
      this.wsConnections[conn.chainId] = new WebSocket(finalEndpoint)
    }
    const client = this.wsConnections[conn.chainId]

    const wsQuery = {
      jsonrpc: '2.0',
      method: 'subscribe',
      id: Date.now().toString(),
      params: {
        query: (conn.query) ? `tm.event = 'Tx' AND ${conn.query}` : `tm.event = 'Tx'`,
      },
    }
    client.onopen = () => {
      client.send(JSON.stringify(wsQuery))
    }
    client.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data)
        if (!data.result.data) {
          return
        }
        const ready = Responses.decodeTxEvent(data.result) as T
        const postProcess: IIbcFeedBundle<T> = {
          resp: ready,
          parsed: conn.parser(ready)
        }
        conn.feed.push(postProcess)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
