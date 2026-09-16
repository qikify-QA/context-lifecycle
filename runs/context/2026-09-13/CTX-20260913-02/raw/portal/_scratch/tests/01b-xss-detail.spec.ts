import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

test('CHK-02-008 detail: why does XSS-payload title not POST', async ({ page }) => {
  test.setTimeout(120000);
  const cap = new NetworkCapture(page);
  const cases = [
    { name: 'plain-valid', title: 'QA-XSS-plain-valid-20260913' },
    { name: 'html-no-script', title: '<b>bold</b> plain text' },
    { name: 'script-tag-only', title: '<script>alert(1)</script>' },
  ];
  const results: Record<string, unknown> = {};
  for (const c of cases) {
    await page.goto('/products/new');
    await page.waitForLoadState('networkidle');
    const titleInput = page.locator('input').nth(1);
    await titleInput.fill(c.title);
    const saveBtn = page.getByRole('button', { name: /save/i }).first();
    const isDisabled = await saveBtn.isDisabled().catch(() => null);
    const ariaDisabled = await saveBtn.getAttribute('aria-disabled').catch(() => null);
    const consoleErrors: string[] = [];
    const handler = (msg: any) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); };
    page.on('console', handler);
    const respPromise = page.waitForResponse((r) => r.url().includes('/api/products') && r.request().method() === 'POST', { timeout: 6000 }).catch(() => null);
    await saveBtn.click({ force: true });
    const resp = await respPromise;
    await page.waitForTimeout(1000);
    page.off('console', handler);
    const urlAfter = page.url();
    const fieldValueAfter = await titleInput.inputValue().catch(() => null);
    const inlineErrorTexts = await page.locator('[class*="error" i], [class*="invalid" i]').allTextContents().catch(() => []);
    await screenshot(page, `ACT-02-RC-008-XSS-detail-${c.name}`);
    results[c.name] = {
      title_input: c.title,
      save_button_disabled: isDisabled,
      save_button_aria_disabled: ariaDisabled,
      posted: !!resp,
      response_status: resp ? resp.status() : null,
      url_after: urlAfter,
      field_value_after_click: fieldValueAfter,
      inline_error_texts: inlineErrorTexts,
      console_errors: consoleErrors,
    };
  }
  console.log('XSS_DETAIL_RESULTS', JSON.stringify(results, null, 2));
  cap.writeToFile('ACT-02-RC-008-xss-detail');
  cap.detach();
});
