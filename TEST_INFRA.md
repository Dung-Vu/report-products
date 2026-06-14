# E2E Test Infrastructure Specification

Tài liệu này đặc tả thiết kế và hạ tầng kiểm thử End-to-End (E2E) tự động cho dự án **Bonario Impact Report**, sử dụng công cụ kiểm thử **Playwright** chạy trên nền tảng đóng gói **Vite & TypeScript**.

---

## 1. Thiết kế Phân tầng Kiểm thử (5-Tier Testing Design)

Bộ kiểm thử được tổ chức theo 5 tầng kế tiếp nhau từ đơn giản đến phức tạp:

```text
┌─────────────────────────────────────────────────────────┐
│        Tier 5: Adversarial Data & Robustness            │
│  - Mock mảng dữ liệu rỗng, dữ liệu lớn, dữ liệu dị biệt  │
│  - Xác minh giao diện tự co giãn động không bị vỡ       │
├─────────────────────────────────────────────────────────┤
│        Tier 4: Responsive Design & Viewports            │
│  - Chạy test trên Mobile (375px) và Desktop (1440px)    │
│  - Xác minh không có lỗi tràn thanh cuộn ngang          │
├─────────────────────────────────────────────────────────┤
│        Tier 3: Hash Routing & Data Contracts            │
│  - Test chuyển trang chi tiết dự án qua hash URL       │
│  - Xác minh dữ liệu hiển thị bám sát 11 projects contract│
├─────────────────────────────────────────────────────────┤
│        Tier 2: Interactive Flows & Navigation            │
│  - Kiểm tra dot navigation, cuộn trang, sự kiện phím     │
│  - Kiểm tra accordion toggle và counter animations      │
├─────────────────────────────────────────────────────────┤
│        Tier 1: Smoke Tests & Console Integrity          │
│  - Xác minh tải trang index.html thành công             │
│  - Bắt lỗi runtime JS và ngoại lệ trên console của page │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Đặc tả các Tệp tin Kiểm thử (Test Suites)

Toàn bộ các tệp tin kiểm thử nằm trong thư mục `tests/` và sử dụng đuôi `.spec.cjs` (do `package.json` định nghĩa `"type": "module"`):

1.  **`tests/smoke.spec.cjs` (Tier 1):**
    *   Mở trang chủ, bắt các lỗi `console.error` và unhandled exceptions.
    *   Xác nhận trang hiển thị đầy đủ container chính `#app`.
2.  **`tests/interaction.spec.cjs` (Tier 2):**
    *   Xác minh dot navigation ẩn ở Scene 0 và chỉ hiện từ Scene 1 trở đi.
    *   Xác minh khả năng điều hướng bằng phím `ArrowDown` / `ArrowUp`.
    *   Kiểm tra click nút mở rộng panel bằng chứng `#evidence-toggle` để thu hẹp/mở rộng panel.
3.  **`tests/routing.spec.cjs` (Tier 3):**
    *   Xác minh bấm vào một group trong System Map sẽ đổi hash URL sang `#/projects/:id`.
    *   Xác minh nút Back quay lại trang chủ thành công.
    *   Kiểm tra fallback lỗi khi gõ sai hash URL.
4.  **`tests/responsive.spec.cjs` (Tier 4):**
    *   Xác minh tài nguyên hiển thị tốt ở các kích thước màn hình 375px, 768px, 1024px, 1440px.
    *   Đảm bảo không phát sinh thanh cuộn ngang (`overflow-x`).
    *   Kiểm tra hành vi mặc định của panel bằng chứng: collapse ở màn hình mobile và expand ở desktop.
5.  **`tests/adversarial.spec.cjs` (Tier 5):**
    *   Sử dụng API mocking của Playwright để chặn yêu cầu fetch JSON dữ liệu và trả về dữ liệu giả lập (dị biệt, rỗng, v.v.).
    *   Xác nhận giao diện xử lý lỗi mượt mà và tự co giãn động.
6.  **`tests/screenshot.spec.cjs` & `tests/verify-scene2.spec.cjs` (Visual Verification):**
    *   Chụp ảnh màn hình ở chế độ Mobile và Desktop để so sánh và xác minh hiển thị của sparkles canvas và layout Scene 2.

---

## 3. Cấu hình Hạ tầng Kiểm thử (playwright.config.cjs)

Hạ tầng kiểm thử sử dụng máy chủ web preview được tích hợp trực tiếp:
*   **Web Server Command:** `npx vite preview --port 8080` (sử dụng thư mục build `dist` sau khi đóng gói để đảm bảo kiểm thử chạy trên mã nguồn thực tế sẽ phân phối cho người dùng).
*   **Base URL:** `http://localhost:8080`
*   **Browsers:** Chromium (Desktop Chrome), Mobile Chrome (giả lập Pixel 5).
*   **CI Compatibility:** Tự động tối ưu hóa số lượng workers trên môi trường GitHub Actions CI (chạy đơn luồng trên CI để tránh nghẽn CPU, chạy đa luồng ở local để tối ưu thời gian).

---

## 4. Tự động hóa CI/CD

Hạ tầng kiểm thử được kích hoạt tự động qua GitHub Actions CI ở mỗi lượt `push` hoặc `pull_request` trên nhánh `main` / `master` thông qua tệp cấu hình `.github/workflows/ci.yml`. Luồng CI bao gồm:
1.  **Checkout & Cache:** Clone code và khôi phục cache npm để tăng tốc độ cài đặt.
2.  **Lint & Typecheck:** Chạy `npm run lint` và `npm run typecheck` để phát hiện sớm các lỗi cú pháp và kiểu dữ liệu.
3.  **Build:** Đóng gói ứng dụng thông qua Vite.
4.  **Playwright Install:** Tự động tải browser tương ứng cần thiết để test.
5.  **Run Tests:** Chạy toàn bộ test suite và tải kết quả `playwright-report` lên GitHub Artifacts để phục vụ việc debug khi có lỗi.
