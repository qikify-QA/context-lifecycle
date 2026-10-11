import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { authFile } from './portal-login';

/* Nạp .env ở repo root (Node >= 20.6, không cần dotenv). Credentials portal nằm ở đây. */
process.loadEnvFile(path.resolve(__dirname, '..', '..', '.env'));

const PORTAL_BASE = process.env.TIB_PORTAL_BASE ?? 'https://staging-portal.teeinblue.com';

/**
 * Login helper cho explorer (config/products/teeinblue/explore-playbook.md mục 2).
 *   npm run portal-auth   → project `setup`, ghi playwright/.auth/owner.json
 */
export default defineConfig({
  testDir: __dirname,
  outputDir: path.resolve(__dirname, '..', '..', 'test-results'),
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: PORTAL_BASE,
    trace: 'retain-on-failure',
  },
  projects: [
    /* Login 1 lần, ghi storageState ra playwright/.auth/<user>.json. */
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: authFile('owner') },
      dependencies: ['setup'],
    },
  ],
});
