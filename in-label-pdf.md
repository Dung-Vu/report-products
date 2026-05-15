# In Label PDF

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\in-label-pdf`
- Docker project: `in-label-pdf`
- Container: `in-label-pdf`
- Trạng thái Docker: đang chạy, healthy
- Port: `5003`

## Mục tiêu

In Label PDF ban đầu là app in label PDF cho phiếu nhập kho từ Odoo, hiện đã mở rộng thành app vận hành nội bộ cho tra cứu phiếu nhập kho, in label PDF, in phiếu thông tin người nhận, quản lý batch QC và báo cáo ABC doanh số.

## Người dùng và quy trình nghiệp vụ

Người dùng gồm kho/nhập hàng, QC, vận hành nội bộ và quản lý theo dõi doanh số.

Quy trình tiêu biểu:

1. Nhập mã phiếu hoặc ID phiếu từ Odoo.
2. Hệ thống gọi Odoo API lấy thông tin phiếu, sản phẩm và lot.
3. In label PDF cho hàng nhập.
4. Có thể lấy thông tin giao nhận để in phiếu người nhận.
5. Chọn sản phẩm lưu thành batch QC, cập nhật trạng thái từng item.
6. Xem dashboard danh sách QC, thống kê batch đạt/lỗi/chờ.
7. Xem báo cáo ABC doanh số theo tag sản phẩm.

## Tính năng nổi bật

- Frontend React/Vite cho trải nghiệm nội bộ.
- Backend Express tích hợp Odoo JSON-RPC.
- In label PDF theo layout 4x12, 48 labels/trang.
- Trích lot, variant, mã sản phẩm, ngày nhận.
- Lưu batch QC vào SQLite.
- Theo dõi QC item theo trạng thái `pending`, `passed`, `failed`, `warning`, `partial`.
- Báo cáo ABC doanh số theo ngày, tên sản phẩm, tag nội thất/vải.
- Chạy production bằng một server Node vừa serve API vừa serve static frontend.

## Kiến trúc và tech stack

- Frontend: React 18 + Vite.
- UI/CSS: Tailwind CSS, Framer Motion, Lucide React.
- Backend: Express.
- Data local: SQLite qua `better-sqlite3`.
- Tích hợp ngoài: Odoo JSON-RPC.
- PDF/client export: jsPDF, html2pdf.js.
- Routing frontend: React Router.
- UX: react-hot-toast.

## Docker services

- `in-label-pdf`: app duy nhất, `5003:5003`.
- Volume: `qc_data:/app/server/data`.
- Network nội bộ và external network `tunnel-master_tunnel-net`.
- Frontend build và backend phục vụ chung từ Node server.

## Dữ liệu và lưu trữ

- SQLite file tại `server/data/qc.db`.
- Docker volume `qc_data`.
- Dữ liệu runtime gồm batch QC, QC items và metadata phiếu.
- Có `.env` chứa cấu hình Odoo; không trích credential.

## Giá trị trong report

- Một app phục vụ nhiều khâu liên hoàn: kho, QC, in ấn, báo cáo.
- Kết nối trực tiếp Odoo, giảm thao tác copy tay.
- Lưu lịch sử QC cục bộ, dễ truy vết.
- Có dashboard QC và báo cáo ABC hỗ trợ quản trị.
- Có healthcheck, volume dữ liệu và production server.

## Nguồn tham chiếu nên bổ sung

- Ảnh/sơ đồ cần có: tra cứu phiếu, preview label PDF, dashboard QC list, bảng báo cáo ABC.
- Luồng cần có: Odoo -> App -> PDF/QC/Báo cáo.
- Liên kết/thao tác tham chiếu: `Tra cứu phiếu`, `In label PDF`, `Tạo batch QC`, `Xem báo cáo ABC`, `Mở phiếu người nhận`.
