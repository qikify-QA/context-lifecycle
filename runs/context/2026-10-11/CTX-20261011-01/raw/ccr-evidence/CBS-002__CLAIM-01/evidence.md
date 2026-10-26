<!-- Verbatim 'Phần 5.1' block for CLAIM-01 of Proposal CBS-002 (redacted per qa-context-contract §6: dev handle -> [REDACTED]). -->

### CLAIM-01

- **Loại nguồn** (đúng 1): `dev_doc` (bổ sung `test_case`)
- **Locator:** PR qikify/teeinblue-api#3910 (mô tả trong comment dev TIB-5506) · `redoc-static.html` đính kèm TIB-5506 · test case TC-TIB-4920/4921/4925/4926/4927/4930/4931/4932 (task TIB-172)
- **Link:** https://ownego.atlassian.net/browse/TIB-5506 · https://github.com/qikify/teeinblue-api/pull/3910
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-02 (comment dev viết; cập nhật 2026-10-05) · 2026-10-07 (redoc API docs) · 2026-10-08 (test case chạy PASS)
- **Người viết / người xác nhận:** [REDACTED] (Dev) — PR #3910 + redoc; QA — test run TIB-172 trên staging
- **Trích nguyên văn:**
  ```
  "Added POST openapi/v1/order-item-artworks/{order_item_artwork_id}/design, gated by the existing orders:write
  ability. Mirrors the Portal's "Replace design" action exactly (same upload/storage logic) — only the file changes
  in place, artwork_id/customization_id/printarea_id are untouched."

  "Scope note: this covers Replace design only, not Add new design ..."

  "Precondition: the target order item must currently be in READY status (value 2), or the call is rejected with a 422."

  "Error responses:
   404 — order item artwork not found, or doesn't belong to the caller's account
   422 — order item isn't in READY status (2), or neither file nor url was provided"
  ```
- **File đính kèm cho claim này:** redoc-static.html (trên TIB-5506); kết quả test TIB-172 trên Testlane (TC-TIB-4920/4921/4925/4926/4927/4930/4931/4932 PASS, run 2026-10-08)
