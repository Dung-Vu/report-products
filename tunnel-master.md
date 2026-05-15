# Tunnel Master

## Thông tin chung

- Repo: `C:\Users\Admin\Desktop\Bonario\tunnel-master`
- Docker project: `tunnel-master`
- Container: `bonario-master-tunnel`
- Trạng thái Docker: đang chạy, healthy
- Public port: không expose trực tiếp

## Mục tiêu

Tunnel Master là module quản lý Cloudflare Tunnel tập trung cho nhiều app/service nội bộ Bonario.

Module này giúp đưa các service Docker local ra domain có kiểm soát mà không cần mở port trực tiếp trên router/firewall.

## Vai trò trong hệ thống

Tunnel Master là lớp ingress/truy cập bên ngoài mạng nội bộ.

Theo config, module route nhiều hostname như `workflow.bonstu.site`, `bills.bonstu.site`, `action.bonstu.site`, `stock.bonstu.site`, `visual.bonstu.site` tới các service local hoặc service trong Docker.

## Tính năng nổi bật

- Gom nhiều hostname vào một tunnel Cloudflare duy nhất.
- Hỗ trợ route tới service qua `host.docker.internal`.
- Hỗ trợ route tới service trong shared Docker network.
- Ép dùng `http2` thay vì QUIC/UDP để tránh lỗi mạng/firewall.
- Có healthcheck cho container.
- Dùng external network `bonario-shared-tunnel` để kết nối chéo stack.

## Kiến trúc và tech stack

- Cloudflare Tunnel / cloudflared.
- Docker Compose.
- Base image: `cloudflare/cloudflared:latest`.
- Mount config runtime từ thư mục local `config/`.

## Docker services

- Service: `tunnel-master`.
- Container: `bonario-master-tunnel`.
- Image: `bonario-tunnel-master:latest`.
- Networks: `tunnel-net`, `bonario-shared-tunnel`.
- Không mở port trực tiếp ra host.

## Dữ liệu và lưu trữ

- Mount `config/config.yml`.
- Mount `config/credentials.json`.
- Có credential Cloudflare Tunnel; không trích nội dung.

## Giá trị trong report

- Chuẩn hóa cách publish nhiều app nội bộ qua cùng một gateway.
- Giảm công vận hành so với tunnel rời rạc từng project.
- Dễ mở rộng khi thêm service mới.
- Tăng an toàn mạng vì không cần mở port trực tiếp.
- Tạo nền tảng quản trị tập trung cho các app nội bộ.

## Nguồn tham chiếu nên bổ sung

- Sơ đồ cần có: Cloudflare Tunnel -> hostname -> app nội bộ.
- Liên kết/thao tác tham chiếu: `Xem danh sách domain đang publish`, `Theo dõi trạng thái tunnel`, `Mở rộng thêm service mới`.
