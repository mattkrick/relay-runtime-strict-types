import { NormalizationOperation, NormalizationSplitOperation } from "./NormalizationNode"
import { ReaderFragment } from "./ReaderNode"

export type ConcreteRequest = {
    readonly kind: "Request"
    readonly fragment: ReaderFragment
    readonly operation: NormalizationOperation
    readonly params: RequestParameters
}

type Persisted = {
    readonly text: null
    readonly id: string
}

type Standard = {
    readonly text: string
    readonly id: null
}

export type RequestParameters = BaseRequestParameters & Persisted

interface BaseRequestParameters {
    readonly name: string
    readonly operationKind: "mutation" | "query" | "subscription"
    readonly metadata: {
        [key: string]: {}
    }
}
export type GeneratedNode = ConcreteRequest | ReaderFragment | NormalizationSplitOperation
