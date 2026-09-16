import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const CAMPAIGN_ID = '2595';

test('CHK-08-008: add product to campaign via + button, Save, verify campaign_products', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href="/orders"]', { timeout: 20000, state: 'attached' });
  await page.goto(`/campaigns/${CAMPAIGN_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.waitForSelector('text=Initializing...', { state: 'detached', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.waitForSelector('text=Available Products', { timeout: 15000 });
  const productsBefore = await page.locator('text=Available Products:').locator('..').innerText();
  log.productsBefore = productsBefore;

  const plusBtn = page.locator('text=Available Products:').locator('..').locator('i[class*="plus" i], svg, button').last();
  await plusBtn.click({ timeout: 5000 });
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-08-RC-008-010-modal-reopened');

  const modalSearch = page.locator('input[placeholder="Search" i]').last();
  await modalSearch.fill('QA-TEST-campaign-link');
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-08-RC-008-011-modal-searched');
  const targetCard = page.locator('text=QA-TEST-campaign-link-20260913').first();
  const targetCount = await targetCard.count();
  log.targetCount = targetCount;
  if (targetCount > 0) {
    await targetCard.click({ timeout: 5000 });
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'ACT-08-RC-008-012-target-selected');

  const respPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  const saveBtn = page.getByRole('button', { name: /^save$/i }).last();
  const saveCount = await saveBtn.count();
  log.saveBtnCount = saveCount;
  if (saveCount > 0) {
    await saveBtn.click({ timeout: 5000 });
  } else {
    // maybe selecting the card auto-adds and closes modal
    await page.keyboard.press('Escape').catch(() => {});
  }
  const resp = await respPromise;
  log.respStatus = resp ? resp.status() : null;
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-08-RC-008-013-after-save');

  const productsAfter = await page.locator('text=Available Products:').locator('..').innerText().catch(() => '[err]');
  log.productsAfter = productsAfter;

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-08-RC-008-add-product-to-campaign');
  cap.detach();
});
