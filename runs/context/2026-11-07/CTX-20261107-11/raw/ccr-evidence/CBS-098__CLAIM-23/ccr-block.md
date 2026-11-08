### CLAIM-23

- **Statement:** Quan sát cho thấy prefix được sinh lại mỗi lần đổi màu: cùng layer, 5 lần đổi cho 5 prefix khác nhau.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, quan sát, không ai xác nhận), 2026-10-08
- **Locator:** Quan sát phụ trong QA-3394 TC-26 (result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK), TC không assert điều này; dev chưa trả lời nửa câu Q3 về prefix. Không dùng làm expected, không đề xuất check nào assert prefix. (CCR cũ: CBS-031 CLAIM-08)
- **Trích nguyên văn:**
  ```
  prefix sinh lại mỗi lần (vd `rpf6fi0j`→`vwvmrz0v`→`hgyu4d66`)
  ```
