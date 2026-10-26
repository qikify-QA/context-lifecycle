# Supersede & conflict resolution (§12.5)

Phần của contract (`contracts/qa-context-contract.md`). Áp **chỉ khi** `config/products/<key>.json` → `supersede_policy.enabled: true` **và** mode là `CCR_INGEST`/`DOC_BOOTSTRAP`. Mọi trường hợp khác giữ `contracts/ccr-protocol.md` §12.4 rule 1: không tự resolve conflict.

Phân vai cố định:

- `knowledge-diff-analyzer` **tính** `resolution` cho từng change, tất định từ metadata đã khai.
- `qa-context-lifecycle-orchestrator` **áp** `resolution` khi sinh `candidate/publish-preview/` (`scripts/ctx/publish-strip.mjs`).
- `context-quality-reviewer` **audit** trên preview đã áp (`contracts/gates.md`, audit supersede-validity).

Enum `resolution` = tên kết quả của các STEP bên dưới: `PROPOSED` (STEP 0) · `ADDED` (STEP 1) · `REFRESHED_ONLY` (STEP 2) · `SUPERSEDE` (STEP 6) · `CONFLICTED` (STEP 7). Mã blocker `a`–`f` của STEP 6 dùng trong `supersede_blockers`.

## Hai hàm phụ

```text
rank(item):
  CONFIRMED_EXPECTED và confirmation_source.type ∈ enum §3   -> 3
  OBSERVED_CURRENT                                           -> 2
  INFERRED                                                   -> 1
  PROPOSED                                                   -> 0
  CONFIRMED_EXPECTED nhưng confirmation_source rỗng/thiếu    -> 2

srcDate(item):
  confirmation_source.authored_on nếu là ISO date hợp lệ
  ngược lại -> null          # KHÔNG fallback về last_updated.date
```

Dòng cuối của `rank()` xử lý item legacy `CONFIRMED_EXPECTED` không có nguồn: chúng không được rank 3, cũng không bị một `dev_doc` ghi đè tự động — mọi cặp rơi vào `CONFLICTED`.

## Dùng ngày nào

**Chỉ dùng `confirmation_source.authored_on`**: ngày tài liệu được viết, ngày commit của diff, ngày comment PO/Dev, hoặc ngày chạy test case. Thiếu nó → không supersede, đi thẳng `CONFLICTED`.

Không dùng để so:

- Ngày quan sát của người gửi CCR — nói về lúc nhìn thấy, không nói về độ mới của authority.
- Build/version/ngày deploy — chỉ là guard ở STEP 0; build mới không chứng minh statement mới đúng.
- `Proposal.submittedAt` và ngày run — hành chính.

## Thuật toán

```text
Khớp candidate C với base item B đã publish trong knowledge/.
Khớp bằng: cùng topic (semantic) + cùng scope{environment, role, surface},
HOẶC CCR khai tường minh relation: SUPERSEDES + target_kb_ids.

STEP 0 — GUARD ship
  shipped == NOT_SHIPPED
    -> PROPOSED: C vào KB là knowledge_kind: PROPOSED, không confirmation_source,
       KHÔNG đụng B, OQ type OPEN_ISSUE ("hành vi chưa ship"). DỪNG.
  shipped == UNKNOWN và rank(C) == 3
    -> tiếp tục, nhưng BẮT BUỘC requires_human_decision: true trên diff entry.

STEP 1 — C không khớp base nào        -> ADDED. DỪNG.

STEP 2 — tương đương ngữ nghĩa
  statement tương đương VÀ knowledge_kind giống VÀ scope giống
    -> REFRESHED_ONLY. Cập nhật last_updated; cập nhật confirmation_source nếu
       C có nguồn mạnh hơn hoặc mới hơn. Không dòng CHANGELOG "superseded",
       không OQ. DỪNG.

STEP 3 — so độ mạnh   rc = rank(C), rb = rank(B)
  rc > rb  -> STEP 6        rc < rb  -> STEP 7        rc == rb -> STEP 4

STEP 4 — cùng độ mạnh
  rc == rb == 3:
     srcDate(C) và srcDate(B) đều có:
        srcDate(C) > srcDate(B) -> STEP 6
        srcDate(C) <= srcDate(B) -> STEP 7
     thiếu bất kỳ ngày nào     -> STEP 7
  rc == rb == 2 -> STEP 5
  rc == rb <= 1 -> STEP 7     # hai phỏng đoán không giải quyết được nhau

STEP 5 — cả hai OBSERVED_CURRENT
  -> STEP 7. KHÔNG BAO GIỜ supersede chỉ bằng ngày quan sát.
  (Ngoại lệ RE-OBSERVED_NEWER nằm sau supersede_policy.allow_reobserved_newer; mặc định TẮT.)

STEP 6 — SUPERSEDE
  BLOCKER — bất kỳ cái nào đúng thì lật về STEP 7, bất kể rank và ngày:
   (a) rank(B) == 3 và B.confirmation_source.type == "test_case"
       và C.confirmation_source.type == "dev_doc"
       -> test PASS nói thực tế đã chạy; doc chỉ nói ý định.
          CONFLICTED + requires_human_decision: true.
   (b) diff-analyzer tính impact == HIGH (permission / tiền / mất dữ liệu)
       -> CONFLICTED + requires_human_decision: true.
   (c) B.status == "UNRESOLVED" hoặc B.conflict_group không rỗng
       -> không lặng lẽ đóng một conflict đang mở bằng cách xoá một phía.
          CONFLICTED, route sang RECONCILE.
   (d) B.kb_id đang là oracle STRONG DUY NHẤT của ≥1 check đang publish
       (checklists/<key>.json: oracle.kb_ids chứa B.kb_id và
        oracle_strength == "STRONG") VÀ C.confidence != HIGH
       -> CONFLICTED + requires_human_decision: true.
   (e) C.scope khác B.scope ở environment/role/surface
       -> không cùng một item. Xử lý là ADDED (scope mới), KHÔNG supersede.
   (f) topic ∈ supersede_policy.never_supersede_topics
       -> CONFLICTED + requires_human_decision: true.

  Không blocker nào (publish-strip áp):
   1. Ghi C vào đúng vị trí của B, GIỮ NGUYÊN B.kb_id.
   2. C.last_updated = {date: <ngày publish>, ccr_ref: "<CBS-n>"}
   3. C.confirmation_source = {type, ref, authored_on, derivation}
   4. Thừa hưởng B.related_kb_ids trừ khi C khai đổi tường minh.
   5. XOÁ statement của B khỏi kb.json. Không giữ song song, không status.
   6. CHANGELOG.md thêm đúng 1 dòng, BẮT BUỘC trích NGUYÊN VĂN statement cũ:
        - 2026-09-30 (`CBS-007`, CCR_INGEST) — KB-126 superseded bởi dev_doc
          (authored 2026-09-29). Cũ: "<B.statement nguyên văn>". Mới: "<C.statement>".
   7. Nếu B.kb_id có trong một entry open-questions.md type NEEDS_CONFIRMATION và
      C giờ là CONFIRMED_EXPECTED -> orchestrator gỡ entry đó và thêm dòng
      CHANGELOG "Resolved OQ-xxx" (§15).

STEP 7 — CONFLICTED
  Giữ cả hai statement trong kb.json, cả hai status: "UNRESOLVED",
  cùng conflict_group: "CONF-<CBS-n>-<nn>". Không phía nào làm oracle.
  OQ type CONFLICT với side_a (base) / side_b (CCR).
  Outcome trên Proposal: CONFLICT — hoặc ACCEPTED nếu các claim khác đã
  publish sạch (§12.4 rule 3, publish từng phần).
```

Diff entry `SUPERSEDE` phải mang `kb_id` (base B) và `candidate_kb_id` (C trong candidate shard) — `publish-strip.mjs` dùng đúng hai field đó để áp.

## Quyết định của người (`requires_human_decision`)

Blocker (a), (b), (c), (d), (f) và STEP 0 `shipped: UNKNOWN` không tự giải được — chúng cần người có vai trò trong `config/products/<key>.json` → `owners` (theo object, fallback `default`) quyết. Blocker (e) không phải chuyện cần quyết: scope khác thì là item mới (`ADDED`).

1. Diff analyzer ghi entry `CONFLICTED` + `requires_human_decision: true`. Orchestrator hỏi đúng vai trò owner (qua operator, hoặc note trên Proposal) và **không** tự quyết.
2. Có quyết định → orchestrator ghi `input/approvals.json` (schema `contracts/schemas/approvals.schema.json`): `kb_id`, `decision`, `approver_role`, `ref` (link comment/ticket/tin nhắn có quyết định), `decided_at`. Không ghi tên hay email người — repo build là public.
3. Chạy lại diff analyzer, nó đọc `input/approvals.json`:
   - `ACCEPT_CANDIDATE` → `SUPERSEDE` (kể cả khi có blocker a/b/c/d/f); dòng CHANGELOG ghi thêm vai trò + `ref` của người duyệt.
   - `KEEP_BASE` → claim của CCR bị loại khỏi run (normalizer chạy lại không có nó), nêu trong `results` của Proposal.
   - `KEEP_BOTH` → giữ `CONFLICTED`, OQ `CONFLICT` vẫn mở.
4. Chưa có quyết định → item đó không publish; phần sạch vẫn publish (§12.4 rule 3); Proposal nhận `DEFERRED` + `reason: awaiting_decision` + `approval_needed: [{kb_id, blocker, owner_role}]` nếu không còn phần nào publish được.

Các bước 1–4 chỉ áp cho entry `CONFLICTED`/`SUPERSEDE`. Entry `ADDED` cũng có thể mang `requires_human_decision: true` (item mới chạm permission, mất dữ liệu, P1) — đó là **cờ rủi ro**, không phải điều kiện publish: item vẫn publish theo `knowledge_kind` normalizer đã gán (vd `CONFIRMED_EXPECTED` từ test case PASS) và vẫn được làm oracle; orchestrator mở một OQ `NEEDS_CONFIRMATION` hỏi owner xác nhận ý định, ghi `kb_ids` của item. Owner trả lời ngược với item → xử lý như CCR mới (item đã publish là base).

`validate-run.mjs` chặn mọi `SUPERSEDE` có `requires_human_decision` mà thiếu approval `ACCEPT_CANDIDATE`.

## Ba luật kèm theo

**Giữ nguyên `kb_id` của base là bắt buộc.** `related_kb_ids` và `oracle.kb_ids` của checklist trỏ vào nó; cấp id mới sẽ orphan mọi consumer, im lặng.

**Item cũ đi vào `CHANGELOG.md`, không giữ trong `kb.json`.** Giữ cả hai trong `kb.json` với `status` là định nghĩa của `CONFLICTED` (chưa ngã ngũ); dùng cùng cơ chế cho "đã ngã ngũ, bên cũ thua" làm consumer mất khả năng phân biệt hai trạng thái. Hệ quả: `CHANGELOG.md` cộng git là đường phục hồi duy nhất — nên dòng CHANGELOG phải trích statement cũ nguyên văn.

**Blocker (c) là ma sát có chủ ý.** Một conflict đang mở nghĩa là đã có người biết hai phía chưa ngã ngũ; đóng nó bằng cách xoá một phía dựa trên một nguồn tự động là bỏ qua đúng quyết định mà con người đang nợ.
