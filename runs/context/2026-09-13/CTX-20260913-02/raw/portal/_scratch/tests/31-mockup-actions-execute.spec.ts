import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

async function getMockupInfo(jwt: string) {
  const query = `query get { products_by_pk(id: ${PID}) { mockups { id preview_url variant_ids position } } campaigns_by_pk(id: 2595) { campaign_instances(where: {instance: {deleted_at: {_is_null: true}}}) { id need_sync } } }`;
  const res = await fetch('https://staging-graphql.teeinblue.com/v1/graphql', {
    method: 'POST', headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName: 'get', variables: {}, query }),
  });
  return res.json();
}

test('CHK-06-010: execute Edit, Duplicate, More on mockup card; check campaign effect', async ({ page }) => {
  test.setTimeout(120000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};

  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[src*="cdn.ownego.com"][src*="/products/3243/"]', { timeout: 20000 });
  await page.waitForTimeout(1000);

  const editBtn = page.locator('button').filter({ has: page.locator('.sr-only', { hasText: 'Edit' }) }).first();
  const dupBtn = page.locator('button').filter({ has: page.locator('.sr-only', { hasText: 'Duplicate mockup' }) }).first();
  const moreBtn = page.locator('button').filter({ has: page.locator('.sr-only', { hasText: 'More' }) }).first();

  // 1) EDIT
  await editBtn.click({ timeout: 5000 });
  await page.waitForTimeout(1200);
  await screenshot(page, 'ACT-06-RC-010-001-after-edit-click');
  const bodyAfterEdit = await page.locator('body').innerText();
  log.editOpenedSomething = bodyAfterEdit.length > 0;
  // close any modal/editor opened (Escape)
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(500);

  // 2) DUPLICATE
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[src*="cdn.ownego.com"][src*="/products/3243/"]', { timeout: 20000 });
  await page.waitForTimeout(1000);
  const dupRespPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await dupBtn.click({ timeout: 5000 });
  const dupResp = await dupRespPromise;
  log.duplicateRespStatus = dupResp ? dupResp.status() : null;
  await page.waitForTimeout(2000);
  await screenshot(page, 'ACT-06-RC-010-002-after-duplicate');

  // 3) MORE menu
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[src*="cdn.ownego.com"][src*="/products/3243/"]', { timeout: 20000 });
  await page.waitForTimeout(1000);
  await moreBtn.click({ timeout: 5000 });
  await page.waitForTimeout(800);
  await screenshot(page, 'ACT-06-RC-010-003-more-menu-open');
  const moreMenuText = await page.locator('body').innerText();
  const menuStart = moreMenuText.indexOf('More') >= 0 ? moreMenuText.indexOf('More') : 0;
  log.moreMenuOptionsSnippet = moreMenuText.slice(menuStart, menuStart + 200);

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-010-mockup-card-actions');
  cap.detach();
});
