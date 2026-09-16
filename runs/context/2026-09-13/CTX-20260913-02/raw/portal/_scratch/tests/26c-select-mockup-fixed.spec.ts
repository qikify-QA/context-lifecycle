import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('SETUP round2 fixed: select mockup_w900 via layer-listing__checkbox, click Select', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForSelector('text=900x700', { timeout: 15000 });
  await page.waitForTimeout(800);

  const card = page.locator('.layer-listing__body', { hasText: '900x700' }).first();
  const checkbox = card.locator('input.layer-listing__checkbox');
  await checkbox.click({ timeout: 5000, force: true });
  await page.waitForTimeout(500);
  await screenshot(page, 'ACT-06-RC-007-004-mockup-card-selected');

  const selectBtn = page.getByRole('button', { name: /select \d+ image/i }).first();
  const isEnabled = await selectBtn.isEnabled();
  log.selectBtnEnabled = isEnabled;
  const respPromise = page.waitForResponse((r) => r.url().includes('graphql'), { timeout: 8000 }).catch(() => null);
  await selectBtn.click({ timeout: 5000 });
  const resp = await respPromise;
  log.selectRespStatus = resp ? resp.status() : null;
  await page.waitForTimeout(2000);
  await screenshot(page, 'ACT-06-RC-007-005-after-select-click');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-007-select-mockup-card');
  cap.detach();
});
