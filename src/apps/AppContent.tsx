import { Memories } from './Memories/Memories'
import { ByteWire } from './ByteWire/ByteWire'
import { Recovery } from './Recovery/Recovery'
import { useContext } from 'react'
import { ByteWireSession } from './ByteWire/session'
import type { AppId } from '../core/windows/windowReducer'
import { About, Projects, Skills } from './Portfolio/Portfolio'
import { Icon } from '../core/system/Icon'
import { InfectionActivity } from '../game/effects/InfectionActivity'
import { Downloads } from './ByteWire/Downloads'
import { DisplayProperties, Notepad, Run } from './Shell/ShellApps'
export function AppContent({ id, open }: { id: AppId; open: (id: AppId) => void }) {
  const bytewire = useContext(ByteWireSession)
  if (id === 'welcome') return <>
    <nav className="portfolio-shortcuts" aria-label="Portfolio sections"><button onClick={() => open('about')}>About Me</button><button onClick={() => open('skills')}>Skills</button><button onClick={() => open('projects')}>Projects</button><span className="fun-fact-shortcut"><button aria-describedby="webtv-discovery-hint" onClick={() => open('memories')}>Discover my first internet</button><small id="webtv-discovery-hint">An interactive trip back to WebTV</small></span></nav>
    <div className="welcome-banner"><div className="brand-mark" aria-hidden="true">bg</div><div><small>YOUR COMPUTER. MY PORTFOLIO.</small><h1>ByteGeist <span>OS 2000</span></h1><p>Professional Edition · Unprofessional nostalgia.</p></div></div>
    <div className="welcome-layout"><aside><strong>Getting started</strong><p>Take a look around.</p><span>01 / Explore projects</span><span>02 / Meet the operator</span><span>03 / Question that download</span><div className="system-stamp">BUILD 0003<br />INVESTIGATE / RECOVER</div></aside><div><h2>Welcome to my corner of the internet.</h2><p>I'm Keith. My internet story started with WebTV, Talk City, and terrible HTML pages. Computers stayed my passion through a bakery career; now I'm studying software engineering.</p><p>Try ByteWire, my optional malware recovery game. Investigate a fictional incident, fix the cause, and verify recovery.</p><div className="launch-list"><button onClick={() => open('projects')}><Icon kind="folder" /><span><strong>Explore My Projects</strong><small>Cloud apps, systems & troubleshooting</small></span><b>›</b></button><button onClick={() => open('about')}><Icon kind="person" /><span><strong>Meet the operator</strong><small>WebTV, mIRC, and a career change at 46</small></span><b>›</b></button><button onClick={() => open('bytewire')}><Icon kind="wire" /><span><strong>Open ByteWire</strong><small>Simulated P2P client · Inspect before you trust</small></span><b>›</b></button></div><p className="tip">TIP: Drag a window by its title bar. Just like the old days.</p></div></div>
  </>
  if (id === 'memories') return <Memories />
  if (id === 'projects') return <Projects />
  if (id === 'about') return <About />
  if (id === 'skills') return <Skills />
  if (id === 'bytewire') return <ByteWire key={bytewire?.revision} open={open} />
  if (id === 'downloads') return <Downloads key={bytewire?.revision} open={open} />
  if (id === 'notepad') return <Notepad />
  if (id === 'display') return <DisplayProperties />
  if (id === 'run') return <Run open={open} />
  if (id === 'infection') return <InfectionActivity open={open} />
  return <Recovery id={id} open={open} />
}
