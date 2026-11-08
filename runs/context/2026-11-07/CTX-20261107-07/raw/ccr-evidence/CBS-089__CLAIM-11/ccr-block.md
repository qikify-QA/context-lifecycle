### CLAIM-11

- **Statement:** Từ ngày migrate, request lưu (tab cũ) còn gửi model retired trong khi account đã ở model sống: HTTP 200, toast "Settings saved", các cài đặt khác được lưu, model đã lưu giữ nguyên.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-20 trong `result_QA-3408_B3-B4-after-migrate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. | Tab cũ được mô phỏng bằng cách sửa request (CCR cũ: CBS-028 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-20 | ✅ AI — stale request with the retired model while on a live model: other settings saved, model kept | Save request edited to `gpt_model=gpt-image-1`, `gpt_quality=high` → HTTP 200, toast "Settings saved"; `GET /api/user`: `gpt_model=gpt-image-1.5`, `gpt_quality=high`. Restored `gpt_quality=medium` afterwards (200) | Simulated stale tab by editing the request
  ```
