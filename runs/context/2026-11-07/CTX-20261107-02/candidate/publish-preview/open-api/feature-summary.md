# Object: Open API (product: teeinblue) — Feature Profile Summary
**Published context version:** 2

- **Object:** API cho merchant dưới `/openapi/v1`, gọi bằng token. Phạm vi hiện có: xác thực token, tra cứu layer image và clipart, upload asset. Các nhóm route khác chưa có danh sách route đầy đủ và chưa có quan sát (đã biết `GET /openapi/v1/customizations/{uuid}` từ `_flows/storefront-sdk.md`, chưa gọi), xem OQ-open-api-013.
- **Quan sát:** staging, role `merchant-owner`, một account, một token, chỉ tầng API. Chưa có quan sát trên production hay tầng UI.
- **Knowledge:** 52 KB item: 39 `OBSERVED_CURRENT`, 3 `INFERRED`, 10 `CONFIRMED_EXPECTED`/`MEDIUM` từ lời dev ở Jira TIB-5536, chưa được quan sát đối chiếu. 68 check: 16 `STRONG`, 29 `BASELINE`, 23 `NONE`. Đa số hành vi quan sát chỉ có một sample. Hành vi quan sát được không phải expected requirement.
- **Giới hạn về account:** `GET /api/user` trả 401 với token Open API, nên account chỉ xác minh gián tiếp qua đường dẫn lưu trữ của asset. Store không xác minh được qua Open API. Xem OQ-open-api-008.
- **Open question:** 56 mục ở `open-questions.md`.

---

## `open-api-asset-upload` — Upload và tra cứu asset qua Open API

**Entry points:** `GET /openapi/v1/layer-images`, `/layer-image-categories`, `/clipart-categories`, `/cliparts`; `POST /openapi/v1/uploads`; `POST` và `DELETE` trên `/openapi/v1/layer-images`. Token trong biến `TIB_FULL_ACCESS_TOKEN`.

**Đã quan sát:**
1. Xác thực: có token thì route đọc trả 200; không token thì 401 hoặc 302 tới `/api/login` tuỳ header Accept.
2. Tra cứu: list layer image và clipart, phân trang cursor, đổi sang dạng page khi có search; `search` trên `cliparts` trả 422.
3. Upload: `POST /uploads`, PUT file lên `upload_url`, rồi finalize bằng `POST /layer-images` với `upload_id`. Finalize trước khi PUT trả 422.
4. Trùng tên: `on_duplicate=skip` trả lại asset đã có. Xoá: `DELETE` asset do chính token tạo trả 204.
5. Quota: header `x-ratelimit-limit` và `x-ratelimit-remaining` trên staging. Trong quan sát của object này chưa có lần vượt ngưỡng; asset-category KB-568 có ghi nhận của QA về 429 trên Open API, xem OQ-open-api-007.

**Theo lời dev (KB-043 đến KB-052), chưa quan sát đối chiếu:**
1. Lỗi: không token hoặc token revoked 401, thiếu quyền `assets:*` 403, id của account khác trên URL 404, `category_id`/`parent_id` của account khác trong body 422, hết daily limit hoặc vượt 60 request/phút 429.
2. Search: `search` dùng Typesense trên layer image, layer image category, clipart category; `name` là exact match, dùng cùng `search` trả 422; cliparts không có `search`.
3. Asset không có status failed: xử lý lỗi thì giữ `processing` với `url: null`. Layer image đang dùng không xoá được (400); clipart xoá vào Trash của portal, khôi phục trong 60 ngày.
4. Nguồn URL chỉ nhận http/https, chặn địa chỉ nội bộ và redirect, tối đa 64 MB, timeout 30 giây. Upload URL sống 5 phút, `upload_id` sống 30 phút, lỗi `upload_id` đều 422.
5. `on_duplicate`: `create` mặc định, `skip` trả item đã có, `replace` chỉ cho raster clipart; so theo tên, không theo nội dung.

**Chưa rõ về quota:** liên hệ giữa 60 request/phút, daily limit và header trên staging (OQ-open-api-049), nghĩa của câu trả lời "There's no reset." ở KB-049 (OQ-open-api-050). Không dùng 60 làm ngưỡng 429 trên staging. Mốc cửa sổ daily limit đang conflict ở asset-category, xem OQ-asset-category-031.
**Không dùng làm oracle:** KB-027, KB-033, KB-034 (`INFERRED`/`LOW`), vì host `oe-cdn.sgp1.digitaloceanspaces.com` và `cdn.ownego.com` chưa được xác nhận, xem OQ-open-api-001 và OQ-open-api-002.
**Conflict:** KB-007 `UNRESOLVED` trong CONF-open-api-001, khác artwork KB-057 về spec và token Open API, xem OQ-open-api-003.
**Chưa quan sát:** cô lập tenant, ability của token, nhánh `file` và `url` của finalize, vòng đời `upload_id` sau `expires_at`, việc dọn object tạm dưới `temporary-files/` (OQ-open-api-004, OQ-open-api-047).
**Checklist:** 68 check, 16 `STRONG`, 29 `BASELINE`, 23 `NONE`. Mười check cần layer image tạo qua bước PUT giữ `NEEDS_CONFIRMATION` tới khi host được xác nhận (OQ-open-api-001). **KB:** KB-001 đến KB-052.
