# Explore playbook — teeinblue

Hướng dẫn riêng của teeinblue cho các explorer runtime. Cấu hình máy đọc nằm ở `config/products/teeinblue.json` → `explore`, `environments`, `credentials`, `defaults`.

Không ghi giá trị credential, email hay tên người thật vào file này.

## 1. Surfaces và entry point

| Surface | Base URL (env) | Ghi chú |
|---|---|---|
| portal (merchant) | `TIB_PORTAL_BASE` (staging portal) | SPA; sidebar có thể collapse ở viewport hẹp |
| storefront (buyer) | Shopify storefront của store gắn với account explore | personalization chạy qua app embed của teeinblue trên product page |
| api | `TIB_API_BASE` (phải là `https://staging-api.teeinblue.com`) · spec `TIB_OPENAPI_BASE` | portal gọi API bằng cookie session; có cả REST và mutation GraphQL (vd `insert_cliparts`) |

Production là stop condition cho mọi surface (`environments.forbidden`).

## 2. Auth và xác minh account

- **Route login:** luôn dùng `/login?staff=true` (email + password). Route `/login` là đường Shopify store owner, không dùng.
- **Login tự động:** `npm run portal-auth` (Playwright project `setup` trong `tools/portal-auth/`) ghi storageState của account `owner` (`TIB_STAGING_EMAIL` / `TIB_STAGING_PASSWORD`). Login thủ công qua Playwright MCP: navigate tới route trên, **ghi đè** cả ô email lẫn password rồi bấm `Log in`, chờ redirect về `/`.
- **Session:** cookie HttpOnly của Laravel Sanctum SPA (`__Secure-…_session`) + cookie `XSRF-TOKEN`. Không còn JWT trong `localStorage`. TTL thực tế ~15 phút → storageState cũ gần như luôn hết hạn, login lại thay vì tái dùng.
- **Gọi API ngoài UI** (vd cleanup): chạy `fetch()` ngay trong page để dùng cookie + header `X-XSRF-TOKEN` có sẵn; không tự dựng header `Authorization`.
- **Xác minh account — bước bắt buộc đầu tiên, và sau MỖI lần login lại:** `GET /api/user` phải trả `id` = `explore.account_guard.expected_user_id`, và sidebar hiện đúng store của account đó. Sai → DỪNG, `BLOCKED`.
- **Chỉ thao tác trên account của `TIB_STAGING_EMAIL`.** Mọi account khác trên staging (kể cả account cá nhân của operator) là ngoài phạm vi; ngoại lệ chỉ hợp lệ khi operator cho phép tường minh cho đúng một việc, trong đúng run đó.
- **Bẫy autofill:** form login autofill sẵn email của một account khác. Chỉ điền password hoặc dựa vào autofill là vào nhầm account.
- **Bị chặn bởi permission classifier** (không đọc được password, snapshot trang login bị chặn): không thử vòng; trả `BLOCKED` và để operator chọn: tự login rồi bàn giao session, hoặc nới permission.
- Account phụ cho check permission/cross-tenant: `credentials.secondary_account_env`. Nếu biến không có trong `.env` thì check đó là `NOT_COVERED`, không thay bằng account khác.

## 3. Object map

Danh sách object hợp lệ: `knowledge/products/teeinblue/_registry.json`.

| `object_key` | Surface chính | Ghi chú (theo knowledge đã publish) |
|---|---|---|
| `campaign` | portal | phía storefront của campaign KHÔNG thuộc object này — xem `sdk` |
| `product-base` | portal | browse, tạo, print area, variant, mockup, lifecycle, liên kết campaign |
| `artwork` | portal (artwork editor) + storefront preview | layer, layer config, personalization option |
| `asset-category` | portal | 6 loại category (Clipart, Vector, Color, Additional Option, Map Style, Font Category), thêm item, bulk upload zip |
| `font` | portal | trang `/fonts` (Assets > Upload Fonts); khác `font_category` |
| `global-option` | portal | option dùng chung nhiều campaign |
| `translation` | portal + storefront | vd Store Settings > Product Page Content (`/product-page-content`) |
| `order` | storefront + portal | đặt đơn personalized trên storefront, review/fulfillment trên portal |
| `sdk` | storefront | runtime personalization cho buyer, cấu hình product page settings |

Account explore có thể gắn nhiều store (instance); ghi rõ store nào trong `portal_context`/`storefront_context` của artifact.

Khi `.env` đổi account thì store đổi theo: mọi id mẫu (campaign, product, order, font) của run cũ không còn dùng được — luôn lấy id mới từ portal.

## 4. Vocabulary

| Thuật ngữ | Nghĩa |
|---|---|
| Campaign | Sản phẩm bán ra: product base + artwork + cấu hình personalization |
| Product base | Phôi sản phẩm với variant, print area, mockup |
| Artwork | Thiết kế gồm nhiều layer (text, image, clipart, …) có thể cá nhân hoá |
| Personalization option | Input buyer điền trên storefront, map vào layer |
| Live preview | Ảnh xem trước cập nhật theo input của buyer |
| SDK | Trong repo này = storefront personalization runtime, không phải software package |
| Line item properties | Dữ liệu personalization đi kèm item trong cart |

Storefront: ghi product page, personalization panel, preview, cart drawer/page; dừng ở ranh giới checkout (`explore.surfaces.storefront.checkout_boundary`).

## 5. Mutation guard riêng

- Ngoài `defaults.forbidden_actions`: không publish campaign lên storefront live, không đổi theme/app embed, không đặt order thật.
- Test data tự tạo đặt tên có tiền tố `QA-` để nhận diện và dọn; cleanup trong cùng run.
- Xoá chỉ được làm với dữ liệu run tự tạo, và chỉ khi policy run cho phép — `delete` mặc định bị cấm.

## 6. Network / API hints

- Request tới `TIB_API_BASE` là ứng viên `mapped`; request analytics/chat widget là `unrelated`.
- Endpoint hiện ra lặp lại theo chu kỳ khi không có action là `polling`.

## 7. Gotchas

- Sidebar có thể collapse → chờ phần tử ở trạng thái `attached`, không phải `visible`.
- Label sidebar có ký tự icon đứng trước text → match theo `href`, không anchor regex vào đầu chuỗi.
- Cơ chế session staging từng đổi (JWT → cookie). Nếu login xong mà không thấy cookie session như mục 2, kiểm lại bằng DevTools trước khi tin playbook này, và ghi lại thay đổi.
