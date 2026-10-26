<!-- Proposal CBS-002 · filename CCR-2026-10-11-tib-5506-open-api-replace-order-item-design.md · sourceTaskId TIB-172 · submittedAt 2026-10-11T12:20:27.944Z · fetched via qa-hub-production get_proposal on 2026-10-11. Redacted per qa-context-contract §6: dev handle -> [REDACTED] (public repo). Source content contained no token/email/credential (submitter already stripped the staging Bearer token). -->

# Context Change Request (CCR) — teeinblue

> **Khuôn:** bundled canonical (`~/.claude/skills/create-ccr/references/ccr-template.md`).
> **Phụ lục product:** không tìm thấy trong repo đích (`contracts/ccr-product-appendix.md` / `how-to-request/ccr-product-appendix.md` đều không có) → dùng mặc định chung.
> **Canon:** repo làm việc không có `knowledge/` local → **không tra được canon** (xem Phần 3). Không bịa object_key/feature_key.

## Cách gửi

1. **Soạn + Submit.** File này đã điền đủ. Đính kèm vào task liên quan, bấm Submit để tạo Proposal + Task trên agent board của context-builder.
2. **Trigger xử lý.** Kéo status Task trên **agent board** từ `Todo` → `In Progress`.

> Phụ lục product không có nên không rõ kênh submit/trigger chính xác cho teeinblue — xác nhận lại với chủ knowledge base trước khi Submit. `create-ccr` không tự submit.

**Tiêu đề task:** `[CCR] NEW_FEATURE — Open API order-item-artwork design — Endpoint replace printfile cho order item READY`

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

**Đề xuất: 1 CCR duy nhất.** Chỉ 1 ticket (TIB-5506), 1 product (teeinblue), 1 feature (endpoint Open API mới). Cả 2 claim bên dưới cùng người gỡ (context builder tự đọc dev doc + test case, không cần hỏi dev), cùng điều kiện mở khoá, cùng vòng đời, cùng artifact đích (KB object Open API / orders của teeinblue). → không tách.

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

**Loại:** `NEW_FEATURE`

**Object** `[AGENT]`

- Product: `teeinblue`
- Object: `không tra được registry — mô tả bằng lời: Open API (openapi/v1) của teeinblue, nhóm Orders / order-item-artwork`. Feature: `không tra được — đề xuất slug ở Phần 1b, không bịa key`
- Không tra được `_registry.json` của knowledge base đích → mô tả bằng lời, KHÔNG bịa object_key.

**Quan sát được** `[AGENT]` — tổng hợp từ ticket, KHÔNG phải suy đoán

```
TIB-5506 — "Open API to upload custom design for a Ready order item" (Story, priority Medium, status QA Review).
Yêu cầu từ khách Familypresent (3 shop): tự động hoá bước "Upload custom design" server-to-server thay vì làm tay trên Portal.

Theo comment dev (PR #3910, viết 2026-10-02, cập nhật 2026-10-05) + API docs redoc (đính kèm 2026-10-07):
- Thêm endpoint POST openapi/v1/order-item-artworks/{order_item_artwork_id}/design, gate bằng ability orders:write.
- Mirror hành vi "Replace design" trên Portal: chỉ thay file tại chỗ; artwork_id / customization_id / printarea_id giữ nguyên.
- Nhận input qua multipart field `file` HOẶC JSON { "url": "..." } (server tự tải từ URL).
- Precondition: order item phải đang READY (status = 2), nếu không → 422. (Strict hơn Portal có chủ đích: Portal chỉ cảnh báo rồi cho làm tiếp.)
- 404: order item artwork không tồn tại hoặc không thuộc account của caller. 422: item không READY, hoặc thiếu cả file lẫn url.
- Response 200 trả object order-item-artwork đầy đủ (url, thumbnail, width/height, processing_at/processed_at, order_item, printarea, artwork, customization).
- Overwrite cùng path cũ; caller có thể thêm ?v={random} vào URL để bypass cache.
- KHÔNG đổi fulfillment status của order.
- Scope: chỉ Replace design, KHÔNG gồm Add new design.

Cách lấy order_item_artwork_id: GET openapi/v1/orders/{order_id} → mỗi line item có print_areas[].id; chính id đó là order_item_artwork_id (không cần flag đặc biệt).
```

- Nguồn: tổng hợp từ 1 ticket (TIB-5506) đang QA Review + dev doc (PR #3910, redoc) + test case QA đã chạy trên staging 2026-10-08. **KHÔNG phải quan sát production** — feature đang ở staging/QA Review.
- Thấy mấy lần / xác nhận trực tiếp mấy lần: các claim contract đã verify trực tiếp qua test case chạy trên staging ngày 2026-10-08 (xem Phần 5.1).

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Các vùng CHƯA xác nhận (cố ý KHÔNG đưa vào canon lần này — xem Phần 4.2):
- Giá trị app-side order status sau replace (description nói "set to a different value" nhưng không nêu giá trị cụ thể).
- Rule validate file: loại file, size tối đa, có kiểm dimension/tỉ lệ với printarea không (response mẫu dev chấp nhận 900x1345 trên printarea 1400x1400 — chưa rõ có chủ đích).
- Rule fetch URL: timeout, redirect, content-type, chặn private IP/SSRF.
- Hành vi error-handling với input xấu (URL 404/non-image, id sai định dạng) hiện trả 500 + lộ chi tiết nội bộ — QA đã quan sát nhưng là bug nghi ngờ, sẽ report riêng cho dev, KHÔNG đưa vào canon.
- Item READY nhưng đã gửi sang fulfillment: chưa test được (chưa dựng được state này).
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5506 — Endpoint mới `POST openapi/v1/order-item-artworks/{id}/design` replace printfile cho order item READY: ability `orders:write`; input `file` hoặc `url`; precondition READY(2) else 422; 404 khi không tồn tại/khác account; 422 khi thiếu cả file lẫn url; không đổi fulfillment status; artwork_id/customization_id/printarea_id giữ nguyên; chỉ Replace (không Add). | `api` | `dev_doc` (PR #3910 comment 2026-10-02 + redoc API docs 2026-10-07) **và** `test_case` (TIB-172, chạy staging 2026-10-08) | teeinblue Open API / Orders — object_key chưa tra được; checklist Open API orders nếu có | `ADD` |
| `CLAIM-02` | TIB-5506 — Cách khám phá `order_item_artwork_id`: `GET openapi/v1/orders/{order_id}` trả `line_items[].print_areas[].id`, chính là `order_item_artwork_id` (không cần flag). | `api` | `dev_doc` (PR #3910 comment 2026-10-02) **và** `test_case` (TC-TIB-4922, TC-TIB-4942 PASS staging 2026-10-08) | teeinblue Open API / Orders — GET order response shape | `ADD` |

> Cả 2 claim là `ADD` (endpoint mới, chưa từng có trong Open API). Không claim nào `SUPERSEDES` canon hiện có.

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | chưa tra được registry — đề xuất nhóm Open API / Orders của teeinblue | `MỚI: open-api-replace-order-item-design` | API client dùng token có ability `orders:write` (merchant/account owner qua Open API) | `api` | không có (ADD mới) |
| `CLAIM-02` | chưa tra được registry — nhóm Open API / Orders | `MỚI: open-api-get-order` (hoặc feature GET order sẵn có nếu registry đã có) | API client dùng token Open API (đọc order) | `api` | không có / chưa tra được |

> `feature_key` ghi `MỚI:` chỉ là đề xuất tên; agent xử lý CCR quyết slug cuối. `scope.environment` không đặt ở đây (chính sách product). Nếu registry teeinblue đã có feature GET order thì gắn CLAIM-02 vào đó thay vì tạo mới.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:**
  - Endpoint: `POST https://staging-api.teeinblue.com/openapi/v1/order-item-artworks/{order_item_artwork_id}/design`
  - Discovery: `GET https://staging-api.teeinblue.com/openapi/v1/orders/{order_id}`
  - Ticket: https://ownego.atlassian.net/browse/TIB-5506 · PR: qikify/teeinblue-api#3910
  - Data test (staging): order 4314 item 6944 (Front=8446, Back=8445); account B order 4567 item 7281 (print area 8854) để test IDOR.
- **Trạng thái đối tượng lúc đó:** order item ở READY (status = 2) cho happy path; các item status khác (vd status 1) cho negative.
- **Environment:** `staging` (staging-api.teeinblue.com). Feature chưa lên production (ticket đang QA Review).
- **Role liên quan:** API client xác thực bằng token Open API có ability `orders:write` (và `orders:read` cho GET order).
- **Surface:** `api`

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

Với ticket TIB-5506:

- **Build / version / ngày deploy:** không rõ build cụ thể; đã live trên **staging** tại thời điểm test 2026-10-08. Chưa deploy production.
- **Ngày resolve/update cuối:** ticket chưa resolve — status `QA Review`; comment dev cập nhật 2026-10-05; API docs đính kèm 2026-10-07.
- **Đã ship chưa:** PR #3910 đã lên staging; **chưa** merge/deploy production. → claim vào KB dưới dạng hành vi đã có trên staging, chưa đụng canon production.

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: **không tra được** (repo làm việc không có `manifest.json` của knowledge base teeinblue).
- Canon hiện nói: **không tra được — cần agent tự tra lại.** Không suy đoán canon.
- Đã tra bằng từ khoá nào: đã thử tìm `knowledge/`, `_registry.json`, `manifest.json`, `ccr-product-appendix.md` trong repo `teeinblue-manual` → không tồn tại local.
- Lưu ý cho agent nhận CCR: tự tra canon teeinblue cho các từ khoá `order-item-artwork`, `replace design`, `upload custom design`, `openapi orders`, `orders:write` trước khi quyết ADD/SUPERSEDES.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

- Ai xác nhận: **Dev doc** (PR #3910 — mô tả implementation có hệ thống + redoc API docs generated). **KHÔNG** có PO/business sign-off riêng ngoài Jira (người gửi xác nhận 2026-10-11).
- Ở đâu, ngày nào: comment dev `[REDACTED]` trong TIB-5506 (viết 2026-10-02, cập nhật 2026-10-05); file `redoc-static.html` đính kèm 2026-10-07. Test case QA TIB-172 PASS trên staging 2026-10-08.
- Họ xác nhận chính xác điều gì: xem trích nguyên văn ở Phần 5.1.

> Dev PR writeup + redoc API docs được tính là `dev_doc` (generated/chủ động mô tả chính thức), nên CLAIM-01/02 vào context dưới dạng **hành vi đúng** và dùng được làm expected result. Không có PO/business sign-off bổ sung — nếu sau này cần expected cho các vùng chưa rõ ở 4.2, phải lấy confirm riêng.

## 4.2 KHÔNG đề xuất điều gì?

```
KHÔNG coi là đã xác nhận/đã duyệt, dù xuất hiện trong ticket hoặc response mẫu:
- Giá trị app-side order status sau replace (description chỉ nói "a different value", không nêu giá trị).
- Rule validate file (loại, size, dimension/tỉ lệ) — kích thước 900x1345 trên printarea 1400x1400 trong response mẫu KHÔNG phải rule đã duyệt.
- Rule fetch URL (timeout, redirect, content-type, chặn private IP/SSRF) — chưa được mô tả.
- Hành vi error-handling hiện tại với input xấu (500 + lộ SQL/stack/nginx) — là hiện trạng quan sát, KHÔNG phải hành vi đúng; report riêng cho dev, không đưa vào canon.
- Hành vi khi gửi đồng thời file + url; khi item READY đã gửi fulfillment.
- object_key/feature_key đề xuất ở Phần 1b chỉ là gợi ý tên, chưa phải đã duyệt.
- "Add new design" KHÔNG nằm trong scope endpoint này.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
teeinblue Open API có endpoint POST openapi/v1/order-item-artworks/{order_item_artwork_id}/design để replace
printfile của một order item đang ở trạng thái READY, server-to-server, bằng token có ability orders:write. Endpoint
mirror hành vi "Replace design" trên Portal: chỉ thay file tại chỗ (overwrite cùng path), giữ nguyên artwork_id/
customization_id/printarea_id và không đổi fulfillment status của order. Nhận input qua multipart `file` hoặc JSON
`{ "url": ... }`. Precondition: item phải READY (status=2), nếu không trả 422; 404 khi order_item_artwork_id không
tồn tại hoặc không thuộc account của token; 422 khi thiếu cả file lẫn url. Chỉ hỗ trợ Replace design, không hỗ trợ
Add new design. Lấy order_item_artwork_id qua GET openapi/v1/orders/{order_id} → line_items[].print_areas[].id.
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim

### CLAIM-01

- **Loại nguồn** (đúng 1): `dev_doc` (bổ sung `test_case`)
- **Locator:** PR qikify/teeinblue-api#3910 (mô tả trong comment dev TIB-5506) · `redoc-static.html` đính kèm TIB-5506 · test case TC-TIB-4920/4921/4925/4926/4927/4930/4931/4932 (task TIB-172)
- **Link:** https://ownego.atlassian.net/browse/TIB-5506 · https://github.com/qikify/teeinblue-api/pull/3910
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-02 (comment dev viết; cập nhật 2026-10-05) · 2026-10-07 (redoc API docs) · 2026-10-08 (test case chạy PASS)
- **Người viết / người xác nhận:** [REDACTED] (Dev) — PR #3910 + redoc; QA — test run TIB-172 trên staging
- **Trích nguyên văn:**
  ```
  "Added POST openapi/v1/order-item-artworks/{order_item_artwork_id}/design, gated by the existing orders:write
  ability. Mirrors the Portal's "Replace design" action exactly (same upload/storage logic) — only the file changes
  in place, artwork_id/customization_id/printarea_id are untouched."

  "Scope note: this covers Replace design only, not Add new design ..."

  "Precondition: the target order item must currently be in READY status (value 2), or the call is rejected with a 422."

  "Error responses:
   404 — order item artwork not found, or doesn't belong to the caller's account
   422 — order item isn't in READY status (2), or neither file nor url was provided"
  ```
- **File đính kèm cho claim này:** redoc-static.html (trên TIB-5506); kết quả test TIB-172 trên Testlane (TC-TIB-4920/4921/4925/4926/4927/4930/4931/4932 PASS, run 2026-10-08)

### CLAIM-02

- **Loại nguồn** (đúng 1): `dev_doc` (bổ sung `test_case`)
- **Locator:** comment dev TIB-5506 (PR #3910), mục "Finding the order_item_artwork_id" · TC-TIB-4922, TC-TIB-4942 (task TIB-172)
- **Link:** https://ownego.atlassian.net/browse/TIB-5506
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-02 (comment dev) · 2026-10-08 (TC-TIB-4922/4942 PASS)
- **Người viết / người xác nhận:** [REDACTED] (Dev); QA — test run staging
- **Trích nguyên văn:**
  ```
  "Call GET /openapi/v1/orders/{order_id} first — each line item's print_areas[].id is already returned in the
  response (no special flag needed)."
  ```
- **File đính kèm cho claim này:** kết quả TC-TIB-4922, TC-TIB-4942 (Testlane TIB-172)

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

- Ticket: https://ownego.atlassian.net/browse/TIB-5506 (Story, QA Review, priority Medium)
- Testlane task: TIB-172 "[TIB-5506] Open API to upload custom design for a Ready order item" (project teeinblue)
- Postman collection (Team Workspace): "[TIB-5506] Open API to upload custom design for a Ready order item"

> Lưu ý: comment dev PR #3910 có chứa 1 Bearer token staging thật trong sample curl — **đã bỏ khỏi CCR này**, không chép lại. Khuyến nghị dev revoke token đó (ngoài phạm vi CCR).

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [x] Một thứ gỡ độc lập, cùng một product (teeinblue) — Phần 0
- [x] Đã trả lời 4.1 trung thực (chỉ dev_doc, không PO sign-off)
- [x] Đã điền 4.2
- [x] Đã chọn mức độ gấp 4.4 (HIGH)
- [x] Evidence đã bỏ PII/token (token staging trong comment dev KHÔNG chép vào đây)

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật (test case PASS 2026-10-08)
- [x] Đã ghi build/ngày hoặc thừa nhận "không rõ" cho ticket
- [x] Đã ghi rõ từ khoá đã tra canon + lý do không tra được
- [x] Mỗi claim ở "Quan sát được" có đúng 1 dòng Phần 1a, Claim ID duy nhất
- [x] Mỗi Claim ID có đúng 1 block Phần 5.1
- [x] Mỗi Claim ID có dòng Phần 1b
- [x] Cột "Nguồn & độ mạnh" ghi đúng 1 trạng thái kèm trích dẫn
- [x] Claim dev_doc/test_case đều có ngày nguồn cụ thể ở 5.1
- [x] Không còn placeholder nào sót lại (đã quét, sạch)
