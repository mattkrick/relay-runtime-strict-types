import { DataID, Variables } from "./RelayRuntimeTypes"
import { SelectorStoreUpdater } from "./RelayStoreTypes"
import { ConcreteRequest } from "./RelayConcreteNode"

export type MutationTypes = {
    RANGE_ADD: "RANGE_ADD"
    RANGE_DELETE: "RANGE_DELETE"
    NODE_DELETE: "NODE_DELETE"
    FIELDS_CHANGE: "FIELDS_CHANGE"
    REQUIRED_CHILDREN: "REQUIRED_CHILDREN"
}

export type MutationType = keyof MutationTypes

export type RangeOperations = {
    APPEND: "append"
    IGNORE: "ignore"
    PREPEND: "prepend"
    REFETCH: "refetch"
    // legacy only
    REMOVE: "remove" // legacy only
}

export type RangeOperation = keyof RangeOperations

type RangeBehaviorsFunction = (connectionArgs: { [name: string]: any }) => RangeOperation
type RangeBehaviorsObject = {
    [key: string]: RangeOperation
}
export type RangeBehaviors = RangeBehaviorsFunction | RangeBehaviorsObject
type RangeAddConfig = {
    type: "RANGE_ADD"
    parentName?: string
    parentID?: string
    connectionInfo?: Array<{
        key: string
        filters?: Variables
        rangeBehavior: string
    }>
    connectionName?: string
    edgeName: string
    rangeBehaviors?: RangeBehaviors
}
type RangeDeleteConfig = {
    type: "RANGE_DELETE"
    parentName?: string
    parentID?: string
    connectionKeys?: Array<{
        key: string
        filters?: Variables
    }>
    connectionName?: string
    deletedIDFieldName: string | Array<string>
    pathToConnection: Array<string>
}
type NodeDeleteConfig = {
    type: "NODE_DELETE"
    parentName?: string
    parentID?: string
    connectionName?: string
    deletedIDFieldName: string
} // Unused in Relay Modern

type LegacyFieldsChangeConfig = {
    type: "FIELDS_CHANGE"
    fieldIDs: {
        [fieldName: string]: DataID | Array<DataID>
    }
} // Unused in Relay Modern

type LegacyRequiredChildrenConfig = {
    type: "REQUIRED_CHILDREN"
    children: Array<{}>
}
export type DeclarativeMutationConfig =
    | RangeAddConfig
    | RangeDeleteConfig
    | NodeDeleteConfig
    | LegacyFieldsChangeConfig
    | LegacyRequiredChildrenConfig

export function convert(
    configs: Array<DeclarativeMutationConfig>,
    request: ConcreteRequest,
    optimisticUpdater?: SelectorStoreUpdater | null,
    updater?: SelectorStoreUpdater | null
): void
