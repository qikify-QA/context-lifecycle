### CLAIM-11

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5465; skill-rules-audit.md #39, #40 (rule `imagenhub-template-variable-sync`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5465
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #39, rule `imagenhub-template-variable-sync`, nguồn ghi: người dùng xác nhận 2026-10-21, TIB-5465:
    ```
    ImagenHub is an AI photo-processing service, so its effect applies **only to photo uploads**. A Clipart layer has no "Image effects" setting.
    ```
  - skill-rules-audit.md #40, rule `imagenhub-template-variable-sync`, nguồn ghi: dev xác nhận 2026-10-21, TIB-5465:
    ```
    the per-field warning and the "+ variable" button in the prompt do not recognise the **title of a Global Option layer**. They take the layer name, so the SDK cannot find the variable. This bug also exists on prod. The warning box at the top of the canvas does match by the Global Option title.
    ```
  - Jira TIB-5465 comment #55232, chinhdt, 2026-10-21, khớp một phần:
    ```
    A Global Option layer counts as a match through the Global Option's own title.
    ```
- **File đính kèm cho claim này:** không có

