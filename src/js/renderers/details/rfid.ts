export function renderRfidDetail(): string {
    return `
    <article class="rfid-card" style="--pd-accent:#0d9488">
      <header class="rfid-head">
        <p class="pd-kicker">11 · Warehouse / RFID</p>
        <h2>RFID</h2>
        <p>Project dán từng tem barcode vào từng cuốn catalog. Hàng ngày quét RFID, xử lý logic để biết có bị miss hoặc mất CTL, sau đó báo cáo lên hệ thống Odoo với thông số chính xác.</p>
      </header>

      <section class="rfid-flow" aria-label="Luồng vận hành RFID">
        <div><strong>Dán barcode</strong><span>Mỗi cuốn catalog được gắn mã để định danh.</span></div>
        <div><strong>Quét RFID hằng ngày</strong><span>Đọc dữ liệu thực tế từ CTL đang có.</span></div>
        <div><strong>Xử lý logic</strong><span>Đối chiếu để phát hiện miss hoặc mất CTL.</span></div>
        <div><strong>Report Odoo</strong><span>Báo cáo thông số chính xác lên hệ thống.</span></div>
      </section>

      <section class="rfid-grid">
        <div class="rfid-box">
          <p class="pd-section-label">Timeline</p>
          <h3>Không xác định chính xác</h3>
          <p>Khi Dũng vào thử việc, Anh Hà đã chuẩn bị trang thiết bị và kế hoạch triển khai trước đó.</p>
        </div>
        <div class="rfid-box">
          <p class="pd-section-label">People</p>
          <h3>2 người</h3>
          <ul class="pd-list">
            <li>Anh Hà xây scripts automation lên n8n, triển khai kế hoạch và mua thiết bị liên quan.</li>
            <li>Dũng đưa script về máy chủ để tối ưu chi phí vận hành n8n, dán barcode và follow project trong quá trình vận hành.</li>
          </ul>
        </div>
      </section>

      <section class="rfid-pnl">
        <div>
          <p class="pd-section-label">Cost</p>
          <h3>Máy RFID, tem barcode và thời gian build script.</h3>
          <p>Chi phí nằm ở phần thiết bị đọc RFID, vật tư barcode và thời gian triển khai automation. Ngoài ra, trước đây script automation chạy trên n8n với chi phí hosting hàng tháng bên ngoài.</p>
        </div>
        <div>
          <p class="pd-section-label">P&amp;L — Loại bỏ chi phí n8n</p>
          <h3>Không còn chi phí vận hành n8n hàng tháng.</h3>
          <p>Script automation đã được chuyển từ n8n về chạy trực tiếp trên máy chủ nội bộ. Toàn bộ logic điều phối RFID, xử lý báo cáo và Telegram automation hiện tự vận hành trên server của công ty — không cần thuê host ngoài, không phụ thuộc vào platform third-party và không có phí duy trì hàng tháng.</p>
        </div>
      </section>

      <section class="pd-analysis rfid-analysis">
        <div class="pd-strength">
          <p class="pd-section-label">Điểm mạnh</p>
          <ul class="pd-list">
            <li>Tối ưu thời gian thao tác thủ công.</li>
            <li>Tỉ lệ CTL bị mất giảm đáng kể.</li>
            <li>Kiểm soát độ chính xác cao with CTL đang thực sự có.</li>
            <li>Tối ưu độ chính xác về số CTL Bonario đang sở hữu theo thời gian.</li>
          </ul>
        </div>
        <div class="pd-weakness">
          <p class="pd-section-label">Điểm yếu</p>
          <ul class="pd-list">
            <li>Mất khoảng 30 phút mỗi ngày để quét RFID, đưa lên Telegram xử lý logic và làm report thủ công.</li>
            <li>Vẫn còn thao tác thủ công khi báo cáo lên hệ thống Odoo.</li>
          </ul>
        </div>
      </section>
    </article>`;
}
