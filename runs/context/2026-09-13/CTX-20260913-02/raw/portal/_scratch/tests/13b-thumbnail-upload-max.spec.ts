import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';
import path from 'node:path';

const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/thumbnail-sizes';

test('CHK-03-005 continued: max boundary (2000 accept) + above-max (2500 reject) + resize check', async ({ page }) => {
  test.setTimeout(120000);
  const cap = new NetworkCapture(page);
  const results: Record<string, unknown> = {};

  // case: 2000x2000 (boundary max, expect accept)
  await page.goto('/products/3242/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Thumbnail', { timeout: 20000 });
  await page.waitForTimeout(800);
  const fileInput1 = page.locator('input[type="file"]').first();
  const respPromise1 = page.waitForResponse((r) => r.url().includes('/thumbnail'), { timeout: 10000 }).catch(() => null);
  await fileInput1.setInputFiles(path.join(SC, 'thumb_2000x2000.png'));
  const resp1 = await respPromise1;
  await page.waitForTimeout(2000);
  results['boundary-max-2000x2000'] = { status: resp1 ? resp1.status() : null };
  await screenshot(page, 'ACT-03-RC-005-boundary-max-2000-retry');

  // verify resize: check the rendered thumbnail <img> naturalWidth/Height after upload settles
  await page.waitForTimeout(1500);
  const imgDims = await page.locator('img[src*="thumbnail"], img[src*="products"]').first().evaluate((el: HTMLImageElement) => {
    return new Promise((resolve) => {
      if (el.complete) resolve({ w: el.naturalWidth, h: el.naturalHeight, src: el.src });
      else el.onload = () => resolve({ w: el.naturalWidth, h: el.naturalHeight, src: el.src });
      setTimeout(() => resolve({ w: el.naturalWidth, h: el.naturalHeight, src: el.src, timedOut: true }), 4000);
    });
  }).catch((e) => ({ error: e.message }));
  results['resize_check_after_2000_upload'] = imgDims;

  // case: 2500x2500 (above max, expect reject) - fresh page load
  await page.goto('/products/3242/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Thumbnail', { timeout: 20000 });
  await page.waitForTimeout(800);
  const fileInput2 = page.locator('input[type="file"]').first();
  const respPromise2 = page.waitForResponse((r) => r.url().includes('/thumbnail'), { timeout: 10000 }).catch(() => null);
  await fileInput2.setInputFiles(path.join(SC, 'thumb_2500x2500.png'));
  const resp2 = await respPromise2;
  await page.waitForTimeout(2000);
  const toastTexts2 = await page.locator('.vue-notification').allTextContents().catch(() => []);
  results['above-max-2500x2500'] = { status: resp2 ? resp2.status() : null, toastTexts: toastTexts2 };
  await screenshot(page, 'ACT-03-RC-005-above-max-2500-retry');

  console.log('RESULTS', JSON.stringify(results, null, 2));
  cap.writeToFile('ACT-03-RC-005-thumbnail-max-boundary');
  cap.detach();
});
