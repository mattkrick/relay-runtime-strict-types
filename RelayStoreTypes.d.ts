// Using `enum` here to create a distinct type and `const` to ensure it doesn’t leave any generated code.
// tslint:disable-next-line:no-const-enum
import { DataID, Disposable, Variables } from "./RelayRuntimeTypes"
import {
    CEnvironment,
    CFragmentMap,
    CFragmentSpecResolver,
    CNormalizationSelector,
    COperationDescriptor,
    CReaderSelector,
    CRelayContext,
    CSnapshot,
    CUnstableEnvironmentCore
} from "./RelayCombinedEnvironmentTypes"
import { RelayObservable } from "./RelayObservable"
import { GraphQLTaggedNode } from "./RelayModernGraphQLTag"
import { ReaderFragment, ReaderSelectableNode } from "./ReaderNode"
import {
    NormalizationLinkedField,
    NormalizationScalarField,
    NormalizationSelectableNode,
    NormalizationSplitOperation
} from "./NormalizationNode"
import { GraphQLResponse, PayloadData, PayloadError, UploadableMap } from "./RelayNetworkTypes"
import { ConcreteRequest } from "./RelayConcreteNode"
import { Record } from "./RelayCombinedEnvironmentTypes"
import { RelayInMemoryRecordSource as RecordSource } from "./RelayInMemoryRecordSource"
import { Store } from "./RelayModernStore"

export type FragmentReference = never

type TEnvironment = IEnvironment
type TFragment = ReaderFragment
type TGraphQLTaggedNode = GraphQLTaggedNode
type TReaderNode = ReaderSelectableNode
type TNormalizationNode = NormalizationSelectableNode
type TPayload = GraphQLResponse
type TRequest = ConcreteRequest
type TReaderSelector = OwnedReaderSelector
export type FragmentMap = CFragmentMap<TFragment>
export type OperationDescriptor = COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>
export type RelayContext = CRelayContext<TEnvironment>
export type ReaderSelector = CReaderSelector<TReaderNode>
export type OwnedReaderSelector = {
    owner: OperationDescriptor | null
    selector: ReaderSelector
}
export type NormalizationSelector = CNormalizationSelector<TNormalizationNode>
export type Snapshot = CSnapshot<TReaderNode, OperationDescriptor>
export type UnstableEnvironmentCore = CUnstableEnvironmentCore<
    TEnvironment,
    TFragment,
    TGraphQLTaggedNode,
    TReaderNode,
    TNormalizationNode,
    TRequest,
    TReaderSelector
>
export interface FragmentSpecResolver extends CFragmentSpecResolver<TRequest> {}

/**
 * A read/write interface for accessing and updating graph data.
 */

export interface MutableRecordSource extends RecordSource {
    clear(): void
    delete(dataID: DataID): void
    remove(dataID: DataID): void
    set(dataID: DataID, record: Record): void
}

/**
 * A type that accepts a callback and schedules it to run at some future time.
 * By convention, implementations should not execute the callback immediately.
 */

export type Scheduler = (a: () => void) => void
/**
 * An interface for imperatively getting/setting properties of a `Record`. This interface
 * is designed to allow the appearance of direct Record manipulation while
 * allowing different implementations that may e.g. create a changeset of
 * the modifications.
 */

type MaybeNull<T> = null extends T ? null : never
type Unarray<T> = T extends Array<infer U> ? U : T
type NullableRecord<T> = RecordProxy<NonNullable<T>> | MaybeNull<T>
type DeepNullable<T> = {
    [P in keyof T]: T[P] extends Array<infer U>
      ? Array<DeepNullable<U>> | null
      : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepNullable<U>> | null
        : DeepNullable<T[P]> | null
}

export interface RecordProxy<T = { [key: string]: any }> {
    copyFieldsFrom(source: any): void
    getDataID(): DataID
    getLinkedRecord<H extends unknown = unknown, K extends keyof T = any>(
        name: K,
        args?: Variables
    ): RecordProxy<H extends unknown ? NonNullable<T[K]> : H> | MaybeNull<T[K]>
    getLinkedRecords<H extends unknown = unknown, K extends keyof T = any>(
        name: K,
        args?: Variables
    ): MaybeNull<T[K]> | Array<NullableRecord<H extends unknown ? Unarray<NonNullable<T[K]>> : H>>
    getOrCreateLinkedRecord(name: string, typeName: string, args?: Variables): RecordProxy
    getType(): string
    getValue<K extends keyof T>(name: K, args?: Variables): T[K]
    setLinkedRecord<K extends keyof T>(record: RecordProxy<T[K]> | null, name: K, args?: Variables): RecordProxy
    setLinkedRecords<K extends keyof T = any>(
        records: Array<RecordProxy<Unarray<T[K]>> | null> | undefined | null,
        name: K,
        args?: Variables
    ): RecordProxy
    setValue<K extends keyof T>(value: any, name: K, args?: Variables): RecordProxy
}

export interface ReadOnlyRecordProxy {
    getDataID(): DataID
    getLinkedRecord(name: string, args?: Variables): RecordProxy | null
    getLinkedRecords(name: string, args?: Variables): ReadonlyArray<RecordProxy | null> | null
    getType(): string
    getValue(name: string, args?: Variables): any
}
/**
 * An interface for imperatively getting/setting properties of a `RecordSource`. This interface
 * is designed to allow the appearance of direct RecordSource manipulation while
 * allowing different implementations that may e.g. create a changeset of
 * the modifications.
 */

export interface RecordSourceProxy {
    create(dataID: DataID, typeName: string): RecordProxy
    delete(dataID: DataID): void
    get(dataID: DataID): RecordProxy | null
    getRoot(): RecordProxy
}

export interface ReadOnlyRecordSourceProxy {
    get(dataID: DataID): RecordProxy | null
    getRoot(): ReadOnlyRecordProxy
}
/**
 * Extends the RecordSourceProxy interface with methods for accessing the root
 * fields of a Selector.
 */

export interface RecordSourceSelectorProxy<T = { [key: string]: any }> {
    create<K = any>(dataID: DataID, typeName: string): RecordProxy<K>
    delete(dataID: DataID): void
    get<K = { [key: string]: any }>(dataID: DataID): RecordProxy<K> | null
    getRoot(): RecordProxy
    getRootField<K extends keyof T>(fieldName: K): RecordProxy<NonNullable<T[K]>> | MaybeNull<T[K]>
    getPluralRootField(fieldName: string): RecordProxy[] | null
}
/**
 * The public API of Relay core. Represents an encapsulated environment with its
 * own in-memory cache.
 */

export interface IEnvironment
    extends CEnvironment<
        TEnvironment,
        TFragment,
        TGraphQLTaggedNode,
        TReaderNode,
        TNormalizationNode,
        TRequest,
        TPayload,
        TReaderSelector
    > {
    /**
     * Apply an optimistic update to the environment. The mutation can be reverted
     * by calling `dispose()` on the returned value.
     */
    applyUpdate(optimisticUpdate: OptimisticUpdate): Disposable

    /**
     * Commit an updater to the environment. This mutation cannot be reverted and
     * should therefore not be used for optimistic updates. This is mainly
     * intended for updating fields from client schema extensions.
     */
    commitUpdate(updater: StoreUpdater): void

    /**
     * Commit a payload to the environment using the given operation selector.
     */
    commitPayload(operationDescriptor: OperationDescriptor, payload: PayloadData): void

    /**
     * Get the environment's internal Store.
     */
    getStore(): Store

    /**
     * Read the results of a selector from in-memory records in the store.
     * Optionally takes an owner, corresponding to the operation that
     * owns this selector (fragment).
     */
    lookup(selector: ReaderSelector, owner?: OperationDescriptor | null): CSnapshot<TReaderNode, OperationDescriptor>

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
    executeMutation(config: {
        operation: OperationDescriptor
        optimisticUpdater?: SelectorStoreUpdater
        optimisticResponse?: object
        updater?: SelectorStoreUpdater
        uploadables?: UploadableMap
    }): RelayObservable<GraphQLResponse>
}
/**
 * The results of reading data for a fragment. This is similar to a `Selector`,
 * but references the (fragment) node by name rather than by value.
 */

export type FragmentPointer = {
    __id: DataID
    __fragments: {
        [fragmentName: string]: Variables
    }
    __fragmentOwner: OperationDescriptor | null
}
/**
 * The partial shape of an object with a '...Fragment @module(name: "...")'
 * selection
 */

export type ModuleImportPointer = {
    readonly __fragmentPropName?: string | undefined | null
    readonly __module_component: {}
    readonly $fragmentRefs: {}
}
/**
 * A callback for resolving a Selector from a source.
 */

export type AsyncLoadCallback = (loadingState: LoadingState) => void
export type LoadingState = {
    status: "aborted" | "complete" | "error" | "missing"
    error?: Error
}
/**
 * A map of records affected by an update operation.
 */

export type UpdatedRecords = {
    [dataID: string]: boolean
}
/**
 * A function that updates a store (via a proxy) given the results of a "handle"
 * field payload.
 */

export type Handler = {
    update: (store: RecordSourceProxy, fieldPayload: HandleFieldPayload) => void
}
/**
 * A payload that is used to initialize or update a "handle" field with
 * information from the server.
 */

export type HandleFieldPayload = {
    readonly args: Variables
    readonly dataID: DataID
    readonly fieldKey: string
    readonly handle: string
    readonly handleKey: string
}
/**
 * A payload that represents data necessary to process the results of an object
 * with a `@module` fragment spread:
 * - data: The GraphQL response value for the @match field.
 * - dataID: The ID of the store object linked to by the @match field.
 * - operationReference: A reference to a generated module containing the
 *   SplitOperation with which to normalize the field's `data`.
 * - variables: Query variables.
 * - typeName: the type that matched.
 *
 * The dataID, variables, and fragmentName can be used to create a Selector
 * which can in turn be used to normalize and publish the data. The dataID and
 * typeName can also be used to construct a root record for normalization.
 */

export type ModuleImportPayload = {
    readonly data: PayloadData
    readonly dataID: DataID
    readonly operationReference: {}
    readonly path: ReadonlyArray<string>
    readonly typeName: string
    readonly variables: Variables
}
/**
 * Data emitted after processing a Defer or Stream node during normalization
 * that describes how to process the corresponding response chunk when it
 * arrives.
 */

export type DeferPlaceholder = {
    readonly kind: "defer"
    readonly label: string
    readonly path: ReadonlyArray<string>
    readonly selector: NormalizationSelector
    readonly typeName: string
}
export type StreamPlaceholder = {
    readonly kind: "stream"
    readonly label: string
    readonly path: ReadonlyArray<string>
    readonly selector: NormalizationSelector
    readonly typeName: string
}
export type IncrementalDataPlaceholder = DeferPlaceholder | StreamPlaceholder
/**
 * A user-supplied object to load a generated operation (SplitOperation) AST
 * by a module reference. The exact format of a module reference is left to
 * the application, but it must be a plain JavaScript value (string, number,
 * or object/array of same).
 */

export type OperationLoader = {
    get: (reference: {}) => NormalizationSplitOperation | undefined | null
    load: (reference: {}) => Promise<NormalizationSplitOperation | undefined | null>
}
/**
 * A function that receives a proxy over the store and may trigger side-effects
 * (indirectly) by calling `set*` methods on the store or its record proxies.
 */

export type StoreUpdater = (store: RecordSourceProxy) => void
/**
 * Similar to StoreUpdater, but accepts a proxy tied to a specific selector in
 * order to easily access the root fields of a query/mutation as well as a
 * second argument of the response object of the mutation.
 */

export type SelectorStoreUpdater<T = any> = (store: RecordSourceSelectorProxy<T>, data: T) => void
/**
 * A set of configs that can be used to apply an optimistic update into the
 * store.
 * TODO: we should probably only expose `storeUpdater` and `source` to the
 * publish queue.
 */

export type OptimisticUpdate =
    | {
          storeUpdater: StoreUpdater
      }
    | {
          selectorStoreUpdater: SelectorStoreUpdater | undefined | null
          operation: OperationDescriptor
          response: Object | undefined | null
      }
    | {
          source: RecordSource
          fieldPayloads?: Array<HandleFieldPayload> | null
      }
/**
 * A set of handlers that can be used to provide substitute data for missing
 * fields when reading a selector from a source.
 */

export type MissingFieldHandler =
    | {
          kind: "scalar"
          handle: (
              field: NormalizationScalarField,
              record: Record | undefined | null,
              args: Variables,
              store: ReadOnlyRecordSourceProxy
          ) => {}
      }
    | {
          kind: "linked"
          handle: (
              field: NormalizationLinkedField,
              record: Record | undefined | null,
              args: Variables,
              store: ReadOnlyRecordSourceProxy
          ) => DataID | undefined | null
      }
    | {
          kind: "pluralLinked"
          handle: (
              field: NormalizationLinkedField,
              record: Record | undefined | null,
              args: Variables,
              store: ReadOnlyRecordSourceProxy
          ) => Array<DataID | undefined | null> | undefined | null
      }
/**
 * The results of normalizing a query.
 */

export type RelayResponsePayload = {
    incrementalPlaceholders: Array<IncrementalDataPlaceholder> | undefined | null
    fieldPayloads: Array<HandleFieldPayload> | null
    moduleImportPayloads: Array<ModuleImportPayload> | undefined | null
    source: MutableRecordSource
    errors: Array<PayloadError> | undefined | null
}
