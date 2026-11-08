# CBS-088 CLAIM-15 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Theo mô tả ticket, fix áp cho mọi loại id (clipPath, gradient, mask, filter, pattern, symbol) và cho SVG đã upload trước và sau fix, còn SVG không có id hoặc layer không có màu không bị đụng.
- **Object / feature:** artwork/layer-config-vector (liên quan: sdk, order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (preview) và store owner/staff (order design), storefront và api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Người tạo ticket và Dev (chauptm), mô tả, không phải xác nhận, 2026-09-29
- **Locator:** Jira TIB-5501 description §Expected result; Dev summary comment 2026-09-29 §Fix. TC-08..17 chưa có biên bản chạy. Không dùng làm expected cho tới khi explore. (CCR cũ: CBS-031 CLAIM-09)
- **Trích nguyên văn:**
  ```
  It should cover **all** id types that can collide, not only `<clipPath>` — including gradients, masks, filters, patterns and symbols.
  
  It applies to both already-uploaded (old) SVGs and newly uploaded ones. The source SVG files are not modified — ids are deduplicated only at preview and at design/render time.
  
  SVGs without ids, or layers without a color, are untouched.
  ```
