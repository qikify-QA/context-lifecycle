import type { Page } from '@playwright/test';
import path from 'node:path';

/**
 * Login helper cho teeinblue portal (staging). Cách login và xác minh account:
 * config/products/teeinblue/explore-playbook.md mục 2.
 *
 * Portal có 2 đường login:
 *  - `/login`            → Shopify store owner (nhập <domain>.myshopify.com, redirect qua Shopify)
 *  - `/login?staff=true` → Teeinblue account (email + password) ← dùng cho mọi account trong .env
 *
 * Credentials chỉ đọc từ .env, không bao giờ hardcode trong repo.
 */

export const PORTAL_BASE =
  process.env.TIB_PORTAL_BASE ?? 'https://staging-portal.teeinblue.com';

export type PortalUser = 'owner' | 'user-a' | 'user-b';

const CREDENTIAL_ENV: Record<PortalUser, { email: string; password: string }> = {
  owner: { email: 'TIB_STAGING_EMAIL', password: 'TIB_STAGING_PASSWORD' },
  'user-a': { email: 'TIB_USER_A_EMAIL', password: 'TIB_USER_A_PASSWORD' },
  'user-b': { email: 'TIB_USER_B_EMAIL', password: 'TIB_USER_B_PASSWORD' },
};

/** File storageState tương ứng một user, dùng cho `use: { storageState }`. */
export function authFile(user: PortalUser): string {
  return path.resolve(__dirname, '..', '..', 'playwright', '.auth', `${user}.json`);
}

export function credentials(user: PortalUser): { email: string; password: string } {
  const keys = CREDENTIAL_ENV[user];
  const email = process.env[keys.email];
  const password = process.env[keys.password];
  if (!email || !password) {
    throw new Error(`Thiếu ${keys.email} / ${keys.password} trong .env`);
  }
  return { email, password };
}

/** Login bằng Teeinblue account và chờ portal render xong. */
export async function loginToPortal(page: Page, user: PortalUser): Promise<void> {
  const { email, password } = credentials(user);

  await page.goto(`${PORTAL_BASE}/login?staff=true`);
  await page.getByRole('textbox', { name: 'Your email' }).fill(email);
  await page.getByRole('textbox', { name: 'Your password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  // Login thành công → redirect về `/` và sidebar render.
  // Sidebar có thể đang collapse (viewport hẹp) nên chỉ chờ `attached`.
  // App không còn lưu `teeinblue_token` trong localStorage kể từ ~2026-09-14
  // (session giờ qua cookie httpOnly) → verify session đã set bằng account/shop block
  // render trong sidebar thay vì đọc localStorage.
  await page.waitForURL(`${PORTAL_BASE}/`, { timeout: 30_000 });
  await page.locator('a[href="/orders"]').first().waitFor({ state: 'attached', timeout: 30_000 });
  await page.locator('a[href="/subscriptions"]').first().waitFor({
    state: 'attached',
    timeout: 30_000,
  });
}
