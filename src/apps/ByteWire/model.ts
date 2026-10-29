export type FileId = 'song' | 'mix' | 'readme'
export const files = [
  { id: 'song', name: 'this-is-a-song.mp3', fullName: 'this-is-a-song.mp3.exe', type: 'Application (.exe)', size: '248 KB', peer: 'totally_legit_2000', suspicious: true },
  { id: 'mix', name: 'dial-up-daydream.mp3', fullName: 'dial-up-daydream.mp3', type: 'MP3 audio (.mp3)', size: '3.8 MB', peer: 'modem_poet', suspicious: false },
  { id: 'readme', name: 'bytewire-readme.txt', fullName: 'bytewire-readme.txt', type: 'Text document (.txt)', size: '4 KB', peer: 'bytegeist_archive', suspicious: false },
] as const
export type ByteWireState = { consent: boolean; query: string; searched: boolean; selected: FileId | null; downloads: FileId[]; inspected: FileId[]; prevented: boolean; notice: string }
export const initialByteWire: ByteWireState = { consent: false, query: '', searched: false, selected: null, downloads: [], inspected: [], prevented: false, notice: '' }
export type ByteWireAction = { type: 'begin' | 'exit' | 'reset' } | { type: 'search'; query: string } | { type: 'select' | 'download' | 'inspect' | 'flag'; id: FileId }
export function byteWireReducer(state: ByteWireState, action: ByteWireAction): ByteWireState {
  if (action.type === 'exit') return initialByteWire
  if (action.type === 'begin') return state.consent ? state : { ...initialByteWire, consent: true }
  if (!state.consent) return state
  if (action.type === 'reset') return { ...initialByteWire, consent: true }
  if (action.type === 'search') return { ...state, query: action.query, searched: true, selected: null, notice: '' }
  if (!('id' in action)) return state
  const file = files.find(file => file.id === action.id)
  if (!file) return state
  if (action.type === 'select') return { ...state, selected: action.id }
  if (action.type === 'download') return { ...state, selected: action.id, downloads: [...new Set([...state.downloads, action.id])], notice: 'Simulated transfer complete. Inspect Properties before trusting a file.' }
  if (!state.downloads.includes(action.id)) return state
  if (action.type === 'inspect') return { ...state, selected: action.id, inspected: [...new Set([...state.inspected, action.id])] }
  if (action.type === 'flag' && state.inspected.includes(action.id)) {
    return file.suspicious ? { ...state, prevented: true, notice: 'Executable disguised as audio identified. Infection prevented.' } : { ...state, notice: 'This scenario has no evidence of a disguised executable in that file. Inspect the other results.' }
  }
  return state
}
export function searchFiles(query: string) { return files.filter(file => `${file.name} ${file.type}`.toLowerCase().includes(query.trim().toLowerCase())) }
