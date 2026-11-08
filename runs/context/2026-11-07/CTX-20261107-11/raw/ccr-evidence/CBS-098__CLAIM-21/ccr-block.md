### CLAIM-21

- **Statement:** Vector layer chưa áp màu render qua <image href=…svg>, không inline và không id nào bị prefix.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-18, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK. (CCR cũ: CBS-031 CLAIM-02)
- **Căn cứ expected:** Dev summary, chauptm, Jira TIB-5501 comment 2026-09-29 ("SVGs without ids, or layers without a color, are untouched.")
- **Trích nguyên văn:**
  ```
  TC-18 | ✅ AI — chưa áp màu: cả 5 vector render qua `<image href=…svg>`, không inline, không id nào bị prefix | sau `localStorage.clear()` + mở lại: modes = image×5, href `[đã bỏ id]` … `[đã bỏ id]`, handle màu `rgb(0,0,0)` (chưa chọn)
  Ngữ cảnh (Dev summary, 2026-09-29): "SVGs without ids, or layers without a color, are untouched."
  ```
