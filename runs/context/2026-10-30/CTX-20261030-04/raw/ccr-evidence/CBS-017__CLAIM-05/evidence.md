# CBS-017__CLAIM-05

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-05` | TIB-5580 — Thứ tự vẽ ở cả 3 renderer: từng lớp stroke vẽ qua mọi dòng, lớp ngoài trước, fill mọi dòng sau cùng; PNG (API, 2 đường ≤ 15px / > 15px) và SVG (vectorize) giống preview | storefront (SDK preview) · api (PNG order design) · vectorize (SVG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6319 và TC-TIB-6322 Blocked (SDK staging chưa có code, không tải được SVG); TC-TIB-6320 và TC-TIB-6321 actualResult chỉ còn link order, Testlane status passed không đáng tin | artwork/text-multi-stroke · sdk storefront render (chưa rõ feature, cần agent tự đánh giá) | `UNKNOWN` |

## Phần 1b

| `CLAIM-05` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer (render storefront/order) | storefront · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-05

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6319, TC-TIB-6320, TC-TIB-6321, TC-TIB-6322 (Testlane task TIB-220); comment dev chauptm id 54782 trên TIB-5580`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5580?focusedCommentId=54782`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] (actualResult 2026-10-21); dev chauptm (comment 2026-10-16) — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  TC-TIB-6319 (actualResult): Blocked — Phần preview storefront không kiểm được: SDK staging chưa có code vẽ multi-stroke cho paragraph. Preview editor (#5179, line-height 1.0, 3 lớp; đã quan sát ở 4/4/4 và 8/8/8): vành stroke xếp đỏ → xanh lá → xanh dương từ mép chữ ra ngoài, fill trắng của cả 3 dòng nằm trên cùng; ở vùng giáp dòng 1–2 và 2–3 không có chữ nào bị viền dòng khác cắt/che.
  TC-TIB-6320 (actualResult): https://staging-portal.teeinblue.com/orders/4751.
  TC-TIB-6321 (actualResult): https://staging-portal.teeinblue.com/orders/4751
  TC-TIB-6322 (actualResult): https://staging-portal.teeinblue.com/orders/4752
  Comment dev 54782 (2026-10-16): "makes all three renderers use the preview's paint order: each stroke layer is painted across every line before the next one, outermost first, then the fill of every line."
  ```
- **File đính kèm cho claim này:** `không có`
