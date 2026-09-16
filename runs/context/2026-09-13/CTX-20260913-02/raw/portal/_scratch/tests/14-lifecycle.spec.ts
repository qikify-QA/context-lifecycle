import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-07-004: Delete on product used by campaign -> View campaign list, no real delete', async ({ page }) => {
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
  const row = page.locator('tr, [class*="row" i]', { hasText: 'QA-TEST-campaign-link-20260913' }).first();
  await row.locator('text=/\\.\\.\\./').first().click({ timeout: 5000 }).catch(async () => {
    await row.locator('[class*="dots" i], [class*="more" i], button').last().click({ timeout: 5000 });
  });
  await page.waitForTimeout(600);
  await screenshot(page, 'ACT-07-RC-004-001-menu-open');
  const deleteOption = page.getByText('Delete product', { exact: true }).first();
  const deleteCount = await deleteOption.count();
  log.deleteOptionCount = deleteCount;
  if (deleteCount > 0) {
    const respPromise = page.waitForResponse((r) => r.url().includes('deletion-check'), { timeout: 8000 }).catch(() => null);
    await deleteOption.click({ timeout: 5000 });
    const resp = await respPromise;
    log.deletionCheckStatus = resp ? resp.status() : null;
    let body: unknown = null;
    if (resp) { try { body = await resp.json(); } catch { /* */ } }
    log.deletionCheckBody = body;
    await page.waitForTimeout(1000);
    await screenshot(page, 'ACT-07-RC-004-002-after-delete-click');
    const dialogText = await page.locator('body').innerText();
    log.hasViewCampaignListButton = /view campaign list/i.test(dialogText);
    log.dialogSnippet = dialogText.slice(dialogText.search(/campaign/i) - 100 > 0 ? dialogText.search(/campaign/i) - 100 : 0, dialogText.search(/campaign/i) + 300);
  }

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-07-RC-004-delete-blocked-by-campaign');
  cap.detach();
});
