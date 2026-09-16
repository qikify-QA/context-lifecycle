import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';
import path from 'node:path';

const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/thumbnail-sizes';

const cases = [
  { name: 'below-min-40x40', file: 'thumb_40x40.png', expect: 'reject (below 50x50)' },
  { name: 'boundary-min-50x50', file: 'thumb_50x50.png', expect: 'accept (boundary ok)' },
  { name: 'mid-500x500', file: 'thumb_500x500.png', expect: 'accept (mid ok)' },
  { name: 'boundary-max-2000x2000', file: 'thumb_2000x2000.png', expect: 'accept (boundary ok)' },
  { name: 'above-max-2500x2500', file: 'thumb_2500x2500.png', expect: 'reject (above 2000x2000)' },
];

test('CHK-03-005: thumbnail upload boundary sizes', async ({ page }) => {
  test.setTimeout(180000);
  const cap = new NetworkCapture(page);
  const results: Record<string, unknown> = {};
  await page.goto('/products/3242/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Thumbnail', { timeout: 20000 });
  await page.waitForTimeout(800);
  const fileInput = page.locator('input[type="file"]').first();

  for (const c of cases) {
    const filePath = path.join(SC, c.file);
    const toastBefore = await page.locator('.vue-notification').count();
    const respPromise = page.waitForResponse((r) => /upload|thumbnail|temporary-files/i.test(r.url()), { timeout: 10000 }).catch(() => null);
    await fileInput.setInputFiles(filePath);
    const resp = await respPromise;
    await page.waitForTimeout(2500);
    const toastTexts = await page.locator('.vue-notification').allTextContents().catch(() => []);
    await screenshot(page, `ACT-03-RC-005-${c.name}`);
    results[c.name] = {
      expected: c.expect,
      uploadRespStatus: resp ? resp.status() : null,
      uploadRespUrl: resp ? resp.url() : null,
      toastTexts,
    };
  }

  console.log('THUMBNAIL_RESULTS', JSON.stringify(results, null, 2));
  cap.writeToFile('ACT-03-RC-005-thumbnail-boundaries');
  cap.detach();
});
