# Claude native verification — 2026-11-07

Scope: khả năng native để thay custom orchestrator/agent definitions. Không thực hiện migration trong lượt kiểm chứng này. Không gọi Proposal API, publish knowledge, thay model/settings hay nâng CLI.

## Phương pháp và giới hạn

- Chạy CLI local `claude --version` và `claude --help`: 2.1.207.
- Đối chiếu tài liệu chính thức Claude Code về subagents, skills, CLI.
- Đọc metadata trong 5 session log chính gần nhất của repo tại thời điểm kiểm, nối tool-use ID → tool-result → transcript sub-agent. Chỉ xuất counts, ID, kích thước và trạng thái; không chép prompt/evidence hay thông tin xác thực vào báo cáo.
- Đã chuẩn bị smoke probe tại `/private/tmp/claude-native-verification-20261107/`: safe mode, không tools, chỉ trả NATIVE_READY, budget cấu hình 0.30 USD. Yêu cầu thực thi bị từ chối trước khi chạy. Không có kết quả live mới, không chạy lại bằng cách khác.
- Log lịch sử là bằng chứng runtime đã hoạt động, không phải thử nghiệm native-only sạch. CLAUDE.md, settings, MCP hoặc các instructions cũ vẫn có thể được nạp trong các phiên đó.

## Kết quả

| Khả năng | Bằng chứng | Kết luận |
|---|---|---|
| Dispatch không cần custom definition | 13 tool calls Agent với subagent_type general-purpose trong mẫu; nối được 11 child transcript riêng | Đã quan sát runtime native dispatch; không cần một named agent definition cho mỗi loại việc |
| Context worker tách khỏi hội thoại cha | Ví dụ parent đã có 160 record khi dispatch, task prompt 199 ký tự; first user message của child đúng prompt đó (201 ký tự nếu tính JSON quotes), không phải transcript cha | Đã quan sát conversation khởi đầu riêng. Không khẳng định worker không nhận shared CLAUDE.md/system context |
| Worker chạy và trả kết quả | 5 ví dụ child đầu có 26–37 user records/tool responses, 31–51 assistant records và mỗi child có một SubagentHandback | Có bằng chứng thực thi và native handback, vượt mức chỉ nhận lệnh launch |
| Nhắn tiếp tới worker | 12 SendMessage calls; 6 có tool results nối được trong mẫu, cả 6 không báo is_error | Đã quan sát native messaging. Chưa chứng minh resume general-purpose sau khi completed; các target nối được không nằm trong nhóm native children đã lấy |
| Gọi skill | 6 Skill calls; 4 nối được tool result, cả 4 không báo lỗi; có create-ccr/process-ccr | Cơ chế gọi skill native đã hoạt động. process-ccr có thể là legacy command qua cùng tool; không đồng nhất tất cả với SKILL.md mới |
| Skill body chỉ nạp khi dùng | Tài liệu chính thức xác nhận lazy loading | Được tài liệu hỗ trợ; chưa có controlled A/B initial prompt để chứng minh chi phí context trên bản cài |
| Model/effort cấp session | CLI 2.1.207 có --model và --effort low/medium/high/xhigh/max | Xác nhận CLI surface. Probe gọi model mới chưa chạy nên không ghi PASS cho effective runtime setting |
| Model/effort cấp mỗi lần dispatch | Mẫu general-purpose không truyền model/effort. Tài liệu ghi effort invocation cần >=2.1.292 | Chưa kiểm chứng. Không dùng giả định tính năng mới hoạt động trên 2.1.207 |
| Review độc lập không có custom reviewer | Context riêng native là nền tảng hỗ trợ | Chưa có controlled test producer/reviewer và assertion đúng/sai; chưa chứng minh gate nghiệp vụ |
| Delegation tự quyết trong native-only workspace | Log có native dispatch nhưng phiên vẫn mang cấu hình/instructions repo | Chưa kiểm chứng hành vi khi bỏ toàn bộ custom definitions |
| Compact/resume native thay checkpoint riêng | Có log compact lịch sử; CLI hỗ trợ resume | Chưa chứng minh khôi phục đủ trạng thái workflow sau compact; không tự bỏ checkpoint nghiệp vụ |
| Full CCR workflow không có Otto/custom agents | Chưa chạy fixture native-only | Chưa kiểm chứng end-to-end; chưa xoá definitions hiện tại |

Counts mô tả record đã nối được, không phải census tất cả phiên. Tool result không báo lỗi không tự chứng minh task đạt yêu cầu; riêng handback cũng không thay independent quality review.

## Ví dụ trace có thể đối chiếu

Session `47793c89-0f43-4b47-8dda-731d8fec8f09`, trong thư mục project log local:

- Native child `a5856ce9153a2f8d4`: parent dispatch sau 160 record; prompt 199 ký tự; child có 165 record, 42 assistant record, 1 SubagentHandback.
- Native child `a09bd77c12758a8b3`: parent dispatch sau 161 record; prompt 199 ký tự; child có 200 record, 51 assistant record, 1 SubagentHandback.
- Native child `aa05bd88dc747d058`: prompt 208 ký tự; child có 165 record và 1 SubagentHandback.

Các prompt dispatch đầu đã kiểm không nhắc Otto, orchestrator, .claude/agents, CLAUDE.md hoặc process-ccr. Điều này củng cố việc native worker có thể nhận nhiệm vụ ngắn trực tiếp, nhưng không loại trừ instructions được runtime nạp tự động.

## Hệ quả kiến trúc

1. Có cơ sở bỏ việc tạo một agent definition cho mỗi bước chỉ nhằm có context riêng hoặc handoff: native general-purpose đã cung cấp cơ chế đó.
2. Skill/workflow là nơi giữ quy trình và luật nghiệp vụ tái sử dụng; không cần định nghĩa Otto chỉ để gọi các bước tuần tự.
3. Bỏ definition không có nghĩa được bỏ instruction nghiệp vụ, artifact contract, independent review hoặc script lock/validate/publish. Các phần này chưa được native tự suy ra từ mục tiêu.
4. Task-fit trước mắt có thể khuyến nghị model/effort cấp task/session. Không cam kết đổi effort riêng cho từng worker trên CLI 2.1.207. Nâng phiên bản và kiểm lại là bước riêng.
5. Chưa có cơ sở xoá role definitions và lớp điều phối đang hoạt động ngay trong lượt audit; cần một thử nghiệm native-only cô lập trước migration.

## Bài thử còn thiếu để chốt migration

Chỉ chạy khi thực thi Claude API được phép; không gọi external business tools.

- Workspace tạm không có `.claude/agents/`, không repo CLAUDE.md/agent config; MCP trống, tools giới hạn đọc fixture và native delegation.
- Giao một mục tiêu có hai phần độc lập nhưng không yêu cầu dùng agent; ghi nhận Claude có tự delegate không. Không delegate không tự động là fail nếu Claude giải quyết tốt trong main context.
- Giao rõ việc cho built-in general-purpose để kiểm context isolation bằng sentinel không có trong delegation prompt; kiểm bằng transcript, không chỉ câu trả lời tự khai.
- Worker hoàn thành, rồi resume cùng agent ID và sửa đúng một yêu cầu; xác nhận transcript nối tiếp và kết quả thay đổi đúng.
- Đặt một fixture skill có marker riêng trong body. So sánh trước và sau invocation để kiểm nạp theo nhu cầu.
- Cố ý tạo candidate có một lỗi oracle và một item base thiếu. Native reviewer mới phải phát hiện cả hai trước khi cho workflow tiếp tục.
- Chạy một CCR fixture từ intake tới reviewed candidate, không publish. So với flow hiện tại: provenance, carry-forward, C4/C5/C6, token, retry và user intervention.
- Không cố lấp hàng trăm nghìn token chỉ để ép compact ở lượt smoke. Test phục hồi context có thể làm riêng bằng compact chủ động và đối chiếu checkpoint/output.

## Nguồn

- [CLI reference](https://code.claude.com/docs/en/cli-reference)
- [Subagents: context, handoff, resume và version requirements](https://code.claude.com/docs/en/sub-agents)
- [Skills: on-demand loading và workflow reuse](https://code.claude.com/docs/en/skills)
