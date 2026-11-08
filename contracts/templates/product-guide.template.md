# Product guide — <product>

Bản đồ của product: có gì, ở đâu, test được không. Mọi bước đều đọc file này. Tối đa 10 KB. Định nghĩa: contract §5c.

- Đúng phải là gì: `<object>/features/<feature>/kb.json`, `checklists/`.
- Làm thế nào: `_flows/`, đọc `_flows/README.md` rồi đúng file theo chủ đề.
- Biến env: `_env.example`.

Không dùng guide làm expected result. Không ghi giá trị credential, id, tên store.

## 1. Product
<luồng chính 3-6 bước, thuật ngữ cốt lõi>

## 2. Object
Từ khoá ticket sang object: `_registry.json`. Feature của object: `<object>/feature-summary.md`. Không liệt kê feature key ở đây.

| Object | Phạm vi | Không thuộc |
|---|---|---|

## 3. Môi trường
<host production để dừng lại>

| Biến | Đặc điểm | Dùng cho | Không dùng cho |
|---|---|---|---|

## 4. Test được gì
<nhãn test case: `env-blocked`, vế không kiểm được>

| Hạng mục | Feature | `type` | Mức | Cách xử lý |
|---|---|---|---|---|

<việc cần người hỗ trợ>

## 5. Bẫy làm sai kết luận
| Dấu hiệu | Cách hiểu |
|---|---|

## 6. Mutation guard
<production, đặt tên data, thay đổi tạm, thanh toán test, che token>
