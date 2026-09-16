import { test, expect } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

// CONF-CHK-06-005-001: verify ngưỡng resize thật là 1000px (không phải 960px).
// Upload 1 anh 999px -> khong resize, doi xu ly xong HAN, roi upload rieng le
// 1 anh 1001px -> co resize. KHONG upload dong thoi nhieu file (tranh nhieu
// concurrency da gap o run truoc: chi 3/5 file dong thoi duoc xu ly).

const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/e009a6cc-8519-4472-93a3-941dbb85e5da/scratchpad';
const PRODUCT_NAME = 'QA-TEST-mockup-resize-20260914';
const PID = '3245'; // created by SETUP test above (run CTX-20260914-01)
const API_BASE = process.env.TIB_API_BASE ?? 'https://staging-api.teeinblue.com';

// Poll qua network capture cua chinh browser (dung cookie/session that cua SPA,
// tranh van de cross-origin/auth khi tu goi page.request sang API_BASE rieng).
// SPA tu goi lai GET mockup-layers sau upload va khi bam nut 'Reload' tren card.
function findLayerInCapture(cap: NetworkCapture, filenameNoExt: string) {
  for (let i = cap.entries.length - 1; i >= 0; i--) {
    const e = cap.entries[i];
    if (!e.url.includes('mockup-layers')) continue;
    const body = e.response_body as any;
    const list = body && Array.isArray(body.data) ? body.data : null;
    if (!list) continue;
    const match = list.find((d: any) => String(d.name).includes(filenameNoExt));
    if (match) return match;
  }
  return null;
}

async function pollLayerWidth(
  page: import('@playwright/test').Page,
  cap: NetworkCapture,
  filenameNoExt: string,
  timeoutMs = 25000,
) {
  const start = Date.now();
  let last: any = null;
  while (Date.now() - start < timeoutMs) {
    const found = findLayerInCapture(cap, filenameNoExt);
    if (found) {
      last = found;
      if (found.width && found.width > 0) return found;
    }
    // Bam Reload (neu co) de kich hoat 1 lan GET lai list, giong pattern CHK-06-004/CHK-06-007.
    const reloadBtn = page.getByRole('button', { name: /reload/i }).first();
    await reloadBtn.click({ timeout: 1500 }).catch(() => {});
    await page.waitForTimeout(1500);
  }
  return last;
}

test('SETUP: create QA-TEST product for mockup resize + log exploration', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  await page.goto('/products/new', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  await page.locator('input').nth(1).fill(PRODUCT_NAME);
  const respPromise = page
    .waitForResponse((r) => r.url().includes('/api/products') && r.request().method() === 'POST', { timeout: 15000 })
    .catch(() => null);
  await page.getByRole('button', { name: /save/i }).first().click({ timeout: 5000 });
  const resp = await respPromise;
  await page.waitForTimeout(1000);
  const url = page.url();
  const match = url.match(/\/products\/(\d+)\/edit/);
  const createdId = match ? match[1] : null;
  console.log('LOG', JSON.stringify({ created_id: createdId, status: resp?.status(), url }, null, 2));
  await screenshot(page, 'ACT-06-RC2-SETUP-001-after-create');
  cap.writeToFile('ACT-06-RC2-SETUP-001-create-product');
  cap.detach();
  expect(createdId).not.toBeNull();
});

test('ACT-06-RC2-005-999: upload 999x999 mockup, expect NO resize', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  const pid = PID;

  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  await screenshot(page, 'ACT-06-RC2-005-999-000-before');

  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(800);
  const mockupInput = page.locator('input[type="file"][accept*="image/png"]').first();
  await mockupInput.setInputFiles(`${SC}/mockup_999.png`);
  const layer = await pollLayerWidth(page, cap, 'mockup_999');
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-06-RC2-005-999-001-after-upload');

  console.log('LOG', JSON.stringify({ pid, layer }, null, 2));
  cap.writeToFile('ACT-06-RC2-005-999');
  cap.detach();
});

test('ACT-06-RC2-005-1001: upload 1001x1001 mockup (separately), expect resize', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  const pid = PID;

  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  await screenshot(page, 'ACT-06-RC2-005-1001-000-before');

  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(800);
  const mockupInput = page.locator('input[type="file"][accept*="image/png"]').first();
  await mockupInput.setInputFiles(`${SC}/mockup_1001.png`);
  const layer = await pollLayerWidth(page, cap, 'mockup_1001');
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-06-RC2-005-1001-001-after-upload');

  console.log('LOG', JSON.stringify({ pid, layer }, null, 2));
  cap.writeToFile('ACT-06-RC2-005-1001');
  cap.detach();
});
