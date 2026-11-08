### CLAIM-05

- **Statement:** Known issue, không phải expected: cặp layer lệch đúng 5% (1000×1000 → 1000×1050) đang bị coi là khác tỉ lệ nên reset và hiện warning, vì phép tính JS ra 0.05000000000000006 > 0.05.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, không ai xác nhận, 2026-10-21
- **Locator:** QA-3415 TC-06 ❌ 2/2 trong result_QA-3415_B1-S1-clean_2026-10-21.md; bug draft BUG-04 chưa file, dev chưa trả lời. Nói ngược lời dev ở CLAIM-04, chưa ai phân xử. Không dùng làm expected, không đề xuất check assert "đúng 5% thì reset". (CCR cũ: CBS-026 CLAIM-05)
- **Trích nguyên văn:**
  ```
  TC-06 | ❌ AI — đúng 5% (T5 1000×1050): reset default + HIỆN warning (2/2 context) | Lần 1 + lần 2: T5 `{x:-0.4333,y:0,w:1.8667,h:1}` (default cover), preview `translate(-140.8225 0)` + warning "Your photo doesn't match this design's aspect ratio…". JS trên trang: `Math.abs(1-1000/1050)/(1000/1050)` = **0.05000000000000006** (> 0.05)
  ```
