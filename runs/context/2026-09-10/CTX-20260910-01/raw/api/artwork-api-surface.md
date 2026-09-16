# Artwork API surface — staging

`CTX-20260910-01` · producer `api-explorer` · date 2026-09-10

## 0. Environment & auth context

| | |
|---|---|
| REST base | `https://staging-api.teeinblue.com` (env `TIB_API_BASE`) — **staging, đã verify** |
| Portal bundle cũng khai `VITE_API_URL` | `https://staging-api.teeinblue.com/api` (không có host production nào trong bundle) |
| GraphQL (Hasura) | `https://staging-graphql.teeinblue.com/v1/graphql` và `/v1beta1/relay` |
| Auth dùng trong run này | Portal JWT lấy từ `POST /api/login`, credential = `TIB_STAGING_EMAIL` / `TIB_STAGING_PASSWORD` |
| Role | account owner, store `linh-explorer.myshopify.com` |
| Mutation đã chạy | **KHÔNG** (chỉ GET + `POST /api/login` + GraphQL query/introspection) |

### Định danh — câu hỏi "user 266 vs sub 273" đã được giải quyết

JWT claim (decode header/payload, **không** verify signature):

```
iss = https://staging-api.teeinblue.com/api/login
sub = "273"        <- staff id
user_id = 266      <- store/user id   (claim riêng, cùng nằm trong 1 JWT)
exp - iat = 900s   <- TTL 15 phút, khớp memory
```

Xác nhận chéo bằng GraphQL `artworks` row: `{ "user_id": 266, "staff_id": 273 }`.

**Kết luận:** không phải mâu thuẫn. `273` = `staffs.id` (người đăng nhập), `266` = `users.id` (store/tenant sở hữu dữ liệu).
Path/asset dùng `users/266/...`. Row-level authorization của Hasura scope theo `user_id = 266`.
`knowledge_kind: OBSERVED_CURRENT`, evidence: `api-evidence.json` -> `APIOP-001`, `APIOP-006`.

## 1. KHÔNG có OpenAPI spec

`TIB_OPENAPI_BASE = https://staging-api.teeinblue.com/openapi/v1` — **đã thử 9 path, tất cả 404 HTML** (không phải JSON):

`/openapi/v1` · `/openapi/v1/openapi.json` · `/openapi/v1/docs` · `/openapi.json` · `/v1/openapi.json` ·
`/docs` · `/api/documentation` · `/swagger.json` · `/api/swagger.json`

⇒ **Không có contract tĩnh cho artwork.** Mọi thứ trong run này là observed hoặc code-derived.
`.env` cũng **không** chứa `TIB_API_TOKEN` / `TIB_ORDERS_READ_TOKEN` / `TIB_CUSTOMIZATIONS_READ_TOKEN` /
`TIB_FORBIDDEN_TOKEN` / `TIB_INVALID_TOKEN` như brief mô tả (chỉ có `TIB_STAGING_EMAIL`, `TIB_STAGING_PASSWORD`,
`TIB_API_BASE`, `TIB_OPENAPI_BASE`, `TIB_PORTAL_BASE`) ⇒ không test được negative-auth fixture theo đúng thiết kế.

## 2. Phát hiện then chốt: artwork KHÔNG đọc được qua REST

```
GET /api/artworks/4081
-> 405  {"message":"The GET method is not supported for route api/artworks/4081.
          Supported methods: PUT, DELETE."}
```

`GET /api/artworks` (list) trả về row **không có** `templates`, và `data` = `null`:

```jsonc
{ "data": [ { "id": 4081, "name": "...", "description": null, "width": 3600, "height": 5400,
              "thumbnail": "users/266/artworks/<hash>_thumbnail.webp", "is_locked": null,
              "template_settings": null, "current_version_id": 10953, "design_format": "rgb",
              "status": 0, "schema_version": 2, "data": null } ],
  "links": { "first","last","prev","next" },
  "meta":  { "current_page","from","last_page","links[]","path","per_page","to","total" } }
```

⇒ **Layer/template data chỉ lấy được qua GraphQL (Hasura), cột `artworks.templates` kiểu `jsonb`.**
Đây là đường mà portal editor thực sự dùng.

Pagination REST: Laravel resource-collection chuẩn. `per_page` là query param **có tác dụng** (`?per_page=5` -> `meta.per_page = 5`), `page` observed.

## 3. Operations đã gọi thật (OBSERVED)

| APIOP | Method | Normalized route | Status | Ghi chú |
|---|---|---|---|---|
| APIOP-001 | POST | `/api/login` | 200 | body `{email,password}` -> `{token: string, expires_in: int}` |
| APIOP-002 | GET | `/api/artworks` | 200 | paginated list, KHÔNG có `templates` |
| APIOP-003 | GET | `/api/artworks/{artworkId}` | **405** | chỉ hỗ trợ `PUT`, `DELETE` |
| APIOP-004 | GET | `/api/user` | 200 | profile của staff đang login |
| APIOP-005 | POST | `/v1/graphql` (introspection) | 200 | schema mở với JWT |
| APIOP-006 | POST | `/v1/graphql` (query `artworks`) | 200 | **nguồn của toàn bộ layer schema** |
| APIOP-007 | GET | `/api/artworks` (no / bad token) | 401 | negative auth |
| APIOP-008 | POST | `/v1/graphql` (no auth) | 200 + `errors[]` | GraphQL trả **200** kèm `errors`, không phải 401 |

### Auth / authz observed

- REST: `Authorization: Bearer <JWT>`. Thiếu token -> `401`. Token rác -> `401`. Không phân biệt 2 case bằng status.
- GraphQL: cùng JWT. Không auth -> HTTP **200** với
  `{"errors":[{"extensions":{"code":"unexpected","path":"$"},"message":"Invalid response from authorization hook"}]}`.
  ⇒ **status code không dùng được để assert authz trên GraphQL** — phải assert `errors[]`.
- Hasura scope dữ liệu theo tenant: query `artworks` không filter vẫn chỉ trả artwork của `user_id = 266`.

## 4. Route bị đoán và KHÔNG tồn tại (404) — ghi lại để không thử lại

`/api/artworks/4081/versions` · `/version` · `/current-version` · `/data` · `/layers` · `/templates` ·
`/api/artwork-versions/10953` · `/api/artwork_versions/10953` · `/api/artworks/versions/10953` ·
`/api/versions/10953` · `/api/users/{userId}/artworks` · `/api/users/{userId}/artworks/{artworkId}` · `/api/me`

Tất cả trả `{"message":"The route ... could not be found."}`.
**`current_version_id` (10953) không có endpoint đọc nào tìm được.**

## 5. Route artwork khai báo trong portal bundle (INFERRED — CHƯA gọi)

Trích từ `assets/index.COwrfo4J.js` (code_ref, không phải observation). Đường dẫn tương đối với base `/api`:

| Path | Ghi chú |
|---|---|
| `artworks` | list/create |
| `artworks/{artworkId}` | PUT/DELETE (khớp 405 ở trên) |
| `artworks/{artworkId}/clone` | **mutation — không gọi** |
| `artworks/{artworkId}/archive` · `/unarchive` | **mutation — không gọi** |
| `artworks/{artworkId}/campaigns` | campaign đang dùng artwork |
| `artworks/{artworkId}/validate-default-value` | validate default value của layer |
| `artworks/by-public` · `artworks/upload-psd` | import |
| `user/artworks/exists` | |
| `artwork-translations` | |
| `campaign-artworks/{id}` · `campaign-artworks/{id}/locate-artwork` · `campaign-artworks/batch-apply-to-printareas` | |
| `platform-artworks/{id}` · `platform-products/{id}/platform-artworks/position` | |
| `order-item-artworks/{id}` · `/design` · `/design/generate` | **có side effect (generate design) — không gọi** |

## 6. GraphQL surface

- `query_root`: **196 field** = 72 base table + `_aggregate` + `_by_pk`.
- `mutation_root` **có tồn tại** — không đụng tới (read-only policy).
- Base table liên quan artwork/layer/asset:
  `artworks`, `artwork_categories`, `artwork_activities`, `artwork_global_option`,
  `cliparts`, `clipart_categories`, `layer_images`, `layer_image_categories`,
  `custom_fonts`, `fonts`, `font_variants`, `global_options`, `global_option_categories`,
  `campaign_artwork_printareas`, `platform_artworks`, `order_item_artworks`, `customizations`, `customer_uploads`.

### `artworks` type — field list (introspection)

| Field | GraphQL type |
|---|---|
| `id` | bigint |
| `name` · `description` · `design_format` · `url` · `thumbnail` | String |
| `width` · `height` | Int |
| `schema_version` · `status` | smallint |
| `is_locked` | Boolean |
| `current_version_id` · `root_id` · `user_id` · `staff_id` · `artwork_category_id` | bigint |
| **`templates`** | **jsonb** — chứa toàn bộ template + layer |
| `template_settings` | jsonb |
| `created_at` · `updated_at` · `deleted_at` | timestamp |
| relations | `artwork_category`, `artwork_global_options`, `artwork_activities`, `campaign_artwork_printareas`, `order_item_artworks`, `platform_artworks`, `staff`, `user` |

### `custom_fonts`
`id` · `name` · `original_name` · `master` · `url` · `transform_status` (smallint) · `user_id` · `created_at` · `updated_at` · `deleted_at`

### `clipart_categories`
`id` · `name` · `description` · `type` (String) · `display_type` (String) · `children_display_type` (smallint) ·
`clipart_max_width` (smallint) · `custom_class` · `placeholder` · `position` · `show_clipart_name` (Boolean) ·
`parent_id` · `thumbnail` · `v` (bigint) · `user_id` · timestamps

### `artwork_categories`
`id` · `name` · `description` · `parent_id` · `user_id` · timestamps (+ self-relation `artwork_categories`)

### `artwork_global_option` (join table)
`artwork_id` · `global_option_id` (+ relation `artwork`, `global_option`)

## 7. Query đã dùng để lấy layer schema

```graphql
query {
  artworks { id name templates }
  artworks_aggregate { aggregate { count } }
}
```
`POST https://staging-graphql.teeinblue.com/v1/graphql`, header `Authorization: Bearer <portal JWT>`.
Trả 26 KB, 1 artwork, 3 template, 51 layer. Chi tiết field: `artwork-layer-schema.md`.

## 8. Chưa khám phá

- `/v1beta1/relay` mới chỉ ping introspection, chưa query data.
- Rate limit / idempotency / retry / async: **không có evidence nào** — không kết luận.
- Webhook: có table `webhooks`, `fulfillment_webhooks` nhưng không quan sát được traffic.
- Không có role thứ hai để so authz (thiếu `TIB_USER_B_*`).
