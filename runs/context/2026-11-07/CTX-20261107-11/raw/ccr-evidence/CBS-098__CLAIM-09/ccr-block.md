### CLAIM-09

- **Statement:** Position chỉ mang từ template vừa rời: đi A → B (khác tỉ lệ, reset) → C (cùng tỉ lệ A) thì C ở placement mặc định, kèm warning vì rời B khác tỉ lệ, không lấy position của A.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-12 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. (CCR cũ: CBS-026 CLAIM-09)
- **Căn cứ expected:** Jira TIB-5566 dev summary (chinhdt, comment 2026-10-21), mục Known limitations: "A position only carries from the template the buyer just left."
- **Trích nguyên văn:**
  ```
  TC-12 | ✅ AI — T1 → T3 → T2: T2 ở default, không lấy position T1 | T3 `{x:0,y:-0.0625,w:1,h:1.125}` + warning → T2 `{x:-0.3889,y:0,w:1.7778,h:1}` (default cover T2), preview 1155.57×650 `translate(-252.785 0)`; T2 cũng hiện warning (rời T3 2:1 → reset ⇒ warning, khớp BR-02)
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-21, Known limitations):
  - A position only carries from the template the buyer just left. Example: the buyer adjusts in template A, switches to B (different ratio, so it resets), then to C (same ratio as A). C gets the default position, not A's. This is by design: the position is never copied to a layer of a different shape.
  ```
