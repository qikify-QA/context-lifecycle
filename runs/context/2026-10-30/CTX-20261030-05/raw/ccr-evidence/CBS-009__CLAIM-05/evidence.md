# CBS-009__CLAIM-05

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-05` | `TIB-5428 / C12 — modal Assign: Save được khi chỉ chọn video (0 mockup); không chọn media nào thì Save disabled; video hiện bằng thumbnail của chính video (YouTube/Vimeo)` | `portal · api` | `test_case` — PASS TC-TIB-6419 2026-10-22 staging [AI]; PASS TC-TIB-6420 2026-10-22 staging [AI]; PASS TC-TIB-6421 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base; product-base/mockup-attachment CHK-06-009 (điều kiện Save)` | `ADD` |

## Phần 1b

| `CLAIM-05` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal` | `không có` |

## Phần 5.1

### CLAIM-05

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6419, TC-TIB-6420, TC-TIB-6421`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6419]
  Chọn variant Red + chỉ video V1 (0 mockup): nút Save enable, lưu thành công và modal chuyển sang "Mockup assignments"; Group by Variant: Red - S "1 mockup" (V1), Blue/Green "Not assigned yet". API: POST /api/graphql AssignMockupVariantIds, status 200, payload update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496] (Red) — khớp, không có mockup id nào; response affected_rows=1.
  [TC-TIB-6420]
  Chọn variant Red, không chọn media nào (checked=[F,F,F,F,F]): nút Save ở trạng thái disabled. Network: không có request lưu assignment (chỉ có các GET campaign/clipart-categories lúc load trang). Red chưa có dòng media nào.
  [TC-TIB-6421]
  V1 hiển thị thumbnail YouTube của chính video (i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg, 480px) và V2 thumbnail Vimeo (i.vimeocdn.com/video/452001751…, 640px); cả hai naturalWidth > 0, không vỡ ảnh, không dùng placeholder mockup. Network: GET ytimg => 200, GET vimeocdn => 200.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6419 — Save modal Assign khi chỉ chọn video, 0 mockup
- status_now: passed · bugId: None · Requirement/Rule: C12, R9
- expectedResult:
```
Kết quả mong đợi: Nút Save bật được và lưu thành công — chọn 0 mockup + 1 video là hợp lệ. Variant Red có assignment chỉ gồm V1.
Cách kiểm tra:
Modal → nút Save ở trạng thái enable sau khi chọn V1.
Network → request lưu assignment: payload có variant Red + id V1, không có mockup id.
View Mockup assignments (Group by Variant) → Red chỉ có dòng V1.
```
- actualResult:
```
Chọn variant Red + chỉ video V1 (0 mockup): nút Save enable, lưu thành công và modal chuyển sang "Mockup assignments"; Group by Variant: Red - S "1 mockup" (V1), Blue/Green "Not assigned yet". API: POST /api/graphql AssignMockupVariantIds, status 200, payload update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496] (Red) — khớp, không có mockup id nào; response affected_rows=1.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122 "CP-5428 Video assign (TIB-221)"
[ảnh]
```

### TC-TIB-6420 — Không chọn mockup lẫn video → không Save được
- status_now: passed · bugId: None · Requirement/Rule: C12, R9
- expectedResult:
```
Kết quả mong đợi: Không Save được — nút Save bị disable (hoặc bị chặn khi bấm); không có assignment nào được tạo cho Red.
Cách kiểm tra:
Modal → nút Save ở trạng thái disable / bấm không có tác dụng.
Network → không có request lưu assignment nào được gửi.
View Mockup assignments → Red vẫn không có dòng media nào.
```
- actualResult:
```
Chọn variant Red, không chọn media nào (checked=[F,F,F,F,F]): nút Save ở trạng thái disabled. Network: không có request lưu assignment (chỉ có các GET campaign/clipart-categories lúc load trang). Red chưa có dòng media nào.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
[ảnh]
```

### TC-TIB-6421 — Video trong picker hiển thị bằng thumbnail của video
- status_now: passed · bugId: None · Requirement/Rule: C12
- expectedResult:
```
Kết quả mong đợi: Mỗi video hiển thị bằng thumbnail của chính video đó (không phải ô trống, không phải ảnh placeholder của mockup).
Cách kiểm tra:
Modal Assign mockups → item V1 và V2 đều có ảnh thumbnail hiển thị được, không bị vỡ ảnh.
Network → request ảnh thumbnail của V1/V2 trả về 200.
```
- actualResult:
```
V1 hiển thị thumbnail YouTube của chính video (i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg, 480px) và V2 thumbnail Vimeo (i.vimeocdn.com/video/452001751…, 640px); cả hai naturalWidth > 0, không vỡ ảnh, không dùng placeholder mockup. Network: GET ytimg => 200, GET vimeocdn => 200.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
[ảnh]
```

## Trích nguyên văn 5.1 (bỏ thụt lề 2 khoảng của code fence; = ref.quote của plan)

[TC-TIB-6419]
Chọn variant Red + chỉ video V1 (0 mockup): nút Save enable, lưu thành công và modal chuyển sang "Mockup assignments"; Group by Variant: Red - S "1 mockup" (V1), Blue/Green "Not assigned yet". API: POST /api/graphql AssignMockupVariantIds, status 200, payload update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496] (Red) — khớp, không có mockup id nào; response affected_rows=1.
[TC-TIB-6420]
Chọn variant Red, không chọn media nào (checked=[F,F,F,F,F]): nút Save ở trạng thái disabled. Network: không có request lưu assignment (chỉ có các GET campaign/clipart-categories lúc load trang). Red chưa có dòng media nào.
[TC-TIB-6421]
V1 hiển thị thumbnail YouTube của chính video (i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg, 480px) và V2 thumbnail Vimeo (i.vimeocdn.com/video/452001751…, 640px); cả hai naturalWidth > 0, không vỡ ảnh, không dùng placeholder mockup. Network: GET ytimg => 200, GET vimeocdn => 200.
