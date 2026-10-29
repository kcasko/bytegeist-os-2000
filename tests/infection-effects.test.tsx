import { act, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { InfectionEffects } from '../src/game/effects/InfectionEffects'
afterEach(() => vi.useRealTimers())

it('escalates to three bounded warnings and returns dismissed symptoms', () => {
  vi.useFakeTimers()
  const { unmount } = render(<InfectionEffects compact={false} obscured={false} onInvestigate={() => {}} onActivity={() => {}} />)
  expect(screen.getAllByRole('dialog')).toHaveLength(1)
  act(() => vi.advanceTimersByTime(4000))
  expect(screen.getAllByRole('dialog')).toHaveLength(2)
  act(() => vi.advanceTimersByTime(4000))
  expect(screen.getAllByRole('dialog')).toHaveLength(3)
  act(() => screen.getByRole('button', { name: 'Dismiss ByteGuard 2000 warning' }).click())
  expect(screen.getAllByRole('dialog')).toHaveLength(2)
  expect(screen.getByRole('button', { name: 'Hide pop-ups' })).toHaveFocus()
  act(() => vi.advanceTimersByTime(4000))
  expect(screen.getAllByRole('dialog')).toHaveLength(3)
  act(() => vi.advanceTimersByTime(40000))
  expect(screen.getAllByRole('dialog')).toHaveLength(3)
  unmount()
  expect(vi.getTimerCount()).toBe(0)
})

it('uses compact activity instead of covering small-screen or maximized controls', () => {
  const { rerender, unmount } = render(<InfectionEffects compact obscured={false} onInvestigate={() => {}} onActivity={() => {}} />)
  expect(screen.queryAllByRole('dialog')).toHaveLength(0)
  expect(screen.getByRole('button', { name: 'View infection activity' })).toBeVisible()
  rerender(<InfectionEffects compact={false} obscured onInvestigate={() => {}} onActivity={() => {}} />)
  expect(screen.queryAllByRole('dialog')).toHaveLength(0)
  unmount()
  expect(screen.queryByRole('complementary', { name: 'Fictional malware warning' })).not.toBeInTheDocument()
})
