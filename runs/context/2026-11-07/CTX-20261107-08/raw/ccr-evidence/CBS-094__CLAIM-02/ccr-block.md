### CLAIM-02

- **Statement:** Output size của Nano Banana 2.1 bằng Nano Banana 2 ở cùng resolution và tỉ lệ layer.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q3 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-15 = TC-TIB-7916, TC-16 = TC-TIB-7917 PASS. Kích thước pixel đo được chỉ là quan sát một lần trên staging 2026-10-30, không phải oracle; chỉ đo 1:1 ở 1K, 2K, 4K và 3:2 ở 2K. (CCR cũ: CBS-023 CLAIM-06)
- **Trích nguyên văn:**
  ```
  - Q3: Output size is the same as Nano Banana 2 today at the same resolution and layer ratio.
  Bổ trợ (quan sát, không phải oracle) — TC-15 (TC-TIB-7916) ✅: 1:1, 1K → 1024×1024, 4K → 4096×4096. TC-16 (TC-TIB-7917) ✅: "3:2 at 2K: 2.1 = NB2 = 2528×1696" (upload [đã bỏ id] NB2, [đã bỏ id] 2.1).
  ```

