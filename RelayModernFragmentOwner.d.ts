import { ReaderFragment } from "./ReaderNode"
import { FragmentPointer, OperationDescriptor } from "./RelayStoreTypes"

// function getSingularFragmentOwner(fragmentNode: ReaderFragment, fragmentRef: FragmentPointer | undefined | null): OperationDescriptor | undefined | null

// function getPluralFragmentOwner(fragmentNode: ReaderFragment, fragmentRef: ReadonlyArray<FragmentPointer | undefined | null>): Array<OperationDescriptor | undefined | null>

export function getFragmentOwner(
    fragmentNode: ReaderFragment,
    fragmentRef: FragmentPointer | undefined | null | ReadonlyArray<FragmentPointer | undefined | null>
): OperationDescriptor | undefined | null | Array<OperationDescriptor | undefined | null>

export function getFragmentOwners(
    fragmentNodes: {
        [x: string]: ReaderFragment
    },
    fragmentRefs: {
        [x: string]: {}
    }
): {
    [x: string]: OperationDescriptor | undefined | null | Array<OperationDescriptor | undefined | null>
}
