import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3239';
const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/mockup-widths';
const widths = [900, 960, 999, 1000, 1200];

test('CHK-06-005: upload mockups at width thresholds, check resize + concurrent upload count', async ({ page }) => {
  test.setTimeout(180000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(800);

  // upload all 5 at once (multiple files) to also observe concurrency handling
  const mockupInput = page.locator('input[type="file"][accept*="image/png"]').first();
  const filePaths = widths.map((w) => `${SC}/mockup_w${w}.png`);
  const t0 = Date.now();
  await mockupInput.setInputFiles(filePaths);
  await page.waitForTimeout(5000);
  await screenshot(page, 'ACT-06-RC-005-001-after-multi-upload');
  const t1 = Date.now();
  log.multiUploadWallClockMs = t1 - t0;
  const bodyText1 = await page.locator('body').innerText();
  const renderingCount = (bodyText1.match(/Rendering/g) || []).length;
  log.renderingCountAfterMultiUpload = renderingCount;

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-005-width-resize-and-concurrency');
  cap.detach();
});
