# Product base — API/behavior, chưa kết luận

Phát hiện trong lúc explore **Product base** (`/products`), 2026-09-10, staging,
store `linh-explorer.myshopify.com`, account owner (`sub=273`, `user_id=266`).
**Chưa đánh giá mức độ, chưa report.** Cần dev/PO quyết định.

Evidence: `runs/context/2026-09-10/CTX-20260910-04/intermediate/api/action-api-map.json`
(`MIS-001`…`MIS-008`, `SEC-001`…`SEC-006`), `raw/portal/product-base-create-edit.md`.

## 1. GraphQL mutation trả HTTP 200 dù thất bại — lỗi Postgres thô lọt ra client

Sửa `Width` của printarea thành chữ (`"abc"`):

```
POST /v1beta1/relay (update_printareas)  →  HTTP 200
body: { "errors": [ { "extensions": { "code": "data-exception" },
                       "message": "invalid input syntax for type integer: \"abc\"" } ] }
```

Lặp lại được 2/2 lần. **UI không hiện gì** — chỉ có trong console, người dùng không biết thao
tác thất bại. Status code nói thành công, body nói thất bại; lộ luôn engine (Postgres) và kiểu
cột (`integer`) cho bất kỳ user đăng nhập nào.

**Chưa xác định:** đây có phải hành vi có chủ đích của GraphQL layer (luôn trả 200, lỗi nằm
trong `errors[]`) hay là thiếu xử lý ở tầng portal — vì response *có* trả đủ thông tin lỗi,
chỉ là portal không đọc nó để hiện lên UI.

## 2. Log ghi optimistic cho printarea; chưa xác minh được log staff cho variant

**Sửa lại theo domain knowledge (2026-09-10):** có **hai mặt log khác nhau**, không phải một:

- **Modal "Logs" trong trang product base** — theo thiết kế **chỉ lưu sự kiện printarea**.
  Việc modal này không có entry nào cho variant **không phải là thiếu sót** — nó đúng phạm vi
  của nó.
- **Staff activity log** (mặt khác, staff-wide — có thể là nguồn cho trang `/activity-logs`,
  xem `knowledge/portal-pages.md`) — theo thiết kế, khi sửa variant thì ghi một entry **chung
  chung "product base được update"**, không phải chi tiết theo variant.

**Vẫn còn quan sát thật, chưa đổi:** `POST /api/staff-activity-logs/printarea` trả **201** cho
chính lần sửa Width thất bại ở mục 1 — log ghi **trước khi biết** mutation có thành công hay
không, và bản ghi đó vẫn không hiện trong modal Logs. `POST /api/staff-activity-logs/variant`
vẫn trả **404** ở cả 2/2 lần thêm variant, không có request nào khác thành công thay thế trong
capture (đã kiểm lại `raw/network/ACT-05-01-002.json` / `ACT-05-01-004.json` — chỉ có 2 mutation
GraphQL + 1 request 404 này, không có request nào khác).

**Chưa xác minh (cần làm ở run sau):** nếu staff activity log ghi "product base updated" qua
một cơ chế khác (ví dụ Hasura event trigger chạy server-side, không phát sinh HTTP request nào
từ client) thì capture của run này sẽ không thấy được — phải mở `/activity-logs` (hoặc đúng nơi
staff activity log render) **ngay sau khi sửa variant** để xác nhận có entry "product base
updated" xuất hiện hay không. `portal-pages.md` từng ghi `/activity-logs` là **EMPTY** với cả 2
account, nhưng đó là lần kiểm trước khi có thao tác nào tạo log — chưa kiểm lại sau khi có hoạt
động thật.

## 3. Duplicate/Clone trả về bản ghi NGUỒN, không phải bản sao

`POST /api/products/{id}/clone` — với id nguồn = `3203`, response 200 là **chính record 3203**,
không phải record mới (`3206`). Portal biết id bản sao chỉ nhờ refetch lại list, không nhờ
response của clone; UI cũng không điều hướng sang bản sao. Consumer nào gọi API clone trực
tiếp sẽ không lấy được id vừa tạo từ response.

## 4. Đường ghi dữ liệu bất đối xứng giữa printarea và product base (ghi nhận theo yêu cầu — do dev thiết kế)

- **Printarea**: insert + update đi qua Hasura GraphQL (client ghi thẳng bảng qua `_set`);
  delete lại đi qua REST `DELETE /api/printareas/{id}`.
- **Product base**: ngược lại — đọc qua Hasura, ghi (create/update) qua REST.

Không phải lỗi — nhưng nghĩa là business rule/validation có thể nằm ở hai tầng khác nhau tuỳ
thao tác, test phải phủ cả hai đường.

## 5b. Phân trang `/products` mã hoá vào URL để back-restore — nhưng cursor có thể stale

**Xác nhận theo domain knowledge (2026-09-10):** state phân trang/filter của `/products` được
đồng bộ vào URL (`?tab=&limit=&title=&cursor=&gridstate=`) **có chủ đích** — để khi user vào
`/products/:id/edit` rồi quay lại `/products`, list hiện đúng vị trí filter/trang đang xem
(back-restore). Hành vi này **áp dụng cho cả `/campaigns` và `/orders`** — không riêng
`/products` — nên **conflict CONF-001** với ghi chú "URL đứng yên khi sang trang" trong
`knowledge/portal-pages.md` coi như đã có lời giải: `portal-pages.md` mô tả đúng cho lúc **chỉ
chuyển trang trong cùng list**, còn URL-restore này là một cơ chế khác, kích hoạt khi **rời
trang rồi quay lại**. Cần cập nhật `portal-pages.md` để phản ánh cả hai cơ chế, và kiểm lại
`/campaigns`, `/orders` bằng action thật (run này mới xác nhận domain knowledge, chưa có
evidence trực tiếp cho 2 trang kia).

**Rủi ro thật đã được xác nhận:** vì `/products` dùng **cursor pagination** (không phải
offset), `cursor` ghi cứng vào URL tại thời điểm rời trang. Nếu có **sản phẩm mới được tạo**
trong lúc user đang ở `/products/:id/edit`, quay lại bằng URL cũ thì **phân trang có thể sai**
(cursor không còn trỏ đúng vị trí logic trong tập dữ liệu đã đổi). Run này chưa tái hiện được
trực tiếp (store hiện chỉ có 3 product base, cả 2 nút `‹ ›` đều disabled — xem
`unexplored_areas`) — cần test case riêng: mở `/products` ở trang ≥2, tạo mới 1 product base ở
tab khác, quay lại bằng URL đã lưu, so sánh danh sách hiển thị với kỳ vọng.

## 5. Xử lý giá trị rỗng không nhất quán trong `insert_variants`

Cùng một form, cùng một lần submit: bỏ trống `Weight` → gửi chuỗi rỗng `""`; bỏ trống
`Compare at price` → field **biến mất khỏi payload** (không gửi gì). Kết quả lưu khác nhau:
`weight = ""` còn `compare_at_price = null`. Mới 1 sample → `confidence: LOW`.

---

## Security surfaces

### S1. Client ghi thẳng table-level mutation Hasura bằng JWT portal thường

Portal gửi `insert_printareas` / `update_printareas` / `insert_variants` / `update_products`
với `_set` tuỳ ý từ trình duyệt, dùng JWT của user thường (không có header Hasura đặc biệt nào
khác). **Chưa kết luận thiếu kiểm soát** — phạm vi cột/hàng mà role được phép `_set` chưa được
verify (không có negative test, không có cross-tenant test trong run này). Chỉ ghi nhận bề mặt.

### S2. Presigned upload URL tới object storage bên thứ ba

Backend cấp presigned URL (`X-Amz-Signature` / `X-Amz-Credential` trong query string) cho
client PUT thẳng file lên `oe-cdn.sgp1.digitaloceanspaces.com`, không qua backend teeinblue.
Chữ ký nằm trong query string → dễ lọt vào log/referrer. TTL, scope (bucket/prefix), giới hạn
kích thước file đều **chưa quan sát được** (response đã bị redact hoàn toàn theo policy).

### S3. `deletion-check` lộ enum chính sách + field `token` chưa dùng

`GET /api/products/{id}/deletion-check` → `{ policy, reason, token }`.
`policy ∈ {allowed, blocked}`, `reason = "IN_CAMPAIGNS"`, `token = null` ở cả 2 sample quan sát
được. Rủi ro thấp. Điểm cần kiểm: `DELETE` có thực sự bị chặn phía server khi
`policy = "blocked"` hay đây chỉ là gợi ý cho UI — **chưa có evidence** (không gọi `DELETE`
trên asset có sẵn, nằm trong `forbidden_actions`).

### S4. Xoá printarea không có bước xác nhận

Bấm nút xoá (`X`) → `DELETE /api/printareas/{id}` chạy ngay, không dialog, không undo. Ngược
lại, xoá product base có dialog xác nhận + gọi `deletion-check` trước. Ảnh hưởng tới variant có
thể đang trỏ tới printarea bị xoá **chưa quan sát được** (variant trong run này có
`printarea_id = null`).

---

## Còn để trống, KHÔNG note ở đây (cần làm rõ thêm trước khi kết luận)

- **Search / Internal name**: ô `Search` chung ở `/products` **chỉ lọc `title`** (đã xác nhận,
  gõ đúng Internal name vào ô này → "No data matched"). Nhưng `/products` **có filter riêng**
  `Find Internal name` / `Find Internal tags` — filter này **chưa được test** (không nằm trong
  action đã chạy). Tức là hiện tại **không đủ evidence để nói tính năng "lọc theo Internal
  name" bị thiếu** — chỉ biết ô Search chung không làm việc đó. Cần một action test riêng gõ
  giá trị vào đúng ô `Find Internal name` rồi Apply.
