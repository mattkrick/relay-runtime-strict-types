import { Variables } from "./RelayRuntimeTypes"
import { GraphQLResponse } from "./RelayNetworkTypes"

export class QueryResponseCache {
    constructor(options: { size: number; ttl: number })
    clear(): void
    get(queryID: string, variables: Variables): GraphQLResponse | null
    set(queryID: string, variables: Variables, payload: GraphQLResponse): void
}
