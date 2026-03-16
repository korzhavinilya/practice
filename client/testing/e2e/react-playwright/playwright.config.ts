import { defineConfig } from '@playwright/test';

export default defineConfig({
  //   testMatch: ['tests/login.test.ts'],
  testDir: 'tests',
  //   snapshotDir: 'tests/screenshots',
  //   outputDir: 'tests/test-results',

  use: {
    headless: false
  }
});
