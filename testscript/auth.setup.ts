import { test as setup } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { authFile, loginToPortal, type PortalUser } from './portal-login';

/**
 * Setup project: login rồi ghi storageState ra playwright/.auth/<user>.json.
 * Chạy trước mọi test của project `chromium` (xem playwright.config.ts).
 *
 * Lưu ý: `teeinblue_token` trong localStorage là JWT TTL ~15 phút, app tự refresh
 * khi tab còn mở. storageState cũ hơn 15 phút thường đã hết hạn → cứ chạy lại setup,
 * login rất nhanh.
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
