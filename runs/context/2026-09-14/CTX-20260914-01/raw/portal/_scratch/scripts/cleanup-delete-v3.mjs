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
page.on('console', (msg) => console.log('CONSOLE', msg.type(), msg.text().slice(0,200)));
page.on('pageerror', (err) => console.log('PAGEERROR', err.message));
page.on('dialog', async (d) => { console.log('DIALOG', d.type(), d.message()); await d.accept(); });
const allResp = [];
page.on('response', (res) => allResp.push(`${res.request().method()} ${res.status()} ${res.url()}`));

await page.goto('https://staging-portal.teeinblue.com/products?search=QA-TEST-mockup-resize-20260914', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);

// count how many "Delete product" buttons exist total, and how many visible
const allCount = await page.locator('button[title="Delete product"]').count();
console.log('TOTAL_DELETE_BUTTONS_IN_DOM_BEFORE_OPEN', allCount);

const row = page.locator('tr', { hasText: 'QA-TEST-mockup-resize-20260914' }).first();
const actionBtn = row.locator('button, [role="button"], i, svg').last();
await actionBtn.click({ timeout: 5000 });
await page.waitForTimeout(500);

const allCountAfterOpen = await page.locator('button[title="Delete product"]').count();
const visibleCount = await page.locator('button[title="Delete product"]:visible').count();
console.log('TOTAL_AFTER_OPEN', allCountAfterOpen, 'VISIBLE_AFTER_OPEN', visibleCount);

const visibleBtn = page.locator('button[title="Delete product"]:visible').first();
const box = await visibleBtn.boundingBox();
console.log('VISIBLE_BTN_BOX', box);
await visibleBtn.click({ timeout: 5000 });
await page.waitForTimeout(100);
const htmlSnippetImmediate = await page.evaluate(() => document.body.innerHTML.length);
console.log('BODY_HTML_LEN_IMMEDIATE_AFTER_CLICK', htmlSnippetImmediate);
await page.waitForTimeout(900);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-CLEANUP-008-v3.png'), fullPage: true });
console.log('RESP_TAIL', allResp.slice(-6));
await browser.close();
