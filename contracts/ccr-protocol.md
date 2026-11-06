# CCR protocol (§12.1–§12.4)

Phần của contract (`contracts/qa-context-contract.md`) về Context Change Request. QA member không sửa `knowledge/`; khi phát hiện context thiếu/sai/cũ/mâu thuẫn trong lúc test, họ gửi CCR, và `qa-context-lifecycle-orchestrator` là bên duy nhất quyết định CCR có vào canonical context hay không.

Khuôn CCR đầy đủ thuộc skill `create-ccr` (`references/ccr-template.md`), dùng chung cho mọi product. Repo này chỉ cấp phụ lục product-specific ở `contracts/ccr-product-appendix.md`. Tên mục trong khuôn là khoá đọc của orchestrator — không đổi tên mục.

## 12.1 Kênh

**Trigger duy nhất của luồng tự động:** người gửi (hoặc người phụ trách) kéo card **Proposal** từ `Todo` sang `In Progress` trên tab "Context Builder Board" của QA Hub.

1. **Soạn nháp trên task:** người gửi đính kèm 1 file CCR markdown vào task liên quan trên QA Hub (field CCR). Sửa được nhiều lần trước khi Submit.
2. **Submit → 1 Proposal mới** (id `CBS-<n>`): QA Hub chỉ kiểm file không còn placeholder `<<< ... >>>`, rồi copy nội dung vào Proposal. Proposal **immutable** — sửa file trên task sau đó không đổi Proposal đã tạo. Mỗi task chỉ Submit được **một lần**; sau đó draft bị khoá. Proposal vào cột `Todo`. **Sửa CCR:** Proposal `blocked` (vd sau `NEEDS_INFO`, nhiều conflict hoặc nhiều claim S0) thì thay file bằng `replace_proposal_file`: giữ nguyên id, Proposal về `Todo`, rồi kéo lại sang In Progress. Proposal đã `published`/`completed` không thay file được: tạo Proposal sửa bằng `create_proposal`, mỗi claim bắt buộc ghi `SUPERSEDES`/`CONTRADICTS <kb_id>` để plan có `target_kb_ids` và dedup bắt được bản trùng. Orchestrator coi đó là nội dung mới: mở run mới, không coi là vi phạm, `results` cũ vẫn nằm trong run trước.
3. **Kéo Proposal sang `In Progress`** = sẵn sàng cho orchestrator nhặt. Proposal ở `Todo` không được nhặt.

**Nhặt Proposal — vòng quét multi-product:**

1. `products = activeProducts()` từ `config/products/` (`scripts/lib/product-config.mjs`).
2. Với **mỗi** product, gọi tool của đúng MCP server khai ở `qa_hub.mcp_server` của product đó: `mcp__<mcp_server>__list_context_board_proposals({ status: "in-progress", project_id: <qa_hub.project_id> })`. **Không bao giờ** gọi thiếu `project_id`. Lỗi/401 ở một product → ghi log và tiếp tục product khác.
3. Dựng map `project_id → product_key`. Proposal có `projectId` không nằm trong map → bỏ qua, ghi log, không xử lý.
4. Với mỗi Proposal: `get_proposal({ proposal_id })` → `{ id, projectId, sourceTaskId, filename, status, submittedBy, submittedAt, content, ... }`. `content` là text thô của file CCR tại thời điểm Submit; đọc nó theo cấu trúc mục của khuôn `create-ccr`. `sourceTaskId` chỉ để tham chiếu ngược.
5. **Product trước, object sau:** product đã biết từ `project_id`; `object_key` resolve qua `knowledge/products/<product_key>/_registry.json` của **đúng product đó**. Hai product có thể dùng chung tên object (`order`, `product-base`), nên resolve ngược lại sẽ map sai.
6. Thứ tự thử: `node scripts/ctx/intake.mjs --proposals <file>` xếp theo mức gấp (CCR mục 4.4) rồi `submittedAt`. Claim lock theo object (§16) → mỗi (product, object-set) là một run độc lập. Proposal không đụng cùng object chạy song song; Proposal claim lock sau nhận `DEFERRED` với `results.reason: "locked_by_run"` — **không** phải `CONFLICT`, vì đây không phải mâu thuẫn knowledge.

**1 run = 1 Proposal = 1 product.** CCR chạm nhiều product → `NEEDS_INFO`: "Phần đầu (CCR chạm nhiều product: X, Y — tách thành 1 CCR mỗi product)".

**Chạy tay (không qua board):** đặt file CCR vào `inputs/ccr-drafts/` rồi gọi orchestrator với đường dẫn file. Product lấy từ phần product/object của CCR; object phải khớp đúng một `_registry.json` của một product ACTIVE, không khớp hoặc khớp nhiều → `NEEDS_INFO` "Phần đầu". Run chạy tay không có `proposal_id` thì không gọi tool phản hồi board; kết quả trả trong response của orchestrator.

## 12.2 Triage — 5 kết cục

| Kết cục | Nghĩa | Board status | `results` chứa gì |
|---|---|---|---|
| `ACCEPTED` | Đủ evidence, vào context | `published` | `summary`, `published_context_version`, `product_kb_refs`, `feature_profile_refs`, `checklist_refs`, `feature_summary_refs`, `release` (`{ status: "pending" }`, xem dưới) |
| `NEEDS_INFO` | Thiếu thông tin để quyết | `blocked` | `summary`, `open_questions` (nêu **đúng tên mục** còn thiếu) |
| `CONFLICT` | Mâu thuẫn **nghiệp vụ** với knowledge hiện có | `blocked` | `summary`, `conflicts` (cả hai phía kèm evidence) |
| `REJECTED` | Không vào context | `blocked` | `summary` nêu lý do |
| `DEFERRED` | Đúng nhưng chưa làm bây giờ — gồm cả lý do vận hành | `blocked` | `summary` nêu điều kiện để làm lại, `reason` (bảng dưới) |

Board chỉ có 5 outcome cố định, nên lý do chi tiết đi trong `results.reason` (và field kèm theo):

| `results.reason` | Outcome | Khi nào | Field kèm |
|---|---|---|---|
| `locked_by_run` | `DEFERRED` | object đang bị run khác giữ lock lúc bắt đầu | `held_by: {ctx_run_id, proposal_id}` — kéo Proposal lại sau khi run kia xong |
| `lock_lost` | `DEFERRED` | lock hết hạn/mất trước bước publish | `lock_problems` — chạy lại run |
| `object_has_no_base` | `DEFERRED` | object chưa bootstrap nên chưa ingest CCR được | `action: "bootstrap_required"`, `object`, `scope` — operator mở run bootstrap, xong thì kéo Proposal lại |
| `duplicate_of` | `REJECTED` | **mọi** claim trùng với CCR đang chạy hoặc đã publish (`dedup.mjs`) | `duplicate_of: [{proposal_id, claim_key}]` |
| `awaiting_decision` | `DEFERRED` | cần người quyết (approval, `requires_human_decision`) | `approval_needed: [...]` |

Board status của Proposal có 5 giá trị: `todo` · `in-progress` · `blocked` · `published` · `completed`. Toàn bộ pipeline (kể cả reviewer) chạy trong lúc Proposal ở `in-progress`. Không bao giờ set `published` cho outcome khác `ACCEPTED`.

- `published`: run đã duyệt và đã ghi vào `knowledge/` local. **Chưa** có nghĩa team dùng được.
- `results.release`: mốc phát hành. `{ status: "pending" }` lúc kết thúc run; `{ status: "released", pr, sha, tag }` sau khi PR merge vào `qa-knowledge`. Proposal vẫn ở `published`.
- `completed`: QA đã tự review knowledge sau publish và **tự kéo** sang. Orchestrator không bao giờ set trạng thái này. QA review khi `release.status` đã là `released`, để xem đúng bản team đang dùng.

## 12.3 Gate C0 từ CCR

Gate C0 cần 5 thứ, nhưng **CCR chỉ cung cấp 2**. Ba thứ còn lại là chính sách của bên sở hữu môi trường — người gửi không có cơ sở để quyết và **không được hỏi**:

| C0 cần | Nguồn |
|---|---|
| product | `project_id` của Proposal (§12.1 bước 5); chạy tay thì từ CCR |
| object target | Phần đầu + field "Object / feature" của từng khối, map qua `_registry.json` |
| environment | **Cố định** = `config/products/<key>.json` → `environments.default`. Khác biệt giữa các môi trường đi qua khối B, xem §12.3c |
| role dùng để explore | Orchestrator tự chọn theo `defaults.role` của product; role người gửi là dữ kiện |
| mutation policy | Orchestrator tự áp theo §7 |

Object map sang target qua `_registry.json`.

Trả `NEEDS_INFO` **chỉ** khi không xác định được object, và nêu đúng tên mục (vd "Khối A, CLAIM-02, Object / feature"), không nói chung chung.

Mục không chặn run nhưng quyết định chất lượng đầu ra — trống hoặc "không rõ" thì ghi vào `unknowns`, đừng tự suy:

- Claim không có người xác nhận và không có nguồn thì không bao giờ là `S3`.

**Tương thích ngược:** CCR khuôn cũ (Phần 1a, 2a, 2b, 5.1) vẫn xử lý được: Phần 1a là khối A, 5.1 là block của claim, 2a là khối B. Thiếu cột `Claim ID` → orchestrator tự đặt `CLAIM-01..n` theo thứ tự dòng bảng, `claim_id_source: "positional"`. Thiếu Phần 5.1 → mọi claim về `S1`/`S0`. Thiếu Phần 2a/2b → ghi vào `unknowns`. Không trả `NEEDS_INFO` chỉ vì thiếu cột/mục mới.

## 12.3a Gate C0.5 — CCR Source Strength Assessment

Chạy ngay sau C0 và **sau khi đã khoá lock** (§16), trước khi dispatch bất kỳ agent nào. Đánh giá **từng claim** ở khối A, B, D — từng claim một, không gộp cả CCR.

| Bậc | Nguồn | Hệ quả |
|---|---|---|
| `S3` | Một nguồn `confirmation_source` hợp lệ (§3: `spec_doc` · `dev_doc` · `po_dev_confirm` · `test_case`), có locator + `authored_on` + trích **nguyên văn** trong block của claim, kèm link khi nguồn có link | Normalize thẳng, **0 explorer**, `CONFIRMED_EXPECTED` kèm `confirmation_source`, được supersede (§12.5) |
| `S1` | Ảnh/HAR/API capture do người gửi tự chụp, không kèm nguồn `S3` | Normalize thẳng thành `OBSERVED_CURRENT` + `confidence: LOW` + OQ `NEEDS_CONFIRMATION` trỏ về `kb_id`. **Không explore**, không làm oracle |
| `S0` | Chỉ lời kể, không artifact, không link | Không nạp; nêu trong `results.open_questions` với đúng tên mục. Ngoại lệ: claim khác biệt môi trường, xem §12.3c |

Explore chỉ chạy khi operator yêu cầu tường minh cho một claim — khi đó run thành `INCREMENTAL_UPDATE` (§10a, mode settling).

Nguồn `test_case` còn cần **căn cứ expected** trong block của claim: ticket, comment, spec hoặc câu trả lời PO/Dev mà expected của case dựa vào. Thiếu hoặc ghi `KHÔNG CÓ` thì xếp `S1`, vì PASS chỉ chứng minh hành vi khớp expected, không chứng minh expected đúng. Áp dụng cho CCR theo khuôn có mục này; item đã publish giữ nguyên. `po_dev_confirm` phải là người thật trích nguyên văn có ngày, lời tóm tắt của agent là `S0`.

`authored_by` của nguồn `S3` loại `spec_doc` / `dev_doc` không được trùng người gửi CCR — người gửi không tự làm authority cho chính mình. `po_dev_confirm` không có giới hạn này: PO, Dev hay QA chốt đều tính, kể cả QA là người gửi (chủ repo chốt 2026-11-05). `test_case` là ngoại lệ: nó là record chạy thật trên hệ thống quản lý test (Testlane), không phải ý kiến người viết, nên test case PASS do chính người gửi chạy vẫn là `S3` khi có đủ id test case + kết quả PASS + ngày chạy + build/bản đã test (chủ repo chốt 2026-10-11).

**Kiểm trùng:** sau khi ghi plan, chạy `node scripts/ctx/dedup.mjs --run <id>`. Claim trùng (cùng object, chung `target_kb_ids` hoặc cùng `confirmation_source`) với CCR đang `IN_PROGRESS`/`PUBLISHED` → bỏ claim đó khỏi run và nêu trong `results`; mọi claim đều trùng → `REJECTED` + `reason: duplicate_of`. `covered_by_open_question` chỉ là thông tin, không loại claim.

Với mỗi claim: copy evidence vào `raw/ccr-evidence/<claim_key>/` (`claim_key` = `<proposal_id>__<CLAIM-nn>`); toàn văn Proposal vào `raw/ccr-evidence/_ccr-full-content.md`.

**Output bắt buộc — `input/ccr-fastpath-plan.json`** (tên file giữ vì lý do lịch sử):

```json
{ "proposal_id": "CBS-007",
  "product_key": "<product>",
  "object_key": "<object>",
  "assessed_at": "2026-09-30",
  "mode_settled": "CCR_INGEST",
  "claims": [
    { "claim_id": "CLAIM-01",
      "claim_key": "CBS-007__CLAIM-01",
      "claim_id_source": "declared | positional",
      "description": "...",
      "strength": "S3 | S1 | S0",
      "reason": "...",
      "confirmation_source": { "type": "dev_doc",
        "ref": { "citation": "...", "locator": "...", "url": "...", "authored_by": "...", "authored_on": "2026-09-29", "quote": "..." },
        "derivation": "prose" },
      "shipped": "SHIPPED | NOT_SHIPPED | UNKNOWN",
      "kb_address": { "feature_key": "<feature-key>", "feature_is_new": false,
                      "scope": { "environment": "<environments.default>", "role": "...", "surface": "..." } },
      "relation": "ADD | SUPERSEDES | CONTRADICTS | UNKNOWN",
      "target_kb_ids": ["KB-126"],
      "environment_difference": { "type": "ALTERNATIVE_SETUP | NOT_TESTABLE | DIFFERENT_VALUE", "test_env": "...", "production": "...", "how_to_test": "..." },
      "required_explorers": [] } ],
  "overall_decision": "..." }
```

`environment_difference` chỉ có ở claim khác biệt môi trường (§12.3c). `shipped`, `kb_address`, `relation`, `target_kb_ids` là input bắt buộc của §12.5 — không có chúng thì supersede không tất định. `confirmation_source` chỉ có ở claim `S3`. File này thuộc `runs/`, không copy sang `knowledge/`.

`context-quality-reviewer` audit lại từng claim (`contracts/gates.md`, audit source-strength): `confirmation_source` thiếu key hoặc `ref` không resolve về nguồn thật → claim đó không được publish làm `CONFIRMED_EXPECTED`, hạ xuống `PROPOSED` + OQ. Ở `CCR_INGEST` không có lane explore để quay lại.

## 12.3b Open question và ops-board

Mọi `NEEDS_CONFIRMATION`/`CONFLICT`/`OPEN_ISSUE` phát sinh trong run phải vào `open-questions.md` của object, đúng `oq_id` + `type` (§5a), **trước khi** reviewer chạy — thiếu là BLOCKING. Không cần bước push riêng: `ops-board/server.mjs` đọc `open-questions.md` của object đang xử lý ở mỗi lần load board.

## 12.3c Setup và khác biệt môi trường trong CCR

Định nghĩa và nơi ghi ở contract §5b. CCR mang hai mục:

- **Khối B:** mỗi dòng là một claim. Orchestrator ghi `environment_difference` vào claim đó trong plan.
- **Setup:** của một feature nằm ở claim khối A; mức product nằm ở khối C. Khuôn cũ có "Phần 2b": dòng áp dụng cho feature đi như claim, dòng mức product đưa vào guide.

Claim có `environment_difference` đánh giá nguồn như mọi claim, nhưng khác hệ quả:

| Bậc | Hệ quả |
|---|---|
| `S3` | `CONFIRMED_EXPECTED`, như claim thường |
| `S1`, `S0` | Vẫn nạp: `INFERRED` + `confidence: LOW` + OQ `NEEDS_CONFIRMATION` trỏ về `kb_id`. Không làm oracle |

`S0` được nạp vì phần lớn khác biệt loại này là kinh nghiệm vận hành, không có artifact, trong khi thiếu nó người test sẽ báo `FAIL` sai. Evidence của claim `S0` là dòng khối B, copy vào `raw/ccr-evidence/<claim_key>/`. Muốn ghi nhận phía môi trường test là quan sát thật thì operator yêu cầu explore cho claim đó (§12.3a).

**Khối C:** dòng ở đây không phải claim, không qua C0.5 và không vào KB. Orchestrator áp vào file được nêu ở bước prose (`.claude/orchestrator/publish.md` §3). Nội dung trái contract §5b, §5c thì không áp, nêu trong `results`. CCR có cả claim và khối C chạy trong cùng một run; run không được publish thì khối C cũng không vào knowledge.

CCR chỉ có khối C, hoặc khối D toàn `KHÔNG CÒN ÁP DỤNG`, không tạo run: xử lý theo `.claude/orchestrator/ccr-intake.md` §2b.

## 12.3d Khối D — trả lời open question

| Kết quả | Xử lý |
|---|---|
| `XÁC NHẬN HÀNH VI` | Đi như claim khối A, kèm `answers_oq` trong plan. Publish thì gỡ entry OQ, thêm dòng CHANGELOG `Resolved OQ-xxx` |
| `CHỌN side_a`, `CHỌN side_b` | Ghi vào `input/approvals.json` như quyết định của người phân xử (§12.5), rồi gỡ OQ |
| `KHÔNG CÒN ÁP DỤNG` | Gỡ entry OQ, CHANGELOG ghi lý do. Không tạo item KB |

`OQ-ID` không có trong `open-questions.md` → bỏ dòng đó, nêu trong `results`.

## 12.4 Quy tắc bắt buộc

0. **Lock trước, làm sau** (§16): claim lock mọi object bị ảnh hưởng ngay khi xác định được object, trước C0.5. Lock mất giữa chừng → không publish, `DEFERRED` + `reason: lock_lost`.
1. **Không tự resolve conflict** (§8) — áp cho mode explore và cho product có `supersede_policy.enabled: false`. Item conflict không được làm oracle; ghi vào KB dạng `status: UNRESOLVED` + `conflict_group`, kèm OQ `CONFLICT`. **Ngoại lệ duy nhất:** `CCR_INGEST`/`DOC_BOOTSTRAP` của product có `supersede_policy.enabled: true` → áp §12.5 (`contracts/supersede.md`); ở đó orchestrator vẫn không phán xử nghiệp vụ, chỉ áp kết quả tất định.
2. **Độ mạnh nguồn quyết định `knowledge_kind`, không phải việc nó là CCR.** Người gửi quan sát thấy điều gì đó không tự biến nó thành expected behavior.
3. **Publish từng phần được phép:** phần không bị chặn vẫn publish, phần bị chặn ghi rõ lý do. Không giữ cả update lại vì một item.
4. **Phản hồi luôn về đúng Proposal đang xử lý** (không phải task gốc), qua MCP server `qa_hub.mcp_server` của product:
   - Gate C0 fail ngay từ đầu → `update_context_board_proposal({ proposal_id, status: "blocked", results, note })`, không chạy pipeline.
   - Trong lúc chạy: chỉ được cập nhật `note`/`results.summary` (tiến độ), giữ `status: "in-progress"`.
   - Kết thúc: `finish_context_board_proposal({ proposal_id, outcome, results, note })` theo bảng §12.2. Bị chặn ở lock (đầu run hoặc trước publish) → `DEFERRED` + `reason`, kể cả khi reviewer đã `publish_allowed: true`.
   - `results` là JSON tự do (`summary` luôn có); QA Hub chỉ lưu và hiển thị, không parse.
5. **`resolved_requests` trong `knowledge/manifest.json` được derive từ `CHANGELOG.md`** (`scripts/lib/changelog.mjs`) — orchestrator chỉ cần ghi dòng CHANGELOG có `ccr_ref` đúng, không ghi tay vào manifest.
6. **Khi run tới trạng thái terminal**, ghi `run-manifest.json.status` và `produced_open_questions: [oq_id, ...]` — mọi `oq_id` run này tạo mới hoặc để mở, không thiếu, không thừa (§15) — rồi release lock.
7. **Không tự escalate ra hệ thống khác** (Jira, Slack, ...) để giải quyết conflict hoặc thiếu thông tin. Kênh phản hồi duy nhất là Proposal; cần escalate thì hỏi operator trước.
