### CLAIM-12

- **Statement:** Khi Photo layer có gemini_resolution 512 đã lưu và account chuyển sang Nano Banana 2.1, dropdown Resolution trống (không placeholder, không 0.5K), generate ở 2K, và giá trị 512 vẫn lưu tới khi merchant chọn giá trị khác rồi Save.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff (dropdown); buyer (kết quả generate); portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q4 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-09 = TC-TIB-7910, TC-19 = TC-TIB-7920, TC-20 = TC-TIB-7921 PASS 2026-10-30. (CCR cũ: CBS-023 CLAIM-04)
- **Trích nguyên văn:**
  ```
  - Q4: The dropdown shows blank: 2.1's list has no 0.5K and no placeholder, so 512 matches nothing
  (it does not show 2K). Generation uses 2K. The stored 512 stays until the merchant picks another value
  and saves.
  Bổ trợ — TC-09 (TC-TIB-7910) ✅ 2026-10-30: "on 2.1 a saved 512 shows blank, stays 512 after Save; picking 1K stores 1K". TC-19 (TC-TIB-7920) và TC-20 (TC-TIB-7921) ✅: 512 trên 2.1 → master 2048×2048 (upload [đã bỏ id]). Dev 2026-10-26: "If 512 is still sent (e.g. via API/MCP), it falls back to the default 2K."
  ```
