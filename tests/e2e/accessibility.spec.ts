import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('desktop, Start and portfolio apps pass automated accessibility checks', async ({ page }) => {
  await page.goto('/')
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await page.getByRole('navigation', { name: 'Start menu' }).getByRole('button', { name: /System Properties/ }).click()
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
})

test('ByteWire client passes automated accessibility checks and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open ByteWire' }).click()
  await page.getByRole('button', { name: 'Enter Simulation', exact: true }).click()
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await expect(page.getByRole('button', { name: 'Exit entire simulation', exact: true })).toBeInViewport()
  await page.getByRole('button', { name: 'Exit entire simulation', exact: true }).click()
  await page.reload()
  await expect(page.getByRole('complementary', { name: 'Simulation controls' })).toHaveCount(0)
})

test.describe('touch input', () => {
  test.skip(({ browserName }) => browserName === 'firefox', 'Firefox does not support Playwright mobile emulation.')
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } })
  test('can navigate portfolio and exit simulation with touch', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Start', exact: true }).tap()
    await page.getByRole('navigation', { name: 'Start menu' }).getByRole('button', { name: /About Keith/ }).tap()
    await expect(page.getByRole('heading', { name: 'The person behind the keyboard.' })).toBeVisible()
    await page.getByRole('button', { name: 'Close About Keith', exact: true }).tap()
    await page.getByRole('button', { name: 'Open ByteWire' }).tap()
    await page.getByRole('button', { name: 'Enter Simulation', exact: true }).tap()
    await page.getByRole('button', { name: 'Exit entire simulation', exact: true }).tap()
    await expect(page.getByRole('button', { name: 'Enter Simulation', exact: true })).toBeVisible()
  })
})
