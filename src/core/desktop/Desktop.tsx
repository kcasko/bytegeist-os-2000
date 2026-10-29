import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { useIncident } from '../../game/IncidentSession'
import { ByteWireSession } from '../../apps/ByteWire/session'
import { initialState, windowReducer } from '../windows/windowReducer'
import type { AppId } from '../windows/windowReducer'
import { apps } from '../system/AppRegistry'
import { Icon } from '../system/Icon'
import { Window } from '../windows/Window'
import { AppContent } from '../../apps/AppContent'
import { StartMenu } from './StartMenu'
import { Taskbar } from './Taskbar'
import '../../styles/desktop.css'

export function Desktop() {
  const incident = useIncident()
  const bounds = useCallback(() => ({ width: window.innerWidth, height: Math.max(100, window.innerHeight - (incident.state.enabled ? 88 : 44)) }), [incident.state.enabled])
  const bytewire = useContext(ByteWireSession)
  const [state, dispatch] = useReducer(windowReducer, initialState, state => windowReducer(state, { type: 'open', id: 'welcome', bounds: bounds() }))
  const [startOpen, setStartOpen] = useState(false)
  const [focusRequest, setFocusRequest] = useState(0)
  const startRef = useRef<HTMLButtonElement>(null)
  const dismiss = () => { setStartOpen(false); startRef.current?.focus() }
  const open = (id: AppId) => { dispatch({ type: 'open', id, bounds: bounds() }); setStartOpen(false); setFocusRequest(value => value + 1) }
  const clearSimulation = (exit: boolean) => {
    incident.dispatch({ type: exit ? 'exit' : 'reset' })
    bytewire?.dispatch({ type: exit ? 'exit' : 'reset' })
    open('bytewire')
  }
  useEffect(() => {
    if (incident.state.stage === 'recovered') {
      dispatch({ type: 'open', id: 'report', bounds: bounds() })
    }
  }, [incident.state.stage, bounds])
  useEffect(() => {
    const resize = () => dispatch({ type: 'resize', bounds: bounds() })
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [bounds])
  return <main className={`desktop ${incident.state.enabled ? 'simulation-active' : ''}`} aria-label="ByteGeist OS 2000 desktop"
    onKeyDown={event => { if (event.key === 'Escape' && startOpen) dismiss() }}
    onPointerDown={event => {
      if (!(event.target as Element).closest('#start-menu, .start-button')) setStartOpen(false)
    }}>
    <div className="wallpaper" aria-hidden="true"><div className="wallpaper-symbol">bg</div><div className="wallpaper-name">ByteGeist<span>OS 2000</span></div><p>PROFESSIONAL EDITION</p><div className="wallpaper-rule" /></div>
    <nav className="desktop-icons" aria-label="Desktop applications">{apps.slice(0, 5).map(app => <button key={app.id} onClick={() => open(app.id)}><Icon kind={app.icon} /><span>{app.title}</span></button>)}</nav>
    {incident.state.enabled && <aside className="simulation-bar" aria-label="Simulation controls"><strong>FICTIONAL SIMULATION / {incident.state.stage.toUpperCase()}</strong><button onClick={() => open('taskmanager')}>Recovery tools</button><button onClick={() => clearSimulation(false)}>Reset incident</button><button onClick={() => clearSimulation(true)}>Exit entire simulation</button></aside>}
    {incident.state.processRunning && <aside className="fictional-warning" aria-label="Fictional malware warning"><small>SIMULATED WARNING / NOT A REAL ALERT</small><h2>Your MP3 has administrator ambitions.</h2><p>songhelper.exe is generating bogus warnings inside this desktop. Nothing is happening to your actual device.</p><button onClick={() => open('taskmanager')}>Investigate this process</button></aside>}
    <div className="desktop-build" aria-hidden="true">ByteGeist OS 2000 Professional<br />Build 0003 · The internet was a mistake. Let's relive it.</div>
    {state.windows.map((win, index) => !win.minimized && <Window key={win.id} win={win} active={state.active === win.id} focusRequest={focusRequest} zIndex={index + 1} dispatch={dispatch} bounds={bounds}><AppContent id={win.id} open={open} /></Window>)}
    {startOpen && <StartMenu open={open} dismiss={dismiss} />}
    <Taskbar state={state} startOpen={startOpen} startRef={startRef} toggleStart={() => setStartOpen(value => !value)} select={id => {
      if (state.active === id) dispatch({ type: 'minimize', id })
      else open(id)
    }} />
  </main>
}
