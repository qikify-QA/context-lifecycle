import { test } from '@playwright/test';
import { screenshot } from '../helpers/evidence';

test('DEBUG mockup card actions (Edit/Duplicate/More)', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/products/3243/edit', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(3000);
  await screenshot(page, 'DEBUG-mockup-card-before-actions');

  // hover over the mockup card thumbnail to reveal any hover-only action icons
  const thumb = page.locator('img').filter({ hasNot: page.locator('nothing') }).nth(0);
  await page.mouse.move(950, 320);
  await page.waitForTimeout(500);
  await screenshot(page, 'DEBUG-mockup-card-hover');
  const allIconsAfterHover = await page.locator('i[class*="la-"], svg').evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return { tag: e.tagName, cls: e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className, x: Math.round(r.x), y: Math.round(r.y), visible: r.width > 0 };
    }).filter((i) => i.x > 850 && i.y > 250 && i.y < 420 && i.visible)
  );
  console.log('ICONS_AFTER_HOVER', JSON.stringify(allIconsAfterHover));
});
