import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderAutoWorkflowDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#ea580c">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">Auto Workflow</h2>
        <p class="pd-subtitle">Hub điều phối automation nội bộ — gom Shopify, Odoo, Zalo ZNS, Telegram và scheduler vào một service Flask duy nhất thay cho các webhook rời rạc.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>9</strong><span>webhook routes đang hoạt động</span></div>
        <div class="pd-stat"><strong>50/50</strong><span>lần scheduler không thất bại · 07–15/05/2026</span></div>
        <div class="pd-stat"><strong>2</strong><span>cuộc họp auto-conducted ghi nhận</span></div>
        <div class="pd-stat"><strong>Daily</strong><span>ZNS auto-refresh cho 2 project</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Timeline</p>
          <div class="pd-timeline-grid">
            <div class="pd-timeline-item"><strong>11/2025</strong><span>Shopify webhook, Zalo ZNS, Telegram bot.</span></div>
            <div class="pd-timeline-item"><strong>12/2025</strong><span>Scheduler daily, delivery tracking.</span></div>
            <div class="pd-timeline-item"><strong>Q1/2026</strong><span>RFID reconciliation, auto-conducted flow.</span></div>
            <div class="pd-timeline-item"><strong>05/2026</strong><span>50 lần chạy liên tiếp không hỏng.</span></div>
          </div>
        </section>

        <div class="pd-wide-box">
          <p class="pd-section-label">Integrations đang hoạt động</p>
          <h3>9 kênh kết nối, 1 hub kiểm soát.</h3>
          <p>Shopify customer sync → Odoo · FSM delivery tracking · Zalo ZNS HDSD tiếng Anh/Việt · Rating ORD · OAuth Zalo callback · Auto-conducted scheduler · Telegram RFID reconciliation · Token auto-refresh hàng ngày.</p>
          <div class="pd-tags">
            <span class="pd-tag">Shopify Webhook</span>
            <span class="pd-tag">Odoo XML-RPC</span>
            <span class="pd-tag">Zalo ZNS</span>
            <span class="pd-tag">Telegram Bot</span>
            <span class="pd-tag">APScheduler</span>
            <span class="pd-tag">Flask</span>
          </div>
        </div>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">People &amp; Cost</p>
            <h3>1 người · hạ tầng nội bộ.</h3>
            <p>Cost chính là thời gian build và volume Docker. Không thuê dịch vụ automation bên ngoài — toàn bộ logic nghiệp vụ nằm trong code kiểm soát được.</p>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Giá trị đo được</p>
            <h3>Không thất bại trong 9 ngày liên tiếp.</h3>
            <p>42 lần giám sát tồn kho theo dõi 20 mặt hàng biến động · 8 lần quét sản phẩm hàng ngày · ZNS refresh đúng giờ không cần can thiệp thủ công.</p>
          </div>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Tập trung nhiều automation vào một hub — dễ debug và bảo trì.</li>
              <li>Webhook và scheduler chạy thật, không chỉ demo.</li>
              <li>ZNS tự refresh token hàng ngày cho cả 2 project.</li>
              <li>Endpoint /health theo dõi trạng thái token, scheduler và route.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Cần dashboard health chi tiết hơn để người khác tự kiểm tra.</li>
              <li>Khi số workflow tăng, cần chuẩn hóa logging và retry policy.</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`;
}
