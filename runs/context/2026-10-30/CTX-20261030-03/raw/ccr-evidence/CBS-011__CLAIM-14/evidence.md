# CBS-011__CLAIM-14

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-14` | TIB-5558 — Duplicate artwork: bản copy giữ action Hide (và Show), tham chiếu element map sang layer của bản copy, chạy đúng chiều trên storefront | portal (Artworks list → duplicate) · api (GraphQL) · storefront | `test_case` — PASS TC-TIB-7343 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / artwork-list-management KB-047 (nút la-copy duplicate) | `ADD` |

## Phần 1b

| `CLAIM-14` | `artwork` | `artwork-list-management` | store owner / staff | portal | `KB-047` (artwork) |

## Phần 5.1

### CLAIM-14

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7343 (tiêu chí 1–2 lượt đầu, tiêu chí 3 retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-1-dup`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  "Bản duplicate giữ action Hide và ẩn/hiện đúng chiều trên storefront. Tiêu chí 1–2 (editor/API của
  bản copy #5956 giữ action:"hide", #5957 giữ action:"show") đã đạt ở lượt trước và dữ liệu không đổi;
  lượt này kiểm lại tiêu chí 3: campaign CP-HIDE-1-DUP (#3273, tib-5558-cp-hide-1-dup) — Pet 1 Type =
  Cat → field và layer ẩn; = Dog → hiện."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của TC-TIB-7343 trên Testlane`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7343 — actualResult: Bản duplicate giữ action Hide và ẩn/hiện đúng chiều trên storefront. Tiêu chí 1–2 (editor/API của bản copy #5956 giữ action:"hide", #5957 giữ action:"show") đã đạt ở lượt trước và dữ liệu không đổi; lượt này kiểm lại tiêu chí 3: campaign CP-HIDE-1-DUP (#3273, tib-5558-cp-hide-1-dup) — Pet 1 Type = Cat → field và layer ẩn; = Dog → hiện. Artwork copy #5956, Instance 520.
