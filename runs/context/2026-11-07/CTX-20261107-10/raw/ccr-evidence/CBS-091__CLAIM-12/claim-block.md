# CBS-091 CLAIM-12 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-12

- **Statement:** Layer ảnh No personalization được populate {{output}} từ nguồn Photo Reposition có dữ liệu vị trí đi theo nguồn, kể cả khi nguồn di chuyển sau đó, và order render dùng vị trí này, còn preview storefront không vẽ vị trí đó mà vẫn fit ảnh vào khung layer.
- **Object / feature:** artwork/populate-values (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) và order design render, storefront và api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56059, dòng Q9 (phần Position). Bổ trợ: QA-3441 TC-38 ✅ AI 2026-10-29 staging, đơn test. Lệch preview và bản in là đã biết, không do TIB-5504. (CCR cũ: CBS-022 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Position: the layer's data follows the source position (also on later moves, since TIB-5504) and the order render uses it, but the storefront preview does not draw it — it keeps the photo fit to the layer box. This is the known preview vs print mismatch, not changed by TIB-5504; out of scope here.
  ```
