import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'
import type { IncidentAction, IncidentState } from './engine/incidentReducer'
export const IncidentSession = createContext<{ state: IncidentState; dispatch: Dispatch<IncidentAction> } | null>(null)
export function useIncident() {
  const session = useContext(IncidentSession)
  if (!session) throw new Error('Incident session provider is required')
  return session
}
