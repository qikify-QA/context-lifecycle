import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG mockup card structure', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/products/3243/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /upload/i }).first().click({ timeout: 5000 });
  await page.waitForSelector('text=900x700', { timeout: 15000 });
  await page.waitForTimeout(800);
  const html = await page.locator('text=900x700').first().evaluate((el) => {
    let node: Element | null = el;
    for (let i = 0; i < 6 && node; i++) {
      if (node.querySelector('input[type="checkbox"]')) return node.outerHTML.slice(0, 800);
      node = node.parentElement;
    }
    return 'not found';
  });
  console.log('CARD_HTML', html);
});
