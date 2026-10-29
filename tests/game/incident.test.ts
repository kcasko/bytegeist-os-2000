import { expect, it } from 'vitest'
import { incidentReducer as r, initialIncident as initial } from '../../src/game/engine/incidentReducer'
const ready = () => r(r(initial, { type: 'consent' }), { type: 'download' })
const infected = () => r(ready(), { type: 'execute' })
const removed = () => r(r(r(infected(), { type: 'end-process' }), { type: 'disable-startup' }), { type: 'quarantine' })
it('powering off stops symptoms while installed startup survives the next boot', () => {
  const off = r(infected(), { type: 'poweroff' })
  expect(off).toMatchObject({ processRunning: false, startupEnabled: true, stage: 'contained' })
  expect(r(off, { type: 'reboot' })).toMatchObject({ processRunning: true, startupEnabled: true, stage: 'infected' })
})
it('requires consent and downloaded file before execution', () => {
  expect(r(initial, { type: 'execute' })).toEqual(initial)
  expect(r(r(initial, { type: 'consent' }), { type: 'execute' }).everInfected).toBe(false)
  expect(infected()).toMatchObject({ stage: 'infected', processRunning: true, startupEnabled: true, everInfected: true })
})
it('ending a process contains symptoms but persistence relaunches it on reboot', () => {
  const stopped = r(infected(), { type: 'end-process' })
  expect(stopped).toMatchObject({ stage: 'contained', processRunning: false, startupEnabled: true })
  expect(r(stopped, { type: 'reboot' })).toMatchObject({ stage: 'infected', processRunning: true, rebootCount: 1 })
})
it('removing startup does not stop an already-running process', () => {
  expect(r(infected(), { type: 'disable-startup' })).toMatchObject({ processRunning: true, startupEnabled: false })
})
it('blocks quarantine while the process is running', () => {
  expect(r(infected(), { type: 'quarantine' }).quarantined).toBe(false)
  expect(r(r(infected(), { type: 'end-process' }), { type: 'quarantine' }).quarantined).toBe(true)
})
it('requires containment, persistence removal, quarantine, clean scan and later reboot', () => {
  expect(r(infected(), { type: 'scan' }).scanClean).toBe(false)
  expect(r(removed(), { type: 'reboot' }).stage).not.toBe('recovered')
  const scanned = r(removed(), { type: 'scan' })
  expect(scanned.scanClean).toBe(true)
  expect(scanned.stage).not.toBe('recovered')
  expect(r(scanned, { type: 'reboot' })).toMatchObject({ stage: 'recovered', processRunning: false, startupEnabled: false, quarantined: true })
})
it('does not award recovery on a clean system and deduplicates evidence', () => {
  expect(r(r(initial, { type: 'consent' }), { type: 'scan' }).stage).toBe('clean')
  const clue = r(infected(), { type: 'inspect', evidence: 'process' })
  expect(r(clue, { type: 'inspect', evidence: 'process' }).evidence).toEqual(['process'])
})
it('exits and resets without mutating old state', () => {
  const old = infected()
  expect(r(old, { type: 'exit' })).toEqual(initial)
  expect(r(old, { type: 'reset' })).toEqual({ ...initial, enabled: true })
  expect(old.processRunning).toBe(true)
})

it('reports disabled startup accurately when its process is already stopped', () => {
  const result = r(r(infected(), { type: 'end-process' }), { type: 'disable-startup' })
  expect(result.notice).toContain('already stopped')
  expect(result.notice).not.toContain('must still')
})
it('distinguishes restarting from powering off without losing scan verification', () => {
  const result = r(r(removed(), { type: 'scan' }), { type: 'restart' })
  expect(result.notice).toContain('restarting')
  expect(result.scanClean).toBe(true)
  expect(r(result, { type: 'reboot' }).stage).toBe('recovered')
})
