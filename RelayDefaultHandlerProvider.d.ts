import { Handler } from "./RelayStoreTypes"

export type HandlerProvider = (name: string) => Handler | null

export { HandlerProvider as DefaultHandlerProvider }
export { HandlerProvider as ConnectionHandler }
export { HandlerProvider as ViewerHandler }
