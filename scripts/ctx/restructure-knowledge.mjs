#!/usr/bin/env node
// Tách / gộp / chuyển object và feature trong knowledge/ theo một file mapping
// (contract §5 "Độ hạt object/feature"). Chỉ đổi vị trí — không đổi statement,
// nguồn, scope, test steps hay số lượng KB/check/OQ. Mặc định chỉ preview;
// `--apply` ghi knowledge/ qua cùng lock, base hash, backup và rollback của
// applyDataMaintenance (publish-apply.mjs).
//
//   node scripts/ctx/restructure-knowledge.mjs --mapping <file.json> [--apply]
//
// Mapping:
// {
//   "product": "teeinblue",
//   "date": "2026-11-12",                                  (tuỳ chọn, mặc định hôm nay)
//   "new_objects": { "artwork-editor": { "label": "Artwork editor — thao tác canvas" } },
//   "operations": [
//     { "op": "move",  "from": "artwork/layer-bulk-edit", "to": "artwork-editor/layer-bulk-edit" },
//     { "op": "merge", "sources": ["artwork/psd-import", "artwork/mcp-artwork-tools"],
//       "into": "artwork/artwork-import", "name": "...", "user_goal": "..." },
//     { "op": "split", "from": "artwork/layer-config-image", "parts": [
//         { "to": "artwork-layer-config/gen-ai-layer-config", "name": "...", "user_goal": "...",
//           "kb_ids": ["KB-1"], "topic_match": ["Gen AI|Flux|Text to Image"] },
//         { "to": "artwork-layer-config/image-layer-config", "rest": true } ] },
//     { "op": "move_object_kb", "from": "artwork", "to": "artwork-editor", "kb_ids": ["KB-002"] },
//     { "op": "dissolve", "object": "admin-panel", "alias_to": "admin-ops" }
//   ]
// }
// `move` vào feature đã có = gộp. Object hết feature và hết KB object-level bị
// xoá; key cũ thành alias của object nhận nhiều KB nhất (hoặc `alias_to`).

import { mkdtemp, cp, readFile, writeFile, mkdir, rm, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { walk, parseArgs, readJson, today } from "../lib/fs-utils.mjs";
import { rootDir } from "../lib/run-layout.mjs";
import { kbIndex, resolveKbRef, referenceFields, canonicalKbRef } from "../lib/kb-references.mjs";
import { extractOpenQuestions } from "../lib/open-questions.mjs";
import { digest } from "../lib/review-state.mjs";
import { auditDir } from "./audit-preview.mjs";
import { applyDataMaintenance } from "./publish-apply.mjs";

const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const clone = (v) => structuredClone(v);
const humanize = (k) => k.replace(/-/g, " ");
const isRef = (v) => v && typeof v === "object" && v.__ref === true;
const addr = (s) => {
  const m = /^([a-z0-9][a-z0-9-]*)\/([a-z0-9][a-z0-9-]*)$/.exec(String(s ?? ""));
  if (!m) throw new Error(`địa chỉ feature không hợp lệ: ${s} (cần <object>/<feature>)`);
  return { o: m[1], f: m[2], key: `${m[1]}/${m[2]}` };
};

// ---------------------------------------------------------------- load

async function readMaybe(file) {
  try {
    return await readFile(file, "utf8");
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw e;
  }
}
const parseMaybe = (text, fallback) => (text === null ? fallback : JSON.parse(text));
// Thư mục có khoảng trắng là bản sao iCloud ("x 2"): không phải object/feature thật.
const realDirs = async (dir) => {
  try {
    return (await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory() && !e.name.includes(" ")).map((e) => e.name).sort();
  } catch {
    return [];
  }
};

export async function loadProduct(dir) {
  const objects = new Map();
  for (const key of await realDirs(dir)) {
    if (key.startsWith("_")) continue;
    const o = path.join(dir, key);
    const oqText = await readMaybe(path.join(o, "open-questions.md"));
    const obj = {
      key,
      isNew: false,
      kb: parseMaybe(await readMaybe(path.join(o, "kb.json")), []),
      meta: parseMaybe(await readMaybe(path.join(o, "publish-meta.json")), null),
      summary: await readMaybe(path.join(o, "feature-summary.md")),
      changelog: await readMaybe(path.join(o, "CHANGELOG.md")),
      oqHeader: oqText?.startsWith("# ") ? oqText.split("\n")[0].split(/\s##\s/)[0].trim() : `# Open Questions — ${key}`,
      oqs: extractOpenQuestions(oqText ?? ""),
      features: new Map(),
      kbMoved: false
    };
    for (const f of await realDirs(path.join(o, "features"))) {
      obj.features.set(f, {
        kb: parseMaybe(await readMaybe(path.join(o, "features", f, "kb.json")), []),
        profile: parseMaybe(await readMaybe(path.join(o, "features", f, "profile.json")), null),
        checklist: parseMaybe(await readMaybe(path.join(o, "checklists", `${f}.json`)), null),
        moved: false,
        origin: [`${key}/${f}`]
      });
    }
    objects.set(key, obj);
  }
  return {
    objects,
    registry: parseMaybe(await readMaybe(path.join(dir, "_registry.json")), { objects: [] }),
    productKb: parseMaybe(await readMaybe(path.join(dir, "_product-kb.json")), null)
  };
}

// ---------------------------------------------------------------- references

function shardsOf(model) {
  const shards = [];
  for (const [o, obj] of model.objects) {
    shards.push({ object: o, feature: null, items: obj.kb });
    for (const [f, e] of obj.features) shards.push({ object: o, feature: f, items: e.kb });
  }
  if (model.productKb) shards.push({ object: "_product-level", feature: null, items: model.productKb });
  return shards;
}

/** Thay mọi KB reference bằng placeholder {orig, key} theo ngữ cảnh gốc của file. */
function captureRefs(model, index) {
  const capture = (value, object, feature) =>
    referenceFields(value, (array, i, ref, field, ancestors) => {
      let key = null;
      try {
        key = resolveKbRef(ref, { object, feature, index, ancestors, field }).key;
      } catch {
        key = null;
      }
      array[i] = { __ref: true, orig: ref, key };
    });
  for (const [o, obj] of model.objects) {
    for (const it of obj.kb) capture(it, o, null);
    for (const [f, e] of obj.features) {
      for (const it of e.kb) capture(it, o, f);
      if (e.profile) capture(e.profile, o, f);
      if (e.checklist) capture(e.checklist, o, f);
    }
  }
  if (model.productKb) for (const it of model.productKb) capture(it, "_product-level", null);
}

function refsIn(value, out = new Set()) {
  if (isRef(value)) {
    if (value.key) out.add(value.key);
  } else if (Array.isArray(value)) value.forEach((v) => refsIn(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => refsIn(v, out));
  return out;
}

function releaseRefs(value, moved, reloc, problems, where) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (isRef(value[i])) value[i] = finalRef(value[i], moved, reloc, problems, where);
      else releaseRefs(value[i], moved, reloc, problems, where);
    }
  } else if (value && typeof value === "object") for (const v of Object.values(value)) releaseRefs(v, moved, reloc, problems, where);
}
function finalRef(ref, moved, reloc, problems, where) {
  if (!ref.key) {
    if (moved) problems.push(`${where}: reference ${ref.orig} không resolve được — chạy repair-knowledge.mjs trước`);
    return ref.orig;
  }
  const next = reloc.get(ref.key) ?? ref.key;
  return moved || next !== ref.key ? next : ref.orig;
}

// ---------------------------------------------------------------- operations

function remapCheckIds(value, map) {
  if (Array.isArray(value)) return value.forEach((v) => remapCheckIds(v, map));
  if (!value || typeof value !== "object") return;
  for (const [k, v] of Object.entries(value)) {
    if (["check_ids", "related_check_ids"].includes(k) && Array.isArray(v)) value[k] = v.map((id) => map.get(id) ?? id);
    else remapCheckIds(v, map);
  }
}
const chkNumber = (id) => Number(/(\d+)$/.exec(id ?? "")?.[1] ?? 0);

export function restructure(model, mapping, { product, date }) {
  const events = [];
  const kbReloc = new Map(); // old canonical KB key → new
  const featureDest = new Map(); // "o/f" cũ → {o,f}
  const checkDest = new Map(); // "o/f#CHK" cũ → {o,f,check_id}
  const received = new Map(); // object cũ → Map(object mới → số KB)
  const removedAliasTo = new Map();
  const touched = new Set();
  const newObjects = mapping.new_objects ?? {};

  const object = (key, create = false) => {
    if (!SLUG.test(key) || key.startsWith("_")) throw new Error(`object_key không hợp lệ: ${key}`);
    let obj = model.objects.get(key);
    if (!obj && create) {
      if (!newObjects[key]?.label) throw new Error(`object mới ${key} phải khai label trong new_objects`);
      obj = { key, isNew: true, kb: [], meta: null, summary: null, changelog: null, oqHeader: `# Open Questions — ${key}`, oqs: [], features: new Map(), kbMoved: false };
      model.objects.set(key, obj);
      events.push({ kind: "object_created", object: key });
    }
    if (!obj) throw new Error(`object không tồn tại: ${key}`);
    return obj;
  };
  const take = (a) => {
    const obj = object(a.o);
    const e = obj.features.get(a.f);
    if (!e) throw new Error(`feature không tồn tại: ${a.key}`);
    obj.features.delete(a.f);
    touched.add(a.o);
    return e;
  };
  const featureIdFor = (o, f) => {
    const nums = [...object(o).features.values()].map((e) => Number(/^FEAT-(\d+)/.exec(e.profile?.feature_id ?? "")?.[1] ?? 0));
    return `FEAT-${String(Math.max(0, ...nums) + 1).padStart(2, "0")}-${f}`;
  };
  const note = (from, to, n) => {
    if (from === to) return;
    const m = received.get(from) ?? new Map();
    m.set(to, (m.get(to) ?? 0) + n);
    received.set(from, m);
  };

  /** Đặt các mảnh vào đích; mảnh đầu là base (giữ profile/checklist của nó). */
  function place(dest, pieces, { name, user_goal } = {}) {
    const target = object(dest.o, true);
    const existing = target.features.get(dest.f);
    if (existing) pieces = [{ src: dest.key, entry: existing, existing: true }, ...pieces];
    touched.add(dest.o);
    const [base, ...rest] = pieces;
    const out = {
      kb: [...base.entry.kb],
      profile: base.entry.profile ? clone(base.entry.profile) : null,
      checklist: base.entry.checklist ? clone(base.entry.checklist) : null,
      moved: !base.existing || pieces.length > 1 || base.src !== dest.key,
      origin: pieces.flatMap((p) => p.entry.origin)
    };
    const ids = new Set(out.kb.map((i) => i.kb_id));
    const usedChecks = new Set((out.checklist?.checks ?? []).map((c) => c.check_id));
    for (const p of rest) {
      for (const it of p.entry.kb) {
        if (ids.has(it.kb_id)) throw new Error(`trùng kb_id ${it.kb_id} khi gộp vào ${dest.key} — đổi mapping`);
        ids.add(it.kb_id);
        out.kb.push(it);
      }
      if (p.entry.profile) {
        if (!out.profile) out.profile = clone(p.entry.profile);
        else for (const [k, v] of Object.entries(p.entry.profile)) if (Array.isArray(v) && Array.isArray(out.profile[k])) out.profile[k] = [...out.profile[k], ...clone(v)];
      }
      if (p.entry.checklist) {
        const cl = clone(p.entry.checklist);
        const renumber = new Map();
        for (const c of cl.checks ?? []) {
          if (!usedChecks.has(c.check_id)) {
            usedChecks.add(c.check_id);
            continue;
          }
          const next = `CHK-${String(Math.max(0, ...[...usedChecks].map(chkNumber)) + 1).padStart(3, "0")}`;
          renumber.set(c.check_id, next);
          c.previous_check_id = { feature_key: p.src.split("/")[1], check_id: c.check_id };
          c.check_id = next;
          usedChecks.add(next);
        }
        remapCheckIds(cl, renumber);
        for (const [oldId, newId] of renumber) checkDest.set(`${p.src}#${oldId}`, { ...dest, check_id: newId });
        if (!out.checklist) out.checklist = cl;
        else for (const [k, v] of Object.entries(cl)) if (Array.isArray(v) && Array.isArray(out.checklist[k])) out.checklist[k] = [...out.checklist[k], ...v];
      }
    }
    if (out.profile) {
      if (out.moved && (out.profile.feature_key !== dest.f || base.src.split("/")[0] !== dest.o)) out.profile.feature_id = featureIdFor(dest.o, dest.f);
      out.profile.feature_key = dest.f;
      if (name) out.profile.name = name;
      if (user_goal) out.profile.user_goal = user_goal;
    }
    if (out.checklist) {
      out.checklist.feature_key = dest.f;
      if ("object_id" in out.checklist) out.checklist.object_id = dest.o;
      if (out.profile?.feature_id && "feature_id" in out.checklist) out.checklist.feature_id = out.profile.feature_id;
    }
    for (const p of pieces) {
      const [so, sf] = p.src.split("/");
      for (const it of p.entry.kb) {
        const from = canonicalKbRef(so, sf, it.kb_id), to = canonicalKbRef(dest.o, dest.f, it.kb_id);
        if (from !== to) kbReloc.set(from, to);
      }
      for (const c of p.entry.checklist?.checks ?? []) if (!checkDest.has(`${p.src}#${c.check_id}`)) checkDest.set(`${p.src}#${c.check_id}`, { ...dest, check_id: c.check_id });
      if (!p.partial && p.src !== dest.key) featureDest.set(p.src, dest);
      note(so, dest.o, p.entry.kb.length);
    }
    target.features.set(dest.f, out);
    events.push({ kind: "feature_placed", to: dest.key, from: pieces.map((p) => p.src), kb: out.kb.length, checks: out.checklist?.checks?.length ?? 0 });
  }

  function split(op) {
    const from = addr(op.from);
    const src = take(from);
    const parts = (op.parts ?? []).map((p) => ({ ...p, dest: addr(p.to), kb: [], checks: [], keys: new Set() }));
    const rest = parts.filter((p) => p.rest);
    if (rest.length !== 1 || parts.length < 2) throw new Error(`split ${from.key}: cần ≥2 part và đúng 1 part "rest": true`);
    const patterns = parts.map((p) => (p.topic_match ?? []).map((r) => new RegExp(r, "i")));
    const partOf = (it) =>
      parts.find((p) => (p.kb_ids ?? []).includes(it.kb_id)) ??
      parts.find((p, i) => !p.rest && patterns[i].some((re) => re.test(`${it.topic ?? ""} ${it.statement ?? ""}`))) ??
      rest[0];
    for (const it of src.kb) {
      const p = partOf(it);
      p.kb.push(it);
      p.keys.add(canonicalKbRef(from.o, from.f, it.kb_id));
    }
    const groups = new Map();
    for (const p of parts) for (const it of p.kb) if (it.conflict_group) (groups.get(it.conflict_group) ?? groups.set(it.conflict_group, new Set()).get(it.conflict_group)).add(p.dest.o);
    for (const [g, objs] of groups) if (objs.size > 1) throw new Error(`split ${from.key}: conflict_group ${g} bị chia sang nhiều object (${[...objs].join(", ")})`);
    for (const c of src.checklist?.checks ?? []) {
      const refs = refsIn(c.oracle?.kb_ids ?? []);
      let best = rest[0], bestN = 0;
      for (const p of parts) {
        const n = [...refs].filter((k) => p.keys.has(k)).length;
        if (n > bestN) [best, bestN] = [p, n];
      }
      best.checks.push(c);
    }
    for (const p of parts) {
      const checkIds = new Set(p.checks.map((c) => c.check_id));
      const keepRef = (e) => {
        const refs = refsIn(e);
        return refs.size ? [...refs].some((k) => p.keys.has(k)) : Boolean(p.rest);
      };
      const keepCheck = (e) => {
        const ids = e && typeof e === "object" ? e.check_ids ?? e.related_check_ids : null;
        return Array.isArray(ids) && ids.length ? ids.some((id) => checkIds.has(id)) : keepRef(e);
      };
      const profile = src.profile ? clone(src.profile) : null;
      if (profile) for (const [k, v] of Object.entries(profile)) if (Array.isArray(v)) profile[k] = v.filter(keepRef);
      let checklist = null;
      if (src.checklist) {
        checklist = clone({ ...src.checklist, checks: [] });
        for (const [k, v] of Object.entries(checklist)) if (Array.isArray(v) && k !== "checks") checklist[k] = v.filter(keepCheck);
        checklist.checks = clone(p.checks);
      }
      const entry = { kb: p.kb, profile, checklist, moved: true, origin: src.origin };
      place(p.dest, [{ src: from.key, entry, partial: true }], { name: p.name, user_goal: p.user_goal });
      if (p.rest) featureDest.set(from.key, p.dest);
      events.push({ kind: "split_part", from: from.key, to: p.dest.key, kb: p.kb.length, checks: p.checks.length });
    }
  }

  for (const op of mapping.operations ?? []) {
    if (op.op === "move") {
      const from = addr(op.from), to = addr(op.to);
      place(to, [{ src: from.key, entry: take(from) }], op);
    } else if (op.op === "merge") {
      const into = addr(op.into);
      const sources = (op.sources ?? []).map(addr);
      if (sources.length < 2 && !model.objects.get(into.o)?.features.has(into.f)) throw new Error(`merge vào ${into.key}: cần ≥2 nguồn`);
      const own = sources.find((s) => s.key === into.key);
      const pieces = sources.map((s) => ({ src: s.key, entry: take(s) }));
      pieces.sort((a, b) => (a.src === own?.key ? -1 : b.src === own?.key ? 1 : b.entry.kb.length - a.entry.kb.length));
      place(into, pieces, op);
    } else if (op.op === "split") split(op);
    else if (op.op === "move_object_kb") {
      const src = object(op.from), dst = object(op.to, true);
      const want = new Set(op.kb_ids ?? []);
      const moving = src.kb.filter((it) => want.has(it.kb_id));
      if (moving.length !== want.size) throw new Error(`move_object_kb: không thấy đủ ${[...want].join(", ")} trong ${op.from}/kb.json`);
      for (const it of moving) {
        if (dst.kb.some((x) => x.kb_id === it.kb_id)) throw new Error(`trùng kb_id ${it.kb_id} ở ${op.to}/kb.json`);
        kbReloc.set(canonicalKbRef(op.from, null, it.kb_id), canonicalKbRef(op.to, null, it.kb_id));
      }
      src.kb = src.kb.filter((it) => !want.has(it.kb_id));
      dst.kb.push(...moving);
      src.kbMoved = dst.kbMoved = true;
      touched.add(op.from).add(op.to);
      note(op.from, op.to, moving.length);
      events.push({ kind: "object_kb_moved", from: op.from, to: op.to, kb: moving.length });
    } else if (op.op === "dissolve") removedAliasTo.set(op.object, op.alias_to ?? null);
    else throw new Error(`op không hỗ trợ: ${op.op}`);
  }

  // Object rỗng bị xoá; key cũ thành alias của object nhận nhiều KB nhất.
  const removed = new Map();
  for (const [key, obj] of model.objects) {
    if (obj.features.size || obj.kb.length) {
      if (removedAliasTo.has(key)) throw new Error(`dissolve ${key}: object vẫn còn feature hoặc KB object-level`);
      continue;
    }
    if (obj.isNew) throw new Error(`object mới ${key} rỗng sau restructure`);
    const target = removedAliasTo.get(key) ?? [...(received.get(key) ?? new Map())].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (!target || !model.objects.has(target)) throw new Error(`object ${key} rỗng nhưng không xác định được object nhận alias (khai "dissolve" + "alias_to")`);
    removed.set(key, target);
  }
  for (const key of removed.keys()) model.objects.delete(key);
  for (const [, target] of removed) touched.add(target);
  return { events, kbReloc, featureDest, checkDest, removed, touched };
}

// ---------------------------------------------------------------- open questions

function moveOpenQuestions(model, original, result) {
  const { kbReloc, featureDest, checkDest, removed } = result;
  const oqReloc = new Map();
  const changedOq = new Set();
  const featKeyOf = new Map(); // "o/FEAT-id" → feature key (theo layout gốc)
  for (const [o, obj] of original.objects) for (const [f, e] of obj.features) if (e.profile?.feature_id) featKeyOf.set(`${o}/${e.profile.feature_id}`, f);
  const oldKeys = new Map(); // "o#KB" → các key cũ trong object o
  for (const [o, obj] of original.objects) {
    for (const it of obj.kb) (oldKeys.get(`${o}#${it.kb_id}`) ?? oldKeys.set(`${o}#${it.kb_id}`, []).get(`${o}#${it.kb_id}`)).push(canonicalKbRef(o, null, it.kb_id));
    for (const [f, e] of obj.features) for (const it of e.kb) (oldKeys.get(`${o}#${it.kb_id}`) ?? oldKeys.set(`${o}#${it.kb_id}`, []).get(`${o}#${it.kb_id}`)).push(canonicalKbRef(o, f, it.kb_id));
  }
  const split = (key) => {
    const [o, rest] = key.split("/");
    return { o, f: rest.split("#")[0] === "_object-level" ? null : rest.split("#")[0] };
  };
  const outgoing = [];
  for (const [o, obj] of original.objects) {
    for (const q of obj.oqs) {
      const fk = featKeyOf.get(`${o}/${q.feature_id}`) ?? q.feature_id ?? null;
      const votes = new Map();
      for (const id of [q.kb_id, ...(q.kb_ids ?? [])].filter(Boolean)) {
        const keys = oldKeys.get(`${o}#${id}`) ?? [];
        const key = keys.find((k) => k.startsWith(`${o}/${fk}#`)) ?? (keys.length === 1 ? keys[0] : null);
        if (!key) continue;
        const d = split(kbReloc.get(key) ?? key);
        const v = `${d.o}/${d.f ?? ""}`;
        votes.set(v, (votes.get(v) ?? 0) + 1);
      }
      for (const id of q.check_ids ?? []) {
        const d = checkDest.get(`${o}/${fk}#${id}`);
        if (d) votes.set(`${d.o}/${d.f}`, (votes.get(`${d.o}/${d.f}`) ?? 0) + 1);
      }
      let dest = [...votes].sort((a, b) => b[1] - a[1])[0]?.[0];
      if (!dest && fk) {
        const d = featureDest.get(`${o}/${fk}`);
        dest = d ? `${d.o}/${d.f}` : null;
      }
      const [dObj, dFeat] = dest ? dest.split("/") : [removed.get(o) ?? o, fk ?? ""];
      const next = { ...q };
      if (dFeat && (dFeat !== fk || dObj !== o)) next.feature_id = dFeat;
      if (next.check_ids) next.check_ids = next.check_ids.map((id) => checkDest.get(`${o}/${fk}#${id}`)?.check_id ?? id);
      outgoing.push({ from: o, to: dObj, q: next, changed: !isDeepStrictEqual(next, q) || dObj !== o });
    }
  }
  for (const obj of model.objects.values()) obj.oqs = [];
  const usedNumbers = new Map();
  for (const item of outgoing) if (item.from === item.to) (usedNumbers.get(item.to) ?? usedNumbers.set(item.to, new Set()).get(item.to)).add(item.q.oq_id);
  for (const item of outgoing) {
    const target = model.objects.get(item.to);
    if (item.from !== item.to) {
      const prefix = `OQ-${item.to}-`;
      const used = usedNumbers.get(item.to) ?? usedNumbers.set(item.to, new Set()).get(item.to);
      const n = Math.max(0, ...[...used].filter((id) => id.startsWith(prefix)).map((id) => Number(id.slice(prefix.length))).filter(Number.isFinite)) + 1;
      const id = prefix + String(n).padStart(3, "0");
      used.add(id);
      oqReloc.set(item.q.oq_id, id);
      item.q = { ...item.q, oq_id: id, supersedes: item.q.oq_id };
    }
    if (item.changed) changedOq.add(item.from).add(item.to);
    target.oqs.push(item.q);
  }
  for (const obj of model.objects.values()) for (const q of obj.oqs) if (q.related_oq_ids) q.related_oq_ids = q.related_oq_ids.map((id) => oqReloc.get(id) ?? id);
  return { oqReloc, changedOq };
}

function remapOqIds(value, oqReloc) {
  let changed = false;
  const walkValue = (v) => {
    if (Array.isArray(v)) return v.forEach(walkValue);
    if (!v || typeof v !== "object") return;
    for (const [k, x] of Object.entries(v)) {
      if (k === "oq_id" && typeof x === "string" && oqReloc.has(x)) {
        v[k] = oqReloc.get(x);
        changed = true;
      } else if (["oq_ids", "related_oq_ids"].includes(k) && Array.isArray(x)) {
        v[k] = x.map((id) => {
          if (oqReloc.has(id)) changed = true;
          return oqReloc.get(id) ?? id;
        });
      } else walkValue(x);
    }
  };
  walkValue(value);
  return changed;
}

// ---------------------------------------------------------------- write

function renderOpenQuestions(obj) {
  const blocks = obj.oqs.map((q) => `## ${q.oq_id} — ${q.type}\n\n\`\`\`json\n${JSON.stringify(q)}\n\`\`\``);
  return `${obj.oqHeader}\n\n${blocks.join("\n\n")}\n`;
}

function renderSummary(obj, label, product, version, date, aliases) {
  const count = (f) => obj.oqs.filter((q) => q.feature_id === f || q.feature_id === obj.features.get(f)?.profile?.feature_id).length;
  const rows = [...obj.features].map(([f, e]) => {
    const goal = String(e.profile?.user_goal ?? "").replace(/\s+/g, " ").replace(/\|/g, "/");
    const defects = e.kb.filter((i) => i.status === "KNOWN_DEFECT").length;
    return `| \`${f}\` — ${String(e.profile?.name ?? humanize(f)).replace(/\|/g, "/")} | ${goal.length > 160 ? goal.slice(0, 157) + "…" : goal} | ${e.kb.length} | ${e.checklist?.checks?.length ?? 0} | ${count(f)} | ${defects} |`;
  });
  const t = { CONFLICT: 0, NEEDS_CONFIRMATION: 0, OPEN_ISSUE: 0 };
  for (const q of obj.oqs) t[q.type in t ? q.type : "OPEN_ISSUE"]++;
  return [
    `# ${label}`,
    `**Published context version:** ${version}`,
    "",
    `**Product:** ${product} · **Object:** \`${obj.key}\` · **Cập nhật cấu trúc:** ${date}`,
    "",
    "## Features",
    "",
    "| Feature | User goal | KB | Check | OQ | Known defect |",
    "|---|---|---|---|---|---|",
    ...rows,
    "",
    `KB object-level: ${obj.kb.length} (\`kb.json\`).`,
    "",
    "## Open questions",
    "",
    `CONFLICT ${t.CONFLICT} · NEEDS_CONFIRMATION ${t.NEEDS_CONFIRMATION} · OPEN_ISSUE ${t.OPEN_ISSUE} — chi tiết trong \`open-questions.md\`.`,
    ...(aliases.length ? ["", "## Tên cũ (alias)", "", aliases.map((a) => `\`${a}\``).join(" · ")] : []),
    ""
  ].join("\n");
}

const jsonText = (v) => JSON.stringify(v, null, 2) + "\n";

/** Áp mapping lên `productDir` (bản preview) và ghi file. Trả số liệu + sự kiện. */
export async function restructureProduct(productDir, mapping, { date = today(), product = path.basename(productDir) } = {}) {
  const original = await loadProduct(productDir);
  const model = await loadProduct(productDir);
  const before = totals(original);
  captureRefs(model, kbIndex(shardsOf(model)));
  const result = restructure(model, mapping, { product, date });
  const problems = [];
  for (const [o, obj] of model.objects) {
    for (const it of obj.kb) releaseRefs(it, obj.kbMoved, result.kbReloc, problems, `${o}/kb.json`);
    for (const [f, e] of obj.features) for (const v of [e.kb, e.profile, e.checklist]) if (v) releaseRefs(v, e.moved, result.kbReloc, problems, `${o}/${f}`);
  }
  if (model.productKb) releaseRefs(model.productKb, false, result.kbReloc, problems, "_product-kb.json");
  if (problems.length) throw new Error("restructure_reference_failed: " + problems.join("; "));
  const { oqReloc, changedOq } = moveOpenQuestions(model, original, result);
  for (const obj of model.objects.values()) {
    for (const it of obj.kb) remapOqIds(it, oqReloc);
    for (const e of obj.features.values()) for (const v of [e.kb, e.profile, e.checklist]) if (v) remapOqIds(v, oqReloc);
  }
  if (model.productKb) remapOqIds(model.productKb, oqReloc);

  // Bất biến: tổng KB/check/OQ, mọi reference resolve được trong layout mới.
  const after = totals(model);
  for (const k of Object.keys(before)) if (before[k] !== after[k]) throw new Error(`restructure_invariant_failed: ${k} ${before[k]} → ${after[k]}`);
  const index = kbIndex(shardsOf(model));
  const unresolved = [];
  for (const [o, obj] of model.objects)
    for (const [f, e] of obj.features)
      for (const v of [e.kb, e.profile, e.checklist])
        if (v && e.moved)
          referenceFields(v, (_a, _i, ref, field, ancestors) => {
            try {
              resolveKbRef(ref, { object: o, feature: f, index, ancestors, field });
            } catch (err) {
              unresolved.push(`${o}/${f}: ${ref} (${err.message})`);
            }
          });
  if (unresolved.length) throw new Error("restructure_reference_failed: " + unresolved.slice(0, 20).join("; "));

  // Ghi file JSON khác bản gốc; xoá file của feature/object không còn.
  const writes = new Map();
  const want = (rel, value) => writes.set(rel, value);
  for (const [o, obj] of model.objects) {
    want(`${o}/kb.json`, obj.kb);
    for (const [f, e] of obj.features) {
      want(`${o}/features/${f}/kb.json`, e.kb);
      if (e.profile) want(`${o}/features/${f}/profile.json`, e.profile);
      if (e.checklist) want(`${o}/checklists/${f}.json`, e.checklist);
    }
  }
  const changedObjects = new Set([...result.touched, ...changedOq].filter((o) => model.objects.has(o)));
  for (const [rel, value] of writes) {
    const old = await readMaybe(path.join(productDir, rel));
    if (old !== null && isDeepStrictEqual(JSON.parse(old), value)) continue;
    if (old === null && Array.isArray(value) && !value.length && !model.objects.get(rel.split("/")[0]).isNew) continue;
    await mkdir(path.dirname(path.join(productDir, rel)), { recursive: true });
    await writeFile(path.join(productDir, rel), jsonText(value));
    changedObjects.add(rel.split("/")[0]);
  }
  const keep = new Set(writes.keys());
  for (const [o, obj] of original.objects) {
    for (const f of obj.features.keys()) {
      for (const rel of [`${o}/features/${f}/kb.json`, `${o}/features/${f}/profile.json`, `${o}/checklists/${f}.json`]) {
        if (keep.has(rel)) continue;
        await rm(path.join(productDir, rel), { force: true });
        if (model.objects.has(o)) changedObjects.add(o);
      }
      if (!model.objects.get(o)?.features.has(f)) await rm(path.join(productDir, o, "features", f), { recursive: true, force: true });
    }
  }
  for (const o of result.removed.keys()) await rm(path.join(productDir, o), { recursive: true, force: true });

  // Registry: alias đi theo feature/object; object mới có entry riêng.
  const registry = clone(original.registry);
  registry.objects = (registry.objects ?? []).filter((e) => !result.removed.has(e.object_key));
  const entryOf = (o) => {
    let e = registry.objects.find((x) => x.object_key === o);
    if (!e) {
      e = { object_key: o, label: mapping.new_objects?.[o]?.label ?? humanize(o), aliases: [humanize(o)] };
      registry.objects.push(e);
    }
    e.aliases ??= [];
    return e;
  };
  const movedAliases = new Map(); // alias → object đích
  for (const [oldKey, d] of result.featureDest) {
    const [oo, of] = oldKey.split("/");
    if (oo !== d.o || of !== d.f) for (const a of [humanize(of), of]) movedAliases.set(a, d.o);
  }
  for (const [o, target] of result.removed) {
    const old = original.registry.objects?.find((x) => x.object_key === o);
    for (const a of [o, humanize(o), ...(old?.aliases ?? [])]) movedAliases.set(a, target);
  }
  for (const e of result.events) if (e.kind === "feature_placed") movedAliases.set(humanize(e.to.split("/")[1]), e.to.split("/")[0]);
  // Tên của object mới và alias khai trong mapping thuộc về object mới, không còn ở object cũ.
  for (const [o, spec] of Object.entries(mapping.new_objects ?? {})) {
    if (!model.objects.has(o)) continue;
    for (const a of [o, humanize(o), ...(spec.aliases ?? [])]) movedAliases.set(a, o);
  }
  for (const e of registry.objects) e.aliases = (e.aliases ?? []).filter((a) => !movedAliases.has(a) || movedAliases.get(a) === e.object_key);
  for (const [a, o] of movedAliases) {
    const e = entryOf(o);
    if (!e.aliases.includes(a)) e.aliases.push(a);
  }
  for (const [o, obj] of model.objects) {
    if (!changedObjects.has(o)) continue;
    const e = entryOf(o);
    for (const f of obj.features.keys()) if (!e.aliases.includes(humanize(f))) e.aliases.push(humanize(f));
  }
  if (!isDeepStrictEqual(registry, original.registry)) await writeFile(path.join(productDir, "_registry.json"), jsonText(registry));

  // Prose + version cho mọi object bị đổi.
  for (const o of [...changedObjects].sort()) {
    const obj = model.objects.get(o);
    const dir = path.join(productDir, o);
    const meta = { ...(obj.meta ?? { mode: modeOfSources(obj, original, mapping.new_objects?.[o]?.mode) }), published_context_version: obj.meta ? String(Number(obj.meta.published_context_version) + 1) : "1", published_at: date };
    await writeFile(path.join(dir, "publish-meta.json"), jsonText(meta));
    const origFeatures = original.objects.get(o) ? [...original.objects.get(o).features.keys()].sort() : null;
    const featureSetChanged = !origFeatures || !isDeepStrictEqual(origFeatures, [...obj.features.keys()].sort());
    const label = registry.objects.find((x) => x.object_key === o)?.label ?? humanize(o);
    if (featureSetChanged || !obj.summary) {
      const aliases = registry.objects.find((x) => x.object_key === o)?.aliases.filter((a) => movedAliases.get(a) === o && a.includes("-")) ?? [];
      await writeFile(path.join(dir, "feature-summary.md"), renderSummary(obj, label, product, meta.published_context_version, date, aliases));
    } else {
      const lines = obj.summary.split("\n");
      lines[1] = `**Published context version:** ${meta.published_context_version}`;
      await writeFile(path.join(dir, "feature-summary.md"), lines.join("\n"));
    }
    if (changedOq.has(o) || !original.objects.has(o)) await writeFile(path.join(dir, "open-questions.md"), renderOpenQuestions(obj));
    const moves = result.events.filter((e) => e.kind === "feature_placed" && (e.to.startsWith(`${o}/`) || e.from.some((s) => s.startsWith(`${o}/`))));
    const text = moves.map((e) => `${e.from.join(" + ")} → ${e.to}`).join("; ") || "cập nhật reference/OQ theo vị trí mới";
    const log = obj.changelog ?? `# CHANGELOG — ${o}\n`;
    await writeFile(path.join(dir, "CHANGELOG.md"), log.trimEnd() + `\n- ${date} (restructure-${date}) — Đổi cấu trúc theo contract §5 "Độ hạt object/feature": ${text}. Giữ nguyên kb_id, statement, nguồn và test steps; OQ chuyển object được mint id mới kèm \`supersedes\`.\n`);
  }
  return { events: result.events, objects: [...changedObjects].sort(), removed: [...result.removed.keys()], totals: after, oq_reissued: oqReloc.size };
}

/** Mode của object mới: khai trong mapping, nếu không thì mode của object gốc góp nhiều feature nhất. */
function modeOfSources(obj, original, declared) {
  if (declared) return declared;
  const votes = new Map();
  for (const e of obj.features.values()) for (const src of e.origin ?? []) {
    const mode = original.objects.get(src.split("/")[0])?.meta?.mode;
    if (mode) votes.set(mode, (votes.get(mode) ?? 0) + e.kb.length);
  }
  return [...votes].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "CCR_INGEST";
}

function totals(model) {
  let kb = model.productKb?.length ?? 0, checks = 0, oqs = 0;
  for (const obj of model.objects.values()) {
    kb += obj.kb.length;
    oqs += obj.oqs.length;
    for (const e of obj.features.values()) {
      kb += e.kb.length;
      checks += e.checklist?.checks?.length ?? 0;
    }
  }
  return { kb, checks, oqs };
}

// ---------------------------------------------------------------- preview / apply

/** Bất biến riêng cho restructure: không có file nào đổi nội dung KB/check, chỉ đổi vị trí. */
export function validateRestructureChanges(changes) {
  const collect = (side) => {
    const kb = [], checks = [];
    for (const c of changes) {
      const buf = c[side];
      if (!buf || !c.rel.endsWith(".json")) continue;
      const v = JSON.parse(buf);
      if (path.basename(c.rel) === "kb.json") for (const it of v) kb.push(JSON.stringify([it.kb_id, it.statement, it.confirmation_source ?? null, it.scope ?? null, it.status ?? null, it.knowledge_kind]));
      else if (c.rel.includes("/checklists/")) for (const ch of v.checks ?? []) checks.push(JSON.stringify([ch.title, ch.steps ?? null, ch.precondition ?? null, ch.expected_result ?? null, ch.priority ?? null]));
    }
    return { kb: kb.sort(), checks: checks.sort() };
  };
  const a = collect("before"), b = collect("after");
  const errors = [];
  if (!isDeepStrictEqual(a.kb, b.kb)) errors.push("KB identity/statement/source changed");
  if (!isDeepStrictEqual(a.checks, b.checks)) errors.push("check content changed");
  if (errors.length) throw new Error("restructure_preservation_failed: " + errors.join("; "));
  return { ok: true };
}

export async function prepareRestructure(mapping, { knowledgeDir = path.join(rootDir, "knowledge"), date = mapping.date ?? today() } = {}) {
  const product = mapping.product;
  if (!SLUG.test(product ?? "")) throw new Error("mapping.product không hợp lệ");
  const baseline = {};
  for (const f of await walk(path.join(knowledgeDir, "products"))) baseline[path.relative(knowledgeDir, f)] = digest(await readFile(f));
  const temp = await mkdtemp(path.join(tmpdir(), "ctx-restructure-"));
  const preview = path.join(temp, "products");
  await cp(path.join(knowledgeDir, "products"), preview, { recursive: true });
  const result = await restructureProduct(path.join(preview, product), mapping, { date, product });
  const changes = [];
  const seen = new Set();
  for (const f of await walk(preview)) {
    const rel = path.join("products", path.relative(preview, f));
    seen.add(rel);
    const after = await readFile(f);
    const before = await readFile(path.join(knowledgeDir, rel)).catch((e) => (e.code === "ENOENT" ? null : Promise.reject(e)));
    if (!before || !before.equals(after)) changes.push({ rel, before, after });
  }
  for (const rel of Object.keys(baseline)) if (!seen.has(rel)) changes.push({ rel, before: await readFile(path.join(knowledgeDir, rel)), after: null });
  validateRestructureChanges(changes);
  const audit = await auditDir(preview);
  const summary = { date, product, preview, changed_files: changes.length, deleted_files: changes.filter((c) => c.after === null).length, ...result, audit };
  const objects = [...new Set([...result.objects, ...result.removed])].map((object) => ({ product, object }));
  return { temp, preview, changes, summary, objects, baseline };
}

async function main() {
  const args = parseArgs();
  if (typeof args.mapping !== "string") {
    console.error("Cần --mapping <file.json> [--apply]");
    process.exitCode = 1;
    return;
  }
  const plan = await prepareRestructure(await readJson(args.mapping));
  const s = plan.summary;
  console.log(
    JSON.stringify(
      {
        preview: plan.preview,
        changed_files: s.changed_files,
        deleted_files: s.deleted_files,
        objects: s.objects,
        removed_objects: s.removed,
        totals: s.totals,
        oq_reissued: s.oq_reissued,
        placed: s.events.filter((e) => e.kind === "feature_placed").map((e) => `${e.from.join(" + ")} → ${e.to} (KB ${e.kb}, check ${e.checks})`),
        audit_ok: s.audit.ok,
        blocking: s.audit.blocking.slice(0, 20)
      },
      null,
      2
    )
  );
  if (!s.audit.ok) {
    process.exitCode = 1;
    return;
  }
  if (args.apply === true) {
    await applyDataMaintenance(plan, { validate: validateRestructureChanges });
    console.log(JSON.stringify({ applied: true, backup: path.join(plan.temp, "backup") }));
  }
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
