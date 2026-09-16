import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const RUN_ROOT = path.resolve(__dirname, '..', '..');
const SS_DIR = path.join(RUN_ROOT, 'screenshots');
const NET_DIR = path.resolve(RUN_ROOT, '..', 'network');

function redactHeaders(h) { if (!h) return h; const out={}; const RED=new Set(['authorization','cookie','set-cookie','x-api-key','x-shopify-access-token']); for (const [k,v] of Object.entries(h)) out[k]=RED.has(k.toLowerCase())?'[REDACTED]':v; return out; }
function redactBody(v){ if(v==null) return v; if(Array.isArray(v)) return v.map(redactBody); if(typeof v==='object'){const out={}; for(const [k,val] of Object.entries(v)){const l=k.toLowerCase(); if(['token','password','secret','api_key','access_token','refresh_token','signature','hmac','email','phone'].some(f=>l.includes(f))) out[k]='[REDACTED]'; else out[k]=redactBody(val);} return out;} return v; }
const captured = [];
const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
page.on('response', async (res) => {
  try {
    const req = res.request(); const rt = req.resourceType();
    if (['image','font','stylesheet','media'].includes(rt)) return;
    const ct = res.headers()['content-type'] || '';
    let resBody = null;
    if (ct.includes('json') || ct.includes('text')) { try { resBody = redactBody(JSON.parse(await res.text())); } catch { resBody = '[non-json]'; } } else resBody = `[binary, ct=${ct}]`;
    captured.push({ url: res.url(), method: req.method(), request_headers: redactHeaders(req.headers()),
      request_body: (() => { try { return redactBody(JSON.parse(req.postData()||'null')); } catch { return req.postData() ? '[non-json body]' : null; } })(),
      response_status: res.status(), response_headers: redactHeaders(res.headers()), response_body: resBody, resource_type: rt, timestamp: new Date().toISOString() });
  } catch {}
});
await page.goto('https://staging-portal.teeinblue.com/products/3245/edit', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForSelector('text=Mockup', { timeout: 20000 });
await page.waitForTimeout(1000);
const logsLink = page.getByText('Logs', { exact: true }).first();
await logsLink.click({ timeout: 5000 });
await page.waitForTimeout(3000); // doi modal load xong han
await page.screenshot({ path: path.join(SS_DIR, 'ACT-04-RC2-LOG-003-logs-modal-loaded.png'), fullPage: true });
const modalText = await page.locator('body').innerText();
console.log('MODAL_TAIL:\n', modalText.slice(-1500));
fs.writeFileSync(path.join(NET_DIR, 'ACT-04-RC2-LOG-check-after-wait.json'), JSON.stringify({ act_id: 'ACT-04-RC2-LOG-check-after-wait', entries: captured }, null, 2));
await browser.close();
