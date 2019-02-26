import { RequestParameters } from "./RelayConcreteNode"
import { CacheConfig, Disposable, Variables } from "./RelayRuntimeTypes"
import { ObservableFromValue, RelayObservable } from "./RelayObservable"

// @types comment: combined create & execute in a single class
export class Network {
    static create(fetchFn: FetchFunction, subscribeFn?: SubscribeFunction): Network
    execute: ExecuteFunction
}

export type PayloadData = {
    [key: string]: {}
}
export type PayloadError = {
    message: string
    locations?: Array<{
        line: number
        column: number
    }>
    severity?: "CRITICAL" | "ERROR" | "WARNING"
}
export type PayloadExtensions = {
    [key: string]: {}
}
/**
 * The shape of a GraphQL response as dictated by the
 * [spec](http://facebook.github.io/graphql/#sec-Response)
 */

export type GraphQLResponse =
    | {
          data: PayloadData
          errors?: Array<PayloadError>
          extensions?: PayloadExtensions
          label?: string
          path?: Array<string | number>
      }
    | {
          data?: PayloadData | null
          errors: Array<PayloadError>
          extensions?: PayloadExtensions
          label?: string
          path?: Array<string | number>
      }
/**
 * A function that returns an Observable representing the response of executing
 * a GraphQL operation.
 */

export type ExecuteFunction = (
    request: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap | undefined | null
) => RelayObservable<GraphQLResponse>
/**
 * A function that executes a GraphQL operation with request/response semantics.
 *
 * May return an Observable or Promise of a plain GraphQL server response, or
 * a composed ExecutePayload object supporting additional metadata.
 */

export type FetchFunction = (
    request: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap | undefined | null
) => ObservableFromValue<GraphQLResponse>
/**
 * A function that executes a GraphQL subscription operation, returning one or
 * more raw server responses over time.
 *
 * May return an Observable, otherwise must call the callbacks found in the
 * fourth parameter.
 */

export type SubscribeFunction = (
    request: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
    observer: LegacyObserver<GraphQLResponse>
) => RelayObservable<GraphQLResponse> | Disposable // $FlowFixMe(site=react_native_fb) this is compatible with classic api see D4658012

export type Uploadable = File | Blob // $FlowFixMe this is compatible with classic api see D4658012

export type UploadableMap = {
    [key: string]: Uploadable
} // Supports legacy SubscribeFunction definitions. Do not use in new code.

export type LegacyObserver<T> = {
    readonly onCompleted?: () => void | null
    readonly onError?: (error: Error) => void | null
    readonly onNext?: (data: T) => void | null
}
