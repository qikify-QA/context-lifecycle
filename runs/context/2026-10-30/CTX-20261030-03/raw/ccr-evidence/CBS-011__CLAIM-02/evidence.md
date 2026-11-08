# CBS-011__CLAIM-02

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-02` | TIB-5558 — một layer chỉ mang một action; đổi Show↔Hide giữ nguyên điều kiện, match type, trạng thái toggle; nhãn toggle đổi "Show/Hide this layer on first load" | portal (artwork editor) · api (PUT /api/artworks/{id}) | `test_case` — PASS TC-TIB-7316, TC-TIB-7317 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / conditional-setting-config | `ADD` |

## Phần 1b

| `CLAIM-02` | `artwork` | `conditional-setting-config` | store owner / staff | portal | không có |

## Phần 5.1

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7316, TC-TIB-7317`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7316: "Sau khi chọn Hide: chỉ còn một dropdown action (giá trị Hide), heading đổi thành "Hide
  this layer and its option when:", không xuất hiện khối điều kiện Show thứ hai; nút khả dụng trong
  panel chỉ có "Select all" và "+ Add conditions" — không có cách thêm action Show song song."
  TC-TIB-7317: "Sau khi chọn Hide: vẫn đúng 2 điều kiện đó, vẫn OR checked, toggle vẫn BẬT — chỉ
  heading đổi thành "Hide this layer and its option when:" và nhãn toggle thành "Hide this layer on
  first load". Đổi ngược lại Show: 2 điều kiện, OR và toggle BẬT giữ nguyên; nhãn toggle trở lại "Show
  this layer on first load"."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7316 — actualResult: Panel chỉ mang đúng một action tại một thời điểm.
Chạy trên AW-HIDE-1-SW (#5881) — bản sao action Show của AW-HIDE-1 (cùng điều kiện "Pet 1 Type is Cat", match AND). Dùng bản này vì AW-HIDE-1 (#5868) đã ở action Hide và đang là fixture của CP-HIDE-1 (case 11–13), đổi nó sẽ làm hỏng các case sau.
Trước khi đổi: dropdown = Show, heading "Show this layer and its option when:", 1 điều kiện "Pet 1 Type is any of: Cat", radio "All conditions match (AND)" checked, toggle "Show this layer on first load" tắt.
Sau khi chọn Hide: chỉ còn một dropdown action (giá trị Hide), heading đổi thành "Hide this layer and its option when:", không xuất hiện khối điều kiện Show thứ hai; nút khả dụng trong panel chỉ có "Select all" và "+ Add conditions" — không có cách thêm action Show song song.
Network → PUT https://staging-api.teeinblue.com/api/artworks/5881 → 200. Body: "dependency":{"action":"hide","match_type":"all","show_by_default":false,"dependencies":[{"value":[46703],"element":"layer-610006"}]} — đúng một khối dependency, đúng một giá trị action, không có action thứ hai. Khớp giá trị đã đặt.
Sau reload editor: Conditional Setting vẫn Hide, điều kiện "Pet 1 Type is any of: Cat" và match AND còn nguyên.
Không đính kèm screenshot: lượt chạy này không có tool Artifact để upload ảnh.
TC-TIB-7317 — actualResult: Đổi Show ↔ Hide trên AW-HIDE-2 (#5882) giữ nguyên toàn bộ điều kiện, match type và toggle; chỉ chữ action và nhãn toggle đổi theo.
Trước khi đổi: action = Show, 2 điều kiện "Pet 1 Type is any of: Cat" OR "Pet 2 Type is any of: Cat", radio "Any conditions match (OR)" checked, toggle "Show this layer on first load" BẬT.
Sau khi chọn Hide: vẫn đúng 2 điều kiện đó, vẫn OR checked, toggle vẫn BẬT — chỉ heading đổi thành "Hide this layer and its option when:" và nhãn toggle thành "Hide this layer on first load".
Đổi ngược lại Show: 2 điều kiện, OR và toggle BẬT giữ nguyên; nhãn toggle trở lại "Show this layer on first load".
Network → PUT https://staging-api.teeinblue.com/api/artworks/5882 → 200. Body: "dependency":{"action":"show","match_type":"any","show_by_default":true,"dependencies":[{"value":[46703],"element":"layer-610009"},{"value":[46703],"element":"layer-610010"}]} — đủ 2 điều kiện, match_type "any" và show_by_default true không bị mất hay reset, chỉ action đổi.
Sau reload editor: action Show, 2 điều kiện, OR, toggle BẬT — đúng như trước.
Không đính kèm screenshot: lượt chạy này không có tool Artifact để upload ảnh.
