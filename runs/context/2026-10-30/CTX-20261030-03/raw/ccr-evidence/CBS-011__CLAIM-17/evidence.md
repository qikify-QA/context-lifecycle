# CBS-011__CLAIM-17

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-17` | TIB-5558 — regression: layer không có điều kiện luôn hiện, layer Show giữ đúng chiều cũ trên storefront và trong print | storefront · api · db/render | `KHÔNG CÓ NGUỒN` — TC-TIB-7344 PASS ở lượt đầu, chạy trên SDK cũ trước bản 03:01:11 GMT; chưa chạy lại trên SDK mới (BUG-436 cho thấy SDK mới đổi hành vi Show trên Group) | sdk / storefront-buyer-facing KB-004 (dependency 2 cấp chạy đúng) | `ADD` |

## Phần 1b

| `CLAIM-17` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | `KB-004` (sdk) |

## Phần 5.1

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7344 (lượt đầu, SDK cũ)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-show-1`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7344 (lượt đầu, trước SDK 03:01:11 GMT): "Hành vi cũ không bị ảnh hưởng: layer không điều kiện
  luôn hiện, layer Show vẫn đúng chiều. Storefront CP-SHOW-1 (tib-5558-cp-show-1): layer "NO
  CONDITION" (layer-620013) hiện trên form và preview ở mọi giá trị nguồn … Layer "QUOTE DOG"
  (layer-620012, action Show, điều kiện "Pet 1 Type is Cat"): Cat → hiện trên cả form lẫn preview;
  Dog → ẩn khỏi cả hai."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7344 — actualResult: Hành vi cũ không bị ảnh hưởng: layer không điều kiện luôn hiện, layer Show vẫn đúng chiều.
Storefront CP-SHOW-1 (tib-5558-cp-show-1): layer "NO CONDITION" (layer-620013) hiện trên form và preview ở mọi giá trị nguồn — khi chưa chọn gì, khi Pet 1 Type = Cat và khi = Dog.
Layer "QUOTE DOG" (layer-620012, action Show, điều kiện "Pet 1 Type is Cat"): Cat → hiện trên cả form lẫn preview; Dog → ẩn khỏi cả hai. Đúng hành vi trước khi có Hide, không bị đảo.
Nhập NO CONDITION = "ALWAYS", QUOTE DOG = "GOOD DOG" → preview artwork render đúng 2 chuỗi này.
Network → POST /api/merchant/shopify/customization?shop=nprice1.myshopify.com&id=15271344963825 → 201; payload: "layer-620011":46703, "layer-620012":"GOOD DOG", "layer-620013":"ALWAYS" — đúng giá trị đã nhập, chỉ chứa layer đang hiện.
Sau Add to cart → localStorage teeinblue-customizations, entry productId 15271344963825: {"5889":"template-620014","layer-620011":46703,"layer-620012":"GOOD DOG","layer-620013":"ALWAYS"} — khớp hoàn toàn.
Không đính kèm screenshot: lượt chạy này không có tool Artifact để upload ảnh.
