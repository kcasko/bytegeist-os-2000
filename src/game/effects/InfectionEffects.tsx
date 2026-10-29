import { useEffect, useReducer, useRef, useState } from 'react'
import './infection.css'

import { warningMessages } from './warningMessages'


type EffectState = { count: number; dismissed: number[]; hidden: boolean }
function effectsReducer(state: EffectState, action: { type: 'tick' | 'hide' | 'show' } | { type: 'dismiss'; index: number }): EffectState {
  if (action.type === 'tick') return { ...state, count: Math.min(3, state.count + 1), dismissed: [] }
  if (action.type === 'hide') return { ...state, hidden: true }
  if (action.type === 'show') return { ...state, hidden: false }
  if (action.type === 'dismiss') return { ...state, dismissed: [...state.dismissed, action.index] }
  return state
}
export function InfectionEffects({ compact, obscured, onInvestigate, onActivity }: { compact: boolean; obscured: boolean; onInvestigate: () => void; onActivity: () => void }) {
  const [state, dispatch] = useReducer(effectsReducer, { count: 1, dismissed: [], hidden: false })
  const toggle = useRef<HTMLButtonElement>(null)
  const [investigated, setInvestigated] = useState<number[]>([])
  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: 'tick' }), 4000)
    return () => clearInterval(timer)
  }, [])
  return <aside className={compact ? 'infection-strip' : 'infection-effects'} aria-label="Fictional malware warning">
    {compact ? <><span><strong>SIMULATED INFECTION</strong><small>CPU 96% · Rogue warnings active</small></span><button onClick={onActivity}>View infection activity</button></> : !obscured && <>
      <div className="infection-effects-tools"><small>FICTIONAL POP-UPS / MAXIMUM 3</small><button ref={toggle} onClick={() => dispatch({ type: state.hidden ? 'show' : 'hide' })}>{state.hidden ? 'Show pop-ups' : 'Hide pop-ups'}</button></div>
      {!state.hidden && warningMessages.slice(0, state.count).map((warning, index) => !state.dismissed.includes(index) && <section key={warning.title} role="dialog" aria-label={warning.title} className={`infection-popup infection-popup-${index}`}>
        <header><strong>{warning.title}</strong><button aria-label={`Dismiss ${warning.title}`} onClick={() => { dispatch({ type: 'dismiss', index }); toggle.current?.focus() }}>×</button></header>
        <div className="infection-popup-body"><span className="infection-error-symbol" aria-hidden="true">{warning.symbol}</span><div><small>{warning.eyebrow}</small><h2>{warning.heading}</h2><p>{warning.body}</p></div></div>
        <footer className={investigated.includes(index) ? 'investigation-confirmed' : ''}><small role={investigated.includes(index) ? 'status' : undefined}>{investigated.includes(index) ? 'Selected in Task Manager: songhelper.exe' : warning.footer}</small><button onClick={() => { setInvestigated(previous => previous.includes(index) ? previous : [...previous, index]); onInvestigate() }}>{investigated.includes(index) ? 'Show process again' : 'Investigate process'}</button></footer>
      </section>)}
      <p className="infection-caption">{state.hidden ? 'Pop-ups hidden. songhelper.exe is still running.' : 'Dismissed warnings return while songhelper.exe runs. Contain the process to stop them.'}</p>
    </>}
  </aside>
}
