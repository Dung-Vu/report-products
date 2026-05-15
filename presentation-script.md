# Kịch bản trình bày báo cáo tác động

Mục tiêu của buổi report: không trình bày như danh sách repo, mà dẫn sếp đi qua một câu chuyện rõ ràng: em đã nhìn thấy vấn đề vận hành, đã biến nó thành hệ thống, có bằng chứng, biết phần nào cần đo tiếp, và muốn nhận phạm vi trách nhiệm lớn hơn.

## 1. Mở đầu

Thông điệp chính:

> Sếp cho em bắt đầu bằng điều em thật sự muốn chứng minh. Em không chỉ làm thêm vài công cụ cho tiện việc; em đang biến các việc lặp lại quanh Odoo thành hệ thống có thể chạy, kiểm tra, mở rộng và bàn giao được.

Cách nói:

- Không đi ngay vào danh sách dự án.
- Nói trước rằng report này sẽ tách rõ số đã xác minh và phần ước lượng.
- Cho sếp chọn hướng xem: bối cảnh, hệ thống, hoặc đề xuất cuối.

## 2. Quy mô

Thông điệp chính:

> Em không claim các con số này là doanh thu cá nhân. Em dùng chúng để chứng minh quy mô vận hành đủ lớn để tự động hóa tạo ra giá trị thật.

Nhấn mạnh:

- 31.96B VND posted invoices.
- 6,668 product templates tạo từ 22/09/2025.
- 3,539 BOM tạo từ 22/09/2025.
- 4,552 stock pickings done.

## 3. Vấn đề

Thông điệp chính:

> Công ty không thiếu người giỏi. Nhưng người giỏi đang bị kéo vào quá nhiều việc lặp lại.

Nhấn mạnh 3 điểm:

- Dữ liệu lớn nhưng kiểm soát còn thủ công.
- Quy trình phụ thuộc vào người nhớ làm.
- Khi bị hỏi nguồn số liệu, cần trả lời bằng bằng chứng.

## 4. Hành trình năng lực

Thông điệp chính:

> Điều thay đổi lớn nhất không chỉ là em biết thêm kỹ thuật. Em học được cách biến vấn đề vận hành thành hệ thống.

Nhấn mạnh:

- Hiểu hệ thống trước khi đụng vào hệ thống.
- Biến việc lặp lại thành công cụ dùng được.
- Dùng AI như bộ khuếch đại, không phải cái cớ.
- Chuyển từ “làm được” sang “đo được”.

## 5. Hệ thống

Thông điệp chính:

> Em không muốn kể theo kiểu “em làm 11 dự án kỹ thuật”. Em muốn cho sếp thấy chúng đang ghép thành một lớp vận hành.

Cách đi:

- Nếu thời gian ít, mở 3 case tiêu biểu:
  - Bonario Product Hub.
  - ORD Price Lookup System.
  - OP Round Robin hoặc Bills Server.
- Nếu sếp muốn chi tiết, mở từng nhóm hệ thống.

## 6. Case study

Mỗi case nói theo cấu trúc:

- Case này chứng minh năng lực gì.
- Vấn đề ban đầu là gì.
- Trước đó vận hành ra sao.
- Sau khi có hệ thống thay đổi gì.
- Bằng chứng hiện có.
- Giá trị claim cẩn thận và phần cần đo tiếp.

Không nên nói “em thay thế X người” nếu chưa có số đo thời gian trước/sau. Nói theo hướng: “có thể quy đổi nếu chốt thêm volume và thời gian xử lý”.

## 7. Giá trị

Thông điệp chính:

> Em không muốn nói quá. Em muốn quy đổi giá trị theo cách sếp có thể kiểm tra được.

Nhấn mạnh:

- Giảm việc tay lặp lại.
- Tăng khả năng kiểm tra.
- Tạo nền để scale AI có quy trình.
- Bảng chi phí nhân sự là benchmark để thảo luận, chưa phải claim cuối.

## 8. Bằng chứng

Thông điệp chính:

> Phần này không phải để làm màu. Phần này để sếp kiểm tra lại khi cần.

Nhấn mạnh:

- Không đưa secret.
- Không đưa dữ liệu khách hàng cấp dòng.
- Chỉ đưa aggregate Odoo, trạng thái vận hành, audit/adoption trace.

## 9. Đề xuất cuối

Thông điệp chính:

> Điều em xin không chỉ là ghi nhận các công cụ đã làm. Em muốn nhận trách nhiệm lớn hơn.

Câu chốt đề xuất:

> Em muốn buổi report này là cơ sở để sếp xem xét niềm tin, vị trí và mức đãi ngộ dựa trên giá trị vận hành mà em có thể tiếp tục tạo ra cho công ty.

Đề xuất vai trò:

> Internal Automation & Operations Systems Owner.

90 ngày tiếp theo:

- Đo trước/sau cho các quy trình chính.
- Chuẩn hóa bảng theo dõi sử dụng thực tế.
- Chọn 3 hệ thống có tác động cao để đưa vào vận hành chính thức.

## Cách dùng report

- Mở `index.html`.
- Bắt đầu từ `#/opening`.
- Dùng phím mũi tên phải/trái hoặc nút `Trước` / `Tiếp`.
- Khi sếp hỏi số liệu, bật `Mở bằng chứng`.
