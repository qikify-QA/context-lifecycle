import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('CHK-06-010: mockup card actions Edit/Duplicate/More via coordinate click', async ({ page }) => {
  test.setTimeout(90000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForSelector('img[src*="cdn.ownego.com"][src*="/products/3243/"]', { timeout: 20000 }).catch(async () => {
    log.mockupImageWaitFailed = true;
  });
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-06-RC-010-000-before');

  // find the mockup preview image's bounding box, then probe points relative to it
  const img = page.locator('img').filter({ hasNotText: '' });
  const imgBoxes = await page.locator('div.card, div[class*="mockup" i] img, img').evaluateAll((els) =>
    els.map((e) => { const r = e.getBoundingClientRect(); return { src: (e as HTMLImageElement).src?.slice(-40), x: r.x, y: r.y, w: r.width, h: r.height }; })
      .filter((r) => r.w > 30 && r.x > 850)
  );
  log.imgBoxes = imgBoxes;
  console.log('IMG_BOXES', JSON.stringify(imgBoxes, null, 2));

  if (imgBoxes.length > 0) {
    const box = imgBoxes[0];
    const topY = box.y + 3; // icon row overlaps top edge of the image
    const points = [
      { name: 'checkbox', x: box.x + 10, y: topY },
      { name: 'p1', x: box.x + box.w * 0.6, y: topY },
      { name: 'p2', x: box.x + box.w * 0.75, y: topY },
      { name: 'p3', x: box.x + box.w * 0.9, y: topY },
    ];
    const info = await page.evaluate((pts) => pts.map((p) => {
      const el = document.elementFromPoint(p.x, p.y);
      return { name: p.name, x: p.x, y: p.y, tag: el?.tagName, cls: el?.className, title: el?.getAttribute('title'), outer: el?.outerHTML?.slice(0, 200) };
    }), points);
    log.pointInfo = info;
    console.log('POINT_INFO', JSON.stringify(info, null, 2));
  }

  cap.writeToFile('ACT-06-RC-010-point-probe');
  cap.detach();
});
