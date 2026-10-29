import { useEffect, useRef } from 'react'
export function PowerDialog({ cancel, restart, turnOff, unsaved }: { cancel: () => void; restart: () => void; turnOff: () => void; unsaved: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => { ref.current?.querySelector<HTMLButtonElement>('button[data-cancel]')?.focus() }, [])
  return <div className="power-overlay"><section ref={ref} role="alertdialog" aria-modal="true" aria-label="Shut Down ByteGeist OS" className="power-dialog" onKeyDown={event => {
    if (event.key === 'Escape') { event.stopPropagation(); cancel() }
    if (event.key === 'Tab') { event.preventDefault(); const buttons = Array.from(ref.current!.querySelectorAll('button')); const current = buttons.indexOf(document.activeElement as HTMLButtonElement); buttons[(current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus() }
  }}><h2>Shut Down ByteGeist OS</h2><div><p>What do you want this virtual computer to do?</p><p>Completed downloads, saved notes and startup settings stay in this session. Restart can bring an enabled startup program back.</p>{unsaved && <p className="run-error">Unsaved Notepad text will be discarded.</p>}<div className="shell-action-row"><button onClick={turnOff}>Turn off</button><button onClick={restart}>Restart</button><button data-cancel onClick={cancel}>Cancel</button></div></div></section></div>
}
