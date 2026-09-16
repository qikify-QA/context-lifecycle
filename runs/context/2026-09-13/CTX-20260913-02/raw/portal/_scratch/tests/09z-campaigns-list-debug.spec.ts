import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG list existing campaigns', async ({ page }) => {
  test.setTimeout(40000);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href="/orders"]', { timeout: 20000, state: 'attached' });
  await page.goto('/campaigns', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.waitForSelector('text=Initializing...', { state: 'detached', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);
  await screenshot(page, 'DEBUG-campaigns-list');
  const rows = await page.locator('a[href*="/campaigns/"]').allTextContents().catch(() => []);
  console.log('CAMPAIGN_ROWS', JSON.stringify(rows));
  const hrefs = await page.locator('a[href*="/campaigns/"]').evaluateAll((els) => els.map((e: any) => e.getAttribute('href')));
  console.log('CAMPAIGN_HREFS', JSON.stringify(hrefs));
});
