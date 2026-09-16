import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3236';

test('CHK-08-010 retry: Basic information update (real change) -> activity log check', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Basic information', { timeout: 20000 });
  await page.waitForTimeout(800);
  // Internal tags field (index 3) - real, verifiable change
  const tagsInput = page.locator('input').nth(3);
  await tagsInput.fill('qa-activity-log-test-' + Date.now());
  const saveBtn = page.getByRole('button', { name: /save/i }).first();
  const respPromise = page.waitForResponse((r) => r.url().includes('/api/products/') && r.request().method() === 'PUT', { timeout: 8000 }).catch(() => null);
  await saveBtn.click({ timeout: 5000 });
  const resp = await respPromise;
  log.putStatus = resp ? resp.status() : null;
  await page.waitForTimeout(1500);

  // check activity log via same GraphQL query
  const logRespPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.getByText('Logs', { exact: true }).first().click({ timeout: 5000 });
  await page.waitForTimeout(2500);
  await screenshot(page, 'ACT-08-RC-010-logs-after-basicinfo-retry');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-08-RC-010-activity-log-basicinfo-retry');
  cap.detach();
});
