// Lock theo object (contract §16). Exclusive-create nguyên tử; claim hết hoặc
// không claim gì; lock hết TTL coi như free.

import { open, readFile, writeFile, unlink, mkdir, rename, rmdir } from "node:fs/promises";
import path from "node:path";
import { lockFile, locksDir as defaultLocksDir } from "./run-layout.mjs";

export const DEFAULT_TTL_SECONDS = 7200;

async function readLock(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return null;
  }
}

export function isExpired(lock, now = Date.now()) {
  if (!lock?.claimed_at) return true;
  const ttl = (lock.ttl_seconds ?? DEFAULT_TTL_SECONDS) * 1000;
  return Date.parse(lock.claimed_at) + ttl <= now;
}

async function createExclusive(file, body) {
  const fh = await open(file, "wx");
  try {
    await fh.writeFile(JSON.stringify(body, null, 2) + "\n");
  } finally {
    await fh.close();
  }
}

/**
 * Claim lock cho mọi `keys` (mỗi key là `{product, object}` hoặc chuỗi tên lock).
 * Trả { ok: true, claimed, warnings } hoặc { ok: false, conflict: {key, held_by}, warnings }.
 * Thất bại ở một key → release mọi lock vừa claim trong lần gọi này.
 */
async function acquireUnlocked(keys, { ctxRunId, proposalId = null, ttlSeconds = DEFAULT_TTL_SECONDS, dir = defaultLocksDir, now = Date.now() } = {}) {
  await mkdir(dir, { recursive: true });
  const claimed = [];
  const warnings = [];
  const created = [];
  const body = { proposal_id: proposalId, ctx_run_id: ctxRunId, claimed_at: new Date(now).toISOString(), ttl_seconds: ttlSeconds, pid: process.pid };
  for (const key of keys) {
    const file = fileFor(key, dir);
    try {
      await createExclusive(file, body);
      claimed.push(file);
      created.push(file);
      continue;
    } catch (e) {
      if (e.code !== "EEXIST") throw e;
    }
    const held = await readLock(file);
    if (held?.ctx_run_id === ctxRunId) {
      // Cùng run claim lại = gia hạn TTL; giữ proposal_id cũ nếu lần này không truyền.
      await writeFile(file, JSON.stringify({ ...body, proposal_id: proposalId ?? held.proposal_id ?? null }, null, 2) + "\n");
      claimed.push(file);
      continue;
    }
    if (isExpired(held, now)) {
      // Chiếm lại lock hết hạn: đổi tên file cũ trước để hai run cùng chiếm không giẫm nhau.
      const stale = `${file}.stale-${process.pid}-${now}`;
      try {
        await rename(file, stale);
        await unlink(stale);
        await createExclusive(file, body);
        claimed.push(file);
        created.push(file);
        warnings.push(`lock ${path.basename(file)} hết hạn (run ${held?.ctx_run_id ?? "?"} có thể đã crash) — đã claim lại`);
        continue;
      } catch {
        /* run khác chiếm trước — rơi xuống nhánh conflict */
      }
    }
    await releaseFiles(created, ctxRunId);
    return { ok: false, conflict: { lock: path.basename(file), held_by: (await readLock(file)) ?? held }, warnings };
  }
  return { ok: true, claimed: claimed.map((f) => path.basename(f)), warnings };
}

/** Mọi lock trong `keys` vẫn thuộc `ctxRunId` và chưa hết hạn. */
async function verifyUnlocked(keys, { ctxRunId, dir = defaultLocksDir, now = Date.now() } = {}) {
  const problems = [];
  for (const key of keys) {
    const file = fileFor(key, dir);
    const held = await readLock(file);
    if (!held) problems.push({ lock: path.basename(file), problem: "không tồn tại" });
    else if (held.ctx_run_id !== ctxRunId) problems.push({ lock: path.basename(file), problem: `thuộc run ${held.ctx_run_id}` });
    else if (isExpired(held, now)) problems.push({ lock: path.basename(file), problem: "đã hết TTL" });
  }
  return { ok: problems.length === 0, problems };
}

/** Release các lock trong `keys` thuộc `ctxRunId`. Lock của run khác không bị đụng. */
async function releaseUnlocked(keys, { ctxRunId, dir = defaultLocksDir } = {}) {
  return releaseFiles(keys.map((k) => fileFor(k, dir)), ctxRunId);
}

async function releaseFiles(files, ctxRunId) {
  const released = [];
  for (const file of files) {
    const held = await readLock(file);
    if (held && held.ctx_run_id !== ctxRunId) continue;
    try {
      await unlink(file);
      released.push(path.basename(file));
    } catch {
      /* đã không còn */
    }
  }
  return released;
}

function fileFor(key, dir) {
  if (typeof key === "string") return path.join(dir, key.endsWith(".lock") ? key : `${key}.lock`);
  return lockFile(key.product, key.object, dir);
}

// Serialize every lock-store operation, including renewal, takeover and release.
// Never reclaim an unreadable/half-written store guard automatically: fail closed.
async function withStoreGuard(dir, action) {
  await mkdir(dir,{recursive:true});
  const guard=path.join(dir,'.operations-lock');
  const deadline=Date.now()+5000;
  while(true){
    try{await mkdir(guard);break;}catch(e){
      if(e.code!=='EEXIST')throw e;
      if(Date.now()>=deadline)throw new Error('lock_store_busy: inspect .operations-lock for a crashed writer; do not delete a live guard');
      await new Promise(resolve=>setTimeout(resolve,10));
    }
  }
  try{return await action();}finally{await rmdir(guard);}
}
export function acquireAll(keys,opts={}) {
  if(!keys.length)throw new Error('Empty lock set');
  return withStoreGuard(opts.dir??defaultLocksDir,()=>acquireUnlocked(keys,opts));
}
export function verifyAll(keys,opts={}) {
  if(!keys.length)throw new Error('Empty lock set');
  return withStoreGuard(opts.dir??defaultLocksDir,()=>verifyUnlocked(keys,opts));
}
export function releaseAll(keys,opts={}) {
  if(!keys.length)return Promise.resolve([]);
  return withStoreGuard(opts.dir??defaultLocksDir,()=>releaseUnlocked(keys,opts));
}
