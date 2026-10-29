import { useEffect, useRef } from 'react'
import type { Decision } from '../../core/system/DesktopSession'
export function DecisionDialog({ decision, dismiss }: { decision: Decision; dismiss: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const opener = useRef(document.activeElement as HTMLElement | null)
  useEffect(() => {
    ref.current?.querySelector<HTMLButtonElement>('[data-cancel]')?.focus()
    const source = opener.current
    return () => { if (source?.isConnected) source.focus() }
  }, [])
  return <div className="power-overlay"><section ref={ref} role="alertdialog" aria-modal="true" aria-label={decision.title} className="power-dialog" onKeyDown={event => {
    event.stopPropagation()
    if (event.key === 'Escape') dismiss()
    if (event.key === 'Tab') { event.preventDefault(); const buttons = Array.from(ref.current!.querySelectorAll('button')); const index = buttons.indexOf(document.activeElement as HTMLButtonElement); buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus() }
  }}><h2>{decision.title}</h2><div><p>{decision.message}</p><div className="shell-action-row">{decision.choices.map(choice => <button key={choice.label} onClick={() => { dismiss(); choice.action() }}>{choice.label}</button>)}<button data-cancel onClick={dismiss}>Cancel</button></div></div></section></div>
}
