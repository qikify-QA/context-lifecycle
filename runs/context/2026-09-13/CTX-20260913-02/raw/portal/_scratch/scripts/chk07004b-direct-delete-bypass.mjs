// CHK-07-004b: bypass UI, goi THANG DELETE /api/products/{id} khi product dang duoc campaign dung.
// Muc dich: dong dut diem cau hoi P1 "server co thuc su chan hay chi la UI tu an nut xoa".
import fs from 'node:fs';
import path from 'node:path';

process.loadEnvFile(path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', '.env'));
const API_BASE = process.env.TIB_API_BASE ?? 'https://staging-api.teeinblue.com';
const RUN_ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..');
const authPath = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', 'playwright', '.auth', 'owner.json');
const state = JSON.parse(fs.readFileSync(authPath, 'utf8'));
const origin = state.origins.find((o) => o.origin.includes('staging-portal.teeinblue.com'));
const item = origin.localStorage.find((kv) => kv.name === 'teeinblue_token');
const jwt = JSON.parse(item.value)[0].token;

const H = { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' };

const entries = [];
async function record(method, url, opts, label) {
  const started = new Date().toISOString();
  const res = await fetch(url, opts);
  let bodyText = null;
  try { bodyText = await res.text(); } catch { /* noop */ }
  let bodyJson = null;
  try { bodyJson = JSON.parse(bodyText); } catch { /* not json */ }
  const respHeaders = {};
  res.headers.forEach((v, k) => { respHeaders[k] = k.toLowerCase() === 'set-cookie' ? '[REDACTED]' : v; });
  entries.push({
    label,
    timestamp: started,
    method,
    url,
    request_headers: { ...opts.headers, Authorization: '[REDACTED]' },
    request_body: opts.body ? (() => { try { return JSON.parse(opts.body); } catch { return '[non-json]'; } })() : null,
    response_status: res.status,
    response_headers: respHeaders,
    response_body: bodyJson !== null ? bodyJson : (bodyText ? bodyText.slice(0, 2000) : null),
  });
  return { res, bodyJson, bodyText };
}

async function gql(query, variables = {}, label) {
  return record('POST', 'https://staging-graphql.teeinblue.com/v1/graphql', {
    method: 'POST', headers: H, body: JSON.stringify({ operationName: 'op', variables, query }),
  }, label);
}

const results = {};

// 1) create QA-TEST product via REST (mirrors UI /products/new flow)
const createRes = await record('POST', `${API_BASE}/api/products`, {
  method: 'POST', headers: H, body: JSON.stringify({ title: 'QA-TEST-direct-delete-bypass-20260914' }),
}, 'create_product');
const productId = createRes.bodyJson?.data?.id ?? createRes.bodyJson?.id;
results.created_product_id = productId;
results.create_status = createRes.res.status;

if (!productId) {
  console.log('FAILED to create product, aborting', JSON.stringify(createRes.bodyJson));
  fs.writeFileSync(path.join(RUN_ROOT, 'network', 'ACT-07-RC-004B-direct-delete-bypass.json'), JSON.stringify({ act_id: 'ACT-07-RC-004B-direct-delete-bypass', entries }, null, 2));
  process.exit(1);
}

// 2) link to campaign 2595 (pre-existing QA test campaign) via GraphQL insert
const insertLink = await gql(
  `mutation op($object: campaign_products_insert_input!) { insert_campaign_products_one(object: $object) { id } }`,
  { object: { campaign_id: 2595, product_id: productId } },
  'link_to_campaign'
);
results.campaign_link_id = insertLink.bodyJson?.data?.insert_campaign_products_one?.id ?? null;
results.campaign_link_status = insertLink.res.status;
results.campaign_link_errors = insertLink.bodyJson?.errors ?? null;

// 3) confirm deletion-check reports blocked (for context, not the main point)
const checkRes = await record('GET', `${API_BASE}/api/products/${productId}/deletion-check`, { headers: H }, 'deletion_check_before_bypass');
results.deletion_check_status = checkRes.res.status;
results.deletion_check_body = checkRes.bodyJson;

// 4) THE MAIN POINT: call DELETE directly, bypassing any UI gate, while still linked to campaign
const deleteRes = await record('DELETE', `${API_BASE}/api/products/${productId}`, { headers: H }, 'DIRECT_DELETE_BYPASS_UI');
results.direct_delete_status = deleteRes.res.status;
results.direct_delete_body = deleteRes.bodyJson ?? deleteRes.bodyText;

// 5) verify actual outcome: does the product still exist?
const verifyRes = await gql(`query op($id: bigint!) { products_by_pk(id: $id) { id title } }`, { id: productId }, 'verify_product_exists_after');
results.product_still_exists_after_delete_call = !!verifyRes.bodyJson?.data?.products_by_pk;
results.verify_body = verifyRes.bodyJson;

console.log(JSON.stringify(results, null, 2));

fs.mkdirSync(path.join(RUN_ROOT, 'network'), { recursive: true });
fs.writeFileSync(
  path.join(RUN_ROOT, 'network', 'ACT-07-RC-004B-direct-delete-bypass.json'),
  JSON.stringify({ act_id: 'ACT-07-RC-004B-direct-delete-bypass', summary: results, entries }, null, 2)
);
console.log('WRITTEN raw/network/ACT-07-RC-004B-direct-delete-bypass.json');
