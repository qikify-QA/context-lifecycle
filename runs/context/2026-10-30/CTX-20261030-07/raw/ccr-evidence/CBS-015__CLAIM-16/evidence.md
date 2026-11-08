# CBS-015__CLAIM-16 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S1

**Đánh giá:** S1: CCR khai KHÔNG CÓ NGUỒN; TC-TIB-7632 expectedResult 'preview vẫn render group bằng SVG <g> như trước, group hiển thị đúng' — actualResult chỉ đếm DOM toàn trang (không biết phần tử thuộc popup hay mockup chính), popup hiện mockup áo không thấy rõ từng ảnh, không so với trước fix → không S3. Có artifact → OBSERVED_CURRENT/LOW + OQ NEEDS_CONFIRMATION. sdk KB-011 đang UNRESOLVED (conflict group) và KB-042 mô tả popup Preview dạng <img> — item mới chỉ related, KHÔNG vào conflict group và không phát biểu cơ chế của popup Preview (không đứng phe).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-16` | TIB-5633 — SDK storefront preview của group ~250 layer không đổi (vẽ group bằng SVG g), ngoài phạm vi fix | storefront (popup Preview) | `KHÔNG CÓ NGUỒN` — TC-TIB-7632 PASS nhưng chỉ đếm DOM toàn trang (250 svg image, 756 thẻ g), popup chỉ hiện mockup, không so với trước fix | sdk / storefront-buyer-facing (KB-011, KB-042 nói khác nhau về cơ chế preview) | `UNKNOWN` |
| `CLAIM-16` | sdk | storefront-buyer-facing | guest buyer | storefront | không có (liên quan KB-011, KB-042, không thay) |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7632 · comment dev "Solution" (Render parity, Open questions)
- **Link:** https://nprice1.myshopify.com/products/qa-tib-5633-camp-group250
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent); tinhpt (dev) viết comment 2026-10-28
- **Trích nguyên văn:**
  ```
  TC-TIB-7632: "Storefront nprice1 sản phẩm group250: bấm Preview, popup preview mở trong vài giây, không lỗi UI; DOM có 34 svg, 250 phần tử svg image và 756 thẻ g (group render bằng SVG g). Lưu ý popup preview hiển thị mockup áo, không thấy rõ từng ảnh nhỏ bằng mắt thường."
  Comment dev (2026-10-28): "the sdk preview draws a group as an SVG `<g>`, which has no growing raster canvas and so no matching cost. No portal change." / "The sdk storefront preview of a 250-member group is out of scope (nobody reported it, and SVG has no growing canvas). Confirm."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7632 trên Testlane
