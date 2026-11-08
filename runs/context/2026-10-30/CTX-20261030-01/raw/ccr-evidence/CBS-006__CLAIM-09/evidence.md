# CBS-006 CLAIM-09 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-09` | TIB-5584 — layer hoặc Group thiếu key `visible` (artwork ghi qua MCP/API) được coi là visible: mắt ON, không dimmed, vẽ trên canvas editor và trên Live preview của portal; con của Group thiếu key render theo cờ riêng (render phía server cho layer thiếu key CHƯA đối chiếu) | portal — canvas + Live preview · api — artwork tạo qua MCP/API | `test_case` — PASS TC-TIB-6055, TC-TIB-6056 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-save-persist (KB-055 — `visible` có ở 35/35 layer trong 1 sample; claim này nói giá trị mặc định khi thiếu) | `ADD` |

## Phần 1b
| `CLAIM-09` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có (liên quan KB-055) |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6055, TC-TIB-6056
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5036 · https://staging-portal.teeinblue.com/artworks?id=5037
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6055 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5036 (không Save trong editor): layer NOKEY (không có key visible) mắt ON, không dimmed, hiển thị trên canvas editor; tab Live preview (renderer của portal) cũng vẽ NOKEY cùng HASKEY. Group "G" ON. Giới hạn: không có tool server-side render-design-preview trong phiên chạy này, nên bản render phía server chưa đối chiếu được; renderer đã kiểm là Live preview của portal. Không có request ghi vì không Save.
  TC-TIB-6056 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5037 (Group "G" không có key visible, không Save): mắt Group ON, con không dimmed; C1 mắt ON, C2 mắt gạch chéo; canvas thấy C1, không thấy C2.
  ```
- **File đính kèm cho claim này:** không có
