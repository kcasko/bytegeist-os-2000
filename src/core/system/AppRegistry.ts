import type { AppId } from '../windows/windowReducer'
export const apps: { id: AppId; title: string; description: string; icon: 'computer' | 'folder' | 'person' | 'tools' | 'wire' }[] = [
  { id: 'welcome', title: 'Welcome', description: 'Start here', icon: 'computer' },
  { id: 'projects', title: 'My Projects', description: 'Things I built. Problems I solved.', icon: 'folder' },
  { id: 'about', title: 'About Keith', description: 'The person behind the keyboard', icon: 'person' },
  { id: 'skills', title: 'System Properties', description: 'Skills, tools & education', icon: 'tools' },
  { id: 'bytewire', title: 'ByteWire', description: 'Suspiciously good downloads', icon: 'wire' },
  { id: 'downloads', title: 'Downloads', description: 'Open completed ByteWire files', icon: 'folder' },
  { id: 'taskmanager', title: 'Task Manager', description: 'Inspect and stop fictional processes', icon: 'tools' },
  { id: 'startup', title: 'Startup Manager', description: 'Find what survives a reboot', icon: 'tools' },
  { id: 'defender', title: 'ByteDefender', description: 'Quarantine, scan & verify recovery', icon: 'computer' },
  { id: 'events', title: 'Event Viewer', description: 'Read the incident timeline', icon: 'folder' },
  { id: 'report', title: 'Incident Report', description: 'Evidence, recovery & lessons learned', icon: 'folder' },
  { id: 'infection', title: 'Infection Activity', description: 'Fictional warnings and simulated CPU', icon: 'tools' },
  { id: 'notepad', title: 'Notepad', description: 'Notes.txt · session document', icon: 'folder' },
  { id: 'display', title: 'Display Properties', description: 'Desktop background and colors', icon: 'tools' },
  { id: 'run', title: 'Run', description: 'Open a simulated program by name', icon: 'computer' },
]
export const getApp = (id: AppId) => apps.find(app => app.id === id)!
