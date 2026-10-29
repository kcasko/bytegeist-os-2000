import { describe, expect, it } from 'vitest'
import { initialState, windowReducer as reduce } from '../../src/core/windows/windowReducer'
const bounds = { width: 1200, height: 760 }
const welcome = () => reduce(initialState, { type: 'open', id: 'welcome', bounds })
const pair = () => reduce(welcome(), { type: 'open', id: 'about', bounds })

describe('desktop window lifecycle', () => {
  it('resizes within minimums and viewport bounds without losing restore geometry', () => {
    const resized = reduce(welcome(), { type: 'resize-window', id: 'welcome', x: 100, y: 50, width: 720, height: 580, bounds })
    expect(resized.windows[0]).toMatchObject({ x: 100, y: 50, width: 720, height: 580 })
    const max = reduce(resized, { type: 'maximize', id: 'welcome' })
    expect(reduce(max, { type: 'maximize', id: 'welcome' }).windows[0]).toEqual(resized.windows[0])
    expect(reduce(resized, { type: 'resize-window', id: 'welcome', x: -10, y: -10, width: 10, height: 10, bounds }).windows[0]).toMatchObject({ x: 0, y: 0, width: 320, height: 240 })
  })
  it('keeps launch order stable when focus changes and cycles only visible windows', () => {
    const old = pair()
    const next = reduce(old, { type: 'focus', id: 'welcome' })
    expect(next.windows.find(w => w.id === 'welcome')?.order).toBe(old.windows[0].order)
    expect(old.windows[0].order).toBeLessThan(old.windows[1].order)
    expect(reduce(next, { type: 'cycle' }).active).toBe('about')
    const minimized = reduce(next, { type: 'minimize', id: 'about' })
    expect(reduce(minimized, { type: 'cycle' }).active).toBe('welcome')
  })
  it('minimizes all windows and resets the virtual desktop', () => {
    const hidden = reduce(pair(), { type: 'minimize-all' })
    expect(hidden.active).toBeNull()
    expect(hidden.windows.every(w => w.minimized)).toBe(true)
    expect(reduce(pair(), { type: 'reset' })).toEqual(initialState)
  })
  it('opens a single instance and restores it after minimizing', () => {
    const minimized = reduce(welcome(), { type: 'minimize', id: 'welcome' })
    const restored = reduce(minimized, { type: 'open', id: 'welcome', bounds })
    expect(restored.windows).toHaveLength(1)
    expect(restored.windows[0].minimized).toBe(false)
    expect(restored.active).toBe('welcome')
  })
  it('focuses and raises windows without mutating previous state', () => {
    const old = pair()
    const next = reduce(old, { type: 'focus', id: 'welcome' })
    expect(next.windows.at(-1)?.id).toBe('welcome')
    expect(next.active).toBe('welcome')
    expect(old.windows.at(-1)?.id).toBe('about')
  })
  it('minimizes the active window and activates the next visible window', () => {
    const next = reduce(pair(), { type: 'minimize', id: 'about' })
    expect(next.active).toBe('welcome')
    expect(next.windows.find(w => w.id === 'about')?.minimized).toBe(true)
  })
  it('closes windows and clears active state when none remain', () => {
    const next = reduce(pair(), { type: 'close', id: 'about' })
    expect(next.windows).toHaveLength(1)
    expect(next.active).toBe('welcome')
    expect(reduce(next, { type: 'close', id: 'welcome' })).toEqual(initialState)
  })
  it('toggles maximize while preserving the restore position', () => {
    const old = welcome()
    const max = reduce(old, { type: 'maximize', id: 'welcome' })
    expect(max.windows[0].maximized).toBe(true)
    expect(reduce(max, { type: 'maximize', id: 'welcome' }).windows[0]).toEqual(old.windows[0])
  })
  it('clamps movement and viewport shrink to reachable positions', () => {
    const moved = reduce(welcome(), { type: 'move', id: 'welcome', x: 9999, y: -90, bounds })
    expect(moved.windows[0].x).toBe(560)
    expect(moved.windows[0].y).toBe(0)
    const small = reduce(moved, { type: 'resize', bounds: { width: 320, height: 420 } })
    expect(small.windows[0].x).toBe(0)
  })
  it('ignores actions for missing windows', () => {
    expect(reduce(initialState, { type: 'focus', id: 'about' })).toEqual(initialState)
  })
})
