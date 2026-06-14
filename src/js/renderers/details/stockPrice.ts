import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderStockOnhandDetail(proj: Project, index: number): string {
    return `
    <article class="stock-detail-card">
      <header class="stock-detail-head">
        <span class="stock-detail-index">${String(index + 1).padStart(2, "0")}</span>
        <div>
          <p class="stock-detail-kicker">${escapeHtml(proj.chapter)}</p>
          <h2 class="stock-detail-title">Stock Onhand Management</h2>
          <p class="stock-detail-subtitle">Hệ thống tra cứu tồn kho và kiểm kho nội bộ, thay luồng hỏi đáp thủ công và file rời. Giúp tiết kiệm thời gian và nắm bắt thông tin nhanh chóng khi giao tiếp với khách hàng.</p>
        </div>
      </header>

      <section class="stock-story-band">
        <div>
          <p class="stock-section-label">Timeline</p>
          <strong>2 ngày</strong>
          <span>Được xây dựng và hoàn thiện trong vòng 2 ngày.</span>
        </div>
        <div>
          <p class="stock-section-label">People</p>
          <strong>2 người</strong>
          <ul>
            <li>Dũng xây dựng repo và xử lý logic hoàn chỉnh.</li>
            <li>Anh Hà cải thiện giao diện.</li>
          </ul>
        </div>
      </section>

      <section class="stock-pnl-section">
        <div class="stock-pnl-main">
          <p class="stock-section-label">Cost P&L</p>
          <h3>Chi phí nội bộ thấp, tác động vận hành rõ.</h3>
          <p>Cost nội bộ gồm 2 ngày công và chi phí AI, tổng chi phí hết khoảng <strong>1,2 triệu VND</strong>. P&L không tạo doanh thu trực tiếp nhưng giảm sai sót lệch tồn, giảm thời gian hỏi kho và rút ngắn quy trình nhận thông tin.</p>
        </div>
        <aside class="stock-market-cost">
          <p class="stock-section-label">Chi phí thị trường công ty Tech</p>
          <div class="stock-cost-row"><span>Backend</span><strong>~4 tuần</strong></div>
          <div class="stock-cost-row"><span>Frontend</span><strong>~4 tuần</strong></div>
          <div class="stock-cost-row"><span>DevOps</span><strong>~2 tuần</strong></div>
          <hr>
          <div class="stock-cost-row"><span>Senior Full-stack Lead</span><strong>2.000 USD</strong></div>
          <div class="stock-cost-row"><span>Frontend Developer Mid</span><strong>1.200 USD</strong></div>
          <div class="stock-cost-row"><span>DevOps shared</span><strong>750 USD</strong></div>
          <div class="stock-cost-total"><span>Tổng</span><strong>3.950 USD</strong><small>~104.102.250 VND</small></div>
        </aside>
      </section>

      <section class="stock-roi-panel">
        <p class="stock-section-label">ROI</p>
        <div class="stock-roi-number">1.083,3%</div>
        <div class="stock-roi-grid">
          <div><strong>4 ngày công</strong><span>Kiểm kho giảm từ 3 ngày/2 người xuống 2 ngày/1 người, tương đương khoảng 2 triệu VND.</span></div>
          <div><strong>1.359 request</strong><span>Mỗi lần tra tồn giảm khoảng 15 phút, tương đương khoảng 14 ngày công, khoảng 7 triệu VND.</span></div>
          <div><strong>13 triệu VND</strong><span>App đã duy trì 3 tháng: 6 triệu VND từ kiểm kho + 7 triệu VND từ tra cứu tồn.</span></div>
        </div>
      </section>

      <section class="stock-analysis">
        <div class="stock-strength">
          <p class="stock-section-label">Điểm mạnh</p>
          <ul>
            <li>Dữ liệu real-time.</li>
            <li>Kiểm kho hàng tháng không phụ thuộc vào phòng BIS để xuất số lượng tồn.</li>
            <li>Check được sản phẩm đó có thực sự tồn hay đang dính đơn, điểm mà khi check Odoo thủ công nhân sự kho dễ bỏ sót.</li>
          </ul>
        </div>
        <div class="stock-weakness">
          <p class="stock-section-label">Điểm yếu</p>
          <ul>
            <li>Vẫn đang trong quá trình phát triển.</li>
            <li>Cần tiếp tục scale thêm để bao phủ nhiều tình huống vận hành hơn.</li>
          </ul>
        </div>
      </section>

      <section class="stock-site-preview" aria-label="Website Stock Onhand Management">
        <div class="stock-site-copy">
          <p class="stock-section-label">Website đang chạy</p>
          <h3>Bonario Stock</h3>
          <p>Giao diện tra cứu tồn kho real-time đang live tại stock.bonstu.site, có lọc công ty, nhóm sản phẩm, kho, trạng thái ngưng sản xuất và xuất Excel/PDF.</p>
          <a class="stock-site-link" href="https://stock.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
        </div>
        <a class="stock-site-shot" href="https://stock.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website Bonario Stock">
          <img src="./assets/stock-onhand-management.png" alt="Giao diện website Bonario Stock đang hiển thị danh sách tồn kho theo kho ORDAP" loading="lazy">
        </a>
      </section>
    </article>`;
}
