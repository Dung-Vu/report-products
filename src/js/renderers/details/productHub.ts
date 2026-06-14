import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderBonarioHubDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card pd-card-hub" style="--pd-accent:#0f766e">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">Bonario Product Hub</h2>
        <p class="pd-subtitle">Hub trung tâm vận hành dữ liệu sản phẩm trên Odoo: làm sạch BOM, pricelist, cost, description, report tự động, daily scan và workflow automation trong một giao diện nội bộ.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>10 ngày</strong><span>xây dựng và hoàn thiện project</span></div>
        <div class="pd-stat"><strong>+843,4%</strong><span>ROI ước tính sau 4 tháng triển khai</span></div>
        <div class="pd-stat"><strong>~50tr</strong><span>tổng lợi ích vận hành ước tính</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Timeline</p>
          <div class="pd-timeline-grid">
            <div class="pd-timeline-item"><strong>10 ngày</strong><span>Được xây dựng và hoàn thiện trong vòng 10 ngày.</span></div>
            <div class="pd-timeline-item"><strong>4 tháng</strong><span>Đã triển khai vận hành production và tạo lợi ích đều theo ngày/tháng.</span></div>
            <div class="pd-timeline-item"><strong>26 modules</strong><span>End-to-end modules cho data, report, automation và monitoring.</span></div>
            <div class="pd-timeline-item"><strong>Enterprise</strong><span>Monitoring stack, scheduled jobs và multi-channel reporting.</span></div>
          </div>
        </section>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">People</p>
            <h3>Hoàn thiện bởi 1 người.</h3>
            <ul class="pd-list">
              <li>Dũng xây dựng repo, logic, integration và vận hành.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Cost P&amp;L</p>
            <h3>Cost nội bộ: 5,3 triệu VND.</h3>
            <p>Chi phí build và hoàn thiện gồm 10 ngày công và AI. P&amp;L nằm ở giảm thao tác thủ công trên Odoo, chuẩn hóa dữ liệu sản phẩm, báo cáo tự động thay cho check thủ công hàng ngày và workflow automation.</p>
          </div>
        </div>

        <div class="pd-wide-box pd-roi-box">
          <p class="pd-section-label">ROI</p>
          <h3>+843,4% · tổng lợi ích ước tính khoảng 50 triệu VND.</h3>
          <p>Report tự động cho Sales/SC tiết kiệm khoảng <strong>2 ngày</strong> cho chu kỳ 14 ngày và 1 tháng, tương đương khoảng <strong>6 bản báo cáo/tháng</strong> (~1 triệu VND). Hệ thống xử lý <strong>3.540 BOM</strong>, <strong>3.769 pricelist</strong>, <strong>4.000 cost</strong> chi tiết cho product variants và tạo <strong>437 mô tả sản phẩm</strong> bằng tiếng Anh + tiếng Việt trong 2,5 ngày cho sản phẩm ORD, ước lượng tối ưu được 3,5 tháng (~42 triệu VND).</p>
          <p>Daily scan tiết kiệm khoảng <strong>1 giờ/ngày</strong> cho việc kiểm tra sản phẩm thiếu BOM, pricelist, description, cost, vendor; thêm khoảng <strong>30 phút/ngày</strong> để kiểm tra sức khỏe các project production. Sau 4 tháng vận hành, tổng lợi ích ước tính khoảng <strong>50 triệu VND</strong>.</p>
        </div>

        <div class="pd-market-estimate">
          <div class="pd-market-summary">
            <p class="pd-section-label">Ước lượng nếu không dùng AI hỗ trợ</p>
            <h3>Team 9 người × 9 tháng</h3>
            <span>Tổng chi phí nhân công tham chiếu: <strong>153.000 USD</strong></span>
            <p>Bonario Product Hub lớn hơn khoảng 4 lần so với Stock Onhand và ORD Price Lookup cộng lại về lượng code và độ phức tạp.</p>
          </div>
          <div class="pd-market-grid">
            <div><strong>1 Tech Lead / Architect</strong><span>Thiết kế tổng thể, Odoo integration, core infrastructure · $3.000/tháng</span></div>
            <div><strong>3 Senior Backend</strong><span>26 blueprints, service/domain layer, scheduler, tests · $2.000 × 3/tháng</span></div>
            <div><strong>3 Senior Frontend</strong><span>22 pages, 74+ components, 26 hooks, 11 stores, PWA, Three.js · $1.500 × 3/tháng</span></div>
            <div><strong>1 DevOps</strong><span>Docker 5 services, Prometheus, Grafana, CI/CD, Cloudflare · $2.000/tháng</span></div>
            <div><strong>1 QA Engineer</strong><span>47 backend tests, Vitest, 6 Playwright E2E · $1.500/tháng</span></div>
          </div>
          <p class="pd-market-note">Một mình Product Hub đã là sản phẩm enterprise cỡ vừa với monitoring stack, scheduled jobs, multi-channel reporting và 26 modules end-to-end.</p>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Daily scan tự động.</li>
              <li>Bao phủ nhiều điểm dữ liệu: BOM, cost, pricelist, description, Cambodia, Statistics.</li>
              <li>Rút ngắn quy trình thao tác và giảm thiểu vấn đề phát sinh từ bộ phận SC.</li>
              <li>Kiểm soát dữ liệu chặt chẽ.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Scale quá rộng nên có vài chức năng chưa được dùng tới.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pd-site" style="--pd-accent:#0f766e">
        <div class="pd-site-copy">
          <p class="pd-section-label">Website đang chạy</p>
          <h3>action.bonstu.site</h3>
          <p>Hub vận hành sản phẩm Bonario đang live tại action.bonstu.site, dùng cho dữ liệu sản phẩm, workflow automation, report và monitoring nội bộ.</p>
          <a class="pd-site-link" href="https://action.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
        </div>
        <a class="pd-site-shot" href="https://action.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website Bonario Product Hub">
          <img src="./assets/bonario-product-hub.png" alt="Giao diện đăng nhập Bonario Product Hub trên action.bonstu.site" loading="lazy">
        </a>
      </div>
    </article>`;
}
