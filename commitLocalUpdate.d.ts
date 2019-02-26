import { IEnvironment, StoreUpdater } from "./RelayStoreTypes"

export function commitLocalUpdate(environment: IEnvironment, updater: StoreUpdater): void

export { commitLocalUpdate as CLU }
