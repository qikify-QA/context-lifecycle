# Onboarding Dashboard (Home screen: onboarding empty-state + dashboard)
**Published context version:** 2

**Product:** qik-volume · **Object:** `onboarding-dashboard` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-18

## Features

- **onboarding-dashboard** — New merchant is guided to create their first offer with minimal friction; returning merchant gets a working hub to monitor offers, theme-ext: 33 KB item (7 quan sát staging), 31 check (13 cần xác nhận)

## Tóm tắt knowledge

- KB item: 33 (CONFIRMED_EXPECTED 26 · OBSERVED_CURRENT 7), trong đó 0 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`, 2026-10-18): 7 item. Đây là hành vi hiện tại trên store staging (app Staging BK Volume, theme khác Dawn), không phải kỳ vọng đã xác nhận; khác biệt với tài liệu (viết từ store cũ test-vl-1) được giữ thành conflict hai phía, không phân xử.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 0.
- Checklist: 31 check, 18 oracle STRONG, 3 BASELINE, 10 NONE; 13 cần xác nhận.
- Conflict đang mở: CONF-onboarding-dashboard-R1018-01, CONF-onboarding-dashboard-R1018-02.

## Trạng thái open questions

- CONFLICT: 2
- OPEN_ISSUE: 3
- NEEDS_CONFIRMATION: 8
- Tổng: 13 — chi tiết trong `open-questions.md` của object này.

## Nguồn & giới hạn

- v1: DOC_BOOTSTRAP từ `qa-volume-kb` (KB do QA biên soạn, live-test trên store cũ test-vl-1, 2026-09). Item tài liệu giữ `scope.environment: documented`.
- v2: REFRESH 2026-10-18 — explore runtime đầu tiên trên store staging (portal merchant + storefront guest, dừng ở cart, mutation SAFE_REVERSIBLE_ONLY). Không supersede, không nâng CONFIRMED_EXPECTED, không đóng conflict.
- Chưa quan sát: gating khi tắt app embed (QVD-167), view onboarding của store mới cài, widget subscription trên storefront, Buy X get Y kèm gift, offer sau giờ start/end, quyền staff, giới hạn 25 automatic discount, mobile chỉ xem render.
