### CLAIM-02

- **Statement:** Validate key gọi thử đúng model đang chọn (2.1 khi chọn 2.1); key sai hoặc không có quyền với model thì báo "Key is not working. Please check & try again.", không hiện lỗi gốc của provider, không crash.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: trang Extras > 3rd-party Services > Gen AI Effects của account (chọn model, Validate key, toggle auto-switch); Không thuộc: cấu hình effect trên layer (artwork/layer-config-image), generate trên storefront (sdk/genai-personalization-runtime).
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q6 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-38 = TC-TIB-7939, TC-13 = TC-TIB-7914 PASS 2026-10-30. Key không có quyền 2.1 (TC-26) chưa chạy, chỉ test key rác và key hợp lệ. (CCR cũ: CBS-023 CLAIM-09)
- **Trích nguyên văn:**
  ```
  - Q6: Yes, Validate runs a test call on the selected model, so on 2.1 when 2.1 is selected. A key
  without access shows not valid with the generic "Key is not working. Please check & try again." The
  provider's own error text is not shown. No crash.
  Bổ trợ — TC-38 (TC-TIB-7939) ✅ 2026-10-30: key rác → `POST /api/user/openai-key/validate` body `{provider_key:"gemini", model:"nano_banana_21"}` → 400 `{"valid":false,"message":"Key is not working. Please check & try again."}`. TC-13 (TC-TIB-7914) ✅: key hợp lệ → "API key and model are valid!". Key không có quyền 2.1 (TC-26): chưa chạy.
  ```
