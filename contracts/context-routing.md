# Context entrypoint

1. Trước khi có run: Otto đọc agent definition và đúng file mode/intake cần thiết để admission; không mở mọi contract.
2. Có run: chạy `node scripts/ctx/context-pack.mjs --run <id> --agent <name>`. Đọc `input/agenda.md`, rồi `input/context-packs/<name>.md`. Pack là agenda trỏ tới các mảnh luật chuẩn trong `input/context-rules/`, không nhúng full contract. Đọc các mảnh bắt buộc theo thứ tự một lần trong context của worker; cùng hash đã đọc và vẫn còn trong context thì không đọc lại ở pha sau.
3. Chỉ mở input đúng object/feature/claim/ID được giao. File JSON lớn: tạo index bằng `context-index.mjs`; đọc đúng JSON Pointer và xác minh hash. Không paste full artifact vào prompt/response. Không dùng index thay bằng chứng hay bỏ gate review.
4. Worker trả receipt ngắn gồm trạng thái, stage, paths, counts và blockers. Artifact đầy đủ ghi trên đĩa. Không đọc source của helper/schema chỉ để xem helper chạy thế nào khi nó đã trả kết quả hợp lệ; khi lỗi thì mở đúng phần cần debug.
5. Otto cập nhật `input/run-checkpoint.json` ở ranh giới stage: mode, scope, worker IDs, outputs hợp lệ, blockers, next action và file hashes đã đọc. Agenda chỉ là route, checkpoint mới là trạng thái. Sau compact: khôi phục từ checkpoint → receipt → input cần thiết, không đọc lại toàn bộ run. Thiếu nội dung luật bắt buộc thì đọc lại đúng chunk.
6. Mỗi run có Otto worker mới khi runtime hỗ trợ. Retry resume đúng worker/scope; không kế thừa toàn transcript của run khác. Tránh polling log/output đầy đủ.

Chi tiết chỉ đọc khi cần, trong `contracts/context-execution.md`: `Nạp luật đúng vai trò`, `Dispatcher và context của run`, `Dispatch và handoff`, `Delta và carry-forward`, `Builder gộp và retry theo pha`, `Đo context`. Đây là một nguồn protocol; không nạp toàn file ở mỗi worker mặc định.

Runtime Claude: repo dùng `.claude/settings.json` cho default và compact window; mỗi agent có model/effort trong frontmatter. Respect lựa chọn operator và policy môi trường; ghi model/effort/window thực từ runtime, không suy từ tên model hay dung lượng file. Không áp cấu hình Claude sang Codex. Thay model/effort giữa chừng phải có lý do trong checkpoint, không retry mù để tiêu thêm token.
