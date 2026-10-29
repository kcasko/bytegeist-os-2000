import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { Dispatch, ReactNode } from 'react'
import type { Bounds, DesktopWindow, WindowAction } from './windowReducer'
import { getApp } from '../system/AppRegistry'
import { Icon } from '../system/Icon'
import { ContextMenu } from '../desktop/ContextMenu'
import styles from './Window.module.css'

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
export function Window({ win, active, focusRequest, zIndex, dispatch, bounds, children }: {
  win: DesktopWindow; active: boolean; focusRequest: number; zIndex: number; dispatch: Dispatch<WindowAction>; bounds: () => Bounds; children: ReactNode
}) {
  const panel = useRef<HTMLElement>(null)
  const handle = useRef<HTMLButtonElement>(null)
  const sizing = useRef<HTMLButtonElement>(null)
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const resize = useRef<{ x: number; y: number; rect: DesktopWindow; edge: ResizeEdge } | null>(null)
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const app = getApp(win.id)
  const dismissMenu = useCallback(() => { setMenu(null) }, [])
  useLayoutEffect(() => {
    if (active && !panel.current?.contains(document.activeElement)) {
      const target = panel.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panel.current
      target?.focus({ preventScroll: true })
    }
  }, [active, focusRequest])
  const showMenu = (x: number, y: number) => { dispatch({ type: 'focus', id: win.id }); setMenu({ x, y }) }
  const setRect = (x: number, y: number, width: number, height: number) => dispatch({ type: 'resize-window', id: win.id, x, y, width, height, bounds: bounds() })
  return <section ref={panel} role="dialog" aria-label={app.title} tabIndex={-1} data-window-active={active}
    className={`${styles.window} ${active ? styles.active : ''} ${win.maximized ? styles.maximized : ''}`}
    style={{ left: win.x, top: win.y, width: win.width, height: win.height, zIndex }}
    onKeyDown={event => { if (event.altKey && event.key === ' ') { event.preventDefault(); event.stopPropagation(); const box = panel.current!.getBoundingClientRect(); showMenu(box.x + 5, box.y + 30) } }}
    onPointerDown={() => { if (!active) dispatch({ type: 'focus', id: win.id }) }}
    onFocusCapture={() => { if (!active) dispatch({ type: 'focus', id: win.id }) }}>
    <div className={styles.titlebar} onDoubleClick={event => { if (!(event.target as Element).closest(`button`)) dispatch({ type: `maximize`, id: win.id }) }} onContextMenu={event => { event.preventDefault(); event.stopPropagation(); showMenu(event.clientX, event.clientY) }}>
      <button className={styles.systemIcon} aria-label={`Window menu ${app.title}`} onClick={event => { const box = event.currentTarget.getBoundingClientRect(); showMenu(box.x, box.bottom) }}><Icon kind={app.icon} /></button>
      <button ref={handle} className={styles.handle} aria-label={`Move ${app.title}`} title="Drag to move. Arrow keys move 16 pixels; Shift + arrows move 64."
        onDoubleClick={() => dispatch({ type: 'maximize', id: win.id })}
        onPointerDown={event => {
          if (event.button !== 0 || win.maximized) return
          drag.current = { x: event.clientX, y: event.clientY, left: win.x, top: win.y }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={event => { if (drag.current) dispatch({ type: 'move', id: win.id, x: drag.current.left + event.clientX - drag.current.x, y: drag.current.top + event.clientY - drag.current.y, bounds: bounds() }) }}
        onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onLostPointerCapture={() => { drag.current = null }}
        onKeyDown={event => {
          const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
          const direction = directions[event.key]
          if (!direction) return
          event.preventDefault()
          const step = event.shiftKey ? 64 : 16
          dispatch({ type: 'move', id: win.id, x: win.x + direction[0] * step, y: win.y + direction[1] * step, bounds: bounds() })
        }}><strong>{app.title}</strong></button>
      <div className={styles.controls}>
        <button aria-label={`Minimize ${app.title}`} onClick={() => dispatch({ type: 'minimize', id: win.id })}>_</button>
        <button aria-label={`${win.maximized ? 'Restore' : 'Maximize'} ${app.title}`} onClick={() => dispatch({ type: 'maximize', id: win.id })}>{win.maximized ? '❐' : '□'}</button>
        <button aria-label={`Close ${app.title}`} onClick={() => dispatch({ type: 'close', id: win.id })}>×</button>
      </div>
    </div>
    <div className={styles.menu}><span>ByteGeist OS 2000</span><span>{app.title}</span></div>
    <div className={styles.content}>{children}</div>
    <footer className={styles.status}><span>{win.id === 'bytewire' ? 'Fictional files · No actual downloads' : 'Ready'}</span><span>ByteGeist OS 2000</span></footer>
    {!win.maximized && (['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as const).map(edge => <button key={edge} ref={edge === 'se' ? sizing : undefined} tabIndex={edge === 'se' ? 0 : -1} aria-label={`Resize ${app.title}${edge === 'se' ? '' : ` ${edge}`}`} title={`${win.width} × ${win.height}. Drag an edge; arrow keys resize from this corner.`} className={`${styles.resizeEdge} ${styles[`edge_${edge}`]}`}
      onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); resize.current = { x: event.clientX, y: event.clientY, rect: win, edge }; event.currentTarget.setPointerCapture(event.pointerId) }}
      onPointerMove={event => {
        const start = resize.current
        if (!start) return
        const b = bounds()
        const dx = event.clientX - start.x; const dy = event.clientY - start.y
        const left = edge.includes('w') ? Math.max(0, Math.min(start.rect.x + dx, start.rect.x + start.rect.width - 320)) : start.rect.x
        const top = edge.includes('n') ? Math.max(0, Math.min(start.rect.y + dy, start.rect.y + start.rect.height - 240)) : start.rect.y
        const width = edge.includes('w') ? start.rect.x + start.rect.width - left : edge.includes('e') ? Math.max(320, Math.min(start.rect.width + dx, b.width - left)) : start.rect.width
        const height = edge.includes('n') ? start.rect.y + start.rect.height - top : edge.includes('s') ? Math.max(240, Math.min(start.rect.height + dy, b.height - top)) : start.rect.height
        setRect(left, top, width, height)
      }}
      onPointerUp={() => { resize.current = null }} onPointerCancel={() => { resize.current = null }} onLostPointerCapture={() => { resize.current = null }}
      onKeyDown={event => { const step = event.shiftKey ? 64 : 16; if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) { event.preventDefault(); setRect(win.x, win.y, win.width + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0), win.height + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0)) } }} />)}
    {menu && <ContextMenu x={menu.x} y={menu.y} label={`${app.title} window menu`} dismiss={dismissMenu} items={[
      { label: 'Restore', disabled: !win.maximized, action: () => dispatch({ type: 'maximize', id: win.id }) },
      { label: 'Move', disabled: win.maximized, action: () => handle.current?.focus() },
      { label: 'Size', disabled: win.maximized || window.innerWidth <= 640, action: () => sizing.current?.focus() },
      { label: 'Minimize', action: () => dispatch({ type: 'minimize', id: win.id }) },
      { label: 'Maximize', disabled: win.maximized, action: () => dispatch({ type: 'maximize', id: win.id }) },
      { label: 'Close', separator: true, action: () => dispatch({ type: 'close', id: win.id }) },
    ]} />}
  </section>
}
