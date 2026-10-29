export type IncidentStage = 'clean' | 'downloaded' | 'infected' | 'contained' | 'remediating' | 'recovered'
export type Evidence = 'file' | 'process' | 'startup'
export type IncidentState = {
  enabled: boolean; stage: IncidentStage; hasFile: boolean; processRunning: boolean; startupEnabled: boolean;
  quarantined: boolean; scanClean: boolean; rebootCount: number; everInfected: boolean; evidence: Evidence[]; events: string[]; notice: string
}
export type IncidentAction = { type: 'consent' | 'exit' | 'reset' | 'download' | 'execute' | 'end-process' | 'disable-startup' | 'quarantine' | 'scan' | 'reboot' | 'poweroff' } | { type: 'inspect'; evidence: Evidence }
export const initialIncident: IncidentState = { enabled: false, stage: 'clean', hasFile: false, processRunning: false, startupEnabled: false, quarantined: false, scanClean: false, rebootCount: 0, everInfected: false, evidence: [], events: [], notice: '' }
const clean = (state: IncidentState) => !state.processRunning && !state.startupEnabled && state.quarantined
function event(state: IncidentState, patch: Partial<IncidentState>, notice: string): IncidentState {
  return { ...state, ...patch, notice, events: [...state.events, notice].slice(-60) }
}
export function incidentReducer(state: IncidentState, action: IncidentAction): IncidentState {
  if (action.type === 'exit') return initialIncident
  if (action.type === 'consent') return state.enabled ? state : { ...initialIncident, enabled: true }
  if (!state.enabled) return state
  if (action.type === 'reset') return { ...initialIncident, enabled: true }
  if (action.type === 'download') return state.hasFile ? state : event(state, { hasFile: true, stage: 'downloaded' }, 'Suspicious file added to the fictional Downloads folder.')
  if (action.type === 'inspect') return state.evidence.includes(action.evidence) ? state : event(state, { evidence: [...state.evidence, action.evidence] }, `Evidence recorded: ${action.evidence}.`)
  if (action.type === 'execute') {
    if (!state.hasFile || state.quarantined || state.processRunning || state.stage === 'recovered') return state
    return event(state, { stage: 'infected', processRunning: true, startupEnabled: true, scanClean: false, everInfected: true }, 'Fictional executable launched: songhelper.exe created a ByteWire Helper startup entry.')
  }
  if (!state.everInfected) return state
  if (action.type === 'poweroff') return event(state, { processRunning: false, stage: state.stage === 'recovered' ? 'recovered' : 'contained' }, 'Virtual computer powered off. Startup configuration and completed files remain for the next sign-in.')
  if (action.type === 'end-process') return state.processRunning ? event(state, { processRunning: false, stage: 'contained', scanClean: false }, 'songhelper.exe stopped. Symptoms are contained; startup persistence may remain.') : state
  if (action.type === 'disable-startup') return state.startupEnabled ? event(state, { startupEnabled: false, scanClean: false, stage: state.processRunning ? 'infected' : 'remediating' }, 'ByteWire Helper startup entry disabled. A running process must still be stopped.') : state
  if (action.type === 'quarantine') {
    if (state.quarantined) return state
    if (state.processRunning) return event(state, {}, 'Quarantine blocked: songhelper.exe is still running. Contain the process first.')
    return event(state, { quarantined: true, stage: 'remediating', scanClean: false }, 'this-is-a-song.mp3.exe moved to fictional quarantine.')
  }
  if (action.type === 'scan') return clean(state)
    ? event(state, { scanClean: true }, 'Clean scan: no active process, startup entry disabled, file quarantined. Reboot to verify recovery.')
    : event(state, { scanClean: false }, `Scan incomplete: ${[state.processRunning && 'active process', state.startupEnabled && 'startup persistence', !state.quarantined && 'unquarantined executable'].filter(Boolean).join(', ')}.`)
  if (action.type === 'reboot') {
    const rebootCount = state.rebootCount + 1
    if (state.startupEnabled && !state.quarantined) return event(state, { rebootCount, processRunning: true, stage: 'infected', scanClean: false }, 'Reinfection: enabled startup entry relaunched songhelper.exe during the simulated reboot.')
    if (clean(state) && state.scanClean) return event(state, { rebootCount, stage: 'recovered' }, 'Recovery verified after a clean scan and simulated reboot. Incident closed.')
    return event(state, { rebootCount, processRunning: false, stage: 'remediating', scanClean: false }, 'Simulated reboot complete. Finish removing persistence, quarantine the file, and run a clean scan before verification.')
  }
  return state
}
