# CBS-009__CLAIM-02

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-02` | `TIB-5428 — Campaign by Shopify products editor: modal Assign mockups hiện video cạnh mockup và chọn được (quan sát trên platform product #589, product thay thế có 3 variant)` | `portal (modal Assign mockups của platform product)` | `test_case` — PASS TC-TIB-6415 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-shopify; KB-021 (modal khi chưa có mockup — không mâu thuẫn)` | `ADD` |

## Phần 1b

| `CLAIM-02` | `campaign` | `create-campaign-by-shopify` | `owner/staff (seller, portal)` | `portal` | `không có (liên quan KB-021, không bị thay)` |

## Phần 5.1

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6415`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Quy ước fixture: Nprice1 không có product Shopify nào có variant Red/Blue/Green nên dùng product "Selling Plans Ski Wax" với 3 variant theo thứ tự "Selling Plans Ski Wax" / "Special Selling Plans Ski Wax" / "Sample Selling Plans Ski Wax" = Red / Blue / Green (dropdown variant liệt kê: Sample Selling Plans Ski Wax - 9.95$, Selling Plans Ski Wax - 24.95$, Special Selling Plans Ski Wax - 49.95$). Platform product #589 (campaign by Shopify products), modal "Assign mockups": grid có 3 item — 2 mockup (M4, M5) + video V3 (thumbnail YouTube i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg, 480px); click V3 thì được tick (checked=[F,F,T]), không báo lỗi. API: case chỉ đọc, chưa Save.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6415 — Campaign by Shopify products editor — picker hiển thị video cạnh mockup
- status_now: passed · bugId: None · Requirement/Rule: C1, C2
- expectedResult:
```
Kết quả mong đợi: Modal hiển thị cả mockup và video của campaign; video chọn được để gán giống campaign by Product Base.
Cách kiểm tra:
Modal Assign mockups → có video V3 nằm cùng grid với mockup M4/M5.
Click V3 → chọn được, không báo lỗi.
```
- actualResult:
```
Quy ước fixture: Nprice1 không có product Shopify nào có variant Red/Blue/Green nên dùng product "Selling Plans Ski Wax" với 3 variant theo thứ tự "Selling Plans Ski Wax" / "Special Selling Plans Ski Wax" / "Sample Selling Plans Ski Wax" = Red / Blue / Green (dropdown variant liệt kê: Sample Selling Plans Ski Wax - 9.95$, Selling Plans Ski Wax - 24.95$, Special Selling Plans Ski Wax - 49.95$). Platform product #589 (campaign by Shopify products), modal "Assign mockups": grid có 3 item — 2 mockup (M4, M5) + video V3 (thumbnail YouTube i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg, 480px); click V3 thì được tick (checked=[F,F,T]), không báo lỗi. API: case chỉ đọc, chưa Save.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Platform product: #589
[ảnh]
```
