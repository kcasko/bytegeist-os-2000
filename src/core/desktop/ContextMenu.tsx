import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
export type MenuItem = { label: string; action: () => void; disabled?: boolean; separator?: boolean }
export function ContextMenu({ x, y, label, items, dismiss }: { x: number; y: number; label: string; items: MenuItem[]; dismiss: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const opener = useRef(document.activeElement as HTMLElement | null)
  const finish = () => { dismiss(); if (opener.current?.isConnected) opener.current.focus() }
  const closeRef = useRef(dismiss)
  useEffect(() => { closeRef.current = dismiss }, [dismiss])
  useEffect(() => {
    const menu = ref.current!
    menu.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus()
    const close = (event: PointerEvent) => { if (!menu.contains(event.target as Node)) closeRef.current() }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])
  const bottom = document.querySelector('main.desktop')?.clientHeight ?? window.innerHeight - 48
  return createPortal(<div ref={ref} role="menu" aria-label={label} className="os-context-menu" style={{ left: Math.max(2, Math.min(x, window.innerWidth - 214)), top: Math.max(2, Math.min(y, bottom - items.length * 31)), maxHeight: Math.max(100, bottom - 4) }} onContextMenu={event => event.preventDefault()} onKeyDown={event => {
    if (event.key === 'Escape' || event.key === 'Tab') { event.preventDefault(); event.stopPropagation(); finish(); return }
    const buttons = Array.from(ref.current!.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length
      buttons[next]?.focus()
    }
  }}>{items.map(item => <button key={item.label} role="menuitem" disabled={item.disabled} className={item.separator ? 'menu-separator' : ''} onClick={() => { finish(); item.action() }}>{item.label}</button>)}</div>, document.body)
}
