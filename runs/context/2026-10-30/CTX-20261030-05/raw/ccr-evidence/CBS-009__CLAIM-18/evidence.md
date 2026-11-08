# CBS-009__CLAIM-18

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-18` | `TIB-5428 / C14 (một phần) — duplicate video/mockup trong campaign và Duplicate campaign giữ nguyên assignment video (và cả mockup ảnh)` | `portal · api (POST /api/campaign-mockups/<id>/clone, POST /api/campaigns/<id>/clone)` | `test_case` — PASS TC-TIB-6437 2026-10-22 staging [AI]; PASS TC-TIB-6438 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base; phù hợp KB-086 (duplicate mockup PB copy variant_ids); NGƯỢC local mockup.md (TIB-5237: duplicate campaign để mockup unassigned)` | `ADD` |

## Phần 1b

| `CLAIM-18` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có (liên quan KB-086)` |

## Phần 5.1

### CLAIM-18

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6437, TC-TIB-6438`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6437]
  Làm trên campaign clone #3142 (không đụng #3122). Gán V1 → Red + Blue, M1 → Red; duplicate V1 (POST /api/campaign-mockups/12549/clone => 201) và duplicate M1 (POST /api/campaign-mockups/12547/clone => 201, response variant_ids=[93496] = Red). Mockup assignments sau duplicate: Group by Mockup — V1 (Blue, Red) giữ nguyên, V1-copy (Blue, Red), M1-copy (Red); Group by Variant — Red "5 mockups" (V1, V1-copy, M1, M1-copy, M2), Blue "3 mockups" (V1, V1-copy, V2), Green "1 mockup" (V2). Bản copy giữ assignment giống bản gốc, assignment gốc không bị mất.
  [TC-TIB-6438]
  Campaign gốc #3122 gán V1 → Red, V2 → Blue + Green (kèm M1, M2 → Red). Dùng "Duplicate campaign" (POST /api/campaigns/3122/clone => 200) tạo clone #3142 "CP-5428 Video assign (TIB-221) copy". Mockup assignments của clone, Group by Variant: Red "3 mockups" (V1 + M1 + M2), Blue "1 mockup" (V2), Green "1 mockup" (V2); Group by Mockup: dòng V1 → Red, dòng V2 → Blue, Green — giống hệt campaign gốc. (Lưu ý: clone cũng giữ luôn assignment mockup ảnh, khác ghi chú trong mockup.md rằng duplicate campaign để mockup unassigned — chỉ ghi nhận, không ảnh hưởng kết quả case.) Campaign gốc không đổi.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6437 — Duplicate video / mockup — assignment video được giữ
- status_now: passed · bugId: None · Requirement/Rule: C14, R11
- expectedResult:
```
Kết quả mong đợi: Assignment của V1 (Red + Blue) không bị mất sau khi duplicate; bản copy giữ assignment theo đúng hành vi duplicate (assignment được giữ, không bị xoá trắng).
Cách kiểm tra:
Mockup assignments (Group by Variant): Red và Blue vẫn có V1.
Dòng V1-copy có assignment Red + Blue giống bản gốc.
Network → response duplicate: payload trả về của bản copy chứa mapping variant tương ứng.
```
- actualResult:
```
Làm trên campaign clone #3142 (không đụng #3122). Gán V1 → Red + Blue, M1 → Red; duplicate V1 (POST /api/campaign-mockups/12549/clone => 201) và duplicate M1 (POST /api/campaign-mockups/12547/clone => 201, response variant_ids=[93496] = Red). Mockup assignments sau duplicate: Group by Mockup — V1 (Blue, Red) giữ nguyên, V1-copy (Blue, Red), M1-copy (Red); Group by Variant — Red "5 mockups" (V1, V1-copy, M1, M1-copy, M2), Blue "3 mockups" (V1, V1-copy, V2), Green "1 mockup" (V2). Bản copy giữ assignment giống bản gốc, assignment gốc không bị mất.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3142 "CP-5428 Video assign (TIB-221) copy"
[ảnh][ảnh]
```

### TC-TIB-6438 — Clone campaign — assignment video được giữ
- status_now: passed · bugId: None · Requirement/Rule: C14, R11
- expectedResult:
```
Kết quả mong đợi: Campaign clone có đúng assignment video của campaign gốc — Red → V1; Blue → V2; Green → V2.
Cách kiểm tra:
CP-5428-clone → Mockup assignments (Group by Variant): Red → V1; Blue → V2; Green → V2.
Network → response clone campaign: dữ liệu assignment video có trong campaign mới.
Campaign gốc CP-5428 giữ nguyên assignment, không bị thay đổi.
```
- actualResult:
```
Campaign gốc #3122 gán V1 → Red, V2 → Blue + Green (kèm M1, M2 → Red). Dùng "Duplicate campaign" (POST /api/campaigns/3122/clone => 200) tạo clone #3142 "CP-5428 Video assign (TIB-221) copy". Mockup assignments của clone, Group by Variant: Red "3 mockups" (V1 + M1 + M2), Blue "1 mockup" (V2), Green "1 mockup" (V2); Group by Mockup: dòng V1 → Red, dòng V2 → Blue, Green — giống hệt campaign gốc. (Lưu ý: clone cũng giữ luôn assignment mockup ảnh, khác ghi chú trong mockup.md rằng duplicate campaign để mockup unassigned — chỉ ghi nhận, không ảnh hưởng kết quả case.) Campaign gốc không đổi.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign gốc: #3122
Campaign clone: #3142
[ảnh][ảnh]
```

## Trích nguyên văn 5.1 (bỏ thụt lề 2 khoảng của code fence; = ref.quote của plan)

[TC-TIB-6437]
Làm trên campaign clone #3142 (không đụng #3122). Gán V1 → Red + Blue, M1 → Red; duplicate V1 (POST /api/campaign-mockups/12549/clone => 201) và duplicate M1 (POST /api/campaign-mockups/12547/clone => 201, response variant_ids=[93496] = Red). Mockup assignments sau duplicate: Group by Mockup — V1 (Blue, Red) giữ nguyên, V1-copy (Blue, Red), M1-copy (Red); Group by Variant — Red "5 mockups" (V1, V1-copy, M1, M1-copy, M2), Blue "3 mockups" (V1, V1-copy, V2), Green "1 mockup" (V2). Bản copy giữ assignment giống bản gốc, assignment gốc không bị mất.
[TC-TIB-6438]
Campaign gốc #3122 gán V1 → Red, V2 → Blue + Green (kèm M1, M2 → Red). Dùng "Duplicate campaign" (POST /api/campaigns/3122/clone => 200) tạo clone #3142 "CP-5428 Video assign (TIB-221) copy". Mockup assignments của clone, Group by Variant: Red "3 mockups" (V1 + M1 + M2), Blue "1 mockup" (V2), Green "1 mockup" (V2); Group by Mockup: dòng V1 → Red, dòng V2 → Blue, Green — giống hệt campaign gốc. (Lưu ý: clone cũng giữ luôn assignment mockup ảnh, khác ghi chú trong mockup.md rằng duplicate campaign để mockup unassigned — chỉ ghi nhận, không ảnh hưởng kết quả case.) Campaign gốc không đổi.
