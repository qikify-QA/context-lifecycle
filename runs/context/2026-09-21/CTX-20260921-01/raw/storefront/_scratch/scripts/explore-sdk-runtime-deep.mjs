// Deep-dive follow up: for each store, select template option 2 (non-default),
// observe whether main gallery mockup updates live (v2-like) vs stays static until
// Preview click (v1-like), inspect the Preview popup mechanism (static image vs SVG),
// then attempt add-to-cart, verify cart, and clean up (remove line item).
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const REPO_ROOT = '/Users/linhsmac/Documents/work/teeinblue-context-builder';
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));

const OUT_DIR = path.resolve(REPO_ROOT, 'runs/context/2026-09-21/CTX-20260921-01/raw/storefront');
const SCREEN_DIR = path.join(OUT_DIR, 'screenshots');
const NET_DIR = path.join(OUT_DIR, 'network');

const STORE_PASSWORD = process.env.TIB_STORE_PASSWORD;
const HANDLE = 'qa-explore-campaign-pb-01';

const stores = [
  { key: 'store1', base: process.env.TIB_STORE_URL_1 },
  { key: 'store2', base: process.env.TIB_STORE_URL_2 },
];

function redactUrl(u) {
  try {
    const url = new URL(u);
    if (url.searchParams.has('password')) url.searchParams.set('password', '[REDACTED]');
    return url.toString();
  } catch { return u; }
}

async function run() {
  const results = {};
  for (const store of stores) {
    if (!store.base) { results[store.key] = { error: 'missing env' }; continue; }
    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const netLog = [];
    page.on('response', (resp) => {
      const url = resp.url();
      if (url.includes('teeinblue') || url.includes('/cart') ) {
        netLog.push({ method: resp.request().method(), url: redactUrl(url), status: resp.status() });
      }
    });

    const stepLog = [];
    const productUrl = `${store.base.replace(/\/$/, '')}/products/${HANDLE}`;
    try {
      await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
      if (/\/password/.test(page.url())) {
        const pwField = page.locator('input[name="password"], input[type="password"]').first();
        await pwField.waitFor({ state: 'visible', timeout: 15000 });
        await pwField.fill(STORE_PASSWORD);
        await Promise.all([
          page.waitForNavigation({ timeout: 30000 }).catch(() => {}),
          page.locator('button[type="submit"], input[type="submit"]').first().click(),
        ]);
        if (!page.url().includes(HANDLE)) {
          await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
        }
      }
      await page.waitForTimeout(3000);
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

      // Screenshot BEFORE selecting option 2 (baseline, option 1 default selected)
      await page.screenshot({ path: path.join(SCREEN_DIR, `${store.key}-deep-00-baseline.png`) });

      // Select template option 2 (id ends with template-578330)
      const opt2 = page.locator('label[for="4081-template-template-578330"]');
      const opt2Count = await opt2.count();
      stepLog.push({ step: 'locate_option_2', found: opt2Count });
      if (opt2Count > 0) {
        await opt2.click({ force: true });
        stepLog.push({ step: 'click_option_2', ok: true });
        // Immediately screenshot -- no Preview click yet -- to see if gallery mockup already updated live
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(SCREEN_DIR, `${store.key}-deep-01-after-option2-no-preview-click.png`) });
        await page.waitForTimeout(1500);
        await page.screenshot({ path: path.join(SCREEN_DIR, `${store.key}-deep-02-after-option2-settled.png`) });
      }

      // Click Preview button, inspect the popup mechanism
      const previewBtn = page.getByRole('button', { name: /preview/i }).first();
      const previewCount = await previewBtn.count();
      stepLog.push({ step: 'locate_preview_button', found: previewCount });
      if (previewCount > 0) {
        await previewBtn.click({ timeout: 10000 }).catch((e) => stepLog.push({ step: 'preview_click_error', error: String(e) }));
        await page.waitForTimeout(1500);
        const popupInspection = await page.evaluate(() => {
          function q(sel) { return Array.from(document.querySelectorAll(sel)); }
          const svgs = q('[class*="modal"] svg, [class*="popup"] svg, [role="dialog"] svg, [class*="lightbox"] svg');
          const imgs = q('[class*="modal"] img, [class*="popup"] img, [role="dialog"] img');
          const dialog = document.querySelector('[role="dialog"]');
          return {
            svgCountInModal: svgs.length,
            imgCountInModal: imgs.length,
            dialogPresent: !!dialog,
            dialogClass: dialog ? dialog.className : null,
            dialogOuterHtmlSample: dialog ? dialog.outerHTML.slice(0, 800) : null,
          };
        });
        stepLog.push({ step: 'popup_inspection', ...popupInspection });
        await page.screenshot({ path: path.join(SCREEN_DIR, `${store.key}-deep-03-preview-popup.png`) });
        // Try closing popup (Escape)
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(500);
      }

      // Attempt Add to Cart
      const atcBtn = page.getByRole('button', { name: /^add to cart$/i }).first();
      const atcCount = await atcBtn.count();
      stepLog.push({ step: 'locate_atc', found: atcCount });
      let atcOutcome = 'NOT_ATTEMPTED';
      if (atcCount > 0) {
        const beforeUrl = page.url();
        await atcBtn.click({ timeout: 10000 }).catch((e) => stepLog.push({ step: 'atc_click_error', error: String(e) }));
        await page.waitForTimeout(2500);
        await page.screenshot({ path: path.join(SCREEN_DIR, `${store.key}-deep-04-after-atc-click.png`) });
        const bodyText = await page.locator('body').innerText().catch(() => '');
        const hasError = /error|required|please select|fail/i.test(bodyText.slice(0, 3000));
        atcOutcome = { bodyTextSample: bodyText.slice(0, 2000), possibleErrorTextFound: hasError };

        // Check cart via /cart.json (safe read-only)
        const cartResp = await page.evaluate(async () => {
          const r = await fetch('/cart.json');
          return { status: r.status, body: await r.json() };
        }).catch((e) => ({ error: String(e) }));
        stepLog.push({ step: 'cart_json_check', cart: cartResp });

        // Cleanup: if cart has items, clear it via /cart/clear.json (safe, reversible - empties cart only, no order)
        if (cartResp && cartResp.body && cartResp.body.item_count > 0) {
          const clearResp = await page.evaluate(async () => {
            const r = await fetch('/cart/clear.js', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            return { status: r.status, body: await r.json() };
          }).catch((e) => ({ error: String(e) }));
          stepLog.push({ step: 'cleanup_cart_clear', result: clearResp });
        }
      }

      fs.writeFileSync(path.join(NET_DIR, `${store.key}-deep-network-log.json`), JSON.stringify(netLog, null, 2));
      results[store.key] = { stepLog, atcOutcome };
    } catch (e) {
      results[store.key] = { error: String(e), stepLog };
    } finally {
      await browser.close();
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, '_sdk-runtime-deep-check-raw.json'), JSON.stringify(results, null, 2));
  console.log('DEEP_DONE');
  console.log(JSON.stringify(results, null, 2).slice(0, 6000));
}

run();
