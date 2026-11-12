# Context Change Request: artwork-convert-fixture-pitfall — chuyển khuôn từ CBS-039 (cảnh báo dựng fixture convert 1.0 sang 2.0) — rev2 (đối chiếu nguồn 2026-11-12)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5572, QA-3409`
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — là cảnh báo dựng fixture cho test convert, không đổi hành vi canon; Proposal gốc CBS-039 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận.

> Ghi chú rev2: giữ nội dung Proposal CBS-108 (blocked, run CTX-20261111-32). Đã tra spec-hub (log_id 242), Testlane (task TIB-208 = QA-3409) và Jira TIB-5572: không có nguồn S3 nói về side-effect đổi `customization_type`. Claim gốc từ QA/AI nên xếp rule QA có chủ (S2) theo quyết định operator 2026-11-12. Tên cá nhân được thay bằng vai trò.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Dựng fixture convert 1.0 sang 2.0 bằng cách sửa field qua API (ví dụ đổi font của layer linked) có thể tự đổi `customization_type` của layer từ "linked" sang "no_customization" ngay trên server, nên tới lúc gọi `bulk-convert-artworks-tool` với `dry_run` layer không còn "linked" và không bị chặn (dễ kết luận nhầm "dry_run không validate"); phải đọc lại layer qua GraphQL ngay sau khi sửa fixture.
- **Object / feature:** artwork/MỚI: artwork-convert-1-to-2 (đề xuất; Thuộc: fixture và kiểm tra convert Artwork 1.0 sang 2.0; Không thuộc: guard của update-artwork-tool). Liên quan CCR bulk-convert (QA-3409) đang mở và layer-duplicate-link-copy.
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant qua token MCP); api (MCP và REST PUT artwork), db (customization_type của layer)
- **Đã ship:** `UNKNOWN` (TIB-5572 Done, production không rõ)
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA và AI, 2026-10-23
- **Locator:** QA-3409 TC-66 (lượt 2 qua API, lượt 3 qua UI), knowledge QA local FACT-182. Rút ra khi đối chiếu hai lượt: lượt 2 cùng kiểu đổi font gọi `bulk-convert-artworks-tool` trả "would-convert" và convert thành công, trái với lượt 3 trên UI thật bị chặn. Chưa tái hiện có chủ đích cơ chế đổi `customization_type`; chưa hỏi Dev; chưa có lời Dev về cơ chế. Ghi chú từ khuôn cũ: không coi đây là bug hay hành vi đúng, chỉ là cảnh báo dựng fixture.
  - Testlane: task TIB-208 (QA-3409), TC-66 = `TC-TIB-6901` "[Negative] Layer Linked có nguồn là layer Date/Calendar input, linked layer KHÁC design với …", status `passed`, actualResult chỉ "[AI] ✅ AI" (tick đồng bộ, không ngày chạy, không build, không mô tả hai lượt API/UI). Không đủ S3.
  - Jira TIB-5572, comment Dev 2026-10-15 (mô tả PR teeinblue-api #4008): nêu `dry_run` mặc định true và cách map linked layer khi convert, không nói gì về việc PUT/MCP update tự đổi `customization_type`. Xem trích dưới; có thể là một giải thích khác cho lượt "would-convert" (xem OQ).
  - spec-hub (log_id 242): chỉ có rule chung `mcp-areas` (MCP có convert 1.0 sang 2.0), không có rule về side-effect này.
- **Rule QA có chủ:** FACT-182 · owner_role QA · recorded_on 2026-10-23 · locator Proposal CBS-108 CLAIM-01 (+ Testlane TIB-208 / QA-3409 TC-66 = TC-TIB-6901)
- **OQ:** NEEDS_CONFIRMATION — Việc sửa field qua API (vd đổi font layer linked) tự đổi customization_type từ linked sang no_customization có đúng cơ chế server không (chưa tái hiện có chủ đích, chưa hỏi Dev)? — Người trả lời: Dev.
- **OQ:** NEEDS_CONFIRMATION — Theo comment Dev trên TIB-5572, converter map "Share with another layer" có design khác nguồn thành populate layer, và chặn "a linked layer whose source is a date input". Lượt API của TC-66 ra "would-convert" là vì server đã đổi `customization_type` của layer, hay vì sau khi đổi font layer có design khác nguồn nên được map sang populate và không thuộc trường hợp bị chặn? Trường hợp linked layer có nguồn là date input nhưng design khác nguồn thì `dry_run` phải chặn hay cho convert? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Thận trọng khi dựng fixture để test convert bằng cách sửa field qua API trước khi gọi `dry_run`: 1 số field (vd đổi font của layer linked) có thể tự kích hoạt side-effect đổi `customization_type` từ "linked" sang "no_customization" ngay trên server — tới lúc gọi `dry_run` layer đã không còn ở trạng thái "linked" nữa nên không bị chặn, dễ kết luận nhầm "dry_run không validate". Luôn đọc lại layer qua GraphQL NGAY SAU khi sửa fixture, trước khi gọi convert/dry_run, để chắc còn đúng precondition "linked + nguồn date".
  Jira TIB-5572, comment Dev 2026-10-15: "new MCP tool `bulk-convert-artworks-tool` (Artwork server): `artwork_ids` (max 50) or `all: true` for the whole account; `dry_run` defaults to true (preview only)"
  Jira TIB-5572, comment Dev 2026-10-15: "\"Share with another layer\" (linked) — identical design → Linked layer; different design → populate layer."
  Jira TIB-5572, comment Dev 2026-10-15: "Artwork with a toggle + dependency match \"any\", or a linked layer whose source is a date input → `has-dropped-layers` with reason; artwork stays 1.0."
  ```
