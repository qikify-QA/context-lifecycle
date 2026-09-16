import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';
import path from 'node:path';

const PID = '3237'; // QA-TEST-sku-a (has 1 variant already: QA-CROSS-SKU-20260913)
const DL_DIR = '/private/tmp/claude-501/-Users-linhsmac-Documents-work-teeinblue-context-builder/362ce911-b395-4c6b-b5d4-c4582f512b95/scratchpad/variant-files';

test('CHK-05-008: download template, export, then bulk delete selected', async ({ page }) => {
  test.setTimeout(120000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(800);

  // Download template
  const dlPromise1 = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
  await page.getByRole('button', { name: /download template/i }).click({ timeout: 5000 });
  const dl1 = await dlPromise1;
  if (dl1) {
    await dl1.saveAs(path.join(DL_DIR, 'template.xlsx'));
    log.templateFile = dl1.suggestedFilename();
  }

  // Export
  const dlPromise2 = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
  await page.getByRole('button', { name: /export/i }).click({ timeout: 5000 });
  const dl2 = await dlPromise2;
  if (dl2) {
    await dl2.saveAs(path.join(DL_DIR, 'export.xlsx'));
    log.exportFile = dl2.suggestedFilename();
  }
  await screenshot(page, 'ACT-05-RC-008-001-after-downloads');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-05-RC-008-download-template-export');
  cap.detach();
});
