# CBS-091 CLAIM-03 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-03

- **Statement:** Effect có bật dùng kích thước layer: hai layer khác kích thước thì gọi riêng, mỗi call trừ 1 lượt.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), seller bật công tắc ở portal; storefront, api, portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth, QA phuongbb chuyển lời), 2026-10-29
- **Locator:** Lời dev sửa câu Q2, QA phuongbb dán lại khi làm QA-3434; kênh gốc không rõ, không có trên Jira TIB-5577, không có link. Chỉ là "đã nghe dev nói", không dùng làm expected. Tên công tắc trên portal chưa biết; không có test case. (CCR cũ: CBS-021 CLAIM-03)
- **Trích nguyên văn:**
  ```
  "TC-14 / điểm cần quyết về gray_scale: gray_scale đang chạy đúng. Câu trả lời Q2 trước đó của dev viết chưa đủ, nên
  sửa lại như sau.
  
  Hai layer dùng chung 1 lần gọi khi cùng ảnh và cùng thiết lập effect. Kích thước layer chỉ được tính vào thiết lập
  trong các trường hợp sau:
  
  - Effect Gen AI (Gemini, GPT, Flux, ImagenHub…) trên layer Direct upload hoặc Cropper, hoặc effect có bật dùng kích
    thước layer: khác kích thước thì gọi riêng, mỗi lần trừ 1 lượt. Đây là trường hợp s3 / s4 trong lần chạy Gemini
    ngày 29/10.
  - Effect Gen AI trên layer Photo Reposition không bật dùng kích thước layer: khác kích thước vẫn gọi chung.
  - Contour cut: khác chiều rộng thì gọi riêng. Cùng chiều rộng mà khác chiều cao thì gọi chung.
  - Các effect còn lại (gray_scale, remove background, watercolor, sketch…): ảnh kết quả không phụ thuộc kích thước,
    nên luôn gọi chung. Vì vậy s1, s2, s3 trong lần chạy gray_scale ngày 27/10 chỉ gọi 1 lần là đúng."
  
  Phần nói về claim này: "hoặc effect có bật dùng kích thước layer: khác kích thước thì gọi riêng, mỗi lần trừ 1 lượt".
  ```
