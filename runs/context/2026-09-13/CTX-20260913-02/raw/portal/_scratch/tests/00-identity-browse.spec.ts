import { test, expect } from '@playwright/test';
import { NetworkCapture, screenshot, getTokenPayload } from '../helpers/evidence';

test('OBS identity verify + CONF-001 url-sync', async ({ page }) => {
  const cap = new NetworkCapture(page);

  // --- Identity verify ---
  await page.goto('/');
  await page.waitForSelector('a[href="/orders"]', { state: 'attached', timeout: 30000 });
  const claims = await getTokenPayload(page);
  expect(claims?.sub).toBe('273');
  const bodyText = await page.locator('body').innerText();
  const hasStoreName = bodyText.includes('linh-explorer.myshopify.com');
  const hasAccountName = /Linh explorer/i.test(bodyText);
  await screenshot(page, 'ACT-IDENTITY-RC-001-after');
  console.log('IDENTITY_CHECK sub=', claims?.sub, 'hasStoreName=', hasStoreName, 'hasAccountName=', hasAccountName);

  // --- CONF-001: URL query-string sync on /products ---
  await page.goto('/products');
  await page.waitForLoadState('networkidle');
  const urlBaseline = page.url();
  await screenshot(page, 'ACT-01-RC-CONF001-001-before');

  // DEBUG: find exact clickable node for "Archived" text
  const archivedNode = page.getByText('Archived', { exact: true }).first();
  const debugInfo = await archivedNode.evaluate((el) => ({
    tag: el.tagName,
    class: el.className,
    parentTag: el.parentElement?.tagName,
    parentClass: el.parentElement?.className,
  }));
  console.log('DEBUG_ARCHIVED_NODE', JSON.stringify(debugInfo));

  // 1) switch tab to Archived (click on parent, since text node itself may not be the click target)
  await archivedNode.click({ force: true });
  await page.waitForTimeout(1000);
  await page.waitForLoadState('networkidle').catch(() => {});
  const urlAfterTab = page.url();
  const bodyAfterTabClick = await page.locator('body').innerText();
  console.log('TAB_SWITCHED_TO_ARCHIVED_VISIBLE=', bodyAfterTabClick.includes('Archived') && !bodyAfterTabClick.includes('Example MUG'));
  await screenshot(page, 'ACT-01-RC-CONF001-002-after-tab-archived');

  // 2) type into the LOCAL list search box (toolbar), NOT the global header search (Ctrl+K)
  // The local search box sits inside the filter toolbar row alongside Fulfillment/Internal name/tags.
  const localSearchBox = page.locator('input[placeholder="Search" i]').last();
  await localSearchBox.click();
  await localSearchBox.fill('QA-CONF001-PROBE');
  await page.waitForTimeout(1000);
  await page.waitForLoadState('networkidle').catch(() => {});
  const urlAfterSearch = page.url();
  await screenshot(page, 'ACT-01-RC-CONF001-003-after-search');

  // clear search, go back to Active tab
  await localSearchBox.fill('');
  await page.waitForTimeout(800);
  const activeNode = page.getByText('Active', { exact: true }).first();
  await activeNode.click({ force: true });
  await page.waitForTimeout(800);
  await page.waitForLoadState('networkidle').catch(() => {});
  const urlAfterResetTab = page.url();

  // 3) change page size (real <select> "Show N entries")
  let urlAfterPageSize: string | null = null;
  const pageSizeSelect = page.locator('select').first();
  if (await pageSizeSelect.count() > 0) {
    try {
      const currentVal = await pageSizeSelect.inputValue();
      const options = await pageSizeSelect.locator('option').allTextContents();
      const target = options.find((o) => o.trim() !== currentVal.trim()) ?? options[0];
      await pageSizeSelect.selectOption({ label: target });
      await page.waitForTimeout(800);
      await page.waitForLoadState('networkidle').catch(() => {});
      urlAfterPageSize = page.url();
    } catch (e) {
      urlAfterPageSize = `[error trying page-size control: ${(e as Error).message}]`;
    }
  } else {
    urlAfterPageSize = '[no <select> page-size control found]';
  }
  await screenshot(page, 'ACT-01-RC-CONF001-004-after-pagesize-attempt');

  console.log('CONF001_URLS', JSON.stringify({
    urlBaseline, urlAfterTab, urlAfterSearch, urlAfterResetTab, urlAfterPageSize,
  }, null, 2));

  cap.writeToFile('ACT-01-RC-CONF001-001');
  cap.detach();
});
