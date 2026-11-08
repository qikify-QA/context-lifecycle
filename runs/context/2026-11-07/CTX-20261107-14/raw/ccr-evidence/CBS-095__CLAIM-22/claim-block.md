### CLAIM-22

- **Statement:** Giá trị đã chọn được lưu (layer JSON `gpt_resolution "3840"` — chuỗi), giữ sau reload, giữ khi duplicate artwork; GO Text to Image giữ 2K sau reload; storefront generate dùng giá trị đó (T2I GPT 2K, layer 900×600 → 2048×1360)
- **Object / feature:** artwork/layer-config-image (liên quan: sdk, global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (lưu) + buyer (generate); portal · storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-08, 09, 27 PASS 2026-10-27, staging, build không ghi lại. Trả lời một phần OQ-sdk-040 (CHK-014) (CCR cũ: CBS-024 CLAIM-15)
- **Căn cứ expected:** KHÔNG CÓ cho phần lưu, reload, duplicate; phần kích thước TC-27 theo comment 55697 Q3
- **Trích nguyên văn:**
  ```
  TC-08 | ✅ AI — T2I global option 2K persists | GO <id> edit page: Default (disabled) / 1K / 2K / 4K → 2K → "Global option has been updated successfully." → reload 2K
  TC-09 | ✅ AI — 4K saved, reopened, kept on duplicate | MU-G 4K → JSON `gpt_resolution "3840"`; reopen 4K; MCP duplicate → artwork <id> MU-G `gpt_resolution 3840`
  TC-27 | ✅ AI — T2I GPT 2K | 900×600 → 2048×1360 (ratio 1.506, multiples of 16)
  ```
