import { useEffect, useRef, useState } from 'react'
const stages = ['Shutting down', 'Restarting', 'Checking system', 'Starting ByteGeist OS 2000', 'Preparing your desktop']
export function BootScreen({ cold, complete }: { cold: boolean; complete: () => void }) {
  const [step, setStep] = useState(cold ? 1 : 0)
  const done = useRef(complete)
  useEffect(() => { done.current = complete }, [complete])
  useEffect(() => {
    const timer = window.setTimeout(() => { if (step === 4) done.current(); else setStep(value => value + 1) }, [850, 350, 1100, 1900, 900][step])
    return () => window.clearTimeout(timer)
  }, [step])
  return <div className={`boot-screen boot-step-${step}`} role="region" aria-label="Virtual computer reboot">
    {step === 0 && <div className="boot-shutdown"><strong>ByteGeist OS 2000</strong><h1>Please wait...</h1><p>Saving your settings and shutting down.</p></div>}
    {step === 2 && <div className="boot-post"><strong>BYTEGEIST BIOS v2.00</strong><p>Copyright 2000 ByteGeist Systems</p><p>Memory Test: 131072K OK<br />Primary Master: BG VIRTUAL DISK<br />Keyboard: Detected<br />Boot Device: Virtual Hard Disk</p><p>Starting operating system...</p></div>}
    {step === 3 && <div className="boot-splash"><div className="boot-logo">bg</div><h1>ByteGeist<span>OS 2000</span></h1><p>PROFESSIONAL</p><div className="boot-progress" aria-hidden="true"><i /><i /><i /><i /><i /></div><small>Built for the internet. Unfortunately.</small></div>}
    {step === 4 && <div className="boot-shutdown"><strong>ByteGeist OS 2000</strong><h1>Welcome</h1><p>Loading personal settings...</p><p>Applying startup configuration...</p></div>}
    <p className="sr-only" role="status">{stages[step]}</p>
    <div className="boot-footer"><span>Virtual desktop restart</span><button onClick={() => done.current()}>Skip startup</button></div>
  </div>
}
