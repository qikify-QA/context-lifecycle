# Context Change Request: Teeinblue, asset-category

**Tiêu đề task:** `[CCR] PROFILE_GAP — asset-category — backfill dropzone, cap clipart, daily limit, Horizon`

Khuôn: bundled canonical `references/ccr-template.md` của skill `create-ccr`. Phụ lục: `context-lifecycle/knowledge/how-to-request/ccr-product-appendix.md`. Bản nháp local, chưa submit. Trích dẫn Jira lấy từ comment, đã bỏ thẻ định dạng; `[...]` trong trích dẫn là phần che tên account hoặc id theo yêu cầu.

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đề xuất 1 CCR cho object này, vì CCR chạm cùng object sẽ bị lock. Mọi claim cùng product `teeinblue`. 

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

**Loại:** `PROFILE_GAP`

**Object** `[AGENT]`

- Product: `teeinblue`
- Object: `asset-category` · Feature: `asset-category-item-management`

**Quan sát được** `[AGENT]`

```
TIB-5544: Clipart upload creates broken cliparts when the temporary file never reaches storage (Done)
  - CLAIM-01: Dropzone upload: viết expected theo text, không theo icon
  - CLAIM-05: Horizon (job failed, queued) không kiểm được trên môi trường QA
  - CLAIM-06: Upload temporary file: message của MCP confirm tool (phần 2)
TIB-5536: [UID] Open API to upload material to the image layer library (Done)
  - CLAIM-02: Cap 300 clipart/category từ 2025, admin nâng theo merchant; chạm cap trả 422; zip bulk tạo category mới, file thừa bị skip
  - CLAIM-03: Daily limit upload asset dùng chung portal và Open API, chỉnh bằng "... max attempts"
  - CLAIM-04: Daily limit đếm số lượt upload trong cửa sổ trượt 24h UTC, kể cả ảnh đã xoá; "Wait until" = lượt cũ nhất + 24h
TIB-5516: tiêu đề và status chưa tra
  - CLAIM-07: File users/<merchant> trên CDN public; ownership check theo path
```

- Nguồn: tổng hợp từ `rules/tib-product-behaviors.md`, `rules/env-capabilities.md`, Jira và Testlane. KHÔNG PHẢI quan sát trực tiếp của người soạn CCR trên môi trường thật.
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 0 lần do người soạn CCR tự verify. Lượt chạy test ghi ở 5.1.

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Đợt backfill này không chạy lại gì trên staging hay production. Các vế chưa có TC PASS ghi ở từng claim trong 5.1.
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | loại: scope test. Dropzone upload: viết expected theo text, không theo icon | portal | `po_dev_confirm` | asset-category/asset-category-item-management | `ADD` |
| `CLAIM-02` | loại: hành vi. Cap 300 clipart/category từ 2025, admin nâng theo merchant; chạm cap trả 422; zip bulk tạo category mới, file thừa bị skip | portal · api | `po_dev_confirm` | asset-category/asset-category-item-management | `ADD` |
| `CLAIM-03` | loại: hành vi. Daily limit upload asset dùng chung portal và Open API, chỉnh bằng "... max attempts" | portal · api | `po_dev_confirm` | asset-category/asset-category-item-management | `ADD` |
| `CLAIM-04` | loại: hành vi. Daily limit đếm số lượt upload trong cửa sổ trượt 24h UTC, kể cả ảnh đã xoá; "Wait until" = lượt cũ nhất + 24h | api | `po_dev_confirm` | asset-category/asset-category-item-management | `ADD` |
| `CLAIM-05` | loại: khác biệt môi trường. Horizon (job failed, queued) không kiểm được trên môi trường QA | chưa rõ, cần agent tự đánh giá (A4 ghi "Nhiều feature") | `po_dev_confirm` | asset-category/asset-category-item-management | `ADD` |
| `CLAIM-06` | loại: hành vi. Upload temporary file: message của MCP confirm tool (phần 2) | api | `po_dev_confirm` | asset-category/asset-category-item-management | `ADD` |
| `CLAIM-07` | loại: hành vi. File users/<merchant> trên CDN public; ownership check theo path | api | `po_dev_confirm` | asset-category/asset-category-item-management | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | asset-category | asset-category-item-management | QA (cách viết expected) | portal | không có (liên quan image-library KB-009) |
| `CLAIM-02` | asset-category | asset-category-item-management | merchant (owner/staff), admin | portal+api | không có |
| `CLAIM-03` | asset-category | asset-category-item-management | merchant (owner/staff), admin | portal+api | không có (số limit trùng một phần asset-category KB-035, KB-036) |
| `CLAIM-04` | asset-category | asset-category-item-management | merchant (owner/staff) | portal+api | không có |
| `CLAIM-05` | asset-category | asset-category-item-management | QA | api | không có |
| `CLAIM-06` | asset-category | asset-category-item-management | không rõ | api | không có |
| `CLAIM-07` | asset-category | asset-category-item-management | không rõ | api | không có |

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** link ticket và test case ở 5.1.
- **Trạng thái đối tượng lúc đó:** theo từng claim ở 5.1.
- **Environment:** staging, trừ khi claim nói khác.
- **Role liên quan:** theo cột scope.role ở Phần 1b.
- **Surface:** api · portal

## Phần 2a — Khác biệt giữa môi trường `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | Feature | Loại | Staging | Production | Cách test trên staging | Nguồn và ngày |
|---|---|---|---|---|---|---|
| `CLAIM-05` | `asset-category/asset-category-item-management` | `NOT_TESTABLE` (mức: Vế) | QA không truy cập Horizon | không rõ | bỏ vế Horizon, verify UI + API là đủ để pass | QA 2026-10-14, TIB-5544 |

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | Loại | Cần gì | Áp dụng cho | Nguồn |
|---|---|---|---|---|
| `CLAIM-02` | config | `clipart_max_per_category` trong Config JSON của user (Admin > Users), không ghi giá trị | asset-category-item-management | Dev huyenntk 2026-10-29, TIB-5536 #55962 |
| `CLAIM-03` | config | "... max attempts" ở admin panel, đổi xong phải trả lại giá trị cũ | asset-category-item-management | Dev huyenntk 2026-10-28, TIB-5536 #55888 |

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5544 | không rõ | 2026-10-15 | Jira Done, chưa rõ ngày deploy |
| TIB-5536 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5516 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: published_context_version 1; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - CLAIM-01: image-library KB-009 (OBSERVED_CURRENT, cập nhật 2026-10-26): "Khi upload file ở image picker hoặc media library modal ở merchant-owner/staging, quan sát thấy mỗi file có một dòng (thumbnail, tên file kèm đuôi, dòng trạng thái); dòng thành công ghi 'Your file is uploaded, reload after a few minutes if there is no preview …"
  - CLAIM-03: asset-category KB-035 (OBSERVED_CURRENT, cập nhật 2026-09-26): "Khi gọi POST /api/cliparts/svg (route tạo Clipart/Vector item) lặp lại 3 lần liên tiếp ở role merchant/owner trên staging (mỗi lần thiếu field 'file' bắt buộc nên trả 422), header x-ratelimit-limit=4000 giữ nguyên qua cả 3 lần — resource rate-limit của route n…"
  - CLAIM-03: asset-category KB-036 (OBSERVED_CURRENT, cập nhật 2026-09-26): "Khi gọi POST /api/clipart-categories (route tạo category) lặp lại 3 lần liên tiếp ở role merchant/owner trên staging (mỗi lần thiếu field bắt buộc nên trả 422), header x-ratelimit-limit=1000 giữ nguyên qua cả 3 lần — resource rate-limit của route này là `user_…"
  - CLAIM-02, CLAIM-04, CLAIM-05, CLAIM-06, CLAIM-07: không tìm thấy.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: dropzone, green check, red mark, icon, Your file is uploaded
  - CLAIM-02: 300, clipart_max_per_category, allows up to, max per category, category limit
  - CLAIM-03: max attempts, daily, Wait until, user_rate_limiter, 24h
  - CLAIM-04: cửa sổ trượt, Wait until, ảnh đã xoá, Reach the limit
  - CLAIM-05: Horizon, failed job, queued
  - CLAIM-06: upload-false-success-temporary-file
  - CLAIM-07: asset-library-bulk-thumbnail
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

**Mâu thuẫn giữa các nguồn, xử lý theo quy tắc lấy nguồn có ngày mới nhất:**

- CLAIM-02: Dev huyenntk 2026-10-28 (cap 300) mới hơn ghi nhận 2026-10-14 trong TC-TIB-5704 ("no clipart limit per category"). Claim theo Dev.
- CLAIM-04: File local 2026-10-29 (cửa sổ trượt) mới hơn comment huyenntk #55888 ngày 2026-10-28 ("per 24 h from the first upload"). Claim theo file local.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | QA | 2026-10-14 | `po_dev_confirm` |
| `CLAIM-02` | huyenntk (dev) | 2026-10-28 (#55888); 2026-10-29 (#55962) | `po_dev_confirm` |
| `CLAIM-03` | huyenntk (dev) | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-04` | QA | 2026-10-29 | `po_dev_confirm` |
| `CLAIM-05` | QA | 2026-10-14 | `po_dev_confirm` |
| `CLAIM-06` | QA | 2026-10-14 | `po_dev_confirm` |
| `CLAIM-07` | không ghi (bài học TIB-5516, 2026-10-09) | 2026-10-09 | `po_dev_confirm` |

Họ xác nhận chính xác điều gì: xem trích nguyên văn ở 5.1.

**Cần người xác nhận:**

- không có

## 4.2 KHÔNG đề xuất điều gì?

```
- Số liệu trong trích dẫn (limit, ngưỡng, cap thử nghiệm) là số tại thời điểm nguồn, không phải giá trị của mọi môi trường.
- feature_key và object_key ghi MỚI chỉ là đề xuất tên.
- Không đề xuất ghi đè canon. Claim CONTRADICTS giữ cả hai phía.
- Hướng dẫn test trong file local (hỏi cap thực tế, tên account, id data) không phải rule sản phẩm.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
CLAIM-01: Kết quả dropzone (clipart, layer image, mockup library) kiểm theo text; icon check và mark bị CSS ẩn.
CLAIM-02: Mỗi clipart category có cap 300 item từ 2025 (manual, SVG, zip bulk, Open API); admin nâng được theo merchant bằng key config `clipart_max_per_category`. Chạm cap: POST /cliparts trả 422 "The category allows up to N items". Zip bulk luôn tạo category mới từ folder; file thừa bị skip với log "Failed - <path> - ...", bulk upload kết thúc done.
CLAIM-03: Daily limit upload asset (1,000 layer image, 4,000 clipart, 1,000 clipart category mỗi 24h) dùng chung cho portal và Open API; không có reset; chỉnh theo merchant bằng "... max attempts" ở admin panel.
CLAIM-04: Daily limit upload asset đếm số lượt upload đã tạo trong cửa sổ trượt 24h UTC, kể cả ảnh đã xoá. Mốc "Wait until" là lượt cũ nhất cộng 24h.
CLAIM-05: [NOT_TESTABLE] Môi trường test: không kiểm được Horizon (job failed, queued); Production: không rõ; Cách test: bỏ vế Horizon, verify UI và API là đủ để pass.
CLAIM-06: MCP confirm tool trả message riêng ("File has not been uploaded yet…"), hành vi này được chấp nhận.
CLAIM-07: File users/<merchant>/... trên CDN (cdn.ownego.com/teeinblue-staging/...) đang public, không cần login. Ở TIB-5516, API chặn path users/<merchant khác>/... nhưng nhận URL CDN tuyệt đối của cùng file, nên ownership check bị bypass bằng cách đổi định dạng.
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 47; TC-TIB-5697, TC-TIB-5696 (task TIB-196)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5697
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 47:
    ```
    - **Dropzone upload** (clipart, layer image, mockup library): viết expected theo text, không theo icon (icon bị CSS ẩn). Text cụ thể: `.claude/flows/assets-library.md`. (người dùng 2026-10-14, TIB-5544)
    ```
  - Testlane TC-TIB-5697, actualResult:
    ```
    "Green check" wording: previews end in "Your file is uploaded, we are generating file preview…" (no icon by design of current CSS). User confirmed 2026-10-14: UI + API verification sufficient → passed.
    ```
  - Testlane TC-TIB-5696, actualResult:
    ```
    "Red error mark" wording: icon hidden by CSS; error is shown as red text. User confirmed 2026-10-14: error message shown on UI + API behavior is sufficient → passed.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5536 comment #55888 và #55962; TC-TIB-7521 (task TIB-265)
- **Link:** https://ownego.atlassian.net/browse/TIB-5536?focusedCommentId=55888
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28 (#55888); 2026-10-29 (#55962)
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28:
    ```
    The 300 cap is not new. The portal has had it since 2025: manual upload, SVG upload and the zip bulk upload. Admins can raise it per merchant. The Open API applies the same check, only when adding a clipart.
    ```
  - Jira TIB-5536 comment #55962, huyenntk (dev), 2026-10-29:
    ```
    POST /cliparts: 422 on category_id with the portal's message: "The category allows up to 5 items". It's checked before the file is read, so the upload_id isn't used up and nothing counts toward the daily limit. on_duplicate: replace still works on a full category because it adds nothing.
    ```
  - Jira TIB-5536 comment #55962, huyenntk (dev), 2026-10-29:
    ```
    Zip bulk upload: it always creates new categories from the zip's folders (optionally under parent_category_id); it can't upload into an existing category. The cap applies to each new category, so it can be tested with one folder holding more files than the cap. The upload is accepted, the extra files are skipped, each with a line in logs like Failed - <path> - The category allows up to 5 items, and the bulk upload ends as done.
    ```
  - Testlane TC-TIB-7521, actualResult:
    ```
    POST /cliparts {upload_id 99ac31ee-… (đã PUT lúc 05:25), category_id 6639} → 422 {"message":"The category allows up to 4 items"
    ```
  - rules/tib-product-behaviors.md dòng 48:
    ```
    - **Cap 300 clipart/category** từ 2025 (manual, SVG, zip bulk, Open API), admin nâng được theo merchant qua Admin → Users → Config JSON `"clipart_max_per_category": N`. Chạm cap: `POST /cliparts` 422 "The category allows up to N items". Zip bulk tạo category mới từ folder, file thừa bị skip với log `Failed - <path> - …`. Hỏi cap thực tế của account test trước khi viết case limit. (Dev huyenntk 2026-10-28/29, TIB-5536)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5536 comment #55888
- **Link:** https://ownego.atlassian.net/browse/TIB-5536?focusedCommentId=55888
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28:
    ```
    Daily limits are the same as the portal: 1,000 layer images, 4,000 cliparts and 1,000 clipart categories per 24 h from the first upload. The counters are shared with the portal. There's no reset. To test 429, lower the merchant's "… max attempts" in the admin panel (e.g. to 2), then put it back.
    ```
  - rules/tib-product-behaviors.md dòng 49:
    ```
    - **Daily limit upload asset** ("… max attempts", dùng chung portal + Open API) đếm số lượt upload đã tạo trong cửa sổ trượt 24h UTC, **kể cả ảnh đã xoá**. Mốc "Wait until" = lượt cũ nhất + 24h. (người dùng 2026-10-29, TIB-5536)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 49; TC-TIB-7522 (task TIB-265)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-7522
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 49:
    ```
    - **Daily limit upload asset** ("… max attempts", dùng chung portal + Open API) đếm số lượt upload đã tạo trong cửa sổ trượt 24h UTC, **kể cả ảnh đã xoá**. Mốc "Wait until" = lượt cũ nhất + 24h. (người dùng 2026-10-29, TIB-5536)
    ```
  - Testlane TC-TIB-7522, actualResult:
    ```
    Quy tắc đếm (người dùng xác nhận): daily limit tính theo số lượt upload trong cửa sổ trượt 24h, không theo số ảnh còn tồn tại; ảnh đã xoá (11300) vẫn được tính.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 53
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 53:
    ```
    | **Horizon** (job failed/queued) | Vế | Bỏ vế Horizon; verify UI + API là đủ để pass | người dùng 2026-10-14 TIB-5544 |
    ```
  - Testlane TC-TIB-5705, actualResult:
    ```
    NotSupportedException: Sentry/Horizon not accessible (Horizon skipped, user confirmed); the vector upload completed (record has url/thumbnail).
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5544; skill-rules-audit.md #179 (rule `upload-false-success-temporary-file`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5544
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #179, rule `upload-false-success-temporary-file`, nguồn ghi: mục "Đã chốt (TIB-5544, 2026-10-14)"; không ghi tên người:
    ```
    MCP confirm tool trả message riêng ("File has not been uploaded yet…"), chấp nhận được.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-07

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** skill-rules-audit.md A8 (rule `asset-library-bulk-thumbnail`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5516
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
- **Người viết / người xác nhận:** không ghi (bài học TIB-5516, 2026-10-09)
- **Trích nguyên văn:**
  - skill-rules-audit.md A8:
    ```
    File `users/<merchant>/...` trên CDN (`cdn.ownego.com/teeinblue-staging/...`) hiện **public**, không cần login. Ở TIB-5516, API chặn path `users/<merchant khác>/...` nhưng nhận URL CDN tuyệt đối của cùng file → ownership check bị bypass bằng đổi định dạng.
    ```
- **File đính kèm cho claim này:** không có

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

không có

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [ ] Đây thật sự là **một** thứ được gỡ độc lập, và mọi claim thuộc **cùng một product** (Phần 0)
- [ ] Đã trả lời 4.1 trung thực
- [ ] Đã điền 4.2 (KHÔNG đề xuất điều gì)
- [ ] Đã chọn mức độ gấp (4.4)
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật
- [x] Đã ghi build/ngày update hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi từ khoá tra canon
- [x] Mỗi claim có đúng 1 dòng ở Phần 1a, 1 dòng ở Phần 1b, 1 block ở Phần 5.1
- [x] Cột nguồn ghi đúng 1 trong 5 trạng thái
- [x] Phần 2a và 2b đã điền
- [x] Không còn placeholder
