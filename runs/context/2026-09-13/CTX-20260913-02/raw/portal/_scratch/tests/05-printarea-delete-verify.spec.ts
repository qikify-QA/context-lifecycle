import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PRODUCT_ID = '3233';

test('CHK-04-009: delete assigned printarea (13989), verify UI + API state', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PRODUCT_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(1000);

  const headerCells = await page.locator('th').allTextContents();
  const cpHeaderIndex = headerCells.findIndex((h) => /custom.*printarea/i.test(h));
  const dataRow = page.locator('tr', { hasText: 'QA-TEST-SKU-001' }).first();
  const cell = dataRow.locator('td').nth(cpHeaderIndex);
  const cellTextBefore = await cell.innerText().catch(() => '[err]');
  log.cellTextBefore = cellTextBefore;
  await screenshot(page, 'ACT-04-RC-009-040-before-delete-printarea');

  // delete printarea 13989 (the one assigned to the variant) via its "Delete printarea" button
  const row13989 = page.locator('.printarea.mb-2', { hasText: '13989' }).first();
  const deleteBtn = row13989.locator('button[title="Delete printarea"]');
  const btnCount = await deleteBtn.count();
  log.deleteBtnCount = btnCount;
  const respPromise = page.waitForResponse((r) => r.url().includes('printarea') && r.request().method() === 'DELETE', { timeout: 8000 }).catch(() => null);
  await deleteBtn.click({ timeout: 5000 });
  const delResp = await respPromise;
  log.deleteRespStatus = delResp ? delResp.status() : null;
  log.deleteRespUrl = delResp ? delResp.url() : null;
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-04-RC-009-042-after-delete-printarea');

  // UI check: printarea 13989 gone from list?
  const row13989AfterCount = await page.locator('.printarea.mb-2', { hasText: '13989' }).count();
  log.row13989AfterCount = row13989AfterCount;
  const row13990AfterCount = await page.locator('.printarea.mb-2', { hasText: '13990' }).count();
  log.row13990AfterCount = row13990AfterCount;

  // UI check: variant's Custom Printareas cell - reload fresh to avoid stale client cache
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(1500);
  const headerCells2 = await page.locator('th').allTextContents();
  const cpHeaderIndex2 = headerCells2.findIndex((h) => /custom.*printarea/i.test(h));
  const dataRow2 = page.locator('tr', { hasText: 'QA-TEST-SKU-001' }).first();
  const cell2 = dataRow2.locator('td').nth(cpHeaderIndex2);
  const cellTextAfterReload = await cell2.innerText().catch(() => '[err]');
  log.cellTextAfterReload = cellTextAfterReload;
  await screenshot(page, 'ACT-04-RC-009-043-after-reload-cell-state');

  console.log('DELETE_LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-04-RC-009-delete-printarea');
  cap.detach();
});
