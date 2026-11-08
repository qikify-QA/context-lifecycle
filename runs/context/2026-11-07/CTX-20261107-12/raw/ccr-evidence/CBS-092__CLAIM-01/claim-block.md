### CLAIM-01

- **Statement:** Chọn ≥1 layer, menu More (…) trên action bar có: Bulk edit (icon bút) đứng đầu, rồi Replace image layer, Link with another layer, Convert to another layer; 6 mục cũ (Replace clipart category, Replace group of clipart categories, Conditional setting, Bulk edit default text, Bulk edit option title, Bulk edit display setting) không còn.
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `CONTRADICTS KB-043`
- **Scope:** store owner / staff có quyền sửa artwork; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 (QA Hub task TIB-059) — TC-01 trong `result_QA-3419_retest3-regression_2026-10-30.md` (cũng ✅ trong `result_QA-3419_run1_2026-10-22.md`) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (ngày chạy). Build: staging portal `assets/index.BMgdZMSW.js` (Last-Modified 2026-10-29 14:32:50 GMT), sau dev summary (2026-09-04) và fix cuối của dev (2026-10-28). | Checklist CHK-005 (artwork/editor-layer-workspace, READY) đang assert không có menu overflow. KB-085/CHK-015 lại nói có menu '...' > 'Bulk edit'. Giữ cả hai phía. Dev summary comment 49895 chỉ là ngữ cảnh, không phải nguồn. Nhãn thật theo TC-01 khác nhãn trong TC expected và ticket; Artwork 1.0 vẫn ghi 'Share with another layer'; không đề xuất nhãn nào là chuẩn ngoài cái TC-01 đọc được (CCR cũ: CBS-025 CLAIM-01)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-01 expected: Items in order: "Bulk edit" (pen icon), "Replace image", "Share with another layer", "Convert layer"; none of "Replace clipart category", "Replace group of clipart categories", "Conditional setting", "Bulk edit default text", "Bulk edit option title", "Bulk edit display setting"
  TC-01 | ✅ AI — More menu: Bulk edit (pen icon), Replace image layer (disabled), Link with another layer, Convert to another layer; no old bulk entries | T1 + T2 → More popper shown: `Bulk edit` (`las la-pen`), `Replace image layer (disabled)`, `Link with another layer`, `Convert to another layer`; none of the 6 old labels in the page | Build BMgdZMSW
  Ngữ cảnh (dev summary, comment 49895, 2026-09-04 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  Artwork editor, chọn nhiều layer, menu More (…): gỡ 6 entry cũ (Replace clipart category, Replace group of clipart categories, Conditional setting, Bulk edit default text, Bulk edit option title, Bulk edit display setting) và thay bằng một entry duy nhất **Bulk edit** (icon bút). Các entry Replace image, Share with another layer, Convert layer vẫn giữ nguyên, chỉ đổi thứ tự (Bulk edit đứng đầu).
  ```
