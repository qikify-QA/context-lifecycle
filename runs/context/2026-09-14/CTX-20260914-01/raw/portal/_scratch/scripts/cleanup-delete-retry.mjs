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
  if (u.includes('/products/3245')) results[`${res.request().method()}_${u}`] = res.status();
});
page.on('dialog', async (d) => { console.log('DIALOG', d.type(), d.message()); await d.accept(); });

await page.goto('https://staging-portal.teeinblue.com/products?search=QA-TEST-mockup-resize-20260914', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
const row = page.locator('tr', { hasText: 'QA-TEST-mockup-resize-20260914' }).first();
const actionBtn = row.locator('button, [role="button"], i, svg').last();
await actionBtn.click({ timeout: 5000 });
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-004-menu-open.png') });
const deleteOpt = page.getByText('Delete product', { exact: true }).first();
console.log('deleteOpt visible?', await deleteOpt.isVisible().catch(()=>false));
await deleteOpt.click({ timeout: 5000, force: true });
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-005-after-delete-click.png'), fullPage: true });
const bt = await page.locator('body').innerText();
console.log('BODY_SNIPPET', bt.slice(0, 1500));
console.log('RESULTS', JSON.stringify(results, null, 2));
await browser.close();
