import { GraphQLTaggedNode } from "./RelayModernGraphQLTag"
import { CacheConfig, OperationType } from "./RelayRuntimeTypes"
import { IEnvironment } from "./RelayStoreTypes"

export function fetchRelayModernQuery<T extends OperationType>(
    environment: IEnvironment,
    taggedNode: GraphQLTaggedNode,
    variables: T["variables"],
    cacheConfig?: CacheConfig | null
): Promise<T["response"]>

export { fetchRelayModernQuery as fetchQuery }
