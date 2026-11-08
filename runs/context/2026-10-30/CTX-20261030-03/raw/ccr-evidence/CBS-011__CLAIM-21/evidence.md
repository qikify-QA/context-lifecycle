# CBS-011__CLAIM-21

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-21` | TIB-5558 — storefront còn chạy SDK cũ (kể cả bản cũ trong cache trình duyệt) render layer Hide như Show, tức đảo chiều; response SDK có Cache-Control max-age=14400 | storefront (SDK app-v2.js) | `KHÔNG CÓ NGUỒN` — capture tự chụp lượt 2026-10-28 + đáp án dev Slack chỉ có dạng diễn giải trong RA (C8, R9); cửa sổ cache chưa chốt (Q8) | sdk / storefront-buyer-facing | `ADD` |

## Phần 1b

| `CLAIM-21` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |

## Phần 5.1

### CLAIM-21

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `actualResult TC-TIB-7323 (header SDK); RA C8, R9, Q8`
- **Link:** `https://staging-sdk.teeinblue.com/shopify/app-v2.js`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI] (capture); RA diễn giải đáp án dev Slack 2026-10-28`
- **Trích nguyên văn:**
  ```
  TC-TIB-7323: "request thật của trang https://staging-sdk.teeinblue.com/shopify/app-v2.js?token=…&
  shop=nprice1.myshopify.com → 200, Last-Modified Wed, 28 Oct 2026 03:01:11 GMT, ETag
  W/"85d63a84fa4e7e4dbbeee8c688efab70", Cache-Control max-age=14400; … (Lần load đầu trước khi xoá
  cache vẫn nhận bản cũ: Last-Modified 14 Oct 2026, ETag W/"6acee813-1a87c5" — đã xác nhận bị cache.)"
  RA analysis_TIB-5558.md, R9: "Trong thời gian storefront còn chạy SDK cũ (cache), layer Hide được
  render theo logic Show → hiển thị đảo ngược; khắc phục bằng clear cache. (C8 — Q3, Slack 2026-10-28)"
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7323 — actualResult: Layer "QUOTE DOG" và ô nhập của nó ẩn ngay khi chọn Pet 1 Type = Cat (khớp điều kiện Hide) trên CP-HIDE-1. BUG-429 không còn tái hiện trên SDK bản 03:01 GMT 2026-10-28.
Bằng chứng SDK: sau khi xoá cache (fetch cache:'reload' tới app-v2.js rồi reload trang), request thật của trang https://staging-sdk.teeinblue.com/shopify/app-v2.js?token=…&shop=nprice1.myshopify.com → 200, Last-Modified Wed, 28 Oct 2026 03:01:11 GMT, ETag W/"85d63a84fa4e7e4dbbeee8c688efab70", Cache-Control max-age=14400; body 1.413.552 ký tự chứa wc=(e,t)=>e.action===rd.hide?!t:t. (Lần load đầu trước khi xoá cache vẫn nhận bản cũ: Last-Modified 14 Oct 2026, ETag W/"6acee813-1a87c5" — đã xác nhận bị cache.)
Actual: Cat → field #tee-field--layer-600001 và node #artwork-layer--layer-600001 đều không còn (form chỉ còn Pet 1 Type). Expected: ẩn. Khớp.
API: POST staging-api.teeinblue.com/api/merchant/shopify/customization?shop=nprice1.myshopify.com&id=15271340703985 → 201, payload {"5868":"template-600002","layer-600000":46703,"artwork-5868":17461,"platform_linked_id":"67355131248881"} — chỉ có Pet 1 Type = Cat, không có dữ liệu layer đang ẩn. Khớp.
Instance: https://staging-admin.teeinblue.com/admin/instances/520Campaign: CP-HIDE-1 #3252 (tib-5558-cp-hide-1); Artwork #5868 "TIB-5558 AW-HIDE-1"
TC-TIB-7324 — actualResult: Pet 1 Type = Dog (không khớp) → field "QUOTE DOG" hiện, nhập "GOOD DOG" thì preview artwork hiển thị đúng chuỗi "GOOD DOG" (SDK 03:01 GMT 28/10).
API: POST /api/merchant/shopify/customization → 201, payload {"5868":"template-600002","layer-600000":46702,"layer-600001":"GOOD DOG","artwork-5868":17461,...} — đúng giá trị đã nhập.
Sau Add to cart, localStorage teeinblue-customizations entry 15271340703985 = {"5868":"template-600002","layer-600000":46702,"layer-600001":"GOOD DOG","platform_linked_id":"67355131248881"}.
Lỗi cũ của case (chiều ẩn/hiện bị đảo, thuộc BUG-429) không còn tái hiện. Link: CP-HIDE-1 #3252, Artwork #5868. Instance: 520.
