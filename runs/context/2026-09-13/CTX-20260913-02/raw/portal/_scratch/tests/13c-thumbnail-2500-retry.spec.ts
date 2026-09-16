import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';
import path from 'node:path';

const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/thumbnail-sizes';

test('CHK-03-005 retry: 2500x2500 above-max, broad network capture', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  await page.goto('/products/3242/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Thumbnail', { timeout: 20000 });
  await page.waitForTimeout(1000);
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(path.join(SC, 'thumb_2500x2500.png'));
  await page.waitForTimeout(4000);
  const toastTexts = await page.locator('.vue-notification, [class*="toast" i], [class*="notification" i]').allTextContents().catch(() => []);
  console.log('TOASTS', JSON.stringify(toastTexts));
  await screenshot(page, 'ACT-03-RC-005-2500-retry2');
  cap.writeToFile('ACT-03-RC-005-thumbnail-2500-retry');
  cap.detach();
});
