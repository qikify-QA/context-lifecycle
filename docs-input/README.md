# docs-input/ — tài liệu dev gửi sang, CHƯA redact

Mỗi product doc-first có một thư mục con, tên trùng `product_key` và trùng
`config/products/<key>.json` → `doc_input.dir`.

**Nội dung thư mục này bị gitignore có chủ đích.** Tài liệu do dev generate từ
source code thường mang theo token thật, connection string, email seed và tên
khách trong ví dụ — tức là đúng những thứ mà contract §6 bắt redact trước khi
ghi ra file. Bản được track git là bản **đã redact**, do orchestrator copy vào
`runs/context/<date>/<CTX-RUN-ID>/input/docs/<DOC-ID>/` ở bước C0 kèm `sha256`
trong `input/doc-manifest.json` (contract §9).

Đừng sửa tài liệu ở đây sau khi một run đã ingest nó: citation của mọi KB item
trỏ vào bản copy trong run, không trỏ vào đây, và `sha256` là thứ giữ cho quote
còn kiểm chứng được về sau.
