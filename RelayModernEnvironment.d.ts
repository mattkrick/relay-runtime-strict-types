import {
    IEnvironment,
    MissingFieldHandler,
    NormalizationSelector,
    OperationDescriptor,
    OperationLoader,
    OptimisticUpdate,
    ReaderSelector,
    SelectorStoreUpdater,
    Snapshot,
    StoreUpdater
} from "./RelayStoreTypes"
import { RelayObservable } from "./RelayObservable"
import { CacheConfig, Disposable } from "./RelayRuntimeTypes"
import { HandlerProvider } from "./RelayDefaultHandlerProvider"
import { GraphQLResponse, Network, PayloadData, PayloadError, UploadableMap } from "./RelayNetworkTypes"
import { Store } from "./RelayModernStore"

export type EnvironmentConfig = {
    readonly configName?: string
    readonly handlerProvider?: HandlerProvider
    readonly operationLoader?: OperationLoader
    readonly network: Network
    readonly store: Store
    readonly missingFieldHandlers?: ReadonlyArray<MissingFieldHandler>
}

export class RelayModernEnvironment {
    constructor(config: EnvironmentConfig)
    unstable_internal: any
    getStore(): Store

    getNetwork(): Network

    applyUpdate(optimisticUpdate: OptimisticUpdate): Disposable

    revertUpdate(update: OptimisticUpdate): void

    replaceUpdate(update: OptimisticUpdate, newUpdate: OptimisticUpdate): void

    applyMutation({
        operation,
        optimisticResponse,
        optimisticUpdater
    }: {
        operation: OperationDescriptor
        optimisticUpdater?: SelectorStoreUpdater | null
        optimisticResponse?: Object
    }): Disposable

    check(readSelector: NormalizationSelector): boolean

    commitPayload(operationDescriptor: OperationDescriptor, payload: PayloadData): void

    commitUpdate(updater: StoreUpdater): void

    lookup(readSelector: ReaderSelector, owner?: OperationDescriptor | undefined | null): Snapshot

    subscribe(snapshot: Snapshot, callback: (snapshot: Snapshot) => void): Disposable

    retain(selector: NormalizationSelector): Disposable

    _checkSelectorAndHandleMissingFields(
        selector: NormalizationSelector,
        handlers: ReadonlyArray<MissingFieldHandler>
    ): boolean

    /**
     * Returns an Observable of GraphQLResponse resulting from executing the
     * provided Query or Subscription operation, each result of which is then
     * normalized and committed to the publish queue.
     *
     * Note: Observables are lazy, so calling this method will do nothing until
     * the result is subscribed to: environment.execute({...}).subscribe({...}).
     */

    execute({
        operation,
        cacheConfig,
        updater
    }: {
        operation: OperationDescriptor
        cacheConfig?: CacheConfig | null
        updater?: SelectorStoreUpdater | null
    }): RelayObservable<GraphQLResponse>

    /**
     * Returns an Observable of GraphQLResponse resulting from executing the
     * provided Mutation operation, the result of which is then normalized and
     * committed to the publish queue along with an optional optimistic response
     * or updater.
     *
     * Note: Observables are lazy, so calling this method will do nothing until
     * the result is subscribed to:
     * environment.executeMutation({...}).subscribe({...}).
     */

    executeMutation({
        operation,
        optimisticResponse,
        optimisticUpdater,
        updater,
        uploadables
    }: {
        operation: OperationDescriptor
        optimisticUpdater?: SelectorStoreUpdater | null
        optimisticResponse?: Object | null
        updater?: SelectorStoreUpdater | null
        uploadables?: UploadableMap | null
    }): RelayObservable<GraphQLResponse>

    /**
     * @deprecated Use IEnvironment.execute().subscribe()
     */

    sendQuery({
        cacheConfig,
        onCompleted,
        onError,
        onNext,
        operation
    }: {
        cacheConfig?: CacheConfig | null
        onCompleted?: () => void | null
        onError?: (error: Error) => void | null
        onNext?: (payload: GraphQLResponse) => void | null
        operation: OperationDescriptor
    }): Disposable

    /**
     * @deprecated Use IEnvironment.executeMutation().subscribe()
     */

    sendMutation({
        onCompleted,
        onError,
        operation,
        optimisticResponse,
        optimisticUpdater,
        updater,
        uploadables
    }: {
        onCompleted?: (errors: Array<PayloadError> | undefined | null) => void | null
        onError?: (error: Error) => void | null
        operation: OperationDescriptor
        optimisticUpdater?: SelectorStoreUpdater | null
        optimisticResponse?: Object
        updater?: SelectorStoreUpdater | null
        uploadables?: UploadableMap
    }): Disposable

    toJSON(): string
}

export { RelayModernEnvironment as Environment }
