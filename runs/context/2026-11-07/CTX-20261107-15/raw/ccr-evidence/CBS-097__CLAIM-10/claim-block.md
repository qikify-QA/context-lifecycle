### CLAIM-10

- **Statement:** Shift-click trong tab Re-order có hai quan sát ngược nhau: (a) chọn dòng đó và mọi dòng phía trên tới đầu danh sách, (b) chỉ chọn dải liền giữa hai lần click.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `UNKNOWN`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** (a) ghi nhận Slack không rõ người xác nhận, 2026-09-09; (b) máy thao tác, chưa có người xác nhận, 2026-09-18
- **Locator:** (a) RA 01-analysis.md §6 và bảng TC Jira QA-3352 "Correction 2026-09-09 (Slack)", 2026-09-09, không rõ người xác nhận; (b) ảnh chụp TC-21 trong result_QA-3352_B-visual_2026-09-18.md, ⏸️ chưa tick. Không phía nào là đúng; không đề xuất check nào assert shift-click cho tới khi có người kiểm tay hoặc dev xác nhận. (CCR cũ: CBS-033 CLAIM-07)
- **Trích nguyên văn:**
  ```
  (a) Real mechanic: plain click toggles a row into/out of the selection (this is how both contiguous ranges and non-contiguous sets are built — no modifier key at all); shift-click is a separate, unbounded "select to top" action.
  (b) b1: plain-click F10 — selected=F10 · b2: shift-click F13 — selected=F10,F11,F12,F13 (CHỈ 4 hàng, KHÔNG phải F01..F13 như expected ghi) · b3: kéo cụm thả dưới F14 — after=F01..F09,F14,F10,F11,F12,F13,F15 (4 hàng dồn xuống đúng dưới F14, nguyên vẹn).
  ```
