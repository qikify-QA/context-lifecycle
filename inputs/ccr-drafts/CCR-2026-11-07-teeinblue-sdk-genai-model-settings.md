# Context Change Request: sdk-genai-model-settings — gộp từ 2 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `sdk`
- **Ticket:** `TIB-5573, TIB-5554`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-023: MEDIUM — Canon thiếu coverage cho model Gemini, Resolution và backup model; không có checklist hay automation đang publish nào chạy sai, không chặn test P0/P1.
- CBS-028: MEDIUM — QA chọn MEDIUM (phuongbb, 2026-11-01): phần lớn là gap coverage; riêng CHK-02-011 đang chạy sai vì expect model='nano_banana'.

# Khối A — Hành vi

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

### CLAIM-03

- **Statement:** Job migration đổi account đang ở model bị khai tử sang successor: GPT `gpt-image-1` → `gpt-image-1.5`, Gemini `nano_banana` → `nano_banana_31`; các cài đặt khác (API key, `gpt_quality`, Flux, `image_generation_name`, `background_remover_name`, toggle auto-switch) giữ nguyên; picker hiện successor được chọn, model cũ bị disable.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner (account bị migrate); api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 (QA Hub task TIB-207) — TC-07 (GPT), TC-14 (Gemini) trong `result_QA-3408_B3-B4-after-migrate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy, sau lượt migration dev chạy trên staging cùng ngày). Build: không ghi. | Dev chạy migration trên staging 2026-10-16; loại lượt chạy và migrate_at không chia sẻ với QA. Dev notes 54520 chỉ là ngữ cảnh, không phải nguồn (CCR cũ: CBS-028 CLAIM-01)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-07 | ✅ AI — GPT migrated to the successor; other settings unchanged | `GET /api/user`: `gpt_model` `gpt-image-1` → `gpt-image-1.5`; `gpt_quality` medium, `flux_kontext_model` flux_pro, `flux_version` v1, `image_generation_name` gpt, `background_remover_name` removal.ai, `genai_auto_fallback` true — unchanged; 10 API keys still set (same lengths). Picker: `gpt-image-1.5` checked, `gpt-image-1` disabled
  TC-14 | ✅ AI — Gemini migrated `nano_banana` → `nano_banana_31` | `gemini_model=nano_banana_31`; picker: `nano_banana_31` checked, `nano_banana` disabled | Migrated in the same run as GPT
  Ngữ cảnh (dev notes, chinhdt, comment 54520, 2026-10-14 — không phải nguồn của claim):
  - `gpt-image-1` → `gpt-image-1.5`, migrate from **2026-10-21** (shutdown 2026-10-23)
  - `nano_banana` → `nano_banana_31`, migrate from **2026-10-29** (shutdown 2026-10-31)
  - **Daily migration (00:00 UTC):** from the migrate date, an account on a retired model is switched to the successor. This includes accounts with an API key and no model selected (they were running the retired default). Other settings (API keys, quality, etc.) are unchanged.
  ```

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

### CLAIM-05

- **Statement:** "từ ngày migrate" tính từ 00:00 UTC của `migrate_at` (cùng giờ job migration chạy), áp cho quy tắc lưu, model mặc định và Validate key.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q11 ("Which timezone defines 'from the migrate date': UTC or server timezone?") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | 'ok' là dev đồng ý đề xuất UTC của QA, kèm câu khẳng định riêng của dev (CCR cũ: CBS-028 CLAIM-04)
- **Trích nguyên văn:**
  ```
  ok Q11. `migrate_at` starts at 00:00 UTC, the same time the daily migration runs.
  Câu hỏi QA (comment 54670, 2026-10-15) mà "ok" đồng ý: "Which timezone defines 'from the migrate date' for the save rule, the default model and Validate key — UTC like the 00:00 cron, or the server timezone? — QA đề xuất: UTC"
  ```

### CLAIM-06

- **Statement:** Lượt chạy `genai:migrate-retired-models --user-id` không đặt `migrated_at` nên chạy lại được; khi `migrate_at` đã tới, quy tắc lưu và model mặc định áp cho mọi account, không chỉ account trong lượt chạy.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** admin / dev (vận hành migration); api · db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q2 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 (CCR cũ: CBS-028 CLAIM-05)
- **Trích nguyên văn:**
  ```
  ok Q2. Note: a run with `--user-id` does not stamp `migrated_at`, so it can be repeated. While `migrate_at` is set to today, the save rule and the default model apply to every account on staging, not only the ones in the run.
  ```

### CLAIM-07

- **Statement:** Sau một lượt chạy đầy đủ không lỗi, entry retirement được đặt `migrated_at` và các lượt sau bỏ qua nó; lượt có account lỗi, `--dry-run` hay `--user-id` không đặt, lượt sau thử lại. Known limitation: đã có `migrated_at` thì account bị ép về model retired ngoài portal (vd sửa DB) không bị chuyển lại; account đã migrate không nhận email lần hai khi successor bị khai tử sau, trừ khi lần khai tử đó chuyển nó tiếp.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** admin / dev (vận hành migration) + store owner; api · db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-14, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 1, mục "Behaviour changes" + "Known limitation") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-14 | TC-09, 12, 13, 17 chưa chạy; QA không có quyền Admin, dev không chia sẻ migrated_at (CCR cũ: CBS-028 CLAIM-06)
- **Trích nguyên văn:**
  ```
  - **After a clean full run**, the retirement entry gets a `migrated_at` date in Admin > Settings and later runs skip it, so nobody is emailed twice. A run with failed accounts, `--dry-run` or `--user-id` does not set it, and the next run retries.
  
  **Known limitation**
  
  - After an entry has `migrated_at`, the daily run no longer looks at it. An account set back to a retired model outside the portal (e.g. directly in the DB) fails to generate and is not moved again. To re-run an edited entry, remove its `migrated_at`.
  - Migrated accounts do not get a second email when the successor itself is retired later. They get a new email only when the later retirement moves them again.
  ```

### CLAIM-08

- **Statement:** Account có API key mà không chọn model: lưu Gen AI Effects lưu luôn model mặc định hiện tại (từ ngày migrate là `gpt-image-1.5` / `nano_banana_31`), không bao giờ để trống; không gửi field model thì model đã lưu giữ nguyên.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-05 trong `result_QA-3408_B2-B4-save-validate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy; staging đã qua ngày migrate). Build: không ghi. | Chỉ phía từ ngày migrate được test; phía trước ngày migrate chỉ có dev notes 54520 (CCR cũ: CBS-028 CLAIM-07)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-05 | ✅ AI — saving without a model stores the current default: stored `qa3408-nonlive` → save `gpt_model=""` → `gpt-image-1.5`; `null` → `gpt-image-1.5`; Gemini `""` → `nano_banana_31`; field absent → stored model unchanged. Never empty | GET /api/user `private_config.gpt_model` after each save (200) | Staging is past the migrate date (dev ran the migration), so the default is the successor
  Ngữ cảnh (dev notes, comment 54520, 2026-10-14): "**Default model follows the retirements:** when an account has an API key for GPT or Gemini but no model selected, the API uses `gpt-image-1` / `nano_banana` before the migrate date and the successor (`gpt-image-1.5` / `nano_banana_31`) from the migrate date. Nothing changes at deploy." — phía "trước ngày migrate" chưa được test.
  ```

### CLAIM-09

- **Statement:** Validate key với model retired trả not-valid, `code: model_retired` kèm thông báo retired (không phải lỗi key sai); không chọn model thì key được validate với model mặc định hiện tại.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-06, TC-22 trong `result_QA-3408_B2-B4-save-validate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. | Model retired được gửi trong request validate, không đặt được model retired đã lưu qua save trên staging (CCR cũ: CBS-028 CLAIM-08)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-06 | ✅ AI — Validate key with no model is valid against the current default: request without `model` → `{"valid":true,"message":"API key and model are valid!"}`; `model:""` → same | POST /api/user/openai-key/validate 200
  TC-22 | ✅ AI — Validate key with a retired model returns not-valid with the retired message, not a bad-key error: GPT `model=gpt-image-1` → `{"valid":false,"code":"model_retired","message":"GPT Image 1 has been retired. Select GPT Image 1.5 or another model."}`; Gemini `model=nano_banana` → `code:model_retired`, "Nano Banana (Gemini 2.5 Flash) has been retired. Select Nano Banana 2 (Gemini 3.1 Flash) or another model." | POST /api/user/openai-key/validate 200 | Retired model sent in the validate request (a stored retired model cannot be set through save on staging)
  ```

### CLAIM-10

- **Statement:** Câu báo model Gemini retired: "Nano Banana (Gemini 2.5 Flash) has been retired. Select Nano Banana 2 (Gemini 3.1 Flash) or another model."; tên model phía API khớp nhãn portal (không có hậu tố "Image") và dùng y như vậy trong email migration.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q4 ("Exact 422 toast for a retired Gemini model?") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Bổ trợ: TC-22 ✅ 2026-10-16 thấy cùng câu trong response Validate key. Câu trong toast 422 và trong email chưa thấy trực tiếp (CCR cũ: CBS-028 CLAIM-09)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA: "Exact 422 toast for a retired Gemini model?"
  
  Q4: *"Nano Banana (Gemini 2.5 Flash) has been retired. Select Nano Banana 2 (Gemini 3.1 Flash) or another model."* The API model names are aligned with the portal labels (no "Image" suffix); the same names appear in the migration email.
  ```

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

### CLAIM-12

- **Statement:** Trước ngày migrate vẫn chọn và lưu được model retired (200); lưu mà giữ nguyên model đã lưu (kể cả model retired) trả 200.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q10 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | 'ok' là dev đồng ý đề xuất của QA, không có PO. TC-04 (trước ngày migrate) ⏸️ 2026-10-16 inconclusive, không chứng minh được phía này (CCR cũ: CBS-028 CLAIM-11)
- **Trích nguyên văn:**
  ```
  > **Q10.** Dev keeps 200 before the migrate date and for an unchanged stored model. Accept?
  
  ok Q10
  ```

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

### CLAIM-14

- **Statement:** API lưu Gen AI Effects không kiểm tra giá trị model: id lạ (`gpt-image-999`), chuỗi `<script>…</script>`, chuỗi SQL/NoSQL đều trả 200 và được lưu nguyên văn; chuỗi rỗng được thay bằng model mặc định. Là hành vi hiện tại, không phải expected.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q5 ("The Gen AI Effects save still stores junk `gpt_model` values with HTTP 200. Does this ticket also reject unknown models with 4xx?") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Hành vi HIỆN TẠI dev chấp nhận, KHÔNG phải mong muốn, không dùng làm expected kiểu phải trả 200 hay phải lưu (Phần 4.2). QA từng muốn 4xx (QA-3403 RQ2). Bổ trợ: TC-37, TC-41 ⏭️ 2026-10-16 giữ quan sát id lạ, script, chuỗi SQL/NoSQL lưu nguyên văn với 200; chuỗi rỗng lưu thành model mặc định; không có HTTP 500 (CCR cũ: CBS-028 CLAIM-13)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA: "The Gen AI Effects save still stores junk `gpt_model` values with HTTP 200. Does this ticket also reject unknown models with 4xx?"
  
  Q5: No. Unknown model values have never been rejected on save, and this ticket does not change that, so this case can be skipped here.
  ```

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

### CLAIM-16

- **Statement:** Không có email báo trước (advance notice) trước ngày cắt; chỉ có email xác nhận sau khi đổi model.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q13 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | 'ok' là dev đồng ý đề xuất của QA (CCR cũ: CBS-028 CLAIM-16)
- **Trích nguyên văn:**
  ```
  > **Q13.** The spec mentions an advance notice before the cutoff. Is that part of this ticket?
  
  ok Q13
  Đề xuất của QA mà "ok" đồng ý (comment 54670, 2026-10-15): "QA đề xuất: Out of scope here (only the post-switch email is implemented)"
  ```

### CLAIM-17

- **Statement:** Admin > Settings từ chối lưu giá trị sai của `genai_model_retirements` (model / successor lạ, ngày hay `migrated_at` sai, `migrate_at` không trước `shutdown_at`, successor vòng lặp) và `genai_model_fallbacks` (provider / model lạ, backup trùng chính model, user id sai, entry không có `default` lẫn user), kèm danh sách lỗi.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** admin; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-14, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (mục "Admin > Settings" ở cả Part 1 và Part 2) | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-14 (phần Part 2 sửa 2026-10-15) | TC-23, 24, 39, 42 chưa chạy, QA không có quyền Admin. CCR cũ ghi object chưa rõ vì registry không có object cho Admin; tạm đặt theo Phần 1b (CCR cũ: CBS-028 CLAIM-17)
- **Trích nguyên văn:**
  ```
  - **Admin > Settings:** an invalid `genai_model_retirements` value (unknown model or successor, bad date or `migrated_at`, `migrate_at` not before `shutdown_at`, successor cycle) is refused on save, with the list of problems.
  - **Admin > Settings:** an invalid `genai_model_fallbacks` value (unknown provider or model, backup equal to the model itself, bad user id, entry with neither a `default` nor a user) is refused on save, with the list of problems.
  ```

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

### CLAIM-19

- **Statement:** Một toggle duy nhất cho mọi provider GenAI, lưu thành 1 field `genai_auto_fallback`. Spec PO ghi "applies to the account's active AI service and model" — PO chưa chốt bên nào là ý định.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-03 trong `result_QA-3408_B1-B2_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. | Câu hỏi PO PENDING-14 còn mở, không coi spec hay dev là ý định cuối (Phần 4.2). TC-03 ghi A-14 / PENDING-14 nên expected là assumption (CCR cũ: CBS-028 CLAIM-20)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-03 | ✅ AI — one toggle for all providers | Exactly 1 checkbox labelled "Auto-switch…" on the page; stored as a single field `genai_auto_fallback` | A-14 / PENDING-14
  Ngữ cảnh — dev notes (comment 54520, Part 2): "**New toggle** in Settings > Gen AI Effects: *"Auto-switch to a backup model during temporary outages"*. Off by default, one switch for all GenAI providers." · spec PO (description TIB-5554): "Activate scope: applies to the account's active AI service and model." — hai phía lệch, PO chưa chốt.
  ```
