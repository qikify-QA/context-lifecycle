// Sinh portal-evidence.json từ capture đã redact. Không cần token, không gọi mạng.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const runDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const net = (a) => JSON.parse(readFileSync(path.join(runDir, "raw/network", `${a}.json`), "utf8"));
const R = "[REDACTED]";
const ref = (a, note = "") => ({ type: "har_entry", path: `raw/network/${a}.json`, act_id: a, note });

const messages = (a) => net(a).entries.flatMap((e) => {
  const b = e.response?.body, s = e.response?.status, m = [];
  const route = `${e.request.method} ${e.request.url.replace("https://staging-api.teeinblue.com", "")}`.slice(0, 110);
  if (b && typeof b === "object" && b.message && b.message !== R) m.push({ route, status: s, message: b.message, ...(b.errors ? { errors: b.errors } : {}) });
  else if (typeof b === "string" && /Redirecting to/.test(b)) m.push({ route, status: s, message: "HTML redirect", location: e.response.headers.location });
  else m.push({ route, status: s });
  return m;
});
const quota = (a) => net(a).entries.map((e) => e.response?.headers?.["x-ratelimit-remaining"]).filter((x) => x !== undefined);

const RO = { read_only: true, note: "Action read-only, không đổi object state; không đọc lại riêng." };
const NOASSET = { run_assets: [], source: "ACT-01-03-004: list name=QA-CTX-20261106-02-a.png rỗng" };
const ONE = { run_assets: [11751], status: "ready", source: "ACT-01-03-009" };
const A = (act_id, description, input, o = {}) => ({ act_id, description, input, mutation: o.mutation ?? false, cleanup_result: o.cleanup ?? "NOT_NEEDED",
  before: o.before ?? RO, after: o.after ?? RO, outcome: o.outcome ?? "SUCCESS", note: o.note, cleanup_note: o.cleanup_note });

const scenarios = [
 { scn_id: "SCN-01-00", objective: "Tìm spec Open API bằng số ít đường dẫn hiển nhiên, không gửi token", actions: [
   A("ACT-01-00-001", "GET 6 đường dẫn spec không kèm Authorization", { paths: ["/openapi/v1", "/openapi/v1/openapi.json", "/openapi/v1/docs", "/openapi.json", "/openapi/docs", "/docs/openapi"] }) ] },
 { scn_id: "SCN-01-01", objective: "Quan sát xác thực bằng token và tìm định danh account của token", actions: [
   A("ACT-01-01-001", "GET /api/user bằng Bearer token (account_guard)", { token_env: "TIB_FULL_ACCESS_TOKEN" }, { note: "2 entry. Entry 1 có message bị filter keepOnly che nhầm; entry 2 lặp lại để có nguyên văn." }),
   A("ACT-01-01-002", "GET 5 route định danh hiển nhiên dưới /openapi/v1", { paths: ["user", "me", "account", "shop", "store"] }),
   A("ACT-01-01-003", "Đọc item list để tìm định danh account: layer-images, layer-image-categories, clipart-categories", { per_page: [1, 30] }, { note: "5 entry. Entry 1 che field bằng keepOnly; entry 2 và 5 giữ đường dẫn url." }),
   A("ACT-01-01-004", "GET layer-images không gửi Authorization, có Accept: application/json", { auth: false }),
   A("ACT-01-01-005", "GET layer-images với token và Accept: application/json", { per_page: 1 }),
   A("ACT-01-01-006", "GET layer-images với token, không gửi header Accept", { per_page: 1, accept: null }),
   A("ACT-01-01-007", "GET layer-images không token, không gửi header Accept", { per_page: 1, accept: null, auth: false }) ] },
 { scn_id: "SCN-01-02", objective: "Quan sát phân trang, search và name trên layer images, layer image categories, clipart categories", actions: [
   A("ACT-01-02-001", "List layer images trang 1", { per_page: 2 }),
   A("ACT-01-02-002", "Theo links.next của layer images", { follow: "links.next" }),
   A("ACT-01-02-003", "List layer images với search một phần tên", { per_page: 5, search: "qa-v" }),
   A("ACT-01-02-004", "List layer images với name một phần tên", { per_page: 5, name: "qa-v" }),
   A("ACT-01-02-005", "List layer images với name đầy đủ", { per_page: 5, name: "qa-vector" }),
   A("ACT-01-02-006", "List layer images với search và name cùng lúc", { per_page: 5, search: "qa-v", name: "2_tay_xanh_cheo_nhau" }),
   A("ACT-01-02-007", "List layer image categories với search và name cùng lúc", { per_page: 5, search: "QA", name: "QA" }),
   A("ACT-01-02-008", "List clipart categories trang 1", { per_page: 2 }),
   A("ACT-01-02-009", "Theo links.next của clipart categories", { follow: "links.next" }),
   A("ACT-01-02-010", "List clipart categories với search một phần tên", { per_page: 5, search: "ReCheck" }),
   A("ACT-01-02-011", "List clipart categories với name một phần tên", { per_page: 5, name: "ReCheck" }),
   A("ACT-01-02-012", "List clipart categories với search và name cùng lúc", { per_page: 5, search: "ReCheck", name: "zzz-no-match" }) ] },
 { scn_id: "SCN-01-03", objective: "Quan sát luồng upload layer image: xin upload URL, finalize trước PUT, PUT, finalize, đọc status", actions: [
   A("ACT-01-03-001", "Xác định route bằng GET (không có spec); gồm đọc item, các route upload ứng viên, list cliparts", { paths: ["layer-images/10277", "layer-images/upload-url", "layer-images/uploads", "layer-images/upload", "uploads", "upload-url", "temporary-files/upload-url", "assets/upload-url", "cliparts?per_page=1", "cliparts?per_page=1&search=qa"] }),
   A("ACT-01-03-002", "POST /uploads thân rỗng để đọc validation", { body: {} }, { before: NOASSET, after: { ...NOASSET, note: "422, không tạo gì" } }),
   A("ACT-01-03-003", "POST /layer-images thân rỗng để đọc validation", { body: {} }, { before: NOASSET, after: { ...NOASSET, note: "422, không tạo gì" } }),
   A("ACT-01-03-004", "Before: list layer images theo tên file", { name: "QA-CTX-20261106-02-a.png" }),
   A("ACT-01-03-005", "POST /uploads xin upload URL", { filename: "QA-CTX-20261106-02-a.png", filesize: 96 }, { mutation: true, before: NOASSET, after: { run_assets: [], upload_reservation: "[REDACTED]", expires_at: "2026-11-06T13:14:59Z" }, cleanup_note: "Reservation đã dùng ở ACT-01-03-008; ACT-01-05-001 cho thấy không còn dùng lại được." }),
   A("ACT-01-03-006", "POST /layer-images với upload_id trước khi PUT", { upload_id: "[REDACTED]" }, { before: NOASSET, after: { ...NOASSET, note: "422, không tạo asset" } }),
   A("ACT-01-03-007", "PUT file lên upload_url, không gửi token", { content_type: "image/png", bytes: 96, host: "oe-cdn.sgp1.digitaloceanspaces.com", tags: ["host_not_in_expected_api_base"] }, { mutation: true, cleanup: "FAILED", before: { temporary_object: "chưa có" }, after: { temporary_object: "PUT trả 200; object nằm dưới /teeinblue-staging/temporary-files/2026-11-06/" }, cleanup_note: "Không có đường xoá object tạm và không thử. Trạng thái object sau finalize chưa kiểm tra. FAILED ở đây nghĩa là chưa chứng minh được đã dọn." }),
   A("ACT-01-03-008", "POST /layer-images với upload_id sau PUT (finalize)", { upload_id: "[REDACTED]" }, { mutation: true, cleanup: "DONE", before: NOASSET, after: { run_assets: [11751], status: "processing", url: null, source: "response 201" }, cleanup_note: "Asset 11751 đã xoá ở ACT-01-06-001, xác nhận ở ACT-01-06-002/003/004." }),
   A("ACT-01-03-009", "GET layer image vừa tạo để đọc status", { id: 11751, polls: 1, delay_seconds_after_finalize: 51 }, { before: { run_assets: [11751], status: "processing" }, after: ONE }) ] },
 { scn_id: "SCN-01-04", objective: "Quan sát on_duplicate=skip với tên trùng asset run vừa tạo", actions: [
   A("ACT-01-04-001", "POST /layer-images chỉ có on_duplicate sai giá trị, để biết tham số có được nhận không", { on_duplicate: "__invalid__" }, { before: ONE, after: { ...ONE, note: "422, không tạo gì" } }),
   A("ACT-01-04-002", "POST /uploads lần 2 cùng tên file", { filename: "QA-CTX-20261106-02-a.png", filesize: 96 }, { mutation: true, before: ONE, after: { ...ONE, upload_reservation: "[REDACTED]", expires_at: "2026-11-06T13:17:32Z" }, cleanup_note: "Reservation đã gửi finalize ở ACT-01-04-004; không kiểm tra riêng còn dùng được không, expires_at đã qua khi kết thúc run." }),
   A("ACT-01-04-003", "PUT file lần 2 lên upload_url, không gửi token", { content_type: "image/png", bytes: 96, host: "oe-cdn.sgp1.digitaloceanspaces.com", tags: ["host_not_in_expected_api_base"] }, { mutation: true, cleanup: "FAILED", before: ONE, after: { ...ONE, temporary_object: "PUT trả 200; object tạm thứ hai" }, cleanup_note: "Không có đường xoá object tạm và không thử. Object này không thành asset mới; có còn trên storage hay không chưa kiểm tra." }),
   A("ACT-01-04-004", "POST /layer-images với upload_id mới và on_duplicate=skip", { upload_id: "[REDACTED]", on_duplicate: "skip" }, { mutation: true, before: ONE, after: { run_assets: [11751], source: "response 200 trả id 11751, created_at không đổi; ACT-01-06-004 list theo tên rỗng sau khi xoá 11751 nên không có asset trùng tên thứ hai" } }) ] },
 { scn_id: "SCN-01-05", objective: "Quan sát dùng lại upload_id đã finalize", actions: [
   A("ACT-01-05-001", "POST /layer-images với upload_id đã finalize", { upload_id: "[REDACTED]" }, { before: ONE, after: { ...ONE, note: "422, không tạo asset" } }) ] },
 { scn_id: "SCN-01-06", objective: "Cleanup asset do run tạo và xác nhận đã mất", actions: [
   A("ACT-01-06-001", "DELETE layer image do run tạo", { id: 11751 }, { mutation: true, cleanup: "DONE", before: ONE, after: { run_assets: [], source: "ACT-01-06-002/003/004" }, note: "Ngoại lệ forbidden_actions do operator cấp: chỉ asset do run tạo." }),
   A("ACT-01-06-002", "GET lại layer image đã xoá", { id: 11751 }, { before: { run_assets: [] }, after: { run_assets: [], status: 404 } }),
   A("ACT-01-06-003", "List theo tên file sau cleanup", { name: "QA-CTX-20261106-02-a.png" }),
   A("ACT-01-06-004", "List theo tên asset sau cleanup", { name: "QA-CTX-20261106-02-a" }) ] }
];
const actIds = [];
for (const s of scenarios) for (const a of s.actions) {
  actIds.push(a.act_id);
  a.before = { screenshot: null, dom: null, object_state: a.before };
  a.after = { screenshot: null, dom: null, object_state: a.after, messages: messages(a.act_id) };
  a.network_ref = `raw/network/${a.act_id}.json`;
  a.console_errors = [];
  const q = quota(a.act_id); if (q.length) a.x_ratelimit_remaining_seen = q;
  if (!a.note) delete a.note; if (!a.cleanup_note) delete a.cleanup_note;
}

let n = 0;
const O = (surface, element, observed_result, acts, basis = "observed") => ({ observation_id: `OBS-${String(++n).padStart(3, "0")}`, surface, element, observed_result, evidence_refs: acts.map((a) => ref(a)), basis });
const S = "open-api";
const observations = [
 O(S, "GET /api/user", "Với Authorization Bearer của TIB_FULL_ACCESS_TOKEN trả 401 {\"message\":\"Unauthenticated.\"} (2/2 lần).", ["ACT-01-01-001"]),
 O(S, "spec", "6 đường dẫn thử (không token) đều 404 JSON dạng \"The route ... could not be found.\". Không tìm được spec.", ["ACT-01-00-001"]),
 O(S, "route định danh", "GET /openapi/v1/{user,me,account,shop,store} với token đều 404.", ["ACT-01-01-002"]),
 O(S, "định danh qua asset", "GET layer-images?per_page=30 trả 10 item, next_cursor null; 10/10 item có url bắt đầu users/266/. Item không có field user_id.", ["ACT-01-01-003"]),
 O(S, "định danh qua asset mới tạo", "Asset 11751 do chính token tạo có url users/266/image-layers/6aedd1e652e77_large.webp.", ["ACT-01-03-009"]),
 O(S, "xác thực", "Không gửi token, có Accept: application/json: 401 {\"message\":\"Unauthenticated.\"}.", ["ACT-01-01-004"]),
 O(S, "xác thực", "Có token, không gửi header Accept: 200 JSON.", ["ACT-01-01-006"]),
 O(S, "xác thực", "Không token, không gửi header Accept: 302 HTML, Location https://staging-api.teeinblue.com/api/login.", ["ACT-01-01-007"]),
 O(S, "quota header", "Response có token trên route tồn tại mang x-ratelimit-limit: 5 và x-ratelimit-remaining giảm dần. Không thấy x-ratelimit-reset hay retry-after. Không có các header này trên 404 route không tồn tại, 405, 401 và 302 đã thấy. 404 trên route có thật (GET item đã xoá) và POST 422 có mang header, remaining giảm. Không gặp 429.", ["ACT-01-01-003", "ACT-01-02-006", "ACT-01-03-002", "ACT-01-03-006", "ACT-01-06-002"]),
 O(S, "quota header", "remaining trở lại 4 ở các mốc cách nhau khoảng 60-80 giây trong chuỗi request giãn 20 giây, gợi ý cửa sổ cỡ 1 phút; chưa kiểm chứng trực tiếp.", ["ACT-01-02-003", "ACT-01-02-004", "ACT-01-02-007", "ACT-01-02-010"], "inferred"),
 O(S, "phân trang", "Không có search: layer images và clipart categories phân trang bằng cursor; links.next chứa cursor, meta có path, per_page, next_cursor, prev_cursor; links.first và links.last null; theo links.next trả trang kế tiếp. Có search: response dạng page; meta có current_page, from, last_page, links, path, per_page, to, total, không có next_cursor và prev_cursor; links.first, links.last, links.next (khi có) chứa tham số query=<giá trị search> và page, trong đó query không có trong request.", ["ACT-01-02-001", "ACT-01-02-002", "ACT-01-02-008", "ACT-01-02-009", "ACT-01-02-003", "ACT-01-02-010"]),
 O(S, "phân trang", "Không truyền per_page thì meta.per_page là 25.", ["ACT-01-03-004"]),
 O(S, "layer images search/name", "search=qa-v trả 1 item qa-vector; name=qa-v trả 0 item; name=qa-vector trả 1 item.", ["ACT-01-02-003", "ACT-01-02-004", "ACT-01-02-005"]),
 O(S, "clipart categories search/name", "search=ReCheck, per_page=5: trang 1 có 5 item, meta.total 6, meta.last_page 2. name=ReCheck trả 0 item.", ["ACT-01-02-010", "ACT-01-02-011"]),
 O(S, "search + name", "Gửi cả search và name trên layer-images, layer-image-categories, clipart-categories đều 422 \"The search field prohibits name from being present.\"", ["ACT-01-02-006", "ACT-01-02-007", "ACT-01-02-012"]),
 O(S, "layer image categories", "GET layer-image-categories?per_page=1 trả data rỗng trên account này.", ["ACT-01-01-003"]),
 O(S, "cliparts", "GET cliparts?per_page=1 trả 200; thêm search=qa trả 422 \"The search field is prohibited.\"", ["ACT-01-03-001"]),
 O(S, "route upload", "GET /openapi/v1/uploads trả 405, Allow: POST, \"The GET method is not supported for route openapi/v1/uploads. Supported methods: POST.\" Các route ứng viên khác 404.", ["ACT-01-03-001"]),
 O(S, "POST /uploads", "Thân rỗng trả 422: filename và filesize \"field is required\".", ["ACT-01-03-002"]),
 O(S, "POST /layer-images", "Thân rỗng trả 422: upload_id, file, url đều báo required khi hai field kia không có.", ["ACT-01-03-003"]),
 O(S, "POST /uploads", "Hợp lệ trả 201 với upload_id, upload_url, upload_headers, expires_at. expires_at cách thời điểm gọi khoảng 5 phút (2/2 lần).", ["ACT-01-03-005", "ACT-01-04-002"]),
 O(S, "host upload", "upload_url trỏ tới oe-cdn.sgp1.digitaloceanspaces.com, path /teeinblue-staging/temporary-files/<ngày>/<file>. Host ngoài expected_api_base: host_not_in_expected_api_base. Query đã che.", ["ACT-01-03-005", "ACT-01-03-007", "ACT-01-04-003"]),
 O(S, "finalize trước PUT", "422 \"The file has not been uploaded yet. PUT it to the upload_url first.\"", ["ACT-01-03-006"]),
 O(S, "PUT", "PUT PNG 96 byte với Content-Type image/png, không token, trả 200 (2/2 lần).", ["ACT-01-03-007", "ACT-01-04-003"]),
 O(S, "finalize", "Sau PUT trả 201, id 11751, name bỏ đuôi file, category_id null, status processing, url null, thumbnail_url null, width/height null. Không gửi category_id.", ["ACT-01-03-008"]),
 O(S, "status", "GET sau 51 giây trả status ready, url users/266/image-layers/..._large.webp, thumbnail_url trên cdn.ownego.com, width 32, height 32; updated_at cách created_at 2 giây.", ["ACT-01-03-009"]),
 O(S, "on_duplicate", "on_duplicate=__invalid__ trả lỗi \"The selected on duplicate is invalid.\" cùng các lỗi required.", ["ACT-01-04-001"]),
 O(S, "on_duplicate=skip", "upload_id mới, cùng tên file, on_duplicate=skip trả 200 với asset 11751 đã có, created_at không đổi. Sau khi xoá 11751, list theo tên rỗng.", ["ACT-01-04-004", "ACT-01-06-004"]),
 O(S, "dùng lại upload_id", "upload_id đã finalize dùng lại trước expires_at trả 422 \"The upload was not found or has expired. Create a new one with POST /uploads.\"", ["ACT-01-05-001"]),
 O(S, "DELETE", "DELETE /layer-images/11751 trả 204; GET lại trả 404 \"Not found.\"; list theo tên file và theo tên asset đều rỗng.", ["ACT-01-06-001", "ACT-01-06-002", "ACT-01-06-003", "ACT-01-06-004"]),
 O(S, "lỗi debug", "Response 404/405 trên staging kèm exception, file, line, trace. Trace của GET item đã xoá nêu app/Traits/GuardsOpenApiIds.php và PublicLayerImageController findOwnedOrFail.", ["ACT-01-00-001", "ACT-01-06-002"]),
 O(S, "cliparts", "Clipart 41730 (category 6023) đọc ngày 2026-11-06 có status processing, url null, thumbnail_url null; created_at và updated_at đều 2026-09-10T16:12:37.000000Z. Một sample, không rõ có kẹt hay không.", ["ACT-01-03-001"])
];

const payload = {
  portal_context: { environment: "staging", role: "merchant-owner", account_verified_by: [
      "GIÁN TIẾP. account_guard GET /api/user KHÔNG xác minh được: 401 Unauthenticated (ACT-01-01-001).",
      "10/10 layer image của token có url users/266/ (ACT-01-01-003).",
      "Asset 11751 do chính token tạo nằm dưới users/266/ (ACT-01-03-009).",
      "Clipart category 6029 có trong evidence run CTX-20260914-02 của account explorer.",
      "TIB_API_BASE và TIB_OPENAPI_BASE có host staging-api.teeinblue.com, kiểm tra trước request đầu tiên."],
    object_key: "open-api", object_id: "https://staging-api.teeinblue.com/openapi/v1", initial_state: "Chưa có knowledge cho object. Account có 10 layer image, 0 layer image category, có clipart category sẵn; không sửa cái nào.", transport: "http_via_bash", store: "không có field store trong response; store không xác minh qua Open API" },
  observations,
  feature_candidates: [{ feature_id: "FEAT-01-open-api-asset-upload", feature_key: "open-api-asset-upload", name: "Đưa asset vào thư viện merchant từ hệ thống ngoài qua Open API", user_goal: "Merchant dùng token Open API để tra cứu asset, category và thêm layer image vào thư viện mà không mở portal", entry_point: "TIB_OPENAPI_BASE + token do merchant tạo", observation_ids: observations.map((o) => o.observation_id), scenarios }],
  permissions_observed: [
    { subject: "TIB_FULL_ACCESS_TOKEN", observed: "Được đọc layer-images, layer-image-categories, clipart-categories, cliparts; được POST uploads, POST layer-images, DELETE layer-images/{id} trên asset do chính nó tạo. Các ability khác không thử." },
    { subject: "TIB_FULL_ACCESS_TOKEN", observed: "Không dùng được trên GET /api/user (401)." } ],
  skipped_actions: [
    { description: "Upload clipart", reason: "Operator cấm trong run: xoá clipart có thể chỉ vào Trash nên không kiểm được đã mất." },
    { description: "POST /layer-images với field url", reason: "Upload theo URL ngoài bị cấm (SSRF probe, URL private, URL công cộng). Field url có thật theo validation ở ACT-01-03-003." },
    { description: "POST /layer-images với field file", reason: "Không nằm trong luồng được giao và giữ quota; không chạy." },
    { description: "Token giả, token người khác, token ability khác, TIB_USER_B_*", reason: "Cấm theo brief." },
    { description: "Tạo category, truyền category_id", reason: "Cấm tạo category. Account không có layer image category và upload không đòi category_id." },
    { description: "Xoá hay sửa asset có sẵn; xoá layer image đang được dùng", reason: "Cấm theo policy; không có asset run tạo đang được dùng." },
    { description: "Chờ upload_url hoặc upload_id hết hạn", reason: "Không chạy: expires_at được ghi, hành vi sau hạn không thử." },
    { description: "Chạm 429 hay daily limit", reason: "Cấm cố ý chạm; helper giãn 15-20 giây và dừng khi gặp 429." },
    { description: "Giá trị on_duplicate khác skip", reason: "Không có spec; giữ giới hạn upload tối đa 2 file." },
    { description: "Write ability khác: orders, campaigns; tạo hoặc thu hồi token", reason: "Cấm theo policy." } ],
  unexplored_areas: [
    "Không có spec nên không liệt kê được endpoint ngoài scope: orders, campaigns, customizations, webhooks chưa có tên route, không gọi.",
    "GET /openapi/v1/customizations/{uuid}: chỉ có trong knowledge đã publish (_flows/storefront-sdk.md), không gọi.",
    "search và name riêng lẻ trên layer-image-categories (account không có category, chỉ thử cả hai cùng lúc).",
    "name trên cliparts; phân trang cliparts; GET item của clipart categories.",
    "Các method khác trên /layer-images/{id} ngoài GET và DELETE; route ghi của category và clipart.",
    "Item kẹt processing: chưa thấy ở lần upload duy nhất; file lớn, định dạng khác chưa thử.",
    "Validation của filename, filesize ngoài trường hợp thiếu field; filesize lệch với file thật.",
    "Header x-ratelimit-* của quota theo ngày nếu có." ],
  coverage_limitations: [
    "Object là API, không có UI: screenshot và dom của mọi action là null, UI evidence không áp dụng. before/after dùng object state lấy bằng GET hoặc từ response.",
    "Action read-only không đọc lại riêng state; before/after ghi read_only.",
    "Không có spec. Route xác định qua phản hồi server (405 Allow, 422). Tham số on_duplicate xác định qua validation. Route ứng viên trả 404 chỉ nghĩa là đường dẫn đó không có trên staging tại thời điểm thử.",
    "CBS-080 không có trên đĩa và agent này không có công cụ QA Hub; không đối chiếu được claim.",
    "outcome SUCCESS nghĩa là action đã chạy và quan sát được kết quả, kể cả khi status là 4xx.",
    "Mỗi hành vi đa số chỉ có 1 sample; không suy required, enum hay boundary.",
    "ACT-01-00-001, ACT-01-01-002, ACT-01-01-003, ACT-01-03-001 gom nhiều request vào một ACT; mỗi request là một entry.",
    "ACT-01-01-001 entry 1 và ACT-01-01-003 entry 1 che dư do filter keepOnly; entry sau giữ đủ.",
    "Chuỗi trong header report-to của Cloudflare được che thêm vì giống chữ ký.",
    "Không dùng ngoại lệ domain RFC 2606.",
    "Before của ACT-01-03-004 dùng tên có đuôi .png (QA-CTX-20261106-02-a.png), trong khi asset tạo ra có name không đuôi, nên không chứng minh trước upload chưa có asset cùng name." ],
  created_assets: [{ id: 11751, name: "QA-CTX-20261106-02-a", type: "layer_image", cleanup_result: "DONE" }],
  request_totals: { total: 61, note: "Vượt nhẹ mức dưới ~60 của brief." },
  current_behavior_only: true, redaction_applied: true
};
const artifact = {
  schema_version: "1.0", artifact_type: "FeatureDiscoveryArtifact", artifact_id: "FDA-CTX-20261106-02-open-api", workflow_id: "CTX-20261106-02", producer: "portal-explorer",
  source_refs: ["input/bootstrap-request.json", "config/products/teeinblue.json", "config/products/teeinblue/explore-playbook.md"], upstream_artifact_ids: [],
  status: "PARTIAL", confidence: "MEDIUM", observations: observations.map((o) => o.observation_id), assumptions: ["Giá trị upload_id và upload_reservation đã che thành [REDACTED] trong raw/network và evidence theo yêu cầu orchestrator (§6, không chắc thì redact); hai upload khác nhau không còn phân biệt được bằng giá trị, phân biệt bằng ACT-ID. Tham số Cloudflare m= trong header cũng đã che."],
  unknowns: [
    "Account guard không chạy được đúng theo config: định danh 266 là gián tiếp qua đường dẫn lưu trữ.",
    "Spec Open API: không tìm được.",
    "Hai object tạm dưới temporary-files có còn trên storage sau run hay không.",
    "File ảnh của asset 11751 trên cdn.ownego.com có còn truy cập được sau DELETE hay không: không kiểm tra.",
    "Clipart 41730 ở processing, url null từ 2026-09-10 tới 2026-11-06: không rõ có kẹt không, một sample.",
    "Độ dài cửa sổ quota và quota theo ngày: không có header reset.",
    "upload_headers của POST /uploads chỉ thấy khoá Host trong 2 sample; không rõ có trường hợp trả header khác hay không." ],
  conflicts: [], blocking_issues: [],
  payload,
  gate: { decision: "CONDITIONAL_PASS", blocking_findings: [],
    conditions: ["Orchestrator chấp nhận xác minh account gián tiếp thay cho GET /api/user.", "Orchestrator xem xét hai object tạm chưa dọn được (ACT-01-03-007, ACT-01-04-003).", "UI evidence không áp dụng theo brief: before/after dùng object state."],
    allowed_next_steps: ["api-explorer"] }
};
const out = JSON.stringify(artifact, null, 2);
writeFileSync(path.join(runDir, "raw/portal/portal-evidence.json"), out);
console.log("acts", actIds.length, "obs", observations.length);
