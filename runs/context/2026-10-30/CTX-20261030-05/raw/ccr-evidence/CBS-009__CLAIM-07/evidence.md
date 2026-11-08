# CBS-009__CLAIM-07

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-07` | `TIB-5428 / C4 — label setting Product Page đổi thành "Show only the assigned images and videos of the selected variant"; trang không còn chuỗi cũ (config key vẫn là show_assigned_variant_images_only)` | `portal (Store Settings → Product Page Settings)` | `test_case` — PASS TC-TIB-6423 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/product-page-settings-config — KB-025 và CHK-003 đang ghi đúng chuỗi label CŨ → CHK-003 có thể chạy SAI (không chỉ thiếu); KB-038 (key config không đổi)` | `SUPERSEDES` |

## Phần 1b

| `CLAIM-07` | `sdk` | `product-page-settings-config` | `owner/staff (seller, portal)` | `portal` | `KB-025` |

## Phần 5.1

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6423`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Store settings → Product Page hiển thị đúng label "Show only the assigned images and videos of the selected variant"; trang không còn chuỗi cũ "assigned images of the selected". API: case chỉ đọc, không có thao tác lưu.
  [Jira TIB-5428 description, mục Product Page settings] Rename `Show only the assigned images of the selected variant` to `Show only the assigned images and videos of the selected variant`.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6423 — Label setting đổi thành "Show only the assigned images and videos of the selected variant"
- status_now: passed · bugId: None · Requirement/Rule: C4
- expectedResult:
```
Kết quả mong đợi: Label hiển thị đúng Show only the assigned images and videos of the selected variant; không còn label cũ Show only the assigned images of the selected variant.
Cách kiểm tra:
Store settings → Product Page: text của setting khớp từng chữ với label mới.
Tìm trong trang không còn chuỗi label cũ.
```
- actualResult:
```
Store settings → Product Page hiển thị đúng label "Show only the assigned images and videos of the selected variant"; trang không còn chuỗi cũ "assigned images of the selected". API: case chỉ đọc, không có thao tác lưu.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Trang: product-page-settings
[ảnh]
```

## Trích nguyên văn 5.1 (bỏ thụt lề 2 khoảng của code fence; = ref.quote của plan)

Store settings → Product Page hiển thị đúng label "Show only the assigned images and videos of the selected variant"; trang không còn chuỗi cũ "assigned images of the selected". API: case chỉ đọc, không có thao tác lưu.
[Jira TIB-5428 description, mục Product Page settings] Rename `Show only the assigned images of the selected variant` to `Show only the assigned images and videos of the selected variant`.
