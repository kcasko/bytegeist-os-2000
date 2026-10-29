import { useContext } from 'react'
import { ByteWireSession } from './session'
import { files, isComplete } from './model'
import type { FileId } from './model'
import type { AppId } from '../../core/windows/windowReducer'
import { useIncident } from '../../game/IncidentSession'

export function TransferList({ open, openFile, inspect }: { open: (id: AppId) => void; openFile: (id: FileId, allowPrevented?: boolean, source?: HTMLElement) => void; inspect: (id: FileId, source?: HTMLElement) => void }) {
  const session = useContext(ByteWireSession)
  const incident = useIncident()
  if (!session) return null
  const { state, dispatch } = session
  return <section aria-label="Simulated downloads"><div className="bw-section-title">TRANSFERS<span>{state.downloads.length} transfers</span><button onClick={() => open('downloads')}>Open Downloads</button></div>{state.downloads.length === 0 ? <p className="bw-empty">No transfers yet. Nothing will be saved to your device.</p> : <ul className="bw-downloads">{state.downloads.map(id => {
    const file = files.find(file => file.id === id)!
    const complete = isComplete(state, id)
    const blocked = file.suspicious && (state.prevented || incident.state.quarantined)
    return <li key={id}><div className="transfer-summary"><strong>{file.name}</strong><small>{blocked ? 'Blocked / quarantined' : complete ? 'Complete · Saved to C:\\Downloads' : state.progress[id] === 0 ? 'Connecting to peer…' : `Downloading · ${state.progress[id]}% · ${file.id === 'mix' ? '1.9 MB/s' : file.id === 'song' ? '124 KB/s' : '2 KB/s'} (simulated)`}</small><progress aria-label={`Transfer progress: ${file.name}`} value={state.progress[id] ?? 0} max={100} /><small>{file.size} · {file.peer}</small></div><div className="transfer-actions"><button aria-label={`Open file: ${file.name}`} disabled={!complete || blocked} onClick={event => openFile(id, false, event.currentTarget)}>Open file</button>{complete ? <button aria-label={`Properties: ${file.name}`} onClick={event => inspect(id, event.currentTarget)}>Properties</button> : <button aria-label={`Cancel transfer: ${file.name}`} onClick={() => dispatch({ type: 'cancel', id })}>Cancel</button>}</div></li>
  })}</ul>}</section>
}
