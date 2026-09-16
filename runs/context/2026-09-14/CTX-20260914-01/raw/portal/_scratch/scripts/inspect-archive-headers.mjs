import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
page.on('request', (req) => {
  if (req.url().includes('/api/products/3245')) {
    console.log('REQ', req.method(), req.url());
    console.log('HEADERS', JSON.stringify(req.headers(), null, 2));
  }
});
await page.goto('https://staging-portal.teeinblue.com/products?search=QA-TEST-mockup-resize-20260914&tab=archived', { waitUntil: 'networkidle', timeout: 30000 }).catch(()=>{});
await page.waitForTimeout(1500);
// Try clicking archived tab explicitly then delete again to capture headers, in case it DOES fire but we missed due to filter
await browser.close();
