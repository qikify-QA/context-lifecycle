# CBS-013__CLAIM-08

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-08` | Storefront campaign (có / không GO): form như cũ, reload từ cache không khác, preview cập nhật, 2 layer dùng chung GO, lựa chọn GO nhớ qua campaign khác | storefront | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7390/7392/7393/7398/7399/7400 2026-10-28 ~06:00 UTC [AI] nhưng chạy trước redeploy (fix bug trước retest + commit 8731f3a, dev yêu cầu recheck bước 1–3), chưa chạy lại | sdk/storefront-buyer-facing; checklist sdk/checklists/storefront-buyer-facing.json | ADD |

## Phần 1b

| `CLAIM-08` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |

## Phần 5.1

### CLAIM-08

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7390, 7392, 7393, 7398, 7399, 7400`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7390: "Form CP-CACHE (AW-GO) hiển thị đủ: Name (text, mockup hiện default "NAME"), Dog (clipart 4 item), Color A1
  (dropdown Red/Blue/Green, default Red); mockup hiển thị."
  TC-TIB-7393: "Reload 4 lần CP-CACHE và PP-CACHE: chữ ký form (4 clipart, dropdown Red/Blue/Green, 5 input layer) giống hệt lần đầu."
  TC-TIB-7398: "Chọn Color A1 = "Green": form hiển thị "Green" … body global-option-1125="green" (cả 2 layer Color A1/A2 cùng
  dùng GO 1125 nên chỉ 1 giá trị)."
  TC-TIB-7399: "Chọn GO-A trên CP-CACHE rồi mở CP-CACHE2 cùng trình duyệt: GO-A tự điền đúng giá trị đã chọn"
  TC-TIB-7400: "CP-NOGO: form chỉ có 1 input Text (layer-520331), không có dropdown GO; nhập "NOGO", preview hiện, reload vẫn giữ "NOGO"."
  Comment 55763 (Updated 2026-10-28): "Please redeploy the branch to staging and recheck **steps 1–4, 5 and 12**"
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7390 (passed), TC-TIB-7392 (passed), TC-TIB-7393 (passed), TC-TIB-7398 (passed), TC-TIB-7399 (passed), TC-TIB-7400 (passed)
