# Jira TIB-5501 — trích đọc qua MCP Atlassian (chỉ đọc), 2026-11-07

## Comment 52720 — chauptm (dev), 2026-09-29T14:44:42+0700 — "Context / logic changes"
Root cause: when a vector layer has a color, the SVG is inlined (SDK, via v-html) or merged into one output SVG (vectorize). The code already renamed CSS classes to avoid conflicts, but not ids. SVG files sharing the same <clipPath id> therefore override each other, and the color fill breaks (transparent area).
Fix: when a color is applied, every id in the SVG is prefixed with a random string (svg-xxxxxxxx-<id>), and all references are updated: url(#id), href="#id", xlink:href="#id" and #id selectors inside <style>. SVGs without ids, or layers without a color, are untouched.
(Mục "Possible test cases" của comment này là danh sách gợi ý kiểm thử/regression — không dùng làm nguồn hành vi, theo quyết định operator.)
Notes: "Browser verification with the real SVGs from the report has not been done yet."

## Comment 53673 — phuongbb (QA), 2026-10-07T14:22:34+0700
Q3. Besides url(#id), href="#id", xlink:href="#id" and <style> #id, does the rewrite also handle quoted url('#id') / url("#id") and marker-* attributes? Is the prefix regenerated on every recolor or fixed per layer instance? — QA đề xuất: Quoted url() and marker-* handled; aria-*/SMIL out of scope; prefix regenerated on each changeSvgProperties call (QA proposal, no source)

## Comment 53685 — chauptm (dev), 2026-10-07T15:48:24+0700, reply của 53673
@phuongbb đã handle hết các case của Q3 rồi ạ
