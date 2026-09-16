import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('CHK-02-008 detail: does stored HTML title render unescaped anywhere', async ({ page }) => {
  test.setTimeout(60000);
  // product 3231 was created with title "<b>bold</b> plain text"
  await page.goto('/products');
  await page.waitForLoadState('networkidle');
  await page.locator('input[placeholder="Search" i]').last().fill('plain text');
  await page.waitForTimeout(1200);
  const rowHtml = await page.locator('table, [class*="list" i]').first().innerHTML().catch(() => '[no table found]');
  const hasRealBoldTag = rowHtml.includes('<b>bold</b>');
  const hasEscapedText = rowHtml.includes('&lt;b&gt;bold&lt;/b&gt;') || rowHtml.includes('<b>bold</b> plain text'.replace(/</g, '&lt;'));
  console.log('LIST_PAGE_RAW_HTML_TAG_PRESENT=', hasRealBoldTag, 'ESCAPED_PRESENT=', hasEscapedText);
  await screenshot(page, 'ACT-02-RC-008-xss-render-list');

  await page.goto('/products/3231/edit');
  await page.waitForLoadState('networkidle');
  const titleVal = await page.locator('input').nth(1).inputValue();
  console.log('EDIT_PAGE_TITLE_INPUT_VALUE=', JSON.stringify(titleVal));
  await screenshot(page, 'ACT-02-RC-008-xss-render-edit');
});
