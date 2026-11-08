# Dùng QA context — hướng dẫn cho QA member

File này được phát hành kèm repo knowledge ở `how-to-request/consumer-guide.md`. Bạn chỉ **đọc** context; muốn đổi context thì gửi Context Change Request (mục 5).

## 1. Lấy context

```bash
git clone --depth 1 https://github.com/qikify-QA/qa-knowledge.git
```

Cập nhật bằng `git pull`. Muốn cố định một version để test lặp lại được: checkout tag `ctx-YYYY-MM-DD`.

Mới làm với một product thì đọc `products/<key>/_product-guide.md` trước, nếu có: tổng quan, setup, env, cách dựng test data. Cách thao tác ở `_flows/`, đọc theo chủ đề.

## 2. Đọc `manifest.json` trước

File đầu tiên agent của bạn nên đọc. Nó cho biết có product/object nào, version bao nhiêu, và **object đó có dùng làm expected result được không**:

```jsonc
{
  "object_key": "<object>",
  "status": "PUBLISHED",              // PUBLISHED | STALE | UNPUBLISHED
  "published_context_version": "3",
  "kb_items": {
    "total": 112,
    "confirmed_expected": 0,
    "confirmed_from_dev_doc": 0,
    "confirmed_with_valid_source": 0,
    "invalid_confirmed": 0,
    "usable_as_oracle": false         // đọc kỹ dòng này; có thể là "DOC_ONLY"
  },
  "issues": ["..."]
}
```

## 3. Hiểu đúng giới hạn của context

| `knowledge_kind` | Nghĩa | Dùng làm expected result? |
|---|---|---|
| `CONFIRMED_EXPECTED` | Có nguồn thẩm quyền xác nhận (spec, tài liệu dev, PO/Dev confirm, test case PASS) — xem `confirmation_source.type` | Được; `dev_doc` yếu hơn `spec_doc` |
| `OBSERVED_CURRENT` | Mới quan sát thấy sản phẩm *hiện đang* làm như vậy | **Không** |
| `INFERRED` | Suy ra từ evidence, chưa xác nhận | **Không** |
| `PROPOSED` | Đề xuất, chưa có evidence | **Không** |

- Dùng `OBSERVED_CURRENT` làm expected result cho một task đang *thay đổi* chính hành vi đó là lỗi nghiêm trọng: test sẽ fail đúng lúc dev làm đúng. Nó dùng tốt để tìm vùng regression và biết feature có surface nào.
- `confidence: LOW` = một nguồn/một sample duy nhất, không thành quy luật.
- `usable_as_oracle: "DOC_ONLY"` = mọi item có nguồn hợp lệ dùng được của object đến 100% từ tài liệu dev sinh từ source code. Loại tài liệu đó có thể mô tả cả bug như thể đúng: khi lệch, đối chiếu spec/PO trước khi kết luận là bug.
- Item `status: UNRESOLVED` (cùng `conflict_group`) là hai phía chưa ngã ngũ — không phía nào là oracle.
- `scope.brand` khác `null` = hành vi chỉ đúng cho một brand/instance.
- Trước khi test một feature, đọc `entry_points[].precondition` và `environment_differences` trong `profile.json`: config riêng của feature nằm ở đó. `ALTERNATIVE_SETUP` = làm theo `how_to_test`. `NOT_TESTABLE` = không chạy, ghi `NOT_APPLICABLE`, không tính là `FAIL`. `DIFFERENT_VALUE` = test theo giá trị của môi trường đang dùng.

## 4. Knowledge tự chứa — không cần mở evidence

Knowledge không trỏ ra ngoài gói bạn clone. Mỗi KB item tự mang đủ thứ để quyết định:

- `statement` — phát biểu hoàn chỉnh
- `knowledge_kind` + `confidence` + `scope` — dùng làm expected result được hay không
- `confirmation_source` (chỉ item `CONFIRMED_EXPECTED`) — ai/cái gì đã xác nhận, loại nguồn, ngày của nguồn
- `last_updated.ccr_ref` + `CHANGELOG.md` của object — thay đổi nào đưa item này vào

Thấy một item không đủ cơ sở để tin? Gửi CCR (mục 5), đừng đi tìm evidence.

## 5. Thấy context thiếu/sai/cũ → gửi Context Change Request

1. Dùng skill `create-ccr` (cài một lần: `cp -R how-to-request/create-ccr ~/.claude/skills/`; chép lại sau mỗi lần pull nếu thư mục này thay đổi) — nó mang khuôn CCR chuẩn và tự điền phần lớn form từ lần chạy daily-test vừa rồi. Đọc kèm `how-to-request/ccr-product-appendix.md` (product/object hợp lệ, chính sách environment, sức ghi đè canon). Thay hết mọi chỗ `<<< ... >>>`, **đặc biệt là phần trích nguyên văn** — sau khi publish thì file CCR, Proposal và tài liệu gửi kèm đều xoá được, chỉ nội dung trong CCR sống sót.
2. Mở task liên quan trên QA Hub, đính file `.md` vào field **CCR**.
3. Bấm **Submit CCR** → QA Hub tạo một Proposal (`CBS-<n>`) ở cột `Todo` của tab "Context Builder Board".
4. **Kéo Proposal sang `In Progress`** khi sẵn sàng — đây là tín hiệu duy nhất để context builder nhặt CCR.

Guide, `_flows/` hoặc `_env.example` thiếu hay cũ thì ghi ở khối C của CCR. CCR gồm phần đầu và 4 khối (A hành vi, B môi trường, C guide và flow, D trả lời open question), chỉ giữ khối có dùng. Không ai hỏi bạn về mutation policy hay account explore — đó là chính sách của bên sở hữu môi trường. Chỉ có quyền storefront mà không có quyền portal thì cứ gửi thứ bạn có.

Kéo card chưa làm context builder tự chạy: operator nhặt các card đang `In Progress` theo lịch trong README của `context-lifecycle`.

Kết quả trả về trên chính Proposal: `published` (kèm version mới) hoặc `blocked` kèm 1 trong `NEEDS_INFO` · `CONFLICT` · `REJECTED` · `DEFERRED`. `published` nghĩa là đã duyệt, chưa chắc đã vào repo này: xem `results.release.status`, `released` kèm `sha` mới là team dùng được. Khi đó QA tự review knowledge, ổn thì kéo Proposal sang `Completed`. Khi được publish, `manifest.json` → `resolved_requests` ghi CCR của bạn.

**Conflict thì sao?** Context builder không tự chọn bên (trừ khi product cho phép ghi đè — xem phụ lục mục 5). Cả hai phía được giữ, Proposal ở `blocked` chờ PO/Dev/QA lead phân xử.

## Định danh và kiểm tra oracle

Reference mới dùng `object/feature#KB-ID`, hoặc `object/_object-level#KB-ID`; không gộp KB chỉ theo ID vì ID cũ có thể trùng giữa feature. Reference cũ được resolve trong feature hiện tại trước, rồi object-level, rồi chỉ khi duy nhất trong object; mơ hồ phải dừng. Chưa có migration đổi hàng loạt ID.

`confirmed_expected` là số nhãn, không phải số oracle hợp lệ. `confirmed_with_valid_source` loại item thiếu nguồn, ngày sai/tương lai, conflict và known defect; `invalid_confirmed` thể hiện phần bị loại. `usable_as_oracle: true` vẫn cần kiểm từng check và scope, không có nghĩa toàn bộ object đã READY. Item legacy thiếu nguồn không được dùng làm STRONG oracle.

## Khi dữ liệu còn chờ xác nhận

- `observation_guidance` giữ nội dung quan sát hoặc expected cũ chưa có căn cứ; không dùng để chấm pass/fail. Với oracle NONE, `expected_result` để rỗng và check phải NEEDS_CONFIRMATION, có `oq_id` mở được.
- `expected_result_basis: BASELINE_NOT_REQUIREMENT` nghĩa là nội dung dựa trên implementation hiện tại, chưa đủ chốt requirement.
- `reference_issues` giữ reference không resolve được hoặc authority còn thiếu, kèm `oq_id`. Các reference lỗi đã được loại khỏi liên kết đang hoạt động, không bị xoá dấu vết. Profile có `context_status: NEEDS_CONFIRMATION` cần xử lý các mục này trước khi dựa vào phần liên quan.
- KNOWN_DEFECT đi vào `regression_watch_kb_ids`, không vào oracle. Bản sửa dữ liệu không đồng nghĩa sản phẩm đã sửa defect hoặc PO/Dev đã xác nhận các câu hỏi.
