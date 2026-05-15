# Bonario Product Hub

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\action-product`
- Docker project: `action-product`
- Container chính: `action-product`
- Trạng thái Docker: đang chạy, healthcheck healthy theo Docker Desktop
- Port: `5004`

## Mục tiêu

Bonario Product Hub là trung tâm vận hành sản phẩm nội bộ cho Bonario, đóng vai trò gom các thao tác sản phẩm đang rải rác trong Odoo thành một dashboard tập trung.

Project hỗ trợ kiểm tra chất lượng dữ liệu sản phẩm, tự động hóa BOM, cập nhật pricelist/cost/description/company mapping, quản lý sản phẩm Cambodia, theo dõi tồn kho, vòng đời sản phẩm, CRM, sales report, SC report và giám sát Docker runtime.

## Người dùng và quy trình nghiệp vụ

Người dùng chính gồm team vận hành sản phẩm, Supply Chain, quản trị dữ liệu, sales/SC report owner và admin hệ thống.

Quy trình tiêu biểu:

1. Người dùng đăng nhập vào hub.
2. Chọn module nghiệp vụ như Checker, BOM, Pricelist, Description, Cambodia, Inventory, CRM, Tracking.
3. Frontend gọi backend Flask.
4. Backend xử lý qua service/domain layer và gọi Odoo JSON-RPC.
5. Kết quả hiển thị trên dashboard, có audit log, realtime/event broadcast và workflow định kỳ.
6. Báo cáo/cảnh báo có thể gửi qua Telegram hoặc Microsoft Teams nếu được cấu hình.

## Tính năng nổi bật

- Product Checker kiểm tra vendor, BOM, cost, pricelist, description, tag và bất thường dữ liệu.
- BOM Automation tạo BOM hàng loạt theo variant, size mapping, width formula, fabric component.
- Pricelist Tools tìm sản phẩm, check thiếu giá, batch update, import Excel, kiểm tra nhóm Ordinaire.
- Cambodia Manager clone sản phẩm từ VN, quản lý attribute, archive/unarchive, export, readiness workflow.
- Description Workflow tạo/cập nhật mô tả đa ngôn ngữ, có AI description.
- Docker Monitor xem container, logs, stats, topology, image prune/pull, compose action, alert rules.
- Workflow Scheduler chạy daily scan, daily briefing, SC report, Sales report, stock monitor.
- Auth nâng cao với session, 2FA TOTP, passkey/WebAuthn.
- Observability qua `/metrics`, Prometheus, Grafana, structured JSON logs.
- Có Pytest, Vitest và Playwright e2e.

## Kiến trúc và tech stack

- Frontend: React 18, TypeScript, Vite, TailwindCSS, Zustand, TanStack Query, Framer Motion.
- Backend: Flask 3, Flask-Caching, Flask-Limiter, Flask-Sock, Marshmallow.
- Integration: Odoo JSON-RPC client.
- Realtime: WebSocket qua Flask-Sock.
- Auth/security: Flask session, CSRF origin check, 2FA, passkey.
- Monitoring: Prometheus, Grafana, Docker socket proxy.
- Deployment: Docker Compose, Gunicorn.

## Docker services

- `action-product`: app chính, `5004:5004`.
- `redis`: Redis 7 Alpine cho cache/rate limit/session workflow state.
- `prometheus`: metrics storage, internal `9090`.
- `grafana`: dashboard monitoring, `3000:3000`.
- `docker-proxy`: proxy Docker socket cho monitor.
- Networks: `bonario-network`, `bonario-shared-tunnel`.

## Dữ liệu và lưu trữ

- Redis volume: `redis-data`.
- Prometheus volume: `prometheus-data`.
- Grafana volume: `grafana-data`.
- Workflow state volume: `workflow-state`.
- Bind mount: `./data:/app/data`.
- SQLite audit log trong core audit DB.
- Dữ liệu nghiệp vụ chính lấy từ Odoo qua API.
- Có cấu hình bảo mật qua `.env`, không trích credential vào report.

## Giá trị trong report

- Giảm thao tác thủ công trên Odoo, đặc biệt với BOM, giá, mô tả và attribute.
- Gom nhiều nghiệp vụ vận hành sản phẩm vào một hub duy nhất.
- Có giám sát hạ tầng Docker ngay trong app.
- Có báo cáo định kỳ và cảnh báo chủ động.
- Có audit log, auth nâng cao và test suite rộng, phù hợp vận hành nội bộ lâu dài.

## Nguồn tham chiếu nên bổ sung

- Ảnh dashboard Product Hub với KPI card, module grid và trạng thái hệ thống.
- Sơ đồ workflow: Odoo -> Hub -> Teams/Telegram report.
- So sánh trước/sau: thao tác rải rác trên Odoo so với Product Hub tập trung.
- Link hoặc ảnh minh họa các màn hình: Product Hub, kiểm tra sản phẩm, báo cáo vận hành, Docker Monitor.
