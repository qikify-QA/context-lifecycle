# CCR — phụ lục product (repo `context-lifecycle`)

**Khuôn CCR đầy đủ KHÔNG nằm ở đây.** Nó thuộc skill `create-ccr` (`references/ccr-template.md`) và dùng chung cho mọi product. File này chỉ cấp những thứ **chỉ repo này biết**, để người gửi và skill không phải đoán.

Lý do tách: trước đây repo giữ một bản khuôn đầy đủ thứ hai. Skill thì tìm nó ở `contracts/context-change-request.template.md`, còn QA member lại nhận nó ở `how-to-request/` trong bản clone của họ — nên khi skill chạy ở repo consumer, nó **không tìm thấy** và âm thầm rơi về bản bundled. Hai khuôn đầy đủ song song thì chắc chắn trôi xa nhau, và tên mục lệch nhau làm lời `NEEDS_INFO` của orchestrator trỏ vào mục không tồn tại. Một khuôn, một phụ lục.

---

## 1. Product nào thuộc repo này

Tập product repo này chịu trách nhiệm = các file `config/products/*.json` có `status: "ACTIVE"`.

| `product_key` | Nhãn | Key trên QA Hub | Nguồn knowledge |
|---|---|---|---|
| `teeinblue` | Teeinblue | `TIB` | explore portal/API/DB/storefront |
| `qikfiliate` | Qikfiliate | `QAF` (project `qik-affiliate`) | tài liệu dev (doc-first) — **đang onboarding** |
| `imagenhub` | ImagenHub | `IGH` (project `imagenHub`) | KB do QA biên soạn trên Testlane project context (doc-first) |
| `mailtro` | Mailtro | `MTRO` (project `mailtro`) | inventory staging (project context) + business rule & KB MTRO (knowledge) do QA biên soạn trên Testlane (doc-first) |
| `duos` | Duos B2B | `DUOS` (project `duos b2b`) | inventory staging (project context) + business rule & KB DUOS (knowledge) do QA biên soạn trên Testlane (doc-first) |

`object_key` hợp lệ tra ở `knowledge/products/<product_key>/_registry.json`. Không khớp cái nào → mô tả bằng lời, **đừng bịa**.

**Qikfiliate phục vụ nhiều brand** (koin-partners là một instance). Claim chỉ đúng cho một brand phải nói rõ brand nào — nó sẽ được ghi vào `scope.brand` thay vì publish như hành vi cốt lõi.

---

## 2. Chính sách environment — KHÔNG hỏi người gửi

| Product | Environment context builder dùng |
|---|---|
| `teeinblue` | **Cố định `staging`**. Trỏ production là stop condition. |
| `qikfiliate` | **`documented`** — không có môi trường runtime nào; toàn bộ knowledge đến từ tài liệu. |
| `imagenhub` | **`documented`** — toàn bộ knowledge đến từ project context trên Testlane. |
| `mailtro` | **`documented`** — toàn bộ knowledge đến từ project context + knowledge trên Testlane. |
| `duos` | **`documented`** — toàn bộ knowledge đến từ project context + knowledge trên Testlane. |

Vì vậy mục **"Phần 2 — Environment"** trong CCR chỉ là **dữ kiện** về nơi *bạn* quan sát. Ghi `production` hoặc `không rõ` đều hợp lệ và **không bao giờ** là lý do bị trả `NEEDS_INFO`.

Tương tự, những thứ **không hỏi người gửi**: mutation policy, account dùng để explore, có capture network/DB không. Đó là chính sách của bên sở hữu môi trường (`config/products/<key>.json`).

---

## 3. Kênh submit thật — đọc kỹ, tài liệu cũ đã sai

Submit CCR tạo đồng thời **1 Proposal** trên tab "Context Builder Board" của QA Hub **và 1 Task** trên **agent board** (`ops-board/` của repo này, chạy bằng `npm run ops-board`).

> **Trigger thật là kéo Task trên AGENT BOARD từ `Todo` sang `In Progress`.**
> Kéo card Proposal trên QA Hub **không trigger gì** — tab đó chưa hỗ trợ đổi status thủ công.

Nhiều CCR cùng lúc → kéo **từng cái một** trên agent board, xong cái này mới tới cái kế tiếp.

**Trạng thái hiện tại (2026-10-02):** MCP server `qa-hub-production` chưa expose tool nào của Context Builder Board (`list_context_board_proposals`, `get_proposal`, `update_context_board_proposal`, `finish_context_board_proposal` đều trả `Unknown tool`). Nghĩa là orchestrator **chưa tự nhặt Proposal được**. Trong lúc đó, đường dùng được là **đưa file CCR trực tiếp**: đặt vào `runs/ccr-drafts/` rồi gọi `qa-context-lifecycle-orchestrator`.

---

## 4. Mức độ gấp — nghĩa cụ thể ở repo này

| Mức | Nghĩa |
|---|---|
| `HIGH` | Đang chặn test P0/P1, hoặc một checklist/automation đang publish có thể **chạy sai ngay lúc này** |
| `MEDIUM` | Ảnh hưởng coverage, chưa chặn ai |
| `LOW` | Cải thiện dần, dọn canon |

---

## 5. Sức ghi đè canon (contract §12.5)

| Product | `supersede_policy.enabled` | Nghĩa |
|---|---|---|
| `teeinblue` | `false` | CCR mâu thuẫn canon → **luôn** giữ cả hai phía, chờ người phân xử. Không bao giờ tự ghi đè. |
| `qikfiliate` | `true` | CCR có nguồn **mạnh hơn hoặc mới hơn** có thể **ghi đè** canon; statement cũ chuyển vào `CHANGELOG.md` dạng superseded. |

Bất kể product nào, **6 chốt chặn** ở §12.5 STEP 6 luôn áp: nguồn `test_case` không bị `dev_doc` ghi đè · item chạm permission/tiền/mất dữ liệu luôn cần người quyết · không đóng một conflict đang mở bằng cách xoá một phía · không thay oracle `STRONG` duy nhất của một check bằng nguồn độ tin cậy thấp · scope khác nhau thì là item mới, không phải ghi đè · topic trong `never_supersede_topics` luôn cần người quyết.

Đây là lý do **ngày của nguồn** ở Phần 5.1 phải chính xác: nó là thứ duy nhất dùng để so độ mới. Lấy `resolutiondate` của ticket thay cho ngày tài liệu được viết sẽ làm ghi đè **sai chiều**, và sai im lặng.

---

## 6. Sau khi publish, nguồn gốc xoá được

Theo contract §5a, `knowledge/` **tự chứa hoàn toàn**: sau khi CCR đã được xử lý và publish, bạn có thể xoá file CCR, xoá Proposal, xoá tài liệu dev gửi kèm — `knowledge/` vẫn dùng được nguyên vẹn.

Hệ quả cho người gửi: **mọi thứ cần thiết phải nằm TRONG file CCR**, không phải trong một đường dẫn mà CCR trỏ tới. Cụ thể là phần **trích nguyên văn** ở Phần 5.1 — nó là thứ sống sót, còn link thì không. Một claim chỉ có link mà không có quote sẽ thành provenance rỗng ngay khi nguồn bị dọn.
