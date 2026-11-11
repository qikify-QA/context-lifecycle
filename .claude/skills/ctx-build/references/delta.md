# Delta, carry-forward và retry theo pha

Áp cho run có base. Run không có base ghi artifact đầy đủ.


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


`feature-context-builder` sở hữu cả profile và checklist; hai schema, output paths và gate C4/C5 vẫn riêng. orchestrator dispatch `stage: all` cho lần đầu. Trong cùng worker: profile → materialize → validate profile + tự kiểm C4 → checklist → materialize → validate checklist + tự kiểm C5. Worker có Bash để chạy đúng helper; orchestrator xác nhận lại `--stage profile,checklist` trước downstream. Script materialize do worker gọi vẫn là ngoại lệ tất định có giới hạn, không cho phép sửa artifact của producer khác.

Retry checklist dùng `stage: checklist`, chỉ đọc profile đã đạt C4 và giữ nguyên bytes của nó. Retry profile dùng `stage: all` cho scope lỗi: đánh dấu checklist scope đó không còn hợp lệ trong checkpoint, hoàn thành lại cả hai pha trước diff/review. Chỉ mở rộng sang feature phụ thuộc nếu có bằng chứng dependency bị ảnh hưởng. Finding của reviewer trỏ `producer: feature-context-builder` kèm `stage: profile|checklist` và feature; đường dẫn artifact vẫn phân biệt hai pha. Artifact lịch sử giữ nguyên producer cũ, không sửa run đã hoàn tất.
