export function renderInternalOrderTrackingDetail(): string {
    return `
    <article class="pd-card pd-card-tracking-order" style="--pd-accent:#ea580c">
      <header class="pd-head">
        <p class="pd-kicker">09 · Order Tracking</p>
        <h2 class="pd-title">Tracking order internal</h2>
        <p class="pd-subtitle">Luồng theo dõi tiến độ đơn hàng dựa trên field Order State trong báo giá Odoo. Project tách thành 2 góc nhìn: khách hàng xem đơn đang được triển khai tới đâu, còn Sales kiểm tra sâu hơn về purchase và sản xuất khi đơn đang ở trạng thái In Progress.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>2</strong><span>website theo dõi: khách hàng và Sales nội bộ</span></div>
        <div class="pd-stat"><strong>Order State</strong><span>field chính để xác định tiến độ đơn trên báo giá</span></div>
        <div class="pd-stat"><strong>In Progress</strong><span>trạng thái cho phép Sales xem purchase và sản xuất</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Luồng trạng thái đơn hàng</p>
          <div class="pd-timeline-grid">
            <div class="pd-timeline-item"><strong>Need process</strong><span>Đơn mới cần được tiếp nhận và bắt đầu xử lý.</span></div>
            <div class="pd-timeline-item"><strong>In Progress</strong><span>Đơn đang triển khai; Sales xem được mua hàng và sản xuất đã tới đâu.</span></div>
            <div class="pd-timeline-item"><strong>Done</strong><span>Đơn đã hoàn tất theo luồng xử lý nội bộ.</span></div>
            <div class="pd-timeline-item"><strong>Cancelled</strong><span>Đơn bị hủy, không tiếp tục theo dõi tiến độ triển khai.</span></div>
          </div>
        </section>

        <div class="tracking-split">
          <div class="tracking-view-card">
            <p class="pd-section-label">Website khách hàng</p>
            <h3>Khách biết đơn đang ở giai đoạn nào.</h3>
            <p>Trang dành cho khách hàng chỉ hiển thị tiến độ cần thiết: đơn đang chờ xử lý, đang triển khai, đã hoàn tất hay đã hủy. Mục tiêu là giảm việc khách phải hỏi lại Sales và giúp trải nghiệm sau báo giá rõ ràng hơn.</p>
            <ul class="pd-list">
              <li>Hiển thị trạng thái đơn theo ngôn ngữ dễ hiểu.</li>
              <li>Không lộ thông tin nội bộ như purchase, cost hoặc tiến độ chi tiết của xưởng.</li>
              <li>Giúp khách có điểm tự kiểm tra thay vì nhắn hỏi từng lần.</li>
            </ul>
          </div>
          <div class="tracking-view-card tracking-view-card-sales">
            <p class="pd-section-label">Website Sales</p>
            <h3>Tracking nội bộ cho Sales</h3>
            <p>Trang dành cho Sales đọc field Order State trên đơn báo giá. Khi trạng thái là In Progress, Sales có thể biết đơn đó đã purchase bao nhiêu sản phẩm và sản xuất được bao nhiêu sản phẩm để phản hồi khách chính xác hơn.</p>
            <ul class="pd-list">
              <li>Xem đơn đang nằm ở trạng thái nào trên báo giá.</li>
              <li>Với In Progress: kiểm tra số lượng đã purchase.</li>
              <li>Với In Progress: kiểm tra số lượng đã sản xuất.</li>
            </ul>
          </div>
        </div>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">Vấn đề giải quyết</p>
            <h3>Sales và khách hàng không phải hỏi tiến độ thủ công nhiều lần.</h3>
            <p>Trước đây tiến độ thường nằm trong báo giá hoặc phải hỏi người phụ trách. Khi đưa Order State thành điểm theo dõi rõ ràng, mỗi nhóm nhìn đúng phần mình cần: khách xem trạng thái tổng quan, Sales xem chi tiết để tư vấn.</p>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">People</p>
            <h3>Khách hàng, Sales, SC và production cùng hưởng lợi.</h3>
            <ul class="pd-list">
              <li>Khách hàng tự xem được tiến độ tổng quan của đơn.</li>
              <li>Sales có dữ liệu để phản hồi khách nhanh hơn.</li>
              <li>SC/production giảm số lần bị hỏi lại về trạng thái đơn.</li>
            </ul>
          </div>
        </div>

        <div class="pd-wide-box pd-tracking-roi">
          <p class="pd-section-label">P&amp;L / ROI</p>
          <h3>ROI nằm ở việc giảm thời gian hỏi đáp và tăng độ minh bạch tiến độ.</h3>
          <p>Project giúp giảm vòng lặp hỏi tiến độ giữa khách hàng, Sales và các bộ phận vận hành. Khi Sales nhìn được đơn In Progress đã purchase/sản xuất tới đâu, việc phản hồi khách sẽ nhanh và chính xác hơn thay vì phải hỏi thủ công từng bộ phận.</p>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Tách rõ thông tin cho khách hàng và thông tin nội bộ cho Sales.</li>
              <li>Dựa trên Order State nên bám sát dữ liệu đang có trên báo giá Odoo.</li>
              <li>Giúp Sales phản hồi khách chủ động hơn khi đơn đang In Progress.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Độ chính xác phụ thuộc việc cập nhật Order State đúng và đều.</li>
              <li>Cần thống nhất cách đặt tên trạng thái để khách hàng dễ hiểu hơn các label nội bộ.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="tracking-sites">
        <div class="tracking-site-card">
          <p class="pd-section-label">Website khách hàng</p>
          <h3>Tracking tiến độ đơn cho khách</h3>
          <p>Link dùng cho khách hàng kiểm tra đơn đang được triển khai ở giai đoạn nào.</p>
          <a class="pd-site-link" href="https://tracking.ordinaire.vn/" target="_blank" rel="noopener noreferrer">Mở tracking.ordinaire.vn</a>
        </div>
        <div class="tracking-site-card">
          <p class="pd-section-label">Website Sales</p>
          <h3>Tracking nội bộ cho Sales</h3>
          <p>Link dành cho Sales kiểm tra Order State, số lượng đã purchase và số lượng đã sản xuất.</p>
          <span>Chờ gắn URL website</span>
        </div>
      </div>
    </article>`;
}
