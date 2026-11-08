# Kết quả sửa dữ liệu knowledge — 2026-11-08

Đã áp local theo yêu cầu operator; theo yêu cầu tiếp theo, đưa vào PR knowledge #14 và producer #16 đang mở. Chưa merge, tag hoặc phát hành. Base knowledge commit: 824a9dc4a74a1e6d4a3006e501c949e11144cc11. Knowledge working tree sạch trước maintenance; các thay đổi ở repo producer và run đang có được giữ nguyên.

## Phạm vi và kết quả

7 product, 72 object. 1.176 file dữ liệu/metadata được sửa và 2 file index được sinh lại. Mỗi object tăng published_context_version một lần; feature-summary dòng 2 khớp publish-meta và có dòng CHANGELOG maintenance. Đây là sửa dữ liệu, không xác nhận thêm requirement và không sửa hành vi sản phẩm.

| Thao tác | Số lượng |
|---|---:|
| Reference chuyển sang namespace object/feature hoặc product-level | 63.152 lượt |
| Item thiếu nguồn: CONFIRMED_EXPECTED → INFERRED, LOW + OQ | 28 |
| Oracle hạ mức theo authority/conflict/dev_doc/P1 | 460 checks |
| Expected chưa có oracle chuyển nguyên văn sang observation_guidance | 1.099 checks |
| Defect chuyển khỏi oracle sang regression watch | 5 checks |
| Khối OQ JSON sửa escape, giữ nguyên nội dung | 4 |
| Check nối với OQ đã có hoặc mới | 658 |
| OQ tạo thêm từ draft/gap đang tồn tại | 591 |
| Reference chưa có đích duy nhất, tách khỏi liên kết hoạt động | 10 lượt |

Không đánh số lại KB hoặc check. Đối chiếu backup xác nhận giữ đủ 8.150 KB items và 5.636 checks; statement, scope, confirmation_source, test steps, precondition và priority không thay đổi. Nội dung expected bị di chuyển được giữ nguyên trong observation_guidance, không bị xoá. Item thiếu nguồn dùng INFERRED vì không thể tự chứng minh đã có quan sát runtime sau khi provenance bị strip; không bịa OBSERVED_CURRENT hoặc nguồn authority.

## Nợ dữ liệu còn mở

Audit cơ học: 0 BLOCKING, 60 warnings. Phân biệt rõ:

- 38 warnings pending-reference-decision: 28 authority đang chờ xác nhận + 10 reference chưa giải được. Reference gốc/field/reason được giữ trong reference_issues và có OQ. Chúng không còn tham gia oracle hoặc liên kết đang hoạt động. Profile liên quan có context_status NEEDS_CONFIRMATION.
- 22 warnings zero-run-reference legacy: run/action/API operation ID trong prose. Cảnh báo đường dẫn _product-kb.json đã được xác nhận là false positive và sửa checker. Chưa tự viết lại các câu lịch sử hoặc statement chỉ để làm sạch grep. Cần một lượt review prose riêng; không coi đây là 22 secret.
- 28 item có authority nhưng UNRESOLVED vẫn giữ conflict và không được tính oracle hợp lệ. Sửa data không tự phân xử conflict.
- Tổng OQ hiện tại là 3.999 (177 CONFLICT, 2.703 NEEDS_CONFIRMATION, 1.119 OPEN_ISSUE). Đây là việc cần PO/Dev/QA xác nhận, không phải lỗi cú pháp hoặc bằng chứng sản phẩm sai.
- Manifest vẫn nêu gap: object-level KB rỗng chưa có ghi nhận đã rà ở một số object, và sdk có ccr_ref CBS-005 chưa khớp CHANGELOG. Không tạo fact/OQ giả về việc đã rà hoặc backfill quyết định không có nguồn.

Reference chưa resolve:

| Product | File | Reference gốc | OQ |
|---|---|---|---|
| qik-volume | discount-offers/features/wholesale-pricing-offer/kb.json | KB-WPO-057 | OQ-discount-offers-106 |
| qik-volume | discount-offers/features/wholesale-pricing-offer/kb.json | KB-WPO-076 | OQ-discount-offers-107 |
| teeinblue | order/checklists/order-design-vector-render.json | KB-418 | OQ-order-054 |
| teeinblue | order/features/order-design-vector-render/kb.json | KB-418 | OQ-order-054 |
| teeinblue | product-base/features/printarea-definition/profile.json | CONF-CHK-04-009-001 | OQ-product-base-102 |
| teeinblue | product-base/features/printarea-definition/profile.json | CONF-CHK-04-009-001 | OQ-product-base-102 |
| teeinblue | product-base/features/printarea-definition/profile.json | CONF-CHK-04-009-001 | OQ-product-base-102 |
| teeinblue | product-base/features/product-base-campaign-link/profile.json | CONF-CHK-08-010-002 | OQ-product-base-103 |
| teeinblue | product-base/features/product-base-campaign-link/profile.json | CONF-CHK-08-010-002 | OQ-product-base-103 |
| teeinblue | product-base/features/product-base-campaign-link/profile.json | CONF-CHK-08-010-002 | OQ-product-base-103 |

## Kiểm tra

- 72/72 unit/integration tests pass, gồm stale base guard, rollback khi sinh manifest lỗi, bảo toàn statement/steps/source/expected, product-level và cross-object reference, scope also_affects, scanner false positive, oracle policy và idempotence.
- npm run validate:knowledge pass: audit preview + publish metadata, manifest và OQ index khớp dữ liệu hiện tại.
- Chạy lại migration trên dữ liệu đã áp: 0 changed files, 0 events; không tăng version, tạo OQ hoặc CHANGELOG trùng.
- Không dùng kết quả này để tuyên bố toàn bộ requirement đã đúng; audit chỉ chứng minh các invariant được kiểm.

## Công cụ và backup

scripts/ctx/repair-knowledge.mjs mặc định chỉ dựng preview và report trong thư mục tạm. --apply mới gọi canonical writer của publish-apply với lock, base hash, preservation guard, backup và rollback cho lỗi thông thường. Kill/mất điện vẫn cần đối chiếu backup và diff trước retry.

Backup lần apply: /var/folders/_g/lxmtw6r1037fhd32h4k3rkb00000gn/T/ctx-data-repair-dTn02g/backup

Report chi tiết đầy đủ: /var/folders/_g/lxmtw6r1037fhd32h4k3rkb00000gn/T/ctx-data-repair-dTn02g/report.json

Backup/report trong thư mục tạm là bản phục hồi bổ sung; diff so với Git base vẫn là bản review bền vững. Không dùng git reset hoặc restore toàn cây để rollback vì có thể ghi đè thay đổi phát sinh sau maintenance.

Baseline ngoại lệ source-less trong config/legacy-authority-debt.json đã retire, items rỗng. Consumer semantics mới được mô tả trong contracts/consumer-guide.md và đã đồng bộ vào knowledge/how-to-request/consumer-guide.md trong PR knowledge.
