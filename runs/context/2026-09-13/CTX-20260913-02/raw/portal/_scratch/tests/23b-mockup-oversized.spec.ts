import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3239';
const SC = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad';

test('CHK-06-004b: upload oversized (15MB) file to Mockup media library', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(800);
  const mockupInput = page.locator('input[type="file"][accept*="image/png"]').first();
  const respPromise = page.waitForResponse((r) => /upload-url|temporary-files/i.test(r.url()), { timeout: 15000 }).catch(() => null);
  await mockupInput.setInputFiles(`${SC}/oversized-mockup.png`);
  const resp = await respPromise;
  log.uploadUrlRespStatus = resp ? resp.status() : null;
  await page.waitForTimeout(4000);
  await screenshot(page, 'ACT-06-RC-004b-001-after-oversized-select');
  const bodyText = await page.locator('body').innerText();
  log.hasErrorText = /error|too large|exceed|limit/i.test(bodyText);
  const toastTexts = await page.locator('.vue-notification').allTextContents().catch(() => []);
  log.toastTexts = toastTexts;

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-004b-oversized-upload');
  cap.detach();
});
