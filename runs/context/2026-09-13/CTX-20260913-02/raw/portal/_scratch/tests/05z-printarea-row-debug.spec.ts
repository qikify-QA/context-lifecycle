import { test } from '@playwright/test';

test('DEBUG printarea row html', async ({ page }) => {
  test.setTimeout(40000);
  await page.goto('/products/3233/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=13989', { timeout: 20000 });
  await page.waitForTimeout(1000);
  const rowHtml = await page.locator('.printarea.mb-2', { hasText: '13989' }).first().innerHTML();
  console.log('ROW_FULL', rowHtml);
});
