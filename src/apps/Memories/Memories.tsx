import { useEffect, useRef, useState } from 'react'
import './memories.css'

const connectionSteps = ['Dialing up a memory…', 'Finding Talk City…', 'Loading some terrible HTML…', 'Welcome to my first internet.']
export function Memories() {
  const [phase, setPhase] = useState<'off' | 'connecting' | 'online'>('off')
  const [step, setStep] = useState(0)
  const [page, setPage] = useState<'welcome' | 'homepage' | 'chat' | 'today'>('welcome')
  const [theme, setTheme] = useState('blue')
  const [chat, setChat] = useState(0)
  const [reducedMotion] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  const screen = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (phase !== 'connecting') return
    const timer = window.setTimeout(() => {
      if (step === connectionSteps.length - 1) setPhase('online')
      else setStep(value => value + 1)
    }, step === 0 || step === 3 ? 900 : 1100)
    return () => window.clearTimeout(timer)
  }, [phase, step])
  useEffect(() => {
    if (phase !== 'connecting' && screen.current?.closest('[role="dialog"]')?.getAttribute('data-window-active') === 'true') {
      const target = screen.current?.querySelector<HTMLElement>('[data-memory-focus]')
      target?.focus({ preventScroll: true })
      target?.scrollIntoView?.({ block: 'nearest' })
    }
  }, [phase, page, chat])
  const powerOff = () => { setPhase('off'); setStep(0); setPage('welcome'); setChat(0) }
  return <div className="memories-app">
    <p className="memory-hint">INTERACTIVE FUN FACT · Turn on the TV to discover where my tech obsession started.</p>
    <div className="memory-tv"><div ref={screen} className={`memory-screen memory-screen-${phase}`}>
      {phase === 'off' && <div className="memory-power"><span className="memory-tv-symbol" aria-hidden="true">TV</span><h1>Before my first PC...</h1><p>There was a television, a keyboard, and an entire internet to figure out.</p><button data-memory-focus onClick={() => { setStep(0); setPage('welcome'); setPhase(reducedMotion ? 'online' : 'connecting') }}>Connect</button><small>Click Connect. No modem required this time.</small></div>}
      {phase === 'connecting' && <div className="memory-loading"><div className="memory-orbit" aria-hidden="true"><span>bg</span></div><h1>WebTV Memories</h1><p role="status">{connectionSteps[step]}</p><progress aria-label="WebTV connection progress" max={4} value={step + 1} /><button onClick={() => setPhase('online')}>Skip connection</button><small>A recreation of a memory, not a real connection.</small></div>}
      {phase === 'online' && <>
        <div className="memory-service-bar"><strong>WebTV Memories</strong><span>Keith's first internet</span></div>
        {page === 'welcome' && <div className="memory-portal"><h1>You're connected.</h1><p>Welcome back to the internet you could use from your couch.</p><p>One of these homemade pages belongs to a future software engineering student. The HTML has... character.</p><button data-memory-focus onClick={() => setPage('homepage')}>Open my first homepage</button><small>A playful recreation, not a recovered original website.</small></div>}
        {page === 'homepage' && <section className="memory-homepage" aria-label="My first homepage" data-theme={theme}><p className="memory-construction">*** UNDER CONSTRUCTION. PROBABLY FOREVER. ***</p><h1 data-memory-focus tabIndex={-1}>I built my first websites on a television.</h1><p>My internet journey started on <strong>WebTV</strong>, in Talk City chat rooms, while I tried to make terrible HTML websites using my TV.</p><div className="memory-fact-stats"><span>FIRST WEB WORKSTATION<strong>A television.</strong></span><span>EARLY DESIGN SKILLS<strong>Questionable.</strong></span><span>CURIOSITY<strong>Still going.</strong></span></div><p>Help younger me make another questionable design decision:</p><div className="memory-palette"><button aria-pressed={theme === 'blue'} onClick={() => setTheme('blue')}>Midnight blue</button><button aria-pressed={theme === 'green'} onClick={() => setTheme('green')}>Radioactive green</button><button aria-pressed={theme === 'pink'} onClick={() => setTheme('pink')}>Hot pink</button></div><p className="memory-counter">VISITOR NUMBER: 000001 · YOU'RE BASICALLY FAMOUS.</p><button onClick={() => { setChat(0); setPage('chat') }}>What happened next?</button></section>}
        {page === 'chat' && <div className="memory-chat"><h1 data-memory-focus tabIndex={-1}>{chat === 0 ? 'Talk City, then a whole new world.' : 'The mIRC years.'}</h1><p className="memory-channel">{chat === 0 ? 'CONNECTED TO: Talk City on WebTV' : 'CONNECTED TO: my first desktop PC / mIRC'}</p><p><strong>&lt;Keith&gt;</strong> {chat === 0 ? 'I started in Talk City on WebTV. A year or two later, I got my first desktop computer.' : 'I brought the chat-room habit to my first PC and got into mIRC. I spent much of my twenties in chat rooms, using computers and learning about technology.'}</p><p><strong>&lt;system&gt;</strong> {chat === 0 ? 'New hardware. Same curiosity.' : 'Technology stayed a hobby and a passion, even while bakery work became my profession.'}</p><button onClick={() => chat === 0 ? setChat(1) : setPage('today')}>{chat === 0 ? 'Next memory' : 'Where I am now'}</button><small>These lines retell my story; they aren't historical chat logs.</small></div>}
        {page === 'today' && <div className="memory-today"><small>FUN FACT UNLOCKED</small><h1 data-memory-focus tabIndex={-1}>Same curiosity. A new career.</h1><p>My mom worked in a bakery, and I started there when I turned 16. It became my profession. Computers stayed my passion.</p><p><strong>At 46,</strong> I'm studying software engineering at Western Governors University to turn that lifelong interest into a career.</p><p>That's why this portfolio looks like a computer from another era. It comes from my own internet history.</p><button onClick={() => setPage('homepage')}>Revisit my terrible homepage</button></div>}
      </>}
    </div><div className="memory-tv-bottom"><span className={phase === 'off' ? 'memory-led' : 'memory-led memory-led-on'} aria-hidden="true" /><span>BYTEGEIST / MEMORY CHANNEL</span><span>TV / WEB</span></div></div>
    <nav className="memory-remote" aria-label="TV remote"><span>REMOTE</span><button disabled={phase !== 'online'} aria-pressed={page === 'homepage' && phase === 'online'} onClick={() => setPage('homepage')}>Home</button><button disabled={phase !== 'online'} aria-pressed={page === 'chat' && phase === 'online'} onClick={() => { setChat(0); setPage('chat') }}>Chat rooms</button><button disabled={phase !== 'online'} aria-pressed={page === 'today' && phase === 'online'} onClick={() => setPage('today')}>Today</button><button disabled={phase === 'off'} onClick={powerOff}>Power off TV</button></nav>
    <p className="memory-exit-hint">Close this window whenever you like. Projects, Skills, and the rest of the desktop are always available.</p>
  </div>
}
