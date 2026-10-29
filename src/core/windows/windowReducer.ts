export type AppId = 'welcome' | 'projects' | 'about' | 'skills' | 'bytewire'
export type Bounds = { width: number; height: number }
export type DesktopWindow = { id: AppId; x: number; y: number; minimized: boolean; maximized: boolean }
export type WindowState = { windows: DesktopWindow[]; active: AppId | null }
export type WindowAction =
  | { type: 'open'; id: AppId; bounds: Bounds }
  | { type: 'focus' | 'minimize' | 'close' | 'maximize'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number; bounds: Bounds }
  | { type: 'resize'; bounds: Bounds }
export const initialState: WindowState = { windows: [], active: null }
function clamp(w: DesktopWindow, bounds: Bounds): DesktopWindow {
  const windowHeight = Math.min(540, Math.max(0, bounds.height - 8))
  return { ...w, x: Math.max(0, Math.min(w.x, bounds.width - Math.min(640, bounds.width))), y: Math.max(0, Math.min(w.y, bounds.height - windowHeight)) }
}
export function windowReducer(state: WindowState, action: WindowAction): WindowState {
  if (action.type === 'resize') return { ...state, windows: state.windows.map(w => clamp(w, action.bounds)) }
  const current = state.windows.find(w => w.id === action.id)
  if (action.type === 'open') {
    const next = current ? { ...current, minimized: false } : clamp({ id: action.id, x: 180 + state.windows.length * 28, y: 56 + state.windows.length * 28, minimized: false, maximized: false }, action.bounds)
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
  const active = windows.some(w => w.id === state.active && !w.minimized) ? state.active : [...windows].reverse().find(w => !w.minimized)?.id ?? null
  return { windows, active }
}
