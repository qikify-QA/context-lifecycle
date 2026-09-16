import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-03-004: clear Product title in Basic information (edit page), Save, capture verbatim error', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto('/products/3242/edit', { waitUntil: 'domcontentloaded' }); // QA-TEST-basicinfo
  await page.waitForSelector('text=Basic information', { timeout: 20000 });
  await page.waitForTimeout(800);
  const titleInput = page.locator('input').nth(1);
  const before = await titleInput.inputValue();
  log.titleBefore = before;
  await titleInput.fill('');
  await screenshot(page, 'ACT-03-RC-004-001-title-cleared');
  const saveBtn = page.getByRole('button', { name: /save/i }).first();
  const respPromise = page.waitForResponse((r) => r.url().includes('/api/products/') && r.request().method() === 'PUT', { timeout: 8000 }).catch(() => null);
  await saveBtn.click({ timeout: 5000 });
  const resp = await respPromise;
  log.respStatus = resp ? resp.status() : null;
  let respBody: unknown = null;
  if (resp) { try { respBody = await resp.json(); } catch { respBody = await resp.text().catch(() => null); } }
  log.respBody = respBody;
  await page.waitForTimeout(1200);
  const toastTexts = await page.locator('.vue-notification, [class*="toast" i]').allTextContents().catch(() => []);
  log.toastTexts = toastTexts;
  await screenshot(page, 'ACT-03-RC-004-002-after-save-empty-title');
  const urlAfter = page.url();
  log.urlAfter = urlAfter;

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-03-RC-004-clear-title-save');
  cap.detach();
});
