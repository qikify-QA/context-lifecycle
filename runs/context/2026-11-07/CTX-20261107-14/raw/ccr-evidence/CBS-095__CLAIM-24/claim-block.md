### CLAIM-24

- **Statement:** Ô Flux width/height trên portal chỉ giữ số ("abc", `<script>…` → rỗng; "2e3", "２０００" → 2000; 10 000 chữ số → rỗng), Save với ô rỗng → lỗi field "… is required", không gửi request; tên GO chứa payload HTML/template hiện nguyên chữ, toast 4 MP trên trang GO không chứa tên GO
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-33 PASS 2026-10-27, staging, build không ghi lại (CCR cũ: CBS-024 CLAIM-19)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-33 | ✅ AI — Flux inputs keep only numbers; payload in GO name stays text | MU-F width: "abc" → "", `<script>alert(1)</script>` → "" (badInput), "2e3" → "2000", "２０００" → "2000", 10 000 digits → ""; layout unchanged; Save → "Flux output width (px) is required", no PUT. GO <id> renamed `"><img src=x onerror=console.log(1)>{{7*7}}` → shown literally; Flux 2000×2001 Save → toast "Something went wrong! Flux dimension … 4 Megapixel)"; `img[onerror]` 0, console.log 0, no "49" | GO-page toast does not include the GO name. GO name restored
  ```
