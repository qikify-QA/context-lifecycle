### CLAIM-18

- **Statement:** Toggle "Auto-switch to a backup model during temporary outages" ở trang Gen AI Effects, mô tả đúng nguyên văn spec; mặc định OFF (account chưa lưu bao giờ không có key `genai_auto_fallback`); trạng thái ON / OFF giữ sau Save + reload và không đổi model đã lưu.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-01 trong `result_QA-3408_TC01-TC44_user[id]_2026-10-16.md`; TC-02 trong `result_QA-3408_B1-B2_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. | Banner cảnh báo khi bật toggle và vị trí toggle: không đề xuất gì (Phần 4.2). Giá trị mô tả theo REQ-09 của QA-3408 (CCR cũ: CBS-028 CLAIM-19)
- **Căn cứ expected:** Spec PO trong description TIB-5554 (toggle opt-in, mặc định OFF, không bao giờ đổi model đã lưu); TC-01 ghi "DOM text matches REQ-09 word for word". Trích spec nguyên văn không có trong CCR cũ.
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — on an account that never saved it, the toggle is OFF; label "Auto-switch to a backup model during temporary outages"; description exactly "When your selected AI model is temporarily unreachable, keep generating with the nearest available model, then switch back to your model automatically once it recovers. Your saved model selection is never changed." | GET /api/user (account [id]): `private_config` has no `genai_auto_fallback` key; toggle checkbox `checked=false`; DOM text matches REQ-09 word for word
  TC-02 | ✅ AI — toggle persists after Save + reload, models untouched | ON → OFF → Save: request `genai_auto_fallback:false` → 200; reload: unchecked. OFF → ON → Save → 200 `genai_auto_fallback:true`; reload + `GET /api/user`: `genai_auto_fallback=true`, `gpt_model=gpt-image-1`, `gemini_model=nano_banana`, `gpt_quality=medium`, `flux_kontext_model=flux_pro`
  ```
