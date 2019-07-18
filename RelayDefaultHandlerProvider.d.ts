import {HandleFieldPayload, Handler, ReadOnlyRecordProxy, RecordProxy, RecordSourceProxy} from "./RelayStoreTypes"
import {DataID, Variables} from "./RelayRuntimeTypes";

export type HandlerProvider = (name: string) => Handler | null

export {HandlerProvider as DefaultHandlerProvider}
export {HandlerProvider as ViewerHandler}

export class ConnectionHandler {
  static buildConnectionEdge: (store: RecordSourceProxy, connection: RecordProxy, edge?: RecordProxy) => RecordProxy
  static createEdge: (store: RecordSourceProxy, record: RecordProxy, node: RecordProxy, edgeType: string) => RecordProxy
  static deleteNode: (record: RecordProxy, nodeID: DataID) => void
  static getConnection: (record: ReadOnlyRecordProxy, key: string, filters?: Variables) => RecordProxy | null
  static insertEdgeAfter: (record: RecordProxy, newEdge: RecordProxy, cursor?: string) => void
  static insertEdgeBefore: (record: RecordProxy, newEdge: RecordProxy, cursor?: string) => void
  static update: (store: RecordSourceProxy, payload: HandleFieldPayload) => void
}
