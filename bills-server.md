# Bills Archive / Bills Server

## Thông tin chung

- Repo liên quan: `C:\Users\Admin\Desktop\Bonario\op-round-robin`
- Container: `bills-server`
- Image: `nginx:alpine`
- Trạng thái Docker: đang chạy
- Port: `8089`

## Mục tiêu

Bills Server cung cấp kho lưu trữ và truy cập file bill/chứng từ qua web, phục vụ tra cứu và chia sẻ nội bộ.

Container này là lớp web file serving cho thư mục `C:\Bills`, gắn với repo `op-round-robin`, nơi có logic tạo/xử lý bill, PDF VAT, phiếu giao nhận, yêu cầu báo giá và đổi tên file theo nghiệp vụ.

## Vai trò trong hệ thống

- Publish thư mục bill nội bộ qua Nginx.
- Cho phép mở/tải PDF, ảnh và chứng từ theo cấu trúc thư mục.
- Public hostname được suy luận từ `tunnel-master/config.yml`: `bills.bonstu.site`.

## Tính năng nổi bật

- Directory listing qua web.
- Tải/mở trực tiếp PDF và ảnh.
- Mount thư mục bill ở chế độ read-only trên web server.
- Gắn với pipeline của `op-round-robin` để sinh và chuẩn hóa chứng từ.

## Kiến trúc và tech stack

- Web server: Nginx Alpine.
- Source file: `C:\Bills`.
- Nginx config: `nginx-bills.conf` trong repo `op-round-robin`.

## Docker services

- Container: `bills-server`.
- Port: `8089:80`.
- Mount `C:/Bills:/bills:ro`.
- Mount `./nginx-bills.conf:/etc/nginx/conf.d/default.conf:ro`.

## Dữ liệu và lưu trữ

- Nguồn dữ liệu chính: `C:\Bills`.
- Thư mục có cấu trúc tháng như `2025-12`, `2026-01`, `2026-02`, `2026-03`, `2026-04`, `2026-05`.
- Web server chỉ đọc dữ liệu.

## Giá trị trong report

- Biến kho bill từ thư mục local thành archive web có thể truy cập thống nhất.
- Tăng tốc tra cứu chứng từ.
- Giảm thất lạc file.
- Hỗ trợ quy trình cuối tháng và chuẩn hóa chứng từ.

## Nguồn tham chiếu nên bổ sung

- Ảnh/sơ đồ cần có: cây thư mục bill theo tháng.
- Ảnh bổ sung: preview PDF/chứng từ.
- Liên kết/thao tác tham chiếu: `Mở kho bill theo tháng`, `Xem báo cáo bill thiếu VAT`, `Truy cập chứng từ đã chuẩn hóa`.
