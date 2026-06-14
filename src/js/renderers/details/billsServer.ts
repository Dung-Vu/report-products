import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderBillsServerDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#be123c">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">Bills Archive Server</h2>
        <p class="pd-subtitle">Kho lưu trữ chứng từ PDF để back office mở, tra cứu và đối chiếu nhanh hơn, và bảo mật tuyệt đối chỉ truy cập được folder khi cùng mạng lan với máy chủ.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>983</strong><span>PDF chứng từ trong kho lưu trữ</span></div>
        <div class="pd-stat"><strong>1 buổi</strong><span>timeline triển khai script và setup automation</span></div>
        <div class="pd-stat"><strong>250k</strong><span>chi phí triển khai toàn bộ script</span></div>
        <div class="pd-stat pd-stat-positive"><strong>+4.700%</strong><span>ROI ước tính từ việc rút ngắn xử lý chứng từ VAT</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Tác động xử lý chứng từ VAT</p>
          <div class="pd-monthly-grid">
            <div class="pd-monthly-item"><strong>983</strong><span>chứng từ VAT đã xử lý trong 4 tháng</span></div>
            <div class="pd-monthly-item"><strong>1 tháng</strong><span>thao tác thủ công trước đây</span></div>
            <div class="pd-monthly-item"><strong>1 buổi</strong><span>thời gian xử lý sau automation</span></div>
            <div class="pd-monthly-item"><strong>20 phút</strong><span>thời gian xử lý thủ công mỗi phiếu</span></div>
            <div class="pd-monthly-item"><strong>5 giây</strong><span>để ra một folder hoàn chỉnh</span></div>
            <div class="pd-monthly-item"><strong>12tr</strong><span>ước tính tiết kiệm 1 tháng công</span></div>
          </div>
        </section>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">People</p>
            <h3>2 người đóng góp vào ý tưởng và triển khai.</h3>
            <ul class="pd-list">
              <li>Uyên đưa ra ý tưởng về việc triển khai.</li>
              <li>Dũng viết scripts và xử lý ổn định workflow automation.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Cost P&amp;L</p>
            <h3>Chi phí triển khai khoảng 250k.</h3>
            <p>Cost là 1 buổi triển khai toàn bộ script và setup automation. P&amp;L nằm ở việc giảm một lượng lớn thời gian thao tác thủ công, đảm bảo tính chính xác và đúng format kế toán, giúp quá trình triển khai tiện lợi hơn.</p>
          </div>
        </div>

        <div class="pd-wide-box">
          <p class="pd-section-label">ROI</p>
          <h3>+4.700%</h3>
          <p>Trong 1 buổi chiều hệ thống đã xử lý 983 chứng từ VAT của 4 tháng đầu năm 2026. Nếu làm thủ công, khối lượng này ước tính mất khoảng 1 tháng công, tương đương 12 triệu VND. Từ tháng 5, automation workflow giúp không còn phải xử lý thủ công từ phiếu VAT; thời gian xử lý mỗi phiếu giảm từ khoảng 20 phút xuống còn khoảng 5 giây để ra một folder hoàn chỉnh.</p>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Giảm mạnh thao tác thủ công khi xử lý chứng từ VAT.</li>
              <li>Đầu ra đúng format kế toán, dễ kiểm soát và đối chiếu.</li>
              <li>Chứng từ được gom thành folder hoàn chỉnh, thuận tiện cho triển khai thực tế.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
            <li>Vận hành workflow automation từ đầu tháng 5 cho nên chưa có dữ liệu dài hạn để đánh giá hiệu quả lâu dài.</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`;
}
