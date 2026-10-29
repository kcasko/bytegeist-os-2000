import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { useIncident } from '../../game/IncidentSession'
import { ByteWireSession } from '../../apps/ByteWire/session'
import { initialState, windowReducer } from '../windows/windowReducer'
import type { AppId, WindowAction } from '../windows/windowReducer'
import type { Decision } from '../system/DesktopSession'
import { DecisionDialog } from '../../apps/Shell/DecisionDialog'
import { ContextMenu } from './ContextMenu'
import { DesktopIcons } from './DesktopIcons'
import { DesktopSession } from '../system/DesktopSession'
import type { Wallpaper } from '../system/DesktopSession'
import { Calendar } from '../../apps/Shell/Calendar'
import { PowerDialog } from '../../apps/Shell/PowerDialog'
import { BootScreen } from '../../apps/Shell/BootScreen'
import { Window } from '../windows/Window'
import { AppContent } from '../../apps/AppContent'
import { StartMenu } from './StartMenu'
import { Taskbar } from './Taskbar'
import '../../styles/desktop.css'
import { InfectionEffects } from '../../game/effects/InfectionEffects'

export function Desktop() {
  const incident = useIncident()
  const bounds = useCallback(() => ({ width: window.innerWidth, height: Math.max(100, window.innerHeight - (incident.state.enabled ? 88 : 44) - (incident.state.processRunning && (window.innerWidth < 1280 || window.innerHeight < 720) ? 44 : 0)) }), [incident.state.enabled, incident.state.processRunning])
  const bytewire = useContext(ByteWireSession)
  const [state, dispatch] = useReducer(windowReducer, initialState, state => windowReducer(state, { type: 'open', id: 'welcome', bounds: bounds() }))
  const [startOpen, setStartOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState<Wallpaper>('blue')
  const [notes, setNotes] = useState('')
  const [savedNotes, saveNotes] = useState('')
  const [arrange, setArrange] = useState(0)
  const [desktopMenu, setDesktopMenu] = useState<{ x: number; y: number } | null>(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [powerOpen, setPowerOpen] = useState(false)
  const [decision, decide] = useState<Decision | null>(null)
  const [poweredOff, setPoweredOff] = useState(false)
  const [boot, setBoot] = useState<'restart' | 'cold' | null>(null)
  const [desktopStatus, setDesktopStatus] = useState('')
  const desktopRef = useRef<HTMLElement>(null)
  const clockRef = useRef<HTMLButtonElement>(null)
  const desktopSnapshot = useRef<AppId[]>([])
  const [focusRequest, setFocusRequest] = useState(0)
  const [processInvestigation, setProcessInvestigation] = useState(0)
  const startRef = useRef<HTMLButtonElement>(null)
  const dismiss = () => { setStartOpen(false); startRef.current?.focus() }
  const close = (id: AppId) => {
    if (id === 'notepad' && notes !== savedNotes) decide({ title: 'Save changes to Notes.txt?', message: 'Your document has unsaved changes.', choices: [
      { label: 'Save', action: () => { saveNotes(notes); dispatch({ type: 'close', id }) } },
      { label: "Don't save", action: () => { setNotes(savedNotes); dispatch({ type: 'close', id }) } },
    ] })
    else dispatch({ type: 'close', id })
  }
  const windowAction = (action: WindowAction) => action.type === 'close' ? close(action.id) : dispatch(action)
  const open = (id: AppId) => { dispatch({ type: 'open', id, bounds: bounds() }); setStartOpen(false); setDesktopMenu(null); setCalendarOpen(false); setFocusRequest(value => value + 1) }
  const clearSimulation = (exit: boolean) => {
    setProcessInvestigation(0)
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
  const showDesktop = () => {
    const visible = state.windows.filter(win => !win.minimized)
    if (visible.length) { desktopSnapshot.current = visible.map(win => win.id); dispatch({ type: 'minimize-all' }); desktopRef.current?.focus() }
    else { for (const id of desktopSnapshot.current) if (state.windows.some(win => win.id === id)) dispatch({ type: 'open', id, bounds: bounds() }); desktopSnapshot.current = [] }
  }
  const cancelPower = () => { setPowerOpen(false); startRef.current?.focus() }
  const cancelPending = () => { for (const id of bytewire?.state.downloads ?? []) if (bytewire?.state.progress[id] !== 100) bytewire?.dispatch({ type: 'cancel', id }) }
  const completeBoot = () => {
    setBoot(null)
    dispatch({ type: 'open', id: 'welcome', bounds: bounds() })
    incident.dispatch({ type: 'reboot' })
  }
  const restart = () => {
    cancelPending()
    setNotes(savedNotes)
    dispatch({ type: 'reset' })
    incident.dispatch({ type: poweredOff ? 'poweroff' : 'restart' })
    setBoot(poweredOff ? 'cold' : 'restart')
    setPoweredOff(false)
    setPowerOpen(false)
    setCalendarOpen(false)
    setStartOpen(false)
    setDesktopMenu(null)
  }
  const turnOff = () => { cancelPending(); setNotes(savedNotes); incident.dispatch({ type: 'poweroff' }); dispatch({ type: 'reset' }); setPowerOpen(false); setPoweredOff(true) }
  const investigateProcess = () => {
    incident.dispatch({ type: 'inspect', evidence: 'process' })
    setProcessInvestigation(value => value + 1)
    open('taskmanager')
  }
  const preferences = { wallpaper, setWallpaper, notes, setNotes, savedNotes, saveNotes, restart, processInvestigation, close, decide }
  if (boot) return <BootScreen cold={boot === 'cold'} complete={completeBoot} />
  if (poweredOff) return <DesktopSession.Provider value={preferences}><div className="powered-off"><h1>It is now safe to close this tab.</h1><p>ByteGeist OS 2000 is turned off.</p><button onClick={restart}>Start computer</button></div></DesktopSession.Provider>
  const activeWindow = state.windows.find(win => win.id === state.active)
  const warningsWouldCoverWindow = Boolean(activeWindow && (activeWindow.maximized || activeWindow.x + activeWindow.width > window.innerWidth - 340))
  return <DesktopSession.Provider value={preferences}><main ref={desktopRef} tabIndex={-1} className={`desktop background-${wallpaper} ${incident.state.enabled ? 'simulation-active' : ''} ${incident.state.processRunning ? 'infected' : ''}`} aria-label="ByteGeist OS 2000 desktop"
    onKeyDown={event => {
      if (powerOpen || decision) return
      if (event.key === 'Escape') { if (startOpen) dismiss(); if (calendarOpen) { setCalendarOpen(false); clockRef.current?.focus() }; setDesktopMenu(null) }
      if (event.ctrlKey && event.key === 'F6') { event.preventDefault(); dispatch({ type: 'cycle' }) }
      if (event.key === 'F5' && !(event.target as Element).closest('[role="dialog"]')) { event.preventDefault(); setDesktopStatus('Desktop refreshed.'); desktopRef.current?.focus() }
      if ((event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) && event.target === event.currentTarget) { event.preventDefault(); setDesktopMenu({ x: 120, y: 40 }) }
    }}
    onContextMenu={event => { if (!(event.target as Element).closest('[role="dialog"], [data-shortcut], button, input, textarea, [role="menu"]')) { event.preventDefault(); setStartOpen(false); setDesktopMenu({ x: event.clientX, y: event.clientY }) } }}
    onPointerDown={event => {
      if (!(event.target as Element).closest('#start-menu, .start-button')) setStartOpen(false)
      if (!(event.target as Element).closest('.calendar-popup, .tray-clock')) setCalendarOpen(false)
    }}>
    <div className="wallpaper" aria-hidden="true"><div className="wallpaper-symbol">{incident.state.processRunning ? '!' : 'bg'}</div><div className="wallpaper-name">{incident.state.processRunning ? 'songhelper.exe' : 'ByteGeist'}<span>OS 2000</span></div><p>{incident.state.processRunning ? 'YOUR MP3 CAME WITH ROOMMATES' : 'PROFESSIONAL EDITION'}</p><div className="wallpaper-rule" />{incident.state.processRunning && <span className="hijack-label">FICTIONAL DESKTOP HIJACK<br />PROCESS ACTIVE / STARTUP INSTALLED</span>}</div>
    <DesktopIcons key={arrange} open={open} bounds={bounds} />
    {incident.state.enabled && <aside className="simulation-bar" aria-label="Simulation controls"><strong>FICTIONAL SIMULATION / {incident.state.stage.toUpperCase()}</strong><button onClick={() => open('taskmanager')}>Recovery tools</button><button onClick={() => decide({ title: 'Reset incident?', message: 'This clears downloads, recovery progress, and the incident report.', choices: [{ label: 'Reset', action: () => clearSimulation(false) }] })}>Reset incident</button><button onClick={() => clearSimulation(true)}>Exit entire simulation</button></aside>}
    {incident.state.processRunning && <><button className="rogue-shortcut" onClick={() => open('infection')}><strong aria-hidden="true">!</strong><span>ByteGuard 2000</span><small>UNINVITED GUEST</small></button><InfectionEffects key={incident.state.rebootCount} compact={window.innerWidth < 1280 || window.innerHeight < 720} obscured={warningsWouldCoverWindow} onInvestigate={investigateProcess} onActivity={() => open('infection')} /></>}
    <div className="desktop-build" aria-hidden="true">ByteGeist OS 2000 Professional<br />Build 0003 · The internet was a mistake. Let's relive it.</div>
    {state.windows.map((win, index) => !win.minimized && <Window key={win.id} win={win} active={state.active === win.id} focusRequest={focusRequest} zIndex={index + 1} dispatch={windowAction} bounds={bounds}><AppContent id={win.id} open={open} /></Window>)}
    {startOpen && <StartMenu open={open} dismiss={dismiss} power={() => { setStartOpen(false); setPowerOpen(true) }} />}
    <Taskbar state={state} clockRef={clockRef} clock={() => { setCalendarOpen(value => !value); setStartOpen(false) }} showDesktop={showDesktop} restore={open} dispatch={windowAction} infected={incident.state.processRunning} onActivity={() => open('infection')} startOpen={startOpen} startRef={startRef} toggleStart={() => setStartOpen(value => !value)} select={id => {
      if (state.active === id) dispatch({ type: 'minimize', id })
      else open(id)
    }} />
    <span className="sr-only" role="status">{desktopStatus}</span>
    {calendarOpen && <Calendar dismiss={() => { setCalendarOpen(false); clockRef.current?.focus() }} />}
    {desktopMenu && <ContextMenu x={desktopMenu.x} y={desktopMenu.y} label="Desktop menu" dismiss={() => { setDesktopMenu(null); desktopRef.current?.focus() }} items={[
      { label: 'Refresh', action: () => setDesktopStatus('Desktop refreshed.') },
      { label: 'Arrange Icons', action: () => setArrange(value => value + 1) },
      { label: 'Show Desktop', action: showDesktop },
      { label: 'Task Manager', separator: true, action: () => open('taskmanager') },
      { label: 'Run…', action: () => open('run') },
      { label: 'Properties', separator: true, action: () => open('display') },
    ]} />}
    {powerOpen && <PowerDialog unsaved={notes !== savedNotes} cancel={cancelPower} restart={restart} turnOff={turnOff} />}
    {decision && <DecisionDialog decision={decision} dismiss={() => decide(null)} />}
  </main></DesktopSession.Provider>
}
