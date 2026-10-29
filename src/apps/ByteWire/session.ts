import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { ByteWireAction, ByteWireState } from './model'
export const ByteWireSession = createContext<{ state: ByteWireState; dispatch: Dispatch<ByteWireAction> } | null>(null)
