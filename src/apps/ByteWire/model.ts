export type FileId = 'song' | 'mix' | 'readme'
export const files = [
  { id: 'song', name: 'this-is-a-song.mp3', fullName: 'this-is-a-song.mp3.exe', type: 'Application (.exe)', size: '248 KB', peer: 'totally_legit_2000', suspicious: true },
  { id: 'mix', name: 'dial-up-daydream.mp3', fullName: 'dial-up-daydream.mp3', type: 'MP3 audio (.mp3)', size: '3.8 MB', peer: 'modem_poet', suspicious: false },
  { id: 'readme', name: 'bytewire-readme.txt', fullName: 'bytewire-readme.txt', type: 'Text document (.txt)', size: '4 KB', peer: 'bytegeist_archive', suspicious: false },
] as const
export type ByteWireState = { consent: boolean; query: string; searched: boolean; selected: FileId | null; downloads: FileId[]; progress: Partial<Record<FileId, number>>; inspected: FileId[]; prevented: boolean; notice: string }
export const initialByteWire: ByteWireState = { consent: false, query: '', searched: false, selected: null, downloads: [], progress: {}, inspected: [], prevented: false, notice: '' }
export type ByteWireAction = { type: 'begin' | 'exit' | 'reset' | 'tick' } | { type: 'search'; query: string } | { type: 'select' | 'download' | 'cancel' | 'inspect' | 'flag'; id: FileId }
export const isComplete = (state: ByteWireState, id: FileId) => state.consent && state.progress[id] === 100
export function byteWireReducer(state: ByteWireState, action: ByteWireAction): ByteWireState {
  if (action.type === 'exit') return initialByteWire
  if (action.type === 'begin') return state.consent ? state : { ...initialByteWire, consent: true }
  if (!state.consent) return state
  if (action.type === 'reset') return { ...initialByteWire, consent: true }
  if (action.type === 'tick') {
    const pending = state.downloads.filter(id => (state.progress[id] ?? 0) < 100)
    if (!pending.length) return state
    const progress = { ...state.progress }
    for (const id of pending) progress[id] = Math.min(100, (progress[id] ?? 0) + 10)
    const finished = pending.filter(id => progress[id] === 100)
    return { ...state, progress, notice: finished.length ? 'Transfer complete. Open the file or find it in C:\\Downloads.' : 'Downloading from a fictional peer…' }
  }
  if (action.type === 'search') return { ...state, query: action.query, searched: true, selected: null, notice: `${searchFiles(action.query).length} files found. Select a file to download.` }
  if (!('id' in action)) return state
  const file = files.find(file => file.id === action.id)
  if (!file) return state
  if (action.type === 'select') return { ...state, selected: action.id }
  if (action.type === 'download') return state.downloads.includes(action.id) ? { ...state, notice: isComplete(state, action.id) ? 'Already downloaded. Open it from Transfers or Downloads.' : 'This file is already downloading. Follow its progress in Transfers.' } : { ...state, selected: action.id, downloads: [...state.downloads, action.id], progress: { ...state.progress, [action.id]: 0 }, notice: 'Connecting to fictional peer…' }
  if (action.type === 'cancel' && !isComplete(state, action.id)) {
    const progress = { ...state.progress }
    delete progress[action.id]
    return { ...state, downloads: state.downloads.filter(id => id !== action.id), progress, notice: 'Transfer cancelled. You can download it again.' }
  }
  if (!state.downloads.includes(action.id)) return state
  if (!isComplete(state, action.id)) return state
  if (action.type === 'inspect') return { ...state, selected: action.id, inspected: [...new Set([...state.inspected, action.id])] }
  if (action.type === 'flag' && state.inspected.includes(action.id)) {
    return file.suspicious ? { ...state, prevented: true, notice: 'Executable disguised as audio identified. Infection prevented.' } : { ...state, notice: 'This scenario has no evidence of a disguised executable in that file. Inspect the other results.' }
  }
  return state
}
export function searchFiles(query: string) { return files.filter(file => `${file.name} ${file.type}`.toLowerCase().includes(query.trim().toLowerCase())) }
