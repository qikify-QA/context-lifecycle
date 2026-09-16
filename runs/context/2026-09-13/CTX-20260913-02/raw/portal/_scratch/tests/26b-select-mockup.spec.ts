import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('SETUP round2 continued: select mockup_w900 card and click Select to add to product', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForTimeout(1200);

  // find the card whose text contains "mockup_w900", then its checkbox (preceding sibling in same card container)
  const card = page.locator('div', { hasText: 'mockup_w900' }).filter({ has: page.locator('input[type="checkbox"]') }).last();
  const cardCheckbox = card.locator('input[type="checkbox"]').first();
  const cbCount = await cardCheckbox.count();
  log.cbCount = cbCount;
  if (cbCount > 0) {
    await cardCheckbox.click({ timeout: 5000, force: true });
  }
  await page.waitForTimeout(500);
  await screenshot(page, 'ACT-06-RC-007-004-mockup-card-selected');

  const selectBtn = page.getByRole('button', { name: /^select$/i }).first();
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
