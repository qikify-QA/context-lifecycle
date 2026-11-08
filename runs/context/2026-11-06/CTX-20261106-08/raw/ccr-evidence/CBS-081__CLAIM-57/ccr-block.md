### CLAIM-21

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5418; skill-rules-audit.md #168, #169, #170 (rule `storefront-variant-picker-availability`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5418
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #168, rule `storefront-variant-picker-availability`, nguồn ghi: dev phatnt comment 2026-10-15, TIB-5418:
    ```
    Mockup/image after auto-select follows the existing mockup logic (mockup assigned to the variant, else load the first mockup) — no new mockup rule.
    ```
  - skill-rules-audit.md #169, rule `storefront-variant-picker-availability`, nguồn ghi: dev phatnt comment 2026-10-15, TIB-5418:
    ```
    Entry points: open popup, pick product from a collection, switch style/product. Regression: main `CampaignForm` and regular Addon product must not change.
    ```
  - Jira TIB-5418 comment #54647, phatnt, 2026-10-15, khớp một phần:
    ```
    Main product form ngoài trang cá nhân hóa chính (CampaignForm, form sản phẩm chính) và Addon product thông thường hoàn toàn không bị ảnh hưởng.
    ```
  - skill-rules-audit.md #170, rule `storefront-variant-picker-availability`, nguồn ghi: QA lead confirmed (mục dev phatnt comment 2026-10-15), TIB-5418:
    ```
    Scope: only the cross-sell campaign popup (QA lead confirmed). Test must cover all 3 product sources: product base, SFP, Shopify product.
    ```
  - Jira TIB-5418 comment #54647, phatnt, 2026-10-15, khớp một phần:
    ```
    Toàn bộ can thiệp chỉ nằm cô lập trong 2 file component của Cross-sell:
    ```
- **File đính kèm cho claim này:** không có

