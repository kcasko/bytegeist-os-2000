import { useEffect, useRef } from 'react'
import type { Dispatch, ReactNode } from 'react'
import type { Bounds, DesktopWindow, WindowAction } from './windowReducer'
import { getApp } from '../system/AppRegistry'
import { Icon } from '../system/Icon'
import styles from './Window.module.css'

export function Window({ win, active, focusRequest, zIndex, dispatch, bounds, children }: {
  win: DesktopWindow; active: boolean; focusRequest: number; zIndex: number; dispatch: Dispatch<WindowAction>; bounds: () => Bounds; children: ReactNode
}) {
  const panel = useRef<HTMLElement>(null)
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const app = getApp(win.id)
  useEffect(() => { if (active) panel.current?.focus({ preventScroll: true }) }, [active, focusRequest])
  return <section ref={panel} role="dialog" aria-label={app.title} tabIndex={-1}
    className={`${styles.window} ${active ? styles.active : ''} ${win.maximized ? styles.maximized : ''}`}
    style={{ left: win.x, top: win.y, zIndex }}
    onPointerDown={() => dispatch({ type: 'focus', id: win.id })}
    onFocusCapture={() => { if (!active) dispatch({ type: 'focus', id: win.id }) }}>
    <div className={styles.titlebar}>
      <button className={styles.handle} aria-label={`Move ${app.title}`} title="Drag to move. Arrow keys move 16 pixels; Shift + arrows move 64."
        onDoubleClick={() => dispatch({ type: 'maximize', id: win.id })}
        onPointerDown={event => {
          if (event.button !== 0 || win.maximized) return
          drag.current = { x: event.clientX, y: event.clientY, left: win.x, top: win.y }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={event => {
          if (!drag.current) return
          dispatch({ type: 'move', id: win.id, x: drag.current.left + event.clientX - drag.current.x, y: drag.current.top + event.clientY - drag.current.y, bounds: bounds() })
        }}
        onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}
        onLostPointerCapture={() => { drag.current = null }}
        onKeyDown={event => {
          const arrows: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
          const direction = arrows[event.key]
          if (!direction) return
          event.preventDefault()
          const step = event.shiftKey ? 64 : 16
          dispatch({ type: 'move', id: win.id, x: win.x + direction[0] * step, y: win.y + direction[1] * step, bounds: bounds() })
        }}><Icon kind={app.icon} /><strong>{app.title}</strong></button>
      <div className={styles.controls}>
        <button aria-label={`Minimize ${app.title}`} onClick={() => dispatch({ type: 'minimize', id: win.id })}>_</button>
        <button aria-label={`${win.maximized ? 'Restore' : 'Maximize'} ${app.title}`} onClick={() => dispatch({ type: 'maximize', id: win.id })}>{win.maximized ? '❐' : '□'}</button>
        <button aria-label={`Close ${app.title}`} onClick={() => dispatch({ type: 'close', id: win.id })}>×</button>
      </div>
    </div>
    <div className={styles.menu}><span>ByteGeist OS 2000</span><span>{app.title}</span></div>
    <div className={styles.content}>{children}</div>
    <footer className={styles.status}><span>{win.id === 'bytewire' ? 'Fictional files · No actual downloads' : 'Ready'}</span><span>ByteGeist OS 2000</span></footer>
  </section>
}
