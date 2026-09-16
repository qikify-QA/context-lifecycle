// Cleanup helper: DELETE throwaway QA test products created during exploration,
// via direct REST call (KB v1: deletion-check then DELETE /api/products/{id} -> 204).
// Usage: node cleanup-products.mjs <id1> <id2> ...
import fs from 'node:fs';
import path from 'node:path';

process.loadEnvFile(path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', '.env'));
const API_BASE = process.env.TIB_API_BASE ?? 'https://staging-api.teeinblue.com';
const authPath = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', 'playwright', '.auth', 'owner.json');
const state = JSON.parse(fs.readFileSync(authPath, 'utf8'));
const origin = state.origins.find((o) => o.origin.includes('staging-portal.teeinblue.com'));
const item = origin.localStorage.find((kv) => kv.name === 'teeinblue_token');
const jwt = JSON.parse(item.value)[0].token;

const ids = process.argv.slice(2);
const results = {};
for (const id of ids) {
  try {
    const checkRes = await fetch(`${API_BASE}/api/products/${id}/deletion-check`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const checkBody = await checkRes.json().catch(() => null);
    const delRes = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${jwt}` },
    });
    results[id] = { deletion_check_status: checkRes.status, deletion_check_policy: checkBody?.policy ?? null, delete_status: delRes.status };
  } catch (e) {
    results[id] = { error: e.message };
  }
}
console.log(JSON.stringify(results, null, 2));
