#!/usr/bin/env node
// Copy file dùng chung từ knowledge/ vào preview của run, ghi hash để publish-apply phát hiện
// cập nhật đồng thời. Luôn dùng script này thay vì copy tay.
//
//   node scripts/ctx/copy-shared.mjs --run CTX-... --files _flows/a.md,_product-guide.md [--reset]
//
// --reset: lấy lại bản mới nhất, bỏ phần đã sửa trong preview (sau `shared_file_changed`, rồi áp lại).

import path from "node:path";
import { access } from "node:fs/promises";
import { parseArgs, readJson } from "../lib/fs-utils.mjs";
import { resolveRunDir, runPaths, knowledgeProductsDir } from "../lib/run-layout.mjs";
import { copySharedToPreview, isSharedFile } from "../lib/shared-files.mjs";

const exists = (f) => access(f).then(() => true, () => false);

async function main() {
  const args = parseArgs();
  if (typeof args.run !== "string" || typeof args.files !== "string") {
    console.error("Cần --run CTX-... --files a,b [--reset]");
    process.exit(1);
  }
  const paths = runPaths(resolveRunDir(args.run));
  const { product } = await readJson(paths.manifest);
  const baseDir = path.join(knowledgeProductsDir, product);
  const copied = [];
  for (const rel of args.files.split(",").map((f) => f.trim()).filter(Boolean)) {
    if (!isSharedFile(rel)) {
      console.error(`${rel} không phải file dùng chung.`);
      process.exit(1);
    }
    if (args.reset !== true && (await exists(path.join(paths.previewDir, rel)))) {
      console.error(`${rel} đã có trong preview. Dùng --reset nếu muốn bỏ phần đã sửa và lấy bản mới nhất.`);
      process.exit(1);
    }
    await copySharedToPreview(baseDir, paths.previewDir, rel);
    copied.push(rel);
  }
  console.log(JSON.stringify({ ok: true, copied }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
