import { ConcreteRequest } from "./RelayConcreteNode"
import { ReaderFragment, ReaderPaginationFragment, ReaderRefetchableFragment } from "./ReaderNode"

export type GraphQLTaggedNode =
    | ReaderFragment
    | ConcreteRequest
    | (() => ReaderFragment | ConcreteRequest)
    | { modern: () => ReaderFragment | ConcreteRequest }

export function getPaginationFragment(taggedNode: GraphQLTaggedNode): ReaderPaginationFragment | null

export function getRefetchableFragment(taggedNode: GraphQLTaggedNode): ReaderRefetchableFragment | null

export function getRequest(taggedNode: GraphQLTaggedNode): ConcreteRequest

export function graphql(strings: Array<string>): GraphQLTaggedNode
