import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3237';
const DL_DIR = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/variant-files';

test('CHK-05-008 + CHK-02-009: import valid new variant + import missing SKU', async ({ page }) => {
  test.setTimeout(120000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(800);

  const importInput = page.locator('input[type="file"][accept*=".csv"]').first();

  // Case 1: valid new variant import
  const respPromise1 = page.waitForResponse((r) => r.url().includes('graphql') || /import|variant/.test(r.url()), { timeout: 10000 }).catch(() => null);
  await importInput.setInputFiles(`${DL_DIR}/import-valid-new.xlsx`);
  await page.waitForTimeout(2500);
  const toast1 = await page.locator('.vue-notification').allTextContents().catch(() => []);
  log.validImport = { toast: toast1 };
  await screenshot(page, 'ACT-05-RC-008-010-import-valid-result');

  // reload fresh, verify via API-visible grid text
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(1000);
  const gridHasNew = await page.locator('body').innerText();
  log.gridContainsImportedSku = gridHasNew.includes('QA-IMPORT-NEW-001');

  // Case 2: missing SKU import
  const importInput2 = page.locator('input[type="file"][accept*=".csv"]').first();
  const respPromise2 = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await importInput2.setInputFiles(`${DL_DIR}/import-missing-sku.xlsx`);
  await page.waitForTimeout(2500);
  const toast2 = await page.locator('.vue-notification').allTextContents().catch(() => []);
  log.missingSkuImport = { toast: toast2 };
  await screenshot(page, 'ACT-05-RC-008-011-import-missing-sku-result');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-05-RC-008-import-variants');
  cap.detach();
});
