import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderVisualBriefDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#c026d3">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">Công cụ brief hình AI cho Marketing</h2>
        <p class="pd-subtitle">Một form nội bộ giúp marketing tạo brief hình ảnh theo brand rõ ràng hơn. Thay vì mỗi người tự viết prompt theo kinh nghiệm riêng, app gom các lựa chọn quan trọng thành một quy trình dễ dùng và nhất quán.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>1</strong><span>workflow chuẩn cho việc tạo brief hình AI</span></div>
        <div class="pd-stat"><strong>3</strong><span>nhóm lựa chọn chính: mục đích hình, phong cách, tỷ lệ</span></div>
        <div class="pd-stat"><strong>Live</strong><span>đang chạy tại visual.bonstu.site</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Luồng marketing sử dụng</p>
          <div class="pd-timeline-grid">
            <div class="pd-timeline-item"><strong>Chọn mục đích</strong><span>Xác định hình dùng cho lifestyle, sản phẩm, moodboard hoặc campaign.</span></div>
            <div class="pd-timeline-item"><strong>Chọn phong cách</strong><span>Gom mood, ánh sáng, chất liệu, bố cục và reference vào cùng một form.</span></div>
            <div class="pd-timeline-item"><strong>Tạo brief</strong><span>App chuyển lựa chọn thành brief rõ ràng để gửi sang công cụ tạo ảnh.</span></div>
            <div class="pd-timeline-item"><strong>Chỉnh lại</strong><span>Marketing có thể refine yêu cầu theo hướng ít props hơn, background sạch hơn hoặc đúng brand code.</span></div>
          </div>
        </section>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">People</p>
            <h3>Toàn bộ project do Anh Hà triển khai.</h3>
            <ul class="pd-list">
              <li>Anh Hà triển khai toàn bộ project và định hướng workflow sử dụng.</li>
              <li>Dũng support build Docker, connect subdomain và bảo trì hệ thống.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Giá trị vận hành</p>
            <h3>Biến prompt cá nhân thành quy trình chung cho team.</h3>
            <ul class="pd-list">
              <li>Người mới vẫn có thể tạo brief theo cùng một chuẩn.</li>
              <li>Brief dễ kiểm soát hơn trước khi gửi tạo ảnh.</li>
              <li>Giảm tình trạng mỗi người viết prompt một kiểu khác nhau.</li>
            </ul>
          </div>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Dễ dùng cho người không chuyên prompt.</li>
              <li>Chuẩn hóa mục đích hình, tone, tỷ lệ và reference trong một quy trình.</li>
              <li>Giúp marketing giữ brand tone ổn định hơn khi dùng AI image.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Chưa có số usage định lượng mạnh — đang theo dõi adoption.</li>
              <li>Chất lượng ảnh vẫn phụ thuộc reference đầu vào và engine tạo ảnh.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pd-site" style="--pd-accent:#c026d3">
        <div class="pd-site-copy">
          <p class="pd-section-label">Website đang chạy</p>
          <h3>visual.bonstu.site</h3>
          <p>Công cụ brief hình AI cho marketing. Link dùng để mở workflow tạo brief và chuẩn hóa yêu cầu hình ảnh trước khi generate.</p>
          <a class="pd-site-link" href="https://visual.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
        </div>
        <a class="pd-site-shot" href="https://visual.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website Visual Brief Builder">
          <img src="./assets/visual-brief-builder.png" alt="Giao diện Visual Brief Builder trên visual.bonstu.site" loading="lazy">
        </a>
      </div>
    </article>`;
}
