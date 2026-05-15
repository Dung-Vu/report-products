# Auto Workflow

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\auto-workflow`
- Container: `auto-workflow`
- Image: `auto-workflow:latest`
- Trạng thái Docker: đang chạy
- Port: `5050`

## Mục tiêu

Auto Workflow là ứng dụng Flask đóng vai trò workflow automation hub, thay thế một phần luồng kiểu n8n/webhook bằng code nội bộ.

Project điều phối tự động hóa giữa Shopify, Odoo, Zalo ZNS, Telegram và các tác vụ nội bộ như delivery tracking, RFID reconciliation, auto-conducted scheduler.

## Vai trò trong hệ thống

Auto Workflow là trạm điều phối tự động hóa giữa các hệ thống nội bộ và dịch vụ bên ngoài.

Domain truy cập ngoài mạng nội bộ được suy luận từ tunnel config: `workflow.bonstu.site`.

## Tính năng nổi bật

- Webhook Shopify customer create để đồng bộ khách hàng Shopify sang Odoo.
- Webhook FSM để tra cứu theo dõi giao hàng.
- Webhook ZNS cho HDSD tiếng Anh/tiếng Việt và rating ORD.
- Callback OAuth Zalo qua `/webhook/zns-done`.
- Webhook `/webhook/conducted` trigger tác vụ auto-conducted.
- Endpoint `/health` báo trạng thái token ZNS, scheduler và route khả dụng.
- Luồng Telegram bot cho RFID reconciliation.
- Scheduler auto-conducted chạy hằng ngày lúc 08:00 ICT theo tài liệu repo.

## Kiến trúc và tech stack

- Python 3.12.
- Flask.
- `requests`.
- `openpyxl`, `xlrd`.
- `python-telegram-bot`.
- `gunicorn` có trong dependencies; container hiện chạy `python app.py`.
- Module service: `odoo_client`, `shopify_contact`, `delivery_tracking`, `zalo_zns`, `rfid_reconciliation`, `auto_conducted`.

## Docker services

- Container: `auto-workflow`.
- Port `5050:5050`.
- Volume `auto-workflow-data:/app/data`.
- Dockerfile expose `5050`.

## Dữ liệu và lưu trữ

- Persistent data tại Docker volume `auto-workflow-data`.
- Repo có token/cấu hình app và nhiều biến môi trường tích hợp Odoo, Shopify, Zalo, Telegram.
- Có thư mục `n8n-json`, cho thấy một số workflow từng được thiết kế hoặc đồng bộ từ n8n.
- Không trích credential.

## Giá trị trong report

- Gom nhiều automation vào một service nội bộ duy nhất.
- Giảm phụ thuộc thao tác thủ công.
- Workflow gắn trực tiếp với nghiệp vụ Bonario: khách hàng, giao hàng, ZNS, meeting compliance, RFID.
- Code-first automation dễ kiểm soát khi cần logic đặc thù.
- Tạo giá trị ở tiết kiệm thời gian vận hành, giảm sai sót và tăng khả năng tích hợp xuyên hệ thống.

## Nguồn tham chiếu nên bổ sung

- Sơ đồ cần có: Shopify/Odoo/Zalo/Telegram -> Auto Workflow.
- Sơ đồ bổ sung: timeline webhook/scheduler.
- Liên kết/thao tác tham chiếu: `Xem danh sách automation đang chạy`, `Kiểm tra health workflow`, `Mở dashboard webhook và scheduler`.
