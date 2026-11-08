### CLAIM-29

- **Statement:** Khi nguồn là Group of Clipart Categories (grouped_clipart), group_name phải khớp giá trị retrieval_value; manual chỉ match group_name rồi lấy option mặc định đầu tiên; auto match group_name, sau đó khớp option.name thì lấy option đó, không khớp thì lấy option đầu tiên.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (cấu hình layer); storefront (SDK), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-30
- **Locator:** Jira TIB-5412 comment 52817, trả lời RQ1 (comment 52810). Dev nói đây là logic từ trước, TIB-5412 không đổi. Map manual/auto sang dynamic-by-text/clipart-frame là cách hiểu của QA theo KB-006/KB-007, dev không nói tên type; "option đầu tiên" chưa rõ theo thứ tự nào. TC-09 chưa viết lại, TC-10 không có kết quả chạy. Liên quan, không bị thay: KB-006, KB-007, KB-089, KB-077. (CCR cũ: CBS-032 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA phuongbb, comment 52810, 2026-09-30): "Với layer `grouped_clipart`: buyer gõ gì và so khớp với cái gì — `group_name` có bao giờ so khớp trực tiếp với text buyer gõ không, hay group chỉ khoanh vùng category con còn match thật vẫn là `option.name`?"
  
  @phuongbb với case grouped_clipart logic từ trước là thế này ạ:
  
  - group_name phải match với giá trị retrieval_value
    - manual: chỉ match group_name và default option đầu tiên
    - auto: match group_name
      - check match với option.name → lấy option này
      - không match với option → layer option đầu tiên
  ```
