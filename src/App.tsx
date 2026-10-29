import { Desktop } from './core/desktop/Desktop'
import { useEffect, useReducer } from 'react'
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
  const pending = session.state.consent && session.state.downloads.some(id => (session.state.progress[id] ?? 0) < 100)
  useEffect(() => {
    if (!pending) return
    const timer = setInterval(() => dispatch({ type: 'tick' }), 500)
    return () => clearInterval(timer)
  }, [pending])
  const completedSong = session.state.consent && session.state.progress.song === 100
  useEffect(() => { if (completedSong) incidentDispatch({ type: 'download' }) }, [completedSong])
  return <IncidentSession.Provider value={{ state: incident, dispatch: incidentDispatch }}><ByteWireSession.Provider value={{ ...session, dispatch }}><Desktop /></ByteWireSession.Provider></IncidentSession.Provider>
}
