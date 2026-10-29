import { useEffect, useRef, useState } from 'react'
import type { AppId } from '../../core/windows/windowReducer'
import { useDesktopSession } from '../../core/system/DesktopSession'
import type { Wallpaper } from '../../core/system/DesktopSession'
import './shell.css'

export function Run({ open }: { open: (id: AppId) => void }) {
  const session = useDesktopSession()
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { input.current?.focus() }, [])
  const [command, setCommand] = useState('')
  const [error, setError] = useState('')
  const commands: Record<string, AppId> = { bytewire: 'bytewire', explorer: 'downloads', downloads: 'downloads', taskmgr: 'taskmanager', msconfig: 'startup', eventvwr: 'events', notepad: 'notepad', control: 'skills', display: 'display', winver: 'skills' }
  return <div className="app-page run-app"><h1>Run</h1><p>Type the name of a program and ByteGeist OS will open it.</p><form onSubmit={event => { event.preventDefault(); const name = command.trim().toLowerCase().replace(/\.exe$/, ''); const id = Object.hasOwn(commands, name) ? commands[name] : undefined; if (id) { setError(''); session.close('run'); open(id) } else setError(`Cannot find “${command.trim()}”. Check the program name and try again.`) }}><label htmlFor="run-command">Open:</label><input data-autofocus ref={input} id="run-command" value={command} onChange={event => setCommand(event.target.value)} autoComplete="off" /><div className="shell-action-row"><button disabled={!command.trim()} type="submit">OK</button><button type="button" onClick={() => { setCommand(''); setError('') }}>Clear</button></div></form>{error && <p role="alert" className="run-error">{error}</p>}<details><summary>Available programs</summary><p>bytewire, explorer, downloads, taskmgr, msconfig, eventvwr, notepad, control, display, winver</p><p>These names open programs inside this desktop.</p></details></div>
}
export function Notepad() {
  const session = useDesktopSession()
  const [wrap, setWrap] = useState(true)
  const [status, setStatus] = useState('')
  const replaceDocument = (value: string, message: string, openSaved = false) => {
    const apply = (text = value) => { session.setNotes(text); setStatus(message) }
    if (session.notes !== session.savedNotes) session.decide({ title: 'Save changes to Notes.txt?', message: 'Replacing the document discards unsaved changes.', choices: [{ label: 'Save', action: () => { session.saveNotes(session.notes); apply(openSaved ? session.notes : value) } }, { label: "Don't save", action: () => apply() }] })
    else apply()
  }
  return <div className="notepad-app"><div className="notepad-menu"><button onClick={() => { replaceDocument('', 'New document. Save to keep it in this session.') }}>New</button><button onClick={() => { session.saveNotes(session.notes); setStatus('Saved to Notes.txt in this desktop session.') }}>Save</button><button onClick={() => { replaceDocument(session.savedNotes, 'Opened saved Notes.txt.', true) }}>Open saved</button><label><input type="checkbox" checked={wrap} onChange={event => setWrap(event.target.checked)} />Word Wrap</label></div><textarea data-autofocus aria-label="Notepad document" spellCheck={false} wrap={wrap ? 'soft' : 'off'} value={session.notes} onChange={event => { session.setNotes(event.target.value); setStatus('') }} /><footer><span>{session.notes === session.savedNotes ? 'Saved' : 'Modified'} · Notes.txt</span><span>{session.notes.length} characters</span></footer><p role="status">{status || 'Session notes. Refresh clears this fictional desktop storage.'}</p></div>
}
export function DisplayProperties() {
  const session = useDesktopSession()
  const [draft, setDraft] = useState<Wallpaper>(session.wallpaper)
  const [status, setStatus] = useState('')
  return <div className="app-page display-app"><h1>Display Properties</h1><fieldset><legend>Background</legend><div className={`monitor-preview background-${draft}`} aria-label={`Preview ${draft} desktop`}><span>ByteGeist<br />OS 2000</span></div><div className="wallpaper-choices">{(['blue', 'teal', 'slate'] as const).map(color => <label key={color}><input type="radio" name="wallpaper" checked={draft === color} onChange={() => { setDraft(color); setStatus('') }} />{({ blue: 'ByteGeist Blue', teal: 'Classic Teal', slate: 'Slate' })[color]}</label>)}</div></fieldset><div className="shell-action-row"><button onClick={() => { session.setWallpaper(draft); session.close('display') }}>OK</button><button onClick={() => { session.setWallpaper(draft); setStatus('Background applied.') }}>Apply</button><button onClick={() => { session.close('display') }}>Cancel</button></div><p role="status">{status || 'Changes affect only this desktop. Infection effects temporarily override the background.'}</p></div>
}
