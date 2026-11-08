### CLAIM-13

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5583; skill-rules-audit.md #87, #88, #89, #90, #91, #92, #93, #94, #95 (rule `prompt-variable-value-source`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5583
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-26
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #87, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Scope is the **option value** only. A translated **option title** is out of scope.
    ```
  - skill-rules-audit.md #88, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    The fix covers **every consumer** that uses variables (all AI prompts, all ImagenHub templates).
    ```
  - Jira TIB-5583 comment #54693, chinhdt, 2026-10-15, khớp một phần:
    ```
    Prompt variables, used in AI prompts and ImagenHub templates, read values from the buyer's choices on the form. This change covers two cases where a variable picked up the wrong value.
    ```
  - skill-rules-audit.md #89, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    **Global Option** and **JSON List** sources also send the original value.
    ```
  - skill-rules-audit.md #90, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Image swatch / color is only a display type of Additional Option, not a separate value path. No separate case needed.
    ```
  - skill-rules-audit.md #91, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Switching locale after generating does **not** make the image stale.
    ```
  - skill-rules-audit.md #92, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Order / design / export data: **unchanged** versus before the fix.
    ```
  - skill-rules-audit.md #93, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Portal editor "+ Variable" does **not** list the template selector. The editor shows "no matching layer: <name>" when a variable refers only to the selector. The earlier answer "still lists" was corrected by the user on 2026-10-26 after checking it.
    ```
  - skill-rules-audit.md #94, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    When no layer matches, the storefront sends the **raw token** (e.g. `{{Design}}`) to the provider, does not block generation, and shows the buyer no warning. Accepted as-is (user, 2026-10-26).
    ```
  - skill-rules-audit.md #95, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    No merchant communication about removing the template selector as a source.
    ```
- **File đính kèm cho claim này:** không có

