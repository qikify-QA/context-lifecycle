### CLAIM-20

- **Statement:** Vector layer đã áp màu được inline vào preview storefront, mọi id trong SVG của layer mang prefix riêng dạng svg-<chuỗi ngẫu nhiên>-<id gốc>, mọi tham chiếu resolve trong chính layer, không id nào trùng trên trang, và các SVG vốn trùng clipPath id đều tô kín màu, không vùng trong suốt.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront, Chrome desktop), storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 (QA Hub task TIB-166) TC-26, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK; DOM có prefix nên code fix đã chạy. Bổ trợ: TC-01 ⏸️ cùng lượt. Campaign chỉ có 1 Color option chung, chỉ chứng minh khi các layer cùng màu; "mỗi layer giữ màu riêng" chưa kiểm (TC-01, TC-03 ⏸️). Không assert độ dài, ký tự hay độ ổn định của prefix. Liên quan, không bị thay: storefront-buyer-facing KB-011. (CCR cũ: CBS-031 CLAIM-01)
- **Căn cứ expected:** Dev summary, chauptm, Jira TIB-5501 comment 2026-09-29 ("when a color is applied, every `id` in the SVG is prefixed with a random string (`svg-xxxxxxxx-<id>`)")
- **Trích nguyên văn:**
  ```
  TC-26 | ✅ AI — đổi màu 5 lần trong 3,5s: mọi lần 5/5 layer inline, 0 ref treo, 0 id trùng, màu cuối đúng, không vùng trong suốt | samples E63946→2A9D8F→F4A261→264653→8338EC: dangling 0 / dup 0 mỗi lần; prefix sinh lại mỗi lần (vd `rpf6fi0j`→`vwvmrz0v`→`hgyu4d66`); computed fill layer 70 = `rgb(131, 56, 236)`
  ```
