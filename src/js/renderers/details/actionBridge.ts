import { escapeHtml } from "../../utils";
import { Project } from "../../types";

export function renderActionBridgeDetail(proj: Project, index: number): string {
    return `
    <article class="pd-card" style="--pd-accent:#334155">
      <header class="pd-head">
        <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
        <h2 class="pd-title">Cầu nối cho Action Product</h2>
        <p class="pd-subtitle">Một lớp trung gian giúp Action Product truy cập ổn định qua domain nội bộ mà không phải sửa logic app chính mỗi khi thay đổi cách host.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>1</strong><span>cầu nối riêng cho Action Product</span></div>
        <div class="pd-stat"><strong>0</strong><span>thay đổi logic app chính</span></div>
        <div class="pd-stat"><strong>Low cost</strong><span>chi phí duy trì gần như không đáng kể</span></div>
      </div>

      <div class="pd-body">
        <div class="pd-infra-route">
          <div class="pd-infra-node">
            <strong>Domain Action Product</strong>
            <span>Người dùng truy cập bằng link quen thuộc</span>
          </div>
          <div class="pd-infra-arrow">→</div>
          <div class="pd-infra-node">
            <strong>App chạy trên máy chủ local</strong>
            <span>Cầu nối giữ đường truy cập ổn định cho app</span>
          </div>
        </div>

        <div class="pd-two-col">
          <div class="pd-box">
            <p class="pd-section-label">Vai trò</p>
            <h3>Giữ đường truy cập cho Action Product ổn định hơn.</h3>
            <ul class="pd-list">
              <li>Tách phần truy cập domain khỏi logic app chính.</li>
              <li>Khi đổi cách host, không cần sửa lại app chính.</li>
              <li>Giảm rủi ro khi đưa app nội bộ ra môi trường dùng thật.</li>
            </ul>
          </div>
          <div class="pd-box">
            <p class="pd-section-label">Giá trị vận hành</p>
            <h3>Thay đổi hạ tầng mà ít ảnh hưởng người dùng.</h3>
            <p>Project này không tạo tính năng mới cho người dùng cuối, nhưng giúp Action Product chạy ổn định hơn và giảm rủi ro mỗi khi cần điều chỉnh hạ tầng.</p>
          </div>
        </div>

        <div class="pd-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Giảm rủi ro khi thay đổi cách truy cập Action Product.</li>
              <li>Không làm phức tạp app chính.</li>
              <li>Dễ thay thế nếu cần đổi cấu hình host sau này.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Giá trị chính là hỗ trợ app Action Product, không phải sản phẩm độc lập.</li>
              <li>Cần tài liệu vận hành rõ để người khác tiếp quản dễ hơn.</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`;
}
