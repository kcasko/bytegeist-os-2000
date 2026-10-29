import { useContext, useEffect, useRef, useState } from 'react'
import { ByteWireSession } from './session'
import { searchFiles } from './model'
import { useFileActions } from './useFileActions'
import { FilePanels } from './FilePanels'
import { TransferList } from './TransferList'
import './bytewire.css'
import { useDesktopSession } from '../../core/system/DesktopSession'
import { useIncident } from '../../game/IncidentSession'
import type { AppId } from '../../core/windows/windowReducer'

export function ByteWire({ open }: { open: (id: AppId) => void }) {
  const incident = useIncident()
  const desktop = useDesktopSession()
  const session = useContext(ByteWireSession)
  const [query, setQuery] = useState(session?.state.query ?? '')
  const actions = useFileActions()
  const root = useRef<HTMLDivElement>(null)
  const consent = session?.state.consent
  useEffect(() => { root.current?.querySelector<HTMLElement>(consent ? 'input' : 'button')?.focus() }, [consent])
  if (!session) throw new Error('ByteWire requires a session provider')
  const { state, dispatch } = session
  const selected = state.selected
  const reset = () => { dispatch({ type: 'reset' }); incident.dispatch({ type: 'reset' }); setQuery('') }
  if (!state.consent) return <div ref={root} className="bw bw-consent">
    <div className="bw-brand"><span aria-hidden="true">b</span><div><h1>ByteWire</h1><p>Share files. Question everything.</p></div></div>
    <p className="bw-kicker">A FICTIONAL FILE-SHARING EXPERIENCE</p><h2>Your modem called. It has concerns.</h2>
    <p>Search a pretend P2P network and open your completed downloads. Some files are exactly what they claim to be.</p>
    <div className="inset"><strong>Everything stays inside this desktop.</strong><p>All files, peers, and transfers are fictional. No files are downloaded to your computer or executed. You can prevent the fictional infection or explicitly launch it to practice investigation and recovery.</p></div>
    <button className="bw-primary" onClick={() => { dispatch({ type: 'begin' }); incident.dispatch({ type: 'consent' }) }}>Enter Simulation</button><p className="tip">Opt-in only. Your portfolio windows stay available. Use Exit Simulation at any time to clear this session.</p>
  </div>
  return <div ref={root} className="bw bw-client">
    <header className="bw-toolbar"><div><strong>ByteWire</strong><small>SIMULATED NETWORK</small></div><div className="bw-actions"><button onClick={() => desktop.decide({ title: 'Reset incident?', message: 'This clears downloads, recovery progress, and the incident report.', choices: [{ label: 'Reset', action: reset }] })}>Reset Simulation</button><button onClick={() => { dispatch({ type: 'exit' }); incident.dispatch({ type: 'exit' }); setQuery('') }}>Exit Simulation</button></div></header>
    <div className="bw-connection"><span aria-hidden="true">●</span> Connected to 3 fictional peers · No real network traffic</div>
    <form className="bw-search" onSubmit={event => { event.preventDefault(); dispatch({ type: 'search', query }) }}><label htmlFor="bytewire-search">Search files</label><div><input id="bytewire-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try song, mp3, or leave blank" /><button type="submit">Search</button></div></form>
    <section className="bw-results" aria-label="Search results"><div className="bw-section-title">SEARCH RESULTS <span>{state.searched ? searchFiles(state.query).length : 0} files</span></div>{!state.searched ? <p className="bw-empty">Search the archive. Everything here is synthetic. The bad decisions are historically accurate.</p> : <><div className="bw-table-wrap"><table><thead><tr><th scope="col">Name</th><th scope="col">Size</th><th scope="col">Peer</th></tr></thead><tbody>{searchFiles(state.query).map(file => <tr key={file.id} onClick={() => dispatch({ type: 'select', id: file.id })} className={state.selected === file.id ? 'bw-selected' : ''}><td><button aria-label={`Select ${file.name}`} aria-pressed={state.selected === file.id} onClick={() => { dispatch({ type: 'select', id: file.id }) }}>{file.name}</button></td><td>{file.size}</td><td>{file.peer}</td></tr>)}</tbody></table></div>{searchFiles(state.query).length === 0 && <p className="bw-empty">No results. Try “song” or leave the search blank.</p>}</>}
      <div className="bw-result-actions"><button disabled={!selected} onClick={() => { if (selected) { dispatch({ type: 'download', id: selected }); root.current?.querySelector('[aria-label="Simulated downloads"]')?.scrollIntoView?.({ block: 'nearest' }) } }}>Download selected (simulated)</button><small>Completed files go to C:\Downloads.</small></div>
    </section>
    <p role="status" className="bw-notice">{state.notice || 'Ready. Search for a file to download.'}</p><TransferList open={open} openFile={actions.openFile} inspect={actions.inspect} />
    <FilePanels {...actions} open={open} />
    {incident.state.everInfected && <div className="inset"><strong>Incident BG-2000: {incident.state.stage}</strong><p>The fake download created a process and a startup entry. Investigate both before trusting a quiet desktop.</p><button onClick={() => open('taskmanager')}>Open recovery tools</button></div>}

    {state.prevented && !incident.state.everInfected && <section className="bw-achievement" aria-label="Prevention achievement"><small>ACHIEVEMENT UNLOCKED</small><h2>Not Today, LimeWire.</h2><p>You caught an executable pretending to be an MP3. The last extension was <strong>.exe</strong>, and Properties identified it as an application.</p><p>Infection prevented. Your fictional desktop remains clean.</p><button onClick={() => desktop.decide({ title: 'Reset incident?', message: 'This clears downloads, recovery progress, and the incident report.', choices: [{ label: 'Reset', action: reset }] })}>Play again</button> <button onClick={event => actions.openFile('song', true, event.currentTarget)}>Try the infected route</button></section>}
  </div>
}
