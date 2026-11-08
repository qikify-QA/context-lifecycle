### CLAIM-10

- **Statement:** Xoá ảnh ở template A rồi đổi sang B thì B rỗng, không warning, và ảnh mới upload ở B bắt đầu ở placement mặc định, không dùng position cũ.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-36 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. (CCR cũ: CBS-026 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-36 | ✅ AI — xoá ảnh ở T1 → T2s rỗng, không warning; ảnh mới ở T2s bắt đầu ở default | T2s `{x:-0.6333,…}` → T1 `.tee-photo-clear` ⇒ `layer-<id>=null` → T2s: `layer-<id>=null`, không preview ảnh, warning rỗng → upload landscape (Apply không chỉnh) ⇒ T2s `{x:-0.3889,y:0,w:1.7778,h:1}` (default), ≠ vị trí cũ | Không lật. Quan sát: sau khi xoá ảnh LS vẫn giữ `layer-<id>-position` cũ (ảnh null) — không ảnh hưởng ảnh mới
  ```
