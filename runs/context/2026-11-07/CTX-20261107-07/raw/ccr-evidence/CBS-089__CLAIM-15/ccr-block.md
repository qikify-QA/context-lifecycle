### CLAIM-15

- **Statement:** Sau khi bị đổi model, seller nhận đúng 1 email nêu model cũ và model mới, nhắc kiểm lại artwork và prompt; chỉ gửi cho account có API key của provider đó.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-14, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 1, mục "Email") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-14 | TC-08, 10, 11, 40 chưa chạy; câu hỏi nội dung email Q3 dev chưa trả lời (CCR cũ: CBS-028 CLAIM-15)
- **Trích nguyên văn:**
  ```
  - **Email:** sent after the switch, only to accounts that have an API key for that provider. It names the previous and the new model and asks the seller to re-check artwork and prompts. One email per switch.
  ```
