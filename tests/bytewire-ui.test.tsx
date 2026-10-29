import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from '../src/App'
it('opts in, downloads a fake file, reveals the executable and prevents infection', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /Open ByteWire/ }))
  expect(screen.queryByRole('button', { name: 'Search', exact: true })).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Enter Simulation' }))
  expect(screen.getByRole('textbox', { name: 'Search files' })).toHaveFocus()
  await user.click(screen.getByRole('button', { name: 'Search', exact: true }))
  await user.click(screen.getByRole('button', { name: 'Select this-is-a-song.mp3' }))
  await user.click(screen.getByRole('button', { name: 'Download selected (simulated)' }))
  await waitFor(() => expect(screen.getByRole('button', { name: 'Properties: this-is-a-song.mp3' })).toBeEnabled(), { timeout: 4000 })
  await user.click(screen.getByRole('button', { name: 'Properties: this-is-a-song.mp3' }))
  expect(screen.getByText('this-is-a-song.mp3.exe', { exact: true })).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'Flag as suspicious' }))
  expect(screen.getByText('Not Today, LimeWire.')).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'Minimize ByteWire', exact: true }))
  await user.click(screen.getByRole('button', { name: 'Task: ByteWire', exact: true }))
  expect(screen.getByText('Not Today, LimeWire.')).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'Exit Simulation', exact: true }))
  expect(screen.getByRole('button', { name: 'Enter Simulation' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Enter Simulation' })).toHaveFocus()
  expect(within(screen.getByRole('dialog', { name: 'Welcome', exact: true })).getByText(/Welcome to my corner/)).toBeInTheDocument()
})
