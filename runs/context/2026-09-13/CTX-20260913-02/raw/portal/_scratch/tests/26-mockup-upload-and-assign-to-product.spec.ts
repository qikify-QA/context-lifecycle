import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';
const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/mockup-widths';

test('SETUP round2: upload real mockup image to product, select+assign it (adds mockup to product)', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);

  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(800);
  const mockupInput = page.locator('input[type="file"][accept*="image/png"]').first();
  await mockupInput.setInputFiles(`${SC}/mockup_w900.png`);
  await page.waitForTimeout(3000);
  await screenshot(page, 'ACT-06-RC-007-000-uploaded-real-image');

  // click Reload
  await page.getByRole('button', { name: /reload/i }).first().click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-06-RC-007-001-after-reload-library');

  // select the uploaded image (should be first card, most recent) then click Select
  const firstCardCheckbox = page.locator('input[type="checkbox"]').nth(1); // skip the "All" category checkbox area if any
  await firstCardCheckbox.click({ timeout: 5000 }).catch(async () => {
    await page.locator('.card, [class*="card" i]').first().click({ timeout: 5000 });
  });
  await page.waitForTimeout(500);
  await screenshot(page, 'ACT-06-RC-007-002-image-selected');
  const selectBtn = page.getByRole('button', { name: /^select$/i }).first();
  const selectCount = await selectBtn.count();
  log.selectBtnCount = selectCount;
  if (selectCount > 0) {
    const respPromise = page.waitForResponse((r) => r.url().includes('graphql') || /mockup/.test(r.url()), { timeout: 8000 }).catch(() => null);
    await selectBtn.click({ timeout: 5000 });
    const resp = await respPromise;
    log.selectRespStatus = resp ? resp.status() : null;
    await page.waitForTimeout(1500);
  }
  await screenshot(page, 'ACT-06-RC-007-003-after-select-added-to-product');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-007-upload-and-select-mockup');
  cap.detach();
});
