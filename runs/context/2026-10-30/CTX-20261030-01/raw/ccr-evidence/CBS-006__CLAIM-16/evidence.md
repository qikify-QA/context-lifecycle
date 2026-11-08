# CBS-006 CLAIM-16 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-16` | TIB-5584 (SDK) — condition trỏ vào layer bị ẩn hiệu dụng không bao giờ pass; layer con dưới Group ẩn dù bật "Show this layer on first load" hoặc condition buyer-side thoả vẫn ẩn (AND với Group) — CHƯA thấy đúng trên staging | storefront — condition + form SDK | `KHÔNG CÓ NGUỒN` — TC-TIB-6065 actualResult rỗng; TC-TIB-6066 FT2 trong Group ẩn vẫn có field (BUG-321); TC-TIB-6067 actualResult Fail 2026-10-16, ghi chú sau 'Do bị cache' không có ngày chạy lại | sdk / storefront-buyer-facing + artwork / conditional-setting-config (condition nguồn/đích) | `ADD` |

## Phần 1b
| `CLAIM-16` | `sdk` | `storefront-buyer-facing` | buyer (guest) trên storefront | storefront | không có |

## 5.1

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6065, TC-TIB-6066, TC-TIB-6067; BUG-321
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5056
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Fail; không có ngày chạy lại)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6065 — actualResult: (rỗng)
  TC-TIB-6066 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5056 / campaign #3049 , storefront tib-211-cp-p3h-aw-p3h-firstload-group-hidden (đã xoá localStorage): lần load đầu và sau reload preview chỉ có FT3, form không có field FT1 (FT1 vẫn ẩn dù bật "Show this layer on first load"). Chỉ đọc request GET /api/merchant/campaigns/*.json, không thao tác ghi. Lưu ý: FT1 còn gắn condition theo FT3 nên không tách riêng được hiệu ứng của "first load" và của Group ẩn; FT2 (cũng nằm trong Group ẩn) vẫn có field trong form, cùng lỗi với BUG-321.
  TC-TIB-6067 (chạy 2026-10-16, staging, [AI]) — actualResult: Fail - Condition buyer-side của FT1 thoả thì field FT1 vẫn xuất hiện dù Group cha đang ẩn. Actual: nhập FT3 = "SHOW" thì field FT1 (0/20) xuất hiện trong form storefront (cùng FT2 đã có sẵn). Expected: FT1 vẫn không có field vì effective visibility = condition AND cờ Group (false); form chỉ có FT3. Cùng nguyên nhân gốc với BUG-321. Đã tạo bug. =>> Do bị cache
  ```
- **File đính kèm cho claim này:** không có
