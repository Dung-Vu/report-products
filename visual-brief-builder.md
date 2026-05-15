# Visual Content Production - Ordinaire Brief Builder

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\visual`
- Docker project: `visual`
- Container: `ordinaire-brief-builder`
- Trạng thái Docker: đang chạy
- Port: `9001`

## Mục tiêu

Visual Content Production là công cụ nội bộ cho team marketing/brand tạo brief hình ảnh lifestyle bằng giao diện đơn giản, gửi sang API sinh ảnh AI và theo dõi kết quả.

Thay vì viết prompt thủ công, người dùng chọn category, use case, material, mood, ánh sáng, tỷ lệ ảnh và ảnh tham chiếu; hệ thống tự dựng prompt và gửi đến engine AI.

## Người dùng và quy trình nghiệp vụ

Người dùng chính là marketing, brand team và content/creative.

Quy trình tiêu biểu:

1. Điền brief qua UI.
2. Chọn model AI và ratio phù hợp use case.
3. Gửi request tạo ảnh.
4. Theo dõi tiến trình sinh ảnh trực tiếp.
5. Xem kết quả, chỉnh ảnh hoặc chuyển sang bước xử lý tiếp theo.
6. Bước xử lý tiếp theo dùng ảnh phòng đã chọn để thêm wallpaper/curtain.
7. Lưu output/reference trong thư mục dùng chung.

## Tính năng nổi bật

- Giao diện brief builder cho người không chuyên kỹ thuật.
- Hỗ trợ nhiều model: `wan/2-7-image-pro`, `nano-banana-2`, `gpt-image-2`.
- Logic map ratio theo khả năng model.
- Reference images.
- Live watch panel: stage, elapsed time, poll count, next refresh.
- Refinement presets: warmer light, fewer props, more room context, cleaner background, crop safe.
- Bước riêng để chỉnh wallpaper/curtain trên ảnh phòng đã chọn.
- Tool chạy dạng static site trên Nginx.

## Kiến trúc và tech stack

- Runtime: static HTML/CSS/JS.
- Web server: Nginx Alpine.
- Frontend logic: JavaScript thuần.
- API tích hợp: Kie.ai image generation API.
- Cấu hình prompt: `brand-prompt-config.js`, `brand-visual-ruleset.md`, `master-prompt-templates.md`.

Kiến trúc nội dung:

- `brief-builder/`: ứng dụng web.
- `input/`: ảnh tham chiếu.
- `outputs/`: output ảnh sinh.
- Markdown rulebook/template đóng vai trò knowledge base cho visual governance.

## Docker services

- `brief-builder`: static web app, `9001:80`.
- Mount `./outputs:/usr/share/nginx/html/outputs`.
- Mount `./input:/usr/share/nginx/html/input`.

## Dữ liệu và lưu trữ

Không thấy database. Dữ liệu là file tham chiếu và output ảnh qua thư mục `input/` và `outputs/`.

Có file local config cho API key, được thiết kế để giữ local và không commit; không trích credential.

## Giá trị trong report

- Biến quy trình prompt AI thành công cụ thao tác được cho marketing.
- Chuẩn hóa output theo brand rules, giảm lệch tone hình ảnh.
- Tăng tốc vòng lặp brief -> tạo ảnh -> chỉnh ảnh.
- Phù hợp scale nội dung visual sản phẩm/lifestyle.
- Docker deployment rõ ràng, dễ host nội bộ.

## Nguồn tham chiếu nên bổ sung

- Ảnh cần có: form brief builder, preview kết quả AI image, luồng chỉnh ảnh và cặp ảnh trước/sau.
- Luồng cần có: Brief -> Tạo ảnh -> Rà ảnh -> Chỉnh ảnh.
- Liên kết/thao tác tham chiếu: `Tạo brief mới`, `Sinh option`, `Chỉnh ảnh đã chọn`, `Mở thư viện outputs`.
