# CBS-009__CLAIM-23

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-23` | `TIB-5428 / C15 (một phần) — xoá video hoặc xoá variant khỏi campaign: assignment tương ứng biến mất, assignment khác giữ nguyên; storefront không còn video đã xoá` | `portal · api (DELETE /api/campaign-products/<id>/campaign-mockups, GraphQL delete_campaign_variants) · storefront` | `test_case` — PASS TC-TIB-6441 2026-10-22 staging [AI]; PASS TC-TIB-6442 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base` | `ADD` |

## Phần 1b

| `CLAIM-23` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có` |

## Phần 5.1

### CLAIM-23

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6441, TC-TIB-6442`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6441]
  Làm trên campaign clone #3142 (publish lên Nprice1, setting ON). Gán V1 → Red + Blue, V2 → Green, xoá V1. API: DELETE /api/campaign-products/4674/campaign-mockups body {"ids":[12549]} => 204. Mockup assignments: Group by Variant — Red "2 mockups" (M1, M2, không còn V1), Blue "Not assigned yet", Green "1 mockup" (V2 giữ nguyên); Group by Mockup — không còn dòng V1. Sau Update (POST /api/campaigns/3142/sync => 200), storefront Red: gallery chỉ 2 slide mockup, không còn video V1; Green vẫn hiện V2 (Vimeo 76979871).
  [TC-TIB-6442]
  Làm trên campaign clone #3142, không đụng PB #3415. Precondition lệch nhẹ: V1 của clone đã bị xoá ở case trước nên dùng V2 → Red + Blue (M1, M2 → Red). Xoá Blue khỏi campaign bằng sửa product → đặt Blue / S = Unavailable → Save: POST /api/graphql delete_campaign_variants {campaign_product_id: 4674, variant_ids: [93498]} => 200 (+ staff-activity-logs/campaign-variant => 204). Sau reload, Mockup assignments: Group by Variant — không còn nhóm Blue, Green "Not assigned yet", Red "3 mockups" (M1, M2, V2); Group by Mockup — dòng V2 chỉ còn liệt kê Red - S. Assignment V2-Red giữ nguyên.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6441 — Xoá video — assignment tương ứng không còn hiển thị
- status_now: passed · bugId: None · Requirement/Rule: C15, R12
- expectedResult:
```
Kết quả mong đợi: Mọi assignment của V1 không còn hiển thị; assignment của V2 → Green không bị ảnh hưởng.
Cách kiểm tra:
Mockup assignments (Group by Variant): Red và Blue không còn dòng V1; Green vẫn có V2.
Group by Mockup: không còn dòng V1.
Network → request xoá video trả về thành công, và request load lại assignment không còn mapping của V1.
Storefront → gallery SDK ở variant Red: không còn item video V1.
```
- actualResult:
```
Làm trên campaign clone #3142 (publish lên Nprice1, setting ON). Gán V1 → Red + Blue, V2 → Green, xoá V1. API: DELETE /api/campaign-products/4674/campaign-mockups body {"ids":[12549]} => 204. Mockup assignments: Group by Variant — Red "2 mockups" (M1, M2, không còn V1), Blue "Not assigned yet", Green "1 mockup" (V2 giữ nguyên); Group by Mockup — không còn dòng V1. Sau Update (POST /api/campaigns/3142/sync => 200), storefront Red: gallery chỉ 2 slide mockup, không còn video V1; Green vẫn hiện V2 (Vimeo 76979871).
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3142
Storefront: cp-5428-video-assign-tib-221-copy
[ảnh][ảnh][ảnh]
```

### TC-TIB-6442 — Xoá variant — assignment video của variant đó không còn hiển thị
- status_now: passed · bugId: None · Requirement/Rule: C15, R12
- expectedResult:
```
Kết quả mong đợi: Assignment V1-Blue không còn hiển thị; assignment V1-Red vẫn giữ nguyên.
Cách kiểm tra:
Mockup assignments (Group by Variant): không còn nhóm Blue; Red vẫn có V1.
Group by Mockup: dòng V1 chỉ còn liệt kê Red.
Network → request load assignment sau khi xoá: không còn mapping V1-Blue.
```
- actualResult:
```
Làm trên campaign clone #3142, không đụng PB #3415. Precondition lệch nhẹ: V1 của clone đã bị xoá ở case trước nên dùng V2 → Red + Blue (M1, M2 → Red). Xoá Blue khỏi campaign bằng sửa product → đặt Blue / S = Unavailable → Save: POST /api/graphql delete_campaign_variants {campaign_product_id: 4674, variant_ids: [93498]} => 200 (+ staff-activity-logs/campaign-variant => 204). Sau reload, Mockup assignments: Group by Variant — không còn nhóm Blue, Green "Not assigned yet", Red "3 mockups" (M1, M2, V2); Group by Mockup — dòng V2 chỉ còn liệt kê Red - S. Assignment V2-Red giữ nguyên.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3142
[ảnh][ảnh]
```

## Trích nguyên văn 5.1 (bỏ thụt lề 2 khoảng của code fence; = ref.quote của plan)

[TC-TIB-6441]
Làm trên campaign clone #3142 (publish lên Nprice1, setting ON). Gán V1 → Red + Blue, V2 → Green, xoá V1. API: DELETE /api/campaign-products/4674/campaign-mockups body {"ids":[12549]} => 204. Mockup assignments: Group by Variant — Red "2 mockups" (M1, M2, không còn V1), Blue "Not assigned yet", Green "1 mockup" (V2 giữ nguyên); Group by Mockup — không còn dòng V1. Sau Update (POST /api/campaigns/3142/sync => 200), storefront Red: gallery chỉ 2 slide mockup, không còn video V1; Green vẫn hiện V2 (Vimeo 76979871).
[TC-TIB-6442]
Làm trên campaign clone #3142, không đụng PB #3415. Precondition lệch nhẹ: V1 của clone đã bị xoá ở case trước nên dùng V2 → Red + Blue (M1, M2 → Red). Xoá Blue khỏi campaign bằng sửa product → đặt Blue / S = Unavailable → Save: POST /api/graphql delete_campaign_variants {campaign_product_id: 4674, variant_ids: [93498]} => 200 (+ staff-activity-logs/campaign-variant => 204). Sau reload, Mockup assignments: Group by Variant — không còn nhóm Blue, Green "Not assigned yet", Red "3 mockups" (M1, M2, V2); Group by Mockup — dòng V2 chỉ còn liệt kê Red - S. Assignment V2-Red giữ nguyên.
