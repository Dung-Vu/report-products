# Original User Request

## Initial Request — 2026-06-12T19:25:14+07:00

Tối ưu hóa và nâng cấp giao diện của Bonario Impact Report thành phiên bản v2 với các hiệu ứng chuyển cảnh mượt mà hơn, thiết kế responsive tối ưu cho thiết bị di động và trải nghiệm tương tác trực quan hơn.

Working directory: d:\report-products
Integrity mode: development

## Requirements

### R1. Thiết kế lại giao diện (Redesign & Style)
Thiết kế lại giao diện của Bonario Impact Report v2 bằng cách tích hợp TailwindCSS (qua CDN) để tạo kiểu dáng hiện đại, cao cấp. Đảm bảo responsive tối ưu trên cả thiết bị di động (mobile-responsive hoàn chỉnh) và máy tính để bàn mà không bị vỡ layout hay tràn chiều ngang.

### R2. Hiệu ứng chuyển động (Cinematic Animations)
Cải thiện hiệu ứng chuyển cảnh (scene transition) và cuộn trang (scroll trigger) giữa các scene (từ scene 0 đến scene 3) sử dụng các thư viện như GSAP hoặc Anime.js qua CDN để tạo hiệu ứng chuyển động mượt mà, đậm chất cinematic.

### R3. Tương tác bản đồ hệ thống (Interactive System Map - Scene 3)
Nâng cấp trải nghiệm tương tác của Scene 3 (System Map) hiển thị 11 nhóm nghiệp vụ. Khi hover hoặc click vào các node, hiển thị panel chi tiết một cách mượt mà và trực quan, cho phép đóng/mở panel tự nhiên.

### R4. Tính nhất quán dữ liệu (Data Integrity)
Đảm bảo toàn bộ logic render dữ liệu tĩnh từ các file JavaScript (`data/impact-projects.js`, `data/impact-evidence.js`, `data/projects.js`) và cơ chế chạy số liệu verified tại Scene 2 vẫn hoạt động bình thường, hiển thị chính xác các con số và thông tin.

## Verification

### Automated Check
- Chạy quét kiểm tra mã nguồn (linting) và đảm bảo các file HTML, JS không bị lỗi cú pháp.
- Đảm bảo console không xuất hiện bất kỳ lỗi JavaScript nào khi tải trang.

### Agent-as-judge / Manual Verification
- Agent độc lập (hoặc audit agent) sẽ kiểm tra tính responsive trên các độ phân giải màn hình phổ biến (375px, 768px, 1024px, 1440px) và chấm điểm mức độ mượt mà của hiệu ứng GSAP.

## Acceptance Criteria

### Giao diện và Phong cách (UI & Aesthetics)
- [ ] Giao diện v2 mang tính thẩm mỹ cao (sử dụng palette màu tối phối màu điểm nhấn sang trọng, font chữ Inter đồng bộ).
- [ ] Responsive hoàn chỉnh trên mobile (không bị chồng chéo chữ, không bị scroll ngang ở màn hình di động).

### Trải nghiệm & Hiệu ứng (UX & Motion)
- [ ] Hiệu ứng chuyển giữa 4 scene mượt mà, phản hồi tốt với thao tác scroll của người dùng.
- [ ] Side-panel chi tiết ở Scene 3 mở ra/đóng lại bằng hiệu ứng trượt hoặc mờ dần (fade/slide) mượt mà mà không giật lag.

## Follow-up — 2026-06-12T12:37:44Z

Hello. The user has updated the requirements for the frontend of the Bonario Impact Report v2. We are doing a complete redesign (Master Frontend) utilizing TailwindCSS and GSAP via CDN, and integrating 6 specific interactive components from 21st.dev.
Please update your project milestones, adjust your implementation plans, and pivot the development to meet these new requirements immediately.

Here is the updated prompt text:

---
Tối ưu hóa và nâng cấp giao diện của Bonario Impact Report thành phiên bản v2 cực kỳ hiện đại, có tính tương tác cao và phô diễn kỹ thuật Frontend đỉnh cao (Master FE) bằng cách sử dụng TailwindCSS và GSAP thông qua CDN.

Working directory: d:\report-products
Integrity mode: development

## Requirements

### R1. Tích hợp Công nghệ & Phong cách (TailwindCSS + GSAP CDN)
Tích hợp TailwindCSS và GSAP thông qua CDN làm nền tảng chính để xây dựng giao diện hiện đại, tối ưu responsive hoàn chỉnh trên thiết bị di động (mobile-first / mobile-responsive) và desktop mà không bị lỗi giao diện.

### R2. Scene 1: Cinematic Hook
- Thiết kế nền phong cách phim ảnh với hiệu ứng nhiễu hạt (Film Grain overlay bằng SVG/CSS).
- Tiêu đề chính sử dụng hiệu ứng tan chảy kết dính (Gooey Text Morphing dùng SVG Filter).
- Chuyển cảnh parallax cuộn dọc (layered parallax scroll) mượt mà khi cuộn trang xuống.

### R3. Scene 2: Tech-driven Stats
- Biểu diễn 4 số liệu verified dưới dạng thẻ kính mờ (Frosted Glass Cards/Glassmorphism).
- Tích hợp hiệu ứng xoay 3D (3D Tilt Card) phản hồi theo góc di chuột.
- Khi cuộn đến Scene 2, chạy hiệu ứng đếm số tăng dần kết hợp từ mờ sang rõ nét (Animated Blur-to-focus Numbers: blur(10px) -> blur(0px)).

### R4. Scene 3: Bento Grid System Map & Details
- Thiết kế lại 11 nhóm nghiệp vụ thành bố cục Bento Grid bất đối xứng hiện đại.
- Thêm đường viền phát sáng gradient xoay quanh các card Bento khi hover chuột (Glow Border) và nền dot pattern lưới phản hồi theo chuột.
- Khi click chọn một card Bento, trượt mở Side Panel từ phải sang trái mượt mà bằng GSAP. Bên trong Side Panel sử dụng hoạt ảnh xếp chồng thẻ (CardStack) để duyệt bằng chứng (evidence cards).

### R5. Scene 4: Cinematic Close & CTA
- Hiển thị câu chốt của báo cáo bằng hoạt ảnh chạy chữ biến đổi ký tự ngẫu nhiên (Text Scramble).
- Thiết kế nút CTA (Call to Action) có lực hút nam châm (Magnet Button) đàn hồi hút nhẹ theo con trỏ chuột khi đến gần.

### R6. Tính nhất quán dữ liệu (Data Integrity)
Đảm bảo toàn bộ logic render dữ liệu tĩnh từ các file JavaScript (data/impact-projects.js, data/impact-evidence.js, data/projects.js) và cơ chế chạy số liệu verified tại Scene 2 vẫn hoạt động bình thường, hiển thị chính xác các con số và thông tin.

## Verification

### Automated Check
- Chạy quét kiểm tra mã nguồn (linting) và đảm bảo các file HTML, JS không bị lỗi cú pháp.
- Đảm bảo console không xuất hiện bất kỳ lỗi JavaScript nào khi tải trang.

### Agent-as-judge / Manual Verification
- Agent độc lập (hoặc audit agent) sẽ kiểm tra tính responsive trên các độ phân giải màn hình phổ biến (375px, 768px, 1024px, 1440px) và chấm điểm mức độ mượt mà của hiệu ứng GSAP.

## Acceptance Criteria

### Giao diện và Phong cách (UI & Aesthetics)
- [ ] Giao diện v2 mang tính thẩm mỹ cao (phong cách tối, màu điểm nhấn sang trọng, font chữ Inter).
- [ ] Responsive hoàn chỉnh trên mobile (không bị chồng chéo chữ, không bị scroll ngang ở màn hình di động).
- [ ] Tích hợp thành công 6 hiệu ứng: Film Grain/Gooey Text, 3D Tilt Card, Animated Blur Number, Bento Grid (glow border), Side Panel (CardStack), và Magnet Button.

### Trải nghiệm & Hiệu ứng (UX & Motion)
- [ ] Hiệu ứng chuyển giữa 4 scene mượt mà, phản hồi tốt với thao tác scroll của người dùng.
- [ ] Side-panel chi tiết ở Scene 3 mở ra/đóng lại bằng hiệu ứng trượt hoặc mờ dần (fade/slide) mượt mà mà không giật lag.
---

## Follow-up — 2026-06-12T13:25:47Z

Please pause or stop execution immediately after completing Milestone 1. Do not automatically proceed to Milestone 2. Once Milestone 1 is done, report back and wait for further instructions.

## Follow-up — 2026-06-12T13:50:54Z

Hello. The user is back online. Please cancel the pause constraint after Milestone 1. You should proceed automatically to Milestone 2, 3, and 4 to complete the entire Master FE project. Continue monitoring and reporting your progress.
