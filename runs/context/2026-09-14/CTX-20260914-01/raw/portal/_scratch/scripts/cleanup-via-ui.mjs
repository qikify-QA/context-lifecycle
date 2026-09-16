import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const RUN_ROOT = path.resolve(__dirname, '..', '..');
const SS_DIR = path.join(RUN_ROOT, 'screenshots');

const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();

const results = {};
page.on('response', (res) => {
  const u = res.url();
  if (u.includes('/api/products/3245') && res.request().method() === 'DELETE') {
    results.delete_call = { url: u, status: res.status() };
  }
});

await page.goto('https://staging-portal.teeinblue.com/products?search=QA-TEST-mockup-resize-20260914', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-000-products-list.png'), fullPage: true });
const bodyText = await page.locator('body').innerText();
console.log('LIST_BODY_HAS_PRODUCT:', bodyText.includes('QA-TEST-mockup-resize-20260914'));

// Find the row's action menu (usually a "..." or kebab icon in the row)
const row = page.locator('tr', { hasText: 'QA-TEST-mockup-resize-20260914' }).first();
const rowCount = await row.count();
console.log('ROW_COUNT', rowCount);
if (rowCount > 0) {
  const actionBtn = row.locator('button, [role="button"], i, svg').last();
  await actionBtn.click({ timeout: 5000 }).catch((e) => console.log('action btn click err', e.message));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-001-row-menu.png'), fullPage: true });
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
