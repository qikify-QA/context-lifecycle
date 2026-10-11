# Explore playbook — <product>

Hướng dẫn riêng của product cho các explorer runtime (`portal-explorer`, `storefront-explorer`, `api-explorer`, `db-explorer`, `code-config-explorer`). Agent definition không chứa kiến thức riêng của product; mọi thứ explorer cần biết về product này nằm ở đây và ở `config/products/<key>.json` → `explore`.

Không ghi giá trị credential, email hay tên người thật vào file này — chỉ ghi tên biến môi trường và định danh kỹ thuật dùng để xác minh.

## 1. Surfaces và entry point

| Surface | Base URL (env) | Entry point theo object | Ghi chú |
|---|---|---|---|
| portal | `<ENV_VAR>` | `<object>` → `<path>` | |
| storefront | | | |
| api | `<ENV_VAR>` · spec `<ENV_VAR>` | | |

## 2. Auth và xác minh account

- Cách login (route, loại account, tool tự động nếu có).
- Session nằm ở đâu, sống bao lâu, làm mới thế nào.
- **Xác minh account sau mỗi lần login:** cách kiểm (endpoint, giá trị đối chiếu ở `explore.account_guard`). Sai account là stop condition.
- Bẫy đã biết khi login.

## 3. Object map

| `object_key` | Màn hình / URL | State mẫu | Data seed dùng được |
|---|---|---|---|

## 4. Vocabulary

Thuật ngữ của product mà explorer cần để nhóm feature theo **user goal** thay vì theo control.

| Thuật ngữ | Nghĩa |
|---|---|

## 5. Mutation guard riêng

Action nguy hiểm đặc thù của product (ngoài `defaults.forbidden_actions`), quy ước đặt tên test data, cách cleanup.

## 6. Network / API hints

Prefix endpoint, kiểu API (REST/GraphQL), request polling/background cần gắn nhãn `polling`/`unrelated`.

## 7. Gotchas

Lỗi đã gặp ở các run trước và cách tránh.
