import { test, expect } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

// CHK-02-008 (title boundary values: whitespace-only, XSS payload, very long)
// CHK-02-009 (which OTHER fields are actually server-required)
test('CHK-02-008 + CHK-02-009: product title boundary + create for reuse', async ({ page }) => {
  test.setTimeout(180000);
  const cap = new NetworkCapture(page);
  await page.goto('/products/new');
  await page.waitForLoadState('networkidle');

  // index 0 = global header search box; the real "Product title" input is the first
  // one inside the form body (pre-filled with "Example MUG" per KB v1).
  const titleInput = page.locator('input').nth(1);
  const debugFields = await page.locator('input, textarea').evaluateAll((els) =>
    els.map((el: any) => ({ tag: el.tagName, type: el.type, placeholder: el.placeholder, value: el.value, name: el.name, id: el.id })));
  console.log('DEBUG_FORM_FIELDS', JSON.stringify(debugFields));
  const debugButtons = await page.locator('button').allTextContents();
  console.log('DEBUG_BUTTONS', JSON.stringify(debugButtons));

  // --- case 1: whitespace-only title ---
  await titleInput.fill('   ');
  await screenshot(page, 'ACT-02-RC-008-001-before-save-whitespace');
  const saveBtn = page.getByRole('button', { name: /save/i }).first();
  await saveBtn.click();
  await page.waitForTimeout(1500);
  const toastWhitespace = await page.locator('.Toastify, [class*="toast" i]').allTextContents().catch(() => []);
  const urlAfterWhitespace = page.url();
  await screenshot(page, 'ACT-02-RC-008-002-after-save-whitespace');
  console.log('WHITESPACE_RESULT url=', urlAfterWhitespace, 'toast=', JSON.stringify(toastWhitespace));

  // --- case 2: XSS payload title (reload form fresh) ---
  await page.goto('/products/new');
  await page.waitForLoadState('networkidle');
  const titleInput2 = page.locator('input').nth(1);
  const xssPayload = '<script>alert(1)</script><img src=x onerror=alert(1)>';
  await titleInput2.fill(xssPayload);
  await screenshot(page, 'ACT-02-RC-008-003-before-save-xss');
  const saveBtn2 = page.getByRole('button', { name: /save/i }).first();
  const respPromise = page.waitForResponse((r) => r.url().includes('/api/products') && r.request().method() === 'POST', { timeout: 10000 }).catch(() => null);
  await saveBtn2.click();
  const resp = await respPromise;
  let xssStatus: number | null = null;
  if (resp) xssStatus = resp.status();
  await page.waitForTimeout(1500);
  const urlAfterXss = page.url();
  await screenshot(page, 'ACT-02-RC-008-004-after-save-xss');
  console.log('XSS_RESULT status=', xssStatus, 'url=', urlAfterXss);
  // If created, go check how title actually renders in Basic Information field + in list page (sanitized vs raw)
  let xssRenderedInInput: string | null = null;
  let xssRenderedInList: boolean | null = null;
  if (urlAfterXss.includes('/products/') && urlAfterXss.includes('/edit')) {
    const currentTitleVal = await page.locator('input').nth(1).inputValue().catch(() => null);
    xssRenderedInInput = currentTitleVal;
    // check DOM for actual <script> tag existing anywhere (real injection) vs escaped text
    const scriptTagCount = await page.locator('script:has-text("alert(1)")').count().catch(() => 0);
    console.log('XSS_LIVE_SCRIPT_TAG_COUNT=', scriptTagCount);
  }
  await screenshot(page, 'ACT-02-RC-008-005-xss-edit-page-state');

  // --- case 3: very long title (5000 chars) ---
  await page.goto('/products/new');
  await page.waitForLoadState('networkidle');
  const titleInput3 = page.locator('input').nth(1);
  const longTitle = 'A'.repeat(5000);
  await titleInput3.fill(longTitle);
  const actualFilledLength = (await titleInput3.inputValue()).length;
  console.log('LONG_TITLE_INPUT_ACCEPTED_LENGTH=', actualFilledLength);
  await screenshot(page, 'ACT-02-RC-008-006-before-save-longtitle');
  const saveBtn3 = page.getByRole('button', { name: /save/i }).first();
  const respPromise3 = page.waitForResponse((r) => r.url().includes('/api/products') && r.request().method() === 'POST', { timeout: 10000 }).catch(() => null);
  await saveBtn3.click();
  const resp3 = await respPromise3;
  const longTitleStatus = resp3 ? resp3.status() : null;
  await page.waitForTimeout(1500);
  const urlAfterLongTitle = page.url();
  await screenshot(page, 'ACT-02-RC-008-007-after-save-longtitle');
  console.log('LONGTITLE_RESULT status=', longTitleStatus, 'url=', urlAfterLongTitle);

  cap.writeToFile('ACT-02-RC-008-title-boundaries');
  cap.detach();
});

// Create reusable named QA-TEST product bases for later scenarios
test('SETUP: create reusable QA-TEST product bases', async ({ page }) => {
  const cap = new NetworkCapture(page);
  const names = [
    'QA-TEST-printarea-20260913',
    'QA-TEST-lifecycle-active-20260913',
    'QA-TEST-lifecycle-archive-20260913',
    'QA-TEST-campaign-link-20260913',
    'QA-TEST-sku-a-20260913',
    'QA-TEST-sku-b-20260913',
    'QA-TEST-mockup-20260913',
    'QA-TEST-filter-a-20260913',
    'QA-TEST-filter-b-20260913',
    'QA-TEST-basicinfo-20260913',
  ];
  const created: Record<string, string> = {};
  for (const name of names) {
    await page.goto('/products/new');
    await page.waitForLoadState('networkidle');
    const titleInput = page.locator('input').nth(1);
    await titleInput.fill(name);
    const saveBtn = page.getByRole('button', { name: /save/i }).first();
    const respPromise = page.waitForResponse((r) => r.url().includes('/api/products') && r.request().method() === 'POST', { timeout: 15000 }).catch(() => null);
    await saveBtn.click();
    const resp = await respPromise;
    await page.waitForTimeout(1000);
    const url = page.url();
    const match = url.match(/\/products\/(\d+)\/edit/);
    created[name] = match ? match[1] : `NOT_CREATED (status=${resp?.status()}, url=${url})`;
  }
  console.log('CREATED_QA_TEST_PRODUCTS', JSON.stringify(created, null, 2));
  cap.writeToFile('ACT-02-RC-SETUP-create-qa-test-products');
  cap.detach();
});
