// Reference tới vị trí cũ sau khi restructure-knowledge.mjs chuyển feature/KB:
// viết lại (rewriteValue/rewriteString) và audit (staleHits). Cùng một spec cho
// cả hai để thứ đã viết lại được thì audit không báo, và thứ không viết lại
// được (field bảo vệ như KB statement) thì audit chặn.
//
// spec = {
//   kbReloc:  Map "o/f#KB-x" (canonical cũ) → canonical mới,
//   keys:     [{ from: "o/f", to: "o2/f2" }]        feature key đổi object/tên,
//   feats:    [{ from: "FEAT-33-x", to: "FEAT-02-x", key: "o/f", scope: null|"o" }]
// }

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const KB_REF = /(?<![A-Za-z0-9_/-])([a-z0-9][a-z0-9-]*\/[a-z0-9_][a-z0-9_-]*)[#:](KB-[A-Za-z0-9-]*[A-Za-z0-9])/g;
const shortFeat = (id) => /^(FEAT-\d+)/.exec(id)?.[1] ?? null;

function compile(spec) {
  if (spec.__compiled) return spec.__compiled;
  const keys = spec.keys.map(({ from, to }) => {
    const [fo, ff] = from.split("/"), [to_o, tf] = to.split("/");
    return {
      from,
      to,
      forms: [
        [new RegExp(`(?<![A-Za-z0-9_/-])${esc(fo)}/features/${esc(ff)}(?![A-Za-z0-9_-])`, "g"), `${to_o}/features/${tf}`],
        [new RegExp(`(?<![A-Za-z0-9_/-])${esc(fo)}/checklists/${esc(ff)}(?![A-Za-z0-9_-])`, "g"), `${to_o}/checklists/${tf}`],
        [new RegExp(`(?<![A-Za-z0-9_/-])${esc(from)}(?![A-Za-z0-9_-])`, "g"), to]
      ]
    };
  });
  const feats = spec.feats.map((f) => ({
    ...f,
    full: new RegExp(`(?<![A-Za-z0-9-])${esc(f.from)}(?![A-Za-z0-9-])`, "g"),
    short: shortFeat(f.from) && shortFeat(f.to) && shortFeat(f.from) !== shortFeat(f.to) ? new RegExp(`(?<![A-Za-z0-9-])${esc(shortFeat(f.from))}(?![A-Za-z0-9-])`, "g") : null
  }));
  return (spec.__compiled = { keys, feats });
}

const inScope = (f, object) => !f.scope || f.scope === object;

/** Viết lại một chuỗi; `object` là object chứa file (để giới hạn FEAT id trùng giữa object). */
export function rewriteString(s, spec, { object } = {}) {
  if (typeof s !== "string" || !s) return s;
  const { keys, feats } = compile(spec);
  let out = s.replace(KB_REF, (m, where, id) => spec.kbReloc.get(`${where}#${id}`) ?? m);
  for (const f of feats) if (inScope(f, object)) out = out.replace(f.full, f.to);
  for (const k of keys) {
    const before = out;
    for (const [re, to] of k.forms) out = out.replace(re, to);
    // "artwork/x (FEAT-33)": số FEAT ngắn chỉ đổi khi cùng chuỗi nhắc key cũ.
    if (out !== before) for (const f of feats) if (f.short && f.key === k.from) out = out.replace(f.short, shortFeat(f.to));
  }
  return out;
}

/** Viết lại mọi chuỗi trong value (bỏ qua field trong `protect`). Trả true nếu có đổi. */
export function rewriteValue(value, spec, { object, protect = new Set() } = {}) {
  let changed = false;
  const visit = (node) => {
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        if (typeof node[i] === "string") {
          const next = rewriteString(node[i], spec, { object });
          if (next !== node[i]) (node[i] = next), (changed = true);
        } else visit(node[i]);
      }
    } else if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) {
        if (protect.has(k)) continue;
        if (typeof v === "string") {
          const next = rewriteString(v, spec, { object });
          if (next !== v) (node[k] = next), (changed = true);
        } else visit(v);
      }
    }
  };
  visit(value);
  return changed;
}

/** Các reference tới vị trí cũ còn sót trong một chuỗi. */
export function staleHits(s, spec, { object } = {}) {
  if (typeof s !== "string" || !s) return [];
  const { keys, feats } = compile(spec);
  const hits = [];
  for (const m of s.matchAll(KB_REF)) if (spec.kbReloc.has(`${m[1]}#${m[2]}`)) hits.push(`${m[1]}#${m[2]}`);
  for (const k of keys) for (const [re] of k.forms) for (const m of s.matchAll(re)) hits.push(m[0]);
  for (const f of feats) if (inScope(f, object)) for (const m of s.matchAll(f.full)) hits.push(m[0]);
  return [...new Set(hits)];
}

/** Duyệt JSON, trả [{path, hits}] cho mọi chuỗi còn reference cũ. */
export function staleInValue(value, spec, { object } = {}) {
  const out = [];
  const visit = (node, trail) => {
    if (typeof node === "string") {
      const hits = staleHits(node, spec, { object });
      if (hits.length) out.push({ path: trail || "/", hits });
    } else if (Array.isArray(node)) node.forEach((v, i) => visit(v, `${trail}/${i}`));
    else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) visit(v, `${trail}/${k}`);
  };
  visit(value, "");
  return out;
}

export const isEmptySpec = (spec) => !spec.kbReloc.size && !spec.keys.length && !spec.feats.length;
