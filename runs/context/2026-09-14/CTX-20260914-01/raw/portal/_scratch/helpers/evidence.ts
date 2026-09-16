import fs from 'node:fs';
import path from 'node:path';
import type { Page, Request, Response } from '@playwright/test';

// Helper dùng chung cho các spec trong run CTX-20260914-01 (RECONCILE).
// Sao chép/điều chỉnh từ helper của run CTX-20260913-02. Chỉ ghi vào
// raw/portal/ và raw/network/ (contract §5).

const RUN_ROOT = path.resolve(__dirname, '..', '..', '..');
const NETWORK_DIR = path.join(RUN_ROOT, 'network');
const PORTAL_DIR = path.join(RUN_ROOT, 'portal');
const SCREENSHOT_DIR = path.join(PORTAL_DIR, 'screenshots');

const REDACT_HEADERS = new Set([
  'authorization', 'cookie', 'set-cookie', 'x-api-key', 'x-shopify-access-token',
]);
const REDACT_FIELD_SUBSTR = [
  'token', 'password', 'secret', 'api_key', 'access_token', 'refresh_token', 'signature', 'hmac',
  'email', 'phone', 'address', 'customer', 'buyer_name', 'ship_to', 'bill_to',
];
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

function redactStringValue(v: string): string {
  if (EMAIL_RE.test(v)) return v.replace(EMAIL_RE, '[REDACTED]');
  return v;
}

function redactHeaders(headers: Record<string, string> | undefined) {
  if (!headers) return headers;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) {
    out[k] = REDACT_HEADERS.has(k.toLowerCase()) ? '[REDACTED]' : v;
  }
  return out;
}

function redactBodyDeep(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(redactBodyDeep);
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const lower = k.toLowerCase();
      if (REDACT_FIELD_SUBSTR.some((f) => lower.includes(f))) {
        out[k] = '[REDACTED]';
      } else {
        out[k] = redactBodyDeep(v);
      }
    }
    return out;
  }
  if (typeof value === 'string') return redactStringValue(value);
  return value;
}

export function redactBodyString(raw: string | null): unknown {
  if (raw == null) return null;
  try {
    const parsed = JSON.parse(raw);
    return redactBodyDeep(parsed);
  } catch {
    return `[non-json body, length=${raw.length}]`;
  }
}

export interface CapturedEntry {
  url: string;
  method: string;
  request_headers: Record<string, string> | undefined;
  request_body: unknown;
  response_status: number | null;
  response_headers: Record<string, string> | undefined;
  response_body: unknown;
  resource_type: string;
  timestamp: string;
}

export class NetworkCapture {
  entries: CapturedEntry[] = [];
  private page: Page;
  private onResp = async (res: Response) => {
    try {
      const req = res.request();
      const rt = req.resourceType();
      if (['font', 'stylesheet', 'media'].includes(rt)) return;
      let reqBody: unknown = null;
      try { reqBody = redactBodyString(req.postData()); } catch { /* noop */ }
      let resBody: unknown = null;
      try {
        const ct = res.headers()['content-type'] || '';
        if (ct.includes('json') || ct.includes('text')) {
          const text = await res.text();
          resBody = redactBodyString(text);
        } else {
          resBody = `[binary/non-text body, content-type=${ct}]`;
        }
      } catch (e) {
        resBody = `[unreadable response body: ${(e as Error).message}]`;
      }
      this.entries.push({
        url: res.url(),
        method: req.method(),
        request_headers: redactHeaders(req.headers()),
        request_body: reqBody,
        response_status: res.status(),
        response_headers: redactHeaders(res.headers()),
        response_body: resBody,
        resource_type: rt,
        timestamp: new Date().toISOString(),
      });
    } catch {
      // best-effort capture
    }
  };

  constructor(page: Page) {
    this.page = page;
    this.page.on('response', this.onResp);
  }

  clear() {
    this.entries = [];
  }

  detach() {
    this.page.off('response', this.onResp);
  }

  writeToFile(actId: string) {
    fs.mkdirSync(NETWORK_DIR, { recursive: true });
    const filePath = path.join(NETWORK_DIR, `${actId}.json`);
    fs.writeFileSync(filePath, JSON.stringify({ act_id: actId, entries: this.entries }, null, 2));
    return path.relative(RUN_ROOT, filePath);
  }
}

export async function screenshot(page: Page, name: string) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const filePath = path.join(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  return path.relative(RUN_ROOT, filePath);
}

export function decodeJwtSub(rawTokenJson: string): { sub: string; user_id: string; iss: string; exp: number; iat: number } {
  const arr = JSON.parse(rawTokenJson);
  const jwt = arr[0].token as string;
  const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('utf8'));
  return { sub: String(payload.sub), user_id: String(payload.user_id), iss: payload.iss, exp: payload.exp, iat: payload.iat };
}

export async function getTokenPayload(page: Page) {
  const raw = await page.evaluate(() => localStorage.getItem('teeinblue_token'));
  if (!raw) return null;
  return decodeJwtSub(raw);
}
