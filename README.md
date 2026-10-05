# QA Context Lifecycle

Repo này **sản xuất** canonical QA context cho team: Product KB, Feature Profile, Regression Checklist và Feature Summary — tất cả có evidence, có version, có ghi rõ độ tin cậy.

Nó không chạy test. Việc test hằng ngày thuộc về daily test agent riêng của từng QA member.

```
  repo này (chỉ owner ghi)                    team
  ┌─────────────────────────┐
  │ explore portal/API/DB   │
  │  → Product KB           │   publish    ┌──────────────────────┐
  │  → Feature Profile      │ ──────────►  │ qikify-QA/qa-knowledge│ ──► daily test agent
  │  → Checklist            │              │  (read-only, ~6MB)    │     của từng member
  │  → review độc lập       │              └──────────────────────┘
  └─────────────────────────┘                                              │
             ▲                                                             │
             │   CCR: Submit trên QA Hub → kéo Task trên agent board        │
             └─────────────────────────────────────────────────────────────┘
```

---

## Nếu bạn là QA member (chỉ dùng context, không xây)

### 1. Lấy context

```bash
git clone --depth 1 git@github.com:qikify-QA/qa-knowledge.git
```

~6MB. Không cần clone repo này (nó nặng 200MB+ vì chứa toàn bộ evidence).

Cập nhật: `git pull`. Muốn cố định một version để test lặp lại được: checkout theo tag `ctx-YYYY-MM-DD`.

### 2. Đọc `manifest.json` TRƯỚC

Đây là file đầu tiên agent của bạn nên đọc. Nó cho biết có object nào, version bao nhiêu, và **quan trọng nhất: object đó có dùng làm expected result được không.**

```jsonc
{
  "object_key": "sdk",
  "status": "PUBLISHED",              // PUBLISHED | STALE | UNPUBLISHED
  "published_context_version": "3",
  "kb_items": {
    "total": 112,
    "confirmed_expected": 0,
    "confirmed_from_dev_doc": 0,
    "usable_as_oracle": false         // ← đọc kỹ dòng này. Có thể là "DOC_ONLY"
  },
  "issues": ["0 item CONFIRMED_EXPECTED — chỉ dùng cho regression discovery, ..."]
}
```

### 3. Hiểu đúng giới hạn của context này

Đây là phần dễ dùng sai nhất, nên nói thẳng:

**Phần lớn knowledge hiện tại là `OBSERVED_CURRENT` — tức "đã quan sát thấy sản phẩm hiện đang làm như vậy", KHÔNG phải "sản phẩm đúng ra phải làm như vậy".**

| `knowledge_kind` | Nghĩa | Dùng làm expected result? |
|---|---|---|
| `CONFIRMED_EXPECTED` | Có nguồn thẩm quyền xác nhận: spec, tài liệu dev gen từ source, PO/Dev confirm, hoặc test case PASS. `confirmation_source.type` cho biết loại nào | Được — nhưng xem `confirmation_source.type`: `dev_doc` yếu hơn `spec_doc` |
| `OBSERVED_CURRENT` | Chỉ mới quan sát thấy | **Không** |
| `INFERRED` | Suy ra từ evidence, chưa xác nhận | **Không** |
| `PROPOSED` | Đề xuất, chưa có evidence | **Không** |

Dùng `OBSERVED_CURRENT` làm expected result cho một task đang *thay đổi* chính hành vi đó là lỗi nghiêm trọng: test sẽ fail đúng lúc dev làm đúng.

Cái `OBSERVED_CURRENT` dùng tốt: tìm vùng regression, biết feature có những surface nào, biết nên quan sát chỗ nào.

Cũng nên xem `confidence`: `LOW` nghĩa là chỉ một nguồn/một sample duy nhất — không thành quy luật.

Và xem `usable_as_oracle`: giá trị **`"DOC_ONLY"`** nghĩa là mọi item `CONFIRMED_EXPECTED` của object đó được xác nhận **100% bởi tài liệu dev sinh từ source code** — chưa có test case PASS hay quan sát nào xác nhận. Loại tài liệu đó mô tả cả bug như thể đúng. Dùng làm expected result được, nhưng khi lệch thì **đối chiếu spec/PO trước khi kết luận là bug**.

### 4. Không cần mở evidence — knowledge tự chứa

`knowledge/` **không trỏ ra ngoài gói bạn clone**. Không có `evidence_refs`, không có permalink về repo build, không có đường dẫn vào `runs/`. Mỗi KB item tự mang đủ thứ để bạn quyết định dùng hay không:

- `statement` — phát biểu hoàn chỉnh, không phải con trỏ
- `knowledge_kind` + `confidence` + `scope` — có dùng làm expected result được hay không
- `confirmation_source` (chỉ với item `CONFIRMED_EXPECTED`) — **ai/cái gì** đã xác nhận, loại nguồn gì, ngày nào, dạng câu trích dẫn người đọc hiểu được
- `last_updated.ccr_ref` + `CHANGELOG.md` của object — thay đổi nào đưa item này vào

Đây là cố ý: tài liệu dev được gửi theo đợt rồi xoá, Proposal là bản đóng băng của một lần submit, `runs/` bị prune. Một `knowledge/` còn trỏ vào chúng là một `knowledge/` **mục dần mà không ai thấy** — con trỏ vẫn còn, chỉ là không dẫn tới đâu nữa.

Thấy một item không đủ cơ sở để tin? Đừng đi tìm evidence — **gửi CCR** (mục 5). Đó là đường đúng, và nó để lại dấu vết.

### 5. Thấy context thiếu/sai/cũ → gửi Context Change Request

Bạn **không** sửa `knowledge/`. Bạn gửi request trên QA Hub:

1. Dùng skill `create-ccr` — nó mang **khuôn CCR chuẩn** (dùng chung cho mọi product) và tự điền phần lớn form từ chính lần chạy vừa rồi của agent daily-test. Đọc kèm **`how-to-request/ccr-product-appendix.md`** trong bản clone của bạn: phụ lục này nói chính sách environment, danh sách product/object hợp lệ, kênh submit thật và sức ghi đè canon. Giữ nguyên định dạng Markdown, thay hết mọi chỗ `<<< ... >>>` bằng nội dung thật — **đặc biệt là phần trích nguyên văn**, vì sau khi publish thì nguồn gốc (file CCR, Proposal, tài liệu dev) đều xoá được và chỉ nội dung trong CCR sống sót
2. Mở task liên quan trên **QA Hub** (`qa-hub.ownego.com`), field **CCR** — đính kèm file `.md` vừa điền (như đính kèm attachment của task)
3. Bấm **Submit CCR** — QA Hub chỉ kiểm tra thô là file không còn sót placeholder `<<< ... >>>` (không đọc hiểu nội dung). Hợp lệ thì nó tạo **1 Proposal** (immutable, nhảy vào cột `Todo` trên tab "Context Builder Board") **và 1 Task** trên agent board của repo build — task gốc không đổi status
4. Tiêu đề task: `[CCR] <loại> — <object> — <tóm tắt>`
5. **Trigger xử lý: kéo Task trên AGENT BOARD** (`ops-board` của repo build) từ `Todo` sang `In Progress`.

> ⚠️ **Kéo card Proposal trên QA Hub không trigger gì** — tab Context Builder Board chưa hỗ trợ đổi status thủ công. Tài liệu cũ hướng dẫn kéo Proposal là sai. Nhiều CCR → kéo từng cái một.
>
> **Tình trạng 2026-10-02:** MCP server QA Hub chưa expose tool nào của Context Builder Board, nên orchestrator chưa tự nhặt Proposal được. Đường dùng được hiện tại là đưa file CCR trực tiếp cho owner repo build.

Phần lớn form **agent daily-test của bạn tự điền được** từ chính lần chạy vừa rồi (nó đã biết test URL nào, đọc context version nào, tra từ khoá nào, thấy mấy lần). Bạn chỉ cần quyết 4 chỗ: có ai xác nhận đây là hành vi đúng không · bạn KHÔNG đề xuất điều gì · mức độ gấp · đây có đúng là một thứ gỡ độc lập không.

Những thứ **không ai hỏi bạn**: context builder được phép mutate gì trên staging, dùng account nào để explore. Đó là chính sách của bên sở hữu môi trường. Nếu bạn chỉ có quyền storefront mà không có quyền portal, **cứ gửi thứ bạn có** — context builder tự map sang target portal.

Bạn sẽ nhận phản hồi ngay trên task đó (status + note) với 1 trong 5 kết cục: `ACCEPTED` · `NEEDS_INFO` · `CONFLICT` · `REJECTED` · `DEFERRED`. Khi request được publish, version tương ứng ghi trong `manifest.json` → `resolved_requests`.

**Conflict thì sao?** Context builder **không tự chọn bên**. Cả hai phía được giữ lại kèm evidence, và task để ở `blocked` chờ PO/Dev/QA lead phân xử. Đây là cố ý — quyết sai một lần sẽ lan ra mọi test case sinh từ context đó về sau.

---

## Nếu bạn là owner của repo này (xây context)

Chạy local — explorer cần credential staging trong `.env`, session browser, quyền gọi staging API.

```bash
npm run ops-board          # bảng theo dõi state agent: http://127.0.0.1:4177

node scripts/generate-manifest.mjs           # sinh knowledge/manifest.json
node scripts/generate-manifest.mjs --check   # chỉ kiểm, exit 1 nếu có object chưa publish
node scripts/publish-knowledge.mjs           # dry-run: kiểm + chuẩn bị, KHÔNG đẩy
node scripts/publish-knowledge.mjs --push    # đẩy thật sang qa-knowledge
node scripts/prune-runs.mjs                  # báo cáo run nào không còn được KB tham chiếu
```

Đọc trước khi làm bất cứ việc gì: [`contracts/qa-context-contract.md`](contracts/qa-context-contract.md) — luật hiện hành.

Định đổi một luật? Đọc [`DECISIONS.md`](DECISIONS.md) trước: nó ghi **vì sao** luật đó được đặt ra và nó đang chặn cái gì. Vài luật trông thừa là vì chúng chặn một cách hỏng đã xảy ra thật.

### Quy tắc không được phá

- **Chỉ `qa-context-lifecycle-orchestrator` được ghi vào `knowledge/`**, và chỉ sau khi reviewer độc lập cho phép. Subagent ghi vào `runs/context/<date>/<CTX-RUN-ID>/`. Repo này từng có sự cố publish trái phép — xem `runs/_incident-2026-09-10-unauthorized-publish/`.
- **`knowledge/` tự chứa hoàn toàn (§5a).** Không field nào trỏ vào `runs/`, vào tài liệu dev, hay vào bất cứ thư mục nào ngoài gói publish. Xoá `runs/`, xoá doc dev, xoá Proposal — `knowledge/` vẫn dùng được nguyên vẹn.
- **Nhưng đừng xoá `runs/` tuỳ ý.** Lý do **không** phải để bảo vệ `knowledge/` (nó không cần), mà để team còn quay lại được evidence gốc **khi open-question mà run đó để lại chưa được giải quyết** (§15). Dùng `prune-runs.mjs` để biết run nào đủ điều kiện xoá.
- **Không biến `OBSERVED_CURRENT` thành `CONFIRMED_EXPECTED`** nếu không có nguồn thẩm quyền — kể cả khi CCR trích dẫn ticket của dev.
- **Không tự resolve conflict.** Giữ cả hai phía, hỏi authority.

### Cấu trúc

```
.claude/agents/     12 agent: 1 orchestrator + explorer/builder/reviewer
contracts/          contract dùng chung + template input
knowledge/          output đã publish (chỉ orchestrator ghi)
runs/context/       evidence + artifact từng lần chạy
scripts/            manifest, publish, prune
ops-board/          bảng theo dõi state agent (local)
handover/           thiết kế Flow 2 đã tách ra, để mang sang repo daily-test
```
