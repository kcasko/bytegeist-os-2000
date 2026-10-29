import { useEffect, useState } from 'react'
import type { Dispatch, RefObject } from 'react'
import type { AppId, WindowAction, WindowState } from '../windows/windowReducer'
import { getApp } from '../system/AppRegistry'
import { Icon } from '../system/Icon'
import { ContextMenu } from './ContextMenu'
export function Taskbar({ state, startOpen, startRef, clockRef, toggleStart, select, infected, onActivity, showDesktop, clock, restore, dispatch }: {
  state: WindowState; startOpen: boolean; startRef: RefObject<HTMLButtonElement | null>; clockRef: RefObject<HTMLButtonElement | null>; toggleStart: () => void; select: (id: AppId) => void; infected: boolean; onActivity: () => void; showDesktop: () => void; clock: () => void; restore: (id: AppId) => void; dispatch: Dispatch<WindowAction>
}) {
  const [now, setNow] = useState(() => new Date())
  const [menu, setMenu] = useState<{ id: AppId; x: number; y: number } | null>(null)
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000 * 30); return () => clearInterval(timer) }, [])
  const target = state.windows.find(win => win.id === menu?.id)
  return <footer className="taskbar" aria-label="Desktop taskbar">
    <button className={`start-button ${startOpen ? 'pressed' : ''}`} ref={startRef} onClick={toggleStart} aria-expanded={startOpen} aria-controls="start-menu" aria-label="Start"><span className="start-logo" aria-hidden="true">bg</span>Start</button>
    <span className="taskbar-divider" />
    <button className="show-desktop" aria-label="Show Desktop" title="Show Desktop / restore windows" onClick={showDesktop}><Icon kind="computer" /></button>
    <div className="tasks">{[...state.windows].sort((a,b) => a.order - b.order).map(win => <button key={win.id} title={getApp(win.id).title} aria-label={`Task: ${getApp(win.id).title}`} aria-pressed={state.active === win.id && !win.minimized} className={state.active === win.id && !win.minimized ? 'pressed' : ''} onClick={() => select(win.id)} onContextMenu={event => { event.preventDefault(); event.stopPropagation(); setMenu({ id: win.id, x: event.clientX, y: event.clientY }) }}><Icon kind={getApp(win.id).icon} /><span>{getApp(win.id).title}</span></button>)}</div>
    <div className="system-tray">{infected ? <button className="infection-tray-button" aria-label="Show infection activity" onClick={onActivity}><span aria-hidden="true">!</span> CPU 96% <small>SIM</small></button> : <><span className="online-dot" aria-hidden="true" /><span className="tray-label">LOCAL</span></>}<button className="tray-clock" ref={clockRef} aria-label="Open date and time" title={now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} onClick={clock}><time dateTime={now.toISOString()}>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time></button></div>
    {menu && target && <ContextMenu x={menu.x} y={menu.y} label={`${getApp(menu.id).title} task menu`} dismiss={() => setMenu(null)} items={[
      { label: 'Restore', disabled: !target.minimized && !target.maximized, action: () => { if (target.maximized) dispatch({ type: 'maximize', id: target.id }); restore(target.id) } },
      { label: 'Minimize', disabled: target.minimized, action: () => dispatch({ type: 'minimize', id: target.id }) },
      { label: 'Maximize', disabled: target.maximized, action: () => { restore(target.id); dispatch({ type: 'maximize', id: target.id }) } },
      { label: 'Close', separator: true, action: () => dispatch({ type: 'close', id: target.id }) },
    ]} />}
  </footer>
}
