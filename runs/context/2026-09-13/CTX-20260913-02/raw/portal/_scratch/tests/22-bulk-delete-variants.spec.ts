import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3237';

test('CHK-05-008: bulk Delete selected variants - confirm dialog + real delete', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(800);

  // add one more variant so we have 2 to bulk-select
  await page.getByRole('button', { name: /new variant/i }).click({ timeout: 5000 });
  await page.waitForTimeout(500);
  await page.getByPlaceholder('SKU').first().fill('QA-BULKDEL-TEST-001');
  await page.getByPlaceholder('Color').first().fill('Orange');
  await page.getByPlaceholder('Size').first().fill('XS');
  await page.getByPlaceholder('0.00').first().fill('3.00').catch(() => {});
  await page.locator('button[title="Add"]').first().click({ timeout: 5000 });
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-05-RC-008-020-two-variants-ready');

  // select all rows via the header row-select control (leftmost column, hamburger icon "≡")
  const selectAllHeader = page.locator('th').first();
  await selectAllHeader.click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);
  await screenshot(page, 'ACT-05-RC-008-021-after-select-all-attempt');

  const deleteSelectedBtn = page.getByRole('button', { name: /delete selected/i }).first();
  const isEnabled = await deleteSelectedBtn.isEnabled().catch(() => false);
  log.deleteSelectedEnabledAfterHeaderClick = isEnabled;

  if (!isEnabled) {
    // fallback: click each row's leftmost cell checkbox individually
    const rowCells = page.locator('tbody tr td:first-child, tr td:first-child');
    const count = await rowCells.count();
    log.rowCellCount = count;
    for (let i = 0; i < count; i++) {
      await rowCells.nth(i).click({ timeout: 3000 }).catch(() => {});
    }
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'ACT-05-RC-008-022-rows-selected');
  const isEnabled2 = await deleteSelectedBtn.isEnabled().catch(() => false);
  log.deleteSelectedEnabledFinal = isEnabled2;

  if (isEnabled2) {
    await deleteSelectedBtn.click({ timeout: 5000 });
    await page.waitForTimeout(800);
    await screenshot(page, 'ACT-05-RC-008-023-after-click-delete-selected');
    const dialogText = await page.locator('body').innerText();
    log.hasConfirmDialog = /are you sure|confirm|delete.*variant/i.test(dialogText);
    const confirmBtn = page.getByRole('button', { name: /^(delete|confirm|yes|ok)$/i }).first();
    const confirmCount = await confirmBtn.count();
    log.confirmBtnCount = confirmCount;
    if (confirmCount > 0) {
      const respPromise = page.waitForResponse((r) => r.url().includes('graphql') || r.url().includes('variant'), { timeout: 8000 }).catch(() => null);
      await confirmBtn.click({ timeout: 5000 });
      const resp = await respPromise;
      log.deleteRespStatus = resp ? resp.status() : null;
      await page.waitForTimeout(1500);
    }
  }
  await screenshot(page, 'ACT-05-RC-008-024-final-state');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-05-RC-008-bulk-delete-variants');
  cap.detach();
});
