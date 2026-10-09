<!-- testlane knowledge KB-367 · kind=qa-process · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/testing/regression-checklist.md · createdAt=2026-10-08T07:55:49.289Z · updatedAt=2026-10-08T09:38:09.557Z -->

# Regression Checklist — Duos B2B (DUOS)

**Status:** draft

Danh sách "luôn kiểm" sau mọi thay đổi chạm nhiều module — không phải test
case chi tiết (nằm trên QA Hub). Dựng 2026-10-07 từ business-rules DUOS-405,
task QA Hub DUOS-001 (TC-DUOS-046), DUOS-006 và DUOS-429.

## Sau thay đổi member / role (member-sync path — DUOS-405)

- [ ] Admin extension → company location → đổi role member → contact role Shopify đúng.
- [ ] Customer Account → Company member: invite, edit, đổi role, xoá; location vẫn còn ≥ 1 Admin.
- [ ] Bulk "assign admin from main contact" + bulk member sync (đối chiếu từng location, vì bulk đếm theo company).
- [ ] Flow action "assign role" với `location_admin` / `ordering_only`.
- [ ] Block checkout by permission với đủ Junior / Senior / Admin / custom role (store Plus).

## Sau thay đổi auth / token / thư viện HTTP (DUOS-399, DUOS-428, DUOS-429)

- [ ] Install / mở embedded app (OAuth, session) trên store expiring và legacy.
- [ ] Shop không bị flag `Re-auth Required At` ngoài ý muốn; không có email reconnect lạ.
- [ ] Quote → order / draft order; catalog sync; company/member sync; credit; Flow action; bulk (TC-DUOS-046).

## Sau thay đổi Company submissions / Registration

- [ ] Bộ customer matching DUOS-411 (task DUOS-002) trên store flag OFF.
- [ ] Store flag ON: submit → company + location + Main contact; Approve chỉ bắn trigger 1 lần.
- [ ] reCAPTCHA (khi bật), VAT validation (Plus), file upload trên form; rate limit trả 429.
- [ ] Không có company nào thiếu contact trên Shopify sau test.

## Sau thay đổi Pricing / plan

- [ ] Ma trận module đã / chưa subscribe: tính năng chưa mua bị ẩn/disable (List extensions, Notifications, Translate) — không phải bug.
- [ ] Store Plus vs non-Plus: banner "Shopify Plus required for this feature", giá đúng tier.
- [ ] Store đang trả giá cũ: banner giữ giá đúng số tiền (DUOS-431).

## Sau nâng cấp hạ tầng (composer audit, Laravel 12)

- [ ] Export transactions (Portal + Customer Account), export location catalog (async), mở được, đúng cột, ký tự có dấu.
- [ ] Quote PDF từ Portal + Customer Account, quote nhiều trang, logo, tiền tệ.
- [ ] Email: quotation submitted / replied, shopping list pending / approved / reminder, member added / role updated, credit assigned — subject, sender, reply-to.
- [ ] Order webhook create → paid → edit → cancel → refund: ledger + Outstanding balance / Available credit; shopping list re-approval.
- [ ] Admin panel Filament: login, Shops (filter, date range, sort), JSON viewer/editor của Shop / Form settings, Plans / Discounts / Extensions, Activity log, Shield roles.
- [ ] Email chứa xuống dòng bị reject; email `+alias` / subdomain vẫn nhận ở form đăng ký, invite member, form admin (DUOS-429).
- [ ] Horizon dashboard load; cron reminder hằng ngày chạy.
