import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3237';

test('CHK-05-008 retry: bulk delete via row-number click (per grid hint text)', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(800);

  // click row number cells: "1" and "2" (first column body cells)
  const rowNumCells = page.locator('tbody tr td:first-child, tr td.text-center', { hasText: /^[0-9]+$/ });
  const rowNum1 = page.locator('td', { hasText: /^1$/ }).first();
  const rowNum2 = page.locator('td', { hasText: /^2$/ }).first();
  await rowNum1.click({ timeout: 5000 });
  await page.waitForTimeout(300);
  await rowNum2.click({ timeout: 5000, modifiers: ['Control'] });
  await page.waitForTimeout(500);
  await screenshot(page, 'ACT-05-RC-008-030-rows-selected-via-numbers');

  const deleteSelectedBtn = page.getByRole('button', { name: /delete selected/i }).first();
  const respPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await deleteSelectedBtn.click({ timeout: 5000 });
  const resp = await respPromise;
  log.respAfterClick = resp ? { status: resp.status(), url: resp.url() } : null;
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-05-RC-008-031-after-delete-click');
  const bodyText = await page.locator('body').innerText();
  log.hasConfirmText = /are you sure|confirm|permanently|cannot be undone/i.test(bodyText);

  const confirmBtn = page.getByRole('button', { name: /^(delete|confirm|yes|ok)$/i }).first();
  const confirmCount = await confirmBtn.count();
  log.confirmBtnCount = confirmCount;
  if (confirmCount > 0) {
    const delRespPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
    await confirmBtn.click({ timeout: 5000 });
    const delResp = await delRespPromise;
    log.finalDeleteStatus = delResp ? delResp.status() : null;
    await page.waitForTimeout(1500);
  }
  await screenshot(page, 'ACT-05-RC-008-032-final');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-05-RC-008-bulk-delete-retry');
  cap.detach();
});
