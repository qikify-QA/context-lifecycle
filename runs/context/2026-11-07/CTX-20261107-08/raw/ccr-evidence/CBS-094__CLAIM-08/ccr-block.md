### CLAIM-08

- **Statement:** Gemini với resolution đã chọn: chỉ gửi tỉ lệ Gemini gần nhất + size, Gemini tự chọn pixel; vuông 512 / 1024 / 2048 / 4096; không vuông → tổng diện tích ≈ 0.25 / 1 / 4 / 16 MP (không phải cạnh dài)
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q9. Bổ trợ TC-23, 24, 28 PASS 2026-10-27. Non-square chỉ kiểm 3:2 ở 1K, 2K trên Pro; 0.5K, 4K non-square chưa kiểm (CCR cũ: CBS-024 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Gemini with a picked resolution: what output W×H should QA expect for 0.5K / 1K / 2K / 4K on a square and on a non-square (e.g. 3:2) layer?"
  - **Q9:** We send only the nearest Gemini aspect ratio and the size, and Gemini picks the pixels. Square: 512 / 1024 / 2048 / 4096. On non-square layers the longest side is larger. Please check the nearest ratio and a total of ≈ 0.25 / 1 / 4 / 16 MP, not the longest side.
  ```

