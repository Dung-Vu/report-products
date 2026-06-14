import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderInLabelPdfDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#7c3aed">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">In Label PDF</h2>
        <p class="pd-subtitle">App vận hành kho: tra cứu phiếu nhập từ Odoo, in label PDF, quản lý batch QC và báo cáo doanh số sản phẩm được gắn tags FURNITURE STOCK,FABRICS STOCK</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>2 ngày</strong><span>timeline hoàn thiện app</span></div>
        <div class="pd-stat"><strong>~1tr2</strong><span>chi phí ước tính để xây dựng và hoàn thiện</span></div>
        <div class="pd-stat"><strong>P&amp;L</strong><span>hữu ích cho kho vận kiểm soát, vận chuyển và đối chiếu số lượng QC trên phiếu Odoo</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Luồng nghiệp vụ</p>
          <div class="pd-timeline-grid">
            <div class="pd-timeline-item"><strong>Tra cứu</strong><span>Nhập mã phiếu để lấy đúng dữ liệu phiếu nhập đang có trên Odoo.</span></div>
            <div class="pd-timeline-item"><strong>In label</strong><span>Xuất PDF layout 4×12, 48 labels/trang, trích lot và variant.</span></div>
            <div class="pd-timeline-item"><strong>QC Batch</strong><span>Gom sản phẩm theo batch để kho theo dõi trạng thái kiểm hàng.</span></div>
            <div class="pd-timeline-item"><strong>Báo cáo</strong><span>Xem nhanh nhóm sản phẩm nội thất/vải để hỗ trợ xử lý kho.</span></div>
          </div>
        </section>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">People</p>
            <h3>4 người đóng góp vào cách app được hình thành và vận hành.</h3>
            <ul class="pd-list">
              <li>Vy đóng góp ý tưởng về việc QC để xử lý thuận tiện hơn.</li>
              <li>Uyên đề xuất ý tưởng phát triển thống kê các hàng gắn tags FURNITURE STOCK, FABRICS STOCK.</li>
              <li>Anh Hà đưa ra các đóng góp và nhận xét về triển khai in label.</li>
              <li>Dũng build app, triển khai production và bảo trì app.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Giá trị vận hành</p>
            <h3>Kho/QC có một nơi để lấy phiếu và in label đúng form.</h3>
            <p>Nhân sự không cần tự gom dữ liệu, tự chỉnh file hoặc hỏi lại thông tin phiếu. Công cụ giúp phiếu, label và batch QC đi cùng một luồng rõ ràng hơn.</p>
          </div>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Chủ động design phiếu label theo phong cách riêng dễ ràng và dễ chỉnh sửa không phù thuộc vào ngôn ngữ của Odoo</li>
              <li>Một app phục vụ nhiều nghiệp vụ: kho, QC, in ấn, báo cáo.</li>
              <li>Tách các sản phẩm và số lượng QC  trong 1 phiếu trên hệ thống  Odoo.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Cần thêm thống kê sử dụng theo ngày/tháng để đo Technology adoption.</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`;
}
