### CLAIM-04

- **Statement:** Endpoint effect storefront customer-uploads/{id}/image-filter-effects/async dùng effect config do browser gửi (vd gemini_resolution) thay vì giá trị đã lưu trên layer; dev xác nhận đang tin request từ client vì không kiểm được request thuộc layer nào, và đề nghị bỏ qua lỗi kiểu này nếu không gây chết hệ thống.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Slack, tin chinhdt 2026-10-30 15:15 trả lời QA về bug TC-33 (không có permalink, chép từ ảnh chụp QA lưu; Phần 1 của CCR cũ ghi "không có nguyên văn trong repo" nhưng 5.1 có); QA ghi ở bugs/BUG-01.md và results/result_QA-3442_TC33-dev-accepted_2026-10-30.md; quan sát TC-33 = TC-TIB-7934. Cùng loại QA-3441 BUG-03. Không phải chính sách bảo mật đã duyệt cho mọi endpoint, cũng không có nghĩa không bao giờ là bug. CCR cũ ghi "theo dev cả derive" nhưng nguyên văn Slack không nêu derive; chưa thử derive trong run này, chỉ forge 2K trên layer 1K. Liên quan: KB-045, cùng dạng artwork KB-144. (CCR cũ: CBS-023 CLAIM-12)
- **Trích nguyên văn:**
  ```
  (Nguyên văn Slack, chinhdt, 2026-10-30 15:15:)
  Đúng rồi đấy ạ. Mình đang kiểu tin tưởng request từ client ạ. Vì mình cũng không thể check lại là request đến từ client thuộc layer nào trong artwork nào luôn ạ.
  Chắc bỏ qua lỗi kiểu này nếu nó không gây chết hệ thống thôi ạ.
  
  (Quan sát QA, run 2026-10-30, portal index.BMgdZMSW.js:)
  P-3x2 is saved and synced at `1K`. Request rewritten in the browser to `gemini_resolution:"2K"`
  (+ `model`/`gemini_model:"nano_banana_pro"`) → upload [đã bỏ id]: status `gemini_resolution "2K"`,
  `model nano_banana_21`, master **2528×1696** (2K). Expected 1K ≈ 1264×848. Repro 2: PH-1, upload
  [đã bỏ id], also 2528×1696
  ```

