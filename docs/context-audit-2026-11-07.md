# Context/runtime audit — 2026-11-07

Audit read-only của cấu hình và mẫu log local; không phải benchmark chi phí. Không đọc/in token xác thực, nội dung email hay prompt đầy đủ. Các thay đổi dưới đây chỉ trong repo, không sửa settings toàn máy và không đổi artifact lịch sử.

## Bằng chứng trước thay đổi

- Claude CLI cài trên máy: `2.1.207`. User settings: `model: opus[1m]`, `effortLevel: high`. Các agent repo chưa khai model/effort trước audit này.
- Mẫu 24 transcript sub-agent gần nhất tại thời điểm đọc: model được ghi nhận chỉ là `claude-opus-5-5` (904 message assistant có ID khác nhau). Đây là mẫu, không phải toàn bộ session hay token invoice.
- Trong mẫu có một worker đọc cùng context pack hai lần không có offset/limit; một worker khác đọc cùng KB hai lần không có offset/limit. Một file được nhiều worker đọc không tự nó là lỗi: có consumer cần đọc độc lập, đặc biệt reviewer.
- 3 tool-result trong mẫu vượt 60k ký tự. Context input được báo ở một worker lên khoảng 492k. Không suy tổng token đã thanh toán từ các con số này.
- Trong 3 session chính gần nhất được kiểm: một `compact_boundary` tự động có `preTokens: 293373`, `postTokens: 22934`, `precomputed: true`. Một session khác có input context được báo tới `539709` và không thấy compact boundary. Vì vậy chưa đủ cơ sở quy mọi compact sớm cho một setting thấp cố định.
- Không thấy override compact/window thấp trong user/project settings, env của tiến trình audit hoặc các file shell startup đã kiểm. Launch flags, policy và môi trường của một phiên Claude khác có thể khác; chưa xác định nguyên nhân chính xác của boundary 293k.
- Codex global config: default `gpt-5.6-luna`, effort `low`; không khai `model_context_window` hoặc `model_auto_compact_token_limit`. Default lưu trên đĩa không chứng minh model đang chạy của một chat. Catalog local ghi window mặc định 500k cho gpt-6.1-sol/terra và 272k cho nhiều model khác, max override 872k. Không có cơ sở coi mọi runtime đang dùng 1M.

## Routing và file nặng

`context-pack.mjs` trước đây tạo monolithic pack. Nay CLI tạo:

1. `input/agenda.md`: thứ tự đọc và stage, nhắc checkpoint.
2. `input/context-packs/<agent>.md`: agenda luật theo vai trò/mode, chỉ chứa pointer/hash/bytes.
3. `input/context-rules/<hash>.md`: section luật nguyên văn, chia ở paragraph ngoài code fence, mục tiêu 10 KB. Block code lớn được giữ nguyên thay vì cắt hỏng. Cùng nội dung dùng chung path; worker không đọc lại hash đã có trong context.
4. `context-index.mjs`: index JSON theo ID/pointer, phân trang 80 entry; reader lấy một pointer, kiểm hash và chặn output quá lớn (12 KB mặc định, 20 KB tối đa).

Smoke check bằng file thật của run CTX-20261107-11, chỉ đọc source và ghi index/agenda vào thư mục tạm: agenda luật builder 2,757 bytes; 14 rule chunk tổng 34,529 bytes; KB storefront-buyer-facing khoảng 181 KB được index thành 356 locator/5 trang, lấy KB-001 với output 2,223 bytes. Tổng rule bytes vẫn cần đọc khi role yêu cầu; kích thước agenda nhỏ không phải bằng chứng tổng token giảm tương ứng.

Không cắt file published hay bỏ evidence để giảm kích thước. Artifact đầy đủ vẫn là nguồn chuẩn để validator, diff và reviewer kiểm. Index là route, không phải evidence. `input/run-checkpoint.json` do Otto cập nhật ở ranh giới stage và trước compact; generator không tự đánh dấu stage hoàn thành.

## Cấu hình áp dụng trong repo

`.claude/settings.json`: default Sonnet `[1m]`, effort medium, `autoCompactWindow: 650000`. Schema binary cài local có key autoCompactWindow và giới hạn 100000..1000000. Đây là cấu hình window; ngưỡng kích hoạt thực có thể chịu buffer, môi trường và launch overrides. Không sửa Codex config hay khai window giả để vượt khả năng model.

Frontmatter agent là nguồn duy nhất cho model/effort theo vai trò:

- Otto, planner, explorer và feature context builder: Sonnet `[1m]`, medium.
- Normalizer: Opus `[1m]`, medium.
- Diff và reviewer: Opus `[1m]`, high.

Đây là baseline để đo, chưa chứng minh mọi task cần đúng mức này. Nếu gate cho thấy suy luận thiếu, tăng effort/model cho đúng task và ghi lý do thay vì nâng toàn bộ workflow. Không hạ reviewer thành producer.

Không thêm field mới `omitClaudeMd` hoặc per-agent `autoCompactWindow` theo tài liệu mới mà chưa xác nhận hỗ trợ phiên bản. Không tự cập nhật Claude CLI. Phiên/worker đang chạy có thể giữ cấu hình cũ; cần kiểm `/status`, `/context`, `/tasks` và log trên phiên chạy tiếp theo. Đọc được key trong schema không thay thế một test gọi model end-to-end.

## Validation và phần chưa đo

Unit tests kiểm chia rule không làm vỡ code fence, dùng chung hash, locator đúng ID, JSON Pointer escape, source đổi thì index đổi; các test carry-forward, C4/C5, gate và publish cũ vẫn chạy. Smoke CLI xác nhận pack/index/reader trên source thật mà không sửa knowledge.

Chưa chạy CCR trả phí end-to-end và chưa có A/B trước/sau theo scope tương đương. Lần chạy kế tiếp cần ghi model/effort/window thực, input/output/cached token, compact count, retry count và finding của reviewer. Không cộng lặp usage từ các record streaming cùng message để suy billable tokens.

## Nguồn chính thức đã đối chiếu

- [Claude model configuration](https://code.claude.com/docs/en/model-config): model, effort và compact window; window cap theo model và khả năng override.
- [Claude custom subagents](https://code.claude.com/docs/en/sub-agents): context riêng trừ fork, model/effort frontmatter, startup context và các field phụ thuộc phiên bản.
- [Codex configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference): model context và auto-compact là cấu hình riêng; unset dùng model defaults.
