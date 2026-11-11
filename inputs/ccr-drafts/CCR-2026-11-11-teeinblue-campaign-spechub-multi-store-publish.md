# Context Change Request: campaign-spechub-multi-store-publish — đối chiếu spec-hub cho publish độc lập theo từng store

- **Product:** `teeinblue`
- **Object:** `campaign`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — làm giàu bằng chứng, không phát hiện mâu thuẫn. Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 164).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Mỗi lần launch tạo đúng 1 Shopify product cho mỗi cặp (campaign, store) — publish ở một store không tự lan dữ liệu/trạng thái sang store khác. Campaign không thể publish khi đang archived, không thể publish 2 lần vào cùng 1 store, và không thể Update ở store chưa từng publish hoặc khi mockup đang publish dở ở đó.
- **Object / feature:** campaign/create-campaign-by-product-base
- **Quan hệ với canon:** `ADD` (củng cố KB-011 — LOW, "publish từng store độc lập, không lan sang store khác")
- **Scope:** owner (merchant), portal (Multi-store launch dialog)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:publish-shopify-one-product`, `spec-hub:campaigns-publish-guards`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=164, rule id `publish-shopify-one-product` (feature `publish-shopify`) và `campaigns-publish-guards` (feature `campaigns`)
- **OQ:** NEEDS_CONFIRMATION — Xác nhận rõ: "Update" ở một store (chọn override field nào trong dialog Multi-store launch) chỉ áp dụng cho store đang chọn, không ảnh hưởng dữ liệu đã publish ở store khác, đúng như KB-011 mô tả? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  publish-shopify-one-product: "Launching creates one Shopify product per campaign and store, titled with the campaign name. ..."
  campaigns-publish-guards: "A campaign cannot be published while archived, cannot be published twice to the same store, and cannot be updated on a store it was never published to or while its mockups are still being published there."
  ```
