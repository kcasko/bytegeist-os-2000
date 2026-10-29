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
import { InfectionEffects } from '../../game/effects/InfectionEffects'

export function Desktop() {
  const incident = useIncident()
  const bounds = useCallback(() => ({ width: window.innerWidth, height: Math.max(100, window.innerHeight - (incident.state.enabled ? 88 : 44) - (incident.state.processRunning && window.innerWidth < 1280 ? 44 : 0)) }), [incident.state.enabled, incident.state.processRunning])
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
  const activeWindow = state.windows.find(win => win.id === state.active)
  const warningsWouldCoverWindow = Boolean(activeWindow && (activeWindow.maximized || activeWindow.x + 640 > window.innerWidth - 340))
  return <main className={`desktop ${incident.state.enabled ? 'simulation-active' : ''} ${incident.state.processRunning ? 'infected' : ''}`} aria-label="ByteGeist OS 2000 desktop"
    onKeyDown={event => { if (event.key === 'Escape' && startOpen) dismiss() }}
    onPointerDown={event => {
      if (!(event.target as Element).closest('#start-menu, .start-button')) setStartOpen(false)
    }}>
    <div className="wallpaper" aria-hidden="true"><div className="wallpaper-symbol">{incident.state.processRunning ? '!' : 'bg'}</div><div className="wallpaper-name">{incident.state.processRunning ? 'songhelper.exe' : 'ByteGeist'}<span>OS 2000</span></div><p>{incident.state.processRunning ? 'YOUR MP3 CAME WITH ROOMMATES' : 'PROFESSIONAL EDITION'}</p><div className="wallpaper-rule" />{incident.state.processRunning && <span className="hijack-label">FICTIONAL DESKTOP HIJACK<br />PROCESS ACTIVE / STARTUP INSTALLED</span>}</div>
    <nav className="desktop-icons" aria-label="Desktop applications">{apps.slice(0, 6).map(app => <button key={app.id} onClick={() => open(app.id)}><Icon kind={app.icon} /><span>{app.title}</span></button>)}</nav>
    {incident.state.enabled && <aside className="simulation-bar" aria-label="Simulation controls"><strong>FICTIONAL SIMULATION / {incident.state.stage.toUpperCase()}</strong><button onClick={() => open('taskmanager')}>Recovery tools</button><button onClick={() => clearSimulation(false)}>Reset incident</button><button onClick={() => clearSimulation(true)}>Exit entire simulation</button></aside>}
    {incident.state.processRunning && <><button className="rogue-shortcut" onClick={() => open('infection')}><strong aria-hidden="true">!</strong><span>ByteGuard 2000</span><small>UNINVITED GUEST</small></button><InfectionEffects key={incident.state.rebootCount} compact={window.innerWidth < 1280} obscured={warningsWouldCoverWindow} onInvestigate={() => open('taskmanager')} onActivity={() => open('infection')} /></>}
    <div className="desktop-build" aria-hidden="true">ByteGeist OS 2000 Professional<br />Build 0003 · The internet was a mistake. Let's relive it.</div>
    {state.windows.map((win, index) => !win.minimized && <Window key={win.id} win={win} active={state.active === win.id} focusRequest={focusRequest} zIndex={index + 1} dispatch={dispatch} bounds={bounds}><AppContent id={win.id} open={open} /></Window>)}
    {startOpen && <StartMenu open={open} dismiss={dismiss} />}
    <Taskbar state={state} infected={incident.state.processRunning} onActivity={() => open('infection')} startOpen={startOpen} startRef={startRef} toggleStart={() => setStartOpen(value => !value)} select={id => {
      if (state.active === id) dispatch({ type: 'minimize', id })
      else open(id)
    }} />
  </main>
}
