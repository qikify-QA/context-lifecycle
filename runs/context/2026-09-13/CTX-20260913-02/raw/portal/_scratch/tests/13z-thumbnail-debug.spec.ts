import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG thumbnail upload control', async ({ page }) => {
  test.setTimeout(40000);
  await page.goto('/products/3242/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Basic information', { timeout: 20000 });
  await page.waitForTimeout(800);
  await screenshot(page, 'DEBUG-thumbnail-area');
  const fileInputs = await page.locator('input[type="file"]').count();
  console.log('FILE_INPUT_COUNT', fileInputs);
  const thumbText = await page.locator('text=/thumbnail/i').allTextContents().catch(() => []);
  console.log('THUMBNAIL_TEXTS', JSON.stringify(thumbText));
});
