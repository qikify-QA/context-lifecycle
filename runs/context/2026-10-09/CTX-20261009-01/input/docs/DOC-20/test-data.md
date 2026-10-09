<!-- testlane knowledge KB-366 · kind=env · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/testing/test-data.md · createdAt=2026-10-08T07:55:35.869Z · updatedAt=2026-10-08T09:38:11.297Z -->

# Test Data — Duos B2B (DUOS)

**Status:** draft

Dữ liệu test dùng lại được trên staging. Dựng 2026-10-07 từ test case QA Hub
(task DUOS-001…DUOS-006). Store / môi trường: xem
[environments.md](environments.md). Đã đối chiếu inventory 2026-10-08 (store
`stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem `inventory/DUOS.md` (§ 4);
dữ liệu trên store khác chưa verify. Email test dùng dạng alias của hộp thư QA (không
ghi địa chỉ thật ở đây).

## Store theo mục đích

| Mục đích | Store gợi ý | Ghi chú | Nguồn |
|---|---|---|---|
| Token expiring | `stg-duos-plus-2` (70), `stg-duos-email-testing-advanced` (67) | | business-rules/DUOS.md (DUOS-399) |
| Token legacy (đối chứng) | `staging-duos-ngant-3` (22), `stg-duos-email-testing-grow` (68), `staging-duos-ngant-9` (30) | Trước 2027-01-01 legacy vẫn sống | business-rules/DUOS.md |
| B2B Registration flag ON | `staging-duos-ngant-3` | Đang ON từ 2026-09-30; **chưa có store flag OFF** | TC-DUOS-150, TC-DUOS-159 |
| Pricing Plus | `stg-duos-plus-2` | | TC-DUOS-303 |
| Pricing không charge active | `staging-duos-ngant-9` (`Need confirm`) | | TC-DUOS-307 |
| Regression toàn app (composer audit / Laravel 12) | `stg-duos-plus-2` | Cần đã subscribe đủ module Quote / Shopping List / Finance & Credit / Quick Order (GAP-12 task DUOS-006). Ngày 2026-10-08 store đang **Free plan**, 8 extension Inactive → chưa đủ điều kiện | Task DUOS-006; inventory/DUOS.md § 4 |

## Dữ liệu cần dựng (theo từng feature)

### Company submissions / customer matching (task DUOS-002, DUOS-004)

- Customer đã tồn tại có order history (case gốc DUOS-411: khách mua lẻ tile
  sample rồi đăng ký trade account) — TC-DUOS-050, TC-DUOS-051.
- Cặp customer A/B để test email A + phone B — TC-DUOS-054, TC-DUOS-233.
- Customer đang là Main contact của company khác — TC-DUOS-057, TC-DUOS-158.
- Email khác hoa/thường + khoảng trắng; phone nội địa vs `+84` — TC-DUOS-060,
  TC-DUOS-061.
- Form có field **Company Registration Number** (Custom text) + regex
  `^(?!07613085$|01234567$|12345678$)\d{8}$` — DUOS-426; **form đang publish
  trên `staging-duos-ngant-3` chưa có field này** (TC-DUOS-157, 2026-09-30).
- Field "Your email" của form hiện đang **bắt buộc** → không submit được case
  "chỉ có phone" nếu không đổi form (TC-DUOS-176, 2026-09-30).
- Location UK cần **B2B market UK kèm Base catalog**; company do job tạo ngày
  2026-09-30 lại gắn Market "Vietnam", Catalogs 0 (TC-DUOS-153) — cần cấu
  hình market trước khi test đặt đơn sample.
- reCAPTCHA v3: cần cặp key test đã đăng ký domain staging (TC-DUOS-155) —
  `Need confirm` ai cấp.

### Company member (task DUOS-003)

- Location có ≥ 50 member (phân trang), > 500 member (giới hạn role filter),
  company nhiều location, member thuộc > 5 location (RISK-01, RISK-06) — cần
  Dev seed.
- Shop bật `allow_all_members_read_members` + 1 shop không bật.
- Ironwear có thể có default role riêng (DUOS-374) — dựng shop có custom role
  + default role riêng.

### Token (task DUOS-001)

- Shop có `Refresh Token Expires At` còn ~5 / 10 / 11 ngày, đã quá hạn; shop
  uninstalled; shop đóng (frozen) > 90 ngày — tất cả cần Dev chỉnh ngày trong
  DB (câu hỏi 1 task DUOS-001).

### Pricing (task DUOS-005)

- Store có charge active giá cũ, giá 0, không có charge, đang trial; store có
  bundle discount (GAP-03, GAP-16) — Dev cung cấp.

### Regression composer audit (task DUOS-006)

- Tên có dấu / non-ASCII trong company, member, sản phẩm; quote nhiều line
  item đủ sang nhiều trang PDF; order net-term để có transaction ledger;
  credit limit đã set (GAP-12 task DUOS-006).

### Dữ liệu có sẵn trên `stg-duos-plus-2` (quan sát staging 2026-10-08)

- Company "Snowdevil" (1 location, contact có sẵn, Market Canada, "Catalog
  for Canada", 3 draft order); "Powderbound" (1 location, "Not approved",
  "No main contact"). 0 form / submission / quote / shopping list /
  transaction credit. — inventory/DUOS.md § 4.

## Dữ liệu đã tạo trên staging (để tái sử dụng / dọn dẹp)

Ngày 2026-09-30 (task DUOS-004, sonder): submission 164…172 trên
`staging-duos-ngant-3`; company do job tạo: 8323563835, 8323694907,
8323727675, 8323760443, 8323793211, 8323858747 (actual result TC-DUOS-150,
158, 160, 201, 221, 233). Submission 165 đã Approved; 167 Pending có
company_id (dùng được cho TC-DUOS-161, 190). Company 8323793211 gán nhầm
"victim" làm Main contact (TC-DUOS-221) — cần dọn trên Shopify admin.
