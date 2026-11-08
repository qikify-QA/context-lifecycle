# CBS-009__CLAIM-04

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-04` | `TIB-5428 / C3 — gán video ↔ variant nhiều-nhiều (1-n, n-1, n-n) ở campaign editor; mutation AssignMockupVariantIds set variant_ids cho đúng video, không xoá mapping video khác` | `portal · api (POST /api/graphql AssignMockupVariantIds)` | `test_case` — PASS TC-TIB-6416 2026-10-22 staging [AI]; PASS TC-TIB-6417 2026-10-22 staging [AI]; PASS TC-TIB-6418 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base; tương tự KB-085 (PB dùng update_mockups_many)` | `ADD` |

## Phần 1b

| `CLAIM-04` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có` |

## Phần 5.1

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6416, TC-TIB-6417, TC-TIB-6418`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6416]
  Bulk assign: chọn 3 variant Red/Blue/Green + V1, Save thành công. Sau khi reload trang, Mockup assignments: Group by Variant — Red, Blue, Green mỗi variant có "1 mockup" (V1); Group by Mockup — dòng V1 liệt kê Blue, Green, Red "3 variants". API: POST /api/graphql AssignMockupVariantIds => 200, update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496,93498,93502] (Red, Blue, Green) — khớp đủ 3 variant, không rơi variant nào.
  [TC-TIB-6417]
  Lưu ý precondition: campaign lúc chạy đã có V1 → Red (từ case trước) nên chạy bằng Edit trên dòng variant Red (modal "Assign mockups to a variant", tick sẵn V1) rồi tick thêm V2 và Save. Kết quả: Group by Variant — Red - S "2 mockups" (V1 + V2). API: POST /api/graphql AssignMockupVariantIds => 200, where id=12503 (V2) _set variant_ids=[93496] (Red); V1 (id 12502) giữ nguyên Red, không bị xoá. Reload kiểm lại ở case sau vẫn giữ.
  [TC-TIB-6418]
  Bulk assign lần 1: Red+Blue + V1; lần 2: Blue+Green + V2. Group by Variant: Red 1 mockup, Blue 2 mockups (V1+V2), Green 1 mockup. Group by Mockup: dòng V1 → Blue, Red (2 variants); dòng V2 → Blue, Green (2 variants). API: lần 1 POST /api/graphql => 200, id 12502 (V1) variant_ids=[93496,93498]; lần 2 => 200, chỉ id 12503 (V2) variant_ids=[93498,93502], không có lệnh nào đụng V1 / không xoá mapping V1.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6416 — Gán 1 video cho nhiều variant (1-n)
- status_now: passed · bugId: None · Requirement/Rule: C3, R1
- expectedResult:
```
Kết quả mong đợi: Save thành công; V1 được gán cho cả 3 variant Red, Blue, Green.
Cách kiểm tra:
View Mockup assignments (Group by Variant): cả Red, Blue, Green đều có dòng V1.
Network → request lưu assignment khi bấm Save: payload chứa id của V1 kèm đủ 3 variant Red/Blue/Green, không bị rơi hay đổi variant nào.
Reload trang → assignment vẫn đủ 3 variant.
```
- actualResult:
```
Bulk assign: chọn 3 variant Red/Blue/Green + V1, Save thành công. Sau khi reload trang, Mockup assignments: Group by Variant — Red, Blue, Green mỗi variant có "1 mockup" (V1); Group by Mockup — dòng V1 liệt kê Blue, Green, Red "3 variants". API: POST /api/graphql AssignMockupVariantIds => 200, update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496,93498,93502] (Red, Blue, Green) — khớp đủ 3 variant, không rơi variant nào.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122 "CP-5428 Video assign (TIB-221)"
[ảnh]
```

### TC-TIB-6417 — Gán nhiều video cho 1 variant (n-1)
- status_now: passed · bugId: None · Requirement/Rule: C3, R1
- expectedResult:
```
Kết quả mong đợi: Save thành công; variant Red nhận cả V1 và V2.
Cách kiểm tra:
View Mockup assignments (Group by Variant) → Red có 2 dòng video V1 và V2.
Network → request lưu assignment: payload có variant Red kèm cả 2 id video V1, V2.
Reload trang → vẫn đủ 2 video.
```
- actualResult:
```
Lưu ý precondition: campaign lúc chạy đã có V1 → Red (từ case trước) nên chạy bằng Edit trên dòng variant Red (modal "Assign mockups to a variant", tick sẵn V1) rồi tick thêm V2 và Save. Kết quả: Group by Variant — Red - S "2 mockups" (V1 + V2). API: POST /api/graphql AssignMockupVariantIds => 200, where id=12503 (V2) _set variant_ids=[93496] (Red); V1 (id 12502) giữ nguyên Red, không bị xoá. Reload kiểm lại ở case sau vẫn giữ.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
[ảnh]
```

### TC-TIB-6418 — Gán video ↔ variant kiểu nhiều-nhiều (n-n)
- status_now: passed · bugId: None · Requirement/Rule: C3, R1
- expectedResult:
```
Kết quả mong đợi: V1 gán cho Red + Blue, V2 gán cho Blue + Green; variant Blue có cả V1 và V2. Lần Save thứ hai không xoá assignment của lần đầu.
Cách kiểm tra:
Group by Variant: Red → V1; Blue → V1 + V2; Green → V2.
Group by Mockup: dòng V1 → Red, Blue; dòng V2 → Blue, Green.
Network → request lưu assignment lần 2: chỉ bổ sung mapping của V2, không gửi lệnh xoá mapping V1.
```
- actualResult:
```
Bulk assign lần 1: Red+Blue + V1; lần 2: Blue+Green + V2. Group by Variant: Red 1 mockup, Blue 2 mockups (V1+V2), Green 1 mockup. Group by Mockup: dòng V1 → Blue, Red (2 variants); dòng V2 → Blue, Green (2 variants). API: lần 1 POST /api/graphql => 200, id 12502 (V1) variant_ids=[93496,93498]; lần 2 => 200, chỉ id 12503 (V2) variant_ids=[93498,93502], không có lệnh nào đụng V1 / không xoá mapping V1.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
[ảnh][ảnh]
```

## Trích nguyên văn 5.1 (bỏ thụt lề 2 khoảng của code fence; = ref.quote của plan)

[TC-TIB-6416]
Bulk assign: chọn 3 variant Red/Blue/Green + V1, Save thành công. Sau khi reload trang, Mockup assignments: Group by Variant — Red, Blue, Green mỗi variant có "1 mockup" (V1); Group by Mockup — dòng V1 liệt kê Blue, Green, Red "3 variants". API: POST /api/graphql AssignMockupVariantIds => 200, update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496,93498,93502] (Red, Blue, Green) — khớp đủ 3 variant, không rơi variant nào.
[TC-TIB-6417]
Lưu ý precondition: campaign lúc chạy đã có V1 → Red (từ case trước) nên chạy bằng Edit trên dòng variant Red (modal "Assign mockups to a variant", tick sẵn V1) rồi tick thêm V2 và Save. Kết quả: Group by Variant — Red - S "2 mockups" (V1 + V2). API: POST /api/graphql AssignMockupVariantIds => 200, where id=12503 (V2) _set variant_ids=[93496] (Red); V1 (id 12502) giữ nguyên Red, không bị xoá. Reload kiểm lại ở case sau vẫn giữ.
[TC-TIB-6418]
Bulk assign lần 1: Red+Blue + V1; lần 2: Blue+Green + V2. Group by Variant: Red 1 mockup, Blue 2 mockups (V1+V2), Green 1 mockup. Group by Mockup: dòng V1 → Blue, Red (2 variants); dòng V2 → Blue, Green (2 variants). API: lần 1 POST /api/graphql => 200, id 12502 (V1) variant_ids=[93496,93498]; lần 2 => 200, chỉ id 12503 (V2) variant_ids=[93498,93502], không có lệnh nào đụng V1 / không xoá mapping V1.
