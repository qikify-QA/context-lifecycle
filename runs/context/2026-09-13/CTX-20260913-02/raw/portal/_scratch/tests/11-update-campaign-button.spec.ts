import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-08-007: Update campaign button behavior on product base (now linked to a campaign)', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href="/orders"]', { timeout: 20000, state: 'attached' });
  await page.goto('/products', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Product Bases', { timeout: 20000 });
  await page.waitForTimeout(1000);
  await page.locator('input[placeholder="Search" i]').last().fill('QA-TEST-campaign-link');
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(1200);
  await screenshot(page, 'ACT-08-RC-007-001-list-filtered');

  const row = page.locator('tr, [class*="row" i]', { hasText: 'QA-TEST-campaign-link-20260913' }).first();
  const rocketIcon = row.locator('[class*="rocket" i], i[class*="rocket" i], [title*="update campaign" i]').first();
  const rocketCount = await rocketIcon.count();
  log.rocketIconCount = rocketCount;
  await screenshot(page, 'ACT-08-RC-007-002-row-with-rocket');

  if (rocketCount > 0) {
    await rocketIcon.click({ timeout: 5000 });
    await page.waitForTimeout(1200);
    await screenshot(page, 'ACT-08-RC-007-003-after-click-rocket');
    const bodyText = await page.locator('body').innerText();
    log.pageTextAfterClick = bodyText.slice(0, 800);
    log.urlAfterClick = page.url();
  }

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-08-RC-007-update-campaign-button');
  cap.detach();
});
