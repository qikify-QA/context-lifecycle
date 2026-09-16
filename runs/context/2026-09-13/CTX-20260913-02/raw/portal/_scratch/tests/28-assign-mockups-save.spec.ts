import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('CHK-06-009: Assign mockups modal, real SAVE, capture mutation', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(1000);

  // ensure a variant exists to assign (create one if needed)
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 15000 }).catch(() => {});
  const existingVariant = await page.locator('td', { hasText: /./ }).count();
  const hasVariant = await page.locator('text=/^\\d+$/').first().count(); // rough check
  await page.getByRole('button', { name: /new variant/i }).click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);
  const skuVisible = await page.getByPlaceholder('SKU').count();
  if (skuVisible > 0) {
    await page.getByPlaceholder('SKU').first().fill('QA-ASSIGN-MOCKUP-SKU');
    await page.getByPlaceholder('Color').first().fill('Teal');
    await page.getByPlaceholder('Size').first().fill('M');
    await page.getByPlaceholder('0.00').first().fill('7.00').catch(() => {});
    await page.locator('button[title="Add"]').first().click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1500);
  }

  await page.getByRole('button', { name: /assign mockups/i }).click({ timeout: 5000 });
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-06-RC-009-001-assign-mockups-modal-open');

  const bodyText = await page.locator('body').innerText();
  log.modalOpenedTextSnippet = bodyText.slice(bodyText.indexOf('Select variants') - 20, bodyText.indexOf('Select variants') + 300);

  // "Select variants" is a dropdown/combobox - click "Select all" link next to it
  await page.getByText('Select all', { exact: true }).first().click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);
  // "Select mockups" uses a checkbox on the thumbnail - click the checkbox directly
  const mockupCheckbox = page.locator('input[type="checkbox"]').last();
  await mockupCheckbox.click({ timeout: 5000, force: true });
  await page.waitForTimeout(500);
  await screenshot(page, 'ACT-06-RC-009-002-selections-made');

  const saveBtn = page.getByRole('button', { name: /save/i }).last();
  const respPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await saveBtn.click({ timeout: 5000 });
  const resp = await respPromise;
  log.saveRespStatus = resp ? resp.status() : null;
  log.saveRespUrl = resp ? resp.url() : null;
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-06-RC-009-003-after-save');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-009-assign-mockups-save');
  cap.detach();
});
