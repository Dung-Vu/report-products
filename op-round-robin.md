# OP Round Robin

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\op-round-robin`
- Docker project: `op-round-robin`
- Container chính: `op-round-robin`
- Container liên quan: `bills-server`
- Trạng thái Docker: đang chạy
- App worker không publish port ra host

## Mục tiêu

OP Round Robin là automation worker cho Odoo, gồm hai mảng nghiệp vụ chính:

1. Gán OP round-robin cho quotation trên Odoo.
2. Pipeline xử lý bill/VAT và xuất PDF hồ sơ chứng từ.

## Người dùng và quy trình nghiệp vụ

Luồng gán OP:

1. Worker polling Odoo theo chu kỳ.
2. Tìm quotation draft chưa có `x_studio_op_in_charge`.
3. Xác định company.
4. Gán OP theo vòng xoay cố định theo từng company.

Luồng bill/VAT:

1. Lấy bill vendor từ Odoo hoặc file VAT local.
2. Lấy ảnh/PDF hóa đơn VAT.
3. OCR/extract dữ liệu bằng model vision.
4. Sinh PDF `PHIEU_GIAO_NHAN` và `YEU_CAU_BAO_GIA`.
5. Lưu vào thư mục bill theo tháng.
6. Đổi tên bill/folder theo quy tắc nghiệp vụ.
7. Publish thư mục `C:\Bills` qua Nginx để truy cập file qua web.

## Tính năng nổi bật

- Worker round-robin gán OP tự động theo company.
- Cấu hình riêng cho Bonario và Ordinaire.
- Xử lý bill VAT từ Odoo hoặc file local.
- OCR ảnh/PDF hóa đơn để trích dữ liệu cấu trúc.
- Sinh PDF Unicode tiếng Việt bằng render HTML -> PDF.
- Xử lý batch theo tháng, tháng trước, local batch, fill missing PDFs, end-of-month pipeline.
- Script đổi tên bills bằng AI để chuẩn hóa tên file/folder.
- Web file server nội bộ cho thư mục bill.

## Kiến trúc và tech stack

- Worker: Python.
- ERP integration: Odoo XML-RPC.
- AI/OCR: OpenAI-compatible client tới vision endpoint.
- PDF: Playwright render HTML/PDF, `xhtml2pdf`, `pypdfium2`, Pillow.
- Web serve file: Nginx Alpine qua container `bills-server`.

Repo có cấu hình API/credential trong env/code; chỉ ghi nhận có cấu hình bảo mật, không trích chi tiết.

## Docker services

- `op-round-robin`: worker background, không publish port.
- Mount `C:/Bills:/bills`.
- `bills-server`: Nginx file server, `8089:80`.
- `bills-server` mount `C:/Bills:/bills:ro` và `./nginx-bills.conf:/etc/nginx/conf.d/default.conf:ro`.

## Dữ liệu và lưu trữ

- Thư mục dữ liệu chính: `C:\Bills`.
- Worker đọc/ghi bill folder tại đây.
- Nginx phục vụ cùng thư mục ở dạng read-only.
- Không thấy database riêng.
- Có `.env` cho kết nối Odoo và biến môi trường khác.

## Giá trị trong report

- Tự động hóa chia OP cho báo giá.
- Tự động hóa xử lý chứng từ/bill VAT.
- Chuẩn hóa lưu trữ và xuất PDF chứng từ.
- Có batch end-of-month, phù hợp closing nghiệp vụ.
- Có web file server nội bộ để truy cập chứng từ nhanh.

## Nguồn tham chiếu nên bổ sung

- Sơ đồ cần có: luồng quote draft -> auto assign OP.
- Ảnh/sơ đồ bổ sung: thư mục bills publish qua web, preview hai loại PDF.
- Flow: end-of-month automation.
- Liên kết/thao tác tham chiếu: `Mở thư mục bills`, `Xem PDF chứng từ`, `Theo dõi worker automation`, `Kiểm tra xử lý cuối tháng`.
