### CLAIM-11

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5620; skill-rules-audit.md #71 (rule `presigned-upload-network-resilience`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5620
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #71, rule `presigned-upload-network-resilience`, nguồn ghi: Dev xác nhận TIB-5620, 2026-10-28:
    ```
    **Vector Upload KHÔNG đi Worker** (Dev xác nhận TIB-5620, 2026-10-28): field Vector Upload upload qua API `vector-upload`; chỉ khi store bật multiple file types và khách upload file không phải vector thì mới đi Worker. Vẫn lên R2 vì env storage chung = R2 (staging đã set).
    ```
- **File đính kèm cho claim này:** không có

