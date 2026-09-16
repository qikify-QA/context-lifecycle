import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG variant import flow UI', async ({ page }) => {
  test.setTimeout(40000);
  await page.goto('/products/3237/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /import/i }).click({ timeout: 5000 });
  await page.waitForTimeout(1000);
  await screenshot(page, 'DEBUG-variant-import-modal');
  const fileInputCount = await page.locator('input[type="file"]').count();
  console.log('FILE_INPUT_COUNT', fileInputCount);
  const bodyText = await page.locator('body').innerText();
  console.log('BODY_SNIPPET', bodyText.slice(bodyText.indexOf('Import'), bodyText.indexOf('Import') + 600));
});
