# Context Change Request: Teeinblue, product-base

**Tiêu đề task:** `[CCR] PROFILE_GAP — product-base — backfill provider catalog, size gốc`

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
- Object: `product-base` · Feature: `mockup-attachment`, `printarea-definition`, `product-base-browse`

**Quan sát được** `[AGENT]`

```
TIB-5548: Catalog API: return print provider errors to the front-end tagged with the provider name (Done)
  - CLAIM-01: merchOne và Picanova là một provider (đổi tên)
  - CLAIM-02: Catalog key provider có 2 nhánh: key teeinblue và key merchant; test lỗi catalog phải tách 2 nhánh
TIB-5500: Add configurable DPI per print area for artwork export (Done)
  - CLAIM-03: Size gốc provider không kiểm được trên staging; vế "giảm 1/2 size" skip, vẫn verify DPI
  - CLAIM-05: DPI theo print area khi export design
  - CLAIM-06: DPI theo print area khi export design (phần 2)
TIB-5522: tiêu đề và status chưa tra
  - CLAIM-04: Import mockup: layer url null (phần 2)
TIB-5251: tiêu đề và status chưa tra
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
| `CLAIM-01` | loại: hành vi. merchOne và Picanova là một provider (đổi tên) | portal · api | `po_dev_confirm` | product-base/product-base-browse | `ADD` |
| `CLAIM-02` | loại: hành vi. Catalog key provider có 2 nhánh: key teeinblue và key merchant; test lỗi catalog phải tách 2 nhánh | portal · api | `po_dev_confirm` | product-base/product-base-browse | `ADD` |
| `CLAIM-03` | loại: khác biệt môi trường. Size gốc provider không kiểm được trên staging; vế "giảm 1/2 size" skip, vẫn verify DPI | portal | `po_dev_confirm` | product-base/printarea-definition | `ADD` |
| `CLAIM-04` | loại: hành vi. Import mockup: layer url null (phần 2) | portal | `po_dev_confirm` | product-base/mockup-attachment | `ADD` |
| `CLAIM-05` | loại: hành vi. DPI theo print area khi export design | portal · render | `po_dev_confirm` | product-base/printarea-definition | `ADD` |
| `CLAIM-06` | loại: hành vi. DPI theo print area khi export design (phần 2) | portal · render | `po_dev_confirm` | product-base/printarea-definition | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | product-base | product-base-browse | merchant (owner/staff) | portal | không có (liên quan KB-015) |
| `CLAIM-02` | product-base | product-base-browse | merchant (owner/staff) | portal+api | không có |
| `CLAIM-03` | product-base | printarea-definition | merchant (owner/staff) | portal | không có |
| `CLAIM-04` | product-base | mockup-attachment | không rõ | portal | không có |
| `CLAIM-05` | product-base | printarea-definition | không rõ | portal | không có |
| `CLAIM-06` | product-base | printarea-definition | không rõ | portal | không có |

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
| `CLAIM-03` | `product-base/printarea-definition` | `NOT_TESTABLE` (mức: Vế) | Printify không token, merchOne API trả 403 nên không có size gốc | không rõ | không test được vế "giảm 1/2 size"; vẫn verify DPI | Dev tuanva 2026-10-30, TIB-5500 #56108; QA 2026-10-30 |

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

không có

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5548 | không rõ | 2026-10-14 | Jira Done, chưa rõ ngày deploy |
| TIB-5500 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5522 | không rõ | không rõ | không rõ |
| TIB-5251 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: published_context_version 6; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - CLAIM-01: product-base/product-base-browse KB-015 (OBSERVED_CURRENT, cập nhật 2026-09-10): "Khi mở modal 'Import products from API-integrated Fulfillment', quan sát thấy 15 provider bên trái, danh sách catalog nạp qua GET /api/fulfillments/{id}/catalogs?page=&per_page= (offset), khác cơ chế cursor của list /products chính. 'Showing 1 to 20 of 241 ent…"
  - CLAIM-02, CLAIM-03, CLAIM-04, CLAIM-05, CLAIM-06: không tìm thấy.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: Picanova, merchOne, fulfillments.display_name
  - CLAIM-02: catalog, API key, Extras Fulfillments, key teeinblue
  - CLAIM-03: DPI, kích thước gốc, Printify token, 9000 px
  - CLAIM-04: mockup-import-null-layer-url
  - CLAIM-05: printarea-dpi-export
  - CLAIM-06: printarea-dpi-export
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

**Mâu thuẫn giữa các nguồn, xử lý theo quy tắc lấy nguồn có ngày mới nhất:**

- CLAIM-02: Hai nguồn không so được ngày, lấy theo rule đang ghi.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | QA | 2026-10-13 | `po_dev_confirm` |
| `CLAIM-02` | QA | 2026-10-13 | `po_dev_confirm` |
| `CLAIM-03` | tuanva (dev); QA quyết định skip 2026-10-30 | 2026-10-30 | `po_dev_confirm` |
| `CLAIM-04` | QA | 2026-10-15 | `po_dev_confirm` |
| `CLAIM-05` | tuanva (dev) | 2026-10-23, 2026-10-30 | `po_dev_confirm` |
| `CLAIM-06` | QA | 2026-10-23, 2026-10-30 | `po_dev_confirm` |

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
CLAIM-01: merchOne là tên hiển thị mới của provider Picanova; route vẫn dùng picanova.
CLAIM-02: Catalog provider dùng key teeinblue khi merchant chưa nhập key, dùng key merchant khi đã nhập. Test lỗi catalog phải tách hai nhánh; message lỗi có thể khác nhau.
CLAIM-03: [NOT_TESTABLE] Môi trường test: không lấy được size gốc provider (Printify không token, merchOne API 403); Production: không rõ; Cách test: skip vế "giảm 1/2 size", vẫn verify DPI.
CLAIM-04: Import from Campaigns sang campaign khác product base thì campaign mockup đích không cần giữ mockup_id, null là chấp nhận được. Publish dựa vào preview đã render, không render lại nếu đã có preview. Còn preview (kể cả preview cũ copy qua clone) thì publish thành công là bình thường; chưa có preview thì publish bị chặn (instance Error, log nêu layer) là đúng. Layer bị set null sau khi đã generate thì publish vẫn dùng ảnh cũ. Save trong Mockup Editor mà không sửa gì thì không generate lại.
CLAIM-05: DPI chỉ đổi metadata resolution ghi trong file (PNG/JPG/PDF và thumbnail), không đổi pixel của design (design px bằng print area px). Kích thước in thật bằng px / DPI, nên đổi DPI mà không đổi width/height là đổi kích thước in. Với Printify/Picanova (merchOne), print area có width hoặc height > 9000 px (bằng 9000 không tính) thì cả 2 cạnh giảm 1/2 và DPI thành 150. Provider không có DPI trong API (vd Printbelle) thì import mặc định 300. Provider trả DPI ngoài khoảng thì BE đổi về 300 trước khi trả popup Import. PDF 150 DPI có trang to gấp đôi là đúng (cùng px, nửa DPI). Activity log ghi DPI null là "300". Activity log product do browser ghi qua GraphQL, nằm ngoài scope.
CLAIM-06: Provider gọi là DPI, pipeline render gọi là PPI, hai tên chỉ cùng một thứ. Print area cũ có dpi = null, hiển thị "300" mờ, export 300 và không được migrate. DPI hợp lệ là 72–300 (FE, BE và DB constraint printareas_dpi_check). Message FE: "DPI must be a whole number from 72 to 300".
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 63; TC-TIB-5443 (task TIB-180)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5443
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-13
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 63:
    ```
    - **merchOne = Picanova** (đổi tên); hiện tên nào ở đâu: `.claude/flows/orders-fulfillment.md`. (người dùng 2026-10-13, TIB-5548)
    ```
  - Testlane TC-TIB-5443, actualResult:
    ```
    Picanova trên staging đã đổi tên hiển thị thành merchOne (route /fulfillments/picanova, fulfillment id 6).
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30:
    ```
    Ngưỡng 9000 px (Printify, Picanova/merchOne): chỉ cần width hoặc height > 9000 (lớn hơn hẳn, không tính bằng 9000) thì cả hai cạnh giảm một nửa và DPI = 150.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 64; TC-TIB-5441, TC-TIB-5445 (task TIB-180)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5445
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-13
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 64:
    ```
    - **Catalog key provider có 2 nhánh:** provider chưa nhập key dùng key teeinblue (`.env` server); merchant đã nhập key thì dùng key merchant. Test lỗi catalog phải tách 2 nhánh; message lỗi có thể khác nhau. (người dùng 2026-10-13, TIB-5548)
    ```
  - Jira TIB-5548 comment #53876, tinhpt (dev), tạo 2026-10-08, sửa 2026-10-13:
    ```
    These are the providers where the merchant enters their own key in Extras → Fulfillments.
    ```
  - Jira TIB-5548 comment #53876, tinhpt (dev), tạo 2026-10-08, sửa 2026-10-13:
    ```
    The merchant can't trigger these from the UI, because these providers use teeinblue's own key.
    ```
  - Testlane TC-TIB-5445, actualResult:
    ```
    Nhánh key teeinblue: DEV đổi key Shirtee/Printbelle sai trong .env staging. Chạy trên account onboarding
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5500 comment #56108
- **Link:** https://ownego.atlassian.net/browse/TIB-5500?focusedCommentId=56108
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-30
- **Người viết / người xác nhận:** tuanva (dev); QA quyết định skip 2026-10-30
- **Trích nguyên văn:**
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30:
    ```
    Kích thước gốc của 2 product chị hỏi thì em chưa tra được (cũng cần token provider).
    ```
  - rules/env-capabilities.md dòng 56:
    ```
    | **Size gốc provider** (Printify không token, merchOne API 403) | Vế | Vế "giảm 1/2 size" skip; vẫn verify DPI | người dùng 2026-10-30 TIB-5500 |
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5522; skill-rules-audit.md #50, #51 (rule `mockup-import-null-layer-url`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5522
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #50, rule `mockup-import-null-layer-url`, nguồn ghi: người dùng chốt 2026-10-15; TIB-5522:
    ```
    Import from Campaigns sang campaign **khác product base** thì campaign mockup đích không cần giữ `mockup_id` (null là chấp nhận được, người dùng chốt 2026-10-15).
    ```
  - skill-rules-audit.md #51, rule `mockup-import-null-layer-url`, nguồn ghi: người dùng chốt 2026-10-15; TIB-5522:
    ```
    **Publish dựa vào preview đã render**, không render lại nếu đã có preview. Người dùng chốt (TIB-5522, 2026-10-15): còn preview (kể cả preview cũ copy qua clone) → publish thành công là bình thường; chưa có preview → publish bị chặn (instance Error, log nêu layer) là đúng. Test publish với layer hỏng phải dùng campaign mockup **chưa từng có preview** (vd add product mới); set null qua DB sau khi đã generate thì publish vẫn dùng ảnh cũ. Save trong Mockup Editor mà không sửa gì không generate lại.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5500; skill-rules-audit.md #73, #75, #76, #78, #79, #80, #81, #82, #83 (rule `printarea-dpi-export`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5500?focusedCommentId=55437
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23, 2026-10-30
- **Người viết / người xác nhận:** tuanva (dev)
- **Trích nguyên văn:**
  - Jira TIB-5500 comment #55437, tuanva (dev), 2026-10-23 (dòng #73):
    ```
    DPI chỉ đổi resolution ghi trong file export, không đổi kích thước pixel của print area. Muốn file đúng kích thước in thật thì width/height cũng phải khớp DPI đó.
    ```
  - Jira TIB-5500 comment #55437, tuanva (dev), 2026-10-23 (dòng #75):
    ```
    Printify và Picanova: print area lớn hơn 9000 px vốn đã tự giảm một nửa kích thước, nay DPI cũng được set 150 cho khớp.
    ```
  - Jira TIB-5500 comment #55437, tuanva (dev), 2026-10-23 (dòng #76):
    ```
    Provider chỉ cho width/height như Printbelle không có DPI trong API nên import vẫn mặc định 300, seller phải tự sửa theo file TIFF gốc.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #78):
    ```
    Provider trả DPI ngoài khoảng (vd 600): lúc lấy danh sách print area từ provider, BE tự đổi về 300 trước khi trả cho popup Import, nên import không lỗi và print area được DPI 300.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #79):
    ```
    Ngưỡng 9000 px (Printify, Picanova/merchOne): chỉ cần width hoặc height > 9000 (lớn hơn hẳn, không tính bằng 9000) thì cả hai cạnh giảm một nửa và DPI = 150.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #80):
    ```
    PDF 150 DPI to gấp đôi (336 pt → 672 pt): đúng hành vi mong muốn. Giữ nguyên số pixel mà hạ DPI một nửa thì khổ in thật gấp đôi (đã ghi ở Known limitations).
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #81):
    ```
    Activity log "null": DPI trống giờ ghi là 300, ví dụ Changed dpi from "300" to "150"; xoá trống ghi "150" → "300".
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #82):
    ```
    Activity log do browser ghi qua GraphQL: đây là cách portal đang ghi mọi activity của product từ trước (width/height, thêm/xoá print area), ticket này không đổi. Nếu cần chuyển sang server ghi thì nên tách ticket riêng.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #83):
    ```
    Bug 2 (Products detail không có print area): query của trang detail không lấy printareas từ năm 2022, nên bảng luôn trống kể cả trước ticket này. Đã thêm vào query, bảng hiện đủ dòng kèm cột DPI (trống thì hiện 300).
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5500; skill-rules-audit.md #72, #74, #77 (rule `printarea-dpi-export`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5500
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23, 2026-10-30
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #72, rule `printarea-dpi-export`, nguồn ghi: dev summary 2026-10-23, TIB-5500:
    ```
    Provider gọi là DPI, pipeline render gọi là PPI, cùng một thứ.
    ```
  - skill-rules-audit.md #74, rule `printarea-dpi-export`, nguồn ghi: dev summary 2026-10-23, TIB-5500:
    ```
    Print area cũ: `dpi` = null, hiển thị "300" mờ, export 300. Không migrate.
    ```
  - Jira TIB-5500 comment #55437, tuanva, 2026-10-23, khớp một phần:
    ```
    Thêm cột dpi (cho phép trống) vào bảng printareas. Print area đã có từ trước giữ trống và vẫn export 300 DPI như cũ.
    ```
  - skill-rules-audit.md #77, rule `printarea-dpi-export`, nguồn ghi: dev tuanva, TIB-5500 comment 2026-10-30:
    ```
    DPI hợp lệ **72–300** (FE + BE + DB constraint `printareas_dpi_check`). Message FE: "DPI must be a whole number from 72 to 300".
    ```
  - Jira TIB-5500 comment #56108, tuanva, 2026-10-30, khớp một phần:
    ```
    DPI ngoài 72–300 không báo lỗi: FE giờ chặn đúng khoảng 72–300 ở cả sửa inline lẫn form New printarea, message "DPI must be a whole number from 72 to 300", không gửi mutation.
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
