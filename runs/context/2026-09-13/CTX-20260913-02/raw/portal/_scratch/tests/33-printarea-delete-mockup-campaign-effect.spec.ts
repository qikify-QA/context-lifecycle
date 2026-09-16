import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('CHK-04-009 remainder: delete printarea, verify effect on mockup + campaign', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=13992', { timeout: 20000 });
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-04-RC-009C-000-before-delete');

  const row = page.locator('.printarea.mb-2', { hasText: '13992' }).first();
  const deleteBtn = row.locator('button[title="Delete printarea"]');
  const respPromise = page.waitForResponse((r) => r.url().includes('printarea') && r.request().method() === 'DELETE', { timeout: 8000 }).catch(() => null);
  await deleteBtn.click({ timeout: 5000 });
  const resp = await respPromise;
  log.deleteStatus = resp ? resp.status() : null;
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-04-RC-009C-001-after-delete');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-04-RC-009C-delete-printarea-mockup-campaign');
  cap.detach();
});
