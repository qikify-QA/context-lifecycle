import { test as setup } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { authFile, loginToPortal, type PortalUser } from './portal-login';

/**
 * Setup project: login rồi ghi storageState ra playwright/.auth/<user>.json (repo root).
 * Chạy bằng `npm run portal-auth`.
 *
 * Session là cookie HttpOnly (Sanctum SPA), TTL thực tế ~15 phút → storageState cũ
 * gần như luôn hết hạn; cứ chạy lại setup, login rất nhanh.
 */
const USERS: PortalUser[] = ['owner'];

for (const user of USERS) {
  setup(`authenticate ${user}`, async ({ page }) => {
    await loginToPortal(page, user);
    const file = authFile(user);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    await page.context().storageState({ path: file });
  });
}
