# Kế hoạch hoàn thiện Bonario Project Report

## Mục tiêu

Hoàn thiện bản report tổng hợp toàn bộ project đã triển khai theo góc nhìn
quản lý và bàn giao: project nào đã làm, giá trị mang lại, trạng thái vận hành,
tech stack, mức độ tác động/độ phức tạp và các bước ưu tiên tiếp theo.

## Phạm vi giai đoạn 1: Giao diện report

- Dựng giao diện report chỉnh chu, responsive desktop/mobile.
- Tạo các phần chính: tổng quan, KPI, project cards, ma trận tác động/độ phức tạp,
  nhóm triển khai và kế hoạch hoàn thiện.
- Tách dữ liệu ra `data/projects.js` để đội nội dung thay thế hoặc tự động
  đồng bộ sau này.
- Dùng nội dung hiện có trong các file Markdown để dựng bản report sát context.

## Phạm vi giai đoạn 2: Đồng bộ nội dung

- Chốt format nguồn: Markdown, JSON, CSV hoặc Notion export.
- Parse các trường bắt buộc: tên project, mục tiêu, tính năng, tech stack,
  Docker/runtime, giá trị báo cáo, ảnh màn hình, metric.
- Thêm validation để cảnh báo project thiếu summary, outcome, stack hoặc metric.
- Chuẩn hóa wording theo giọng report nội bộ, dễ đọc cho quản lý và người mới tiếp nhận.

## Phạm vi giai đoạn 3: Rà soát và deploy

- Review nội dung với owner từng project.
- Chốt bộ KPI thật thay cho score tạm thời.
- Bổ sung ảnh màn hình/sơ đồ nếu có.
- Deploy static lên Vercel, Netlify, GitHub Pages hoặc hosting nội bộ.

## Deliverable hiện tại

- `index.html`: shell report.
- `styles.css`: toàn bộ thiết kế giao diện.
- `app.js`: render dashboard từ data.
- `data/projects.js`: dữ liệu project hiện tại.
- `README.md`: hướng dẫn chạy và contract dữ liệu.

## Rủi ro cần quản lý

- Số liệu impact/adoption/quality hiện là score tạm, cần thay bằng dữ liệu
  đã được xác nhận.
- Một số project là utility/hạ tầng, cần tách khỏi app nghiệp vụ để người đọc hiểu đúng vai trò.
- Nếu bổ sung ảnh màn hình thật, cần thống nhất kích thước và loại thông tin được
  phép hiển thị.
