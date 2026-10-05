// Focused check: with default template (option 1, no extra required fields),
// click the teeinblue "Preview" button and inspect the resulting VISIBLE modal
// to classify static image lightbox vs live SVG artwork preview.
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const REPO_ROOT = '/Users/linhsmac/Documents/work/teeinblue-context-builder';
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));
const OUT_DIR = path.resolve(REPO_ROOT, 'runs/context/2026-09-21/CTX-20260921-01/raw/storefront');
const SCREEN_DIR = path.join(OUT_DIR, 'screenshots');
const STORE_PASSWORD = process.env.TIB_STORE_PASSWORD;
const HANDLE = 'qa-explore-campaign-pb-01';
const stores = [
  { key: 'store1', base: process.env.TIB_STORE_URL_1 },
  { key: 'store2', base: process.env.TIB_STORE_URL_2 },
];

async function run() {
  const results = {};
  for (const store of stores) {
    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
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
        if (!page.url().includes(HANDLE)) await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
      }
      await page.waitForTimeout(3000);
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

      // Click the teeinblue Preview button specifically (scoped to the tee-artwork-form container)
      const previewBtn = page.locator('#tee-artwork-form').getByRole('button', { name: /preview/i }).first();
      const found = await previewBtn.count();
      if (found > 0) {
        await previewBtn.click({ timeout: 10000 });
        await page.waitForTimeout(2000);
      }

      const inspection = await page.evaluate(() => {
        function isVisible(el) {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return r.width > 10 && r.height > 10 && style.visibility !== 'hidden' && style.display !== 'none';
        }
        const dialogs = Array.from(document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="Modal"]')).filter(isVisible);
        return dialogs.map((d) => ({
          tag: d.tagName,
          className: d.className,
          svgCount: d.querySelectorAll('svg').length,
          imgCount: d.querySelectorAll('img').length,
          canvasCount: d.querySelectorAll('canvas').length,
          dataLayerIdCount: d.querySelectorAll('[data-layer-id]').length,
          outerHtmlSample: d.outerHTML.slice(0, 1500),
        }));
      });
      await page.screenshot({ path: path.join(SCREEN_DIR, `${store.key}-preview-modal-focused.png`) });
      results[store.key] = { previewButtonFound: found, visibleDialogs: inspection };
    } catch (e) {
      results[store.key] = { error: String(e) };
    } finally {
      await browser.close();
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, '_preview-mechanism-check.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2).slice(0, 4000));
}
run();
