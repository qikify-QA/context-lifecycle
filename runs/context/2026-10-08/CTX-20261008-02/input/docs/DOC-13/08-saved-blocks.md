<!-- testlane knowledge KB-378 · kind=feature-profile · tag=Saved blocks · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/08-saved-blocks.md · createdAt=2026-10-08T08:01:10.058Z · updatedAt=2026-10-08T08:01:10.058Z -->

# 8. Saved blocks (`/saved-blocks`, `Save as Block`, `Browse saved blocks`)

**Status:** draft

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.8 (staging 01/10/2026: list **rỗng**; bảng, editor, dialog `Used in` giữ quan sát 29/09), task QA Hub **MTRO-023** (Not Ready 8/14, 11 GAP Major, 85 case chưa chạy — BR-01…BR-27 lấy từ comment Dev haild 08/09 và 02/10, **không có PO xác nhận thêm**), Jira MTRO-89 (QA Review) và MTRO-107 (In Progress), repo `03-templates/saved-blocks.md` (viết 02/10). Status `draft` vì: PR #27 (nút `New saved block`, cảnh báo detach) chưa thấy trên staging 01/10 và đồng bộ phía BE "chưa bắt đầu" tại 08/09 (GAP-01, GAP-02).

## Purpose

Lưu một khối email (vd header / footer) một lần rồi chèn vào nhiều email; sửa bản gốc thì mọi email đang link nhận nội dung mới — kể cả mail gửi đi sau đó.

## Business Rules

### Trang Saved blocks — staging 01/10 + 29/09 (giữ)

- Sidebar Email library › `Saved blocks`; h1 `Saved blocks`, "Sections you reuse across emails — a footer saved once, inserted everywhere."; breadcrumb chỉ `Saved blocks`.
- Empty: `No saved blocks yet` / "Open a template, pick the blocks you want to reuse, and save them as a block. They show up here." Staging 01/10 trang list **không có nút tạo**.
- Bảng (29/09): `Name` (link `/saved-blocks/:id`) · `Category` (trống: `Uncategorised`) · `Used in` (`Not used yet` / nút `Used in {count} template(s)`) · `Updated` · `Actions` (`Edit` · `Delete`; `View` thay `Edit` với block của người khác).
- Dialog `Where “{name}” is used` — "The templates that link this saved block. Editing it changes every one of them."; bảng `ID` · `Email name` · `Last edit`; ghi chú "Templates only. A campaign or an automation built on one of these is affected too and is not counted here — a running automation will mail the new content on its next run."
- Delete: `Delete this saved block?` / "“{name}” will be gone from the library, and every template linking it loses that section — on the canvas and in the emails it sends. Templates where the same blocks were pasted by hand are untouched." → toast `Saved block deleted`.
- Editor `/saved-blocks/:id`: `Back to saved blocks`, ô `Saved block name`, `Save` (disabled khi chưa đổi), "Width and background here are just a preview — a saved block takes the settings of whatever email it lands in."; cùng canvas / palette / Viewport / Dark Mode như Email editor; lưu xong `Saved block updated` / "Emails using this block will pick it up." (BR-24).
- id đã xoá → `This saved block no longer exists` / "It may have been deleted by someone else in your workspace.", Save disabled (staging 01/10, BR-25).
- Read-only (bundle): "You can open this block but not save it — it was created by someone else."

### Tạo saved block

- Trong Email editor: chọn block **cấp ngoài cùng** → `Save as Block` → panel `Name`, `Category`, `Cancel` / `Save Block` (staging 29/09, BR-23). Vẫn giữ sau PR #27 (BR-22).
- MTRO-107 / PR #27 (Dev 02/10, chưa thấy trên staging 01/10): nút `New saved block` → `/saved-blocks/new`; Save lần đầu tạo block, toast "Saved block created", URL đổi sang id mới; Save sau chỉ cập nhật; tên trống hoặc canvas trống → báo lỗi trên trang (BR-19, BR-20). Saved block tạo ở tab khác vẫn thấy trong Browse không cần reload (BR-21).

### Đồng bộ / link — thiết kế Dev 08/09 (MTRO-89)

- SDK Templatical chèn block = copy, không có link native → Mailtro tự đóng dấu `savedBlockId`; bản copy trong `design_json` chỉ là cache. Editor, preview, card bước Contents của campaign và render lúc gửi đều **resolve lại từ entry** (resolve-on-read, không backfill, không ghi đè template người khác) (BR-01…BR-04).
- Link tính theo **run** — dải block liền nhau cùng `savedBlockId` (BR-02).
- "Khoá cứng" (yêu cầu description MTRO-89) **không làm được** → thay bằng **detach**: sửa block linked ngay trong email → khi Save cả run tách khỏi bản gốc, không nhận cập nhật nữa; sửa tại chỗ không đẩy ngược lên saved block (BR-05, BR-06). PO chưa xác nhận chấp nhận detach (GAP-03).
- Hiển thị (PR #27, 02/10): block linked viền nét đứt **teal**, hover hiện tab tên, tooltip "Editing it here unlinks it from the saved block."; đang sửa → viền liền **cam**, tooltip "Edited — unlinks on save"; banner "Edited saved block — unlinks when you save" + link "Edit "<tên>" instead" (ẩn nếu không có quyền sửa); Undo về như cũ thì banner tắt; sau Save toast liệt kê block bị tách ("Edited here, so it no longer follows the saved block") (BR-07…BR-14).
- **Xoá saved block → block biến mất khỏi mọi template** (canvas và mail gửi), template mở ra hiện "A saved block used here was deleted, so it is no longer part of this template"; block dán tay giống hệt không bị ảnh hưởng (BR-15). Phải phân biệt "entry đã xoá" với "API saved-blocks lỗi" — API lỗi **không** được gỡ block (BR-16).
- Sửa saved block → mail gửi sau đó mang nội dung mới; BE phải tính hash cache HTML theo `savedBlockId:updated_at`, nếu không mail gửi mang footer cũ (BR-17). Xoá rồi tạo lại sinh id mới, template cũ không link sang (BR-18).
- Chỉ block chèn bằng `Browse saved blocks` + Save template mới được đếm `Used in`; block gốc tạo bằng `Save as Block` **không tự link** (staging 29/09, BR-27; inventory L17).

### Browse saved blocks (dialog trong editor) — staging 01/10

- h3 `Browse Saved Blocks`, `Search saved blocks...`, `Filter by category`, thẻ `Rename` / `Delete`; rỗng `No saved blocks yet` / "Save blocks from your templates to reuse them later."; `Insert position` {At beginning, After Section N, At end (mặc định)}; `Insert` disabled khi chưa chọn.

## Edge Cases

- BE đồng bộ đã lên staging chưa — nếu FE có mà BE chưa thì preview mới, mail gửi cũ (lỗi im lặng) — `Need confirm` Dev (GAP-01 Major, RISK-01).
- PR #27 đã deploy staging chưa — `Need confirm` (GAP-02 Major).
- PO chấp nhận detach thay "khoá cứng" — `Need confirm` (GAP-03 Major).
- Thao tác nào gây detach: kéo đổi thứ tự, xoá 1 block trong run, chèn giữa run, Duplicate — `Need confirm` (GAP-05 Major).
- Ma trận quyền: sửa / xoá theo người tạo hay theo role (`can_update`) — `Need confirm` (GAP-04 Major; AS-01: chỉ người tạo được sửa).
- Duplicate template / Duplicate design / Import HTML có giữ link — `Need confirm` (GAP-09 Major).
- Hai người / hai tab sửa cùng lúc; UI khi API lỗi; BE gửi khi không đọc được entry — `Need confirm` (GAP-10, GAP-11 Major).
- Campaign Scheduled / Sent hiển thị nội dung nào sau khi saved block đổi — `Need confirm` (GAP-15 Major; AS-03: Scheduled gửi nội dung mới nhất).
- `Save as Block` không link block gốc — `Need confirm` PO đúng ý đồ (inventory L17, GAP-07).
- Ràng buộc tên / category / số lượng; ngưỡng hiệu năng — `Need confirm` (GAP-06, GAP-13 Major).
- Leave without saving ở editor saved block — chưa có (GAP-12).

## Testability Notes

- Staging 01/10 có **0 saved block** (`ash-inventory-block` đã bị ai đó xoá) — cần fixture F1–F7, workspace B và Member thứ hai theo `saved-blocks.md` (85 case TC-SBLK, task MTRO-023; ID QA Hub = TC-MTRO-(1785 + số)).
- Kiểm "mail gửi mang nội dung mới" cần gửi thật tới hộp thư QA → phụ thuộc R13 (mail API).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `saved-blocks`.

## Related Jira Tickets

- MTRO-89 — Saved block, Story, QA Review — description "khoá cứng"; comment Dev 08/09 (thiết kế detach) và 02/10 (PR #27).
- MTRO-107 — Create new saved blocks from Saved blocks page, Story, In Progress — description trống; nội dung ở comment MTRO-89 02/10.

## Source

- `inventory/MTRO.md` § 2.8, § 2.7 (Browse Saved Blocks), L17, L39, L54 — staging 01/10/2026 (bảng / editor: 29/09).
- QA Hub task MTRO-023 (notes 02/10, 85 case not-run), MTRO-021 BR-42 — đọc 2026-10-07.
- Jira MTRO-89, MTRO-107 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/manual-testcases/03-templates/saved-blocks.md`, `docs/qa-sprint-status.md`.
