// Storefront SDK runtime check for CONFLICT-PORTAL-001 (CTX-20260921-01)
// Visits campaign 2595 product page on store1 and store2, classifies v1-like vs v2-like
// mechanism (personalization structure + artwork preview mechanism), captures evidence.
// Does NOT print the storefront password anywhere. Reads .env via process.loadEnvFile.
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = '/Users/linhsmac/Documents/work/teeinblue-context-builder';
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));

const OUT_DIR = path.resolve(REPO_ROOT, 'runs/context/2026-09-21/CTX-20260921-01/raw/storefront');
const SCREEN_DIR = path.join(OUT_DIR, 'screenshots');
const DOM_DIR = path.join(OUT_DIR, 'dom');
const NET_DIR = path.join(OUT_DIR, 'network');

const STORE_PASSWORD = process.env.TIB_STORE_PASSWORD;
const HANDLE = 'qa-explore-campaign-pb-01'; // campaign 2595 handle, from CTX-20260912-03 evidence

const stores = [
  { key: 'store1', base: process.env.TIB_STORE_URL_1, label: 'linh-explorer.myshopify.com' },
  { key: 'store2', base: process.env.TIB_STORE_URL_2, label: 'linh-explorer-2.myshopify.com' },
];

function redactUrl(u) {
  try {
    const url = new URL(u);
    if (url.searchParams.has('password')) url.searchParams.set('password', '[REDACTED]');
    return url.toString();
  } catch {
    return u;
  }
}

async function run() {
  const results = {};
  for (const store of stores) {
    if (!store.base) {
      results[store.key] = { error: `Missing env for ${store.key}` };
      continue;
    }
    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();

    const netLog = [];
    page.on('response', async (resp) => {
      try {
        const url = resp.url();
        if (
          url.includes('teeinblue.com') ||
          url.includes('/cart') ||
          url.includes('shopify/customization') ||
          url.includes('/products/') && url.includes('.json')
        ) {
          const req = resp.request();
          netLog.push({
            method: req.method(),
            url: redactUrl(url),
            status: resp.status(),
            resource_type: req.resourceType(),
          });
        }
      } catch {}
    });

    const productUrl = `${store.base.replace(/\/$/, '')}/products/${HANDLE}`;
    const stepLog = [];
    let stage = 'navigate';
    try {
      await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
      stepLog.push({ step: 'goto', url_requested: redactUrl(productUrl), landed_url: redactUrl(page.url()) });

      // Handle Shopify storefront password gate if present
      const isPasswordPage = /\/password/.test(page.url()) || (await page.locator('input[name="password"]').count()) > 0;
      stage = 'password_gate';
      if (isPasswordPage) {
        if (!STORE_PASSWORD) throw new Error('Password gate present but TIB_STORE_PASSWORD missing in .env');
        const pwField = page.locator('input[name="password"], input[type="password"]').first();
        await pwField.waitFor({ state: 'visible', timeout: 15000 });
        await pwField.fill(STORE_PASSWORD);
        await Promise.all([
          page.waitForNavigation({ timeout: 30000 }).catch(() => {}),
          page.locator('button[type="submit"], input[type="submit"]').first().click(),
        ]);
        stepLog.push({ step: 'password_submit', landed_url: redactUrl(page.url()) });
        // After unlock, re-navigate to the actual product URL in case we landed elsewhere
        if (!page.url().includes(HANDLE)) {
          await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
          stepLog.push({ step: 'renavigate_after_unlock', landed_url: redactUrl(page.url()) });
        }
      } else {
        stepLog.push({ step: 'password_gate', result: 'not_present_or_already_unlocked' });
      }

      stage = 'wait_widget';
      // Wait generously for the teeinblue widget to mount
      await page.waitForTimeout(4000);
      await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

      stage = 'inspect';
      const inspection = await page.evaluate(() => {
        function q(sel) { return Array.from(document.querySelectorAll(sel)); }
        const scriptSrcs = q('script[src]').map((s) => s.src).filter((s) => s.includes('teeinblue') || s.includes('-sdk.'));
        const widgetRoots = q('[class*="tee-campaign"], [class*="teeinblue"], [id*="teeinblue"]').map((el) => ({
          tag: el.tagName,
          id: el.id || null,
          className: (el.className && el.className.toString) ? el.className.toString() : String(el.className),
        }));
        const svgLayerEls = q('svg [data-layer-id], [data-layer-id] svg, svg[data-layer-id]');
        const svgLayerIdSample = svgLayerEls.slice(0, 10).map((el) => el.getAttribute && el.getAttribute('data-layer-id')).filter(Boolean);
        const lightboxEls = q('[class*="lightbox"], [class*="modal"][class*="mockup"], [class*="preview-popup"]');
        const radiogroups = q('[role="radiogroup"]');
        const radiogroupInfo = radiogroups.map((rg) => {
          const radios = rg.querySelectorAll('[role="radio"], input[type="radio"]');
          const nestedRadiogroups = rg.querySelectorAll('[role="radiogroup"]');
          return {
            aria_label: rg.getAttribute('aria-label') || rg.getAttribute('aria-labelledby') || null,
            direct_option_count: radios.length,
            nested_radiogroup_count: nestedRadiogroups.length,
            class_name: rg.className ? rg.className.toString() : null,
          };
        });
        const clipartLikeEls = q('[class*="clipart"], [class*="thumbnail"][class*="option"], [data-clipart-id], [data-group-id]');
        const groupedClipartEls = q('[class*="grouped_clipart"], [class*="grouped-clipart"], [data-group-id]');
        const priceEls = q('[class*="price"]').slice(0, 5).map((el) => (el.innerText || '').trim()).filter(Boolean);
        const atcButtons = q('button').filter((b) => /add to cart|personalize/i.test(b.innerText || '')).map((b) => (b.innerText || '').trim());
        return {
          title: document.title,
          bodyClassSample: document.body.className,
          scriptSrcs,
          widgetRootsCount: widgetRoots.length,
          widgetRootsSample: widgetRoots.slice(0, 5),
          svgLayerElsCount: svgLayerEls.length,
          svgLayerIdSample,
          lightboxElsCount: lightboxEls.length,
          radiogroupCount: radiogroups.length,
          radiogroupInfo: radiogroupInfo.slice(0, 10),
          clipartLikeElsCount: clipartLikeEls.length,
          groupedClipartElsCount: groupedClipartEls.length,
          priceElsSample: priceEls,
          atcButtons,
        };
      });

      stage = 'screenshot';
      await page.screenshot({ path: path.join(SCREEN_DIR, `${store.key}-product-page.png`), fullPage: false });

      stage = 'dom_dump';
      const bodyHtml = await page.evaluate(() => document.body.innerHTML);
      fs.writeFileSync(path.join(DOM_DIR, `${store.key}-body.html`), bodyHtml.slice(0, 500000));

      // Attempt a meaningful interaction: click first clickable option-like element within personalization form, then check preview change
      stage = 'interact';
      let interaction = { attempted: false };
      try {
        const optionCandidate = page.locator('[role="radio"], [class*="clipart"] img, [class*="clipart"] button, [data-clipart-id]').first();
        const count = await optionCandidate.count();
        if (count > 0) {
          const beforeShot = path.join(SCREEN_DIR, `${store.key}-before-select.png`);
          await page.screenshot({ path: beforeShot });
          await optionCandidate.click({ timeout: 10000 }).catch((e) => { interaction.click_error = String(e); });
          await page.waitForTimeout(1500);
          const afterShot = path.join(SCREEN_DIR, `${store.key}-after-select.png`);
          await page.screenshot({ path: afterShot });
          interaction = {
            attempted: true,
            before_screenshot: beforeShot,
            after_screenshot: afterShot,
            selected_element_outer_html_sample: await optionCandidate.evaluate((el) => el.outerHTML.slice(0, 300)).catch(() => null),
          };
        } else {
          interaction = { attempted: false, reason: 'no radio/clipart-like clickable option found' };
        }
      } catch (e) {
        interaction.error = String(e);
      }

      fs.writeFileSync(path.join(NET_DIR, `${store.key}-network-log.json`), JSON.stringify(netLog, null, 2));

      results[store.key] = {
        store_url: redactUrl(store.base),
        product_url: redactUrl(productUrl),
        stepLog,
        inspection,
        interaction,
        net_summary: netLog.slice(0, 40),
      };
    } catch (e) {
      results[store.key] = { error: String(e), stage, stepLog };
    } finally {
      await browser.close();
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, '_sdk-runtime-check-raw.json'), JSON.stringify(results, null, 2));
  console.log('DONE');
  console.log(JSON.stringify({
    store1_summary: results.store1 && !results.store1.error ? {
      scriptSrcs: results.store1.inspection.scriptSrcs,
      radiogroupCount: results.store1.inspection.radiogroupCount,
      radiogroupInfo: results.store1.inspection.radiogroupInfo,
      svgLayerElsCount: results.store1.inspection.svgLayerElsCount,
      lightboxElsCount: results.store1.inspection.lightboxElsCount,
      widgetRootsSample: results.store1.inspection.widgetRootsSample,
    } : results.store1,
    store2_summary: results.store2 && !results.store2.error ? {
      scriptSrcs: results.store2.inspection.scriptSrcs,
      radiogroupCount: results.store2.inspection.radiogroupCount,
      radiogroupInfo: results.store2.inspection.radiogroupInfo,
      svgLayerElsCount: results.store2.inspection.svgLayerElsCount,
      lightboxElsCount: results.store2.inspection.lightboxElsCount,
      widgetRootsSample: results.store2.inspection.widgetRootsSample,
    } : results.store2,
  }, null, 2));
}

run();
