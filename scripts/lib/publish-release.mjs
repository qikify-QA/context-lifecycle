// Helper thuần (không I/O) cho bước phát hành knowledge qua PR — tách ra để test được.

/** Tag tiếp theo cho ngày `date`, không bao giờ ghi đè: ctx-YYYY-MM-DD, rồi -2, -3, ... */
export function nextTagName(existing, date) {
  const base = `ctx-${date}`;
  const taken = new Set(existing);
  if (!taken.has(base)) return base;
  for (let n = 2; ; n++) if (!taken.has(`${base}-${n}`)) return `${base}-${n}`;
}

/** Danh sách "<product>/<object>" bị chạm, từ đường dẫn file đổi trong knowledge/. */
export function changedObjects(files) {
  const out = new Set();
  for (const f of files) {
    const m = /^products\/([^/]+)\/([^/]+)\//.exec(f);
    if (m && !m[2].startsWith("_")) out.add(`${m[1]}/${m[2]}`);
  }
  return [...out].sort();
}

/** Nội dung PR vào qa-knowledge: object, version, CCR, verdict/diff của các run kèm theo. */
export function buildPrBody({ sourceRepo, sha, manifest, files, runs = [] }) {
  const objects = changedObjects(files);
  const versions = new Map();
  for (const p of manifest?.products ?? []) for (const o of p.objects ?? []) versions.set(`${p.product_key}/${o.object_key}`, o);
  const lines = [`Publish từ \`${sourceRepo}@${sha.slice(0, 8)}\`.`, "", "## Object thay đổi", ""];
  if (!objects.length) lines.push("_(chỉ file mức product / how-to-request)_");
  for (const key of objects) {
    const o = versions.get(key);
    lines.push(`- \`${key}\` — version ${o?.published_context_version ?? "?"}, status ${o?.status ?? "?"}${o?.issues?.length ? `, ${o.issues.length} issue` : ""}`);
  }
  if (runs.length) {
    lines.push("", "## Run", "");
    for (const r of runs) {
      const d = r.diff ?? {};
      const count = (k) => (Array.isArray(d[k]) ? d[k].length : 0);
      lines.push(
        `- \`${r.run_id}\`${r.proposal_id ? ` (CCR \`${r.proposal_id}\`)` : ""} — mode ${r.mode ?? "?"}, verdict ${r.verdict?.decision ?? "?"}` +
          (r.diff ? `, diff +${count("added")} ~${count("changed")} =${count("refreshed_only")} conflicted ${count("conflicted")}` : "") +
          (r.verdict?.publish_conditions?.length ? `, ${r.verdict.publish_conditions.length} publish condition` : "") +
          (r.open_questions != null ? `, ${r.open_questions} open question` : "")
      );
    }
  }
  lines.push("", `${files.length} file thay đổi. Merge xong thì gắn tag bằng \`node scripts/publish-knowledge.mjs --tag\` ở repo build.`);
  return lines.join("\n");
}
