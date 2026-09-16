import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('CHK-01-011: back-restore filter/page state via URL after edit->back', async ({ page }) => {
  test.setTimeout(60000);
  const log: Record<string, unknown> = {};
  await page.goto('/products', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Product Bases', { timeout: 20000 });
  await page.waitForTimeout(1000);

  // switch to Archived tab to create a non-default state
  await page.getByText('Archived', { exact: true }).first().click({ timeout: 5000, force: true });
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(800);
  const urlBeforeNav = page.url();
  log.urlBeforeNav = urlBeforeNav;
  await screenshot(page, 'ACT-01-RC-011-001-archived-tab-before-nav');

  // open a product to edit (any visible row link) via direct navigation to a known product
  await page.goto('/products/3233/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Basic information', { timeout: 20000 });
  await page.waitForTimeout(500);

  // go back
  await page.goBack({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const urlAfterBack = page.url();
  log.urlAfterBack = urlAfterBack;
  await screenshot(page, 'ACT-01-RC-011-002-after-back');
  const activeTabRestored = await page.locator('.nav-link.active, [class*="active"]', { hasText: 'Archived' }).count();
  log.archivedTabStillActiveVisually = activeTabRestored;

  console.log('CHK01011_LOG', JSON.stringify(log, null, 2));
});
