# Discount Offers (Quantity Break / Multibuy / Wholesale Pricing — stacking & shared settings layer)
**Published context version:** 2

**Product:** qik-volume · **Object:** `discount-offers` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-18

## Features

- **multibuy-mix-match-combo** — Merchant sets up a promotion where a customer mixes and matches across multiple different eligible products (not a repeat quantity of one pr: 95 KB item (11 quan sát staging), 72 check (27 cần xác nhận)
- **quantity-break** — Merchant thưởng khách mua nhiều hơn bằng cách cấu hình 1 bộ tier quantity/price dùng chung cho 3 dạng reward (price break free gift subscrip: 89 KB item (15 quan sát staging), 86 check (33 cần xác nhận)
- **wholesale-pricing-offer** — B2B buyer nhận một discount theo % (hoặc fixed amount) tăng dần theo tổng quantity đã order trên nhiều variant combination của 1 product, qu: 80 KB item (9 quan sát staging), 35 check (18 cần xác nhận)

## Tóm tắt knowledge

- KB item: 296 (CONFIRMED_EXPECTED 170 · INFERRED 58 · OBSERVED_CURRENT 68), trong đó 32 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`, 2026-10-18): 59 item. Đây là hành vi hiện tại trên store staging (app Staging BK Volume, theme khác Dawn), không phải kỳ vọng đã xác nhận; khác biệt với tài liệu (viết từ store cũ test-vl-1) được giữ thành conflict hai phía, không phân xử.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 9.
- Checklist: 193 check, 115 oracle STRONG, 19 BASELINE, 59 NONE; 78 cần xác nhận.
- Conflict đang mở: CONF-DOC04-001, CONF-DOC04-002, CONF-discount-offers-R1018-01, CONF-discount-offers-R1018-02, CONF-discount-offers-R1018-03, CONF-discount-offers-R1018-04, CONF-discount-offers-R1018-05, CONF-discount-offers-R1018-06, CONF-discount-offers-R1018-07, CONF-discount-offers-R1018-08, DCONF-001.

## Trạng thái open questions

- CONFLICT: 12
- OPEN_ISSUE: 24
- NEEDS_CONFIRMATION: 69
- Tổng: 105 — chi tiết trong `open-questions.md` của object này.

## Nguồn & giới hạn

- v1: DOC_BOOTSTRAP từ `qa-volume-kb` (KB do QA biên soạn, live-test trên store cũ test-vl-1, 2026-09). Item tài liệu giữ `scope.environment: documented`.
- v2: REFRESH 2026-10-18 — explore runtime đầu tiên trên store staging (portal merchant + storefront guest, dừng ở cart, mutation SAFE_REVERSIBLE_ONLY). Không supersede, không nâng CONFIRMED_EXPECTED, không đóng conflict.
- Chưa quan sát: gating khi tắt app embed (QVD-167), view onboarding của store mới cài, widget subscription trên storefront, Buy X get Y kèm gift, offer sau giờ start/end, quyền staff, giới hạn 25 automatic discount, mobile chỉ xem render.
