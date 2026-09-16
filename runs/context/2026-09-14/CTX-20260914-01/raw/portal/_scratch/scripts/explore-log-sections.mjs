import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const RUN_ROOT = path.resolve(__dirname, '..', '..');
const SS_DIR = path.join(RUN_ROOT, 'portal', 'screenshots');
fs.mkdirSync(SS_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();

await page.goto('https://staging-portal.teeinblue.com/products/3245/edit', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2000);

// 1. List all top-level tab/section labels on product edit page
const tabTexts = await page.locator('[role="tab"], .nav-link, .el-tabs__item, button, a').evaluateAll(els =>
  els.map(e => e.textContent?.trim()).filter(t => t && t.length < 40)
);
const uniqTexts = [...new Set(tabTexts)];
console.log('ALL_CLICKABLE_TEXT_SAMPLE (first 80):', JSON.stringify(uniqTexts.slice(0, 80), null, 2));

// 2. Search for any text containing History/Log/Activity anywhere on page
const bodyText = await page.locator('body').innerText();
const historyMatches = bodyText.match(/.{0,30}(History|Log|Activity)(?!s community).{0,30}/gi) || [];
console.log('HISTORY_LOG_ACTIVITY_TEXT_MATCHES:', JSON.stringify(historyMatches, null, 2));

await page.screenshot({ path: path.join(SS_DIR, 'ACT-08-RC2-010-000-product-edit-full.png'), fullPage: true });

// 3. Try to find and click a Printareas tab/section
const printareaTab = page.getByText(/print\s*area/i).first();
if (await printareaTab.count() > 0) {
  await printareaTab.click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS_DIR, 'ACT-08-RC2-010-001-printarea-tab.png'), fullPage: true });
  const bodyText2 = await page.locator('body').innerText();
  const matches2 = bodyText2.match(/.{0,30}(History|Log|Activity)(?!s community).{0,30}/gi) || [];
  console.log('PRINTAREA_TAB_HISTORY_MATCHES:', JSON.stringify(matches2, null, 2));
}

await browser.close();
