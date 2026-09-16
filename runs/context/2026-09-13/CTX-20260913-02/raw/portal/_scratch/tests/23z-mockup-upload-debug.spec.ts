import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG mockup upload button click behavior', async ({ page }) => {
  test.setTimeout(40000);
  await page.goto('/products/3239/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  const inputsBefore = await page.locator('input[type="file"]').evaluateAll((els) => els.map((e: any) => e.accept));
  console.log('INPUTS_BEFORE', JSON.stringify(inputsBefore));
  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(1200);
  await screenshot(page, 'DEBUG-mockup-upload-clicked');
  const inputsAfter = await page.locator('input[type="file"]').evaluateAll((els) => els.map((e: any) => e.accept));
  console.log('INPUTS_AFTER', JSON.stringify(inputsAfter));
});
