import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');

const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
await page.goto('https://staging-portal.teeinblue.com/', { waitUntil: 'domcontentloaded' });

const results = {};

// 1. Deletion-check + delete product 3245
const dc = await page.request.get('https://staging-api.teeinblue.com/api/products/3245/deletion-check');
results.deletion_check = { status: dc.status(), body: await dc.json().catch(()=>null) };
const del = await page.request.delete('https://staging-api.teeinblue.com/api/products/3245', { headers: { Accept: 'application/json' } });
results.delete_product_3245 = { status: del.status() };

// 2. Try delete mockup layers 4508, 4509
for (const id of [4508, 4509]) {
  const r = await page.request.delete(`https://staging-api.teeinblue.com/api/mockup-layers/${id}`, { headers: { Accept: 'application/json' } });
  let body = null; try { body = await r.json(); } catch {}
  results[`delete_mockup_layer_${id}`] = { status: r.status(), body };
}

// 3. Verify product gone
const verify = await page.request.get('https://staging-api.teeinblue.com/api/graphql', { data: {} }).catch(()=>null);
console.log(JSON.stringify(results, null, 2));

fs.writeFileSync(path.resolve(__dirname, '..', 'cleanup-result.json'), JSON.stringify(results, null, 2));
await browser.close();
