import { DataID } from "./RelayRuntimeTypes"
import { Record, RecordMap } from "./RelayCombinedEnvironmentTypes"
import { RecordState } from "./RelayRecordState"
import { MutableRecordSource } from "./RelayStoreTypes"

export class RelayInMemoryRecordSource implements MutableRecordSource {
    constructor(records?: RecordMap)

    clear(): void

    delete(dataID: DataID): void

    get(dataID: DataID): Record | null

    getRecordIDs(): Array<DataID>

    getStatus(dataID: DataID): RecordState

    has(dataID: DataID): boolean

    load(dataID: DataID, callback: (error: Error | null, record: Record | null) => void): void

    remove(dataID: DataID): void

    set(dataID: DataID, record: Record): void

    size(): number

    toJSON(): string
}

export { RelayInMemoryRecordSource as RecordSource }
