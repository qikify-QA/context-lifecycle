<!-- CBS-001 CLAIM-03: verbatim block from CCR Phần 5.1 (redacted per §6: person handles, local home path). -->

### CLAIM-03

- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-007 (TC-TIB-4696, FAILED vs expected "exactly 1 retry (2 requests total)" khi load trang); đọc bundle `app-v1.js` Last-Modified `Wed, 07 Oct 2026 08:36:29 GMT`; comment dev id 52985
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** không rõ (nguồn là quan sát/đọc bundle chứ không phải tài liệu dev; comment dev ngày 2026-10-01 không nêu điều kiện retry)
- **Người viết / người xác nhận:** QA quan sát; Dev chưa xác nhận thiết kế
- **Trích nguyên văn:**
  ```
  Dev: "SDK chỉ thử lại đúng 1 lần."
  Bundle: hp=new Map,pT=new Map,mK=2;
  function lu(e,t){...const o=`${e}|${t}`;if(!hp.has(o)){const r=J1(e,t,i.version).catch(()=>null).then(n=>{if(n===null){const s=(pT.get(o)||0)+1;pT.set(o,s),s<mK&&hp.delete(o)}return S1(n)});hp.set(o,r)}return hp.get(o)}
  TC-007 actualResult: Cart /vi-vn/cart với API mock 500, bấm 'Edit design' 3 lần: sau lần 1: 1 request tổng; sau lần 2: 2; sau lần 3: vẫn 2. Một lần load trang chỉ có 1 request.
  ```
- **File đính kèm cho claim này:** không có (local: `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/05-tc007-cart-modal-api500.png`)
