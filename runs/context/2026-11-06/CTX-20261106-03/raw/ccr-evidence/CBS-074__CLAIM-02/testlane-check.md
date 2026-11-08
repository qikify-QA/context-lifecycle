# Đối chiếu Testlane cho CBS-074__CLAIM-02

Orchestrator đọc trực tiếp qua MCP testlane ngày 2026-11-06 (list_test_cases TIB-270). Nguyên trạng, chỉ bỏ thẻ HTML, bỏ đường dẫn ảnh. Không phải nguồn do CCR khai thêm.

## TC-TIB-7771 (task TIB-270, TIB-5439) status=skipped
title: TC-TIB-009 — [Regression] Tracking-driven Fulfilled keeps automatic log
expectedResult: Line item fulfilled by teeinblue ; no "manually"
actualResult: Skipped: người dùng chốt 2026-10-29: order test trên staging nên Printbelle không trả tracking number, không test được đường tracking-driven Fulfilled ( Line item fulfilled by teeinblue ). Quan sát tham khảo (Playwright, instance 58): #7684 (Order 4853) và #7685 (Order 4854) đã Confirm & Send tới Printbelle; sau khi fulfill trên Shopify (service: manual), log ghi Line item is fulfilled by manual (timeline-item--fulfilled), TIB status vẫn Sent. Đây là đường Shopify manual fulfill, không phải đường của case này.
