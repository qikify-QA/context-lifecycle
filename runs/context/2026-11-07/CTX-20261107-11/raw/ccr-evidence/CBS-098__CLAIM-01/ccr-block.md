### CLAIM-01

- **Statement:** Khi bật sync và layer đích cùng tỉ lệ, cùng kích thước, ảnh của buyer giữ đúng position và size của template vừa rời, không hiện warning tỉ lệ, kể cả khi đổi template nhanh liên tục, ở popup desktop và mobile.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 (QA Hub task TIB-223) TC-01 5/5 trong result_QA-3415_TC01-recheck_2026-10-21.md; TC-26, TC-28 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Nhánh "Enable Reposition on main gallery" = ON chưa kiểm. Liên quan, không thay: sdk KB-026, KB-027. (CCR cũ: CBS-026 CLAIM-01)
- **Căn cứ expected:** Jira TIB-5566 dev summary (chinhdt, comment 2026-10-21): "Destination layer has the same aspect ratio as the source layer (within 5%): the photo keeps the buyer's position." Phần đổi nhanh và mobile: KHÔNG CÓ.
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — T2s keeps T1's reposition, no ratio warning (current SDK 2026-10-21 05:56) | T1 after upload (default Cover) `{x:-0.3889,y:0,w:1.7778,h:1}` → after zoom in ×1 + left ×10 + Apply `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, preview `translate(-205.8225 -8.125)` image 606.68×341.25 → switch to T2s: `layer-<id>-position` `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, preview `translate(-205.8225 -8.125)` 606.68×341.25, `.tee-photo-warning` empty. 5/5 runs identical.
  TC-26 | ✅ AI — switch nhanh T2s↔T1 ×3 không chờ: T2s cuối giữ position T1 | 7 lần `selectOption` liên tiếp không chờ, rồi chờ 6 s: T2s `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}` = T1; ảnh có, preview `translate(-205.8225 -8.125)`; không warning; không pageerror
  TC-28 | ✅ AI — popup desktop + mobile 390×844 đều giữ position; nhánh toggle ON ⏸️ AI — portal not reachable | Desktop popup: T2s = T1 `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, warning rỗng. Mobile (isMobile, 390×844): T1 `{x:-0.6333,…}` → T2s y hệt, preview 305.46×171.82 `translate(-103.63 -4.09)` cả hai; warning rỗng
  Ngữ cảnh (Dev summary, chinhdt, Jira TIB-5566 comment 2026-10-21 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  - **Destination layer has the same aspect ratio as the source layer** (within 5%): the photo keeps the buyer's position. If the two layers differ in pixel size, the position and size scale with the layer.
  ```
