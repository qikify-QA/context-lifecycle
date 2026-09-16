import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('SETUP round2: create QA-TEST-mockup2 with printarea, add to campaign 2595', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};

  await page.goto('/products/new', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  await page.locator('input').nth(1).fill('QA-TEST-mockup2-20260913');
  const respPromise = page.waitForResponse((r) => r.url().includes('/api/products') && r.request().method() === 'POST', { timeout: 15000 }).catch(() => null);
  await page.getByRole('button', { name: /save/i }).first().click({ timeout: 5000 });
  const resp = await respPromise;
  await page.waitForTimeout(1000);
  const url = page.url();
  const match = url.match(/\/products\/(\d+)\/edit/);
  log.created_id = match ? match[1] : `FAILED status=${resp?.status()} url=${url}`;
  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-04-RC-009B-setup-create-product');
  cap.detach();
});
