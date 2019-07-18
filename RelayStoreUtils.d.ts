import { Variables } from "./RelayRuntimeTypes"
import { NormalizationArgument, NormalizationField, NormalizationHandle } from "./NormalizationNode"
import { ReaderArgument, ReaderField } from "./ReaderNode"

export type Arguments = {
    [argName: string]: {}
}

export function getStorageKey(
    field: NormalizationField | NormalizationHandle | ReaderField,
    variables: Variables
): string
