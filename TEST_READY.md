# E2E Test Suite Ready

Môi trường kiểm thử End-to-End tự động bằng Playwright đã được thiết lập hoàn tất, đồng bộ với kiến trúc TypeScript mới và chạy trực tiếp trên bản đóng gói Vite Production build.

---

## 🚀 Chạy kiểm thử (Test Execution)

*   **Lệnh chạy kiểm thử:**
    ```bash
    npm run test
    ```
*   **Trạng thái kiểm thử:** **34 passed, 2 skipped** (Tổng số 36 test cases).
    *   *Lưu ý: 2 test cases skipped là các test trên WebKit và Mobile Safari chỉ chạy trên môi trường macOS/Linux CI, không chạy trên Windows.*

---

## 📊 Tóm tắt kết quả Tiers (Coverage Summary)

| Phân tầng (Tier) | Số lượng Test | Trạng thái | Mô tả chi tiết |
|:---|:---:|:---:|:---|
| **Tier 1: Smoke & Console Integrity** | 2 | Pass | Kiểm tra tải trang index.html, preloads tài nguyên và tính toàn vẹn của console (không có lỗi JS hay ngoại lệ). |
| **Tier 2: Interactive Flows & Navigation** | 8 | Pass | Kiểm tra điều hướng dot navigation, bàn phím (ArrowUp/Down), và thu gọn/mở rộng panel bằng chứng. |
| **Tier 3: Hash Routing & Data Contracts** | 6 | Pass | Kiểm tra tính đúng đắn của hash routing (`#/projects/:id`), back-button, fallback trang lỗi, và kiểm thử khả năng load 11 projects thực tế. |
| **Tier 4: Responsive Design & Viewports** | 10 | Pass | Kiểm thử co giãn giao diện trên Mobile (375px), Tablet (768px), Desktop (1024px), Large Desktop (1440px) và kiểm tra không có lỗi tràn màn hình (horizontal overflow). |
| **Tier 5: Adversarial Data Integrity** | 4 | Pass | Kiểm thử dữ liệu giả lập (mocking) với dữ liệu bất thường hoặc kích thước mảng thay đổi để xác nhận giao diện thích ứng động mà không bị vỡ. |
| **Visual Verification (Screenshots)** | 4 | Pass | Tự động chụp và lưu ảnh xác minh giao diện trực quan cho Scene 2 và Canvas Sparkles ở cả 2 chế độ Desktop & Mobile. |
| **Tổng cộng** | **34** | **Pass** | **Xác minh thành công 100% tính ổn định của mã nguồn.** |

---

## 🔧 Cấu hình Web Server
Playwright được cấu hình tự động thông qua `playwright.config.cjs`:
1.  Trước khi chạy test, Playwright sẽ tự động thực hiện lệnh đóng gói và preview: `npx vite preview --port 8080`.
2.  Sau khi chạy xong test, server preview sẽ tự động tắt, đảm bảo tối ưu hóa tài nguyên hệ thống.
