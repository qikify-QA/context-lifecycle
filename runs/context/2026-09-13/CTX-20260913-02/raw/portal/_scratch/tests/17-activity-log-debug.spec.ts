import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG activity logs page / product Logs link', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/products/3236/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Basic information', { timeout: 20000 });
  await page.waitForTimeout(800);
  const logsLink = page.getByText('Logs', { exact: true }).first();
  const logsCount = await logsLink.count();
  console.log('LOGS_LINK_COUNT', logsCount);
  if (logsCount > 0) {
    const respPromise = page.waitForResponse((r) => /log/i.test(r.url()), { timeout: 10000 }).catch(() => null);
    await logsLink.click({ timeout: 5000 });
    const resp = await respPromise;
    console.log('LOGS_API_STATUS', resp ? resp.status() : null, resp ? resp.url() : null);
    await page.waitForTimeout(4000);
    await screenshot(page, 'DEBUG-product-logs-modal');
    const modalText = await page.locator('.modal, [role="dialog"]').first().innerText().catch(() => '[err]');
    console.log('LOGS_MODAL_TEXT', modalText.slice(0, 2000));
  }
});
