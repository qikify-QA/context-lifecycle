# CBS-091 CLAIM-10 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-10

- **Statement:** Theo dev, option Photo Reposition {{output}} có effect riêng đi theo vị trí nguồn khi tỷ lệ rộng/cao của kết quả lệch không quá 0.05 so với ảnh nguồn, ngoài khoảng đó giữ vị trí mặc định.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56059, dòng Q5. Liên quan layer-config-image (Photo Reposition). QA chạy staging 2026-10-29 thấy lệch: TC-28 ❌ AI, khung option 400×400 khác khung nguồn 400×300 thì không đi theo kể cả lệch 0.04/0.05; TC-26 ✅ chỉ khi khung cùng tỷ lệ; TC-27 ⏸️; mốc 1.049/1.051 chưa chạy. Bug draft BUG-02 chưa file, dev chưa trả lời. Không dùng làm expected tới khi phân xử xong TC-28, giữ cả hai phía. Khoảng 1.28–1.38 chỉ là ví dụ. (CCR cũ: CBS-022 CLAIM-03)
- **Trích nguyên văn:**
  ```
  - **Q5:** Not exact. The option follows when its result's width/height ratio is within 0.05 of the source photo's (e.g. a 4:3 photo = 1.33 follows for 1.28–1.38). B&W / gray scale follow; a Gen AI 1:1 result on a 4:3 photo keeps the default position.
  ```
