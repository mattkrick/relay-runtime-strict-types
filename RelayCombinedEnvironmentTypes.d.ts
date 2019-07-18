import { CacheConfig, DataID, Disposable, Variables } from "./RelayRuntimeTypes"
import { RelayObservable as Observable } from "./RelayObservable"
import { SelectorStoreUpdater, TEnvironment, TRequest } from "./RelayStoreTypes"

/**
 * Arbitrary data e.g. received by a container as props.
 */

export type Props = {
    [key: string]: {}
}
/*
 * An individual cached graph object.
 */

export type Record = {
    [key: string]: {}
}
/**
 * A collection of records keyed by id.
 */

export type RecordMap = {
    [dataID: string]: Record | undefined | null
}
/**
 * A selector defines the starting point for a traversal into the graph for the
 * purposes of targeting a subgraph.
 */

export type CNormalizationSelector<TNormalizationNode> = {
    dataID: DataID
    node: TNormalizationNode
    variables: Variables
}
export type CReaderSelector<TReaderNode> = {
    dataID: DataID
    node: TReaderNode
    variables: Variables
}
/**
 * A representation of a selector and its results at a particular point in time.
 */

export type CSnapshot<TReaderNode, TOwner> = CReaderSelector<TReaderNode> & {
    data: SelectorData | undefined | null
    seenRecords: RecordMap
    isMissingData: boolean
    owner: TOwner | null
}
/**
 * The results of a selector given a store/RecordSource.
 */

export type SelectorData = {
    [key: string]: {}
}
/**
 * The results of reading the results of a FragmentMap given some input
 * `Props`.
 */

export type FragmentSpecResults = {
    [key: string]: {}
}
/**
 * A utility for resolving and subscribing to the results of a fragment spec
 * (key -> fragment mapping) given some "props" that determine the root ID
 * and variables to use when reading each fragment. When props are changed via
 * `setProps()`, the resolver will update its results and subscriptions
 * accordingly. Internally, the resolver:
 * - Converts the fragment map & props map into a map of `Selector`s.
 * - Removes any resolvers for any props that became null.
 * - Creates resolvers for any props that became non-null.
 * - Updates resolvers with the latest props.
 */

export interface CFragmentSpecResolver<TRequest> {
    dispose: () => void
    resolve: () => FragmentSpecResults
    setProps: (props: Props) => void
    setVariables: (variables: Variables, node: TRequest) => void
    setCallback: (callback: () => void) => void
}

export type CFragmentMap<TFragment> = {
    [key: string]: TFragment
}
/**
 * An operation selector describes a specific instance of a GraphQL operation
 * with variables applied.
 *
 * - `root`: a selector intended for processing server results or retaining
 *   response data in the store.
 * - `fragment`: a selector intended for use in reading or subscribing to
 *   the results of the the operation.
 */

export type COperationDescriptor<TReaderNode, TNormalizationNode, TRequest> = {
    fragment: CReaderSelector<TReaderNode>
    node: TRequest
    root: CNormalizationSelector<TNormalizationNode>
    variables: Variables
}
/**
 * The public API of Relay core. Represents an encapsulated environment with its
 * own in-memory cache.
 */

export interface CEnvironment<
    TEnvironment,
    TFragment,
    TGraphQLTaggedNode,
    TReaderNode,
    TNormalizationNode,
    TRequest,
    TPayload,
    TReaderSelector
> {
    check: (selector: CNormalizationSelector<TNormalizationNode>) => boolean
    lookup: (
        selector: CReaderSelector<TReaderNode>,
        owner: COperationDescriptor<TReaderNode, TNormalizationNode, TRequest> | undefined | null
    ) => CSnapshot<TReaderNode, COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>>
    subscribe: (
        snapshot: CSnapshot<TReaderNode, COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>>,
        callback: (
            snapshot: CSnapshot<TReaderNode, COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>>
        ) => void
    ) => Disposable
    retain: (selector: CNormalizationSelector<TNormalizationNode>) => Disposable
    execute: (config: {
        operation: COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>
        cacheConfig?: CacheConfig | null
        updater?: SelectorStoreUpdater | null
    }) => Observable<TPayload>
    unstable_internal: CUnstableEnvironmentCore<
        TEnvironment,
        TFragment,
        TGraphQLTaggedNode,
        TReaderNode,
        TNormalizationNode,
        TRequest,
        TReaderSelector
    >
}

export type createFragmentSpecResolver<TEnviroment, TFragment, TRequest> = (
    context: CRelayContext<TEnvironment>,
    containerName: string,
    fragments: CFragmentMap<TFragment>,
    props: Props,
    callback: () => void
) => CFragmentSpecResolver<TRequest>
export type createOperationDescriptor<TReaderNode, TNormalizationNode, TRequest> = (
    request: TRequest,
    variables: Variables
) => COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>
export type getFragment<TGraphQLTaggedNode, TFragment> = (node: TGraphQLTaggedNode) => TFragment
export type getVariablesFromObject<TFragment, TReaderNode, TNormalizationNode> = (
    operationVariables: Variables,
    fragments: CFragmentMap<TFragment>,
    props: Props,
    owner: {
        [key: string]:
            | COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>
            | undefined
            | null
            | Array<COperationDescriptor<TReaderNode, TNormalizationNode, TRequest> | undefined | null>
    }
) => Variables

export interface CUnstableEnvironmentCore<
    TEnvironment,
    TFragment,
    TGraphQLTaggedNode,
    TReaderNode,
    TNormalizationNode,
    TRequest,
    TReaderSelector
> {
    createFragmentSpecResolver: createFragmentSpecResolver<TEnvironment, TFragment, TRequest>
    createOperationDescriptor: createOperationDescriptor<TReaderNode, TNormalizationNode, TRequest>
    getFragment: getFragment<TGraphQLTaggedNode, TFragment>
    getRequest: (node: TGraphQLTaggedNode) => TRequest
    isFragment: (node: TGraphQLTaggedNode) => boolean
    isRequest: (node: TGraphQLTaggedNode) => boolean
    areEqualSelectors: (a: TReaderSelector, b: TReaderSelector) => boolean
    getSelector: (
        operationVariables: Variables,
        fragment: TFragment,
        prop: {},
        owner: COperationDescriptor<TReaderNode, TNormalizationNode, TRequest> | undefined | null
    ) => TReaderSelector | undefined | null
    getSelectorList: (
        operationVariables: Variables,
        fragment: TFragment,
        props: Array<{}>,
        owner: Array<COperationDescriptor<TReaderNode, TNormalizationNode, TRequest> | undefined | null>
    ) => Array<TReaderSelector> | undefined | null
    getSelectorsFromObject: (
        operationVariables: Variables,
        fragments: CFragmentMap<TFragment>,
        props: Props,
        owner: {
            [key: string]:
                | COperationDescriptor<TReaderNode, TNormalizationNode, TRequest>
                | undefined
                | null
                | Array<COperationDescriptor<TReaderNode, TNormalizationNode, TRequest> | undefined | null>
        }
    ) => {
        [key: string]: TReaderSelector | Array<TReaderSelector> | undefined | null
    }
    getDataIDsFromObject: (
        fragments: CFragmentMap<TFragment>,
        props: Props
    ) => {
        [key: string]: DataID | Array<DataID> | undefined | null
    }
    getVariablesFromObject: getVariablesFromObject<TFragment, TReaderNode, TNormalizationNode>
}
/**
 * The type of the `relay` property set on React context by the React/Relay
 * integration layer (e.g. QueryRenderer, FragmentContainer, etc).
 */

export type CRelayContext<TEnvironment> = {
    environment: TEnvironment
    variables: Variables
}
