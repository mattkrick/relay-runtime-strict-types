import { Disposable, Variables } from "./RelayRuntimeTypes"
import { GraphQLTaggedNode } from "./RelayModernGraphQLTag"
import { DeclarativeMutationConfig } from "./RelayDeclarativeMutationConfig"
import { IEnvironment, SelectorStoreUpdater } from "./RelayStoreTypes"

export type GraphQLSubscriptionConfig<TSubscriptionPayload> = {
    configs?: Array<DeclarativeMutationConfig>
    subscription: GraphQLTaggedNode
    variables: Variables
    onCompleted?: () => void | null
    onError?: (error: Error) => void | null
    onNext?: (response: TSubscriptionPayload | undefined | null) => void | null
    updater?: SelectorStoreUpdater | null
}

export function requestRelaySubscription<TSubscriptionPayload>(
    environment: IEnvironment,
    config: GraphQLSubscriptionConfig<TSubscriptionPayload>
): Disposable

export { requestRelaySubscription as requestSubscription }
