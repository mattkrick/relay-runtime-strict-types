export type Disposable = {
    dispose: () => void
}
export type DataID = string // Variables

export type Variables = {
    [name: string]: any
}
/**
 * Generated operation flow types are subtypes of this.
 */

export type OperationType = {
    readonly variables: Variables
    readonly response: {}
}
/**
 * Settings for how a query response may be cached.
 *
 * - `force`: causes a query to be issued unconditionally, irrespective of the
 *   state of any configured response cache.
 * - `poll`: causes a query to live update by polling at the specified interval
 *   in milliseconds. (This value will be passed to setTimeout.)
 * - `liveConfigId`: causes a query to live update by calling GraphQLLiveQuery,
 *   it represents a configuration of gateway when doing live query
 * - `metadata`: user-supplied metadata.
 * - `transactionId`: a user-supplied value, intended for use as a unique id for
 *   a given instance of executing an operation.
 */

export type CacheConfig = {
    force?: boolean | null
    poll?: number | null
    liveConfigId?: string | null
    metadata?: {
        [key: string]: {}
    }
    transactionId?: string | null
}
