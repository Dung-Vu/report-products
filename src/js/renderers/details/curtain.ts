import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderCurtainDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#0891b2">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">Curtain Size Calculator</h2>
        <p class="pd-subtitle">Công cụ tính vải rèm từ file báo giá PDF, giúp SC rút ngắn thao tác tính thủ công, kiểm tra lại số liệu báo giá và xuất format chuẩn để gửi xưởng.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>2 tuần</strong><span>thời gian triển khai và build production</span></div>
        <div class="pd-stat"><strong>4 người</strong><span>tham gia mô tả nghiệp vụ, góp ý và triển khai</span></div>
        <div class="pd-stat pd-stat-positive"><strong>+350%</strong><span>ROI ước tính sau 4 tháng vận hành</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Mô tả project</p>
          <div class="pd-timeline-grid">
            <div class="pd-timeline-item"><strong>Nhận PDF</strong><span>Chỉ cần gửi file báo giá PDF vào app thay vì nhập lại từng dòng thủ công.</span></div>
            <div class="pd-timeline-item"><strong>Tính vải</strong><span>Tính số nối tổng, quy cách vải và mã vải cần bao nhiêu m2.</span></div>
            <div class="pd-timeline-item"><strong>Đối chiếu</strong><span>So sánh số liệu với JAK và rà soát báo giá Sales đã tính đúng thành tiền chưa.</span></div>
            <div class="pd-timeline-item"><strong>Xuất file</strong><span>Tạo 5 sheet xử lý để gửi xưởng, thay vì gom số liệu bằng tay.</span></div>
          </div>
        </section>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">People</p>
            <h3>Hoàn thiện bởi 4 người.</h3>
            <ul class="pd-list">
              <li>Chị Yến mô tả cách tính vải xếp li và định vị.</li>
              <li>Trang hỗ trợ trao đổi thêm thông tin về quá trình tính toán.</li>
              <li>Uyên đề xuất các cải tiến nâng cao.</li>
              <li>Dũng xây dựng toàn bộ hệ thống và bảo trì hệ thống.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Cost &amp; P&amp;L</p>
            <h3>Cost triển khai: khoảng 6tr.</h3>
            <ul class="pd-list">
              <li>Chi phí gồm 2 tuần ngày công để triển khai project và build production.</li>
              <li>P&amp;L nằm ở việc giảm thao tác tính thủ công, kiểm soát dữ liệu chính xác hơn và nắm rõ cách tính vải.</li>
              <li>SC có file đầu ra chuẩn hơn để đối chiếu nội bộ và gửi xưởng.</li>
            </ul>
          </div>
        </div>

        <div class="pd-wide-box pd-roi-box">
          <p class="pd-section-label">ROI</p>
          <h3>+350% · ước tính lợi nhuận 27tr sau 4 tháng.</h3>
          <p>Trước khi có app, một đơn báo giá lớn cần tính số nối tổng, lượng vải theo từng quy cách, đối chiếu với JAK, rà lại thành tiền và chuẩn hóa format gửi xưởng. Người có kinh nghiệm như Trang có thể mất khoảng 2-3 tiếng cho một đơn lớn; người chưa đủ kinh nghiệm lâu như Mai Thu có thể mất cả một buổi chiều, khoảng 4-5 tiếng.</p>
          <p>After khi triển khai, quy trình rút xuống còn một thao tác gửi file PDF báo giá. App tính toán và tạo 5 sheet xử lý trong khoảng 10-20 giây. Ước tính mỗi tháng giảm khoảng 3 giờ/ngày thao tác thủ công. Sau 4 tháng vận hành, lợi ích ước tính khoảng 540 giờ, tương đương 27tr. Chưa tính phần tối ưu chi phí vải cho xưởng, vì mỗi 1m vải rút gọn được có thể tiết kiệm thêm khoảng 1-2tr.</p>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Rút ngắn rất nhiều thời gian thao tác thủ công.</li>
              <li>Giảm áp lực công việc cho bộ phận SC.</li>
              <li>Số liệu tính toán chính xác hơn và tránh sai sót từ báo giá của SC.</li>
              <li>Đầu ra có format rõ ràng để gửi xưởng và đối chiếu lại khi cần.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Còn cần phát triển thêm công thức về nối ngang và công thức rèm roman.</li>
              <li>Cần thiết kế tài liệu hướng dẫn để người mới dễ tiếp cận, sử dụng và hiểu app.</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`;
}
