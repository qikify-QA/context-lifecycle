### CLAIM-13

- **Statement:** Label field chứa HTML hoặc script hiển thị dạng chữ thường trong tab Re-order, không tạo node script hay img thật, kể cả sau reorder, Save và reload.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), Jira không tick TC này, 2026-09-17
- **Locator:** QA-3352 TC-18 "Stored XSS via a field label re-rendered in the Re-order tab + storefront" trong result_QA-3352_auto_2026-09-17.md, chạy lại ✅ trong result_QA-3352_lane2_auto_2026-09-18..21.md; staging, không ghi số build. Chỉ bước 1-3 (portal); bước storefront chưa chạy vì thiếu campaign đã publish. (CCR cũ: CBS-033 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-18 | ✅ AI — Stored XSS via a field label re-rendered in the Re-order tab + storefront | label "<script>console.log('xss-test-"… → row#5, node <script>/<img> thật = false<br>label "\"><img src=x onerror=console.l"… → row#6, node <script>/<img> thật = false<br>saved order sau reorder+save = ["F01","F02","F03","F04","\"><img src=x on","<script>console"] | CHƯA test bước 4-5 (storefront form + console trên storefront) — thiếu fixture campaign đã publish, cùng blocker với TC-09.
  ```
