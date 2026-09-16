import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
await page.goto('https://staging-portal.teeinblue.com/products/3245/edit', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);

const result = await page.evaluate(async () => {
  function getCookie(name) {
    const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? decodeURIComponent(m.pop()) : null;
  }
  const xsrf = getCookie('XSRF-TOKEN');
  const checkRes = await fetch('https://staging-api.teeinblue.com/api/products/3245/deletion-check', {
    credentials: 'include',
    headers: { Accept: 'application/json', 'X-XSRF-TOKEN': xsrf || '' },
  });
  const checkBody = await checkRes.json().catch(() => null);
  const delRes = await fetch('https://staging-api.teeinblue.com/api/products/3245', {
    method: 'DELETE',
    credentials: 'include',
    headers: { Accept: 'application/json', 'X-XSRF-TOKEN': xsrf || '' },
  });
  let delBody = null; try { delBody = await delRes.json(); } catch {}
  return { hasXsrf: !!xsrf, checkStatus: checkRes.status, checkBody, delStatus: delRes.status, delBody };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
