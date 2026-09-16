// Final cleanup for CTX-20260913-02: remove campaign_products link added during CHK-08-008 test,
// then delete all remaining QA-TEST-* product bases created during this run.
import fs from 'node:fs';
import path from 'node:path';

process.loadEnvFile(path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', '.env'));
const API_BASE = process.env.TIB_API_BASE ?? 'https://staging-api.teeinblue.com';
const authPath = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', 'playwright', '.auth', 'owner.json');
const state = JSON.parse(fs.readFileSync(authPath, 'utf8'));
const origin = state.origins.find((o) => o.origin.includes('staging-portal.teeinblue.com'));
const item = origin.localStorage.find((kv) => kv.name === 'teeinblue_token');
const jwt = JSON.parse(item.value)[0].token;

async function gql(query, variables = {}) {
  const res = await fetch('https://staging-graphql.teeinblue.com/v1/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName: 'op', variables, query }),
  });
  return { status: res.status, body: await res.json() };
}

const results = {};

// 1) remove campaign_products link (id 4057) added during CHK-08-008 test on campaign 2595
const removeLink = await gql(
  `mutation op($id: bigint!) { delete_campaign_products(where: {id: {_eq: $id}}) { affected_rows } }`,
  { id: 4057 }
);
results.remove_campaign_link_4057 = removeLink.body;

// 2) delete remaining QA-TEST-* product bases
const ids = [3233, 3235, 3236, 3237, 3238, 3239, 3240, 3241, 3242];
for (const id of ids) {
  try {
    const checkRes = await fetch(`${API_BASE}/api/products/${id}/deletion-check`, { headers: { Authorization: `Bearer ${jwt}` } });
    const checkBody = await checkRes.json().catch(() => null);
    const delRes = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${jwt}` } });
    results[id] = { deletion_check_status: checkRes.status, policy: checkBody?.policy ?? null, reason: checkBody?.reason ?? null, delete_status: delRes.status };
  } catch (e) {
    results[id] = { error: e.message };
  }
}

console.log(JSON.stringify(results, null, 2));
