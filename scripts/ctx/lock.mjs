#!/usr/bin/env node
// CLI cho lock theo object (contract §16).
//
//   node scripts/ctx/lock.mjs acquire --run CTX-... --product <key> --objects a,b [--proposal CBS-n] [--ttl 7200]
//   node scripts/ctx/lock.mjs verify  --run CTX-... --product <key> --objects a,b
//   node scripts/ctx/lock.mjs release --run CTX-... --product <key> --objects a,b
//   node scripts/ctx/lock.mjs acquire --run CTX-... --name _manifest     (lock global, vd khi sinh manifest)
//
// In JSON kết quả. Exit 0 = OK, 2 = CONFLICT/lock không còn thuộc run, 1 = input sai.

import { parseArgs } from "../lib/fs-utils.mjs";
import { acquireAll, verifyAll, releaseAll, DEFAULT_TTL_SECONDS } from "../lib/locks.mjs";

async function main() {
  const args = parseArgs();
  const [action] = args._;
  if (!["acquire", "verify", "release"].includes(action) || typeof args.run !== "string") {
    console.error("Dùng: lock.mjs acquire|verify|release --run CTX-... (--product <key> --objects a,b | --name <lock>)");
    process.exit(1);
  }
  let keys;
  if (typeof args.name === "string") keys = [args.name];
  else if (typeof args.product === "string" && typeof args.objects === "string") {
    keys = args.objects.split(",").map((o) => o.trim()).filter(Boolean).map((object) => ({ product: args.product, object }));
  } else {
    console.error("Cần --product + --objects, hoặc --name");
    process.exit(1);
  }
  const opts = { ctxRunId: args.run };
  let result;
  if (action === "acquire") {
    result = await acquireAll(keys, {
      ...opts,
      proposalId: typeof args.proposal === "string" ? args.proposal : null,
      ttlSeconds: args.ttl ? Number(args.ttl) : DEFAULT_TTL_SECONDS
    });
  } else if (action === "verify") result = await verifyAll(keys, opts);
  else result = { ok: true, released: await releaseAll(keys, opts) };
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 2);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
