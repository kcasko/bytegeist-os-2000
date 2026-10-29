import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import type { AppId, WindowState } from '../windows/windowReducer'
import { getApp } from '../system/AppRegistry'
import { Icon } from '../system/Icon'
export function Taskbar({ state, startOpen, startRef, toggleStart, select, infected, onActivity }: {
  state: WindowState; startOpen: boolean; startRef: RefObject<HTMLButtonElement | null>; toggleStart: () => void; select: (id: AppId) => void; infected: boolean; onActivity: () => void
}) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000 * 30); return () => clearInterval(timer) }, [])
  return <footer className="taskbar" aria-label="Desktop taskbar">
    <button className={`start-button ${startOpen ? 'pressed' : ''}`} ref={startRef} onClick={toggleStart} aria-expanded={startOpen} aria-controls="start-menu" aria-label="Start"><span className="start-logo" aria-hidden="true">bg</span>Start</button>
    <span className="taskbar-divider" />
    <div className="tasks">{state.windows.map(win => <button key={win.id} aria-label={`Task: ${getApp(win.id).title}`} aria-pressed={state.active === win.id && !win.minimized} className={state.active === win.id && !win.minimized ? 'pressed' : ''} onClick={() => select(win.id)}><Icon kind={getApp(win.id).icon} /><span>{getApp(win.id).title}</span></button>)}</div>
    <div className="system-tray">{infected ? <button className="infection-tray-button" aria-label="Show infection activity" onClick={onActivity}><span aria-hidden="true">!</span> CPU 96% <small>SIM</small></button> : <><span className="online-dot" aria-hidden="true" /><span className="tray-label">LOCAL</span></>}<time dateTime={now.toISOString()}>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time></div>
  </footer>
}
