# Open Questions — translate-portal

Tổng: 13 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 13
- CONFLICT: 0
- OPEN_ISSUE: 0

## OQ-translate-portal-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-009"
  ],
  "summary": "Audit: Jira QVD-159 Sprint 23 goal (7/8 ngôn ngữ) vs enum 9 ngôn ngữ hiện tại — discrepancy chưa resolve",
  "detail": "Jira QVD-159 ('Portal Translation, New Feature', Done) Sprint 23 goal field chỉ liệt kê 7 ngôn ngữ non-English (German, French, Spanish, Portuguese Brazil, Portuguese Portugal, Italian, Vietnamese) — thiếu Japanese — trong khi \"Translate Portal\" khẳng định Japanese đang live là 1 trong 9 option hiện tại của Portal (KB-004). Japanese được thêm ở một lần làm sau không track trong Jira, hay goal field/changelog đã lỗi thời so với build hiện tại?"
}
```

## OQ-translate-portal-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-011"
  ],
  "summary": "Hành vi khi bản dịch của một ngôn ngữ fail load (lỗi network/API) — chưa có oracle",
  "detail": "Tài liệu không mô tả hành vi khi bản dịch của một ngôn ngữ fail load (lỗi network/API) — Portal có fallback về English, hiển thị UI dịch nửa chừng, hay lỗi UI? Cần PO/Dev xác nhận behavior mong đợi."
}
```

## OQ-translate-portal-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-014"
  ],
  "summary": "Português (Brasil) vs Português (Portugal) — nội dung chuỗi dịch có khác nhau thực tế không",
  "detail": "Português (Brasil) và Português (Portugal) trong dropdown có cho ra nội dung chuỗi dịch khác nhau thực sự, hay chỉ khác locale code còn nội dung dịch giống nhau? Cần PO/Dev xác nhận để quyết định có cần 2 test case riêng hay 1."
}
```

## OQ-translate-portal-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-015"
  ],
  "summary": "Route /apps/staging-bk-volume có per-installation hay chung cho mọi merchant — chưa xác nhận",
  "detail": "Route `/apps/staging-bk-volume` (KB-003) có phải app-proxy handle riêng của dev store test-vl-1 (per-installation) hay giống nhau cho mọi merchant install? Cần xác nhận trước khi hardcode route này trong automation."
}
```

## OQ-translate-portal-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-016"
  ],
  "summary": "Các role/staff khác nhau dưới một merchant account có cùng quyền dùng language switcher không — chưa xác nhận",
  "detail": "\"Translate Portal\" dùng cả 'merchant' và 'staff' khi mô tả token hiển thị tên trong greeting (KB-009) nhưng không xác nhận có giới hạn quyền nào giữa các role khác nhau dưới một merchant account đối với việc thấy/dùng language switcher. Cần PO/Dev xác nhận."
}
```

## OQ-translate-portal-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-017"
  ],
  "summary": "Lựa chọn ngôn ngữ Portal có persist qua reload/session, và theo scope nào — chưa xác nhận",
  "detail": "Lựa chọn ngôn ngữ Portal có persist qua session/reload trang không, và nếu có thì theo merchant-user, theo store, hay chỉ client-side/cookie? Cần PO/Dev xác nhận để thiết kế được test case cho hành vi reload/re-login."
}
```

## OQ-translate-portal-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-018"
  ],
  "summary": "Ngôn ngữ đã chọn ở Dashboard có áp dụng trên các trang Portal khác không — chưa xác nhận",
  "detail": "Dropdown ngôn ngữ (và lựa chọn ngôn ngữ đã chọn) ở Dashboard có áp dụng/xuất hiện trên các trang Portal khác (Manage offers, Translations, Variant swatches, Analytics, Feature requests, trang cài đặt offer riêng lẻ) hay không? Cần PO/Dev xác nhận phạm vi áp dụng."
}
```

## OQ-translate-portal-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-022"
  ],
  "summary": "Browser tab title dịch 'Dashboard'→'Bảng điều khiển' khi chuyển Tiếng Việt",
  "detail": "Ví dụ 'Dashboard'→'Bảng điều khiển' (tab title, Tiếng Việt) chỉ là 1 lần live-test minh hoạ (chỉ dựa trên 1 ví dụ quan sát được/INFERRED, LOW, single-source). Có nên coi đây là business rule bắt buộc (exact string) hay chỉ là ví dụ minh hoạ có thể thay đổi? Cần PO/Dev xác nhận."
}
```

## OQ-translate-portal-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-023"
  ],
  "summary": "Left-nav dịch sang các chuỗi Tiếng Việt cụ thể đã tài liệu hoá",
  "detail": "Các cặp chuỗi left-nav dịch cụ thể (ví dụ 'Manage offers'→'Quản lý ưu đãi'...) chỉ là ví dụ minh hoạ từ 1 lần live-test (chỉ dựa trên 1 ví dụ quan sát được/INFERRED, LOW). Đây có phải bản dịch chính thức/ổn định hay chỉ là ví dụ nhất thời? Cần PO/Dev xác nhận."
}
```

## OQ-translate-portal-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-024"
  ],
  "summary": "Greeting dịch 'Hi [name]!'→'Xin chào [name]!' khi chuyển Tiếng Việt",
  "detail": "Cặp chuỗi greeting cụ thể ('Hi [REDACTED]!'→'Xin chào [REDACTED]!') chỉ là ví dụ minh hoạ từ 1 lần live-test (chỉ dựa trên 1 ví dụ quan sát được/INFERRED, LOW). Cần PO/Dev xác nhận format dịch này có cố định/business rule hay có thể thay đổi."
}
```

## OQ-translate-portal-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-025"
  ],
  "summary": "Column header bảng offers dịch sang các chuỗi Tiếng Việt cụ thể đã tài liệu hoá",
  "detail": "Các cặp chuỗi column header bảng offers dịch cụ thể ('Internal name'→'Tên nội bộ'...) chỉ là ví dụ minh hoạ từ 1 lần live-test (chỉ dựa trên 1 ví dụ quan sát được/INFERRED, LOW). Cần PO/Dev xác nhận đây có phải bản dịch chính thức ổn định hay có thể thay đổi."
}
```

## OQ-translate-portal-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-026"
  ],
  "summary": "Cell values bảng offers dịch cụ thể, 'Multibuy' giữ nguyên không dịch",
  "detail": "Các cặp giá trị cell bảng offers dịch cụ thể, đặc biệt 'Multibuy' được giữ nguyên không dịch trong ví dụ gốc, chỉ là ví dụ minh hoạ từ 1 lần live-test (chỉ dựa trên 1 ví dụ quan sát được/INFERRED, LOW). Cần PO/Dev xác nhận 'Multibuy' không dịch là chủ ý hay là gap/bug chưa dịch."
}
```

## OQ-translate-portal-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-portal-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-portal",
  "check_ids": [
    "translate-portal:CHK-027"
  ],
  "summary": "Nhãn dropdown ngôn ngữ tự dịch 'Language:'→'Ngôn ngữ:'",
  "detail": "Cặp chuỗi nhãn dropdown ('Language:'→'Ngôn ngữ:') chỉ là ví dụ minh hoạ từ 1 lần live-test (chỉ dựa trên 1 ví dụ quan sát được/INFERRED, LOW). Cần PO/Dev xác nhận đây có phải bản dịch ổn định cho chính nhãn control hay có thể đổi."
}
```

