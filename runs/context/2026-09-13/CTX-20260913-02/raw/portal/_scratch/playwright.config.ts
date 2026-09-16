import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

// Scratch config cho portal-explorer (CTX-20260913-02). CHỈ đọc (import) từ
// testscript/portal-login.ts của repo gốc, KHÔNG sửa file đó hay playwright.config.ts gốc.
// Quyền ghi của agent này giới hạn trong raw/portal/ và raw/network/ (contract §5).

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..');
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));

import { authFile } from '../../../../../../../testscript/portal-login';

const PORTAL_BASE = process.env.TIB_PORTAL_BASE ?? 'https://staging-portal.teeinblue.com';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  timeout: 60_000,
  use: {
    baseURL: PORTAL_BASE,
    storageState: authFile('owner'),
    trace: 'off',
    ...devices['Desktop Chrome'],
  },
  outputDir: './test-results',
});
