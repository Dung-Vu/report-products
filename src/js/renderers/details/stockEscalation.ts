export function renderStockEscalationDetail(): string {
    return `
    <article class="escalation-card" style="--pd-accent:#dc2626">
      <header class="escalation-head">
        <p class="pd-kicker">12 · Alerting / Automation</p>
        <h2>Escalate thông báo hàng</h2>
        <p>Workflow automation check real-time khi hàng tồn kho có tag Discontinued đã được bán và không còn tồn trên Odoo. Khi phát hiện case này, hệ thống gửi thông báo tới các phòng ban liên quan để dừng bán và archive sản phẩm đúng nơi.</p>
      </header>

      <section class="escalation-flow" aria-label="Luồng thông báo discontinued">
        <div><strong>Odoo</strong><span>Hàng có tag Discontinued và tồn kho về 0.</span></div>
        <div><strong>Automation</strong><span>Script kiểm tra real-time và trigger cảnh báo.</span></div>
        <div><strong>Marketing</strong><span>Archive sản phẩm trên website.</span></div>
        <div><strong>BIS</strong><span>Archive sản phẩm trên Odoo.</span></div>
        <div><strong>Sales / SC</strong><span>Thông báo và ngừng bán mặt hàng đó.</span></div>
      </section>

      <section class="escalation-grid">
        <div class="escalation-box">
          <p class="pd-section-label">Timeline</p>
          <h3>30 phút</h3>
          <p>Triển khai scripts automation cho luồng kiểm tra và thông báo hàng discontinued/out-of-stock.</p>
        </div>
        <div class="escalation-box">
          <p class="pd-section-label">People</p>
          <h3>1 người</h3>
          <ul class="pd-list">
            <li>Dũng xây dựng scripts để triển khai tự động hóa.</li>
          </ul>
        </div>
        <div class="escalation-box">
          <p class="pd-section-label">Cost P&amp;L</p>
          <h3>Chi phí build không đáng kể.</h3>
          <p>P&amp;L nằm ở giảm thao tác thủ công và đồng bộ thông tin đến toàn bộ các phòng ban liên quan.</p>
        </div>
        <div class="escalation-roi">
          <p class="pd-section-label">ROI</p>
          <strong>+5.900%</strong>
          <p>Tiết kiệm khoảng 30 phút mỗi ngày cho việc check tồn kho của sản phẩm gắn tag và thông báo đến các bộ phận. Đã triển khai 2 tháng, tiết kiệm khoảng 1.800 phút.</p>
        </div>
      </section>

      <section class="pd-analysis escalation-analysis">
        <div class="pd-strength">
          <p class="pd-section-label">Điểm mạnh</p>
          <ul class="pd-list">
            <li>Tối ưu thời gian thao tác thủ công.</li>
            <li>Không bỏ sót các sản phẩm không còn stock mà bị discontinued.</li>
          </ul>
        </div>
        <div class="pd-weakness">
          <p class="pd-section-label">Điểm yếu</p>
          <ul class="pd-list">
            <li>Chưa có kênh chat chung để thông báo một nơi.</li>
            <li>Đa số đang làm việc qua Zalo personal, không có webhook để can thiệp tự động.</li>
          </ul>
        </div>
      </section>
    </article>`;
}
