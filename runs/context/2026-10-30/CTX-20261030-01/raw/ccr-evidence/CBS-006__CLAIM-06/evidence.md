# CBS-006 CLAIM-06 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-06` | TIB-5584 — Group có mask: ẩn Group thì mask của Group cũng ngừng áp và không layer con nào được vẽ (không có trường hợp mất mask mà con vẫn vẽ tràn) | portal — canvas Artwork Editor | `test_case` — PASS TC-TIB-6051 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork — Group Mask (TIB-5403) chưa có trong canon qa-knowledge; context local artwork.md → 'Group Mask' | `ADD` |

## Phần 1b
| `CLAIM-06` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6051
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5052
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6051 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5052 : trước khi ẩn canvas hiện vùng mask nhỏ (M1/M2 bị clip); ẩn Group "Masked" thì canvas trống hoàn toàn, không còn pixel M1/M2 hay vùng mask, không có hiện tượng mask mất mà con vẫn vẽ tràn. M1/M2 dimmed, mắt ON amber. Không Save nên không có request ghi.
  ```
- **File đính kèm cho claim này:** không có
