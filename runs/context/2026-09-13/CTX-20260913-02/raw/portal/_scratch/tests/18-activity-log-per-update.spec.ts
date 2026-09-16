import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3236';

async function checkLogs(page: import('@playwright/test').Page, label: string) {
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Basic information', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByText('Logs', { exact: true }).first().click({ timeout: 5000 });
  await page.waitForTimeout(3000);
  const modalText = await page.locator('text=/No activity|Status:/').locator('xpath=ancestor::*[position()<=3]').last().innerText().catch(() => '[err reading modal]');
  await screenshot(page, `ACT-08-RC-010-logs-after-${label}`);
  await page.locator('button[aria-label="Close"], .close, [class*="close" i]').first().click({ timeout: 3000 }).catch(() => {});
  return modalText;
}

test('CHK-08-010: partial updates -> activity log check per update type', async ({ page }) => {
  test.setTimeout(180000);
  const cap = new NetworkCapture(page);
  const results: Record<string, unknown> = {};

  results['0_baseline'] = await checkLogs(page, '0-baseline');

  // 1) Basic information only
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Basic information', { timeout: 20000 });
  await page.waitForTimeout(800);
  const descField = page.locator('[contenteditable="true"]').first();
  const hasDesc = await descField.count();
  if (hasDesc > 0) {
    await descField.fill('QA activity-log test description ' + Date.now()).catch(async () => {
      await descField.click();
      await page.keyboard.type('QA activity-log test description ' + Date.now());
    });
  }
  const saveBtn = page.getByRole('button', { name: /save/i }).first();
  await saveBtn.click({ timeout: 5000 });
  await page.waitForTimeout(1500);
  results['1_after_basic_info_update'] = await checkLogs(page, '1-basic-info');

  // 2) Printarea only: create a new printarea
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Printareas', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /new printarea/i }).click({ timeout: 5000 });
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /^save$/i }).last().click({ timeout: 5000 });
  await page.waitForTimeout(1500);
  results['2_after_printarea_create'] = await checkLogs(page, '2-printarea');

  // 3) Variant only: create a new variant
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /new variant/i }).click({ timeout: 5000 });
  await page.waitForTimeout(500);
  await page.getByPlaceholder('SKU').first().fill('QA-LOG-TEST-SKU');
  await page.getByPlaceholder('Color').first().fill('Blue');
  await page.getByPlaceholder('Size').first().fill('S');
  await page.getByPlaceholder('0.00').first().fill('5.00').catch(() => {});
  await page.locator('button[title="Add"]').first().click({ timeout: 5000 });
  await page.waitForTimeout(1500);
  results['3_after_variant_create'] = await checkLogs(page, '3-variant');

  console.log('RESULTS', JSON.stringify(results, null, 2));
  cap.writeToFile('ACT-08-RC-010-activity-log-per-update');
  cap.detach();
});
