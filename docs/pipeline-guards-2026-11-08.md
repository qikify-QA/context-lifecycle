# Update kiểm soát pipeline — 2026-11-08

Phạm vi: sửa producer context-lifecycle và hướng dẫn consumer do producer phát hành. Không sửa dữ liệu trong knowledge, không chạy publish/PR/tag, không đổi quyền repo, thu hồi credential hay rewrite lịch sử. Giữ flow native hiện tại: main session điều phối, một builder, các skill/reference đọc theo tác vụ. Không thêm custom agent definition, ADHD hoặc confidence percentage.

## Luồng sau update

1. Intake cấp run và kiểm Proposal đã có run IN_PROGRESS/REWORK_REQUIRED/PUBLISHED. Exit 3 nghĩa là resume/báo kết quả cũ, không finish DEFERRED lên card đang xử lý. Claim-less CCR dùng proposal-claim marker độc quyền; sửa object vẫn phải giữ object lock, rồi lock shared.
2. Build evidence và candidate theo scope. Tác vụ deterministic chạy script, không gọi model. Không tăng model chỉ vì thiếu field/lock/auth. Effort mỗi Agent phụ thuộc capability runtime; không giả định runtime đang cài có tham số này.
3. Materialize delta kiểm base hash và scope; strip áp resolution, đổi reference candidate về ID ổn định, dọn output JSON cũ và giữ metadata khi không đổi nội dung. CHANGELOG supersede không thêm trùng khi chạy lại. Tất cả thay đổi bị chờ quyết định thì chặn version-only publish.
4. Hoàn tất OQ/CHANGELOG/feature summary trong preview; chạy validate-run --complete và audit-preview. Thiếu stage được yêu cầu không được tính là pass. Một run có feature key trùng ở hai object phải tách scope, vì layout candidate hiện tại chưa mang namespace object đầy đủ.
5. Review-delta chọn full/delta, rồi --start trước reviewer đọc. Reviewer độc lập kiểm nghĩa của nguồn, gate, oracle và thông tin nhạy cảm. Validate verdict rồi --snapshot. Snapshot schema 2 lưu verdict từng vòng, hash nguồn/raw/candidate, mode/scope, luật/skills/config và base. Hash base KB ngoài preview bảo vệ oracle dependency; việc hash không nạp nội dung vào model context.
6. Publish-apply chỉ nhận object scope không rỗng, khớp preview; kiểm strip summary, verdict/gate/seal, lock, audit và shared base trước copy. Registry chỉ merge object được phép. Ordinary failure rollback các file đã chạm; receipt cho retry sau apply thành công.
7. Release là bước riêng khi operator cho phép. Chỉ stage đường dẫn đã scan. Ledger lưu trước commit/push/PR, retry tiếp tục phần còn thiếu và tìm lại PR đã tạo. Tag chỉ sau PR merge vào main. Giữ release receipt đến khi board nhận update thành công rồi mới --ack --proposal CBS-n.

Các command cụ thể nằm trong .claude/skills/ctx-review/SKILL.md và .claude/skills/ctx-run/references/{ccr-intake,publish}.md.

## Quy tắc dữ liệu mới

- Reference mới: object/feature#KB-ID; object/_object-level#KB-ID cho object-level. Legacy bare ID resolve trong feature hiện tại, rồi object-level, rồi duy nhất trong object; ambiguous fail closed. Không bulk-renumber ID cũ.
- STRONG oracle cần nguồn hợp lệ và không conflict/known defect; giữ giới hạn dev_doc/P1. NONE cần expected rỗng + NEEDS_CONFIRMATION; OQ của check phải tồn tại.
- PROPOSED nói chung không bắt buộc qa_rule_ref. Item xuất phát S2 phải giữ qa_rule_ref; plan giữ cả quote, published giữ locator/owner/code/date. Không nâng rule QA thành authority chỉ vì có reference.
- Manifest phân biệt confirmed_expected, confirmed_with_valid_source, invalid_confirmed và DOC_ONLY. Nhãn CONFIRMED_EXPECTED không đủ để tính usable oracle.
- Baseline trong config/legacy-authority-debt.json đã được retire sau maintenance data cùng ngày: 28 item thiếu nguồn chuyển INFERRED, có OQ. Không còn ngoại lệ source-less authority.
- Parser OQ hiểu dấu ngoặc/escape trong chuỗi. Audit chặn JSON lỗi, summary thiếu/lệch version, dangling reference và nguồn sai.

## Security và tính đồng thời

CI kiểm tất cả tracked path, kể cả runs, chặn credential mới/đổi theo fingerprint so với merge-base. Preview/release scan toàn bộ nội dung text và _env.example phải để giá trị rỗng. Scanner không in giá trị secret. Không coi regex scan là chứng minh không còn dữ liệu nhạy cảm; reviewer vẫn kiểm nội dung như chi tiết khai thác chưa công bố và dữ liệu khách hàng.

Raw runtime, bản doc và backup apply mới được ignore. Ignore không xoá file đã tracked và không xử lý lịch sử. Secret đã lộ, quyền repo và lịch sử là việc remediation riêng; update này không tự thực hiện.

Lock-store serialize acquire/verify/release bằng atomic directory guard; stale takeover có đúng một owner, thất bại khi mở rộng lock không nhả lock run đã giữ. Guard bị bỏ lại do kill/crash không tự xoá: phải xác minh không còn writer rồi operator phục hồi. Mọi writer phải dùng cùng lock implementation; filesystem này không phải distributed transaction service.

Rollback file xử lý exception thông thường, không bảo đảm atomicity khi kill/mất điện giữa copy. Khi gặp trường hợp đó, giữ run/receipt, đối chiếu target trước retry; không tự tiếp tục Proposal claim còn in-progress.

## Chuyển run hiện có

- Không dùng verdict/snapshot cũ để apply. Preview cũ thiếu generated_files: strip --clean, dựng lại prose/OQ, validate --complete, review --start và seal mới.
- Nếu shared_file_changed: copy-shared --reset đúng file, áp lại chỉnh sửa trên base mới, review và seal lại.
- Gate mới có thể chặn checklist legacy đang dùng source-less/conflicted KB làm oracle. Sửa đúng check hoặc bổ sung nguồn; không hạ audit để thông qua.
- 904 nhóm ID cũ trùng trong object được xử lý bằng resolver namespace, chưa migration dữ liệu hàng loạt. Cần một lượt migration riêng nếu muốn canonicalize toàn bộ reference cũ.
- Không nâng ngưỡng compact lên 600–700k bằng giả định mọi runtime/model đều có 1M. Update này không đổi compact/window; chỉ giảm preload, giữ routing theo skill và dùng hash deterministic thay vì đọc lại toàn bộ bằng model.

## Xác minh

72 tests qua: seal invalidation, immutable verdict, oracle/ref, resolution/remap, metadata, rerun strip, scope guard, S2/generic PROPOSED, proposal replay, rollback, lock cùng tiến trình và nhiều tiến trình, release retry sau lỗi tạo PR/lưu receipt, scanner và OQ escaping. Contract/schema/config validation qua. Không chạy kiểm thử live Claude, board, credential hoặc release remote trong lượt update.

Sau maintenance data: xem docs/knowledge-data-repair-2026-11-08.md để biết phạm vi, số liệu và nợ xác nhận còn mở. `manifest --check` nay còn so manifest và OQ index đã lưu với dữ liệu hiện tại, không chỉ kiểm block publish.

## Follow-up sau review: secret placeholder

Scanner chỉ miễn marker trùng toàn bộ (ví dụ REDACTED/[REDACTED], MASKED, null, true), mask toàn dấu *, placeholder có tên trong allowlist và biến env đúng cú pháp đầy đủ. Giá trị bắt đầu bằng marker nhưng còn suffix vẫn bị chặn. Không miễn mọi chuỗi bắt đầu bằng $, <, ** hoặc {. Bare token được kiểm khi là quoted key hoặc assignment đầu dòng, tránh coi từ token trong mô tả nghiệp vụ là credential. Ngoại lệ prose không áp cho literal đã quote; code span chỉ miễn tên biến env đúng dạng.

77 tests pass, gồm các prefix bypass do reviewer nêu, quoted keys/values, bearer/signed URL/checkout header và quy tắc _env.example vẫn phải để rỗng. validate:knowledge và validate:contracts pass.

Seal hiện ưu tiên an toàn: đổi bất kỳ skill/contract/script đã băm làm mất hiệu lực review đã seal; publish object khác cùng product cũng làm mất hiệu lực nếu KB base đổi. Các run song song có thể phải review lại trước apply. Chưa thu hẹp dependency set; không chỉnh lại snapshot bằng tay để bỏ qua thay đổi này.
