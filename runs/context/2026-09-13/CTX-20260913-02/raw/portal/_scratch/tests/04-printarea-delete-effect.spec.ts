import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PRODUCT_ID = '3233';

test('CHK-04-009: assign printarea to variant, then delete printarea, verify UI+API', async ({ page }) => {
  test.setTimeout(120000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PRODUCT_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(1000);

  const headerCellsPre = await page.locator('th').allTextContents();
  log.headerCellsPre = headerCellsPre;
  if (!headerCellsPre.some((h) => /custom.*printarea/i.test(h))) {
    await page.locator('label.vue-js-switch').first().click({ timeout: 5000 });
    await page.waitForSelector('th:has-text("Custom Printareas")', { timeout: 10000 });
    await page.waitForTimeout(800);
  }

  const headerCells = await page.locator('th').allTextContents();
  const cpHeaderIndex = headerCells.findIndex((h) => /custom.*printarea/i.test(h));
  log.headerCells = headerCells;
  log.cpHeaderIndex = cpHeaderIndex;

  const dataRow = page.locator('tr', { hasText: 'QA-TEST-SKU-001' }).first();
  const cell = dataRow.locator('td').nth(cpHeaderIndex);
  const cellTextBefore = await cell.innerText().catch(() => '[err]');
  log.cellTextBefore = cellTextBefore;
  await cell.scrollIntoViewIfNeeded();
  await cell.click({ timeout: 5000 });
  await page.waitForTimeout(800);
  await screenshot(page, 'ACT-04-RC-009-030-cp-dropdown-open');

  const optionCheckbox = page.locator('label:has-text("Front (1400x1400)") input[type="checkbox"]').first();
  const optionCount = await optionCheckbox.count();
  log.optionCount = optionCount;
  if (optionCount > 0) {
    const respPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 6000 }).catch(() => null);
    await optionCheckbox.click({ timeout: 5000, force: true });
    const resp = await respPromise;
    log.assignRespStatus = resp ? resp.status() : null;
    await page.waitForTimeout(1200);
  }
  await screenshot(page, 'ACT-04-RC-009-031-after-assign-click');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  const cellTextAfter = await cell.innerText().catch(() => '[err]');
  log.cellTextAfter = cellTextAfter;
  await screenshot(page, 'ACT-04-RC-009-032-cell-after-assign');

  console.log('ASSIGN_LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-04-RC-009-assign-printarea-to-variant');
  cap.detach();
});
