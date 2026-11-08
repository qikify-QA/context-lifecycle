### CLAIM-13

- **Statement:** Từ ngày migrate, chọn model retired (ngoài hai trường hợp giữ nguyên / tab cũ) bị từ chối 422 + toast "GPT Image 1 has been retired. Select GPT Image 1.5 or another model.", không lưu gì của request đó. QA chưa tái hiện được: lưu giá trị không sống + gửi model retired → 200, model giữ nguyên.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-14, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 1, mục "Saving 3rd-party Services > Gen AI Effects settings from the migrate date") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-14 | KHÔNG đề xuất check nào assert 422 cho tới khi có người tìm ra trạng thái gây 422 (Phần 4.2). QA chạy staging 2026-10-16 thấy ngược lại (TC-18, TC-21 ⏸️ ra 200), quan sát đó cũng KHÔNG phải expected. Dev cũng nhắc 422 ở Q8 comment 54687 (CCR cũ: CBS-028 CLAIM-12)
- **Trích nguyên văn:**
  ```
  - Choosing a retired model otherwise fails with 422 and the toast *"GPT Image 1 has been retired. Select GPT Image 1.5 or another model."* Nothing in that save is stored.
  Phía test (QA, 2026-10-16, ⏸️ — trái với mô tả trên, giữ cả hai phía):
  TC-18 | ⏸️ AI — 422 not reached: stored `qa3408-nonlive` (not live) + save `gpt_model=gpt-image-1`, `gpt_quality=high` → HTTP 200, no toast, model kept `qa3408-nonlive`, quality saved `high`
  TC-21 | ⏸️ AI — Gemini, same as TC-18: stored `qa3408-nonlive` + save `gemini_model=nano_banana` → 200, model kept, no toast
  ```
