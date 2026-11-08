### CLAIM-13

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5389; skill-rules-audit.md #171 (rule `text-to-image-genai-layer`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5389
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-18
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #171, rule `text-to-image-genai-layer`, nguồn ghi: người dùng chốt, TIB-5389, 2026-10-18:
    ```
    Portal hiện **không có setting reference image** cho layer Text-to-Image ở mọi provider, và buyer cũng không upload được reference image trên storefront. SDK vẫn đọc `text_to_image_enable_ref_img` / `text_to_image_ref_img`, nhưng portal không đặt được giá trị cho hai key này. Người dùng đã chốt: không viết case reference image cho Text-to-Image. "Use Reference Image" chỉ có ở Gen AI image effect (`*:image_filter`).
    ```
- **File đính kèm cho claim này:** không có

