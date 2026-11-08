# CBS-091 CLAIM-01 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-01

- **Statement:** Hai populated option dùng chung 1 lần gọi effect (1 lượt, cả hai nhận kết quả) khi cùng ảnh và cùng toàn bộ thiết lập effect: effect type, prompt đã điền biến, template, remove background; riêng kích thước layer theo các claim về kích thước.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api (customer-uploads/{id}/derive)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-27
- **Locator:** Jira TIB-5577 comment giangnth "Dev answers for QA-3434", câu "ok Q2" (QA ghi id 55689). Bổ trợ: QA-3434 TC-15 ✅ 2026-10-28 staging (khác prompt hoặc thêm remove background thì gọi riêng); TC-13 ⏸️ phần "trừ 1 lượt" không đo được với gray_scale. Vế kích thước layer trong quote đã được dev sửa 2026-10-29, xem claim KHÔNG CÓ NGUỒN cùng ticket. (CCR cũ: CBS-021 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA phuongbb, 2026-10-26): "Q2. "Same effect on the same photo shares one call": does "same effect" mean
  the same effect type only, or the same type **and** the same settings (prompt / ImagenHub template / colour / size)?"
  
  Trả lời (giangnth, 2026-10-27): "ok Q2. Two options share one call only when the whole effect setup is the same:
  effect type, prompt with its variables filled in, template, remove background, and the layer size for Direct
  upload / Cropper layers. Two layers with different sizes get separate calls and separate charges."
  ```
