import { ConcreteRequest } from "./RelayConcreteNode"

export type ConnectionMetadata = {
    path: Array<string> | undefined | null
    direction: "forward" | "backward" | "bidirectional" | undefined | null
    cursor: string | undefined | null
    count: string | undefined | null
}
export type ReaderFragmentSpread = {
    readonly kind: "FragmentSpread"
    readonly name: string
    readonly args: ReadonlyArray<ReaderArgument> | undefined | null
}
export type ReaderFragment = {
    readonly kind: "Fragment"
    readonly name: string
    readonly type: string
    readonly metadata:
        | {
              readonly connection?: ReadonlyArray<ConnectionMetadata>
              readonly mask?: boolean
              readonly plural?: boolean
              readonly refetch?: ReaderRefetchMetadata
          }
        | undefined
        | null
    readonly argumentDefinitions: ReadonlyArray<ReaderArgumentDefinition>
    readonly selections: ReadonlyArray<ReaderSelection>
} // Marker type for a @refetchable fragment

export type ReaderRefetchableFragment =
    | {
          readonly metadata: {
              readonly connection?: [ConnectionMetadata]
              readonly refetch: ReaderRefetchMetadata
          }
      }
    | ReaderFragment // Marker Type for a @refetchable fragment with a single use of @connection

export type ReaderPaginationFragment =
    | {
          readonly metadata: {
              readonly connection: [ConnectionMetadata]
              readonly refetch:
                  | {
                        connection: ReaderPaginationMetadata
                    }
                  | ReaderRefetchMetadata
          }
      }
    | ReaderFragment
export type ReaderRefetchMetadata = {
    readonly connection: ReaderPaginationMetadata | undefined | null
    readonly operation: string | ConcreteRequest
    readonly fragmentPathInResult: Array<string>
} // Stricter form of ConnectionMetadata

export type ReaderPaginationMetadata = {
    readonly backward: {
        readonly count: string
        readonly cursor: string
    } | null
    readonly forward: {
        readonly count: string
        readonly cursor: string
    } | null
    readonly path: ReadonlyArray<string>
}
export type ReaderArgument = ReaderLiteral | ReaderVariable
export type ReaderArgumentDefinition = ReaderLocalArgument | ReaderRootArgument
export type ReaderCondition = {
    readonly kind: "Condition"
    readonly passingValue: boolean
    readonly condition: string
    readonly selections: ReadonlyArray<ReaderSelection>
}
export type ReaderField = ReaderScalarField | ReaderLinkedField
export type ReaderRootArgument = {
    readonly kind: "RootArgument"
    readonly name: string
    readonly type: string | undefined | null
}
export type ReaderInlineFragment = {
    readonly kind: "InlineFragment"
    readonly selections: ReadonlyArray<ReaderSelection>
    readonly type: string
}
export type ReaderLinkedField = {
    readonly kind: "LinkedField"
    readonly alias: string | undefined | null
    readonly name: string
    readonly storageKey: string | undefined | null
    readonly args: ReadonlyArray<ReaderArgument> | undefined | null
    readonly concreteType: string | undefined | null
    readonly plural: boolean
    readonly selections: ReadonlyArray<ReaderSelection>
}
export type ReaderModuleImport = {
    readonly kind: "ModuleImport"
    readonly fragmentPropName: string
    readonly fragmentName: string
}
export type ReaderLiteral = {
    readonly kind: "Literal"
    readonly name: string
    readonly type: string | undefined | null
    readonly value: {}
}
export type ReaderLocalArgument = {
    readonly kind: "LocalArgument"
    readonly name: string
    readonly type: string
    readonly defaultValue: unknown
}
export type ReaderNode =
    | ReaderCondition
    | ReaderLinkedField
    | ReaderFragment
    | ReaderInlineFragment
    | ReaderSplitOperation
export type ReaderScalarField = {
    readonly kind: "ScalarField"
    readonly alias: string | undefined | null
    readonly name: string
    readonly args: ReadonlyArray<ReaderArgument> | undefined | null
    readonly storageKey: string | undefined | null
}
export type ReaderSelection =
    | ReaderCondition
    | ReaderField
    | ReaderFragmentSpread
    | ReaderInlineFragment
    | ReaderModuleImport
export type ReaderSplitOperation = {
    readonly kind: "SplitOperation"
    readonly name: string
    readonly metadata:
        | {
              [key: string]: {}
          }
        | undefined
        | null
    readonly selections: ReadonlyArray<ReaderSelection>
}
export type ReaderVariable = {
    readonly kind: "Variable"
    readonly name: string
    readonly type: string | undefined | null
    readonly variableName: string
}
export type ReaderSelectableNode = ReaderFragment | ReaderSplitOperation
