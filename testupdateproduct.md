# ORD Price Lookup System

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\testupdateproduct`
- Docker project: `testupdateproduct`
- Containers: `testupdateproduct-frontend`, `testupdateproduct-backend`, `testupdateproduct-db`
- Trạng thái Docker: đang chạy, các service chính healthy
- Ports: frontend `5173`, backend `5001`, PostgreSQL `5433`

## Mục tiêu

ORD Price Lookup System là hệ thống tra cứu, cập nhật và quản trị giá sản phẩm nội thất ORD.

Project hỗ trợ sales tra cứu giá nhanh, admin/SC quản lý cấu hình cost/fabric/shipping/packaging, tính lại COGS và selling price, import/export dữ liệu từ Excel/PostgreSQL, lưu lịch sử thay đổi và audit.

## Người dùng và quy trình nghiệp vụ

Người dùng chính gồm sales, SC/admin, quản trị dữ liệu sản phẩm và người dùng Telegram bot.

Quy trình tiêu biểu:

1. Sales hoặc admin truy cập web.
2. Tìm sản phẩm theo tên/code/material.
3. Backend query PostgreSQL từ các bảng sản phẩm.
4. Sales xem giá bán; admin/SC có thể xem thêm cost/COGS theo quyền.
5. Admin cập nhật product/config/fabric mapping/import dữ liệu.
6. Backend ghi audit, price history và config history.
7. Telegram bot có thể gọi API backend để search/cập nhật/backup nếu bật profile bot.

## Tính năng nổi bật

- Search gộp dữ liệu cũ/mới.
- Admin dashboard có product list, category, bulk recalculate, config, fabric mapping.
- Audit logs, price history, config history, activity log.
- Import template/preview/apply.
- Export products và audit.
- Quản lý người dùng, trạng thái active/inactive và role.
- 2FA/TOTP cho admin.
- Chat API và streaming chat dùng OpenAI nếu cấu hình.
- Telegram bot optional.
- Có Alembic migrations và nhiều script chuyển Excel sang PostgreSQL.

## Kiến trúc và tech stack

- Frontend: React 19, TypeScript, Vite, TailwindCSS.
- Backend: Flask, Flask-CORS, Flask-Limiter, Flasgger, Gunicorn.
- Database: PostgreSQL, SQLAlchemy 2, Alembic.
- Auth: bcrypt, PyJWT, TOTP.
- AI: OpenAI SDK optional.
- Bot: python-telegram-bot.
- Data processing: pandas, openpyxl.
- Deployment: Docker Compose, Nginx frontend, Flask backend.

## Docker services

- `postgres`: PostgreSQL 16 Alpine, `5433:5432`.
- `backend`: Flask API, `5001:5001`.
- `frontend`: React/Vite build served by Nginx, `5173:80`.
- `bot`: Telegram bot optional, chạy khi dùng profile `bot`.

## Dữ liệu và lưu trữ

Dữ liệu chính nằm trong PostgreSQL database `bonario_products`.

Các nhóm bảng/model đáng chú ý:

- `products`
- `config`
- `fabric_mapping`
- `audit`
- `search_audit`
- `sale_products`
- `sale_products_v2`

File dữ liệu Excel/CSV nằm trong `data/`, backup trong `data/backups/`. Volume Docker chính là `pgdata`; backend mount `./data:/data:rw`. Có cấu hình bảo mật cho database, JWT, Flask secret, OpenAI, Telegram và Cloudflare; không trích credential.

## Giá trị trong report

- Giúp sales tra cứu giá nhanh, giảm phụ thuộc file Excel thủ công.
- Admin quản lý công thức/cấu hình giá, fabric cost và lịch sử thay đổi.
- Có phân quyền tách người chỉ xem giá bán và người được xem cost/COGS.
- Hỗ trợ migration từ Excel sang PostgreSQL.
- Telegram bot optional giúp thao tác nhanh ngoài web.
- Audit/search analytics giúp biết sản phẩm nào được tìm nhiều và ai thay đổi dữ liệu.

## Nguồn tham chiếu nên bổ sung

- Ảnh giao diện tìm sản phẩm ORD với card kết quả giá.
- So sánh luồng Sales mode và Admin mode.
- Ảnh hoặc bảng minh họa price history, top searched, audit log.
- Ảnh import wizard và config history.
