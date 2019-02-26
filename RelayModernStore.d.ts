import { RecordSource } from "./RelayInMemoryRecordSource"
import { Subscription } from "./RelayObservable"
import {
    MutableRecordSource,
    NormalizationSelector,
    OperationDescriptor,
    OperationLoader,
    ReaderSelector,
    Scheduler,
    UpdatedRecords,
    Snapshot
} from "./RelayStoreTypes"
import { Disposable } from "./RelayRuntimeTypes"

export class RelayModernStore {
    constructor(
        source: MutableRecordSource,
        gcScheduler?: Scheduler,
        operationLoader?: OperationLoader | undefined | null
    )

    getSource(): RecordSource

    check(selector: NormalizationSelector): boolean

    retain(selector: NormalizationSelector): Disposable

    lookup(selector: ReaderSelector, owner?: OperationDescriptor | undefined | null): Snapshot

    notify(): void

    publish(source: RecordSource): void

    subscribe(snapshot: Snapshot, callback: (snapshot: Snapshot) => void): Disposable

    holdGC(): Disposable

    toJSON(): {}

    __getUpdatedRecordIDs(): UpdatedRecords

    _updateSubscription(subscription: Subscription): void

    _scheduleGC(): void

    __gc(): void
}

export { RelayModernStore as Store }
