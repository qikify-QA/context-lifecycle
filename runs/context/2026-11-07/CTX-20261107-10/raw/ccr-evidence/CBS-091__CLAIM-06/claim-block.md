# CBS-091 CLAIM-06 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-06

- **Statement:** gray_scale trên các layer khác kích thước (400×400 và 400×300) dùng chung 1 call, body derive không có size.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, chạy bằng AI trên Chrome của QA), 2026-10-27
- **Locator:** QA-3434 TC-64 (Testlane task TIB-246), ✅ chạy 2026-10-27 22:46 +07 staging; results/result_QA-3434_TC14-TC64_2026-10-29.md, lần chạy gốc results/result_QA-3434_GenAI_2026-10-27.md. Build SDK của PR TIB-5300/5577/5578, Last-Modified/ETag không ghi lại; chưa chạy lại trên build 2026-10-29 08:21:05 GMT. Phần "không phải bug" chỉ có lời dev 2026-10-29 không link. Số 400×400, 400×300 là dữ liệu fixture; tên field không phải hợp đồng API. (CCR cũ: CBS-021 CLAIM-06)
- **Căn cứ expected:** KHÔNG CÓ (căn cứ duy nhất là lời dev 2026-10-29 do QA chuyển lại, không có link; câu Jira Q2 đọc rộng còn ngược với expected này)
- **Trích nguyên văn:**
  ```
  Expected TC-64: "Exactly one gray `derive` (body has no `size`) serves s1, s2 and s3; all three show the same
  result image URL" (pre: SHARE s1, s2 Direct 400×400, s3 Direct 400×300, all gray-scale).
  
  Kết quả: "✅ AI — gray_scale on 400×400 and 400×300 layers → one shared call (run 2026-10-27, dev confirmed
  2026-10-29 as intended) | 2026-10-27 SHARE PX-1: one gray `derive` (body `effects=[{"type":"teeinblue:gray_scale"}]`,
  no `size`); s1, s2 (400×400) and s3 (400×300) all `…SBvuj8RrFvYcU4Aa_large.png`"
  
  Cùng lần chạy 2026-10-27: "The `teeinblue:gray_scale` derive body is `effects=[{"type":"teeinblue:gray_scale"}]&field_id=…`
  with no size. P6 (t1–t6, 300…350 px) sends **one** `derive` for PX-1 and all six targets get the same
  `…yrVVPqocZ35JWOyS_large.png`."
  ```
