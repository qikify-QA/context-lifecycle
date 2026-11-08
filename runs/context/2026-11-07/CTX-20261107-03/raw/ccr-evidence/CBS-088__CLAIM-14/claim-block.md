# CBS-088 CLAIM-14 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** File SVG nguồn lưu trên CDN không bị sửa: sau khi đã recolor và đặt order, tập id trong file giống hệt file gốc và không có prefix svg-.
- **Object / feature:** artwork/layer-config-vector
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (asset đã upload), api (asset CDN)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-19, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK. (CCR cũ: CBS-031 CLAIM-03)
- **Căn cứ expected:** Jira TIB-5501 description §Expected, 2026-09-29
- **Trích nguyên văn:**
  ```
  TC-19 | ✅ AI — file SVG nguồn lưu trên CDN giữ nguyên id gốc, không prefix runtime, sau khi đã recolor + có order ([đã bỏ id]) | `[đã bỏ id].svg` (70): 113 id = 113 id file gốc, set giống hệt, `svg-xxxxxxxx-` = 0; `[đã bỏ id].svg` (69): 96 = 96, prefix 0
  Ngữ cảnh (description §Expected, 2026-09-29): "The source SVG files are not modified — ids are deduplicated only at preview and at design/render time."
  ```
