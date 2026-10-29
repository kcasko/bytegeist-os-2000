import { expect, it } from 'vitest'
import { byteWireReducer as reduce, initialByteWire as initial, searchFiles } from '../src/apps/ByteWire/model'
const start = () => reduce(initial, { type: 'begin' })
const download = () => reduce(start(), { type: 'download', id: 'song' })
it('requires consent before search or simulated downloads', () => {
  expect(reduce(initial, { type: 'download', id: 'song' })).toEqual(initial)
  expect(reduce(initial, { type: 'search', query: 'song' })).toEqual(initial)
  expect(start().consent).toBe(true)
})
it('searches fictional files case-insensitively and handles no results', () => {
  expect(searchFiles(' SONG ').map(file => file.id)).toEqual(['song'])
  expect(searchFiles('no-such-file')).toHaveLength(0)
  expect(reduce(start(), { type: 'search', query: 'song' })).toMatchObject({ query: 'song', searched: true })
})
it('keeps one transfer per file and requires download before inspection', () => {
  expect(reduce(start(), { type: 'inspect', id: 'song' }).inspected).toEqual([])
  expect(reduce(download(), { type: 'download', id: 'song' }).downloads).toEqual(['song'])
  expect(reduce(download(), { type: 'inspect', id: 'song' }).inspected).toEqual(['song'])
})
it('awards prevention only after inspecting the suspicious downloaded file', () => {
  expect(reduce(download(), { type: 'flag', id: 'song' }).prevented).toBe(false)
  const inspected = reduce(download(), { type: 'inspect', id: 'song' })
  expect(reduce(inspected, { type: 'flag', id: 'song' }).prevented).toBe(true)
  const safe = reduce(reduce(start(), { type: 'download', id: 'mix' }), { type: 'inspect', id: 'mix' })
  expect(reduce(safe, { type: 'flag', id: 'mix' }).prevented).toBe(false)
})
it('reset clears progress and exit also revokes consent', () => {
  expect(reduce(download(), { type: 'reset' })).toEqual({ ...initial, consent: true })
  expect(reduce(download(), { type: 'exit' })).toEqual(initial)
})
