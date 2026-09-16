import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-04-013: user role can edit width/height of normal printarea (UI only)', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto('/products/3233/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=13990', { timeout: 20000 });
  await page.waitForTimeout(1000);
  const row = page.locator('.printarea.mb-2', { hasText: '13990' }).first();
  // Width column is the FIRST ".col-2.printarea-inline-editable-wrapper" (Height is the second)
  const widthWrapper = row.locator('.col-2.printarea-inline-editable-wrapper').first();
  const widthLink = widthWrapper.locator('a.fake-inline-label');
  await widthLink.click({ timeout: 5000 });
  await page.waitForTimeout(500);
  const gotItBtn = page.getByText('Got it', { exact: true }).first();
  if (await gotItBtn.count() > 0) {
    log.warningDialogShown = true;
    log.warningDialogRawI18nKey = await page.locator('text=/product\\.printareas/').first().innerText().catch(() => null);
    await gotItBtn.click({ timeout: 5000 });
    await page.waitForTimeout(500);
  }
  const widthInput = widthWrapper.locator('input[placeholder="Width"]');
  const inputVisible = await widthInput.isVisible().catch(() => false);
  log.widthInputEditable = inputVisible;
  if (inputVisible) {
    await widthInput.fill('999');
    const respPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 6000 }).catch(() => null);
    // click the "Save" (checkmark svg) button in the Width column's vinput-action group
    await widthWrapper.locator('.vinput-action button.promise-button').first().click({ timeout: 5000 });
    const resp = await respPromise;
    log.saveRespStatus = resp ? resp.status() : null;
    await page.waitForTimeout(1000);
  }
  await screenshot(page, 'ACT-04-RC-013-001-after-edit-width');
  const widthValAfter = await row.locator('a:has-text("999"), a:has-text("1400")').first().innerText().catch(() => '[err]');
  log.widthValAfter = widthValAfter;
  console.log('CHK04013_LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-04-RC-013-edit-width-height');
  cap.detach();
});

test('CHK-05-007b: duplicate SKU ACROSS two different product bases - accepted?', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  const sameSku = 'QA-CROSS-SKU-20260913';
  for (const pid of ['3237', '3238']) {
    await page.goto(`/products/${pid}/edit`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
    await page.waitForTimeout(1000);
    const already = await page.locator('td', { hasText: sameSku }).count();
    if (already > 0) { log[`product_${pid}`] = 'already exists, skipped'; continue; }
    await page.getByRole('button', { name: /new variant/i }).click({ timeout: 5000 });
    await page.waitForTimeout(500);
    await page.getByPlaceholder('SKU').first().fill(sameSku);
    await page.getByPlaceholder('Color').first().fill('Red');
    await page.getByPlaceholder('Size').first().fill('L');
    await page.getByPlaceholder('0.00').first().fill('9.99').catch(() => {});
    const respPromise = page.waitForResponse((r) => r.url().includes('graphql') || r.url().includes('variant'), { timeout: 6000 }).catch(() => null);
    await page.locator('button[title="Add"]').first().click({ timeout: 5000 });
    const resp = await respPromise;
    await page.waitForTimeout(1500);
    const toastText = await page.locator('.vue-notification, [class*="toast" i]').allTextContents().catch(() => []);
    const rowCount = await page.locator('td', { hasText: sameSku }).count();
    log[`product_${pid}`] = { respStatus: resp ? resp.status() : null, toastText, rowCountAfter: rowCount };
    await screenshot(page, `ACT-05-RC-007b-product-${pid}-after-add`);
  }
  console.log('CHK05007b_LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-05-RC-007b-cross-product-sku');
  cap.detach();
});
