import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderOrdPriceLookupDetail(
    proj: Project,
    index: number,
): string {
    return `
    <article class="ord-detail-card">
      <header class="ord-detail-head">
        <div>
          <p class="ord-detail-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
          <h2>ORD Price Lookup</h2>
          <p>Công cụ tra cứu và tính giá Product Ordinaire, chuyển luồng hỏi giá từ Telegram và file Excel nhiều sheet lên website để Sales/SC phản hồi khách nhanh hơn.</p>
        </div>
        <div class="ord-score">
          <strong>10</strong>
          <span>ngày xây dựng và chuyển đổi luồng sử dụng</span>
        </div>
      </header>

      <section class="ord-usage-strip">
        <div><strong>15 phút</strong><span>thời gian search/tính giá trước đây cho một case</span></div>
        <div><strong>vài giây</strong><span>thời gian tra cứu sau khi đưa lên website</span></div>
        <div><strong>5 tháng</strong><span>thời gian project đã được triển khai</span></div>
      </section>

      <section class="ord-timeline">
        <p class="ord-section-label">Timeline</p>
        <div class="ord-timeline-grid">
          <div><strong>2 ngày</strong><span>Tìm hiểu và nghiên cứu cách xây dựng.</span></div>
          <div><strong>3 ngày</strong><span>Viết logic và xử lý code.</span></div>
          <div><strong>3 ngày</strong><span>Xử lý data từ file Excel của SC ra file data riêng của hệ thống.</span></div>
          <div><strong>2 ngày</strong><span>Chuyển đổi cổng giao tiếp từ Telegram lên website.</span></div>
        </div>
      </section>

      <section class="ord-flow">
        <div class="ord-flow-card">
          <p class="ord-section-label">People</p>
          <h3>Hoàn thiện bởi 1 người.</h3>
          <ul class="ord-mini-list">
            <li>Dũng xây dựng repo, data và xử lý logic hoàn chỉnh.</li>
          </ul>
        </div>
        <div class="ord-flow-card">
          <p class="ord-section-label">Cost P&L</p>
          <h3>Cost nội bộ: 3,5 triệu VND.</h3>
          <p>Chi phí build gồm 10 ngày công và AI, được tính thấp vì repo được thực hiện trong thời gian thử việc. P&L không tạo doanh thu trực tiếp, nhưng giảm thời gian SC tra file Excel nhiều sheet và giảm thao tác tính toán với sản phẩm chưa có sẵn màu vải/kích thước.</p>
        </div>
      </section>

      <section class="ord-market-cost">
        <div>
          <p class="ord-section-label">Chi phí thị trường công ty Tech</p>
          <h3>3.275 USD</h3>
          <span>~86.312.543 VND</span>
        </div>
        <dl>
          <div><dt>Backend</dt><dd>~4 tuần</dd></div>
          <div><dt>Frontend</dt><dd>~3 tuần</dd></div>
          <div><dt>DevOps</dt><dd>~1 tuần</dd></div>
          <div><dt>Senior Full-stack Lead</dt><dd>2.000 USD</dd></div>
          <div><dt>Frontend Developer Mid</dt><dd>900 USD</dd></div>
          <div><dt>DevOps shared</dt><dd>375 USD</dd></div>
        </dl>
      </section>

      <section class="ord-roi-band">
        <p class="ord-section-label">ROI</p>
        <div class="ord-roi-result">
          <strong>-32,86%</strong>
          <span>chưa thu hồi vốn sau 5 tháng triển khai</span>
        </div>
        <p>Project rút ngắn quy trình tra giá và tính toán cho SC/Sales, đồng thời tạo cách làm việc chuyên nghiệp hơn trước mặt khách hàng vì giảm chờ nhắn tin và tính giá thủ công. Thời gian search/tính giá giảm từ khoảng 15 phút xuống còn vài giây; mức tiết kiệm ước tính khoảng 45 phút mỗi ngày, tương đương 4,7 ngày công sau 5 tháng, khoảng 2,35 triệu VND.</p>
      </section>

      <section class="ord-checklist">
        <div>
          <p class="ord-section-label">Điểm mạnh</p>
          <ul>
            <li>Nhanh, tiện lợi và rút ngắn quy trình tra giá.</li>
            <li>Tính toán được giá với kích thước và màu vải ngẫu nhiên.</li>
            <li>Sales phản hồi khách thuận tiện hơn, không phải chờ SC tính giá trong những case chưa có giá sẵn.</li>
          </ul>
        </div>
        <div>
          <p class="ord-section-label">Điểm yếu</p>
          <ul>
            <li>Vì là repo đầu tay nên trình độ chuyên môn và cách xử lý chưa triệt để.</li>
            <li>Chưa đạt hiệu quả cao.</li>
            <li>Triển khai 5 tháng nhưng chưa thu hồi vốn.</li>
          </ul>
        </div>
      </section>

      <section class="ord-site-preview" aria-label="Website ORD Price Lookup">
        <div class="ord-site-copy">
          <p class="ord-section-label">Website đang chạy</p>
          <h3>ORD Price Lookup</h3>
          <p>Giao diện tra cứu giá ORD đang live tại price.bonstu.site, chuyển luồng tìm giá từ chat/Excel sang website có sidebar lịch sử, prompt gợi ý và ô search trung tâm.</p>
          <a class="ord-site-link" href="https://price.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
        </div>
        <a class="ord-site-shot" href="https://price.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website ORD Price Lookup">
          <img src="./assets/ord-price-lookup.png" alt="Giao diện website ORD Price Lookup với sidebar tìm kiếm và ô nhập tên sản phẩm" loading="lazy">
        </a>
      </section>
    </article>`;
}
