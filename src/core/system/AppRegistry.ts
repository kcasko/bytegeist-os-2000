import type { AppId } from '../windows/windowReducer'
export const apps: { id: AppId; title: string; description: string; icon: 'computer' | 'folder' | 'person' | 'tools' | 'wire' }[] = [
  { id: 'welcome', title: 'Welcome', description: 'Start here', icon: 'computer' },
  { id: 'projects', title: 'My Projects', description: 'Things I built. Problems I solved.', icon: 'folder' },
  { id: 'about', title: 'About Keith', description: 'The person behind the keyboard', icon: 'person' },
  { id: 'skills', title: 'System Properties', description: 'Skills, tools & education', icon: 'tools' },
  { id: 'bytewire', title: 'ByteWire', description: 'Suspiciously good downloads', icon: 'wire' },
]
export const getApp = (id: AppId) => apps.find(app => app.id === id)!
