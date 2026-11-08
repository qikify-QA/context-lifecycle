### CLAIM-01

- **Statement:** Trang Gen AI Effects, phần Gemini, có model "Nano Banana 2.1", lưu vào private_config.gemini_model với id nano_banana_21, và description liệt kê provider model gemini-nano-banana-2.1.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: trang Extras > 3rd-party Services > Gen AI Effects của account (chọn model, Validate key, toggle auto-switch); Không thuộc: cấu hình effect trên layer (artwork/layer-config-image), generate trên storefront (sdk/genai-personalization-runtime).
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, chạy bằng agent, kết quả [AI]), 2026-10-30
- **Locator:** QA-3442 TC-01 = Testlane TC-TIB-7902 (task TIB-277) PASS 2026-10-30, file results/result_QA-3442_independent_2026-10-30.md, portal index.BMgdZMSW.js (Last-Modified 2026-10-29 14:32:50 GMT). (CCR cũ: CBS-023 CLAIM-01)
- **Căn cứ expected:** Jira TIB-5573, comment dev chinhdt 2026-10-26 (mô tả "Behaviour changes" dev tự viết): option mới "Nano Banana 2.1", description liệt kê gemini-nano-banana-2.1. Id lưu nano_banana_21 chỉ là quan sát.
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — "Nano Banana 2.1" listed, enabled, saved, kept after reload; id `nano_banana_21` |
  Radio `#gemini_model-nano_banana_21`, label "Nano Banana 2.1", enabled. Description "Current models:
  gemini-3-pro-image, gemini-3.1-flash-image, gemini-nano-banana-2.1". Nano Banana Pro and Nano Banana 2
  still listed. Save → `PUT /api/user/private-config` 200 `gemini_model:"nano_banana_21"`, toast
  "Settings saved". After reload the 2.1 radio is checked and `GET /api/user` returns
  `private_config.gemini_model = nano_banana_21`
  Bổ trợ (không tính vào loại nguồn) — dev chinhdt, Jira TIB-5573, 2026-10-26: "**Settings → Gen AI → Gemini:** the model dropdown has a new option "Nano Banana 2.1", and the description lists `gemini-nano-banana-2.1`."
  ```
