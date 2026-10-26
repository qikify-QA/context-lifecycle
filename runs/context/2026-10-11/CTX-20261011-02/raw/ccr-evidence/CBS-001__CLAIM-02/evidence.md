<!-- CBS-001 CLAIM-02: verbatim block from CCR Phần 5.1 (redacted per §6: person handles, local home path). -->

### CLAIM-02

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-008 (TC-TIB-4697); quan sát bổ sung ở TC-TIB-007 (TC-TIB-4696)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-07 (chạy lại trên bundle `Wed, 07 Oct 2026 08:36:29 GMT`; lần đầu 2026-10-06 cùng kết quả)
- **Người viết / người xác nhận:** QA ([REDACTED])
- **Trích nguyên văn:**
  ```
  TC-008 actualResult: Request translations/vi.json phát ra ~0.7–0.9s sau goto. Mốc 3s: widget chưa có label QA5352. Mốc 6s đến 18–20s: widget hiện text gốc 'QA5352 Your name', 'QA5352 Enter name', 'QA5352 Your photo' (khớp timeout 5s). ... 1 pageerror: "signal is aborted without reason" (AbortController 5s ...). Trang/widget vẫn hoạt động, không crash.
  TC-007 actualResult: mock 500 → 1 request (~0.9s); mock 503 → 1 request; network abort → 1 request. Widget render text gốc cả 3 lần.
  Code bundle: J1=(e,t,i)=>Bo(`merchant/translations/${t}.json?shop=${e}...`,{headersTimeout:5e3}).catch(()=>null)
  ```
- **File đính kèm cho claim này:** không có (local: `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/02-tc008-delay8s.png`, `05-tc007-cart-modal-api500.png`)
