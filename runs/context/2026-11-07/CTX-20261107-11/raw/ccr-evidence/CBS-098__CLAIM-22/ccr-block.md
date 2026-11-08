### CLAIM-22

- **Statement:** Phần viết lại tham chiếu khi namespace id xử lý cả url('#id'), url("#id") có ngoặc kép và thuộc tính marker-*, ngoài url(#id), href="#id", xlink:href="#id" và selector #id trong <style>.
- **Object / feature:** sdk/storefront-buyer-facing (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (preview) và store owner/staff (order design), storefront (SDK) và api (vectorize)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-07
- **Locator:** Jira TIB-5501 comment 53685, trả lời Q3 của QA (comment 53673, 2026-10-07). Câu trả lời chỉ áp cho phần dạng tham chiếu, nửa câu về prefix không được trả lời (xem CLAIM-08). Chưa có TC chạy cho url('#id') và marker-*. (CCR cũ: CBS-031 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Hỏi (QA, comment 53673, 2026-10-07): "Besides url(#id), href="#id", xlink:href="#id" and <style> #id, does the rewrite also handle quoted url('#id') / url("#id") and marker-* attributes? Is the prefix regenerated on every recolor or fixed per layer instance?"
  Đáp: @phuongbb đã handle hết các case của Q3 rồi ạ
  Ngữ cảnh (Dev summary, chauptm, 2026-09-29 — mô tả kỹ thuật, không phải nguồn): "all references are updated: `url(#id)`, `href=\"#id\"`, `xlink:href=\"#id\"` and `#id` selectors inside `<style>`."
  ```
