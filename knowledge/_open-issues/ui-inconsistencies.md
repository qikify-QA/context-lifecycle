# UI/behavior chưa nhất quán — để dành

## 1. `Add new` bị disable ở Colors / Additional Options / Map Styles

**Quan sát (2026-09-10, store `linh-explorer`, plan Blue Test):** với category **mới tạo và
đang rỗng**, nút `Add new` để thêm item bị **disabled** ở cả 3 trang:

| Trang | Category test | Kết quả |
| --- | --- | --- |
| `/color-categories?id=6008` | QA Color Cat | `Add new` **disabled** (nhưng `Add new sub-category` vẫn enabled) |
| `/additional-options?id=6009` | QA AddOpt Cat | `Add new` **disabled** |
| `/map-styles?id=6010` | QA Map Cat | `Add new` **disabled** |

DOM nguyên văn:

```html
<button class="promise-button btn btn-sm btn-outline-primary" type="button" disabled href="javascript:;">
  <span><i class="las la-plus"></i><span>Add new</span></span>
  <span class="promise-button-spinner" role="status" style="display:none">…</span>
</button>
```

**Đã loại trừ:** không phải "kẹt loading" — thuộc tính `disabled` có thật và
**spinner đang `display:none`**. Đã thử bấm `Save` category trước, hard reload, chờ 9-10 giây:
vẫn disabled. Không phải lỗi chung của mọi `Add new`: nút `Add new` của **font category** hoạt
động bình thường (mở modal "Select a font"), `Add new sub-category` của color cũng enabled.

Evidence: `runs/context/2026-09-10/CTX-20260910-01/raw/portal/evidence-addnew-disabled-mapstyles.png`

**Chưa xác định:** do store mới chưa có data nền, do plan Blue (store cũ là Enterprise), hay là bug.

**Update (2026-09-12, run `CTX-20260910-06`, xem `knowledge/products/teeinblue/objects/asset-category/kb.json` CONF-003 — vẫn UNRESOLVED, KHÔNG tự đóng ở đây):**
Run `CTX-20260910-06` quan sát lại hành vi nút `Add new` trên **2 nhóm category khác** với category gốc phát hiện bug (6008/6009/6010) phía trên:

- (a) category **CŨ**, tồn tại từ trước run này (Color 6012 / Additional Option 6013 / Map Style 6014 — do 2 tiến trình đụng độ trước tạo, giữ lại làm corroborating evidence).
- (b) category **MỚI TẠO TRONG RUN NÀY** (Color 6021 / Additional Option 6022 / Map Style 6023 — tạo và test trực tiếp trong `CTX-20260910-06`, network + DOM capture đầy đủ, act_id `ACT-03-02-002`/`ACT-04-02-002`/`ACT-05-02-002`).

Ở **cả 2 nhóm (6/6 sample)**: nút `Add new` chỉ `disabled` khi input text liền kề (hex color / item name / map style option name) đang **rỗng**; điền giá trị vào input liền kề thì nút `enabled` và mutation `insert_cliparts` gửi thành công (status 200, item mới trả về) — **không tái hiện** kiểu "disabled vĩnh viễn dù đã điền input" như mô tả gốc phía trên.

Tuy nhiên **cả 2 nhóm (a) và (b) đều KHÁC category gốc phát hiện bug (6008/6009/6010)** — nên chưa loại trừ hoàn toàn khả năng category gốc có vấn đề dữ liệu riêng. Category gốc 6008/6009/6010 **chưa được re-test trực tiếp** (nằm trong `forbidden_actions` của run này). Vì vậy mục này **giữ nguyên UNRESOLVED**, không tự đóng — cần re-test trực tiếp trên 6008/6009/6010 (hoặc xác nhận đã bị dọn/không còn tồn tại) trước khi kết luận đây là bug thật hay chỉ là đặc thù của 3 category gốc.

## 2. GIF: dropzone nhận nhưng zip extractor bỏ

- Dropzone clipart khai `accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/webp"`
  → **có `image/gif`**.
- Nhưng bulk upload zip thì **bỏ qua file `.gif`**: zip `mixed-files` chứa jpg + png + gif,
  log chỉ enqueue **2/2** (jpg, png). Zip `invalid-only` có gif → `Error - No valid entries found`.

Cùng một loại asset, **2 đường vào cho kết quả khác nhau**. Chưa rõ đường nào đúng ý sản phẩm.
Xem [../portal-assets.md](../portal-assets.md).

## 3. `Custom class` xuất hiện 2 lần ở Word Search

Layer `word-search`: `Custom class` có ở cả **PERSONALIZATION SETTINGS** và **EXTRA**.
→ **Đã xác nhận là lỗi UI, đã được report.** Giữ lại đây để khi viết test case không nhầm là
2 field khác nhau.
