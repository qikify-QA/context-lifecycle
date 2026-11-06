// File dùng chung cả product (`_product-guide.md`, `_env.example`, `_flows/*`) không có lock theo
// object và không có version. Preview dựng từ base cũ, chép đè sẽ xoá bản mà run khác hoặc CCR §2b
// vừa ghi. Vì vậy mỗi file được ghi lại hash lúc copy vào preview, và publish so hash đó với bản
// đang có trong knowledge/ trước khi ghi.

import { createHash } from "node:crypto";
import { readFile, readdir, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

export const SHARED_ROOT_FILES = ["_product-guide.md", "_env.example"];
export const isSharedFile = (rel) => SHARED_ROOT_FILES.includes(rel) || rel.startsWith("_flows/");
export const sharedBaseFile = (previewDir) => path.join(path.dirname(previewDir), "shared-base.json");

async function hashOf(file) {
  try {
    return createHash("sha256").update(await readFile(file)).digest("hex");
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw e;
  }
}

async function readBase(previewDir) {
  try {
    return JSON.parse(await readFile(sharedBaseFile(previewDir), "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return {};
    throw e;
  }
}

/** Copy một file dùng chung từ base vào preview và ghi hash. `null` = base chưa có file. */
export async function copySharedToPreview(baseDir, previewDir, rel) {
  const source = path.join(baseDir, rel);
  const hash = await hashOf(source);
  if (hash) {
    await mkdir(path.dirname(path.join(previewDir, rel)), { recursive: true });
    await copyFile(source, path.join(previewDir, rel));
  }
  const base = await readBase(previewDir);
  base[rel] = hash;
  await writeFile(sharedBaseFile(previewDir), JSON.stringify(base, null, 2) + "\n");
  return hash;
}

async function sharedInPreview(previewDir) {
  const found = [];
  for (const name of SHARED_ROOT_FILES) if (await hashOf(path.join(previewDir, name))) found.push(name);
  try {
    for (const e of await readdir(path.join(previewDir, "_flows"), { recursive: true, withFileTypes: true })) {
      if (e.isFile()) found.push(path.relative(previewDir, path.join(e.parentPath, e.name)));
    }
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  return found;
}

/**
 * Quyết định từng file dùng chung trong preview:
 *   skip     — run không sửa (hoặc giống hệt bản đang có): không ghi, giữ bản trong knowledge/
 *   write    — run có sửa và knowledge/ chưa đổi từ lúc copy
 *   conflict — run có sửa nhưng knowledge/ đã đổi, hoặc không biết bản gốc
 */
export async function planSharedFiles(previewDir, targetDir) {
  const base = await readBase(previewDir);
  const plan = { skip: [], write: [], conflicts: [] };
  for (const rel of await sharedInPreview(previewDir)) {
    const preview = await hashOf(path.join(previewDir, rel));
    const current = await hashOf(path.join(targetDir, rel));
    const known = Object.hasOwn(base, rel);
    if (preview === current) plan.skip.push(rel);
    else if (!known && current === null) plan.write.push(rel);
    else if (!known) plan.conflicts.push({ file: rel, reason: "base_unknown" });
    else if (preview === base[rel]) plan.skip.push(rel);
    else if (current === base[rel]) plan.write.push(rel);
    else plan.conflicts.push({ file: rel, reason: "changed_since_copy" });
  }
  return plan;
}
