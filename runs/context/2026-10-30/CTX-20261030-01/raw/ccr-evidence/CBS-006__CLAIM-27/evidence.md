# CBS-006 CLAIM-27 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-27` | TIB-5584 (QA plan bản sửa 11:39, Section E) — linked layer ('Link with another layer') theo effective visibility của layer nguồn ở AW 1.0 và 2.0: nguồn tự ẩn hoặc bị Group cha ẩn thì layer link không vẽ ở editor / storefront / print file, dòng dimmed + mắt amber + tooltip, không box/quick editor — CHƯA chạy | portal — layer panel + canvas (AW 1.0, AW 2.0) · storefront — preview · api — print file | `KHÔNG CÓ NGUỒN` — TC-TIB-6163..6174 not-run; chỉ có QA plan dev; PO chưa xác nhận phạm vi (Q13); 3 PR còn OPEN lúc 16:14 16/10 | artwork / layer-duplicate-link-copy (KB-045: bản LINKED 'Design and personalization are synced from it' — canon chưa nói về visibility) | `ADD` |

## Phần 1b
| `CLAIM-27` | `artwork` | `layer-duplicate-link-copy` | seller (store owner / staff) trên portal | portal, storefront, api | không có (liên quan KB-045) |

## 5.1

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** Jira TIB-5584 comment #54766 (QA plan, mục E, bước 21); TC-TIB-6163..6174 (not-run)
- **Link:** https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày dev viết QA plan; chưa có lần chạy)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt — Dev (assignee TIB-5584), comment QA plan #54766
- **Trích nguyên văn:**
  ```
  21. **A linked layer follows its source's visibility.** Link a layer **Name copy** to **Dog name**, keep Name copy outside any group, and test with both an Artwork 1.0 and an Artwork 2.0 artwork.
      * Name copy is **not** drawn in the editor, the storefront preview or the print file.
      * **Layers panel:** Name copy's row is dimmed with an **amber** eye, and its tooltip says the layer it's linked to is hidden.
      * **Selection:** clicking Name copy in the panel shows **no** drag/resize/rotate box, **no** quick transform or align, and no quick editor.
  ```
- **File đính kèm cho claim này:** không có

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

