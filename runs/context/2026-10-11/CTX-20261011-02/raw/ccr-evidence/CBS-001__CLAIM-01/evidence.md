<!-- CBS-001 CLAIM-01: verbatim block from CCR Phần 5.1 (redacted per §6: person handles, local home path). -->

### CLAIM-01

- **Loại nguồn:** `test_case`
- **Locator:** Testlane TIB-162 — TC-TIB-001 (TC-TIB-4690), 002 (4691), 003 (4692), 009 (4698), 011 (4700)
- **Link:** https://ownego.atlassian.net/browse/TIB-5352 (ticket); test case trên Testlane task TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-06 (TC-001, TC-011) và 2026-10-07 (TC-002, 003, 009)
- **Người viết / người xác nhận:** QA ([REDACTED]) chạy; dev [REDACTED] mô tả hành vi
- **Trích nguyên văn:**
  ```
  TC-001 actualResult: Raw HTML ... window.teeinblueShopTranslations = { ...{"translation_version":"1791272596858"}, }, chỉ có version hash, không có dictionary. Chuỗi "QA5352" xuất hiện 0 lần trong HTML. ... SDK gọi GET https://staging-api.teeinblue.com/api/merchant/translations/vi.json?shop=linh-tib-staging.myshopify.com&v=1791272596858 (200)
  TC-002 (vi=1000 key): HTML chỉ có translation_version, SDK gọi translations/vi.json 1 lần.
  TC-003 (vi=999 key): window.teeinblueShopTranslations trong HTML chứa dictionary đầy đủ, 999 key; 0 request tới translations/vi.json.
  TC-009 (1000 key, 5 key rỗng): API trả 995 key; dictionary inline 995 key; 0 request.
  TC-011: /vi-vn/ (1249 key) gọi API; /zh-zh/ (zh-TW 50 key) có 50 key nhúng sẵn, 0 request translations.
  Dev ([REDACTED], 2026-10-01): "Số key đã dịch của một ngôn ngữ ... 999: Từ điển nhúng thẳng trong trang, không gọi API; 1000 trở lên: Chỉ có mã phiên bản, SDK gọi API translations/<locale>.json?v=..."
  ```
- **File đính kèm cho claim này:** không có (ảnh lưu local: `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/04-tc011-zh-zh.png`)
