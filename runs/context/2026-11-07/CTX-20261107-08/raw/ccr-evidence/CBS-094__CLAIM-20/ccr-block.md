### CLAIM-20

- **Statement:** Storefront không đổi: effect vẫn chạy trên ảnh buyer upload, thiếu key vẫn lặng lẽ bỏ qua effect đó; buyer mua với layer có ảnh đã xử lý (đã Save) thì order design dùng ảnh đã xử lý
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Possible test cases và Notes. Không có kết quả chạy có ngày (TC-43, 44 chỉ có status passed trên Testlane) (CCR cũ: CBS-029 CLAIM-19)
- **Trích nguyên văn:**
  ```
  Storefront: buy with the processed layer image → order design uses the processed image.
  Storefront buyer upload with effects is unchanged (effects still run; a missing key still skips that effect silently).
  - **Release order:** API first, then portal. No SDK release is needed.
  ```

