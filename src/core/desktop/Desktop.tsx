import { useEffect, useReducer, useRef, useState } from 'react'
import { initialState, windowReducer } from '../windows/windowReducer'
import type { AppId } from '../windows/windowReducer'
import { apps } from '../system/AppRegistry'
import { Icon } from '../system/Icon'
import { Window } from '../windows/Window'
import { AppContent } from '../../apps/AppContent'
import { StartMenu } from './StartMenu'
import { Taskbar } from './Taskbar'
import '../../styles/desktop.css'

const bounds = () => ({ width: window.innerWidth, height: Math.max(100, window.innerHeight - 44) })
export function Desktop() {
  const [state, dispatch] = useReducer(windowReducer, initialState, state => windowReducer(state, { type: 'open', id: 'welcome', bounds: bounds() }))
  const [startOpen, setStartOpen] = useState(false)
  const [focusRequest, setFocusRequest] = useState(0)
  const startRef = useRef<HTMLButtonElement>(null)
  const dismiss = () => { setStartOpen(false); startRef.current?.focus() }
  const open = (id: AppId) => { dispatch({ type: 'open', id, bounds: bounds() }); setStartOpen(false); setFocusRequest(value => value + 1) }
  useEffect(() => {
    const resize = () => dispatch({ type: 'resize', bounds: bounds() })
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  return <main className="desktop" aria-label="ByteGeist OS 2000 desktop"
    onKeyDown={event => { if (event.key === 'Escape' && startOpen) dismiss() }}
    onPointerDown={event => {
      if (!(event.target as Element).closest('#start-menu, .start-button')) setStartOpen(false)
    }}>
    <div className="wallpaper" aria-hidden="true"><div className="wallpaper-symbol">bg<span>®</span></div><div className="wallpaper-name">ByteGeist<span>OS 2000</span></div><p>PROFESSIONAL EDITION</p><div className="wallpaper-rule" /></div>
    <nav className="desktop-icons" aria-label="Desktop applications">{apps.map(app => <button key={app.id} onClick={() => open(app.id)}><Icon kind={app.icon} /><span>{app.title}</span></button>)}</nav>
    <div className="desktop-build" aria-hidden="true">ByteGeist OS 2000 Professional<br />Build 0001 · The internet was a mistake. Let's relive it.</div>
    {state.windows.map((win, index) => !win.minimized && <Window key={win.id} win={win} active={state.active === win.id} focusRequest={focusRequest} zIndex={index + 1} dispatch={dispatch} bounds={bounds}><AppContent id={win.id} open={open} /></Window>)}
    {startOpen && <StartMenu open={open} dismiss={dismiss} />}
    <Taskbar state={state} startOpen={startOpen} startRef={startRef} toggleStart={() => setStartOpen(value => !value)} select={id => {
      if (state.active === id) dispatch({ type: 'minimize', id })
      else open(id)
    }} />
  </main>
}
