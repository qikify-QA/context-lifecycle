// Stage 1: login rieng cho User B (Linh Pham, sub=2) tren linh-tib-staging.
// KHONG dung testscript/auth.setup.ts (hardcode owner). KHONG sua playwright.config.ts goc.
// Dung browser doc lap (chromium.launch + newContext moi), KHONG dung MCP playwright shared
// profile (dang bi khoa boi agent chinh dang chay tren store Linh explorer).
// storageState luu rieng ra playwright/.auth/user-b.json (khong trung owner.json/user-a.json).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..');
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));

const PORTAL_BASE = process.env.TIB_PORTAL_BASE ?? 'https://staging-portal.teeinblue.com';
const SCREENSHOT_DIR = path.resolve(import.meta.dirname, '..', 'screenshots');
const AUTH_FILE = path.resolve(REPO_ROOT, 'playwright', '.auth', 'user-b.json');

if (!process.env.TIB_USER_B_EMAIL || !process.env.TIB_USER_B_PASSWORD) {
  console.log(JSON.stringify({ blocked: true, reason: 'Missing TIB_USER_B_EMAIL/TIB_USER_B_PASSWORD in .env' }));
  process.exit(1);
}

function decode(jwt) {
  const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('utf8'));
  // Chi giu claim khong nhay cam de bao cao (khong tra ve token, khong tra ve email/name).
  return { sub: payload.sub, user_id: payload.user_id, iss: payload.iss, iat: payload.iat, exp: payload.exp, keys: Object.keys(payload) };
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const before = { screenshot: null };
await page.goto(`${PORTAL_BASE}/login?staff=true`);
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'storeb-ACT-01-STOREB-001-before.png') });

// Form co the autofill sai email (theo canh bao) -> xoa truoc khi go de.
const emailBox = page.getByRole('textbox', { name: 'Your email' });
await emailBox.fill('');
await emailBox.fill(process.env.TIB_USER_B_EMAIL);
const passBox = page.getByRole('textbox', { name: 'Your password' });
await passBox.fill('');
await passBox.fill(process.env.TIB_USER_B_PASSWORD);
await page.getByRole('button', { name: 'Log in' }).click();

let loginError = null;
try {
  await page.waitForURL(`${PORTAL_BASE}/`, { timeout: 30_000 });
  await page.waitForFunction(() => !!localStorage.getItem('teeinblue_token'), null, { timeout: 30_000 });
} catch (e) {
  loginError = e.message;
}

await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'storeb-ACT-01-STOREB-001-after.png'), fullPage: true });

let claims = null;
let bodyText = null;
if (!loginError) {
  const tokenRaw = await page.evaluate(() => localStorage.getItem('teeinblue_token'));
  try {
    const arr = JSON.parse(tokenRaw);
    const jwt = Array.isArray(arr) ? arr[0].token : arr.token;
    claims = decode(jwt);
  } catch (e) {
    claims = { decode_error: e.message };
  }
  bodyText = await page.evaluate(() => document.body.innerText.slice(0, 4000));
}

let storageStateSaved = false;
if (!loginError) {
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
  await context.storageState({ path: AUTH_FILE });
  storageStateSaved = true;
}

const storeNameMatch = bodyText ? /linh-tib-staging/i.test(bodyText) : false;
const linhPhamMatch = bodyText ? /linh pham/i.test(bodyText) : false;

console.log(JSON.stringify({
  login_error: loginError,
  current_url: page.url(),
  claims,
  storage_state_saved: storageStateSaved,
  storage_state_path: storageStateSaved ? AUTH_FILE : null,
  store_name_text_match: storeNameMatch,
  account_name_text_match: linhPhamMatch,
  body_text_excerpt: bodyText ? bodyText.slice(0, 800) : null,
}, null, 2));

await browser.close();
