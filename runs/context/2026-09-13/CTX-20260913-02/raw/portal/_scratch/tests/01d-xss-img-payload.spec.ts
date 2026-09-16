import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-02-008 detail: img onerror payload (no literal <script>) - does it pass and render unescaped', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  await page.goto('/products/new');
  await page.waitForLoadState('networkidle');
  const titleInput = page.locator('input').nth(1);
  const payload = '<img src=x onerror="window.__QA_XSS_FIRED=true">';
  await titleInput.fill(payload);
  const saveBtn = page.getByRole('button', { name: /save/i }).first();
  const respPromise = page.waitForResponse((r) => r.url().includes('/api/products') && r.request().method() === 'POST', { timeout: 8000 }).catch(() => null);
  await saveBtn.click({ force: true });
  const resp = await respPromise;
  await page.waitForTimeout(1000);
  const status = resp ? resp.status() : null;
  const urlAfter = page.url();
  console.log('IMG_PAYLOAD posted=', !!resp, 'status=', status, 'url=', urlAfter);

  if (urlAfter.includes('/edit')) {
    // go to list, search for it, check if onerror actually fires (dangerouslySetInnerHTML would execute it once inserted)
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.locator('input[placeholder="Search" i]').last().fill('QA_XSS');
    await page.waitForTimeout(300);
    await page.locator('input[placeholder="Search" i]').last().fill('img src=x');
    await page.waitForTimeout(1500);
    const fired = await page.evaluate(() => (window as any).__QA_XSS_FIRED === true);
    console.log('XSS_ONERROR_FIRED_ON_LIST_PAGE=', fired);
    await screenshot(page, 'ACT-02-RC-008-xss-img-payload-list');
  }
  cap.writeToFile('ACT-02-RC-008-xss-img-payload');
  cap.detach();
});
