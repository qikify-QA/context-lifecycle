# Context execution

Áp cho Otto, dispatcher và mọi sub-agent. Luật nghiệp vụ vẫn ở contract gốc; file này chỉ quy định cách nạp context và trao đổi artifact. Không giảm phạm vi review để tiết kiệm token.

## Nạp luật đúng vai trò

Không đọc tất cả contract trong phiên mới. Sau khi biết run và mode, chạy:

```text
node scripts/ctx/context-pack.mjs --run <id> --agent <name>
```

Đọc `input/agenda.md` rồi đúng file `input/context-packs/<name>.md` mà script trả về. Pack là agenda nhỏ trỏ tới chunks trong `input/context-rules/`; script trích nguyên văn section từ contract chuẩn theo `config/context-policy.json`, kèm gate áp dụng và luật CCR/supersede khi cần. Chunks chia ở ranh giới paragraph ngoài code fence (mục tiêu 10 KB), dùng hash nội dung để dùng chung giữa vai trò và không đọc lặp trong cùng context. Không đọc thêm bản contract đầy đủ sau khi đã đọc chunks. Bootstrap trước khi tạo run: Otto đọc agent definition + file mode cần thiết để admission, dùng script để tạo run; sau đó sinh pack. Mode thay đổi tại C0.5 thì sinh lại pack trước bước tiếp theo. Pack là dữ liệu sinh, không sửa tay, không dùng pack của run khác.

Nếu nhiệm vụ đòi section ngoài pack, đọc đúng section đó từ nguồn chuẩn, không mặc định đọc cả file. Ghi nguồn bổ sung trong receipt. Reviewer được mở mọi nguồn cần thiết trong phạm vi run, kể cả base và evidence.

## Dispatcher và context của run

- Dispatcher giữ queue (ID, product, scope, outcome), không giữ evidence/candidate của các run.
- Mỗi run dùng một worker Otto mới. Khi runtime cho chọn kế thừa lịch sử, tắt kế thừa; không truyền transcript cha. Đây là worker của cùng công việc, không phải chat/sidebar mới.
- Runtime không hỗ trợ worker độc lập: ghi checkpoint queue/outcome dưới `runs/`, kết thúc ở ranh giới run và báo operator mở phiên tiếp. Compaction không được xem là context mới. Không bỏ các Proposal còn lại khỏi checkpoint.
- Worker chuyên môn nhận đúng run/scope và paths, không nhận toàn bộ lịch sử Otto. Trong cùng run, retry đúng worker nếu runtime hỗ trợ resume; nếu không thì worker mới chỉ nhận paths + lỗi + scope.
- Tối đa `max_attempts_per_stage` trong `config/context-policy.json` lần thử một stage trong một lượt tự động; còn lỗi thì checkpoint `REWORK_REQUIRED`, nêu blocker và trả operator. Không lặp vô hạn hay chạy lại cả pipeline.

## Dispatch và handoff

Prompt giao việc gồm: `run_id`, `mode`, agent, objects/features/claims được giao, input paths cụ thể, output paths, pack path, giới hạn write/mutation và lỗi cần sửa (nếu retry). Không paste toàn bộ artifact vào prompt. Không dùng `**` để yêu cầu đọc tất cả khi scope đã biết; khai đúng file và ID cần xử lý. File lớn thì dùng mục lục/ID index hoặc đọc đoạn cần thiết; không in JSON/evidence toàn bộ vào tool output để xem sơ bộ.

Artifact đầy đủ nằm trên đĩa, dùng envelope/schema hiện hành. Response về Otto là receipt ngắn, mục tiêu theo `handoff_target_tokens` trong `config/context-policy.json` (hiện 500 token):

```json
{
  "run_id": "CTX-...",
  "agent": "qa-knowledge-normalizer",
  "status": "READY",
  "outputs": ["candidate/deltas/feature-kb.json"],
  "counts": {"added": 2},
  "blockers": [],
  "next_stage": "materialize-kb",
  "extra_rule_sections": []
}
```

Board update theo contract §0 cũng chỉ gồm paths/state, không nhúng artifact. Findings dài ghi file và trả path + ID. Otto chỉ mở chi tiết khi có blocker/quyết định cần xử lý; các bước chuyển tiếp dùng receipt và kết quả script. Không đọc lại candidate để xác nhận nội dung mà validator đã kiểm cơ học. Review ngữ nghĩa vẫn thuộc reviewer độc lập.

## Delta và carry-forward

Candidate đầy đủ vẫn là giao diện downstream và vẫn qua mọi schema/gate. Delta là input riêng cho script, không chuyển thẳng sang downstream. File delta dưới `candidate/deltas/`, không phải thư mục candidate chính. Agent không tự chép lại base không đổi.

Run không có base: producer ghi artifact đầy đủ như cũ. Feature mới trong object đã có base nhưng chưa có file feature: cũng ghi artifact đầy đủ; không khai hash giả. Product-level KB chưa dùng delta, giữ flow hiện tại.

Run có base: delta có dạng:

```json
{
  "stage": "kb",
  "object_key": "object-key",
  "feature_key": "feature-key",
  "base_sha256": "sha256 của đúng bytes file base",
  "artifact": {"producer": "qa-knowledge-normalizer", "payload": {}}
}
```

`artifact` là envelope đầy đủ hiện hành, ví dụ chỉ lược bớt để minh hoạ. Chỉ rõ file base trong prompt; tính hash bằng công cụ, không đoán.

- **KB**: `artifact.payload.kb_context` khai đúng object/feature; `kb_candidates` chỉ chứa item mới. Nếu thay behavior cũ, mint ID candidate mới và giữ `target_kb_ids` theo luật diff; không ghi đè item base. Metadata của shard (conflicts/OQ/coverage) vẫn do normalizer ghi. Script copy nguyên item base, cộng delta. Object-level dùng `feature_key: null`. Khi cần semantic dedupe/đối chiếu, đọc item base liên quan; không bỏ bước này chỉ vì dùng delta.
- **Profile/checklist**: `stage` là `profile`/`checklist`. Envelope payload chứa metadata của stage nhưng không chứa `feature_profiles`/`checklists`. Thêm `patches` ở cấp delta, áp vào object base tương ứng. Patch dùng `op: add|replace|remove`, JSON Pointer `path`, `value` cho add/replace; replace/remove bắt buộc `before` bằng giá trị cũ. Ví dụ thêm check: `{"op":"add","path":"/checks/-","value":{...}}`. Chỉ patch phần bị ảnh hưởng. Script giữ nguyên phần khác và bọc object đã ghép vào array payload đúng stage. Patch không tự tạo knowledge mới hoặc bỏ provenance.

```text
node scripts/ctx/materialize-delta.mjs --run <id> --file candidate/deltas/<file>.json
node scripts/ctx/validate-run.mjs --run <id> --stage <kb|profile|checklist>
```

Script chỉ đọc base trong knowledge, chỉ ghi candidate trong run. Hash lệch hoặc patch precondition sai → dừng, đọc lại base và giao producer cập nhật delta; không ghi đè. Materialize có thể chạy lại cùng delta khi base không đổi, không nhân đôi item. Sau materialize, downstream vẫn dùng đường dẫn cũ; reviewer đọc đầy đủ candidate và kiểm carry-forward như trước. Không đổi thứ tự normalizer → profile → checklist → diff → reviewer.

## Đo context

Chạy `node scripts/ctx/context-metrics.mjs --run <id>` trước dispatch và lúc kết thúc để xem kích thước artifact/pack; stdout chỉ có tổng theo nhóm, không in nội dung. Báo cáo `review/context-metrics.json` là thống kê bytes, không phải token đã dùng hay context occupancy.

Nếu runtime cung cấp usage, ghi `review/runtime-usage.json` với danh sách theo agent/stage/attempt: input/output/cached token, compactions và thời điểm; giữ nguyên cách định nghĩa của runtime. Không có telemetry thì để null, không suy token hoặc phần trăm tiết kiệm từ bytes. So sánh run cùng loại/scope trước và sau thay đổi.

## Builder gộp và retry theo pha

`feature-context-builder` sở hữu cả profile và checklist; hai schema, output paths và gate C4/C5 vẫn riêng. Otto dispatch `stage: all` cho lần đầu. Trong cùng worker: profile → materialize → validate profile + tự kiểm C4 → checklist → materialize → validate checklist + tự kiểm C5. Worker có Bash để chạy đúng helper; Otto xác nhận lại `--stage profile,checklist` trước downstream. Script materialize do worker gọi vẫn là ngoại lệ tất định có giới hạn, không cho phép sửa artifact của producer khác.

Retry checklist dùng `stage: checklist`, chỉ đọc profile đã đạt C4 và giữ nguyên bytes của nó. Retry profile dùng `stage: all` cho scope lỗi: đánh dấu checklist scope đó không còn hợp lệ trong checkpoint, hoàn thành lại cả hai pha trước diff/review. Chỉ mở rộng sang feature phụ thuộc nếu có bằng chứng dependency bị ảnh hưởng. Finding của reviewer trỏ `producer: feature-context-builder` kèm `stage: profile|checklist` và feature; đường dẫn artifact vẫn phân biệt hai pha. Artifact lịch sử giữ nguyên producer cũ, không sửa run đã hoàn tất.

## JSON index và đọc có giới hạn

```text
node scripts/ctx/context-index.mjs --run <id> --file runs/context/<date>/<id>/candidate/product-kb/<feature>.json
node scripts/ctx/context-index.mjs --run <id> --file <workspace-path> --pointer /payload/kb_candidates/0 --sha256 <source-hash>
```

Index dưới `input/artifact-index/<hash>/` gồm manifest và trang nhỏ chứa ID, JSON Pointer, shape và bytes. Nó không copy statement/evidence. Đọc trang cần để chọn ID, rồi đọc pointer tương ứng; output giới hạn mặc định 12 KB, tối đa 20 KB. Selection quá lớn phải đọc pointer hẹp hơn. File nguồn đổi thì tạo index lại. Không dựa index để kết luận nội dung đúng; reviewer vẫn đọc mọi evidence bắt buộc.

## Runtime model và compaction

Claude defaults của repo nằm ở `.claude/settings.json`; model/effort theo vai trò nằm duy nhất trong frontmatter agent. Window compact đặt 650,000 token; đây là mức trần vận hành, không phải mục tiêu phải lấp đầy context. Claude có thể cap theo model hoặc bị môi trường/launch flag override. Nếu model thực không có window lớn thì không ép lên 650k bằng cách khai window giả. Operator có thể chủ động chọn model khác. Dùng `/status`, `/context`, `/tasks` và log để xác nhận cấu hình thực; phiên/worker đang chạy có thể vẫn dùng lựa chọn lúc khởi tạo.

Không dùng `omitClaudeMd` hay per-agent compact field khi chưa xác nhận phiên bản hỗ trợ. Audit ban đầu thấy CLI 2.1.207; cấu hình `autoCompactWindow` ở settings đã có trong schema bản cài, nhưng một số field mới trong tài liệu cần bản cao hơn. Không tự cập nhật CLI hay sửa settings toàn máy. Codex có schema/model catalog riêng, không chép ngưỡng Claude sang Codex; catalog local hiện không mặc định 1M.
