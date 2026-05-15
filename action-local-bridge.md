# Action Local Bridge

## Thông tin chung

- Container: `action-local-bridge`
- Image: `alpine/socat`
- Trạng thái Docker: đang chạy
- Port: `5504`
- Repo source độc lập: không tìm thấy trong `C:\Users\Admin\Desktop\Bonario`

## Mục tiêu

Action Local Bridge là container hạ tầng dùng `socat` để chuyển tiếp TCP traffic từ một cổng bridge sang service `action-product`.

Đây không phải app nghiệp vụ hoàn chỉnh mà là module hạ tầng nhỏ hỗ trợ expose `action-product` thông qua shared network/tunnel path riêng.

## Vai trò trong hệ thống

Container lắng nghe TCP port `5504` và forward sang `action-product:5004` trong Docker network.

## Tính năng nổi bật

- TCP forwarder cực nhẹ.
- Tách phần bridge/network routing khỏi app chính.
- Không cần thay đổi backend `action-product`.
- Chạy trong network `bonario-shared-tunnel`.

## Kiến trúc và tech stack

- Image: `alpine/socat`.
- Không có source code ứng dụng.
- Không có database hoặc file persistent.

## Docker services

- Container: `action-local-bridge`.
- Port host: `5504:5504`.
- Target nội bộ: `action-product:5004`.
- Network: `bonario-shared-tunnel`.

## Dữ liệu và lưu trữ

- Không có volume mount.
- Không có persistent storage.
- Không có database.

## Giá trị trong report

- Nhẹ, dễ triển khai, ít phụ thuộc.
- Hữu ích khi cần publish hoặc kiểm thử service mà không thay đổi app backend.
- Tách network bridge ra khỏi code nghiệp vụ.

## Nguồn tham chiếu nên bổ sung

- Sơ đồ cần có: `5504 -> socat bridge -> action-product:5004`.
- Liên kết/thao tác tham chiếu: `Xem sơ đồ route nội bộ`, `Kiểm tra bridge connectivity`.
