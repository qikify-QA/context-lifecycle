### CLAIM-28

- **Statement:** Sau khi chuẩn hoá NFC, tên ASCII vẫn khớp như cũ, so khớp vẫn phân biệt hoa thường (A và a là hai clipart khác nhau), và text rỗng hoặc chỉ có khoảng trắng không khớp clipart nào.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront (SDK)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chauptm) viết, không ai xác nhận, 2026-09-23
- **Locator:** Jira TIB-5412 comment 51755 mục "Possible test cases". QA Hub TC-05/06/07 ở passed nhưng actualResult rỗng, không ngày chạy/build: không phải bằng chứng. Không dùng làm expected tới khi có người verify. (CCR cũ: CBS-032 CLAIM-02)
- **Trích nguyên văn:**
  ```
  - [ ] Plain ASCII clipart names (existing behavior) still match exactly as before — no regression.
  - [ ] Case-sensitive matching still holds (e.g. `A` vs `a` still resolve to different cliparts) — normalization must not affect case sensitivity.
  - [ ] Empty/whitespace-only typed value still returns no match (unchanged behavior).
  ```
