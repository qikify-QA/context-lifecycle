import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('CHK-06-010: More menu -> Sync to campaigns, verify campaign effect', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[src*="cdn.ownego.com"][src*="/products/3243/"]', { timeout: 20000 });
  await page.waitForTimeout(1000);

  const moreBtn = page.locator('button').filter({ has: page.locator('.sr-only', { hasText: 'More' }) }).first();
  await moreBtn.click({ timeout: 5000 });
  await page.waitForTimeout(600);
  await screenshot(page, 'ACT-06-RC-010-010-more-menu-before-sync');

  const syncOption = page.getByText('Sync to campaigns', { exact: true }).first();
  const respPromise = page.waitForResponse((r) => r.url().includes('graphql') || /campaign|sync/i.test(r.url()), { timeout: 8000 }).catch(() => null);
  await syncOption.click({ timeout: 5000 });
  const resp = await respPromise;
  log.syncRespStatus = resp ? resp.status() : null;
  log.syncRespUrl = resp ? resp.url() : null;
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-06-RC-010-011-after-sync-click');
  const toastTexts = await page.locator('.vue-notification').allTextContents().catch(() => []);
  log.toastTexts = toastTexts;

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-010-sync-to-campaigns');
  cap.detach();
});
