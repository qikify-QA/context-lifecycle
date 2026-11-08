### CLAIM-11

- **Statement:** Khi template đích có 2 photo layer cùng option title nhưng khác tỉ lệ, mỗi layer được xét riêng: layer cùng tỉ lệ giữ position, layer khác tỉ lệ reset và warning chỉ hiện ở field của layer đó.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-37 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. (CCR cũ: CBS-026 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-37 | ✅ AI — T14: layer 1:1 giữ position T1, layer 2:1 reset + warning chỉ ở layer đó | `layer-<id>` (1:1) `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}` = T1, warning rỗng; `layer-<id>` (2:1) `{x:0,y:-0.0625,w:1,h:1.125}` + warning chỉ ở `#tee-field--layer-<id>`
  ```
