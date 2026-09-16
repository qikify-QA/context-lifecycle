import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG dump current variants grid state', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/products/3233/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Variants', { timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.locator('text=Variants').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await screenshot(page, 'DEBUG-variants-grid-current');
  const gridText = await page.locator('table').last().innerText().catch((e) => `ERR: ${e.message}`);
  console.log('GRID_TEXT', gridText);
});
