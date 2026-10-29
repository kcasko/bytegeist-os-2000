import { useRef, useState } from 'react'
import { apps } from '../system/AppRegistry'
import { Icon } from '../system/Icon'
import type { AppId, Bounds } from '../windows/windowReducer'
import { ContextMenu } from './ContextMenu'
type Position = { x: number; y: number }
export function DesktopIcons({ open, bounds }: { open: (id: AppId) => void; bounds: () => Bounds }) {
  const shortcuts = apps.filter((app, index) => index < 6 || app.id === 'memories')
  const [selected, setSelected] = useState<AppId | null>(null)
  const [positions, setPositions] = useState<Partial<Record<AppId, Position>>>({})
  const [menu, setMenu] = useState<{ id: AppId; x: number; y: number } | null>(null)
  const nav = useRef<HTMLElement>(null)
  const drag = useRef<{ id: AppId; x: number; y: number; start: Position; moved: boolean } | null>(null)
  const moved = useRef(false)
  const position = (id: AppId, index: number): Position => {
    const area = bounds()
    const rows = Math.max(1, Math.floor((area.height - 20) / 84))
    const natural = { x: 12 + Math.floor(index / rows) * 96, y: 12 + (index % rows) * 84 }
    const p = positions[id] ?? natural
    return { x: Math.max(0, Math.min(p.x, area.width - 92)), y: Math.max(0, Math.min(p.y, area.height - 80)) }
  }
  return <><nav ref={nav} className="desktop-icons os-shortcuts" aria-label="Desktop applications">{shortcuts.map((app, index) => {
    const p = position(app.id, index)
    return <button key={app.id} data-shortcut aria-label={app.title} aria-pressed={selected === app.id} style={{ left: p.x, top: p.y }}
      onClick={event => { setSelected(app.id); if (!moved.current && (event.detail === 0)) open(app.id); moved.current = false }}
      onDoubleClick={() => { if (!moved.current) open(app.id) }}
      onContextMenu={event => { event.preventDefault(); event.stopPropagation(); setSelected(app.id); setMenu({ id: app.id, x: event.clientX, y: event.clientY }) }}
      onKeyDown={event => {
        if (event.key === ' ') { event.preventDefault(); setSelected(app.id) }
        if (event.key === 'Enter') { event.preventDefault(); open(app.id) }
        if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) { event.preventDefault(); const box = event.currentTarget.getBoundingClientRect(); setMenu({ id: app.id, x: box.right, y: box.top }) }
        const step = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0
        if (step) { event.preventDefault(); const next = (index + step + shortcuts.length) % shortcuts.length; const button = nav.current?.querySelectorAll<HTMLButtonElement>('button')[next]; button?.focus(); setSelected(shortcuts[next].id) }
      }}
      onPointerDown={event => { if (event.button !== 0 || event.pointerType === 'touch') return; moved.current = false; drag.current = { id: app.id, x: event.clientX, y: event.clientY, start: p, moved: false }; event.currentTarget.setPointerCapture?.(event.pointerId) }}
      onPointerMove={event => { const d = drag.current; if (!d || d.id !== app.id) return; const dx = event.clientX - d.x; const dy = event.clientY - d.y; if (Math.abs(dx) + Math.abs(dy) > 5) d.moved = true; if (d.moved) { moved.current = true; const b = bounds(); setPositions(old => ({ ...old, [app.id]: { x: Math.max(0, Math.min(d.start.x + dx, b.width - 92)), y: Math.max(0, Math.min(d.start.y + dy, b.height - 80)) } })) } }}
      onPointerUp={event => { if (event.pointerType === 'touch') open(app.id); drag.current = null }} onPointerCancel={() => { drag.current = null }}>
      <Icon kind={app.icon} /><span>{app.title}</span></button>
  })}</nav>{menu && <ContextMenu x={menu.x} y={menu.y} label="Shortcut menu" dismiss={() => { setMenu(null); nav.current?.querySelector<HTMLButtonElement>(`button[aria-label="${apps.find(app => app.id === menu.id)?.title}"]`)?.focus() }} items={[{ label: 'Open', action: () => open(menu.id) }, { label: 'Display Properties', action: () => open('display'), separator: true }]} />}</>
}

