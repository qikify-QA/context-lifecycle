# Security — quan sát, chưa kết luận

Phát hiện trong lúc explore API artwork (2026-09-10, staging, account owner id 273).
**Chưa đánh giá mức độ, chưa report.** Cần policy owner quyết định.
Evidence: `runs/context/2026-09-10/CTX-20260910-01/raw/api/artwork-api-surface.md`.

## 1. GraphQL introspection mở với JWT portal thường

`POST https://staging-graphql.teeinblue.com/v1/graphql` với **JWT của user portal bình thường**
(không phải admin) chạy được introspection query đầy đủ:

- Dump ra **196 field của `query_root`** = 72 base table + `_aggregate` + `_by_pk`.
- **`mutation_root` cũng tồn tại và reachable** — agent không đụng vào.

Row-level authorization của Hasura vẫn scope đúng theo tenant (`user_id`), tức **không đọc được
dữ liệu store khác**. Vấn đề nằm ở chỗ **cấu trúc schema bị lộ**: tên bảng, tên field, quan hệ.

**Chưa xác định:** đây là cấu hình có chủ đích hay sót; production có giống staging không.

## 2. GraphQL không auth trả HTTP 200 thay vì 401

```
POST /v1/graphql   (không header Authorization)
-> HTTP 200
   {"errors":[{"extensions":{"code":"unexpected","path":"$"},
               "message":"Invalid response from authorization hook"}]}
```

REST thì đúng chuẩn: thiếu token hoặc token rác đều trả **401**.

**Ảnh hưởng trực tiếp tới QA:** mọi test/monitor nào assert authorization bằng **status code**
sẽ **PASS nhầm** trên GraphQL. Muốn assert đúng phải kiểm `errors[]` trong body.

→ Điểm này nên đưa vào checklist test API dù chuyện security có được xử lý hay không.

## 3. `POST /api/cliparts/svg` trả 500 kèm leak stack trace + đường dẫn file server

Phát hiện trong lúc verify `asset-category-item-management::CHK-009` (2026-09-14, staging, account
owner "Linh explorer" sub=273, run `CTX-20260914-02`, evidence `KB-032` /
`runs/context/2026-09-14/CTX-20260914-02/`).

**Chưa đánh giá mức độ chính thức (đề xuất LOW-MEDIUM), chưa report cho dev.**

Upload 1 file `.png` vào dropzone **Vector** (đúng ra chỉ nhận `.svg`) → server gọi
`POST /api/cliparts/svg`, trả **HTTP 500** với body chứa:

- Full Laravel stack trace.
- Đường dẫn file nội bộ trên server: `ClipartController.php:352`.
- Message gốc: `"Vector file is not a SVG"` — bản thân message này đúng/hợp lý, vấn đề là
  **cách trả lỗi** (500 + stack trace) thay vì 4xx với message sạch.

Ảnh hưởng phụ ở UI: message lỗi hiển thị cho user là `"[object Object]"` (client không parse được
shape lỗi 500 kèm stack trace, hiển thị object thô) — trải nghiệm lỗi rất xấu, không đọc được gì.

**Chưa xác định:** production có cùng behavior không (`APP_DEBUG`/stack trace có thể chỉ hiện ở
staging); chỉ có 1 sample (LOW confidence) — chưa test lại các file sai định dạng khác cho Vector.

**Đề xuất:** dev nên (1) validate định dạng file ở tầng sớm hơn, trả 4xx với message rõ ràng, (2)
tắt hiển thị stack trace ra response ở mọi environment không phải local dev, (3) client-side sửa
cách parse lỗi để không hiện `[object Object]`.
