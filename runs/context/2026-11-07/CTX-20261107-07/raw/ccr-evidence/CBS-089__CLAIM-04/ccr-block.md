### CLAIM-04

- **Statement:** Giá trị lưu của Gemini cũ là `nano_banana` (`gemini-2.5-flash-image` chỉ là tên phía provider), không có entry retirement riêng; account ở `nano_banana` được chuyển sang `nano_banana_31`.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image) (liên quan: global-option)
- **Quan hệ với canon:** `CONTRADICTS KB-031 (object global-option)`
- **Scope:** store owner (model Gemini của account) + guest buyer (job generate); api · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q9 ("Do any accounts still store the older id `gemini_model=gemini-2.5-flash-image`? Does it need its own retirement entry?") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | KB-031 thuộc object global-option (feature artwork-personalization-global-option-link), quan sát trước khi ticket ship. Checklist CHK-02-011 (READY, oracle BASELINE) cùng file feature đó expect model='nano_banana', chạy sai từ 2026-10-29. Giữ cả hai phía. Bổ trợ: TC-14 ✅ 2026-10-16 thấy gemini_model=nano_banana_31 sau migration (CCR cũ: CBS-028 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA: "Do any accounts still store the older id `gemini_model=gemini-2.5-flash-image`? Does it need its own retirement entry?"
  
  Q9: No separate entry is needed. The stored value is `nano_banana`; `gemini-2.5-flash-image` is only the provider-side model name. As in Q8, accounts on `nano_banana` are moved to `nano_banana_31`.
  ```
