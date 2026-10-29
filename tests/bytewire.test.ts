import { expect, it } from 'vitest'
import { byteWireReducer as reduce, initialByteWire as initial, searchFiles } from '../src/apps/ByteWire/model'
const start = () => reduce(initial, { type: 'begin' })
const queue = () => reduce(start(), { type: 'download', id: 'song' })
const finish = (state: ReturnType<typeof queue>) => Array.from({ length: 10 }).reduce<typeof state>(value => reduce(value, { type: 'tick' }), state)
const download = () => finish(queue())
it('progresses a transfer before exposing a completed downloadable file', () => {
  const queued = queue()
  expect(queued.progress.song).toBe(0)
  expect(reduce(queued, { type: 'inspect', id: 'song' }).inspected).toEqual([])
  const halfway = Array.from({ length: 5 }).reduce<typeof queued>(value => reduce(value, { type: 'tick' }), queued)
  expect(halfway.progress.song).toBe(50)
  const complete = finish(halfway)
  expect(complete.progress.song).toBe(100)
  expect(reduce(complete, { type: 'tick' }).progress.song).toBe(100)
})
it('cancels an incomplete transfer and can queue it again', () => {
  const cancelled = reduce(queue(), { type: 'cancel', id: 'song' })
  expect(cancelled.downloads).toEqual([])
  expect(cancelled.progress.song).toBeUndefined()
  expect(reduce(cancelled, { type: 'download', id: 'song' }).progress.song).toBe(0)
})
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
  const safe = reduce(finish(reduce(start(), { type: 'download', id: 'mix' })), { type: 'inspect', id: 'mix' })
  expect(reduce(safe, { type: 'flag', id: 'mix' }).prevented).toBe(false)
})
it('reset clears progress and exit also revokes consent', () => {
  expect(reduce(download(), { type: 'reset' })).toEqual({ ...initial, consent: true })
  expect(reduce(download(), { type: 'exit' })).toEqual(initial)
})

it('explains duplicate downloads and search outcomes instead of silently doing nothing', () => {
  expect(reduce(download(), { type: 'download', id: 'song' }).notice).toContain('Already downloaded')
  expect(reduce(queue(), { type: 'download', id: 'song' }).notice).toContain('already downloading')
  expect(reduce(start(), { type: 'search', query: 'nonsense' }).notice).toContain('0 files found')
})
