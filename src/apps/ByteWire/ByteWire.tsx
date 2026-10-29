import { useContext, useEffect, useRef, useState } from 'react'
import { ByteWireSession } from './session'
import { files, searchFiles } from './model'
import './bytewire.css'
import { useIncident } from '../../game/IncidentSession'
import type { AppId } from '../../core/windows/windowReducer'

export function ByteWire({ open }: { open: (id: AppId) => void }) {
  const incident = useIncident()
  const session = useContext(ByteWireSession)
  const [query, setQuery] = useState(session?.state.query ?? '')
  const [propertiesOpen, setPropertiesOpen] = useState(false)
  const [confirmExecution, setConfirmExecution] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const consent = session?.state.consent
  useEffect(() => { root.current?.querySelector<HTMLElement>(consent ? 'input' : 'button')?.focus() }, [consent])
  if (!session) throw new Error('ByteWire requires a session provider')
  const { state, dispatch } = session
  const selected = files.find(file => file.id === state.selected)
  const properties = propertiesOpen && selected && state.inspected.includes(selected.id) ? selected : null
  const reset = () => { dispatch({ type: 'reset' }); incident.dispatch({ type: 'reset' }); setQuery(''); setPropertiesOpen(false); setConfirmExecution(false) }
  const requestInfection = () => { setConfirmExecution(true) }
  if (!state.consent) return <div ref={root} className="bw bw-consent">
    <div className="bw-brand"><span aria-hidden="true">b</span><div><h1>ByteWire</h1><p>Share files. Question everything.</p></div></div>
    <p className="bw-kicker">A FICTIONAL FILE-SHARING EXPERIENCE</p><h2>Your modem called. It has concerns.</h2>
    <p>Search a pretend P2P network, inspect a questionable download, and catch the trick before it catches you.</p>
    <div className="inset"><strong>Everything stays inside this desktop.</strong><p>All files, peers, and transfers are fictional. No files are downloaded to your computer or executed. You can prevent the fictional infection or explicitly launch it to practice investigation and recovery.</p></div>
    <button className="bw-primary" onClick={() => { dispatch({ type: 'begin' }); incident.dispatch({ type: 'consent' }) }}>Enter Simulation</button><p className="tip">Opt-in only. Your portfolio windows stay available. Use Exit Simulation at any time to clear this session.</p>
  </div>
  return <div ref={root} className="bw bw-client">
    <header className="bw-toolbar"><div><strong>ByteWire</strong><small>SIMULATED NETWORK</small></div><div className="bw-actions"><button onClick={reset}>Reset Simulation</button><button onClick={() => { dispatch({ type: 'exit' }); incident.dispatch({ type: 'exit' }); setPropertiesOpen(false); setConfirmExecution(false); setQuery('') }}>Exit Simulation</button></div></header>
    <div className="bw-connection"><span aria-hidden="true">●</span> Connected to 3 fictional peers · No real network traffic</div>
    <form className="bw-search" onSubmit={event => { event.preventDefault(); dispatch({ type: 'search', query }); setPropertiesOpen(false) }}><label htmlFor="bytewire-search">Search files</label><div><input id="bytewire-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try song, mp3, or leave blank" /><button type="submit">Search</button></div></form>
    <section className="bw-results" aria-label="Search results"><div className="bw-section-title">SEARCH RESULTS <span>{state.searched ? searchFiles(state.query).length : 0} files</span></div>{!state.searched ? <p className="bw-empty">Search the archive. Everything here is synthetic. The bad decisions are historically accurate.</p> : <><div className="bw-table-wrap"><table><thead><tr><th scope="col">Name</th><th scope="col">Size</th><th scope="col">Peer</th></tr></thead><tbody>{searchFiles(state.query).map(file => <tr key={file.id} className={state.selected === file.id ? 'bw-selected' : ''}><td><button aria-label={`Select ${file.name}`} aria-pressed={state.selected === file.id} onClick={() => { dispatch({ type: 'select', id: file.id }); setPropertiesOpen(false) }}>{file.name}</button></td><td>{file.size}</td><td>{file.peer}</td></tr>)}</tbody></table></div>{searchFiles(state.query).length === 0 && <p className="bw-empty">No results. Try “song” or leave the search blank.</p>}</>}
      <div className="bw-result-actions"><button disabled={!selected} onClick={() => { if (selected) { dispatch({ type: 'download', id: selected.id }); if (selected.suspicious) incident.dispatch({ type: 'download' }) } }}>Download selected (simulated)</button><small>Displayed names can hide the final extension.</small></div>
    </section>
    <section aria-label="Simulated downloads"><div className="bw-section-title">DOWNLOADS <span>{state.downloads.length} transfers</span></div>{state.downloads.length === 0 ? <p className="bw-empty">No transfers yet. Nothing will be saved to your device.</p> : <ul className="bw-downloads">{state.downloads.map(id => { const file = files.find(file => file.id === id)!; return <li key={id}><span><strong>{file.name}</strong><small>{state.prevented && !incident.state.everInfected && file.suspicious ? 'Blocked · Prevention complete' : '100% · Simulated transfer complete'}</small></span><button aria-label={`Properties: ${file.name}`} onClick={() => { dispatch({ type: 'inspect', id }); if (file.suspicious) incident.dispatch({ type: 'inspect', evidence: 'file' }); setPropertiesOpen(true) }}>Properties</button></li> })}</ul>}</section>
    {properties && <section className="bw-properties" aria-label="File Properties"><div className="bw-section-title">FILE PROPERTIES<button aria-label="Close File Properties" onClick={() => setPropertiesOpen(false)}>×</button></div><dl><dt>Full filename</dt><dd>{properties.fullName}</dd><dt>File type</dt><dd>{properties.type}</dd><dt>Size</dt><dd>{properties.size}</dd><dt>Source</dt><dd>Fictional peer: {properties.peer}</dd></dl><p>Look at the <strong>final extension</strong>. A name can claim to be music while the file type tells a different story.</p><button disabled={incident.state.everInfected} onClick={() => dispatch({ type: 'flag', id: properties.id })}>Flag as suspicious</button><p className="tip">Executing a disguised application starts the fictional incident. You will be asked to confirm.</p>{properties.suspicious && !incident.state.everInfected && <button onClick={requestInfection}>Run simulated executable</button>}</section>}
    {confirmExecution && !incident.state.everInfected && <section className="bw-properties" aria-label="Confirm fictional infection"><h2>Start a fictional infection?</h2><p>This creates several returning fictional warnings, a hijacked wallpaper, simulated high CPU, and a fake process/startup entry inside ByteGeist OS. Your actual device is unaffected. The permanent Exit entire simulation control clears it immediately.</p><button onClick={() => { incident.dispatch({ type: 'download' }); incident.dispatch({ type: 'execute' }); setConfirmExecution(false); open('taskmanager') }}>Start fictional infection</button> <button onClick={() => setConfirmExecution(false)}>Cancel infection</button></section>}
    {incident.state.everInfected && <div className="inset"><strong>Incident BG-2000: {incident.state.stage}</strong><p>The fake download created a process and a startup entry. Investigate both before trusting a quiet desktop.</p><button onClick={() => open('taskmanager')}>Open recovery tools</button></div>}
    <p role="status" className="bw-notice">{state.notice || 'Ready. Inspect what you download before trusting its name.'}</p>
    {state.prevented && !incident.state.everInfected && <section className="bw-achievement" aria-label="Prevention achievement"><small>ACHIEVEMENT UNLOCKED</small><h2>Not Today, LimeWire.</h2><p>You caught an executable pretending to be an MP3. The last extension was <strong>.exe</strong>, and Properties identified it as an application.</p><p>Infection prevented. Your fictional desktop remains clean.</p><button onClick={reset}>Play again</button> <button onClick={requestInfection}>Try the infected route</button></section>}
  </div>
}
