### CLAIM-27

- **Statement:** Layer Dynamic Clipart by Text so khớp text buyer gõ với tên option clipart (origin_name/name) và group_name sau khi chuẩn hoá cả hai phía về Unicode NFC, nên tên lưu NFD khớp text gõ NFC và ngược lại, tên có ký tự đặc biệt khớp ngay lần gõ đầu, áp cho nguồn clipart và grouped_clipart.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk, asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (đặt tên clipart, cấu hình layer); storefront (SDK)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chauptm) viết, không ai xác nhận, 2026-09-23
- **Locator:** Jira TIB-5412 comment 51755 "Context / logic changes" (mô tả kỹ thuật dev tự viết, PR teeinblue-sdk #2036; PR có thể đủ dev_doc nếu context builder đọc được). QA Hub TIB-139 TC-01/02/04/10 ở passed nhưng actualResult rỗng, không ngày chạy/build: không phải bằng chứng. Tên file/hàm là chi tiết code tại 2026-09-23, không phải oracle. Không dùng làm expected tới khi có người verify. (CCR cũ: CBS-032 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Root cause: the clipart name saved (e.g. via SVG filename upload) and the text typed by the buyer can use different Unicode Normalization Forms (e.g. NFD from a macOS filename vs NFC typed input) even though the characters render identically, so plain string equality (`===`) failed to match them.
  
  Fix (client-side only, in `teeinblue-sdk`):
  
  - `src/use/useCustomizationDataMapper.js` — `findByName` (used by `getClipartValue`/`getGroupedClipartValue` for the Dynamic Clipart by Text feature) now normalizes both the typed token and the option's `origin_name`/`name` to NFC before comparing.
  - `src/use/useClipartFrame.js` — `exactToken` now normalizes to NFC after trimming, so both the typed token and `option.name`/`group_name` compare consistently (covers both the `clipart` and `grouped_clipart` source types).
  - Added regression tests in both spec files covering an NFD-saved name against an NFC-typed value, and vice versa.
  
  - [ ] Clipart named with a special character (e.g. `Ô`, `Ê`, `ñ`, `ü`) matches on the very first typed entry, without needing to re-save the clipart name in the category — happy path for TIB-5412.
  - [ ] Clipart name saved via SVG filename upload from macOS (likely NFD) matches text typed on a standard keyboard (likely NFC).
  - [ ] Grouped clipart (`grouped_clipart` source type) also matches correctly when the group name or option name contains special characters.
  - [ ] A visually-identical but differently-normalized character typed by the buyer (e.g. pasted text vs typed text) resolves to the same clipart.
  ```
