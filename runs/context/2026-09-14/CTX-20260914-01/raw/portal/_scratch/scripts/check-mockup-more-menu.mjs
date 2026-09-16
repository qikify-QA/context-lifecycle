import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const RUN_ROOT = path.resolve(__dirname, '..', '..');
const SS_DIR = path.join(RUN_ROOT, 'screenshots');
fs.mkdirSync(SS_DIR, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
await page.goto('https://staging-portal.teeinblue.com/products/3245/edit', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForSelector('text=Mockup', { timeout: 20000 });
await page.waitForTimeout(1000);
// The Mockup panel "..." button next to Assign mockups (top-level, no mockup item yet since none assigned)
const moreBtn = page.locator('button', { hasText: '...' }).first();
const count = await moreBtn.count();
console.log('MORE_BTN_COUNT', count);
if (count > 0) {
  await moreBtn.click({ timeout: 3000 }).catch((e)=>console.log('click err', e.message));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SS_DIR, 'ACT-06-RC2-LOG-mockup-more-menu.png'), fullPage: true });
  const txt = await page.locator('body').innerText();
  console.log('TEXT_AFTER_MORE_CLICK_TAIL:', txt.slice(-500));
}
await browser.close();
