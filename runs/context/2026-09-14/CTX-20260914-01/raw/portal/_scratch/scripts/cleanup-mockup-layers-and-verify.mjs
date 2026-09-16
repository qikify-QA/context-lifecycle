import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
await page.goto('https://staging-portal.teeinblue.com/products', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);

const result = await page.evaluate(async () => {
  function getCookie(name) {
    const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? decodeURIComponent(m.pop()) : null;
  }
  const xsrf = getCookie('XSRF-TOKEN');
  const out = {};
  for (const id of [4508, 4509]) {
    const r = await fetch(`https://staging-api.teeinblue.com/api/mockup-layers/${id}`, {
      method: 'DELETE', credentials: 'include', headers: { Accept: 'application/json', 'X-XSRF-TOKEN': xsrf || '' },
    });
    let body = null; try { body = await r.json(); } catch {}
    out[id] = { status: r.status, body };
  }
  // verify product 3245 gone
  const verify = await fetch('https://staging-api.teeinblue.com/api/products/3245/deletion-check', {
    credentials: 'include', headers: { Accept: 'application/json', 'X-XSRF-TOKEN': xsrf || '' },
  });
  out.verify_product_3245_deletion_check_status = verify.status;
  return out;
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
