import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  reporter: 'html',
  
  webServer: {
    command: 'npm run storybook',
    url: 'http://127.0.0.1:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  use: {
    baseURL: 'http://127.0.0.1:6006',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'visual',
      testMatch: '**/*.visual.spec.ts', 
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:6006' },
    },
  ],
});