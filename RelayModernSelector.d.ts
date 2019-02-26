import { OperationDescriptor, OwnedReaderSelector } from "./RelayStoreTypes"
import { DataID, Variables } from "./RelayRuntimeTypes"
import { ReaderFragment } from "./ReaderNode"

export function getSelector(
    operationVariables: Variables,
    fragment: ReaderFragment,
    item: {},
    explicitOwner?: OperationDescriptor | null
): OwnedReaderSelector | undefined | null
export function getSelectorList(
    operationVariables: Variables,
    fragment: ReaderFragment,
    items: Array<{}>,
    owners?: Array<OperationDescriptor | undefined | null>
): Array<OwnedReaderSelector> | undefined | null

export function getSelectorsFromObject(
    operationVariables: Variables,
    fragments: {
        [key: string]: ReaderFragment
    },
    object: {
        [key: string]: {}
    },
    owners?: {
        [key: string]: OperationDescriptor | undefined | null | Array<OperationDescriptor | undefined | null>
    }
): {
    [key: string]: OwnedReaderSelector | Array<OwnedReaderSelector> | undefined | null
}

export function getDataIDsFromObject(
    fragments: {
        [key: string]: ReaderFragment
    },
    object: {
        [key: string]: {}
    }
): {
    [key: string]: DataID | Array<DataID> | undefined | null
}

export function areEqualSelectors(thisSelector: OwnedReaderSelector, thatSelector: OwnedReaderSelector): boolean
