### CLAIM-23

- **Statement:** Validate giá trị cho phép (`gpt_resolution` 1024/2048/3840, `gemini_resolution` 512/1K/2K/4K) và Flux min 256 chỉ check ở server qua MCP; đường portal/REST chỉ dựa vào dropdown + rule min 256 của portal, server không check lại; 4 MP check trên mọi đường. Allowed list `gemini_resolution` của Text to Image trên MCP được thêm trong branch này
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** client API (REST) / MCP; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q7. Bổ trợ TC-30, TC-31 PASS 2026-10-27. "REST không check lại" là hành vi hiện tại dev mô tả, không phải rule PO chọn; giá trị lạ REST lưu được trong TC-31 là bằng chứng một lượt chạy, không phải danh sách chuẩn (CCR cũ: CBS-024 CLAIM-17)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Do artworks / global options saved via API / MCP with 'gpt_resolution', 'gemini_resolution', 'flux_output_width/height' on these layers go through the same validation (allowed values, 4 MP)?"
  - **Q7:** Partly.
    - The 4 MP limit is checked on every save path: portal/REST and MCP, for both artworks and global options.
    - Allowed values (`gpt_resolution` 1024/2048/3840, `gemini_resolution` 512/1K/2K/4K) and Flux min 256 are checked on the server **only via MCP**, the same as other layer fields.
    - On the portal/REST path, the values are limited by the dropdowns and by the portal's own min 256 rule. The server does not re-check them.
    - Text-to-image `gemini_resolution` had no allowed-value list on MCP. It was added in this branch.
  ```
