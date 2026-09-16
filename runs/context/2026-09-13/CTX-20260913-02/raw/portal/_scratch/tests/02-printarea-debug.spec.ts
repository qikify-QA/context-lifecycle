import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG: printarea + variant section structure', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/products/3233/edit');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  const headings = await page.locator('h1,h2,h3,h4,[class*="section-title" i], [class*="heading" i]').allTextContents();
  console.log('HEADINGS', JSON.stringify(headings));
  await screenshot(page, 'DEBUG-printarea-page-top');
  // scroll down progressively and screenshot to find printarea section
  for (let i = 1; i <= 6; i++) {
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(300);
    await screenshot(page, `DEBUG-printarea-scroll-${i}`);
  }
});
