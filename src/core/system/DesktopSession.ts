import { createContext, useContext } from 'react'
export type Wallpaper = 'blue' | 'teal' | 'slate'
export type DesktopPreferences = { wallpaper: Wallpaper; setWallpaper: (value: Wallpaper) => void; notes: string; setNotes: (value: string) => void; savedNotes: string; saveNotes: (value: string) => void; restart: () => void; processInvestigation: number }
export const DesktopSession = createContext<DesktopPreferences | null>(null)
export function useDesktopSession() {
  const session = useContext(DesktopSession)
  if (!session) throw new Error('Desktop session is required')
  return session
}
