<!-- testlane knowledge KB-375 · kind=feature-profile · tag=Custom field · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/05-custom-fields.md · createdAt=2026-10-08T08:01:05.014Z · updatedAt=2026-10-08T08:01:05.014Z -->

# 5. Custom fields (trang `/contacts/fields` · custom field trong contact, segment, automation)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.5 (+ phần custom field ở § 2.3, § 2.4, § 2.9, § 2.11; staging đi thật 01/10/2026), task QA Hub **MTRO-022** (Not Ready 7/14; BR-10…BR-20 do PO/Dev chốt qua QA lead Nga 01/10; chạy 06/10: 53 pass · 16 fail · 29 blocked) và **MTRO-010** (BR-20…BR-24 — Dev 02/10), Jira MTRO-24/25/26/33/92/95 (đọc 07/10), repo `qikify-QA-mailtro` (test-run `2026-10-06-custom-field-manual-run.md`). **Không có ticket Jira nào mang AC cho custom field** (GAP-01 MTRO-022) — mọi rule đến từ câu trả lời PO/Dev chuyển qua QA hoặc từ hệ thống thật. `business-rules/MTRO.md` chưa có mục riêng cho custom field.

## Purpose

Custom field là thuộc tính tuỳ biến của contact (vd `plan_tier`, `app`, `new_letter`) để team MKT mang dữ liệu từ Brevo / app Shopify sang (OWNER, Plan, Domain, `[app]_APPSTATUS`… — MTRO-25), dùng trong segment, merge tag `{{contact.attr.<key>}}`, step `Update contact field` của automation và làm field Boolean cho choice của [Email preferences](09-email-preferences.md).

## Business Rules

### Phạm vi — PO/Dev 01/10 (MTRO-022)

- Custom field (dialog New / Edit contact, khối detail, trang Custom fields) **thuộc phạm vi release** dù AC MTRO-24 chỉ ghi 3 field (BR-10). Trang `/contacts/fields` thuộc task này (BR-16).
- **Không giới hạn** số custom field trong workspace (BR-20; Dev 02/10 MTRO-010 BR-22 cũng ghi "workspace không giới hạn số field").
- Member được tạo / xoá field definition và sửa custom field của contact (BR-17 — chưa quan sát).

### Trang Custom fields (`/contacts/fields`) — staging 01/10

- h1 `Custom fields`, "The fields your contacts can carry. Segments, imports and preference pages all read this list."; nút `New field`.
- Bảng: `Field` (key dạng code) · `Type` (`Text` / `Number` / `Boolean` / `Date` / `Datetime`) · `In use` (`33 contacts`… — đếm cả contact có value null, 06/10) · nút `Delete {key}`.
- Dialog **New custom field** — "Creating it here means segments and preference pages can use it straight away, before any contact has a value.": `Field name` (`e.g. app_updates`, hint "Lowercase letters, numbers and _ only, starting with a letter. This is what segments read, and it cannot be changed later.") · `Type` {`Text`, `Number`, `Boolean`, `Date`, `Datetime`} mặc định `Text` · `Cancel` / `Create field`.
- Validation thấy thật 01/10: `Bad Name` → `Use lowercase letters, numbers and _ only, starting with a letter.` + `Create field` disabled; key đã có → `This workspace already has a field with that name.` + disabled.
- **Corrected 01/10**: bỏ cột `Name` và ô `Display name` (29/09 còn). Bỏ Display name là **quyết định cuối**, hiển thị key thô là chủ ý (PO/BA 02/10, MTRO-010 BR-16; MTRO-011 BR-19).
- Delete field đang có contact mang: `Delete empty_val?` / "2 contacts still carry this field. Remove it from them first — deleting it now will be refused." Delete field chưa dùng: "No contact carries this field, so nothing is lost. Segments using it will need another field. If a preferences page uses it, remove that choice first — until then the delete is refused." Xoá field có contact mang hoặc đang dùng ở preferences page → 422 + toast (bị chặn, 06/10).

### Key & value — Dev 02/10 (MTRO-010 BR-20…BR-24) + PO/Dev 01/10 (MTRO-022)

- Key theo `^[a-z][a-z0-9_]*$`, ≤255 ký tự (256 → 422), không trùng field hệ thống (`email`, `consent`, `first_name`, `country_code`… → 422 "… is a built-in contact field" — chỉ BE chặn).
- Dialog contact: FE **tự chuẩn hoá khi rời ô** (`Plan Name` → `plan_name`); sau chuẩn hoá vẫn sai (`1abc`) → message + khoá Save; gõ chữ hoa → message ngay; BE không chuẩn hoá → 422 `The attribute key 'X' must be snake_case…` (Dev 02/10). **Mâu thuẫn**: PO/Dev 01/10 (MTRO-022 BR-13) yêu cầu key sai phải **hiện thông báo lỗi, không tự chuẩn hoá im lặng** — staging 06/10 đổi im lặng, kể cả `plan-tier` → `plan_tier` **ghi vào field có sẵn** (TC-MTRO-1484) và `x__y` → `x_y` (TC-MTRO-1485).
- Gõ key mới trong dialog contact **tự tạo field** trên trang Custom fields (BR-15).
- Value rỗng: FE gửi `""` → Laravel `ConvertEmptyStringsToNull` → lưu `null`, key vẫn giữ (BR-11 MTRO-022; BR-22 MTRO-010). Detail hiện ô trắng thay vì `—` (06/10 — xem Edge Cases).
- Giới hạn: tối đa **50 key / lần lưu** (≈50 field / contact), vượt → `…must not have more than 50 items.`; key ≤255, value ≤2000; nhánh `fix/contact-attribute-limit` nâng lên 100, chưa merge (Dev 02/10, BR-22). Value 1.022 ký tự lưu được (06/10).
- Date gửi `YYYY-MM-DD` không múi giờ; Datetime lấy giờ trình duyệt đổi sang UTC; **BE lưu nguyên chuỗi, không kiểm kiểu** (API ghi `abc` vào Date vẫn được) (Dev 02/10, BR-24). Detail hiện Datetime dạng ISO UTC thô `2026-10-01T16:30:00Z` (06/10, chưa có rule).
- Hai dòng cùng key → dòng sau ghi đè, không chặn (PO/Dev 01/10 BR-12).
- Chọn key có sẵn thì `Kind of value` tự khoá theo Type của field; Boolean = combobox `True` / `False` / `No value` (06/10).
- Edit contact: **không được đổi kiểu** custom field đã có (PO/BA 02/10, MTRO-010 BR-12) — **mâu thuẫn** PO/Dev 01/10 (MTRO-022 BR-14: được đổi key và Kind). Staging 06/10: key là nhãn tĩnh, Kind disabled (khớp BR-12 MTRO-010).
- Migrate / import: attribute chữ hoa (`OWNER`, `[app]_APPSTATUS`) chuyển thành chữ thường (PO/Dev 01/10, BR-18 — chưa quan sát). Mâu thuẫn với quyết định PO 28/09 ở MTRO-95 "giữ nguyên tên header" — xem [03-contacts](03-contacts.md).
- Hiển thị: key thô ở mọi nơi — picker `key` của New contact, nhóm `Custom fields` của segment builder, menu biến automation, merge tag `{{contact.attr.<key>}}`, header CSV import / export (mỗi nơi một thứ tự).

### Ràng buộc chéo

- Field đang được segment / automation dùng **không xoá được**, có thông báo lỗi (PO/Dev 01/10, BR-19) — **staging 06/10 vẫn xoá được** (TC-MTRO-1524 segment → "Unknown field", preview 422; TC-MTRO-1525 automation → node trỏ field không tồn tại). Chỉ field có contact mang và field dùng ở preferences page là bị chặn.
- Picker `Custom field` của Email preferences chỉ liệt kê field **Boolean** (staging 01/10, inventory Đ27).
- Step `Update contact field` của automation ghi field cũng phát event `Contact field changed` (rule 18/09, xem [12-automations-list-builder](12-automations-list-builder.md)).

## Edge Cases

- Key sai bị chuẩn hoá im lặng và có thể **ghi đè sang field có sẵn** (`plan-tier` → `plan_tier`) — trái BR-13 MTRO-022; `Need confirm` PO chốt lại vì Dev 02/10 mô tả chuẩn hoá là chủ ý (mâu thuẫn rule, RISK-10).
- Đổi key / Kind trong Edit: BR-14 (01/10) cho phép vs MTRO-010 BR-12 (02/10) cấm — `Need confirm` PO; nếu cho đổi thì áp lên definition dùng chung hay chỉ contact đó (GAP-16 Major).
- Xoá field đang dùng ở segment / automation không bị chặn — trái BR-19, nghi bug High (06/10).
- Value null hiện ô trắng thay vì `—` — `Need confirm` PO (GAP-11).
- Combobox key chỉ hiện tối đa 8 field khi chưa gõ (workspace có 16) — `Need confirm` có chủ ý (TC-MTRO-1469).
- Dialog `New custom field` ở `/contacts/fields`: `Create field` **enable khi Field name rỗng** (bấm không làm gì), trong khi dialog ở Email preferences thì disabled khi rỗng nhưng enable với tên sai định dạng (inventory L09) — `Need confirm` Dev thống nhất.
- Validate value theo Kind (Number thập phân / âm; Date sai format; trim value) — `Need confirm` (GAP-05 Major).
- `Remove field` trên field đã lưu: gỡ key hay set `null` — `Need confirm` (GAP-06 Major).
- Key trùng key dành riêng ngoài 4 field đã biết — `Need confirm` (GAP-04 Major).
- Hợp đồng API: khoá `attributes` (không phải `customFields` như MTRO-26), `attributes` là object khi có data, `[]` khi rỗng (26/08) — `Need confirm` Dev chuẩn hoá (GAP-10).
- Hai tab Edit cùng contact ghi đè nhau (lost update) — quan sát 06/10.
- Field `date_install` (Datetime) và `ash_inventory_pref` đã bị ai đó xoá trên staging (inventory L48) → thiếu fixture Date / Datetime.

## Testability Notes

- Bộ case `02-contacts/custom-field.md` (113 case, task MTRO-022): 104 To be automated / 9 Manual. Nhiều case bị blocked vì API dùng bearer token (gọi từ browser 401), không mock được 500, cần workspace riêng để seed 50/100/300 field hoặc 10.000 contact.
- Key test phải lowercase, có prefix theo người (`qa_nga_{ts}_…`). Không xoá field của người khác (`plan_tier` đang có 33 contact).
- Gợi ý: case regression xuyên module khi đụng custom field — segment, automation (`Update contact field`, split), merge tag, preferences page, import / export.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `custom-fields`.

## Related Jira Tickets

- MTRO-24 — Create contact manually, Story, QA Review — AC chỉ 3 field; comment PO 04/08 liệt kê custom attribute MKT cần (Owner, Store name, Store domain, Plan).
- MTRO-25 — Bulk import contact (bản cũ), Story, To Do — danh sách attribute MKT đang dùng. Reference / inventory ghi nhầm tên là "Create contact attributes".
- MTRO-26 — Contact details, Story, To Do — khối Custom fields key/value động (`customFields`).
- MTRO-95 — Bulk import contact, Story, QA Review — custom field khi import / export (PO 28/09).
- MTRO-92 — [BE] Security, Story, QA Review — §10 `{contact.attr.<key>}` chưa tạo → Send bị từ chối.
- MTRO-96 — Campaign report: say "field removed" instead of "too complex", Task, To Do — field bị xoá khỏi catalog sau khi gửi.

## Source

- `inventory/MTRO.md` § 2.5, § 2.3, § 2.9, L09, L32, L48, Đ27 — staging 01/10/2026.
- QA Hub task MTRO-022 (notes 01/10; 113 case chạy 06/10), MTRO-010 (BR-20…BR-24, Dev 02/10) — đọc 2026-10-07.
- Jira MTRO-24, 25, 26, 92, 95, 96 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: test-run `02-contacts/2026-10-06-custom-field-manual-run.md`, `2026-08-26-contacts-create-contact…`; `docs/manual-testcases/02-contacts/custom-field.md`.
