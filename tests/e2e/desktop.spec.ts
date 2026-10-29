import { test, expect } from '@playwright/test'

test('moves, maximizes, restores, stacks and closes windows', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const panel = page.getByRole('dialog', { name: 'Welcome', exact: true })
  const handle = page.getByRole('button', { name: 'Move Welcome', exact: true })
  const before = await panel.boundingBox()
  const bar = (await handle.boundingBox())!
  await page.mouse.move(bar.x + 80, bar.y + 12)
  await page.mouse.down()
  await page.mouse.move(bar.x + 200, bar.y + 82, { steps: 8 })
  await page.mouse.up()
  await expect.poll(async () => (await panel.boundingBox())!.x).toBe(before!.x + 120)
  await handle.focus()
  await page.keyboard.press('ArrowRight')
  await expect.poll(async () => (await panel.boundingBox())!.x).toBe(before!.x + 136)
  await page.getByRole('button', { name: 'Maximize Welcome', exact: true }).click()
  await expect.poll(async () => (await panel.boundingBox())!.width).toBe(1440)
  await page.getByRole('button', { name: 'Restore Welcome', exact: true }).click()
  await expect.poll(async () => (await panel.boundingBox())!.x).toBe(before!.x + 136)
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  await page.getByRole('navigation', { name: 'Start menu' }).getByRole('button', { name: /About Keith/ }).click()
  const about = page.getByRole('dialog', { name: 'About Keith' })
  await expect(about).toBeVisible()
  await page.getByRole('button', { name: 'Task: Welcome', exact: true }).click()
  await expect(panel).toHaveCSS('z-index', '2')
  await page.getByRole('button', { name: 'Minimize Welcome', exact: true }).click()
  await expect(panel).toHaveCount(0)
  await expect(about).toBeFocused()
  await page.getByRole('button', { name: 'Task: Welcome', exact: true }).click()
  await expect(panel).toBeVisible()
  await page.getByRole('button', { name: 'Close Welcome', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Task: Welcome', exact: true })).toHaveCount(0)
  expect(errors).toEqual([])
})

test('Start supports keyboard navigation, Escape and outside dismissal', async ({ page }) => {
  await page.goto('/')
  const start = page.getByRole('button', { name: 'Start', exact: true })
  await start.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog', { name: 'My Projects' })).toBeVisible()
  await start.click()
  await page.keyboard.press('Escape')
  await expect(start).toBeFocused()
  await start.click()
  await page.getByRole('button', { name: 'Task: My Projects', exact: true }).click()
  await expect(page.getByRole('navigation', { name: 'Start menu' })).toHaveCount(0)
})

for (const width of [320, 375, 390, 768, 1440]) {
  test(`portfolio controls stay in bounds at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 780 })
    await page.goto('/')
    const panel = page.getByRole('dialog', { name: 'Welcome', exact: true })
    const box = (await panel.boundingBox())!
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(width)
    await expect(page.getByRole('button', { name: 'Close Welcome', exact: true })).toBeInViewport()
    await page.getByRole('button', { name: 'Open ByteWire' }).click()
    await expect(page.getByRole('button', { name: 'Enter Simulation', exact: true })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
  })
}

test('viewport resize keeps windows reachable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Move Welcome', exact: true }).focus()
  for (let i = 0; i < 12; i++) await page.keyboard.press('Shift+ArrowRight')
  await page.setViewportSize({ width: 768, height: 600 })
  await expect.poll(async () => (await page.getByRole('dialog', { name: 'Welcome', exact: true }).boundingBox())!.x).toBeLessThanOrEqual(128)
})

test('initial window stays above taskbar on short screens', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 600 })
  await page.goto('/')
  const box = (await page.getByRole('dialog', { name: 'Welcome', exact: true }).boundingBox())!
  expect(box.y + box.height).toBeLessThanOrEqual(556)
})

test('relaunching the active app from Start restores keyboard focus', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog', { name: 'Welcome', exact: true })).toBeFocused()
})
