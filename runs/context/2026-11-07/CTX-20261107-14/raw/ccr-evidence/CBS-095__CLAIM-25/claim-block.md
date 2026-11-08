### CLAIM-25

- **Statement:** Panel settings single-layer (LayerEditor, refactor sang `getLayerSchema`) vẫn có cho từng layer: AW1.0 text / clipart / group clipart / photo / moon phase giống production; chọn riêng 1 replica (không có `type`) → không mở panel trống, không lỗi console.
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `CONTRADICTS KB-085`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-29, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-33, TC-34 trong `result_QA-3419_remaining_2026-10-29.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-29. Build staging `assets/index.acNZihq9.js` (panel đọc cho TC-33), `assets/index.BFN2fMjC.js` (TC-34); production (chỉ đọc) `index.13olohaV.js`. | TC-32 (AW2.0) ⏸️ một phần: 21 panel single-layer mở được, 7 type khớp production, 12–13 type chưa có baseline; không tính vào nguồn. Phiên bản artwork của KB-085 không rõ 1.0 hay 2.0, có thể chỉ khác scope. CHK-015 (READY) cùng nội dung KB-085. KB-002 ghi layer row có icon la-pen. Giữ cả hai phía (CCR cũ: CBS-025 CLAIM-23)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-33 | ✅ AI — AW1.0 text / clipart single-layer panels same as production | Staging [artwork id] vs prod [artwork id]: **clipart/clipart** "PERSONALIZATION: form_type, form_visibility · CLIPART SETTING: form_label, direct_clipart_style, clipart, default_value, input_hint, required, show_in_cart · CONDITIONAL · EXTRA: layer_display, custom_class, group_name" identical; **clipart/grouped_clipart** identical; **text/text** identical after turning off text_color / custom_font toggles on the staging copy (unsaved; prod layer has them off); **clipart/photo** with photo_editor image_cropper on both: same list; "Enable photo cropper" / "Remove background" hidden on both (deprecated, disabled); prod adds Gemini-effect sub-fields (its effect is gemini:image_filter), staging adds `photo_border_info`; **moon_phase/moon_phase** (same data editable true) same text …
  TC-34 | ✅ AI — replica without `type` selected alone: no blank panel, no console error | [artwork id] Local 1 replica R1 layer-[id] (saved data: only `id`, `global_id` — no `type`; MCP validate also warns "Layer has no type"). Select R1 → "1 selected", text toolbar (Roboto, 60), row actions only eye / lock (no pen = no settings panel, as product_facts L33 on the pre-refactor build); with T1's panel open, selecting R1 closes the panel (no empty panel); selecting R2 alone → 0 `.layer-panels`; console after selection: no messages
  Ngữ cảnh (dev summary, 2026-09-04 — không phải nguồn của claim): "Refactor: LayerEditor (panel settings của 1 layer) chuyển sang lấy schema qua hàm getLayerSchema dùng chung (layerSchema.js) thay cho switch/case cũ; hành vi single-layer editing kỳ vọng không đổi nhưng cần regression."
  Phía bên kia (canon): KB-085 / CHK-015 — trích ở Phần 3.
  ```
