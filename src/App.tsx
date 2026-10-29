import { Desktop } from './core/desktop/Desktop'
import { useReducer } from 'react'
import { ByteWireSession } from './apps/ByteWire/session'
import { byteWireReducer, initialByteWire } from './apps/ByteWire/model'
export default function App() {
  const [state, dispatch] = useReducer(byteWireReducer, initialByteWire)
  return <ByteWireSession.Provider value={{ state, dispatch }}><Desktop /></ByteWireSession.Provider>
}
