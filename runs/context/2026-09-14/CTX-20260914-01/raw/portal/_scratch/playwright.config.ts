import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

// Scratch config cho portal-explorer (CTX-20260914-01, RECONCILE).
// Chỉ đọc .env của repo gốc, KHÔNG sửa playwright.config.ts hay testscript/ gốc.
// Quyền ghi của agent này giới hạn trong raw/portal/ và raw/network/ (contract §5).

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..');
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));

const PORTAL_BASE = process.env.TIB_PORTAL_BASE ?? 'https://staging-portal.teeinblue.com';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  timeout: 120_000,
  use: {
    baseURL: PORTAL_BASE,
    storageState: path.resolve(__dirname, 'auth-owner.json'),
    trace: 'off',
    ...devices['Desktop Chrome'],
  },
  outputDir: './test-results',
});
