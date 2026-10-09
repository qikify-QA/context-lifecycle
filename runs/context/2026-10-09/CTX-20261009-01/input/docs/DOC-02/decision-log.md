<!-- testlane knowledge KB-362 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/decisions/decision-log.md · createdAt=2026-10-08T07:54:01.378Z · updatedAt=2026-10-08T09:37:51.161Z -->

# Decision Log — Duos B2B (DUOS)

**Status:** draft — append-only

Vì sao một rule / hành vi là như vậy. Mỗi mục một quyết định, có ngày, lý do,
nguồn. Không xoá / viết lại mục cũ — quyết định đổi thì thêm mục mới và ghi
rõ supersede mục nào.

## Format

```
## YYYY-MM-DD — <short title>

**Decision:** what was decided
**Why:** the reasoning / constraint that drove it
**Source:** ticket ID, Slack thread, or who decided
```

## Log

## 2025-04-09 — 3 default role Admin / Senior Buyer / Junior Buyer

**Decision:** Thay cặp role "Location admin" / "Ordering only" trong spec CA Role management bằng 3 default role Admin (dựa Location admin), Senior Buyer và Junior Buyer (dựa Ordering only); permission của Admin không sửa được, Order history + Shipping and billing luôn disabled.
**Why:** Map được flow duyệt Shopping list (Junior cần duyệt) mà vẫn khớp 2 contact role của Shopify.
**Source:** DUOS-88 comment thuongnth (PO) 2025-04-09.

## 2025-09-23 — Credit limit chỉ hỗ trợ payment term Net

**Decision:** Credit tracking chỉ áp cho Net terms; không hỗ trợ đổi payment term sau khi đặt order; order đã cancel/paid không hỗ trợ bước tiếp.
**Why:** Payment term khác chỉ xác định lúc fulfillment/receipt; Shopify không gửi hook khi đổi payment term.
**Source:** DUOS-201 comment haptt (Dev) 2025-09-23/25; docs (references/apps/DUOS.md).

## 2026-03-23 — Modular pricing, User & Permission luôn chọn

**Decision:** Chuyển sang giá theo module; User & Permission free và luôn được chọn; yearly 20%; bundle 4 module 5%, 6 module 10%; không free plan/trial (free cho dev store / Plus sandbox).
**Why:** Merchant chỉ trả cho module cần dùng.
**Source:** DUOS-320 comment Ashley (PO) 2026-03-23. **Một phần bị thay** bởi mục 2026-04 (Non-Plus) và 2026-10-02.

## 2026-04 — Non-Plus pricing theo 4 tier Shopify, trial 30 ngày khi chọn ALL

**Decision:** Giá từng module theo Basic/Grow/Advanced/Plus; Registration + User & Permission free; trial 30 ngày chỉ khi chọn mọi extension; plan ngoài 4 tier xem giá Plus kèm card "Contact us to activate free testing".
**Why:** Shopify mở native B2B cho mọi plan từ 2026-04-02.
**Source:** DUOS-377 description (Epic Done 2026-06-11). Supersede phần "không trial" của mục 2026-03-23.

## 2026-04-01 — Sender email của merchant chuyển thành reply-to

**Decision:** Email gửi buyer dùng sender mặc định của app; sender email merchant cấu hình được đưa vào reply-to; bỏ field "reply to" riêng.
**Why:** Tránh lỗi gửi mail khi From là domain của merchant.
**Source:** DUOS-370 comment haptt 2026-04-01, Ashley chốt. Supersede DUOS-311.

## 2026-04-29 — Shopping list về Pending sau mỗi order: pause reminder, gửi lại mail duyệt

**Decision:** Khi bật re-approval, list Approved về Pending ngay khi order được submit; reminder pause (giữ frequency), resume khi duyệt lại; gửi lại mail cho Senior + Admin.
**Why:** Khách Vacasa cần duyệt lại mỗi lần reorder.
**Source:** DUOS-382 comment Ashley (PO) + haptt (Dev) 2026-04-29.

## 2026-05-20 — Validate credit bằng Shopify Function thay checkout extension

**Decision:** Validate credit limit chạy bằng Shopify Function (Cart / Checkout / CreateDraftOrder); bỏ validate ở block Checkout extension cũ.
**Why:** Cần chặn cả draft order do CS/sales tạo trong Shopify admin.
**Source:** DUOS-397 comment haild (Dev) 2026-05-20. Supersede logic chặn của DUOS-206.

## 2026-06-22 — Shareable link shopping list dẫn tới checkout

**Decision:** Link chia sẻ shopping list (merchant tạo hộ) mở checkout page, không mở shopping list trong Customer Account.
**Why:** Khách xác nhận.
**Source:** DUOS-396 comment Ashley (PO) 2026-06-22 (description chưa cập nhật).

## 2026-08 — Checkout View Only tính cả shipping

**Decision:** Value-based checkout blocking xét tổng order gồm shipping, không chỉ cart subtotal.
**Why:** View Only có item £0 + shipping khác 0 vẫn vào được "Pay now".
**Source:** DUOS-407 (PASS 2026-08-18). Supersede cách hiểu cartSubtotal của DUOS-403 (`allowZeroSubtotalCheckout`).

## 2026-08-10 — Field `shopify_contact_role` strict, không trim; loop Flow là limitation

**Decision:** Chỉ nhận đúng `location_admin` / `ordering_only`, case-sensitive, không trim; fail thì không ghi gì; role template là source of truth (re-sync mọi member); bulk continue-on-error; loop vô hạn với trigger "member role updated" là limitation chấp nhận.
**Why:** Shopify Flow chỉ hỗ trợ `single_line_text`; tránh trạng thái nửa vời.
**Source:** DUOS-405 comment haptt 2026-08-10; business-rules/DUOS.md (2026-08-11).

## 2026-09-04 — Approve submission tìm customer có sẵn: email trước, phone chỉ khi không có email

**Decision:** Approve link customer có sẵn theo email; phone chỉ fallback khi submission không có email; email và phone ra 2 customer → lấy theo email.
**Why:** Merchant không approve được khi email/phone đã thuộc customer có sẵn (khách mua lẻ rồi mới đăng ký trade).
**Source:** DUOS-411; business-rules/DUOS.md (2026-09-04).

## 2026-09-11 — Company member: search/sort chỉ trong location hiện tại; invite trùng email bị chặn (422)

**Decision:** Client bỏ yêu cầu cross-location; invite email đã có trong location → block, không chỉ cảnh báo.
**Why:** Giới hạn Shopify API + tránh ghi đè âm thầm customer có sẵn.
**Source:** DUOS-415 description; DUOS-414 comment haild 11/09/2026 (task QA Hub DUOS-003).

## 2026-09-30 — Không có Reject cho submission; Portal chọn nhánh Approve theo company_id

**Decision:** Portal không có nút Reject (status chỉ pending/completed/failed); Approve dựa vào việc submission có `company_id` chứ không đọc cờ `enable_company_creation_on_submit`; setup_incomplete do merchant tự hoàn tất trên Shopify; flag ON không sửa email/phone submission.
**Why:** Câu trả lời Dev (haild, haptt) và PO cho các GAP của DUOS-424/425.
**Source:** Task QA Hub DUOS-004 (BR-24, BR-48, BR-50, BR-51), cập nhật 2026-09-30 qua chị Nga. Supersede mô tả "approve or reject" của DUOS-6 (2024).

## 2026-10-02 — Epic + story con = 1 task QA Hub

**Decision:** Story con của một Epic được gộp vào task QA Hub của Epic, không tạo task riêng; DUOS-430 (Epic) + DUOS-431 (story) gộp vào task DUOS-005 (bản phân tích cũ DUOS-007 gộp vào).
**Why:** Tránh tách rời phân tích và test case của cùng một đợt thay đổi.
**Source:** Yêu cầu chị Nga 02/10/2026; lịch sử cập nhật task DUOS-005; memory `qa-hub-epic-story-one-task`.

## 2026-10-02 — Banner giữ giá cũ dựa trên charge.price, không dựa "custom plan" (draft)

**Decision (đề xuất Dev, PO chưa chốt):** Banner DUOS-431 hiện khi charge active, `charge.price > 0` và khác giá mới tính từ `plan.extensions`; số tiền lấy động; không dùng `plan.price`.
**Why:** Mọi plan trả phí đều là "Custom: xxxx"; `plan.price` bị BE cập nhật khi store khác chọn cùng tổ hợp.
**Source:** DUOS-431 comment haptt 02/10/2026 09:42; KB-001 (draft) QA Hub.

## 2026-10-07 — Dựng Knowledge Base DUOS theo khung QVL

**Decision:** Dựng `knowledge-work/kb/DUOS/` theo cấu trúc KB của app Qikify Volume (features / product / decisions / known-issues / testing / dev-references), viết tiếng Việt, 12 file feature chia theo module (Roles & permissions, Company member, Registration form, Company submissions, Quote, Quick order, Shopping list, Finance & credit, Notifications, Pricing, Auth & token, Portal chung).
**Why:** Gom business rule đang rải ở business-rules / references / task QA Hub / Jira về một chỗ theo feature, kèm nguồn + mức tin. Lưu ý: DUOS **chưa có inventory** → tên UI chưa verify với hệ thống thật; đề xuất chạy ash (`build-app-context`) rồi cập nhật KB.
**Source:** Yêu cầu của Hae (sub-agent dựng KB), 2026-10-07. Nguồn đọc: knowledge-work (business-rules, open-questions, references), 6 task QA Hub + KB-001/002, ~110 issue Jira.

## 2026-10-08 — Đối chiếu KB DUOS với inventory staging

**Decision:** Rà toàn bộ `kb/DUOS/` theo `inventory/DUOS.md` (build 2026-10-08, store `stg-duos-plus-2`, Free plan). Label / route / host sai → sửa theo label nguyên văn của inventory, ghi "quan sát staging 2026-10-08". Hệ thống làm khác rule → **không tự chốt rule mới**: giữ rule cũ, thêm dòng "⚠ Lệch staging 2026-10-08 …" đánh dấu chờ chốt. Nghi lỗi (§ 5 #4, #9, #17, #22) đưa vào known-issues dạng "nghi vấn — chờ Dev". Supersede ghi chú "DUOS chưa có inventory" của mục 2026-10-07.
**Why:** Inventory là quan sát hệ thống thật, nhưng chỉ là một store Free plan, không có buyer / data → chỉ đủ để sửa tên UI, không đủ để đổi business rule. Customer Account, checkout, storefront, form builder, submission detail, quote detail vẫn chưa verify.
**Source:** Yêu cầu của Hae, 2026-10-08; `inventory/DUOS.md` § 5 (31 dòng).
