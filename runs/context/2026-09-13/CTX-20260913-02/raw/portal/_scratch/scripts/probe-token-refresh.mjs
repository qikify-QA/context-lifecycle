// Probe truc tiep POST /api/token/refresh de lay iss claim thu 2 (CONF-002),
// vi khong the cho that 15 phut TTL trong phien nay. Day la GOI TRUC TIEP tu script,
// KHONG phai portal tu dong trigger qua UI - ghi ro trong evidence, dung suy dien
// thanh "portal auto-refresh behavior" neu chi co data point nay.
import fs from 'node:fs';
import path from 'node:path';

process.loadEnvFile(path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', '.env'));

const API_BASE = process.env.TIB_API_BASE ?? 'https://staging-api.teeinblue.com';
const RUN_ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..');
const authPath = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', 'playwright', '.auth', 'owner.json');

const state = JSON.parse(fs.readFileSync(authPath, 'utf8'));
const origin = state.origins.find((o) => o.origin.includes('staging-portal.teeinblue.com'));
const item = origin.localStorage.find((kv) => kv.name === 'teeinblue_token');
const arr = JSON.parse(item.value);
const jwt = arr[0].token;

function decode(t) {
  const payload = JSON.parse(Buffer.from(t.split('.')[1], 'base64').toString('utf8'));
  return payload;
}

const before = decode(jwt);

const res = await fetch(`${API_BASE}/api/token/refresh`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
});

const status = res.status;
let bodyText = await res.text();
let bodyJson = null;
try { bodyJson = JSON.parse(bodyText); } catch { /* not json */ }

let newIss = null, newSub = null, newExp = null, newIat = null;
let newToken = null;
if (bodyJson) {
  // try common shapes
  newToken = bodyJson.token || bodyJson.access_token || (bodyJson.data && bodyJson.data.token) || null;
  if (newToken) {
    const p = decode(newToken);
    newIss = p.iss; newSub = p.sub; newExp = p.exp; newIat = p.iat;
  }
}

const evidence = {
  act_id: 'ACT-03-RC-CONF002-001',
  description: 'Direct POST /api/token/refresh probe (script-invoked, not organic UI trigger) to obtain a second iss data point for CONF-002 without waiting full 15min TTL',
  request: {
    method: 'POST',
    url: `${API_BASE}/api/token/refresh`,
    headers: { Authorization: '[REDACTED]', 'Content-Type': 'application/json' },
  },
  response: {
    status,
    body_shape_keys: bodyJson ? Object.keys(bodyJson) : null,
    body_redacted: bodyJson ? redact(bodyJson) : `[non-json: length=${bodyText.length}]`,
  },
  before_token_claims: { sub: before.sub, user_id: before.user_id, iss: before.iss, iat: before.iat, exp: before.exp },
  after_token_claims: newToken ? { sub: newSub, iss: newIss, iat: newIat, exp: newExp } : null,
  observed_result: newToken ? 'refresh endpoint returned a new token' : `refresh endpoint returned status ${status}, no usable token field found in response body`,
};

function redact(obj) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(redact);
  if (typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const lower = k.toLowerCase();
      if (['token', 'access_token', 'refresh_token', 'password', 'secret', 'signature', 'hmac'].some((f) => lower.includes(f))) {
        out[k] = '[REDACTED]';
      } else {
        out[k] = redact(v);
      }
    }
    return out;
  }
  return obj;
}

fs.mkdirSync(path.join(RUN_ROOT, 'network'), { recursive: true });
fs.writeFileSync(path.join(RUN_ROOT, 'network', 'ACT-03-RC-CONF002-001.json'), JSON.stringify(evidence, null, 2));

console.log('status:', status);
console.log('before.iss:', before.sub, before.iss);
console.log('after.iss:', newToken ? newIss : '(no new token in response)');
console.log('written: raw/network/ACT-03-RC-CONF002-001.json');
