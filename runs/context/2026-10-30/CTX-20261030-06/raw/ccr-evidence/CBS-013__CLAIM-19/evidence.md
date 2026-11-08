# CBS-013__CLAIM-19

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-19` | Fix chính Schedule cache:prune-stale-tags hằng giờ + phát hiện phụ #1, #2, #4–#7 của description — không rõ đã ship trong ticket này hay tách | chưa rõ, cần agent tự đánh giá | `KHÔNG CÓ NGUỒN` — description đề xuất, comment dev không nhắc, Q1 trong RA chưa có đáp án | không khớp object nào trong registry, chưa rõ, cần agent tự đánh giá | UNKNOWN |

## Phần 1b

| `CLAIM-19` | không khớp registry — cache Redis phía server (mô tả bằng lời) | chưa rõ | không áp role (hạ tầng) | db | không có |

## Phần 5.1

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 description (Primary fix; Secondary findings); RA analysis_TIB-5203.md Q1`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
- **Người viết / người xác nhận:** `tinhpt (dev, reporter hiện tại)`
- **Trích nguyên văn:**
  ```
  Description: "Add to routes/console.php: Schedule::command('cache:prune-stale-tags')->hourly(); Run it once manually on production
  for immediate relief — it reclaims memory without dropping any cache entries that are still live." "## Secondary findings
  (suggest splitting into subtasks)"
  RA Q1 [Blocker]: "Phạm vi QA của TIB-5203 là chỉ PR #4063 (thu nhỏ cache campaign, phát hiện phụ #3), hay gồm cả fix chính
  (schedule `cache:prune-stale-tags` hằng giờ) và các phát hiện #1, #2, #4–#7?" — Nhật ký chốt trống, chưa có đáp án.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Không có test case nào gắn với claim này (chỉ nguồn Jira).
