import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-07-005: DELETE on ACTIVE (not archived) product base - accepted?', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href="/orders"]', { timeout: 20000, state: 'attached' });
  await page.goto('/products', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Product Bases', { timeout: 20000 });
  await page.waitForTimeout(1000);
  await page.locator('input[placeholder="Search" i]').last().fill('QA-TEST-lifecycle-active');
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(1200);
  const row = page.locator('tr, [class*="row" i]', { hasText: 'QA-TEST-lifecycle-active-20260913' }).first();
  await row.locator('button, [class*="more" i]').last().click({ timeout: 5000 });
  await page.waitForTimeout(600);
  await screenshot(page, 'ACT-07-RC-005-001-menu-open');
  const deleteOption = page.getByText('Delete product', { exact: true }).first();
  const respPromise = page.waitForResponse((r) => r.url().includes('deletion-check'), { timeout: 8000 }).catch(() => null);
  await deleteOption.click({ timeout: 5000 });
  const resp = await respPromise;
  log.deletionCheckStatus = resp ? resp.status() : null;
  if (resp) { try { log.deletionCheckBody = await resp.json(); } catch { /* */ } }
  await page.waitForTimeout(800);
  await screenshot(page, 'ACT-07-RC-005-002-after-delete-click');
  const confirmBtn = page.getByRole('button', { name: /^(delete|confirm|yes)/i }).first();
  const confirmCount = await confirmBtn.count();
  log.confirmBtnCount = confirmCount;
  if (confirmCount > 0) {
    const delRespPromise = page.waitForResponse((r) => r.url().includes('/api/products/') && r.request().method() === 'DELETE', { timeout: 8000 }).catch(() => null);
    await confirmBtn.click({ timeout: 5000 });
    const delResp = await delRespPromise;
    log.deleteStatus = delResp ? delResp.status() : null;
    log.deleteUrl = delResp ? delResp.url() : null;
    await page.waitForTimeout(1000);
  }
  await screenshot(page, 'ACT-07-RC-005-003-after-confirm-delete');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-07-RC-005-delete-active-product');
  cap.detach();
});
