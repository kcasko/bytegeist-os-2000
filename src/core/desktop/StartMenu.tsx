import { useEffect, useRef } from 'react'
import type { AppId } from '../windows/windowReducer'
import { apps } from '../system/AppRegistry'
import { Icon } from '../system/Icon'

export function StartMenu({ open, dismiss, power }: { open: (id: AppId) => void; dismiss: () => void; power: () => void }) {
  const nav = useRef<HTMLElement>(null)
  useEffect(() => { nav.current?.querySelector('button')?.focus() }, [])
  return <nav id="start-menu" className="start-menu" aria-label="Start menu" ref={nav} onKeyDown={event => {
    if (event.key === 'Escape') { event.stopPropagation(); dismiss() }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = Array.from(nav.current!.querySelectorAll('button'))
    const index = items.indexOf(document.activeElement as HTMLButtonElement)
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus()
  }}><div className="start-rail">ByteGeist <strong>2000</strong></div><div className="start-items"><p>KEITH CASKO / PORTFOLIO</p><div className="start-programs">{apps.filter(app => app.id !== 'run').map((app, index) => <div key={app.id}>{index === 6 && <p className="start-section-label">PROGRAMS</p>}<button onClick={() => open(app.id)}><Icon kind={app.icon} /><span><strong>{app.title}</strong><small>{app.description}</small></span></button></div>)}</div><div className="start-footer"><button onClick={() => open('run')}>Run…</button><button onClick={power}>Shut Down…</button></div></div></nav>
}
