import { useEffect, useRef } from 'react'
import type { AppId } from '../windows/windowReducer'
import { apps } from '../system/AppRegistry'
import { Icon } from '../system/Icon'

export function StartMenu({ open, dismiss }: { open: (id: AppId) => void; dismiss: () => void }) {
  const nav = useRef<HTMLElement>(null)
  useEffect(() => { nav.current?.querySelector('button')?.focus() }, [])
  return <nav id="start-menu" className="start-menu" aria-label="Start menu" ref={nav} onKeyDown={event => {
    if (event.key === 'Escape') { event.stopPropagation(); dismiss() }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = Array.from(nav.current!.querySelectorAll('button'))
    const index = items.indexOf(document.activeElement as HTMLButtonElement)
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus()
  }}><div className="start-rail">ByteGeist <strong>2000</strong></div><div className="start-items"><p>KEITH CASKO / PORTFOLIO</p>{apps.map(app => <button key={app.id} onClick={() => open(app.id)}><Icon kind={app.icon} /><span><strong>{app.title}</strong><small>{app.description}</small></span></button>)}<div className="start-footer">Local desktop · Build 0001</div></div></nav>
}
