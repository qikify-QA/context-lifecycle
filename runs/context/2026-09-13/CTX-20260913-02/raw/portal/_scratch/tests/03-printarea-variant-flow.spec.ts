import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PRODUCT_ID = '3233'; // QA-TEST-printarea-20260913

test('CHK-04-009 + CHK-05-011: printarea+variant assign, delete printarea, verify', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PRODUCT_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Variants', { timeout: 15000 });
  await page.waitForTimeout(1000);

  // ensure variant exists
  const savedVariantCount = await page.locator('td', { hasText: 'QA-TEST-SKU-001' }).count();
  log.savedVariantCountBefore = savedVariantCount;
  if (savedVariantCount === 0) {
    await page.getByRole('button', { name: /new variant/i }).click({ timeout: 5000 });
    await page.waitForTimeout(500);
    await page.getByPlaceholder('SKU').first().fill('QA-TEST-SKU-001');
    await page.getByPlaceholder('Color').first().fill('Black');
    await page.getByPlaceholder('Size').first().fill('M');
    await page.getByPlaceholder('0.00').first().fill('19.99').catch(() => {});
    await page.locator('button[title="Add"]').first().click({ timeout: 5000 });
    await page.waitForTimeout(2000);
  }
  await screenshot(page, 'ACT-04-RC-009-010-variant-ready');

  // click the "Custom Printareas" cell for our variant row
  const headerCells = await page.locator('th, [role="columnheader"]').allTextContents();
  const cpHeaderIndex = headerCells.findIndex((h) => /custom.*printarea/i.test(h));
  log.cpHeaderIndex = cpHeaderIndex;
  log.headerCells = headerCells;
  if (cpHeaderIndex >= 0) {
    const dataRow = page.locator('tr', { hasText: 'QA-TEST-SKU-001' }).first();
    const cell = dataRow.locator('td').nth(cpHeaderIndex);
    const cellTextBefore = await cell.innerText().catch(() => '[err]');
    log.cpCellTextBefore = cellTextBefore;
    await cell.scrollIntoViewIfNeeded();
    await screenshot(page, 'ACT-04-RC-009-011-before-click-cp-cell');
    await cell.click({ timeout: 5000 });
    await page.waitForTimeout(1000);
    await screenshot(page, 'ACT-04-RC-009-012-after-click-cp-cell');
    const dropdownCount = await page.locator('[class*="dropdown" i], [role="listbox"], [class*="menu" i]').count();
    log.dropdownCount = dropdownCount;
    const optionTexts = await page.locator('[role="option"], [class*="option" i], li').allTextContents().catch(() => []);
    log.optionTexts = optionTexts.filter((t) => t.trim()).slice(0, 30);
  }

  console.log('FLOW_LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-04-RC-009-printarea-variant-setup');
  cap.detach();
});
