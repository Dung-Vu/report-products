import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderTunnelMasterDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#334155">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">Cổng truy cập app nội bộ</h2>
        <p class="pd-subtitle">Biến máy tính nội bộ thành điểm chạy nhiều app có domain riêng như action, stock, price, bills. Người dùng chỉ cần mở link, không cần biết máy nào đang host app.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>6+</strong><span>app nội bộ đã có domain riêng</span></div>
        <div class="pd-stat"><strong>6.305</strong><span>lượt truy cập qua các subdomain đã ghi nhận</span></div>
        <div class="pd-stat"><strong>11</strong><span>port mở trực tiếp trên router công ty</span></div>
      </div>

      <div class="pd-body">
        <section>
          <p class="pd-section-label">Các domain nội bộ đang dùng</p>
          <div class="pd-tags" style="margin-top:0">
            <span class="pd-tag">action.bonstu.site</span>
            <span class="pd-tag">stock.bonstu.site</span>
            <span class="pd-tag">price.bonstu.site</span>
            <span class="pd-tag">bills.bonstu.site</span>
            <span class="pd-tag">workflow.bonstu.site</span>
            <span class="pd-tag">visual.bonstu.site</span>
          </div>
        </section>

        <div class="pd-infra-route">
          <div class="pd-infra-node">
            <strong>Người dùng mở domain</strong>
            <span>Truy cập bằng link bonstu.site trên trình duyệt</span>
          </div>
          <div class="pd-infra-arrow">→</div>
          <div class="pd-infra-node">
            <strong>Máy chủ nội bộ Bonario</strong>
            <span>Máy tính local phục vụ app mà không cần thuê VPS riêng</span>
          </div>
        </div>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">Vấn đề giải quyết</p>
            <h3>App nội bộ không còn phụ thuộc vào IP, port hoặc máy cá nhân khó nhớ.</h3>
            <ul class="pd-list">
              <li>Các phòng ban truy cập bằng domain rõ ràng.</li>
              <li>Không cần mở port trực tiếp trên mạng công ty.</li>
              <li>Dễ gom nhiều app nội bộ về một cách vận hành thống nhất.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Cost P&amp;L</p>
            <h3>Tận dụng máy tính sẵn có thay vì thuê server riêng.</h3>
            <p>Cost vận hành thấp. P&amp;L nằm ở việc nhiều app nội bộ có thể chạy bằng hạ tầng sẵn có, giảm chi phí thuê VPS và giảm rủi ro cấu hình mạng thủ công.</p>
          </div>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Người dùng có link rõ ràng để mở app nội bộ.</li>
              <li>Không cần thuê server ngoài cho từng app nhỏ.</li>
              <li>Dễ mở rộng khi phát sinh thêm app vận hành mới.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Phụ thuộc máy chủ nội bộ, máy tắt thì các app cũng bị ảnh hưởng.</li>
              <li>Cần thêm cảnh báo để phát hiện sớm khi domain hoặc máy chủ gặp lỗi.</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`;
}
