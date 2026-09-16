import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3237';
const DL_DIR = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/variant-files';

test('CHK-05-008 retry: import using template.xlsx as base (preserve server formatting)', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(800);
  const importInput = page.locator('input[type="file"][accept*=".csv"]').first();
  const respPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 10000 }).catch(() => null);
  await importInput.setInputFiles(`${DL_DIR}/import-valid-from-template.xlsx`);
  await page.waitForTimeout(2500);
  const toast = await page.locator('.vue-notification').allTextContents().catch(() => []);
  log.toast = toast;
  await screenshot(page, 'ACT-05-RC-008-012-import-from-template-result');
  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-05-RC-008-import-from-template');
  cap.detach();
});
