# CBS-088 CLAIM-16 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Campaign editor preview trên Portal hiện vector dạng <image> và không có ô chọn màu nên namespace không được kích hoạt ở đó, và Portal cần bump submodule src/sdk mới có code SDK mới.
- **Object / feature:** artwork/layer-config-vector (liên quan: campaign)
- **Quan hệ với canon:** `UNKNOWN`
- **Scope:** store owner/staff (Portal preview), portal (campaign editor, artwork editor Live preview)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, quan sát) và Dev (chauptm, mô tả), không ai xác nhận, 2026-10-08 và 2026-09-29
- **Locator:** QA-3394 TC-24 ⏸️ (result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK); Dev summary comment 2026-09-29 §Notes. Q2 (deploy) và Q5 (Portal có trong phạm vi không) chưa ai trả lời. Không đề xuất gì về artwork editor Live preview. Có thể thuộc campaign thay vì artwork. (CCR cũ: CBS-031 CLAIM-10)
- **Trích nguyên văn:**
  ```
  TC-24 | ⏸️ AI — campaign editor preview hiện vector dạng `<image>` và không có ô chọn màu trong preview → không kích hoạt được inline/namespace để so | `[đã bỏ id]`: 5 group `artwork-layer--layer-…` inline=false, image=true; `.tee-field--color` count 0
  
  No migrations, no submodule bump in this change. `teeinblue-portal`'s `src/sdk` submodule will need a pointer bump after the SDK PR is merged, and vectorize must be deployed for exported SVGs.
  ```
