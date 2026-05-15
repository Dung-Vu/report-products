# Curtain Size Calculator

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\calculate-curtain-size`
- Docker project: `calculate-curtain-size`
- Containers: `calculate-curtain-size-web-1`, `calculate-curtain-size-api-1`
- Trạng thái Docker: đang chạy, healthy
- Ports: web `5000`, API `8000`

## Mục tiêu

Curtain Size Calculator là hệ thống tính toán kích thước rèm cửa và lượng vải cần order.

Project hỗ trợ tính lẻ từng bộ rèm, xử lý Excel hàng loạt, xử lý file Excel sản phẩm rèm và chuyển PDF kích thước sản xuất sang layout Excel BON.

## Người dùng và quy trình nghiệp vụ

Người dùng chính là bộ phận sale, kỹ thuật, sản xuất rèm và nhân sự nhập liệu từ Excel/PDF.

Quy trình tiêu biểu:

1. Nhập thông số rèm theo form web hoặc Excel.
2. Hệ thống áp dụng công thức tính theo kiểu may, khổ vải, số tấm/cửa và cách nối.
3. Xuất kết quả gồm số khoang, số bi, chiều rộng vải cần, số cuộn, chiều cao cần, vải dư, vải cần order.
4. Với file PDF sản xuất, hệ thống chuyển sang layout Excel chuẩn BON để dùng tiếp trong vận hành.

## Tính năng nổi bật

- Web app Flask cho người dùng nội bộ.
- REST API FastAPI có tài liệu `/docs`.
- Upload Excel và trả file kết quả trực tiếp.
- Upload file sản phẩm rèm và file PDF sản xuất.
- Auto-detect `Cách Nối` khi dữ liệu đầu vào để trống.
- Xác thực JWT/API auth cho API.
- Rate limit, metrics Prometheus, healthcheck, gzip, logging, Sentry hook.
- Preview JSON cho kết quả Excel trước khi tải file.
- Chức năng gỡ bảo vệ file Excel `.xlsx`.

## Kiến trúc và tech stack

- Backend web: Flask.
- Backend API: FastAPI + Uvicorn.
- Ngôn ngữ: Python.
- Xử lý dữ liệu: pandas, openpyxl.
- Xử lý PDF: PyMuPDF.
- Validation: Pydantic.
- Security: JWT, passlib, slowapi.
- Monitoring: Prometheus client, structured logging, Sentry.
- Test: pytest.

Kiến trúc tách lớp:

- `app_web/`: giao diện web Flask.
- `app_api/`: REST API.
- `core/`: logic tính toán dùng chung.
- Scripts nghiệp vụ: `process_excel.py`, `process_curtain_product.py`, `process_production_pdf.py`.

## Docker services

- `api`: FastAPI/Uvicorn, `8000:8000`.
- `web`: Flask, `5000:5000`.
- Cả hai cùng dùng image build từ repo.
- Cloudflare Tunnel được quản lý bởi `tunnel-master`, không chạy trong compose này.

## Dữ liệu và lưu trữ

- Mount `./data:/app/data`.
- Mount `./temp:/app/temp`.
- Dữ liệu chính là file Excel/PDF và file kết quả xuất ra.
- Không thấy database riêng trong compose.
- Có `.env` và credential cấu hình môi trường; không trích credential.

## Giá trị trong report

- Chuẩn hóa công thức tính rèm thay vì tính tay.
- Giảm lỗi nhập liệu và sai số khi order vải.
- Phục vụ cả form web, API và batch Excel.
- Nối trực tiếp sang quy trình sản xuất nhờ xử lý PDF và layout BON.
- Có nền tảng vận hành bài bản: auth, monitoring, test, healthcheck.

## Nguồn tham chiếu nên bổ sung

- Ảnh/sơ đồ cần có: form tính rèm, bảng Excel input/output, luồng Upload Excel -> Download kết quả.
- Ảnh bổ sung: PDF sản xuất chuyển thành layout BON.
- Liên kết/thao tác tham chiếu: `Tính nhanh đơn lẻ`, `Upload file Excel`, `Chuyển PDF sản xuất`, `Xem API Docs`.
