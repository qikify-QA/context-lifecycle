# CBS-010__CLAIM-18

Strength: S3

## Dòng Phần 1a

| `CLAIM-18` | TIB-5496 — API/SDK không đổi: bulk Add chỉ gọi POST /api/graphql với mutation Hasura sẵn có insert_campaign_variants + update_campaign_instances (need_sync), không có endpoint/SDK mới (C5) | api — POST /api/graphql | `test_case` — PASS TC-TIB-5051 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns; context local api-endpoints.md → GraphQL (Hasura) | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-18

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5051 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5051: Khi Add V1–V4 vào CP-0, các request ghi dữ liệu chỉ gồm POST /api/graphql với các operation hiện có: insert (insert_campaign_variants) và update (update_campaign_instances need_sync), cùng getData/get để reload; không có endpoint/API/SDK mới nào được gọi. Request thành công, campaign được đánh dấu cần sync (nút "Update required").
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane


## Đánh giá

S3 test_case: TC-TIB-5051 PASS, chạy 2026-10-09 trên staging [AI], build staging sau lần giao QA cuối của TIB-5496 (2026-10-06); đối chiếu Testlane TIB-169 (read-only 2026-10-30): status passed và actualResult khớp nguyên văn CCR 5.1, không ghi Fail/Blocked, kiểm đúng hành vi claim. 4.1 'KHÔNG AI (PO/business)' không loại test_case (§12.3a, chủ repo chốt 2026-10-11). 
