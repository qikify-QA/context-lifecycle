import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PRODUCT_ID = '3233';

test('DEBUG cp dropdown html', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  await page.goto(`/products/${PRODUCT_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('th:has-text("Fulfilled SKU")', { timeout: 20000 });
  await page.waitForTimeout(1000);
  const headerCells = await page.locator('th').allTextContents();
  const cpHeaderIndex = headerCells.findIndex((h) => /custom.*printarea/i.test(h));
  const dataRow = page.locator('tr', { hasText: 'QA-TEST-SKU-001' }).first();
  const cell = dataRow.locator('td').nth(cpHeaderIndex);
  await cell.scrollIntoViewIfNeeded();
  await cell.click({ timeout: 5000 });
  await page.waitForTimeout(1000);
  const popupHtml = await page.locator('body').evaluate(() => {
    const all = Array.from(document.querySelectorAll('*')).filter((el) =>
      (el.textContent || '').includes('1400x1400'));
    // keep only the smallest (leaf-most) matches: no child of this element also matches
    const leafMost = all.filter((el) => !Array.from(el.children).some((c) => (c.textContent || '').includes('1400x1400')));
    return leafMost.map((el) => ({ tag: el.tagName, outer: el.outerHTML.slice(0, 400), parentOuter: el.parentElement ? el.parentElement.outerHTML.slice(0, 600) : null }));
  });
  console.log('POPUP_HTML', JSON.stringify(popupHtml, null, 2).slice(0, 3000));
  cap.writeToFile('DEBUG-cp-dropdown');
  cap.detach();
});
