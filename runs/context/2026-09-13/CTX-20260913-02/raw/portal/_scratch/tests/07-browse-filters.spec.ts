import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-01-010: Internal name / Internal tags filter chips actually filter that field', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};

  // --- Internal name filter: search "ZEBRA" (only in product 3240's internal name, not in any title) ---
  await page.goto('/products', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Product Bases', { timeout: 20000 });
  await page.waitForTimeout(1000);
  await page.locator('text=/Internal name/').first().click({ timeout: 5000 });
  await page.waitForTimeout(400);
  const nameInput = page.locator('input[placeholder="Find Internal name"]');
  await nameInput.fill('ZEBRA');
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-01-RC-010-001-internal-name-filter-zebra');
  const titlesAfterNameFilter = await page.locator('a', { hasText: /QA-TEST-filter/ }).allTextContents().catch(() => []);
  const allVisibleTitles1 = await page.locator('[class*="listing" i] a, table a').allTextContents().catch(() => []);
  log.titlesAfterNameFilter_ZEBRA = titlesAfterNameFilter;
  log.allVisibleTitles_afterNameFilterZEBRA = allVisibleTitles1.filter((t) => t.trim());

  // clear, try Internal tags filter with "beta" (only in product 3241's tags)
  await nameInput.fill('');
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.locator('text=/Internal tags/').first().click({ timeout: 5000 });
  await page.waitForTimeout(400);
  const tagsInput = page.locator('input[placeholder="Find Internal tags"]');
  await tagsInput.fill('beta');
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-01-RC-010-002-internal-tags-filter-beta');
  const allVisibleTitles2 = await page.locator('[class*="listing" i] a, table a').allTextContents().catch(() => []);
  log.allVisibleTitles_afterTagsFilterBeta = allVisibleTitles2.filter((t) => t.trim());

  // contrast: general Search box with "ZEBRA" (should NOT match per KB - search only filters title)
  await tagsInput.fill('');
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  const generalSearch = page.locator('input[placeholder="Search" i]').last();
  await generalSearch.fill('ZEBRA');
  await page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-01-RC-010-003-general-search-zebra');
  const allVisibleTitles3 = await page.locator('[class*="listing" i] a, table a').allTextContents().catch(() => []);
  log.allVisibleTitles_afterGeneralSearchZEBRA = allVisibleTitles3.filter((t) => t.trim());

  console.log('CHK01010_LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-01-RC-010-filter-internal-name-tags');
  cap.detach();
});
