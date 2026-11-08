# CBS-017__CLAIM-09

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-09` | TIB-5580 — Linked paragraph mang cùng stack của paragraph gốc; mọi lớp stroke scale theo tỉ lệ width | portal · storefront · api (PNG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6327 Blocked: editor/API đạt nhưng storefront SDK staging chưa có code | artwork/text-multi-stroke · artwork/layer-duplicate-link-copy (chưa rõ, cần agent tự đánh giá) | `UNKNOWN` |

## Phần 1b

| `CLAIM-09` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · storefront · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-09

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6327 (Testlane task TIB-220); artwork #5183, campaign #3099`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  Blocked — Phần editor/API đạt, nhưng bước preview storefront không kiểm được vì SDK staging chưa vẽ multi-stroke cho paragraph.
  #5183: paragraph gốc PARA-ORIGIN (1400px, font 140) + PARA-LINKED-50 (linked, 700px, font 70). Layer linked không có nút Stroke riêng (kế thừa từ gốc). Đặt 3 lớp #FF0000/#00FF00/#0000FF (6px) trên paragraph gốc, Save: PUT /api/artworks/5183 → 200; payload PARA-ORIGIN stroke_layers = [{#FF0000,6},{#00FF00,6},{#0000FF,6}], PARA-LINKED-50 (customization_type linked, linked=layer-558007) mang cùng 3 lớp, cùng thứ tự/màu.
  Preview editor (zoom 100%): paragraph linked (font 70) cho vành stroke mảnh xấp xỉ một nửa paragraph gốc (font 140), cùng thứ tự đỏ → xanh lá → xanh dương — scale theo tỉ lệ width, đúng R7. (Đối chiếu bằng mắt, không đo pixel.)
  ```
- **File đính kèm cho claim này:** `không có`
