export type NormalizationOperation = {
    readonly kind: "Operation"
    readonly name: string
    readonly argumentDefinitions: ReadonlyArray<NormalizationLocalArgument>
    readonly selections: ReadonlyArray<NormalizationSelection>
}
export type NormalizationHandle = NormalizationScalarHandle | NormalizationLinkedHandle
export type NormalizationLinkedHandle = {
    readonly kind: "LinkedHandle"
    readonly alias?: string | undefined | null
    readonly name: string
    readonly args: ReadonlyArray<NormalizationArgument> | undefined | null
    readonly handle: string
    readonly key: string
    readonly filters: ReadonlyArray<string> | undefined | null
}
export type NormalizationScalarHandle = {
    readonly kind: "ScalarHandle"
    readonly alias?: string | undefined | null
    readonly name: string
    readonly args: ReadonlyArray<NormalizationArgument> | undefined | null
    readonly handle: string
    readonly key: string
    readonly filters: ReadonlyArray<string> | undefined | null
}
export type NormalizationArgument = NormalizationLiteral | NormalizationVariable
export type NormalizationArgumentDefinition = NormalizationLocalArgument | NormalizationRootArgument
export type NormalizationCondition = {
    readonly kind: "Condition"
    readonly passingValue: boolean
    readonly condition: string
    readonly selections: ReadonlyArray<NormalizationSelection>
}
export type NormalizationField = NormalizationScalarField | NormalizationLinkedField
export type NormalizationRootArgument = {
    readonly kind: "RootArgument"
    readonly name: string
    readonly type?: string | undefined | null
}
export type NormalizationInlineFragment = {
    readonly kind: "InlineFragment"
    readonly selections: ReadonlyArray<NormalizationSelection>
    readonly type: string
}
export type NormalizationLinkedField = {
    readonly kind: "LinkedField"
    readonly alias?: string | undefined | null
    readonly name: string
    readonly storageKey?: string | undefined | null
    readonly args: ReadonlyArray<NormalizationArgument> | undefined | null
    readonly concreteType?: string | undefined | null
    readonly plural: boolean
    readonly selections: ReadonlyArray<NormalizationSelection>
}
export type NormalizationModuleImport = {
    readonly kind: "ModuleImport"
    readonly fragmentPropName: string
    readonly fragmentName: string
}
export type NormalizationLiteral = {
    readonly kind: "Literal"
    readonly name: string
    readonly type?: string | undefined | null
    readonly value: unknown
}
export type NormalizationLocalArgument = {
    readonly kind: "LocalArgument"
    readonly name: string
    readonly type: string
    readonly defaultValue: unknown
}
export type NormalizationNode =
    | NormalizationCondition
    | NormalizationDefer
    | NormalizationLinkedField
    | NormalizationInlineFragment
    | NormalizationOperation
    | NormalizationSplitOperation
    | NormalizationStream
export type NormalizationScalarField = {
    readonly kind: "ScalarField"
    readonly alias?: string | undefined | null
    readonly name: string
    readonly args: ReadonlyArray<NormalizationArgument> | undefined | null
    readonly storageKey?: string | undefined | null
}
export type NormalizationSelection =
    | NormalizationCondition
    | NormalizationField
    | NormalizationHandle
    | NormalizationInlineFragment
    | NormalizationModuleImport
export type NormalizationSplitOperation = {
    readonly kind: "SplitOperation"
    readonly name: string
    readonly metadata:
        | {
              [key: string]: {}
          }
        | undefined
        | null
    readonly selections: ReadonlyArray<NormalizationSelection>
}
export type NormalizationStream = {
    readonly if: string | null
    readonly kind: "Stream"
    readonly label: string
    readonly metadata:
        | {
              [key: string]: {}
          }
        | undefined
        | null
    readonly selections: ReadonlyArray<NormalizationSelection>
}
export type NormalizationDefer = {
    readonly if: string | null
    readonly kind: "Defer"
    readonly label: string
    readonly metadata:
        | {
              [key: string]: {}
          }
        | undefined
        | null
    readonly selections: ReadonlyArray<NormalizationSelection>
}
export type NormalizationVariable = {
    readonly kind: "Variable"
    readonly name: string
    readonly type?: string | undefined | null
    readonly variableName: string
}
export type NormalizationSelectableNode =
    | NormalizationDefer
    | NormalizationOperation
    | NormalizationSplitOperation
    | NormalizationStream
