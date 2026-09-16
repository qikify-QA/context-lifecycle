import { test } from '@playwright/test';
import { NetworkCapture, screenshot } from '../helpers/evidence';

const PID = '3243';

test('CHK-06-007: observe polling while mockup Rendering, then click refresh icon', async ({ page }) => {
  test.setTimeout(60000);
  const cap = new NetworkCapture(page);
  const log: Record<string, unknown> = {};
  await page.goto(`/products/${PID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Mockup', { timeout: 20000 });
  await page.waitForTimeout(1000);
  await screenshot(page, 'ACT-06-RC-007-010-mockup-rendering-state');

  const beforeCount = (await cap.entries.length);
  log.beforeCount = beforeCount;
  // wait 8s WITHOUT any interaction, observe if any polling requests fire on their own
  await page.waitForTimeout(8000);
  const afterWaitCount = cap.entries.length;
  log.afterWaitCount = afterWaitCount;
  log.entriesDuringWait = cap.entries.slice(beforeCount, afterWaitCount).map(e => ({ method: e.method, url: e.url.slice(0, 90), status: e.response_status }));

  // click refresh icon
  const refreshIcon = page.locator('.la-sync').first();
  const refreshCount = await refreshIcon.count();
  log.refreshIconCount = refreshCount;
  const respPromise = page.waitForResponse((r) => r.url().includes('graphql') || /mockup/.test(r.url()), { timeout: 8000 }).catch(() => null);
  await refreshIcon.click({ timeout: 5000 });
  const resp = await respPromise;
  log.refreshRespStatus = resp ? resp.status() : null;
  log.refreshRespUrl = resp ? resp.url() : null;
  await page.waitForTimeout(2000);
  await screenshot(page, 'ACT-06-RC-007-011-after-refresh-click');
  const bodyText = await page.locator('body').innerText();
  log.stillRendering = bodyText.includes('Rendering');

  console.log('LOG', JSON.stringify(log, null, 2));
  cap.writeToFile('ACT-06-RC-007-polling-refresh');
  cap.detach();
});
