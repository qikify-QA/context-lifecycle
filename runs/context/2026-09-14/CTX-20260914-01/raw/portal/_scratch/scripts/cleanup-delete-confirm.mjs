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
  if (u.includes('/api/products/3245') ) {
    results[`${res.request().method()}_${u}`] = res.status();
  }
});

await page.goto('https://staging-portal.teeinblue.com/products?search=QA-TEST-mockup-resize-20260914', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
const row = page.locator('tr', { hasText: 'QA-TEST-mockup-resize-20260914' }).first();
const actionBtn = row.locator('button, [role="button"], i, svg').last();
await actionBtn.click({ timeout: 5000 });
await page.waitForTimeout(500);
const deleteOpt = page.getByText('Delete product', { exact: true }).first();
await deleteOpt.click({ timeout: 5000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-002-delete-confirm-dialog.png'), fullPage: true });
const bodyText = await page.locator('body').innerText();
console.log('AFTER_DELETE_CLICK_TEXT_SNIPPET:', bodyText.match(/.{0,50}(delete|confirm|sure).{0,50}/gi));

// try to confirm the dialog (common patterns: "Yes", "Confirm", "Delete")
const confirmBtn = page.getByRole('button', { name: /^(yes|confirm|delete|ok)$/i }).first();
const confirmCount = await confirmBtn.count();
console.log('CONFIRM_BTN_COUNT', confirmCount);
if (confirmCount > 0) {
  await confirmBtn.click({ timeout: 5000 }).catch((e)=>console.log('confirm click err', e.message));
  await page.waitForTimeout(2000);
}
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-003-after-confirm.png'), fullPage: true });
console.log('RESULTS', JSON.stringify(results, null, 2));
await browser.close();
