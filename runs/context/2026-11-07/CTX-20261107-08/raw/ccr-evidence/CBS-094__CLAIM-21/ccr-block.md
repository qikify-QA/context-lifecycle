### CLAIM-21

- **Statement:** Storefront không bao giờ chạy effect lên ảnh mặc định của layer; populate target (TIB-5302) chỉ chạy effect của nó lên ảnh buyer upload vào layer nguồn, tới lúc đó hiển thị nguyên ảnh mặc định đã xử lý
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q13, câu hỏi trong comment 54545. Trả lời một phần OQ-artwork-093 (artwork KB-120, populate-values). Không có kết quả chạy có ngày (TC-45 chỉ có status passed trên Testlane) (CCR cũ: CBS-029 CLAIM-20)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "For a Photo layer that is a populate target (TIB-5302), after the merchant saves a processed default image, does the storefront run the effects again on that already-processed image?"
  - **Q13:** No. The storefront never runs effects on a layer's default image. A populate target runs its effects only on the photo the buyer uploads to the source layer. Until then, it shows the processed default image as is.
  ```

