import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('DEBUG variant add click - full trace', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const consoleMsgs: string[] = [];
  page.on('console', (m) => consoleMsgs.push(`[${m.type()}] ${m.text()}`));
  await page.goto('/products/3233/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Variants', { timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /new variant/i }).click({ timeout: 5000 });
  await page.waitForTimeout(500);
  await page.getByPlaceholder('SKU').first().fill('QA-TEST-SKU-001');
  await page.getByPlaceholder('Color').first().fill('Black');
  await page.getByPlaceholder('Size').first().fill('M');
  await page.getByPlaceholder('0.00').first().fill('19.99').catch(() => {});
  await screenshot(page, 'DEBUG-variant-before-add-click');

  // find every element with visible text exactly "Add"
  const candidates = await page.locator('button, [role="button"], a, div, span').evaluateAll((els) =>
    els.filter((el) => (el.textContent || '').trim() === 'Add' && (el as HTMLElement).offsetParent !== null)
      .map((el) => ({ tag: el.tagName, class: el.className, outer: el.outerHTML.slice(0, 200) })));
  console.log('ADD_CANDIDATES', JSON.stringify(candidates, null, 2));

  const addEl = page.locator('button[title="Add"]').first();
  await addEl.scrollIntoViewIfNeeded();
  await addEl.click({ timeout: 5000 });
  await page.waitForTimeout(2500);
  await screenshot(page, 'DEBUG-variant-after-add-click');
  const gridRowCount = await page.locator('td', { hasText: 'QA-TEST-SKU-001' }).count();
  console.log('GRID_ROW_COUNT_AFTER', gridRowCount);
  console.log('CONSOLE_MSGS', JSON.stringify(consoleMsgs.slice(-20)));

  cap.writeToFile('DEBUG-variant-add-trace');
  cap.detach();
});
