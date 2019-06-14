import {HandleFieldPayload, Handler, ReadOnlyRecordProxy, RecordProxy, RecordSourceProxy} from "./RelayStoreTypes"
import {DataID, Variables} from "./RelayRuntimeTypes";

export type HandlerProvider = (name: string) => Handler | null

export { HandlerProvider as DefaultHandlerProvider }
export { HandlerProvider as ViewerHandler }

export type ConnectionHandler = {
  buildConnectionEdge: (store: RecordSourceProxy, connection: RecordProxy, edge?: RecordProxy) => RecordProxy,
  createEdge: (store: RecordSourceProxy, record: RecordProxy, node: RecordProxy, edgeType: string) => RecordProxy,
  deleteNode: (record: RecordProxy, nodeID: DataID) => void,
  getConnection: (record: ReadOnlyRecordProxy, key: string, filters?: Variables) => RecordProxy | null,
  insertEdgeAfter: (record: RecordProxy, newEdge: RecordProxy, cursor?: string) => void,
  insertEdgeBefore: (record: RecordProxy, newEdge: RecordProxy, cursor?: string) => void,
  update: (store: RecordSourceProxy, payload: HandleFieldPayload) => void
}
