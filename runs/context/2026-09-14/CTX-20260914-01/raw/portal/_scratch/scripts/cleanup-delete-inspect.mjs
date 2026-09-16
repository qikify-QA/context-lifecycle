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
page.on('response', (res) => allResp.push(`${res.request().method()} ${res.status()} ${res.url()}`));
page.on('dialog', async (d) => { console.log('DIALOG', d.type(), d.message()); await d.accept(); });

await page.goto('https://staging-portal.teeinblue.com/products?search=QA-TEST-mockup-resize-20260914', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
const row = page.locator('tr', { hasText: 'QA-TEST-mockup-resize-20260914' }).first();
const actionBtn = row.locator('button, [role="button"], i, svg').last();
await actionBtn.click({ timeout: 5000 });
await page.waitForTimeout(600);

// Inspect the dropdown menu HTML structure
const menuHtml = await page.evaluate(() => {
  const items = Array.from(document.querySelectorAll('*')).filter(el => el.textContent?.trim() === 'Delete product');
  return items.map(el => ({ tag: el.tagName, outerHTML: el.outerHTML.slice(0, 300), parentTag: el.parentElement?.tagName, parentClass: el.parentElement?.className }));
});
console.log('MENU_ITEM_CANDIDATES:', JSON.stringify(menuHtml, null, 2));

// Click the deepest/most specific match's parent (likely the actual clickable li/a)
await page.evaluate(() => {
  const items = Array.from(document.querySelectorAll('*')).filter(el => el.textContent?.trim() === 'Delete product');
  const target = items[items.length - 1];
  target?.click();
});
await page.waitForTimeout(1200);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-006-after-native-click.png'), fullPage: true });
const modalCheck = await page.evaluate(() => document.body.innerText.slice(0, 500));
console.log('BODY_TOP_AFTER_CLICK', modalCheck);

console.log('RECENT_RESPONSES', allResp.slice(-10));
await browser.close();
