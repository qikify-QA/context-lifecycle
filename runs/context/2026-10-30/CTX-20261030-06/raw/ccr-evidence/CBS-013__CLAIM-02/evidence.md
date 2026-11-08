# CBS-013__CLAIM-02

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-02` | TIB-5203 commit 8731f3a — payload bỏ artworks[].description / is_locked / status; campaign_products[].created_at / updated_at; product internal_tags / status; variants created_at / updated_at / deleted_at | api | `test_case` — PASS TC-TIB-7507 2026-10-28 staging [AI] — build: staging @ 2026-10-28 10:30 UTC — sau lần TIB-5203 giao QA cuối (2026-10-27) và sau commit 8731f3a; Jira Done 2026-10-29, 2 PR merged 2026-10-29 (sau ngày chạy); không có Fix Version; build hash: không rõ (QA không có quyền repo) | sdk/storefront-buyer-facing; consumer nào còn đọc các field đã bỏ (chưa rõ, cần agent tự đánh giá) | ADD |

## Phần 1b

| `CLAIM-02` | `sdk` | `storefront-buyer-facing` | guest buyer (storefront SDK đọc) | api | không có |

## Phần 5.1

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `Testlane TIB-257 · TC-TIB-7507; Jira TIB-5203 comment 55763 (mục "Updated 2026-10-28")`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI] (QA agent); mô tả thay đổi: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7507 actualResult: "CP-CACHE-R2 #3279 / Nprice2 (…/campaigns/9138273779910.json?shop=nprice2.myshopify.com):
  artworks (2) không còn description / is_locked / status / global_options, có global_option_ids; campaign_products (1)
  không còn created_at / updated_at; product không còn internal_tags / status; variants (4) không còn created_at /
  updated_at / deleted_at." "CP-CACHE-R2 #3279 / Nprice1 … và CP-CACHE #3270 / Nprice1 …: kết quả giống hệt."
  Comment 55763 (dev): "the PR gained commit `8731f3a`, which drops a few fields from the payload that neither the
  storefront nor the renderers read: artwork `description`, `is_locked`, `status`; campaign product `created_at`,
  `updated_at`; product `internal_tags`, `status`; variant `created_at`, `updated_at`, `deleted_at`."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7507 (passed)
