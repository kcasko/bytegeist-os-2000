import { useContext, useRef, useState } from 'react'
import { ByteWireSession } from './session'
import { isComplete } from './model'
import type { FileId } from './model'
import { useIncident } from '../../game/IncidentSession'

export function useFileActions() {
  const session = useContext(ByteWireSession)
  const incident = useIncident()
  const [propertiesFile, setPropertiesFile] = useState<FileId | null>(null)
  const [openingFile, setOpeningFile] = useState<FileId | null>(null)
  const [allowPrevented, setAllowPrevented] = useState(false)
  const opener = useRef<HTMLElement | null>(null)
  const returnWindow = useRef<HTMLElement | null>(null)
  const rememberOpener = (source?: HTMLElement) => {
    const active = source ?? document.activeElement as HTMLElement | null
    if (!active?.closest('[data-file-panel]')) {
      opener.current = active
      returnWindow.current = active?.closest<HTMLElement>('[role="dialog"]') ?? null
    }
  }
  if (!session) throw new Error('File actions require a ByteWire session')
  const inspect = (id: FileId, source?: HTMLElement) => {
    if (!isComplete(session.state, id)) return
    rememberOpener(source)
    session.dispatch({ type: 'inspect', id })
    if (id === 'song') incident.dispatch({ type: 'inspect', evidence: 'file' })
    setPropertiesFile(id)
    setOpeningFile(null)
  }
  const openFile = (id: FileId, bypassPrevention = false, source?: HTMLElement) => {
    if (!isComplete(session.state, id) || (id === 'song' && (incident.state.quarantined || (session.state.prevented && !bypassPrevention)))) return
    rememberOpener(source)
    setAllowPrevented(bypassPrevention)
    setOpeningFile(id)
    setPropertiesFile(null)
  }
  const close = () => {
    setPropertiesFile(null)
    setOpeningFile(null)
    setAllowPrevented(false)
    if (opener.current?.isConnected && !opener.current.matches(':disabled')) opener.current.focus()
    else if (returnWindow.current?.isConnected) returnWindow.current.focus()
  }
  return { propertiesFile, openingFile, allowPrevented, inspect, openFile, close }
}
