import { test } from '@playwright/test';

test('DEBUG toggle html', async ({ page }) => {
  test.setTimeout(30000);
  await page.goto('/products/3233/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Variants', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const label = page.locator('text=Custom variant\'s printarea').first();
  const html = await label.locator('..').locator('..').innerHTML().catch((e) => `ERR ${e.message}`);
  console.log('TOGGLE_HTML', html.slice(0, 1500));
});
