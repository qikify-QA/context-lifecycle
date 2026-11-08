# Product guide — teeinblue

Bản đồ của product: có gì, ở đâu, test được không. Mọi bước đều đọc file này.

- Đúng phải là gì: `<object>/features/<feature>/kb.json`, `checklists/`.
- Làm thế nào: `_flows/`, đọc `_flows/README.md` rồi đúng file theo chủ đề.
- Biến env: `_env.example`.

Không dùng guide làm expected result. Không ghi giá trị credential, id, tên store.

## 1. Product

Teeinblue là app cá nhân hoá sản phẩm in theo yêu cầu (print-on-demand). Luồng chính:

1. Merchant tạo **Product base** (phôi có variant, print area, mockup) hoặc dùng sẵn Shopify product.
2. Merchant thiết kế **Artwork** nhiều layer, cấu hình personalization, condition, populate.
3. Merchant ghép thành **Campaign** rồi publish lên store.
4. Buyer mở product page, **SDK** hiện form và live preview, buyer điền rồi add to cart. **Customization** đi kèm cart qua line item properties.
5. Order về portal, teeinblue render design, merchant review và gửi fulfillment.

| Thuật ngữ | Nghĩa |
|---|---|
| Instance | Một store gắn với account trên teeinblue |
| Personalization option | Input buyer điền trên storefront, map vào layer |
| Global Option | Option định nghĩa một lần, gắn vào nhiều artwork |
| Populate values | Tự điền giá trị layer từ layer khác |
| Conditional setting | Điều kiện hiện hoặc ẩn layer |
| Boundless / open platform | Kênh không phải Shopify, nhúng SDK qua iframe |

## 2. Object và feature

Từ khoá ticket sang object: `_registry.json`. Trạng thái, version, dùng làm oracle được không: `manifest.json`. Mỗi feature có `features/<key>/profile.json` (entry point, precondition, `environment_differences`) và `checklists/<key>.json`.

| Object | Phạm vi | Không thuộc | Feature |
|---|---|---|---|
| `campaign` | Tạo, duyệt, xoá campaign, đồng bộ media Shopify | Phía storefront (`sdk`) | `campaign-artwork-mockup-reflection` `campaign-delete` `campaign-list-browse` `campaign-navigation` `campaign-publication-history` `campaign-security-permissions` `campaign-shopify-media-sync` `create-campaign-by-product-base` `create-campaign-by-shopify` |
| `product-base` | Print area, variant, mockup, vòng đời, liên kết campaign | Thư viện ảnh mockup (`image-library`) | `mockup-attachment` `printarea-definition` `product-base-browse` `product-base-campaign-link` `product-base-create` `product-base-identity` `product-base-lifecycle` `variant-add-to-campaigns` `variant-catalog` |
| `artwork` | Editor, layer, config, condition, populate, render | Form buyer trên storefront (`sdk`) | **Quản lý:** `artwork-list-management` `artwork-save-persist` `artwork-template-management` `editor-layer-workspace` `psd-import` · **Layer:** `layer-common-config` `layer-config-form-elements` `layer-config-image` `layer-config-maps-astronomy` `layer-config-others` `layer-config-puzzles` `layer-config-text` `layer-config-vector` `layer-duplicate-link-copy` `layer-print-effects` `text-multi-stroke` · **Logic:** `condition-cycle-validation` `conditional-setting-config` `layer-condition-value-binding` `populate-values` · **Group, render:** `group-layer-effective-visibility` `group-layer-order-design-render` `text-color-sequence-render` `clipart-category-storefront-behavior` |
| `asset-category` | 6 loại category: Clipart, Vector, Color, Additional Option, Map Style, Font Category | Font (`font`) | `asset-category-bulk-upload` `asset-category-crud` `asset-category-item-management` `asset-category-route-entity-clarification` |
| `font` | `/fonts` | Font category (`asset-category`) | `manage-uploaded-font` `upload-custom-font` `use-custom-font-in-artwork-editor` `view-and-configure-font-list` |
| `image-library` | Thư viện ảnh của Image layer và Mockup layer, không có trang riêng | Clipart (`asset-category`) | `image-layer-library` `mockup-layer-library` |
| `global-option` | Option dùng chung nhiều campaign | | `artwork-personalization-global-option-link` `global-option-additional-option-items` `global-option-instance-management` |
| `translation` | Dynamic Translations, Product Page Content, chọn ngôn ngữ | | `dynamic-translations` `language-locale-switcher` `product-page-content-translation` |
| `order` | Đặt order, review, fulfillment | | `place-personalized-order-storefront` `review-and-initiate-fulfillment-portal` `edit-customization-after-order` |
| `sdk` | Runtime personalization của buyer, Product Page Settings, open platform | | `form-artwork-navigation` `genai-personalization-runtime` `open-platform-customization-callback` `product-page-settings-config` `required-addon-validation` `storefront-buyer-facing` |
| `account-security` | Login portal, trạng thái bảo mật staff, thao tác nhạy cảm | Quyền riêng của campaign (`campaign-security-permissions`) | `acting-user-organisation` `billing-webhook` `confirm-password-dialog` `hasura-permission` `portal-login-paths` `social-login` `staff-security-status` |
| `open-api` | API cho merchant dưới `/openapi/v1`: token, tra cứu và upload asset | Route `/api` của portal | `open-api-asset-upload` |

Ticket không khớp key nào: ghi knowledge gap, đề xuất key mới trong CCR.

## 3. Môi trường

Thấy host production thì dừng: `portal.teeinblue.com`, `api.teeinblue.com`, `portal-api.teeinblue.com`, `sdk.teeinblue.com`, `customize.teeinblue.com`, `photo-api.teeinblue.com`.

| Biến | Đặc điểm | Dùng cho | Không dùng cho |
|---|---|---|---|
| `TIB_STORE_URL`, `TIB_STORE_INSTANCE_ID` | Dev store, non-Plus | Mặc định: portal, storefront, Thank You, Order status | App block trên Checkout page, Generate test design |
| `TIB_SDK_V2`, `TIB_SDK_V2_INSTANCE_ID` | Shopify Plus | App block trên Checkout page, storefront SDK v2 | |
| `TIB_BOUNDLESS_*`, `TIB_BOUNDLESS_INSTANCE_ID` | Boundless, không có storefront thật | Case Boundless trên portal | Campaign by Shopify; chạy song song với store mặc định (chung account) |
| `TIB_BOUNDLESS_STOREFRONT_INSTANCE_ID` | Storefront Boundless | Case Boundless cần storefront | Tạo data mới |
| `TIB_ONBOARDING_*` | Chưa connect fulfillment | Luồng onboarding | Chỉ đọc, giữ sạch |
| `TIB_USER_A_*`, `TIB_USER_B_*` | Hai tenant | Permission, cross-tenant | Thiếu biến thì `NOT_COVERED`, không thay account khác |
| `TIB_STAFF_VIEW_ONLY*`, `TIB_STAFF_GEN_ONLY*` | Staff quyền hạn chế | Phân quyền | |
| `TIB_FULL_ACCESS_TOKEN` | Token Open API | Route `/openapi/v1` | `GET /api/user` (401) |

## 4. Test được gì

**Nhãn test case:** không test được cả case là `env-blocked`: không execute, Testlane `skipped` kèm lý do, verdict `NOT_APPLICABLE`. Không test được một vế: giữ case, ghi "vế X: skip — <lý do>", kết luận theo các vế còn lại.

| Hạng mục | Feature | `type` | Mức | Cách xử lý |
|---|---|---|---|---|
| Generate test design trên dev store | `campaign/create-campaign-by-product-base` | `ALTERNATIVE_SETUP` | Vế | Đặt order test rồi lấy design của order |
| Horizon (job failed, queued) | Nhiều feature | `NOT_TESTABLE` | Vế | Bỏ vế Horizon, verify UI và API |
| Strava trong Route Maps | `artwork/layer-config-maps-astronomy` `sdk/storefront-buyer-facing` | `NOT_TESTABLE` | Vế | Bỏ dòng Strava |
| Tracking từ provider | `order/review-and-initiate-fulfillment-portal` | `NOT_TESTABLE` | Case | `env-blocked`; fulfill tay đi đường khác, không thay được |
| Size gốc của provider | `product-base/printarea-definition` | `NOT_TESTABLE` | Vế | Skip vế giảm size, vẫn verify DPI |
| `photo_endpoint=snap` | `sdk/storefront-buyer-facing` | `DIFFERENT_VALUE` | Case hoặc vế | Chỉ Dev set được; staging chỉ verify HTML, preconnect |
| Upload CORS, preconnect tới host production | `sdk/storefront-buyer-facing` | `NOT_TESTABLE` | Vế | Kiểm trên production |
| Network timing | `sdk/storefront-buyer-facing` | `ALTERNATIVE_SETUP` | Vế | Kết luận theo Chrome thật, số headless chỉ tham khảo |
| Browser chặn site data, ITP | `sdk/storefront-buyer-facing` | `ALTERNATIVE_SETUP` | Vế | Chỉ giả lập được, nêu rõ giới hạn |

Khác biệt riêng của feature còn nằm ở `environment_differences` trong profile.

**Cần người hỗ trợ:**

- Bảng nội bộ không lộ qua GraphQL: agent soạn query read-only, người có quyền chạy.
- Job theo lịch: nhờ Dev chạy command trên staging, không chờ tới giờ.
- Config server (provider key, branch, migration): là điều kiện tiên quyết cho Dev.

## 5. Bẫy làm sai kết luận

| Dấu hiệu | Cách hiểu |
|---|---|
| Toggle mặc định khác mong đợi | Mặc định theo config shop (`default_value`). Đọc config trước khi báo bug |
| `ERR_FAILED` kèm lỗi CORS khi body có `<script` hoặc `onload=` | WAF chặn. Không suy ra app an toàn |
| Ngưỡng rate limit khác ticket | Staging cố ý đặt nhỏ hơn. Tin header `x-ratelimit-limit` |
| Link Edit Customization trên staging 404 | Link luôn trỏ customize production. Đổi host sang customize staging, giữ nguyên query |
| Upload qua Playwright lọt `accept` | Tool bypass, merchant thật bị chặn ở FE. Không log bug |
| Theme editor, checkout editor không có data teeinblue | Chỉ là placeholder. Verify bằng storefront thật |
| Storefront vẫn cũ sau khi sửa | Cache `app-v1.js` hoặc `translation_version`, localStorage. Cách xử lý: `_flows/environment.md` |

## 6. Mutation guard

- **Production chỉ đọc**, trừ khi operator giao đúng việc đó.
- Data tạo cho một ticket đặt tên theo title ticket và giữ lại sau test. Không sửa data có sẵn của người khác.
- Thay đổi tạm (config store, throttle, route) phải trả về giá trị cũ sau khi test.
- Order chỉ đặt bằng thanh toán test.
- Evidence phải che token: `GET /api/instances/<id>` và một số response trả kèm `token`, API key.
