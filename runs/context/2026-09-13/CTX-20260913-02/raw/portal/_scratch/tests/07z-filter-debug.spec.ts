import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG filter chip dropdown html', async ({ page }) => {
  test.setTimeout(40000);
  await page.goto('/products', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Product Bases', { timeout: 20000 });
  await page.waitForTimeout(1000);
  const chip = page.locator('text=/Internal name/').first();
  await chip.click({ timeout: 5000 });
  await page.waitForTimeout(600);
  await screenshot(page, 'DEBUG-filter-internal-name-open');
  const html = await chip.locator('xpath=ancestor::*[position()<=1]').first().evaluate((el) => {
    // walk up until we find something with an input descendant, or 6 levels
    let node: Element | null = el;
    for (let i = 0; i < 6 && node; i++) {
      if (node.querySelector('input')) return node.outerHTML.slice(0, 1500);
      node = node.parentElement;
    }
    return node ? node.outerHTML.slice(0, 1500) : 'not found';
  });
  console.log('CHIP_HTML', html);
});
