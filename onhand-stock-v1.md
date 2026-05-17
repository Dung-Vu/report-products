# Stock Onhand Management

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\onhand-stock-v1`
- Docker project: `onhand-stock-v1`
- Containers: `bonario-frontend`, `bonario-backend`, `bonario-postgres`
- Trạng thái Docker: đang chạy, các service chính healthy
- Ports: frontend `8080`, backend `4001`, PostgreSQL `5432`

## Mục tiêu

Stock Onhand Management là ứng dụng tra cứu tồn kho và kiểm kho hàng tháng cho Bonario.

Ứng dụng hỗ trợ tra cứu on-hand stock theo kho/category/search, xem hàng incoming, fabric products, discontinued/archived products còn tồn, tạo phiên kiểm kho theo tháng/kho và lưu kết quả kiểm kho vào PostgreSQL.

## Người dùng và quy trình nghiệp vụ

Người dùng chính gồm nhân viên kiểm kho, admin quản lý tài khoản/phiên kiểm kho và team vận hành kho.

Quy trình tiêu biểu:

1. Người dùng đăng nhập bằng tài khoản nội bộ.
2. Chọn kho qua tab.
3. Xem tồn hệ thống lấy từ Odoo qua backend proxy.
4. Tạo hoặc mở phiếu kiểm kho theo tháng và kho.
5. Nhập số lượng thực tế từng sản phẩm.
6. Hệ thống tự tính chênh lệch giữa số đếm và tồn hệ thống.
7. Admin hoặc người dùng có quyền có thể lock/unlock/complete session.
8. Xuất dữ liệu kiểm kho hoặc báo cáo.

## Tính năng nổi bật

- Tra cứu tồn kho nhanh theo kho, category và search.
- Kiểm kho tháng/kho với session và line item rõ ràng.
- PostgreSQL lưu trạng thái phiếu kiểm kho.
- JWT auth, role `admin` và `counter`.
- Audit log cho login/logout, thao tác người dùng và thao tác phiên kiểm kho.
- WebSocket cho realtime stock updates.
- Export CSV/Excel/PDF.
- Có mobile app React Native trong thư mục `mobile`.
- Backend có Sentry utility, retry, circuit breaker, cache middleware và rate limit.

## Kiến trúc và tech stack

- Frontend web: Vite + vanilla JS, TailwindCSS.
- Backend: Node.js Express.
- Database: PostgreSQL 16.
- Realtime: WebSocket.
- Auth: JWT, bcrypt, role-based access.
- Mobile: React Native.
- Export/report: ExcelJS, jsPDF.
- Security/middleware: helmet, cors, compression, rate limit, zod validation.
- Deployment: Docker Compose, Nginx serve frontend build.

## Docker services

- `postgres`: PostgreSQL 16 Alpine, `5432:5432`.
- `backend`: Express API, `4001:4001`.
- `frontend`: Nginx + Vite build, `8080:80`.
- Cloudflare Tunnel được ghi chú quản lý bởi `tunnel-master`.

## Dữ liệu và lưu trữ

PostgreSQL schema gồm:

- `users`: tài khoản, role, trạng thái active.
- `stocktake_sessions`: phiên kiểm kho theo tháng/kho.
- `stocktake_lines`: từng dòng sản phẩm, tồn hệ thống, số đếm thực tế, variance.
- `audit_log`: lịch sử thao tác.

Volume Docker chính là `postgres_data`. Dữ liệu tồn kho lấy từ Odoo qua backend API proxy. Có cấu hình Odoo/JWT/Postgres qua env, không trích credential.

## Giá trị trong report

- Chuẩn hóa quy trình kiểm kho hàng tháng.
- Giảm rủi ro thất lạc file Excel/localStorage vì dữ liệu lưu vào PostgreSQL.
- Tách quyền admin/counter, phù hợp nhiều người cùng nhập liệu.
- Có realtime và mobile app, tạo nền tảng kiểm kho bằng điện thoại/tablet.
- API có healthcheck, cache/rate limit và audit, thuận lợi vận hành Docker.

## Nguồn tham chiếu nên bổ sung

- Ảnh bảng tồn kho theo kho, thanh tìm kiếm và filter category.
- Luồng kiểm kho: tạo phiên -> nhập số đếm -> xem lệch -> lock/complete.
- Ảnh màn hình stocktake trên điện thoại.
- Link hoặc ảnh minh họa các thao tác: tra cứu tồn kho, bắt đầu kiểm kho, xuất Excel, quản lý tài khoản.
