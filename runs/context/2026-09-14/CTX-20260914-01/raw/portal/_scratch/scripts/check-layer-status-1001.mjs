import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
let lastBody = null;
page.on('response', async (res) => {
  if (res.url().includes('mockup-layers') && res.request().method() === 'GET') {
    try { lastBody = await res.json(); } catch {}
  }
});
await page.goto('https://staging-portal.teeinblue.com/products/3245/edit', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('text=Mockup', { timeout: 20000 });
await page.waitForTimeout(1000);
await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
await page.waitForTimeout(2000);
const reloadBtn = page.getByRole('button', { name: /reload/i }).first();
for (let i=0;i<8;i++) {
  await reloadBtn.click({ timeout: 1500 }).catch(()=>{});
  await page.waitForTimeout(1500);
  const entry = lastBody?.data?.find(d => d.name.includes('mockup_1001'));
  if (entry && entry.master) { console.log('DONE at iter', i, JSON.stringify(entry, null, 2)); break; }
}
const entry = lastBody?.data?.find(d => d.name.includes('mockup_1001'));
console.log('final mockup_1001 status:', JSON.stringify(entry, null, 2));
await page.screenshot({ path: path.resolve(__dirname, '..', '..', 'screenshots', 'ACT-06-RC2-005-1001-002-final-state.png') });
await browser.close();
