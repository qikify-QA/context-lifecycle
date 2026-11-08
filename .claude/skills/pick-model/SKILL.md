---
name: pick-model
description: Chọn model và effort cho từng subagent khi chạy ctx-run (explore, normalize, review...). Dùng ngay trước khi spawn subagent.
---

# pick-model

Truyền model ở lời gọi Agent. Chỉ truyền effort từng invocation khi runtime hỗ trợ; kiểm version/capability trước, không giả định có tham số này. Runtime 2.1.207 đã kiểm tra chưa hỗ trợ effort riêng mỗi Agent; dùng effort của session hoặc operator chọn runtime phù hợp. Mặc định của repo ở `.claude/settings.json`.

| Việc | model | effort |
|---|---|---|
| Cơ học, dedup, đối chiếu ref, kiểm format | script, không gọi model | — |
| Explore runtime (portal/storefront/api/db/code), doc-ingest, scope-planner, profile, checklist | sonnet | medium |
| Normalize (fan-in, gán `knowledge_kind`/confidence), diff có ca mơ hồ | opus | high |
| Review độc lập trước publish | opus | high |

- CCR nhỏ (một object, ít claim): hạ một bậc effort so với bootstrap lớn.
- Retry: đọc lỗi trước. Thiếu field, lỗi format, lock hoặc auth thì sửa input/config; chỉ tăng model/effort khi có bằng chứng thiếu năng lực suy luận, ghi lý do.
- Đừng bật context 1M mặc định; chỉ khi input thực sự lớn (nhiều doc, shard lớn).
- Respect lựa chọn của operator và policy môi trường nếu khác bảng.
