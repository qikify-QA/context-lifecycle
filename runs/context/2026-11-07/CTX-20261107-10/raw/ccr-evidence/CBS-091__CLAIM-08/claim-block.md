# CBS-091 CLAIM-08 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-08

- **Statement:** Option chained {{output}} có effect riêng bắt đầu từ ảnh đã xử lý xong của nguồn và chỉ chạy effect riêng, còn effect của nguồn chạy 1 lần cho mỗi ảnh dù có bao nhiêu option chained dùng nó.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront và api (derive)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Tài liệu "Change & test cases — reuse source effects and carry crop/reposition to chained populate options" (v1, "Generated from the branch diff (sdk + api)"), Jira TIB-5504 comment 56020, mục "Chained {{output}} option reuses the source's processed photo". Bổ trợ: QA-3441 TC-01, 02, 03, 08 ✅ AI 2026-10-29 staging. Trả lời một phần OQ-artwork-093 và CHK-023 (populate-values), chỉ cho trường hợp {{output}}. (CCR cũ: CBS-022 CLAIM-01)
- **Trích nguyên văn:**
  ```
  - Now:
    - The chained option starts from the source's finished photo and runs only its own effects.
    - The source's effects run once per photo, however many chained options use it.
    - The chained option shows exactly the source's look (same Gen AI result), plus its own effects.
  ```
