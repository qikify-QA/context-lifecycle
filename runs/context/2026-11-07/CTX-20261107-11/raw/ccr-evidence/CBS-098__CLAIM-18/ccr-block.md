### CLAIM-18

- **Statement:** Known issue, không phải expected: position sửa tay trong localStorage (x = -5, 99999, "abc", null) không bị clamp hay bỏ qua, customization POST 201 lưu nguyên giá trị, "abc" gây translate(NaN …) và lỗi console, thumbnail cart mất ảnh (-5, 99999) hoặc ảnh ở x=0 ("abc", null), không có 500; key position của campaign khác bị bỏ qua.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer tự sửa dữ liệu của mình; storefront, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, không ai xác nhận, 2026-10-21
- **Locator:** QA-3415 TC-30 ❌ 2/2 trong result_QA-3415_B1-S1-clean_2026-10-21.md; bug draft BUG-09 chưa file, dev chưa trả lời. Chỉ xảy ra khi buyer tự sửa localStorage của mình; order design với các giá trị này chưa kiểm. Không đề xuất check assert "server nhận nguyên giá trị". Liên quan: sdk KB-022; cùng dạng artwork KB-144. (CCR cũ: CBS-026 CLAIM-19)
- **Trích nguyên văn:**
  ```
  TC-30 | ❌ AI — position sửa tay không bị clamp/bỏ qua; `"abc"` gây lỗi console; thumbnail cart mất ảnh / lệch (2/2 context) | Sửa `layer-<id>-position.x` (T2s) → reload → chọn lại T2s → `Add to Cart`. Preview: `x=-5` `translate(-1625 …)`, `x=99999` `translate(32499675 …)`, `x="abc"` `translate(NaN …)` + 3 console error `<g> attribute transform: Expected number, "translate(NaN …"`, `x=null` `translate(0 …)`. `POST staging-api…/customization` **201** gửi nguyên `"x":-5` / `99999` / `"abc"` / `null`; `/cart/add.js` 200; không 500; cart không có "Invalid image geometry". **Thumbnail cart** (`.tee-cart-thumbnail__img`, 960 px, load OK): baseline ảnh lệch trái đúng; `x=-5`, `x=99999` = layer **không có ảnh**; `"abc"`, `null` = ảnh ở x=0. Key `layer-<id>-position` (campaign khác) không có trong payload gửi đi, thumbnail = baseline
  ```
