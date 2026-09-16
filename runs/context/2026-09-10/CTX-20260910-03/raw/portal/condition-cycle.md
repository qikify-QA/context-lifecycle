# TASK 2 — Condition vòng (circular dependency) trên artwork 4087

> **Evidence account:** `Linh explorer` · `linh-explorer.myshopify.com` · JWT `sub="273"`, `user_id=266`
> **Object:** artwork **4087** `QA - all layers v3`, staging · 1 template (`Default template`)
> **Ngày:** 2026-09-10 · `knowledge_kind: OBSERVED_CURRENT` · `current_behavior_only: true`

## 0. Đồ thị phụ thuộc trước khi test

```
word-search      (layer-545421)  ->  cả 8 layer nguồn      [tạo ở TASK 1]
paragraph        (layer-859484)  ->  toggle, clipart-category   [có sẵn từ run trước]
```

`word-search` và `paragraph` KHÔNG thuộc 8 type làm nguồn được ⇒ chúng chỉ là "lá" trỏ vào,
không thể nằm trong vòng. Nhưng chúng **có mặt trong message lỗi** (xem §3.3).

---

## 1. Vòng 2 bước: `clipart-category` → `toggle` → `clipart-category`

### 1.1 Bước A — `clipart-category` phụ thuộc `toggle` (chưa thành vòng)

| Mục | Quan sát |
|---|---|
| ACT | `ACT-02-01-001` |
| Thao tác | layer `clipart-category` (`layer-348502`) → `CONDITIONAL SETTING` → `+ Add conditions` → chọn `Add gift box / Toggle` → select `On` |
| Dropdown | 7 mục (8 nguồn trừ chính nó). Không mục nào bị disabled |
| `Save & Close` | **SUCCESS** — `POST /api/artworks/4087/validate-default-value` 204 → `PUT /api/artworks/4087` **200** |
| JSON lưu | `layer-348502.dependency = {"match_type":"all","dependencies":[{"value":true,"element":"layer-919695"}],"show_by_default":false}` |

Evidence: `shots/ACT-02-01-001-after-clipart-depends-on-toggle.png`

### 1.2 Bước B — `toggle` phụ thuộc ngược lại `clipart-category` (đóng vòng)

| Câu hỏi | Quan sát |
|---|---|
| **UI có chặn ngay lúc chọn không?** | **KHÔNG.** Dropdown "Option:" của layer `toggle` vẫn liệt kê đủ 7 mục, trong đó **`OPT clipart-category` hiện bình thường, class chỉ là `multiselect__option`, không có `multiselect__option--disabled`, không ẩn**. Chọn được, không toast, không cảnh báo. Sau khi chọn, grid clipart hiện ra và clipart đầu tiên tự tick sẵn như bình thường. |
| **`Save & Close` có bị chặn không?** | **CÓ.** Modal **không đóng**, URL vẫn `?id=4087`. |
| **Message nguyên văn** | `Template - Default template:`<br>`Circular conditions between: Word Search > Toggle > 2_tay_xanh_cheo_nhau` |
| **Network** | `POST /api/artworks/4087/validate-default-value` → **204**; **KHÔNG có `PUT /api/artworks/4087`** ⇒ chặn ở client, không chạm DB |
| **Console** | không có error mới liên quan (chỉ warning Vue/gravatar 404 nền) |
| **Nút `Save` (dropdown cạnh `Save & Close`)** | thử riêng → **cũng bị chặn**, cùng message, cũng không có PUT |
| **JSON lưu** | **không có** — `layer-919695` (`toggle`) vẫn không có key `dependency` sau khi đọc lại GraphQL |
| **Sau reload** | Bấm `Cancel` → mở lại artwork → layer `Toggle` panel `CONDITIONAL SETTING` = `No conditions`. Vòng biến mất hoàn toàn |

Evidence:
- `shots/ACT-02-01-002-dropdown-offers-clipart-category-on-toggle.png` (UI KHÔNG chặn lúc chọn)
- `shots/ACT-02-01-002-after-toggle-depends-on-clipart.png` (condition đã set trong panel)
- `shots/ACT-02-01-002-after-save-blocked-circular-toast.png` (toast lỗi)

> ⇒ **Vòng 2 bước KHÔNG tạo được.** Chặn xảy ra ở **thời điểm save**, không phải lúc chọn.

---

## 2. Vòng 3 bước: `additional-option` → `addon-charge` → `font` → `additional-option`

Task nói "nếu bước 1 tạo được thì thử 3 bước". Bước 1 **không** tạo được, nhưng vẫn chạy bước 2 để
biết validator có bắt được vòng dài hơn 2 hay không.

### 2.1 Bước A+B — chuỗi acyclic `additional-option` → `addon-charge` → `font`

| Mục | Quan sát |
|---|---|
| ACT | `ACT-02-02-001` |
| Thao tác | trong **cùng một session editor**: `additional-option` phụ thuộc `addon-charge` (`Option 1`); rồi `addon-charge` phụ thuộc `font` (`QA Renamed Baginda`) |
| Quan sát phụ | khi cấu hình `addon-charge`, dropdown **vẫn liệt kê `OPT additional-option`** — tức UI cũng cho phép dựng vòng 2 bước **trong cùng một session chưa save** |
| `Save & Close` | **SUCCESS** — `validate-default-value` 204 → `PUT` **200** |
| JSON lưu | `layer-485540.dependency.dependencies = [{"value":["id-957711"],"element":"layer-719170"}]`<br>`layer-719170.dependency.dependencies = [{"value":["users/266/cliparts/6011/6aa28827aba1d.woff2"],"element":"layer-965490"}]` |

### 2.2 Bước C — `font` phụ thuộc `additional-option` (đóng vòng 3 bước)

| Câu hỏi | Quan sát |
|---|---|
| ACT | `ACT-02-02-002` |
| **UI có chặn ngay lúc chọn không?** | **KHÔNG.** Dropdown của layer `Font` liệt kê đủ 7 mục; cả `OPT additional-option` (đóng vòng 3 bước) lẫn `OPT addon-charge` (đóng vòng 2 bước) đều hiện bình thường, không disabled. Chọn `OPT additional-option` → chọn giá trị `AO Alpha` → không toast, không cảnh báo |
| **`Save & Close` có bị chặn không?** | **CÓ.** Modal không đóng |
| **Message nguyên văn** | `Template - Default template:`<br>`Circular conditions between: Word Search > Additional option > Addon charge > Font` |
| **Network** | `POST /api/artworks/4087/validate-default-value` → **204**; **KHÔNG có `PUT`** |
| **JSON lưu** | **không có** |
| **Sau reload** | layer `Font` → `CONDITIONAL SETTING` = `No conditions` |

Evidence:
- `shots/ACT-02-02-002-dropdown-offers-additional-option-on-font.png`
- `shots/ACT-02-02-002-after-save-blocked-3cycle-toast.png`

> ⇒ **Vòng 3 bước cũng KHÔNG tạo được**, cùng cơ chế chặn.

---

## 3. Mô tả hành vi quan sát được (không kết luận rộng hơn evidence)

### 3.1 Thời điểm chặn
Chặn xảy ra **duy nhất ở bước save**, phía **client**:
- Không có validate nào chạy lúc chọn option nguồn (0 request).
- `POST /api/artworks/4087/validate-default-value` vẫn chạy và trả 204 (nó kiểm default value, không kiểm vòng).
- `PUT /api/artworks/4087` **không được gửi** ⇒ DB không bị chạm, không cần cleanup.
- Cả `Save & Close` lẫn `Save` (mục trong dropdown) đều bị chặn như nhau.

### 3.2 Trạng thái sau khi bị chặn
Condition sai vẫn **còn trong modal** (in-memory). Người dùng phải tự xoá hoặc `Cancel`.
`Cancel` huỷ toàn bộ thay đổi chưa save của session đó — kể cả thay đổi hợp lệ ở layer khác.

### 3.3 Nội dung message
Format: `Template - <tên template>:` + newline + `Circular conditions between: A > B > C`.

Điểm cần lưu ý: **phần tử đầu của chuỗi không thuộc vòng**.
- Vòng thật ở §1 là `Toggle ↔ 2_tay_xanh_cheo_nhau` (2 node), nhưng message ghi
  `Word Search > Toggle > 2_tay_xanh_cheo_nhau`.
- Vòng thật ở §2 là `Additional option → Addon charge → Font → Additional option` (3 node), message ghi
  `Word Search > Additional option > Addon charge > Font`.

`Word Search` là layer phụ thuộc cả 8 nguồn (tạo ở TASK 1) và **không thể** nằm trong vòng
(`word-search` không phải type làm nguồn được). ⇒ message in ra **đường đi duyệt** dẫn tới vòng,
tính từ một layer gốc, **không phải** chu trình tối giản. Tên hiển thị dùng **layer name**
(`2_tay_xanh_cheo_nhau`, `Word Search`), không phải Option Title (`OPT clipart-category`).

**NOT_VERIFIED:** thuật toán chọn layer gốc nào (thứ tự template? layer đầu tiên dẫn vào vòng?) —
mới có 2 sample, cả hai đều ra `Word Search`. Cũng chưa kiểm được vòng **không** có layer ngoài
trỏ vào, vì `word-search` đang phụ thuộc cả 8 nguồn nên mọi vòng giữa 8 type đó đều tiếp cận được
từ `word-search`.

### 3.4 Những gì UI **không** làm
- Không ẩn / không disable option nguồn sẽ tạo vòng.
- Không hiện tooltip/inline error tại condition gây vòng — chỉ 1 toast chung ở mức template.
- Không chỉ ra **condition nào** phải sửa (chỉ nêu tên layer).

---

## 4. Trạng thái CUỐI của artwork 4087 (để KB không mô tả sai)

`updated_at = 2026-09-10T10:52:38`. **5 layer** có key `dependency` (30 layer còn lại **không có key**
`dependency`, không phải `null`):

| layer id | type | `match_type` | phụ thuộc (element) | ghi chú |
|---|---|---|---|---|
| `layer-545421` | `word-search` | `all` | 8 nguồn: `919695`, `485540`, `719170`, `985154`, `965490`, `182438`, `348502`, `817491` | **TASK 1 — cố ý giữ lại** |
| `layer-485540` | `additional-option` | `all` | `layer-719170` (`["id-957711"]`) | TASK 2, chuỗi acyclic — giữ lại |
| `layer-719170` | `addon-charge` | `all` | `layer-965490` (`["users/266/cliparts/6011/6aa28827aba1d.woff2"]`) | TASK 2, chuỗi acyclic — giữ lại |
| `layer-859484` | `paragraph` | `any` | `layer-919695`, `layer-348502` | có từ trước run này, `show_by_default: true` |
| `layer-348502` | `clipart-category` | `all` | `layer-919695` (`true`) | TASK 2 bước 1.1 — giữ lại |

Toàn bộ `show_by_default = false` trừ `paragraph` (`true`).

**Không tồn tại condition vòng nào trong DB.** Hai lần thử đóng vòng đều bị chặn trước khi gửi PUT.

### Cảnh báo cho run sau
Vì đồ thị hiện tại có chuỗi `additional-option → addon-charge → font` và `clipart-category → toggle`,
bất kỳ điều kiện mới nào nối ngược lại (vd `font → addon-charge`, `toggle → clipart-category`)
sẽ **bị chặn khi save**. Nếu cần đồ thị sạch, xoá `dependency` của `layer-485540`, `layer-719170`,
`layer-348502`.

### Data đã tạo mới trên store `linh-explorer` (không xoá)
- `cliparts` **41709** `AO Alpha`, **41710** `AO Beta` trong category `additional_option` **6009** (`QA AddOpt Cat`)
- `cliparts` **41712** `QA Renamed Baginda`, **41713** `Bebas Neue` trong `font_category` **6011** (`QA v3 Font Cat`)
- layer `additional-option` (`layer-485540`) được gán `clipart: 6009`

Không có `delete` / `publish` / `charge` / `notification` nào được thực hiện.

---

## 5. NOT_VERIFIED

- **Self-loop (A → A)**: dropdown "Option:" luôn loại chính layer đang cấu hình ⇒ không tạo được qua UI. Chưa test qua API.
- **Vòng không có layer ngoài trỏ vào**: xem §3.3.
- **Vòng ≥ 4 bước**: chưa test.
- **Server-side có kiểm vòng không**: PUT chưa bao giờ được gửi với payload vòng ⇒ **không biết** API `PUT /api/artworks/{id}` có tự chặn hay chỉ client chặn. Muốn biết phải gọi API trực tiếp (`api-explorer`).
- **Vòng qua nhiều template**: artwork 4087 chỉ có 1 template (`Default template`).
- **Hành vi runtime trên storefront nếu vòng lọt vào DB bằng đường khác** — ngoài scope.
