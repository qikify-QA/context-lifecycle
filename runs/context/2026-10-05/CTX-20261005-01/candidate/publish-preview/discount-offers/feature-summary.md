# Discount Offers (Quantity Break / Multibuy / Wholesale Pricing — stacking & shared settings layer)
**Published context version:** 1

**Product:** qik-volume · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-05

## Features

- **quantity-break** — gate: CONDITIONAL_PASS
- **multibuy-mix-match-combo** — gate: CONDITIONAL_PASS
- **wholesale-pricing-offer** — gate: CONDITIONAL_PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 4
- OPEN_ISSUE (known defect, quan sát hiện tại): 1
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 43
- Tổng: 48 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: KB của bootstrap đầu tiên này có nguồn `spec_doc` (narrative chung, không gắn 1 lần live-test cụ thể) và `test_case` (gắn 1 lần live-test cụ thể trên store test-vl-1, ngày cụ thể) — cả hai được coi là CONFIRMED_EXPECTED đủ mạnh làm oracle STRONG khi `confirmation_source.derivation == "prose"`, theo đúng luật C5 của contract. Một số check vẫn ở BASELINE (do derivation=code_artifact hoặc do trace tới item OBSERVED_CURRENT/KNOWN_DEFECT) hoặc NONE (do KB nguồn chỉ INFERRED/hedged) — đây là kết quả ĐÚNG và dự kiến, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn là `qa-volume-kb` — KB do chính QA tự biên soạn (phần lớn từ live-test qua Playwright MCP trên store `test-vl-1`, 2026-09-03 → 2026-09-14), KHÔNG phải tài liệu dev-gen từ source code. Version v1, generated 2026-10-01.
