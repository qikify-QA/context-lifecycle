# CBS-090 CLAIM-17

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Prompt của effect (layer Normal hoặc Global Option) có biến → bấm Run effects chưa chạy, mở popover `Fill in variables`, mô tả `Enter the values to use for this run.`; mỗi biến khớp option có thật một field (biến lặp lại chỉ 1 field), theo thứ tự xuất hiện, nhãn là token (vd `{{Name}}`); prompt không có biến → chạy thẳng như cũ; đóng popover (nút đóng, click ra ngoài, Esc) → không chạy
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-26
- **Locator:** description TIB-5470, mục Update: Prompt variables › Trigger, Fields. Thay toast "Can't run…" của dev doc 2026-10-08, không đưa toast cũ vào canon. Bổ trợ TC-57, 58, 65, 66 PASS 2026-10-28 build index.OMERs7BG.js; "đóng popover không chạy" và "không biến chạy thẳng" là kết quả test, spec không ghi nguyên chữ. ImagenHub template variable chưa thử (TC-78, PENDING-18). Liên quan artwork KB-113, KB-115 (CCR cũ: CBS-029 CLAIM-21)
- **Trích nguyên văn:**
  ```
  Replaces the `Can't run: {{variable}} has no default value…` toast in **Behavior**.
  
  **Trigger**
  
  - If any effect prompt contains variables, `Run effects` opens a `Fill in variables` popover, for both normal and global options.
  - Description: `Enter the values to use for this run.`
  
  **Fields**
  
  - Show one field per unique variable matched to an existing option, in order of appearance, labelled with its token (e.g. `{{Name}}`).
  ```
