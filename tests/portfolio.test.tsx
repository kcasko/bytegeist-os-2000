import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from '../src/App'
it('offers complete project case studies and direct evidence links', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /Explore My Projects/ }))
  const projects = screen.getByRole('dialog', { name: 'My Projects', exact: true })
  expect(within(projects).getByText('AI teaches. Code grades.', { exact: true })).toBeInTheDocument()
  expect(within(projects).getByText(/Cognito subject/)).toBeInTheDocument()
})
it('makes education, credentials and contact directly available', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(within(screen.getByRole('navigation', { name: 'Desktop applications' })).getByRole('button', { name: 'System Properties' }))
  expect(screen.getByRole('link', { name: /AWS Certified Cloud Practitioner/ })).toHaveAttribute('href', expect.stringContaining('credly.com'))
  expect(screen.getByRole('link', { name: /Google IT Support/ })).toBeVisible()
})

it('labels all required sections and the optional creative feature on Welcome', async () => {
  const user = userEvent.setup()
  render(<App />)
  const welcome = screen.getByRole('dialog', { name: 'Welcome', exact: true })
  const sections = within(welcome).getByRole('navigation', { name: 'Portfolio sections' })
  expect(within(sections).getByRole('button', { name: 'About Me', exact: true })).toBeVisible()
  expect(within(sections).getByRole('button', { name: 'Projects', exact: true })).toBeVisible()
  expect(within(welcome).getByText(/optional malware recovery game/)).toBeVisible()
  await user.click(within(sections).getByRole('button', { name: 'Skills', exact: true }))
  expect(screen.getByRole('dialog', { name: 'System Properties', exact: true })).toBeVisible()
})
