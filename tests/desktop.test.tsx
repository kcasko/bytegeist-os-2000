import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from '../src/App'

it('opens apps from Start, dismisses navigation with Escape and returns focus', async () => {
  const user = userEvent.setup()
  render(<App />)
  const start = screen.getByRole('button', { name: 'Start', exact: true })
  await user.click(start)
  await user.click(within(screen.getByRole('navigation', { name: 'Start menu' })).getByRole('button', { name: /About Keith/ }))
  expect(screen.getByRole('dialog', { name: 'About Keith' })).toBeVisible()
  expect(screen.queryByRole('navigation', { name: 'Start menu' })).not.toBeInTheDocument()
  await user.click(start)
  await user.keyboard('{Escape}')
  expect(start).toHaveFocus()
  expect(screen.queryByRole('navigation', { name: 'Start menu' })).not.toBeInTheDocument()
})

it('minimizes, restores and closes a window using accessible controls', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: 'Minimize Welcome' }))
  expect(screen.queryByRole('dialog', { name: 'Welcome' })).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Task: Welcome' }))
  expect(screen.getByRole('dialog', { name: 'Welcome' })).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'Close Welcome' }))
  expect(screen.queryByRole('button', { name: 'Task: Welcome' })).not.toBeInTheDocument()
})
