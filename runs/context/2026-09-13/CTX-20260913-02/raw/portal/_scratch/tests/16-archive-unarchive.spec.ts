import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-07-006: archive then unarchive campaign-linked product, check campaign link status', async ({ page }) => {
  test.setTimeout(90000);
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

  // archive
  const row = page.locator('tr, [class*="row" i]', { hasText: 'QA-TEST-campaign-link-20260913' }).first();
  await row.locator('button, [class*="more" i]').last().click({ timeout: 5000 });
  await page.waitForTimeout(500);
  const archiveOption = page.getByText('Mark as archive', { exact: true }).first();
  const archiveRespPromise = page.waitForResponse((r) => r.url().includes('/archive'), { timeout: 8000 }).catch(() => null);
  await archiveOption.click({ timeout: 5000 });
  const archiveResp = await archiveRespPromise;
  log.archiveStatus = archiveResp ? archiveResp.status() : null;
  log.archiveUrl = archiveResp ? archiveResp.url() : null;
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-07-RC-006-001-after-archive');

  // switch to Archived tab, find the product, open "..." menu
  await page.getByText('Archived', { exact: true }).first().click({ timeout: 5000, force: true });
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(1000);
  await page.locator('input[placeholder="Search" i]').last().fill('QA-TEST-campaign-link');
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(1200);
  await screenshot(page, 'ACT-07-RC-006-002-archived-tab-filtered');

  const rowArchived = page.locator('tr, [class*="row" i]', { hasText: 'QA-TEST-campaign-link-20260913' }).first();
  await rowArchived.locator('button, [class*="more" i]').last().click({ timeout: 5000 });
  await page.waitForTimeout(500);
  await screenshot(page, 'ACT-07-RC-006-003-archived-menu-open');
  const menuTexts = await page.locator('[class*="dropdown-menu" i], [role="menu"]').allTextContents().catch(() => []);
  log.archivedMenuTexts = menuTexts;

  const unarchiveOption = page.getByText(/unarchive/i).first();
  const unarchiveCount = await unarchiveOption.count();
  log.unarchiveOptionCount = unarchiveCount;
  if (unarchiveCount > 0) {
    const unarchiveRespPromise = page.waitForResponse((r) => /archive|unarchive/i.test(r.url()), { timeout: 8000 }).catch(() => null);
    await unarchiveOption.click({ timeout: 5000 });
    const unarchiveResp = await unarchiveRespPromise;
    log.unarchiveStatus = unarchiveResp ? unarchiveResp.status() : null;
    log.unarchiveUrl = unarchiveResp ? unarchiveResp.url() : null;
    await page.waitForTimeout(1500);
  }
  await screenshot(page, 'ACT-07-RC-006-004-after-unarchive');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-07-RC-006-archive-unarchive');
  cap.detach();
});
