import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.loadEnvFile('/Users/linhsmac/Documents/work/teeinblue-context-builder/.env');
const RUN_ROOT = path.resolve(__dirname, '..', '..'); // -> raw/portal
const SS_DIR = path.join(RUN_ROOT, 'screenshots');
const NET_DIR = path.resolve(RUN_ROOT, '..', 'network');
fs.mkdirSync(SS_DIR, { recursive: true });
fs.mkdirSync(NET_DIR, { recursive: true });

function redactHeaders(h) {
  if (!h) return h;
  const out = {}; const RED = new Set(['authorization','cookie','set-cookie','x-api-key','x-shopify-access-token']);
  for (const [k,v] of Object.entries(h)) out[k] = RED.has(k.toLowerCase()) ? '[REDACTED]' : v;
  return out;
}
function redactBody(v) {
  if (v == null) return v;
  if (Array.isArray(v)) return v.map(redactBody);
  if (typeof v === 'object') {
    const out = {};
    for (const [k,val] of Object.entries(v)) {
      const l = k.toLowerCase();
      if (['token','password','secret','api_key','access_token','refresh_token','signature','hmac','email','phone'].some(f=>l.includes(f))) out[k]='[REDACTED]';
      else out[k]=redactBody(val);
    }
    return out;
  }
  return v;
}
const captured = [];
const browser = await chromium.launch();
const context = await browser.newContext({ storageState: path.resolve(__dirname, '..', 'auth-owner.json') });
const page = await context.newPage();
page.on('response', async (res) => {
  try {
    const req = res.request();
    const rt = req.resourceType();
    if (['image','font','stylesheet','media'].includes(rt)) return;
    const ct = res.headers()['content-type'] || '';
    let resBody = null;
    if (ct.includes('json') || ct.includes('text')) {
      try { resBody = redactBody(JSON.parse(await res.text())); } catch { resBody = '[non-json]'; }
    } else resBody = `[binary, ct=${ct}]`;
    captured.push({ url: res.url(), method: req.method(), request_headers: redactHeaders(req.headers()),
      request_body: (() => { try { return redactBody(JSON.parse(req.postData()||'null')); } catch { return req.postData() ? '[non-json body]' : null; } })(),
      response_status: res.status(), response_headers: redactHeaders(res.headers()), response_body: resBody,
      resource_type: rt, timestamp: new Date().toISOString() });
  } catch {}
});

await page.goto('https://staging-portal.teeinblue.com/products/3245/edit', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForSelector('text=Mockup', { timeout: 20000 });
await page.waitForTimeout(1000);

// Create a new printarea
await page.getByRole('button', { name: /new printarea/i }).click({ timeout: 5000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-04-RC2-LOG-000-new-printarea-row.png'), fullPage: true });

// Fill in the new printarea row fields if inputs appear (fulfilled key/display name/width/height)
const rows = page.locator('table, .el-table').first();
const inputs = page.locator('input:visible');
const count = await inputs.count();
console.log('VISIBLE_INPUT_COUNT_AFTER_NEW_PRINTAREA', count);

// Try to save via "Save" button in Printareas section (second Save button likely)
const saveButtons = page.getByRole('button', { name: /^save$/i });
const saveCount = await saveButtons.count();
console.log('SAVE_BUTTON_COUNT', saveCount);
if (saveCount > 1) {
  await saveButtons.nth(1).click({ timeout: 5000 }).catch((e) => console.log('save click err', e.message));
} else if (saveCount === 1) {
  await saveButtons.first().click({ timeout: 5000 }).catch((e) => console.log('save click err', e.message));
}
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-04-RC2-LOG-001-after-save-attempt.png'), fullPage: true });
const bodyTextAfterSave = await page.locator('body').innerText();
console.log('TOAST_OR_ERROR_HINT:', bodyTextAfterSave.match(/.{0,60}(required|error|success|created).{0,60}/gi));

// Open Logs modal
const logsLink = page.getByText('Logs', { exact: true }).first();
await logsLink.click({ timeout: 5000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(SS_DIR, 'ACT-04-RC2-LOG-002-logs-modal-after-printarea.png'), fullPage: true });
const modalText = await page.locator('body').innerText();
console.log('BODY_TEXT_AFTER_LOGS_CLICK_POST_PRINTAREA (tail 800 chars):\n', modalText.slice(-800));

fs.writeFileSync(path.join(NET_DIR, 'ACT-04-RC2-LOG-create-printarea-and-check-logs.json'), JSON.stringify({ act_id: 'ACT-04-RC2-LOG-create-printarea-and-check-logs', entries: captured }, null, 2));
await browser.close();
