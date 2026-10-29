import { useContext, useState } from 'react'
import { ByteWireSession } from './session'
import { files, isComplete } from './model'
import type { FileId } from './model'
import type { AppId } from '../../core/windows/windowReducer'
import { useIncident } from '../../game/IncidentSession'
import { useFileActions } from './useFileActions'
import { FilePanels } from './FilePanels'

export function Downloads({ open }: { open: (id: AppId) => void }) {
  const session = useContext(ByteWireSession)
  const incident = useIncident()
  const actions = useFileActions()
  const [extensions, setExtensions] = useState(false)
  const [selection, setSelection] = useState<FileId | null>(null)
  if (!session?.state.consent) return <div className="app-page"><p className="eyebrow">C:\Downloads</p><h1>Downloads</h1><p>No active download session. Open ByteWire to enter the fictional file-sharing client.</p><button onClick={() => open('bytewire')}>Open ByteWire</button></div>
  const { state } = session
  const completed = files.filter(file => isComplete(state, file.id))
  const selected = completed.find(file => file.id === selection) ?? completed[0]
  const displayName = (file: (typeof files)[number]) => extensions ? file.fullName : file.fullName.replace(/\.[^.]+$/, '')
  const blocked = (id: FileId) => id === 'song' && (state.prevented || incident.state.quarantined)
  return <div className="downloads-app">
    <div className="folder-menu"><span>Downloads folder</span></div>
    <div className="folder-toolbar"><button onClick={() => open('bytewire')}>Back to ByteWire</button><button disabled={!selected || blocked(selected.id)} onClick={event => { if (selected) actions.openFile(selected.id, false, event.currentTarget) }}>Open selected file</button><button disabled={!selected} onClick={event => { if (selected) actions.inspect(selected.id, event.currentTarget) }}>Properties</button></div>
    <div className="folder-address"><span>Address</span><strong>C:\Downloads</strong></div>
    <div className="folder-intro"><h1>Downloads</h1><p>Completed ByteWire transfers appear here. Select a file and choose Open, or double-click its name.</p><label><input type="checkbox" checked={extensions} onChange={event => setExtensions(event.target.checked)} /> Show filename extensions</label></div>
    <section className="folder-files" aria-label="Downloaded files">{completed.length ? <table><thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Size</th><th scope="col">Actions</th></tr></thead><tbody>{completed.map(file => <tr key={file.id} className={selected?.id === file.id ? 'folder-selected' : ''}><td><button className="folder-filename" aria-label={`Select download: ${displayName(file)}`} aria-pressed={selected?.id === file.id} onClick={() => setSelection(file.id)} onDoubleClick={event => actions.openFile(file.id, false, event.currentTarget)}><span aria-hidden="true">{file.suspicious ? '▣' : file.id === 'mix' ? '♪' : '▤'}</span>{displayName(file)}</button>{blocked(file.id) && <small>Blocked / quarantined</small>}</td><td>{file.type}</td><td>{file.size}</td><td><button aria-label={`Open ${displayName(file)}`} disabled={blocked(file.id)} onClick={event => actions.openFile(file.id, false, event.currentTarget)}>Open</button><button aria-label={`Properties: ${file.name}`} onClick={event => actions.inspect(file.id, event.currentTarget)}>Properties</button></td></tr>)}</tbody></table> : <p className="bw-empty">No completed files yet. Transfers continue in ByteWire even when its window is closed.</p>}</section>
    <FilePanels {...actions} open={open} />
    <footer className="folder-status"><span>{completed.length} file{completed.length === 1 ? '' : 's'}</span><span>Fictional folder · Nothing saved to your device</span></footer>
  </div>
}
