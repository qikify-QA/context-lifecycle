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
const allResp = [];
page.on('response', (res) => { const u=res.url(); if (u.includes('/api/products/')) allResp.push(`${res.request().method()} ${res.status()} ${u}`); });
page.on('dialog', async (d) => { console.log('DIALOG', d.type(), d.message()); await d.accept(); });

await page.goto('https://staging-portal.teeinblue.com/products?search=QA-TEST-mockup-resize-20260914', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
const row = page.locator('tr', { hasText: 'QA-TEST-mockup-resize-20260914' }).first();
const actionBtn = row.locator('button, [role="button"], i, svg').last();
await actionBtn.click({ timeout: 5000 });
await page.waitForTimeout(500);
await page.locator('button', { hasText: 'Mark as archive' }).first().click({ timeout: 5000 });
await page.waitForTimeout(1500);
console.log('AFTER_ARCHIVE_RESP', allResp);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-009-after-archive.png'), fullPage: true });
const bt1 = await page.locator('body').innerText();
console.log('STILL_IN_ACTIVE_LIST?', bt1.includes('QA-TEST-mockup-resize-20260914'));

// Go to Archived tab
await page.getByRole('link', { name: 'Archived' }).click({ timeout: 5000 }).catch(async ()=>{ await page.getByText('Archived', {exact:true}).click({timeout:5000}); });
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-010-archived-tab.png'), fullPage: true });
const bt2 = await page.locator('body').innerText();
console.log('IN_ARCHIVED_LIST?', bt2.includes('QA-TEST-mockup-resize-20260914'));

if (bt2.includes('QA-TEST-mockup-resize-20260914')) {
  const row2 = page.locator('tr', { hasText: 'QA-TEST-mockup-resize-20260914' }).first();
  const actionBtn2 = row2.locator('button, [role="button"], i, svg').last();
  await actionBtn2.click({ timeout: 5000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-011-archived-menu-open.png'), fullPage: true });
  const delBtn = page.locator('button[title="Delete product"]:visible').first();
  const delVisible = await delBtn.count();
  console.log('DELETE_BTN_IN_ARCHIVED_MENU_COUNT', delVisible);
  if (delVisible > 0) {
    await delBtn.click({ timeout: 5000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-012-after-delete-archived.png'), fullPage: true });
    console.log('AFTER_DELETE_ARCHIVED_RESP', allResp);
  }
}
await browser.close();
