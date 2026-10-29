import { Desktop } from './core/desktop/Desktop'
import { useReducer } from 'react'
import { ByteWireSession } from './apps/ByteWire/session'
import { byteWireReducer, initialByteWire } from './apps/ByteWire/model'
import type { ByteWireAction, ByteWireState } from './apps/ByteWire/model'
import { IncidentSession } from './game/IncidentSession'
import { incidentReducer, initialIncident } from './game/engine/incidentReducer'
function sessionReducer(session: { state: ByteWireState; revision: number }, action: ByteWireAction) {
  return { state: byteWireReducer(session.state, action), revision: session.revision + (action.type === 'reset' || action.type === 'exit' ? 1 : 0) }
}
export default function App() {
  const [session, dispatch] = useReducer(sessionReducer, { state: initialByteWire, revision: 0 })
  const [incident, incidentDispatch] = useReducer(incidentReducer, initialIncident)
  return <IncidentSession.Provider value={{ state: incident, dispatch: incidentDispatch }}><ByteWireSession.Provider value={{ ...session, dispatch }}><Desktop /></ByteWireSession.Provider></IncidentSession.Provider>
}
