import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('SETUP round2: add printarea to 3243, add product to campaign 2595', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};

  // 1) add printarea
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Printareas', { timeout: 20000 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /new printarea/i }).click({ timeout: 5000 });
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /^save$/i }).last().click({ timeout: 5000 });
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-04-RC-009B-001-printarea-created');

  // 2) add to campaign 2595 via + button
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href="/orders"]', { timeout: 20000, state: 'attached' });
  await page.goto('/campaigns/2595/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.waitForSelector('text=Initializing...', { state: 'detached', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.waitForSelector('text=Available Products', { timeout: 15000 });
  const plusBtn = page.locator('text=Available Products:').locator('..').locator('i[class*="plus" i], svg, button').last();
  await plusBtn.click({ timeout: 5000 });
  await page.waitForTimeout(1000);
  const modalSearch = page.locator('input[placeholder="Search" i]').last();
  await modalSearch.fill('QA-TEST-mockup2');
  await page.waitForTimeout(1500);
  const targetCard = page.locator('text=QA-TEST-mockup2-20260913').first();
  const targetCount = await targetCard.count();
  log.targetCount = targetCount;
  if (targetCount > 0) {
    await targetCard.click({ timeout: 5000 });
    await page.waitForTimeout(800);
  }
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(500);
  const productsAfter = await page.locator('text=Available Products:').locator('..').innerText().catch(() => '[err]');
  log.productsAfter = productsAfter;

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-04-RC-009B-setup-printarea-campaign');
  cap.detach();
});
