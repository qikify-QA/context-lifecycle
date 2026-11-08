### CLAIM-07

- **Statement:** GPT với resolution đã chọn: ảnh theo tỉ lệ layer, mỗi cạnh làm tròn XUỐNG bội số 16, cạnh dài ≈ 1024 / 2048; 4K bị giới hạn ~8.29 MP của OpenAI (vuông 2880×2880, 3:2 ≈ 3520×2336, 3840 chỉ khi tỉ lệ ≥ 16:9); tỉ lệ > 3:1 bị kẹp về 3:1
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q3. Bổ trợ TC-21, 22, 27 PASS 2026-10-27. TC-21 thấy 1K 3:2 lệch tỉ lệ 1.6%, vượt ±1% dev "ok": quy tắc làm tròn và dung sai không cùng đúng, giữ cả hai. ±16 px, ±1% là mức test, không phải spec, không assert cho mọi tỉ lệ. Số đo QA không phải giá trị chuẩn trừ khi trùng số dev nêu (CCR cũ: CBS-024 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "GPT with a picked resolution: what tolerance on the longest side (1024 / 2048 / 3840 per the API schema) should QA accept?"
  - **Q3:** ok Q3 (±16 px, ratio ±1%). Each side is rounded **down** to a multiple of 16, so the output is never larger than the target. 4K is capped by OpenAI's ~8.29 MP area limit: square → 2880×2880, 3:2 → ~3520×2336. 3840 is reached only at ratios ≥ 16:9. Ratios above 3:1 are clamped to 3:1.
  ```

