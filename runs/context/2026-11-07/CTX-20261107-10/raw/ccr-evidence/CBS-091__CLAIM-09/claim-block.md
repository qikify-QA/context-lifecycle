# CBS-091 CLAIM-09 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-09

- **Statement:** Hai option chained {{output}} cùng một nguồn chỉ dùng chung 1 call effect riêng khi setup y hệt (cùng effect, cùng layer type và kích thước, cùng effect nguồn), khác bất kỳ điểm nào thì mỗi option 1 call.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront và api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56059, dòng Q7 (trả lời Q7 trong comment 56055 của QA). Bổ trợ: QA-3441 TC-05, TC-06 ✅ AI 2026-10-29 staging. (CCR cũ: CBS-022 CLAIM-02)
- **Trích nguyên văn:**
  ```
  - **Q7:** Q7 A. One shared call when both options have exactly the same setup (same effects, same layer type and size, same source effects). Any difference → one call each.
  ```
