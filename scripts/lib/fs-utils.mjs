// Tiện ích file dùng chung cho scripts/ và ops-board/.

import { readFile, writeFile, readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";

/** Mọi file (không phải thư mục) dưới `dir`, đệ quy. Thư mục không tồn tại → []. */
export async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

/** Như readJson nhưng trả `fallback` khi file không có hoặc không parse được. */
export async function readJsonOr(file, fallback = null) {
  try {
    return await readJson(file);
  } catch {
    return fallback;
  }
}

export async function writeJson(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2) + "\n");
}

export async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

export async function listDirs(dir) {
  try {
    return (await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

/** Đọc giá trị `--name value` (hoặc `--flag` → true) từ argv. */
export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) {
      out._.push(a);
      continue;
    }
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[key] = true;
    else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}
