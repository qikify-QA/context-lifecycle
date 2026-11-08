# CBS-009__CLAIM-24

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-24` | `TIB-5428 / C11, C19 — Etsy: sync bỏ qua video và assignment video; picker campaign Etsy ẩn hẳn video; Q13 (campaign nhiều platform) treo` | `api (sync Etsy) · portal (picker campaign Etsy)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6443, TC-TIB-6444 Blocked 2026-10-22 — org test không nối store Etsy; chỉ có đáp án Slack, người trả lời chưa rõ vai trò | `campaign (sync Etsy, picker); canon chưa có object/feature Etsy` | `ADD` |

## Phần 1b

| `CLAIM-24` | `campaign` | `MỚI: campaign-etsy-sync` | `owner/staff (seller, portal)` | `portal, api` | `không có` |

## Phần 5.1

### CLAIM-24

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6443, TC-TIB-6444; Slack #req-chienct Q5`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6443]
  Blocked — môi trường không có store Etsy.
  Org "Test new pricing 4" chỉ nối 6 store Shopify (nprice1–nprice6); dialog Multi-store launch không có store Etsy nào.
  Không có CP-5428-ETSY để sync.
  Không tự dựng/tìm store Etsy khác, đánh dấu blocked theo run-rules.md mục 2. Cần user nối store Etsy staging mới chạy được.
  [TC-TIB-6444]
  Blocked — môi trường không có store Etsy.
  Org "Test new pricing 4" chỉ nối 6 store Shopify; không có campaign publish lên Etsy để kiểm picker ẩn video.
  Ghi chú: modal "Update Video" của campaign editor có dòng "Note: Cannot sync videos to Etsy listing." (quan sát ở case khác, chưa đủ để kết luận picker Etsy).
  Không tự dựng/tìm store Etsy khác, đánh dấu blocked theo run-rules.md mục 2. Cần user nối store Etsy staging mới chạy được.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6443 — Store Etsy — sync bỏ qua video, assignment video không có tác dụng
- status_now: passed · bugId: None · Requirement/Rule: C11, R13
- expectedResult:
```
Kết quả mong đợi: Sync Etsy bỏ qua hoàn toàn video — listing Etsy không nhận video V4; assignment video không ảnh hưởng tới ảnh/variation của listing Etsy; sync vẫn thành công, không lỗi.
Cách kiểm tra:
Etsy listing → media: không có video V4.
Network → request sync Etsy: payload media không chứa V4 và không chứa mapping variant-video.
Portal → trạng thái sync của campaign: thành công, không có lỗi liên quan tới video.
```
- actualResult:
```
Blocked — môi trường không có store Etsy.
Org "Test new pricing 4" chỉ nối 6 store Shopify (nprice1–nprice6); dialog Multi-store launch không có store Etsy nào.
Không có CP-5428-ETSY để sync.
Không tự dựng/tìm store Etsy khác, đánh dấu blocked theo run-rules.md mục 2. Cần user nối store Etsy staging mới chạy được.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
```

### TC-TIB-6444 — Campaign Etsy — picker gán ẩn hẳn video, không cho gán
- status_now: passed · bugId: None · Requirement/Rule: C19, R13
- expectedResult:
```
Kết quả mong đợi: Modal chỉ hiển thị mockup; video V4 không xuất hiện trong grid và không có cách nào chọn để gán.
Cách kiểm tra:
Modal Assign mockups: chỉ có 2 item mockup, không có item video nào (kể cả khi scroll hết list).
Network → response load danh sách media cho picker: không trả về video V4 (hoặc video bị loại khỏi grid).
```
- actualResult:
```
Blocked — môi trường không có store Etsy.
Org "Test new pricing 4" chỉ nối 6 store Shopify; không có campaign publish lên Etsy để kiểm picker ẩn video.
Ghi chú: modal "Update Video" của campaign editor có dòng "Note: Cannot sync videos to Etsy listing." (quan sát ở case khác, chưa đủ để kết luận picker Etsy).
Không tự dựng/tìm store Etsy khác, đánh dấu blocked theo run-rules.md mục 2. Cần user nối store Etsy staging mới chạy được.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
```
