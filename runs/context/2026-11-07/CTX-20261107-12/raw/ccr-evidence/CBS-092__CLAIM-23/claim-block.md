### CLAIM-23

- **Statement:** Known issue (có từ trước, không thuộc ticket): Option title và Add instruction được chèn như HTML trên form storefront và form preview portal (`<b>`, `<img>` hiện thật; `<script>` và `onerror` bị bỏ, không chạy script).
- **Object / feature:** artwork/layer-common-config (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (form storefront) + store owner / staff (form preview portal); storefront · portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-29, không ai xác nhận
- **Locator:** QA-3419 — TC-35 ❌ trong `result_QA-3419_security_2026-10-23.md`, `result_QA-3419_retest_2026-10-24.md`, `result_QA-3419_retest2_2026-10-29.md`; TC-35 ⏭️ sau đó (`result_QA-3419_TC35-skip_2026-10-29.md`); Jira comment 55846 (dev) | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=55846 | Ngày, build: 2026-10-29 (lần quan sát cuối, build `assets/index.BFN2fMjC.js`); dev nhắc 2026-10-28 | KNOWN ISSUE, KHÔNG dùng làm expected (Phần 4.2). Dev chỉ nói không liên quan ticket, chưa ai nói đây là đúng. Feature và object phụ theo đề xuất CCR cũ, chưa rõ (CCR cũ: CBS-025 CLAIM-24)
- **Trích nguyên văn:**
  ```
  TC-35 (2026-10-29) | ❌ AI — retest: Option title / Add instruction still rendered as HTML (portal form preview + storefront) | … Portal form preview: heading `<span><b>BOLD title</b> <img src="x"> ${7*7}</span>`, hint `<u>underlined</u> <img src="x">`. Storefront (campaign [id] synced): heading `<span><b>BOLD title</b> <img src="x"> ${7*7}</span>`, hint `<div class="tee-text-muted tee-font-italic tee-input-hint"><u>underlined</u> <img src="x"></div>`, 2 broken `<img src="x">`; placeholder literal; no `49`; no `<script>` with xss-test-QA; console: no `1` / `xss-test-QA`
  
  Dev (2026-10-28): Còn 1 điểm bảo mật (HTML injection ở Option Title/Add instruction) QA phát hiện kèm theo nhưng không liên quan tới ticket này, mình để riêng ra, không gộp vào đây.
  ```
