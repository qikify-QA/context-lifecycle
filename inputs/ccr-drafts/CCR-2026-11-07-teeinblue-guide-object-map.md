# Context Change Request: Guide teeinblue dừng ở mức object

- **Product:** `teeinblue`
- **Object:** tất cả, thay đổi mức product
- **Ticket:** `không có`
- **Các khối có trong file:** `C`

## Mức độ gấp

`LOW` — dọn canon, không chặn test.

# Khối C — Guide, flow

Không đổi KB, checklist, flow hay rule nào. Chỉ thay mục 2 của guide; các mục khác giữ nguyên.

| File | Hành động | Nội dung | Lý do |
|---|---|---|---|
| `_product-guide.md` mục 2 | Sửa: thay cả mục 2 (từ dòng `## 2.` tới trước `## 3.`) | Đoạn mới: Phụ lục C-1. Đoạn cũ: Phụ lục C-2 | Guide đang 10,6 KB; contract §5c mới (DECISIONS 2.31): guide tối đa 10 KB và không liệt kê feature key, feature nằm ở `<object>/feature-summary.md`. Bỏ cột Feature, đổi tên mục thành "Object". Sau khi áp: 10612 → 8249 byte |

## Phụ lục C-1 — mục 2 mới

~~~~~text
## 2. Object

Từ khoá ticket sang object: `_registry.json`. Trạng thái, version, dùng làm oracle được không: `manifest.json`. Feature của object: `<object>/feature-summary.md`; mỗi feature có `features/<key>/profile.json` (entry point, precondition, `environment_differences`) và `checklists/<key>.json`.

| Object | Phạm vi | Không thuộc |
|---|---|---|
| `campaign` | Tạo, duyệt, xoá campaign, đồng bộ media Shopify | Phía storefront (`sdk`) |
| `product-base` | Print area, variant, mockup, vòng đời, liên kết campaign | Thư viện ảnh mockup (`image-library`) |
| `artwork` | Editor, layer, config, condition, populate, render | Form buyer trên storefront (`sdk`) |
| `asset-category` | 6 loại category: Clipart, Vector, Color, Additional Option, Map Style, Font Category | Font (`font`) |
| `font` | `/fonts` | Font category (`asset-category`) |
| `image-library` | Thư viện ảnh của Image layer và Mockup layer, không có trang riêng | Clipart (`asset-category`) |
| `global-option` | Option dùng chung nhiều campaign | |
| `translation` | Dynamic Translations, Product Page Content, chọn ngôn ngữ | |
| `order` | Đặt order, review, fulfillment | |
| `sdk` | Runtime personalization của buyer, Product Page Settings, cài đặt model GenAI, open platform | |
| `account-security` | Login portal, trạng thái bảo mật staff, thao tác nhạy cảm | Quyền riêng của campaign (`campaign-security-permissions`) |
| `open-api` | API cho merchant dưới `/openapi/v1`: token, tra cứu và upload asset | Route `/api` của portal |

Ticket không khớp key nào: ghi knowledge gap, đề xuất key mới trong CCR.
~~~~~

## Phụ lục C-2 — mục 2 cũ

~~~~~text
## 2. Object và feature

Từ khoá ticket sang object: `_registry.json`. Trạng thái, version, dùng làm oracle được không: `manifest.json`. Mỗi feature có `features/<key>/profile.json` (entry point, precondition, `environment_differences`) và `checklists/<key>.json`.

| Object | Phạm vi | Không thuộc | Feature |
|---|---|---|---|
| `campaign` | Tạo, duyệt, xoá campaign, đồng bộ media Shopify | Phía storefront (`sdk`) | `campaign-artwork-mockup-reflection` `campaign-delete` `campaign-list-browse` `campaign-navigation` `campaign-publication-history` `campaign-security-permissions` `campaign-shopify-media-sync` `create-campaign-by-product-base` `create-campaign-by-shopify` |
| `product-base` | Print area, variant, mockup, vòng đời, liên kết campaign | Thư viện ảnh mockup (`image-library`) | `mockup-attachment` `printarea-definition` `product-base-browse` `product-base-campaign-link` `product-base-create` `product-base-identity` `product-base-lifecycle` `variant-add-to-campaigns` `variant-catalog` |
| `artwork` | Editor, layer, config, condition, populate, render | Form buyer trên storefront (`sdk`) | **Quản lý:** `artwork-list-management` `artwork-save-persist` `artwork-template-management` `editor-layer-workspace` `psd-import` · **Layer:** `layer-common-config` `layer-config-form-elements` `layer-config-image` `run-image-effects` `run-effects-fill-in-variables` `layer-config-maps-astronomy` `layer-config-others` `layer-config-puzzles` `layer-config-text` `layer-config-vector` `layer-duplicate-link-copy` `layer-bulk-edit` `layer-photo-border` `layer-print-effects` `text-multi-stroke` · **Logic:** `condition-cycle-validation` `conditional-setting-config` `layer-condition-value-binding` `populate-values` · **Group, render:** `group-layer-effective-visibility` `group-layer-order-design-render` `text-color-sequence-render` `svg-to-image-rendering` `no-personalization-photo-render` `clipart-category-storefront-behavior` |
| `asset-category` | 6 loại category: Clipart, Vector, Color, Additional Option, Map Style, Font Category | Font (`font`) | `asset-category-bulk-upload` `asset-category-crud` `asset-category-item-management` `asset-category-route-entity-clarification` |
| `font` | `/fonts` | Font category (`asset-category`) | `manage-uploaded-font` `upload-custom-font` `use-custom-font-in-artwork-editor` `view-and-configure-font-list` |
| `image-library` | Thư viện ảnh của Image layer và Mockup layer, không có trang riêng | Clipart (`asset-category`) | `image-layer-library` `mockup-layer-library` |
| `global-option` | Option dùng chung nhiều campaign | | `artwork-personalization-global-option-link` `global-option-additional-option-items` `global-option-instance-management` |
| `translation` | Dynamic Translations, Product Page Content, chọn ngôn ngữ | | `dynamic-translations` `language-locale-switcher` `product-page-content-translation` |
| `order` | Đặt order, review, fulfillment | | `place-personalized-order-storefront` `review-and-initiate-fulfillment-portal` `edit-customization-after-order` `shopify-order-import` `order-design-vector-render` |
| `sdk` | Runtime personalization của buyer, Product Page Settings, cài đặt model GenAI, open platform | | `form-artwork-navigation` `genai-model-settings` `genai-personalization-runtime` `open-platform-customization-callback` `product-page-settings-config` `required-addon-validation` `storefront-buyer-facing` `template-switch-photo-sync` |
| `account-security` | Login portal, trạng thái bảo mật staff, thao tác nhạy cảm | Quyền riêng của campaign (`campaign-security-permissions`) | `acting-user-organisation` `billing-webhook` `confirm-password-dialog` `hasura-permission` `portal-login-paths` `social-login` `staff-security-status` |
| `open-api` | API cho merchant dưới `/openapi/v1`: token, tra cứu và upload asset | Route `/api` của portal | `open-api-asset-upload` |

Ticket không khớp key nào: ghi knowledge gap, đề xuất key mới trong CCR.
~~~~~
