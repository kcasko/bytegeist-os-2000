import { useContext, useEffect, useRef, useState } from 'react'
import { ByteWireSession } from './session'
import { files, isComplete } from './model'
import type { FileId } from './model'
import { useIncident } from '../../game/IncidentSession'
import type { AppId } from '../../core/windows/windowReducer'

export function FilePanels({ propertiesFile, openingFile, allowPrevented, close, open, openFile }: {
  propertiesFile: FileId | null; openingFile: FileId | null; allowPrevented: boolean; close: () => void; open: (id: AppId) => void; openFile: (id: FileId, allowPrevented?: boolean, source?: HTMLElement) => void
}) {
  const session = useContext(ByteWireSession)
  const incident = useIncident()
  const panel = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => { if (propertiesFile || openingFile) panel.current?.focus({ preventScroll: false }) }, [propertiesFile, openingFile, allowPrevented])
  const closePreview = () => { setPlaying(false); close() }
  if (!session || !session.state.consent) return null
  const { state, dispatch } = session
  const property = files.find(file => file.id === propertiesFile && isComplete(state, file.id))
  const opening = files.find(file => file.id === openingFile && isComplete(state, file.id))
  if (property) return <section data-file-panel ref={panel} tabIndex={-1} className="bw-properties" aria-label="File Properties"><div className="bw-section-title">FILE PROPERTIES<button aria-label="Close File Properties" onClick={close}>×</button></div><dl><dt>Full filename</dt><dd>{property.fullName}</dd><dt>File type</dt><dd>{property.type}</dd><dt>Size</dt><dd>{property.size}</dd><dt>Location</dt><dd>C:\Downloads</dd><dt>Source</dt><dd>Fictional peer: {property.peer}</dd></dl><p>The final extension determines the file type. This information is available if you choose to inspect the file.</p><div className="file-action-buttons"><button disabled={incident.state.everInfected} onClick={() => dispatch({ type: 'flag', id: property.id })}>Flag as suspicious</button><button disabled={property.suspicious && (state.prevented || incident.state.quarantined)} onClick={event => openFile(property.id, false, event.currentTarget)}>Open file</button></div>{state.prevented && property.suspicious && <p role="status">Blocked · Executable identified before execution.</p>}</section>
  if (!opening) return null
  if (opening.suspicious) return <section data-file-panel ref={panel} tabIndex={-1} className="file-security-warning" aria-label="Open File - Security Warning"><h2>Open File - Security Warning</h2><p>The publisher could not be verified. Do you want to run this file?</p><dl><dt>Name</dt><dd>{opening.fullName}</dd><dt>Publisher</dt><dd>Unknown Publisher</dd><dt>Type</dt><dd>{opening.type}</dd><dt>From</dt><dd>C:\Downloads</dd></dl><p className="tip">Fictional simulation: Run starts the in-app infection, returning warnings and desktop changes. Nothing is executed on your actual device.</p><div className="file-action-buttons"><button disabled={incident.state.everInfected || incident.state.quarantined || (state.prevented && !allowPrevented)} onClick={() => {
    if (!isComplete(state, opening.id) || !incident.state.enabled || incident.state.quarantined || incident.state.everInfected || (state.prevented && !allowPrevented)) return
    incident.dispatch({ type: 'download' })
    incident.dispatch({ type: 'execute' })
    close()
    open('taskmanager')
  }}>Run (simulated)</button><button onClick={close}>Cancel</button></div>{incident.state.everInfected && <p>The incident has already started. Use the recovery tools or reset the simulation.</p>}</section>
  return <section data-file-panel ref={panel} tabIndex={-1} className="file-preview" aria-label={opening.id === 'mix' ? 'BytePlayer preview' : 'Text file preview'}><div className="bw-section-title">{opening.id === 'mix' ? 'BYTEPLAYER' : 'NOTEPAD'}<button aria-label="Close file preview" onClick={closePreview}>×</button></div><h2>{opening.fullName}</h2>{opening.id === 'mix' ? <><p>Dial-Up Daydream · Fictional audio track</p><div className="fake-player-display">{playing ? 'PLAYING' : 'STOPPED'} / DEMO TRACK</div><button onClick={() => setPlaying(value => !value)}>{playing ? 'Pause preview' : 'Play preview'}</button><p className="tip">Simulated player only. No audio is downloaded or played.</p></> : <pre>ByteWire Archive README{`\n\n`}Files go to C:\Downloads.{`\n`}Open a completed file from the transfer queue or Downloads.{`\n`}Unknown publishers deserve a second look.</pre>}<button onClick={closePreview}>Close preview</button></section>
}
