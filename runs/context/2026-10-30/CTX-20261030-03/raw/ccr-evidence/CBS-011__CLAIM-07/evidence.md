# CBS-011__CLAIM-07

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-07` | TIB-5558 — storefront: layer Hide và option của nó ẩn khi điều kiện khớp, hiện khi không khớp; OR ẩn khi một điều kiện khớp, AND ẩn chỉ khi mọi điều kiện khớp; đổi giá trị nguồn cập nhật ngay không reload; cùng điều kiện thì Show và Hide cho kết quả ngược nhau | storefront (form + live preview, SDK app-v2.js) · api (POST /api/merchant/shopify/customization) | `test_case` — PASS TC-TIB-7323, TC-TIB-7324, TC-TIB-7325, TC-TIB-7326, TC-TIB-7327, TC-TIB-7328, TC-TIB-7329, TC-TIB-7330 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js Last-Modified 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13) và sau fix BUG-429; build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing; artwork / conditional-setting-config (profile unknown_areas "Hành vi runtime storefront … 0 evidence storefront") | `ADD` |

## Phần 1b

| `CLAIM-07` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |

## Phần 5.1

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7323 .. TC-TIB-7330 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-1 · https://nprice1.myshopify.com/products/tib-5558-cp-hide-or · https://nprice1.myshopify.com/products/tib-5558-cp-hide-and · https://nprice1.myshopify.com/products/tib-5558-cp-show-1`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7323: "Layer "QUOTE DOG" và ô nhập của nó ẩn ngay khi chọn Pet 1 Type = Cat (khớp điều kiện
  Hide) trên CP-HIDE-1. BUG-429 không còn tái hiện trên SDK bản 03:01 GMT 2026-10-28."
  TC-TIB-7324: "Pet 1 Type = Dog (không khớp) → field "QUOTE DOG" hiện, nhập "GOOD DOG" thì preview
  artwork hiển thị đúng chuỗi "GOOD DOG" (SDK 03:01 GMT 28/10)."
  TC-TIB-7325: "Chuỗi Cat → Dog → Cat không reload: Cat → field và layer ẩn; Dog → hiện; Cat → ẩn lại,
  cập nhật ngay trong cùng trang, URL không đổi."
  TC-TIB-7326: "CP-HIDE-OR: Pet 1 = Cat / Pet 2 = Dog → layer "QUOTE DOG" (layer-620005) và field đều
  ẩn; đổi sang Pet 1 = Dog / Pet 2 = Cat → vẫn ẩn. Một điều kiện khớp là đủ để ẩn."
  TC-TIB-7328: "CP-HIDE-AND: Pet 1 = Cat và Pet 2 = Cat (2/2 khớp) → layer "QUOTE DOG" (layer-620009)
  và field đều ẩn."
  TC-TIB-7329: "CP-HIDE-AND: chỉ 1/2 điều kiện khớp (Cat/Dog và Dog/Cat) → layer và field vẫn hiện ở
  cả 2 tổ hợp"
  TC-TIB-7330: "Hide và Show cho kết quả ngược nhau ở cả 2 giá trị nguồn. Bảng "QUOTE DOG"
  (form/preview): CP-HIDE-1: Cat → ẩn/ẩn, Dog → hiện/hiện. CP-SHOW-1: Cat → hiện/hiện, Dog → ẩn/ẩn."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của TC-TIB-7324..7330 trên Testlane`

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
TC-TIB-7325 — actualResult: Chuỗi Cat → Dog → Cat không reload: Cat → field và layer ẩn; Dog → hiện; Cat → ẩn lại, cập nhật ngay trong cùng trang, URL không đổi. Console chỉ có lỗi sẵn của theme (404 /products/15271340703985.js, "Invalid or unexpected token"), không có lỗi JS mới. Không có thao tác lưu nên không phát sinh request customization. Link: CP-HIDE-1 #3252.
TC-TIB-7326 — actualResult: CP-HIDE-OR: Pet 1 = Cat / Pet 2 = Dog → layer "QUOTE DOG" (layer-620005) và field đều ẩn; đổi sang Pet 1 = Dog / Pet 2 = Cat → vẫn ẩn. Một điều kiện khớp là đủ để ẩn. Đối chứng Dog/Dog (0/2 khớp) → hiện. Dữ liệu payload khi ATC ở trạng thái hiện (7327) khớp, xem case đó. Link: CP-HIDE-OR.
TC-TIB-7327 — actualResult: CP-HIDE-OR: Pet 1 = Dog, Pet 2 = Dog (không điều kiện nào khớp) → field "QUOTE DOG" hiện, nhập "TWO DOGS" thì preview hiển thị đúng "TWO DOGS".
API: POST /api/merchant/shopify/customization payload {"5887":"template-620006","layer-620003":46702,"layer-620004":46702,"layer-620005":"TWO DOGS","artwork-5887":17473,...} — đúng giá trị đã nhập (không ghi nhận mã trạng thái trong lượt này, Add to cart thành công).
Link: CP-HIDE-OR.
TC-TIB-7328 — actualResult: CP-HIDE-AND: Pet 1 = Cat và Pet 2 = Cat (2/2 khớp) → layer "QUOTE DOG" (layer-620009) và field đều ẩn. Link: CP-HIDE-AND.
TC-TIB-7329 — actualResult: CP-HIDE-AND: chỉ 1/2 điều kiện khớp (Cat/Dog và Dog/Cat) → layer và field vẫn hiện ở cả 2 tổ hợp, nhập được "ANDTEST". API: POST /api/merchant/shopify/customization payload {"5888":"template-620010","layer-620007":46702,"layer-620008":46703,"layer-620009":"ANDTEST","artwork-5888":17474,...} — layer vẫn được gửi, đúng giá trị. Link: CP-HIDE-AND.
TC-TIB-7330 — actualResult: Hide và Show cho kết quả ngược nhau ở cả 2 giá trị nguồn. Bảng "QUOTE DOG" (form/preview): CP-HIDE-1: Cat → ẩn/ẩn, Dog → hiện/hiện. CP-SHOW-1: Cat → hiện/hiện, Dog → ẩn/ẩn. Tốc độ cập nhật, thứ tự và nhãn field giống nhau. Links: CP-HIDE-1, CP-SHOW-1.
