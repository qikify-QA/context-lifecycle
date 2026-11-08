# CBS-010__CLAIM-07

Strength: S1

## Dòng Phần 1a

| `CLAIM-07` | TIB-5496 — select-all và Add chỉ áp dụng 25 campaign của trang đang xem; RA/PO yêu cầu label "Select all 25 campaigns on this page" — lúc chạy không có label và checkbox header vẫn hiện tick ở trang 2 (R3, C8) | portal — modal Campaigns that use this product, phân trang 25/trang | `KHÔNG CÓ NGUỒN` — case TC-TIB-5037 Fail 2026-10-09 (thiếu label, header tick sai ở trang 2), BUG-263 chưa có retest có ngày; Testlane status passed nhưng actualResult vẫn Fail | product-base — MỚI: variant-add-to-campaigns; dev ghi 25/trang là known limitation, không phải thiết kế chốt | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-07

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5037 (actualResult, Fail) · BUG-263 · comment dev Jira 53403 (Known limitations)
- **Link:** https://ownego.atlassian.net/browse/TIB-5496?focusedCommentId=53403
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); tuanva — dev (comment 2026-10-05)
- **Trích nguyên văn:**
  ```
  TC-TIB-5037: Fail — Select-all không có label nêu phạm vi. Actual: modal PB-MANY #3385 hiển thị "Showing 1 to 25 of 30 entries"; select-all là checkbox trần, không có label/tooltip "Select all 25 campaigns on this page". Bấm select-all: đúng 25 campaign trang 1 được tick. Trang 2 (26–30): 5 campaign không tick nhưng checkbox select-all ở header vẫn hiện đã tick. Expected: label "Select all 25 campaigns on this page"; các campaign trang 2 không tick. Phần phân trang 25 + 5 và phạm vi tick đúng; chỉ sai label (và trạng thái select-all ở trang 2). Đã tạo bug BUG-263 kèm screenshot.
  Comment dev tuanva 2026-10-05 (Known limitations): Select-all và thao tác Add trong modal chỉ áp dụng cho các campaign ở trang đang hiển thị (25 campaign mỗi trang), giống hành vi cũ.
  ```
- **File đính kèm cho claim này:** screenshot + attachment trong TC-TIB-5037; BUG-263 trên Testlane


## Đánh giá

S1: actualResult TC-TIB-5037 Fail kèm screenshot/attachment → không PASS. Comment dev "Known limitations" không đủ dev_doc/po_dev_confirm (như CLAIM-04); dev gọi 25/trang là known limitation, không phải thiết kế chốt. Testlane status passed không dùng.
