<!-- CBS-001 CLAIM-05: verbatim block from CCR Phần 5.1 (redacted per §6: person handles, local home path). -->

### CLAIM-05

- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-024 (TC-TIB-4713), TC-TIB-027 (TC-TIB-4716), TC-TIB-013/014 (TC-TIB-4702/4703, phần API trực tiếp)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** không rõ (nguồn là quan sát chưa có xác nhận PO/Dev; chạy 2026-10-06/07)
- **Người viết / người xác nhận:** QA quan sát; Dev chưa xác nhận
- **Trích nguyên văn:**
  ```
  TC-027: v hiện tại, v=1, v rác, v 500 chữ số: đều 200, 1249 key, cache-control 'immutable, max-age=31536000, private'. Thiếu v và v rỗng: 200, 1249 key, cache-control 'max-age=900, private'.
  TC-024: translations/xx-YY.json → 200 application/json, 18 key (dictionary primary 'Acrylic Paw Ornament' → 'Acrylic Paw Ornament - en'); ..%2f..%2fx.json → 404; %3Cscript%3E.json → 403 (Cloudflare); locale 300 ký tự → 404; %00 → 400. Không thấy stack trace.
  TC-013: GET translations/zh-TW.json → 200, 50 key; translations/zh-tw.json → 200, 50 key. TC-014: zh-CN.json và pt-BR.json (chưa publish) → 200, 18 key primary.
  ```
- **File đính kèm cho claim này:** không có
