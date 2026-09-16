import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const CAMPAIGN_ID = '2595'; // QA Explore Campaign PB 01 (pre-existing QA test campaign)

test('CHK-08-008 + CHK-08-011: Select your product modal - add product, test Internal name/tags filters', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href="/orders"]', { timeout: 20000, state: 'attached' });
  await page.goto(`/campaigns/${CAMPAIGN_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.waitForSelector('text=Initializing...', { state: 'detached', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-08-RC-008-001-campaign-edit-loaded');

  const addMoreBtn = page.getByText(/add more product/i).first();
  const addMoreCount = await addMoreBtn.count();
  log.addMoreProductBtnFound = addMoreCount;
  if (addMoreCount === 0) {
    console.log('LOG', JSON.stringify(log, null, 2));
    cap.writeToFile('ACT-08-RC-008-select-product-modal');
    cap.detach();
    return;
  }
  await addMoreBtn.click({ timeout: 5000 });
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-08-RC-008-002-select-product-modal-open');

  // CHK-08-011: test Internal name filter inside modal (chip must be clicked to reveal input, same pattern as /products)
  await page.locator('text=/Internal name/').first().click({ timeout: 5000 });
  await page.waitForTimeout(400);
  const modalInternalNameInput = page.locator('input[placeholder="Find Internal name"]').first();
  const modalInternalNameCount = await modalInternalNameInput.count();
  log.modalInternalNameInputCount = modalInternalNameCount;
  if (modalInternalNameCount > 0) {
    await modalInternalNameInput.fill('ZEBRA');
    await page.waitForTimeout(1500);
    await screenshot(page, 'ACT-08-RC-011-001-modal-filter-internal-name-zebra');
    const cardTitles1 = await page.locator('[role="dialog"], .modal').first().locator('h5, h6, strong, b, [class*="title" i]').allTextContents().catch(() => []);
    log.modalTitlesAfterInternalNameFilter = cardTitles1.filter((t) => /QA-TEST/.test(t));
    await modalInternalNameInput.fill('');
    await page.waitForTimeout(1000);
  }
  await page.locator('text=/Internal tags/').first().click({ timeout: 8000 });
  await page.waitForTimeout(400);
  const modalInternalTagsInput = page.locator('input[placeholder="Find Internal tags"]').first();
  const modalInternalTagsCount = await modalInternalTagsInput.count();
  log.modalInternalTagsInputCount = modalInternalTagsCount;
  if (modalInternalTagsCount > 0) {
    await modalInternalTagsInput.fill('beta');
    await page.waitForTimeout(1500);
    await screenshot(page, 'ACT-08-RC-011-002-modal-filter-internal-tags-beta');
    const cardTitles2 = await page.locator('[role="dialog"], .modal').first().locator('h5, h6, strong, b, [class*="title" i]').allTextContents().catch(() => []);
    log.modalTitlesAfterInternalTagsFilter = cardTitles2.filter((t) => /QA-TEST/.test(t));
    await modalInternalTagsInput.fill('');
    await page.waitForTimeout(600);
    await page.keyboard.press('Escape');
  }

  // CHK-08-008: search for our target product and select it
  const modalSearch = page.locator('input[placeholder="Search" i]').last();
  const modalSearchCount = await modalSearch.count();
  log.modalSearchCount = modalSearchCount;
  if (modalSearchCount > 0) {
    await modalSearch.fill('QA-TEST-campaign-link');
    await page.waitForTimeout(1200);
  }
  await screenshot(page, 'ACT-08-RC-008-003-modal-search-target-product');
  const targetCheckbox = page.locator('text=QA-TEST-campaign-link').first();
  const targetFound = await targetCheckbox.count();
  log.targetProductFoundInModal = targetFound;
  if (targetFound > 0) {
    await targetCheckbox.click({ timeout: 5000 });
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'ACT-08-RC-008-004-after-select-target');

  const saveModalBtn = page.getByRole('button', { name: /save|add|select/i }).last();
  const respPromise = page.waitForResponse((r) => r.url().includes('graphql') || r.url().includes('campaign'), { timeout: 8000 }).catch(() => null);
  await saveModalBtn.click({ timeout: 5000 }).catch((e) => { log.saveModalClickError = e.message; });
  const resp = await respPromise;
  log.saveModalRespStatus = resp ? resp.status() : null;
  log.saveModalRespUrl = resp ? resp.url() : null;
  await page.waitForTimeout(1500);
  await screenshot(page, 'ACT-08-RC-008-005-after-save-modal');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-08-RC-008-select-product-modal');
  cap.detach();
});
