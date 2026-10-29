import { createContext, useContext } from 'react'
import type { AppId } from '../windows/windowReducer'
export type Decision = { title: string; message: string; choices: { label: string; action: () => void }[] }
export type Wallpaper = 'blue' | 'teal' | 'slate'
export type DesktopPreferences = { wallpaper: Wallpaper; setWallpaper: (value: Wallpaper) => void; notes: string; setNotes: (value: string) => void; savedNotes: string; saveNotes: (value: string) => void; restart: () => void; processInvestigation: number; close: (id: AppId) => void; decide: (decision: Decision) => void }
export const DesktopSession = createContext<DesktopPreferences | null>(null)
export function useDesktopSession() {
  const session = useContext(DesktopSession)
  if (!session) throw new Error('Desktop session is required')
  return session
}
