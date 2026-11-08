# CBS-010__CLAIM-16

Strength: S3

## Dòng Phần 1a

| `CLAIM-16` | TIB-5496 — sau bulk Add, campaign hiện nút "Update required"; variant mới chỉ vào dữ liệu sync lên Shopify (instance_variants) sau khi bấm Update thủ công (R10, phần sync) | portal · api — instance_variants; storefront chưa xem được (store khoá mật khẩu) | `test_case` — PASS TC-TIB-5049 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base/product-base-campaign-link — liên quan KB-060, KB-092 (Update campaign); context local campaign.md "still needs Update Campaign" | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-16

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5049 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5049: Sau Add V1–V4 vào CP-0 (đã published lên Nprice1): trang campaign hiện nút đỏ "Update required"; trước Update, dữ liệu sync lên Shopify (instance_variants) chỉ có V7 (92747). Bấm Update required ở store Nprice1: instance_variants có V1–V4 (92741–92744) kèm V7, tức variant mới chỉ sync sau khi Update thủ công. Giới hạn: storefront nprice1.myshopify.com đang khoá mật khẩu (trang /password) nên không xem trực tiếp được product; xác nhận qua dữ liệu sync của TeeInBlue thay vì nhìn trang product.
  ```
- **File đính kèm cho claim này:** 2 screenshot đính trong actualResult trên Testlane


## Đánh giá

S3 test_case: TC-TIB-5049 PASS, chạy 2026-10-09 trên staging [AI], build staging sau lần giao QA cuối của TIB-5496 (2026-10-06); đối chiếu Testlane TIB-169 (read-only 2026-10-30): status passed và actualResult khớp nguyên văn CCR 5.1, không ghi Fail/Blocked, kiểm đúng hành vi claim. 4.1 'KHÔNG AI (PO/business)' không loại test_case (§12.3a, chủ repo chốt 2026-10-11). Storefront không xem được (store khoá mật khẩu) — xác nhận qua instance_variants; claim chỉ phát biểu ở mức dữ liệu sync nên test case kiểm đúng hành vi. Hiển thị trên storefront → unknowns.
