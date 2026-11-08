# CBS-011__CLAIM-01

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-01` | TIB-5558 — Conditional Setting (Artwork 2.0): chữ Show trong heading là dropdown đúng 2 giá trị Show / Hide; chọn Hide → heading "Hide this layer and its option when:"; mặc định Show, cả với layer mới thêm | portal (artwork editor, accordion CONDITIONAL SETTING) | `test_case` — PASS TC-TIB-7313, TC-TIB-7314 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); Passed 2026-10-28; build hash: không rõ (QA không có quyền repo) | artwork / conditional-setting-config; KB-005 (tên accordion "Show this layer and its option when..." giờ đầu heading là dropdown) | `ADD` |

## Phần 1b

| `CLAIM-01` | `artwork` | `conditional-setting-config` | store owner / staff | portal | `KB-005` (artwork) |

## Phần 5.1

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7313, TC-TIB-7314 (Testlane task TIB-231)`
- **Link:** `không có (Testlane task TIB-231, project proj-7082bc68-6228-4718-b22d-c8e6f95437ab)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI] (QA pipeline của chienct)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7313: "Trên AW-HIDE-BASE (#5878), panel Conditional Setting của layer "QUOTE DOG" hiển thị
  heading mặc định "Show this layer and its option when:"; bấm vào chữ Show mở listbox có đúng 2
  option Show / Hide (không có giá trị thứ ba), chọn Hide thì heading đổi ngay thành "Hide this layer
  and its option when:". Không bấm Save nên artwork giữ nguyên trạng thái cũ."
  TC-TIB-7314: "Thêm layer Single-line Text mới vào AW-HIDE-BASE (#5878), mở Conditional Setting của
  layer vừa thêm: dropdown action đang ở giá trị "Show" và heading là "Show this layer and its option
  when:", match type mặc định "All conditions match (AND)", chưa có điều kiện nào."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7313 — actualResult: Trên AW-HIDE-BASE (#5878), panel Conditional Setting của layer "QUOTE DOG" hiển thị heading mặc định "Show this layer and its option when:"; bấm vào chữ Show mở listbox có đúng 2 option Show / Hide (không có giá trị thứ ba), chọn Hide thì heading đổi ngay thành "Hide this layer and its option when:". Không bấm Save nên artwork giữ nguyên trạng thái cũ.
TC-TIB-7314 — actualResult: Thêm layer Single-line Text mới vào AW-HIDE-BASE (#5878), mở Conditional Setting của layer vừa thêm: dropdown action đang ở giá trị "Show" và heading là "Show this layer and its option when:", match type mặc định "All conditions match (AND)", chưa có điều kiện nào. Không Save, artwork được Cancel để giữ nguyên fixture.
