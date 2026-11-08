### CLAIM-14

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5212; skill-rules-audit.md #172, #173, #174, #175, #176 (rule `toolbar-effect-capability-intersection`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5212?focusedCommentId=55717
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-27
- **Người viết / người xác nhận:** giangnth (dev)
- **Trích nguyên văn:**
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #172):
    ```
    Shadow: the toggle shows Off unless all layers have it on; color shows black, blur/X/Y are empty, Display has nothing selected. Changing one property changes only that property on every layer; the rest stay per layer.
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #173):
    ```
    Photo Border: mixed properties show their default values. Turning the Border toggle on writes all shown values (type, color, size, display, line) to every layer, so individual settings are replaced. Changing one property changes only that property but also turns the border on for every selected layer.
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #174):
    ```
    Each change is 1 undo step for all affected layers. Number fields (X, Y, blur, border size) save on every keystroke, so typing “12” is 2 steps (same as before).
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #175):
    ```
    Linked layers (correction): the three fields are hidden whenever the selection contains a layer with customization type Linked (not only newly linked ones). Global Template replica layers: no special rule, they behave as a single layer did before. Artwork 1.0: in scope with the same rules, except Shadow on paragraph is 2.0 only. (correction) In Artwork 2.0, selecting a single group hides Photo Border (the group border owns it); Shadow and HD still show.
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #176):
    ```
    Artwork 1.0: in scope with the same rules, except Shadow on paragraph is 2.0 only.
    ```
- **File đính kèm cho claim này:** không có

