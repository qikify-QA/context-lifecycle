# CBS-016__CLAIM-02 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S0

**Đánh giá:** S0: CCR khai KHÔNG CÓ NGUỒN; staging không có Carattere, mọi PASS là Dancing Script; comment dev 55257 chỉ nêu nguyên nhân đo trên Carattere và liệt kê 'Possible test case' chưa tick — không xác nhận kết quả sau fix; không quan sát production. Không có artifact quan sát điều claim khẳng định → không nạp. CBS-008 cũng S0.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-02` | TIB-5606 — case gốc font Carattere (artwork prod 1370428, 3 màu, stroke, căn phải) sau fix hiện đủ ký tự ở Locate Artwork + Order Design | api (PNG renderer) · portal (Locate artwork) | `KHÔNG CÓ NGUỒN` — staging không có font Carattere, mọi PASS là Dancing Script (TC-TIB-6638/6639); comment dev chỉ nêu nguyên nhân đo trên Carattere, không xác nhận kết quả sau fix; chưa ai kiểm trên production | artwork / text-color-sequence-render; font (Carattere) | `ADD` |
| `CLAIM-02` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | không có (S0 ở CBS-008, chưa nạp) |

## CCR 5.1 (nguyên văn)

### CLAIM-02

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** comment Jira 55257 (nguyên nhân) · TC-TIB-6638/6639 (chạy trên font thay thế)
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev) — mô tả nguyên nhân, không xác nhận kết quả sau fix trên Carattere
- **Trích nguyên văn:**
  ```
  "In script and italic fonts the glyphs measured alone add up wider than the whole word (e.g. Carattere "Elizabeth"
  at 229px: 751.5px vs 636.1px)"
  "Possible test cases: [ ] Artwork 1370428 ("Elizabeth", Carattere, 3 letter colors, stroke, right-aligned): Locate
  Artwork / Order Design shows all letters, connected, and in the same position as the SDK live preview" (chưa tick)
  ```
- **File đính kèm cho claim này:** không có
