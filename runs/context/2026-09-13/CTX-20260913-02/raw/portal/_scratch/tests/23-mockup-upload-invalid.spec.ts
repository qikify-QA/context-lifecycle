import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3239'; // QA-TEST-mockup
const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad';

test('CHK-06-004: upload invalid-format file to Mockup media library', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);

  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(800);
  await screenshot(page, 'ACT-06-RC-004-000-media-library-open');
  const mockupInput = page.locator('input[type="file"][accept*="image/png"]').first();
  await mockupInput.setInputFiles(`${SC}/fake-image.png`);
  await page.waitForTimeout(3000);
  await screenshot(page, 'ACT-06-RC-004-001-after-select-invalid-file');

  // click Reload per on-screen instructions
  const reloadBtn = page.getByRole('button', { name: /reload/i }).first();
  await reloadBtn.click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(2000);
  await screenshot(page, 'ACT-06-RC-004-002-after-reload');
  const bodyText = await page.locator('body').innerText();
  log.hasFakeImageInLibrary = bodyText.includes('fake-image');
  const toastTexts = await page.locator('.vue-notification').allTextContents().catch(() => []);
  log.toastTexts = toastTexts;

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-004-invalid-format-upload');
  cap.detach();
});
