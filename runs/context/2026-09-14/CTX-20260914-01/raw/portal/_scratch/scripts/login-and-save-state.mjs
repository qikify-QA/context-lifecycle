// Login owner account riêng cho scratch cua run nay, luu storageState vao
// raw/portal/_scratch/auth-owner.json. Doc lap voi testscript/ goc de tranh
// dung storageState da het han (TTL 15p) va tranh dung chung profile MCP.
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..', '..');
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));

const PORTAL_BASE = process.env.TIB_PORTAL_BASE ?? 'https://staging-portal.teeinblue.com';
const EMAIL = process.env.TIB_STAGING_EMAIL;
const PASSWORD = process.env.TIB_STAGING_PASSWORD;
if (!EMAIL || !PASSWORD) throw new Error('Thieu TIB_STAGING_EMAIL/PASSWORD trong .env');

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

await page.goto(`${PORTAL_BASE}/login?staff=true`);
await page.getByRole('textbox', { name: 'Your email' }).fill(EMAIL);
await page.getByRole('textbox', { name: 'Your password' }).fill(PASSWORD);
await page.getByRole('button', { name: 'Log in' }).click();
await page.waitForURL(`${PORTAL_BASE}/`, { timeout: 30_000 });
await page.locator('a[href="/orders"]').first().waitFor({ state: 'attached', timeout: 30_000 });

// LUU Y MOI TRUONG (2026-09-14): khong con thay localStorage.teeinblue_token (JWT) nhu
// documented trong knowledge/portal-login.md. Debug xac nhan localStorage chi con
// {IANA_TIMEZONE}; session that su nam o cookie __Secure-teeinblue_staging_session +
// XSRF-TOKEN. Vi vay xac nhan account bang sidebar text (UI) thay cho decode JWT sub=273.
await page.waitForTimeout(1500);
const bodyText = await page.locator('body').innerText();
if (!bodyText.includes('Linh explorer') || !bodyText.includes('linh-explorer.myshopify.com')) {
  throw new Error('Sidebar KHONG hien dung "Linh explorer / linh-explorer.myshopify.com" - SAI ACCOUNT, DUNG NGAY');
}
const cookies = await context.cookies();
const hasSessionCookie = cookies.some((c) => c.name === '__Secure-teeinblue_staging_session');
if (!hasSessionCookie) {
  throw new Error('Khong thay session cookie __Secure-teeinblue_staging_session sau login');
}
console.log('LOGIN_CHECK', JSON.stringify({ verified_by: 'sidebar_text+session_cookie', account: 'Linh explorer', store: 'linh-explorer.myshopify.com' }));

const outFile = path.resolve(__dirname, '..', 'auth-owner.json');
await context.storageState({ path: outFile });
console.log('SAVED', outFile);

await browser.close();
