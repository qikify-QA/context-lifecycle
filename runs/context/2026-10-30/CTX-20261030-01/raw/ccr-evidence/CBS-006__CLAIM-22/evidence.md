# CBS-006 CLAIM-22 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-22` | TIB-5584 — MCP `render-design-preview` theo effective visibility: Group ẩn thì ảnh render không có layer con của Group và khớp print file (tiêu chí đủ là khớp print file) | api — MCP teeinblue `render-design-preview-tool` | `test_case` — PASS TC-TIB-6074 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | không khớp object nào trong registry (MCP tool) — gần nhất artwork; đối chiếu order (print file) | `ADD` |

## Phần 1b
| `CLAIM-22` | `không khớp registry — MCP render-design-preview (gần nhất: artwork)` | `MỚI: mcp-render-design-preview` | seller / AI agent dùng MCP | api | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6074
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5046
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** QA chienct + agent phiên chính (retest), [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-6074 (chạy 2026-10-16, staging, [AI]) — actualResult: Retest 2026-10-16 (main session, MCP teeinblue): gọi render-design-preview-tool cho artwork #5046 "TIB5584 AW-G1H group hidden" (template-935046; Group "Name" visible=false chứa LINE1, LINE2, ICON đều visible=true; OUTSIDE ngoài group). Kết quả render: preview c8c4f2c3 chỉ có chữ OUTSIDE, không có LINE1/LINE2/ICON. So với print file Front của order #1084 (campaign #3043 ) — cũng chỉ có OUTSIDE → khớp. Instance: nprice1 (520).
  ```
- **File đính kèm cho claim này:** không có
