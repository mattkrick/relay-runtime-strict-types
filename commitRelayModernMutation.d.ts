import { Disposable, Variables } from "./RelayRuntimeTypes"
import { GraphQLTaggedNode } from "./RelayModernGraphQLTag"
import { PayloadError, UploadableMap } from "./RelayNetworkTypes"
import { IEnvironment, SelectorStoreUpdater } from "./RelayStoreTypes"
import { DeclarativeMutationConfig } from "./RelayDeclarativeMutationConfig"

export interface OperationBase {
    variables: object
    response: object
}
export interface OperationDefaults {
    variables: Variables
    response: Variables
}

export type MutationConfig<T extends OperationBase> = {
    configs?: Array<DeclarativeMutationConfig>
    mutation: GraphQLTaggedNode
    variables: T["variables"]
    uploadables?: UploadableMap
    onCompleted?: (response: T["response"], errors: Array<PayloadError> | undefined | null) => void | null
    onError?: (error: Error) => void | null
    optimisticUpdater?: SelectorStoreUpdater<T["response"]> | null
    optimisticResponse?: T["response"]
    updater?: SelectorStoreUpdater<T["response"]> | null
}

export function commitRelayModernMutation<T extends OperationBase = OperationDefaults>(
    environment: IEnvironment,
    config: MutationConfig<T>
): Disposable

export { commitRelayModernMutation as commitMutation }
