---
name: pick-model
description: Chọn model và effort cho từng subagent khi chạy ctx-run (explore, normalize, review...). Dùng ngay trước khi spawn subagent.
---

# pick-model

Truyền `model` và `effort` ở lời gọi Agent; không đặt trong file. Mặc định của repo ở `.claude/settings.json`.

| Việc | model | effort |
|---|---|---|
| Cơ học, đọc/ghi theo mẫu (dedup, đối chiếu ref, kiểm format) | haiku | low |
| Explore runtime (portal/storefront/api/db/code), doc-ingest, scope-planner, profile, checklist | sonnet | medium |
| Normalize (fan-in, gán `knowledge_kind`/confidence), diff có ca mơ hồ | opus | high |
| Review độc lập trước publish | opus | high |

- CCR nhỏ (một object, ít claim): hạ một bậc effort so với bootstrap lớn.
- Retry lần 2 của cùng stage: tăng một bậc (model hoặc effort), kèm lý do trong receipt; không retry mù với cùng cấu hình.
- Đừng bật context 1M mặc định; chỉ khi input thực sự lớn (nhiều doc, shard lớn).
- Respect lựa chọn của operator và policy môi trường nếu khác bảng.
