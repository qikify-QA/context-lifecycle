### CLAIM-11

- **Statement:** Khi account dùng Nano Banana 2.1, layer Text to Image và Multiple Uploads dùng Gemini có Resolution 1K, 2K, 4K, không có 0.5K (giống Pro), và để trống (unset) thì dùng default size của Google.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff; portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q2 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-12 = TC-TIB-7913, TC-21 = TC-TIB-7922 PASS 2026-10-30 trên portal index.CReWKeT2.js (Last-Modified 2026-10-30 07:06:14 GMT). Liên quan, không thay: KB-018, KB-019. (CCR cũ: CBS-023 CLAIM-03)
- **Trích nguyên văn:**
  ```
  - Q2: Fixed. TIB-5561 reached dev before this ticket, so T2I / MU only showed the Resolution field for
  Nano Banana Pro and Nano Banana 2. 2.1 now gets it too, with 1K / 2K / 4K (no 0.5K, same as Pro).
  Unset = Google's default size. The PRs are updated, so please retest once the change is on staging.
  Bổ trợ — TC-12 (TC-TIB-7913) ✅ 2026-10-30, portal `index.CReWKeT2.js`: "Q2 fix on staging: T2I and MU on 2.1 show Resolution `Default / 1K / 2K / 4K` (no 0.5K)". TC-21 (TC-TIB-7922) ✅: "unset → no `gemini_resolution` sent, Google default 1264×848". `Default` là placeholder chọn được (= unset), không phải 0.5K.
  ```
