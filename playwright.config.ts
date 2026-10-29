import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 6,
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  use: { baseURL: process.env.BYTEGEIST_TEST_URL ?? 'http://127.0.0.1:4173', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: process.env.BYTEGEIST_TEST_URL ? undefined : { command: 'npm run dev -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI },
})
