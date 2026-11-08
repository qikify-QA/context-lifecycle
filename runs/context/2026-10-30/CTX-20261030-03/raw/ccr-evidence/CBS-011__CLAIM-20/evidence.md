# CBS-011__CLAIM-20

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-20` | TIB-5558 — MCP artwork tools hỗ trợ Hide: create/update layer với điều kiện Hide, get-form-preview-tool khớp form storefront (C11) | api (MCP teeinblue: create-artwork-tool, update-artwork-layer-tool, get-form-preview-tool) | `KHÔNG CÓ NGUỒN` — case 7342 status passed nhưng actualResult rỗng; lượt [AI] BLOCKED; artwork #5970 chỉ là capture tự chụp | chưa rõ, cần agent tự đánh giá (canon không có object/feature cho MCP) | `UNKNOWN` |

## Phần 1b

| `CLAIM-20` | chưa rõ — canon không có object cho MCP (mô tả bằng lời: MCP server teeinblue, artwork tools) | MỚI: mcp-artwork-conditional | AI client (API key của store owner) | api | không có |

## Phần 5.1

### CLAIM-20

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7342 (actualResult rỗng); artwork #5970 tạo qua MCP create-artwork-tool; RA C11`
- **Link:** `https://staging-portal.teeinblue.com/artworks?id=5970`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `QA (chienct) đổi status tay, không ghi kết quả; RA C11 diễn giải đáp án dev Slack 2026-10-28`
- **Trích nguyên văn:**
  ```
  TC-TIB-7342 actualResult: (rỗng)
  RA analysis_TIB-5558.md, C11: "MCP artwork tools có hỗ trợ Hide: AI client tạo/cập nhật được layer
  với điều kiện Hide, tài liệu cho AI client đã mô tả Show/Hide, và get-form-preview-tool hiển thị đúng
  option ẩn/hiện theo Hide. (Q5, Slack 2026-10-28)"
  Capture tự chụp 2026-10-28: artwork #5970 tạo bằng create-artwork-tool với dependency {action:
  "hide", match_type: "all", show_by_default: false, dependencies: [{element: <layer text nguồn>,
  operator: "contains", value: "A"}]}; get-artwork-tool đọc lại action "hide".
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7342 — actualResult: (rỗng)
