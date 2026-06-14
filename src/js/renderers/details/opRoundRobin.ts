import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderOpRoundRobinDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#be123c">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">OP Round Robin</h2>
        <p class="pd-subtitle">Tự động phân công OP phụ trách báo giá theo vòng xoay, giúp việc chia người xử lý rõ ràng hơn và giảm thao tác phân công thủ công.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>1</strong><span>luồng phân công OP tự động</span></div>
        <div class="pd-stat"><strong>2</strong><span>công ty áp dụng: Bonario / Ordinaire</span></div>
        <div class="pd-stat"><strong>24/7</strong><span>kiểm tra quotation cần người phụ trách</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Luồng phân công</p>
          <div class="pd-timeline-grid">
            <div class="pd-timeline-item"><strong>Phát hiện</strong><span>Tìm các báo giá mới hoặc chưa có OP phụ trách.</span></div>
            <div class="pd-timeline-item"><strong>Chia lượt</strong><span>Phân công theo vòng xoay để tránh dồn việc về một người.</span></div>
            <div class="pd-timeline-item"><strong>Ghi nhận</strong><span>Lưu lại người được phân công để dễ kiểm tra trách nhiệm xử lý.</span></div>
            <div class="pd-timeline-item"><strong>Theo dõi</strong><span>Giúp SC/Sales biết báo giá đang thuộc về ai.</span></div>
          </div>
        </section>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">Vấn đề giải quyết</p>
            <h3>Không cần chia OP bằng tay cho từng báo giá.</h3>
            <ul class="pd-list">
              <li>Giảm tình trạng báo giá bị bỏ sót người phụ trách.</li>
              <li>Giảm phụ thuộc vào một người phải ngồi chia việc thủ công.</li>
              <li>Trách nhiệm xử lý rõ hơn trên từng báo giá.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Giá trị vận hành</p>
            <h3>Luồng phân công đều hơn, dễ kiểm soát hơn.</h3>
            <ul class="pd-list">
              <li>OP nhận việc theo thứ tự rõ ràng.</li>
              <li>SC/Sales dễ biết ai đang phụ trách quotation.</li>
            </ul>
          </div>
        </div>

        <div class="pd-wide-box">
          <p class="pd-section-label">Cost P&amp;L</p>
          <h3>Chi phí thấp, tác động nằm ở việc giảm thao tác phân công lặp lại.</h3>
          <p>Cost là thời gian xây dựng script và duy trì chạy ổn định. P&amp;L nằm ở việc giảm thời gian chia OP thủ công, giảm rủi ro bỏ sót báo giá và giúp trách nhiệm xử lý rõ ràng hơn.</p>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Tự động hóa đúng phần việc lặp lại và dễ sai nhất.</li>
              <li>Giúp phân bổ việc đều hơn giữa các OP.</li>
              <li>Làm rõ người phụ trách trên từng báo giá.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Cần thêm log số lần gán OP để đo adoption rõ hơn.</li>
              <li>Cần rule rõ hơn cho trường hợp OP nghỉ, quá tải hoặc đổi người phụ trách.</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`;
}
