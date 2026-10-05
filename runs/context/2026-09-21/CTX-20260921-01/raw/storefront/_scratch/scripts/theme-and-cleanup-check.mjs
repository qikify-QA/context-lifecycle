import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
const REPO_ROOT = '/Users/linhsmac/Documents/work/teeinblue-context-builder';
process.loadEnvFile(path.resolve(REPO_ROOT, '.env'));
const OUT_DIR = path.resolve(REPO_ROOT, 'runs/context/2026-09-21/CTX-20260921-01/raw/storefront');
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
    const context = await browser.newContext();
    const page = await context.newPage();
    const productUrl = `${store.base.replace(/\/$/, '')}/products/${HANDLE}`;
    await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (/\/password/.test(page.url())) {
      const pwField = page.locator('input[name="password"], input[type="password"]').first();
      await pwField.waitFor({ state: 'visible', timeout: 15000 });
      await pwField.fill(STORE_PASSWORD);
      await Promise.all([
        page.waitForNavigation({ timeout: 30000 }).catch(() => {}),
        page.locator('button[type="submit"], input[type="submit"]').first().click(),
      ]);
    }
    const theme = await page.evaluate(() => ({
      shopifyTheme: window.Shopify && window.Shopify.theme ? window.Shopify.theme : null,
      shopifyShop: window.Shopify ? window.Shopify.shop : null,
      shopifyLocale: window.Shopify ? window.Shopify.locale : null,
      shopifyCountry: window.Shopify ? window.Shopify.country : null,
      shopifyCurrency: window.Shopify ? window.Shopify.currency : null,
    })).catch((e) => ({ error: String(e) }));
    const cartCheck = await page.evaluate(async () => {
      const r = await fetch('/cart.json');
      return r.json();
    }).catch((e) => ({ error: String(e) }));
    results[store.key] = { theme, cart_item_count: cartCheck.item_count, cart_items: cartCheck.items };
    await browser.close();
  }
  fs.writeFileSync(path.join(OUT_DIR, '_theme-and-cleanup-check.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}
run();
