import { test, expect } from '@playwright/test'

for (const width of [320, 390, 768, 1440]) {
  test(`ByteWire prevention and reset work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 840 })
    let downloads = 0
    page.on('download', () => downloads++)
    await page.goto('/')
    await page.getByRole('button', { name: 'Open ByteWire' }).click()
    await expect(page.getByRole('button', { name: 'Search', exact: true })).toHaveCount(0)
    await page.getByRole('button', { name: 'Enter Simulation', exact: true }).click()
    await page.getByLabel('Search files').fill('missing song 999')
    await page.getByRole('button', { name: 'Search', exact: true }).click()
    await expect(page.getByText('No results. Try “song” or leave the search blank.')).toBeVisible()
    await page.getByLabel('Search files').fill('song')
    await page.getByRole('button', { name: 'Search', exact: true }).click()
    await page.getByRole('button', { name: 'Select this-is-a-song.mp3', exact: true }).click()
    await page.getByRole('button', { name: 'Download selected (simulated)', exact: true }).click()
    await page.getByRole('button', { name: 'Properties: this-is-a-song.mp3', exact: true }).click()
    await expect(page.getByText('this-is-a-song.mp3.exe', { exact: true })).toBeVisible()
    await expect(page.getByText('Application (.exe)', { exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Flag as suspicious', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Not Today, LimeWire.' })).toBeVisible()
    // Exit stays visible even after the client content has scrolled.
    await expect(page.getByRole('button', { name: 'Exit Simulation', exact: true })).toBeInViewport()
    await page.getByRole('button', { name: 'Close ByteWire', exact: true }).click()
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await page.getByRole('navigation', { name: 'Start menu' }).getByRole('button', { name: /^ByteWire/ }).click()
    await expect(page.getByRole('heading', { name: 'Not Today, LimeWire.' })).toBeVisible()
    await page.getByRole('button', { name: 'Reset Simulation', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Not Today, LimeWire.' })).toHaveCount(0)
    await expect(page.getByText('No transfers yet. Nothing will be saved to your device.')).toBeVisible()
    await page.getByRole('button', { name: 'Exit Simulation', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Enter Simulation', exact: true })).toBeVisible()
    expect(downloads).toBe(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
  })
}
