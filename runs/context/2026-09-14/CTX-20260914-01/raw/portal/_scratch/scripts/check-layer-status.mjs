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
for (let i=0;i<6;i++) {
  await reloadBtn.click({ timeout: 1500 }).catch(()=>{});
  await page.waitForTimeout(1500);
}
const entry = lastBody?.data?.find(d => d.name.includes('mockup_999'));
console.log('mockup_999 status:', JSON.stringify(entry, null, 2));
const bodyText = await page.locator('body').innerText();
console.log('Rendering text count:', (bodyText.match(/Rendering/g)||[]).length);
await browser.close();
