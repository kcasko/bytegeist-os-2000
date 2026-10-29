export type AppId = 'welcome' | 'projects' | 'about' | 'skills' | 'bytewire' | 'downloads' | 'taskmanager' | 'startup' | 'defender' | 'events' | 'report' | 'infection' | 'run' | 'notepad' | 'display'
export type Bounds = { width: number; height: number }
export type DesktopWindow = { id: AppId; x: number; y: number; width: number; height: number; preferredWidth?: number; preferredHeight?: number; order: number; minimized: boolean; maximized: boolean }
export type WindowState = { windows: DesktopWindow[]; active: AppId | null }
export type WindowAction =
  | { type: 'reset' }
  | { type: 'minimize-all' }
  | { type: 'cycle' }
  | { type: 'open'; id: AppId; bounds: Bounds }
  | { type: 'focus' | 'minimize' | 'close' | 'maximize'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number; bounds: Bounds }
  | { type: 'resize'; bounds: Bounds }
  | { type: 'resize-window'; id: AppId; x: number; y: number; width: number; height: number; bounds: Bounds }
export const initialState: WindowState = { windows: [], active: null }
function clamp(w: DesktopWindow, bounds: Bounds): DesktopWindow {
  const preferredWidth = w.preferredWidth ?? w.width
  const preferredHeight = w.preferredHeight ?? w.height
  const width = Math.min(Math.max(320, preferredWidth), bounds.width)
  const height = Math.min(Math.max(240, preferredHeight), Math.max(0, bounds.height - 8))
  return { ...w, preferredWidth, preferredHeight, width, height, x: Math.max(0, Math.min(w.x, bounds.width - width)), y: Math.max(0, Math.min(w.y, bounds.height - height)) }
}
export function windowReducer(state: WindowState, action: WindowAction): WindowState {
  if (action.type === 'reset') return initialState
  if (action.type === 'minimize-all') return { windows: state.windows.map(w => ({ ...w, minimized: true })), active: null }
  if (action.type === 'cycle') {
    const next = state.windows.find(w => !w.minimized && w.id !== state.active)
    return next ? windowReducer(state, { type: 'focus', id: next.id }) : state
  }
  if (action.type === 'resize') return { ...state, windows: state.windows.map(w => clamp(w, action.bounds)) }
  const current = state.windows.find(w => w.id === action.id)
  if (action.type === 'open') {
    const order = Math.max(-1, ...state.windows.map(w => w.order)) + 1
    const next = current ? { ...current, minimized: false } : clamp({ id: action.id, x: 180 + state.windows.length * 28, y: 56 + state.windows.length * 28, width: action.id === 'run' ? 440 : 640, height: action.id === 'run' ? 300 : 540, order, minimized: false, maximized: false }, action.bounds)
    return { windows: [...state.windows.filter(w => w.id !== action.id), next], active: action.id }
  }
  if (!current) return state
  if (action.type === 'focus') {
    if (current.minimized) return state
    return { windows: [...state.windows.filter(w => w.id !== action.id), current], active: action.id }
  }
  let windows = state.windows
  if (action.type === 'close') windows = windows.filter(w => w.id !== action.id)
  if (action.type === 'minimize') windows = windows.map(w => w.id === action.id ? { ...w, minimized: true } : w)
  if (action.type === 'maximize') windows = windows.map(w => w.id === action.id ? { ...w, maximized: !w.maximized } : w)
  if (action.type === 'move' && !current.maximized) windows = windows.map(w => w.id === action.id ? clamp({ ...w, x: action.x, y: action.y }, action.bounds) : w)
  if (action.type === 'resize-window' && !current.maximized) windows = windows.map(w => w.id === action.id ? clamp({ ...w, x: action.x, y: action.y, preferredWidth: action.width, preferredHeight: action.height }, action.bounds) : w)
  const active = windows.some(w => w.id === state.active && !w.minimized) ? state.active : [...windows].reverse().find(w => !w.minimized)?.id ?? null
  return { windows, active }
}
