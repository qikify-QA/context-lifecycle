# CBS-011__CLAIM-04

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-04` | TIB-5558 — data: layer lưu `dependency.action` = "hide" (hoặc "show") cùng match_type, show_by_default, dependencies; reload giữ đúng; bản ghi cũ KHÔNG có key action được hiểu là Show, không bị migrate | api (PUT /api/artworks/{id}, GraphQL artworks) · portal | `test_case` — PASS TC-TIB-7318, TC-TIB-7317, TC-TIB-7315 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / layer-condition-value-binding; checklist layer-condition-value-binding CHK-001 có thể làm SAI: expected shape {match_type, show_by_default, dependencies} không có key action, bản lưu mới luôn có action | `SUPERSEDES` |

## Phần 1b

| `CLAIM-04` | `artwork` | `layer-condition-value-binding` | store owner / staff | api | `KB-067` (artwork) |

## Phần 5.1

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7318, TC-TIB-7317, TC-TIB-7315; raw request/response trong teeinblue/TIB automation/qa-output/api-observations_TIB-231.json`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7318: "Network → PUT https://staging-api.teeinblue.com/api/artworks/5881 → 200. Body:
  "dependency":{"action":"hide","match_type":"all","show_by_default":false,"dependencies":[{"value":
  [46703],"element":"layer-610006"}]} — giá trị lưu xuống đúng là chuỗi "hide" … Sau reload editor:
  dropdown = Hide, heading "Hide this layer and its option when:", điều kiện "Pet 1 Type is any of:
  Cat", radio "All conditions match (AND)" checked, nhãn toggle "Hide this layer on first load"."
  TC-TIB-7317: "Body: "dependency":{"action":"show","match_type":"any","show_by_default":true,
  "dependencies":[…]} — đủ 2 điều kiện, match_type "any" và show_by_default true không bị mất hay
  reset, chỉ action đổi."
  TC-TIB-7315: "API GraphQL artworks (#5880): dependency = {match_type: "all", dependencies:
  [{element: "layer-610003", value: [46702]}], show_by_default: false} — bản ghi cũ không có key
  action nên được hiểu là Show, không bị migrate sai."
  ```
- **File đính kèm cho claim này:** `api-observations_TIB-231.json (local, không đính kèm)`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7318 — actualResult: Lưu và reload giữ đúng cấu hình Hide.
Chạy trên AW-HIDE-1-SW (#5881) (bản sao action Show của AW-HIDE-1, cùng điều kiện "Pet 1 Type is Cat" + match AND) — AW-HIDE-1 #5868 đang là fixture Hide của CP-HIDE-1 nên không đổi nó. Đặt lại action về Show, lưu, rồi chạy lại case từ trạng thái Show.
Editor hiện toast "Success — Your artwork has been updated", không có lỗi.
Network → PUT https://staging-api.teeinblue.com/api/artworks/5881 → 200. Body: "dependency":{"action":"hide","match_type":"all","show_by_default":false,"dependencies":[{"value":[46703],"element":"layer-610006"}]} — giá trị lưu xuống đúng là chuỗi "hide" (khớp assumption Section 5), match_type "all" (AND) và điều kiện Pet 1 Type = Cat (option id 46703) giữ nguyên, không bị đổi tên/bỏ bớt/default về show.
Sau reload editor: dropdown = Hide, heading "Hide this layer and its option when:", điều kiện "Pet 1 Type is any of: Cat", radio "All conditions match (AND)" checked, nhãn toggle "Hide this layer on first load".
Không đính kèm screenshot: lượt chạy này không có tool Artifact để upload ảnh.
TC-TIB-7317 — actualResult: Đổi Show ↔ Hide trên AW-HIDE-2 (#5882) giữ nguyên toàn bộ điều kiện, match type và toggle; chỉ chữ action và nhãn toggle đổi theo.
Trước khi đổi: action = Show, 2 điều kiện "Pet 1 Type is any of: Cat" OR "Pet 2 Type is any of: Cat", radio "Any conditions match (OR)" checked, toggle "Show this layer on first load" BẬT.
Sau khi chọn Hide: vẫn đúng 2 điều kiện đó, vẫn OR checked, toggle vẫn BẬT — chỉ heading đổi thành "Hide this layer and its option when:" và nhãn toggle thành "Hide this layer on first load".
Đổi ngược lại Show: 2 điều kiện, OR và toggle BẬT giữ nguyên; nhãn toggle trở lại "Show this layer on first load".
Network → PUT https://staging-api.teeinblue.com/api/artworks/5882 → 200. Body: "dependency":{"action":"show","match_type":"any","show_by_default":true,"dependencies":[{"value":[46703],"element":"layer-610009"},{"value":[46703],"element":"layer-610010"}]} — đủ 2 điều kiện, match_type "any" và show_by_default true không bị mất hay reset, chỉ action đổi.
Sau reload editor: action Show, 2 điều kiện, OR, toggle BẬT — đúng như trước.
Không đính kèm screenshot: lượt chạy này không có tool Artifact để upload ảnh.
TC-TIB-7315 — actualResult: Layer cũ giữ nguyên hành vi Show sau khi có tính năng Hide.
Editor AW-LEGACY-SHOW (#5880) → Conditional Setting của layer "QUOTE OLD": dropdown action = "Show", heading "Show this layer and its option when:", điều kiện "Pet 1 Type is any of: Dog" và match All conditions match (AND) giữ nguyên; nhãn toggle vẫn là "Show this layer on first load".
API GraphQL artworks (#5880): dependency = {match_type: "all", dependencies: [{element: "layer-610003", value: [46702]}], show_by_default: false} — bản ghi cũ không có key action nên được hiểu là Show, không bị migrate sai.
Storefront CP-LEGACY-SHOW (tib-5558-cp-legacy-show): Pet 1 Type = Dog (khớp) → field "QUOTE OLD" hiện trên form và node artwork-layer--layer-610004 hiện trên preview; đổi sang Cat (không khớp) → cả field lẫn node artwork biến mất. Đúng chiều Show, không bị đảo.
Không chụp được screenshot đính kèm: lượt chạy Slack này không có tool Artifact để upload ảnh.
