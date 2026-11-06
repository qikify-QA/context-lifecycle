# Explore playbook — qikfiliate

File này chỉ giữ phần context builder cần để quyết định và kích hoạt explore: khi nào, điều kiện gì, explore cái gì. Tổng quan và setup của product nằm ở `knowledge/products/qikfiliate/_product-guide.md`.

Không ghi credential, email hay tên người thật vào file này. Repo này public.

## 1. Trạng thái

**Chưa explore được.** `modes.explore_enabled=false`, `environments.allowed=[documented]`, `staging` nằm trong `forbidden`, `allowed_explorers` rỗng. Orchestrator dùng được `DOC_BOOTSTRAP` và `CCR_INGEST`. `allowed_modes` có khai `REFRESH`, nhưng mode này chạy theo luồng explore nên hiện không dispatch được. Không tự sửa config để mở: đây là quyết định của operator.

## 2. Khi nào trigger explore

Sau khi mở explore, dùng `REFRESH` cho feature được giao khi gặp một trong các tình huống:

| Trigger | Phạm vi |
|---|---|
| Hệ thống đổi lớn mà KB chưa theo kịp. Hiện có một việc: upgrade Laravel, đổi URL, admin chuyển sang Filament | `affiliate-account`, `invoice-payout`, `conversion-ledger`, `payout-import`, `admin-console`, `program`, `commission-rate-card` phía admin |
| CCR nêu hành vi đã đổi và cần quan sát lại surface | Object trong CCR |
| Open Question loại CONFLICT có thể quan sát runtime | Bảng ở §5 |
| Object `STALE` (`publish.stale_after_days`) | Object đó |

Integration API và console command không trigger explore: không có explorer chủ động gọi được chúng.

## 3. Điều kiện mở explore

1. Operator chốt cho phép staging. Instance đã dùng để test là `https://staging-partners.mysbox.io/`, brand Koin/Mysbox.
2. Bổ sung phần còn thiếu trong `.env.koin`: host và credential hoặc quy trình bàn giao session admin, `X-API-Key`, host Integration API.
3. Trả lời: Slack staging có bắn vào kênh thật không; hộp thư test đọc bằng cách nào.
4. Sửa `config/products/qikfiliate.json`: `modes`, `environments.staging`, `credentials` (`env_prefix` `KOIN_`), `defaults` (mutation policy, `forbidden_actions` theo mục Mutation guard của product guide, `cleanup_required`), `explore.surfaces`, `explore.account_guard`. Chạy `npm test`.
5. Chạy một `REFRESH` nhỏ trên `payment-method` để xác nhận product guide trước khi mở rộng.

## 4. Khả năng explore theo surface

| Surface | Explorer | Khả năng |
|---|---|---|
| Dashboard | `portal-explorer`, `api-explorer` (runtime-trace) | Tốt, regression 2026-10-22 đã đi hết 6 trang |
| Admin | `portal-explorer` | Chờ bàn giao session |
| Integration API | Không có | `api-explorer` chỉ đọc network capture. Phần này đi qua agent kiểm thử → CCR |
| CSV Payout | `portal-explorer` | Cần fixture F4 và mutation policy cho phép upload |
| DB, code | Không bật | Cần quyết định riêng |
| Storefront | Không áp dụng | Product không có surface này |

## 5. Câu hỏi nên explore trước

6 conflict trong KB v1:

| OQ | Câu hỏi | Trạng thái |
|---|---|---|
| `OQ-affiliate-account-001` | Duyệt tự động khi verify hay admin duyệt tay | Regression 2026-10-22 thấy tự động, qua Activities. Cần CCR |
| `OQ-affiliate-account-002` | Affiliate bị Disapproved có login được không | Chưa quan sát được: account test chưa verify |
| `OQ-commission-calculation-005` | `maximum_amount` có áp cho first-month không | Mở |
| `OQ-commission-calculation-006` | Dòng `one-time` đi nhánh nào | Mở |
| `OQ-invoice-payout-003` | Đếm "số shop" theo mọi Conversion hay chỉ shop trả phí | Mở |
| `OQ-payout-import-021` | Vai trò `charge_id` trong dedup dòng refund/downgrade | Mở |

Quan sát runtime chỉ cho `OBSERVED_CURRENT`. Muốn thành `CONFIRMED_EXPECTED` vẫn cần PO/Dev hoặc test case PASS theo contract.

## 6. Bằng chứng chưa vào canon

Nên tạo CCR từ các nguồn này, không cần chờ mở explore:

- Regression Koin 2026-10-22 (`QAF/outputs/koin-upgrade-20261022/`, ngoài repo): 16 mục admin mới, thay đổi luồng Approve, Custom Conversion, Upload, và các lỗi invoice.
- Task QAF-001, QAF-002 trên Testlane.
- `doc_input.confirmed_facts` ghi admin không phân vai, nhưng staging đã có Roles: cần PO/Dev xác nhận lại.
- Chưa có Open Question cho việc khớp CSV theo `Customer.name` hay `related_id`.
