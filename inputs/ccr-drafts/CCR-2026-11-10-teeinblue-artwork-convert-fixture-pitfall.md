# Context Change Request: artwork-convert-fixture-pitfall — chuyển khuôn từ CBS-039 (cảnh báo dựng fixture convert 1.0 sang 2.0)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5572, QA-3409`
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — là cảnh báo dựng fixture cho test convert, không đổi hành vi canon; Proposal gốc CBS-039 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Dựng fixture convert 1.0 sang 2.0 bằng cách sửa field qua API (ví dụ đổi font của layer linked) có thể tự đổi `customization_type` của layer từ "linked" sang "no_customization" ngay trên server, nên tới lúc gọi `bulk-convert-artworks-tool` với `dry_run` layer không còn "linked" và không bị chặn (dễ kết luận nhầm "dry_run không validate"); phải đọc lại layer qua GraphQL ngay sau khi sửa fixture.
- **Object / feature:** artwork/MỚI: artwork-convert-1-to-2 (đề xuất; Thuộc: fixture và kiểm tra convert Artwork 1.0 sang 2.0; Không thuộc: guard của update-artwork-tool). Liên quan CCR bulk-convert (QA-3409) đang mở và layer-duplicate-link-copy.
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant qua token MCP); api (MCP và REST PUT artwork), db (customization_type của layer)
- **Đã ship:** `UNKNOWN` (TIB-5572 Done, production không rõ)
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) và AI, 2026-10-23
- **Locator:** QA-3409 TC-66 (lượt 2 qua API, lượt 3 qua UI), knowledge QA local FACT-182. Rút ra khi đối chiếu hai lượt: lượt 2 cùng kiểu đổi font gọi `bulk-convert-artworks-tool` trả "would-convert" và convert thành công, trái với lượt 3 trên UI thật bị chặn. Chưa tái hiện có chủ đích cơ chế đổi `customization_type`; chưa hỏi Dev; chưa có lời Dev về cơ chế. Ghi chú từ khuôn cũ: không coi đây là bug hay hành vi đúng, chỉ là cảnh báo dựng fixture.
- **OQ:** NEEDS_CONFIRMATION — Việc sửa field qua API (vd đổi font layer linked) tự đổi customization_type từ linked sang no_customization có đúng cơ chế server không (chưa tái hiện có chủ đích, chưa hỏi Dev)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Thận trọng khi dựng fixture để test convert bằng cách sửa field qua API trước khi gọi `dry_run`: 1 số field (vd đổi font của layer linked) có thể tự kích hoạt side-effect đổi `customization_type` từ "linked" sang "no_customization" ngay trên server — tới lúc gọi `dry_run` layer đã không còn ở trạng thái "linked" nữa nên không bị chặn, dễ kết luận nhầm "dry_run không validate". Luôn đọc lại layer qua GraphQL NGAY SAU khi sửa fixture, trước khi gọi convert/dry_run, để chắc còn đúng precondition "linked + nguồn date".
  ```
