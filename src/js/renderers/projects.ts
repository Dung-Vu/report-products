import { escapeHtml } from "../utils";
import { Project, ProjectDetailProfile, ProjectPeople } from "../types";
import { AppStore } from "../store";

// Import custom detail renderers
import { renderStockOnhandDetail } from "./details/stockPrice";
import { renderOrdPriceLookupDetail } from "./details/ordPrice";
import { renderBonarioHubDetail } from "./details/productHub";
import { renderAutoWorkflowDetail } from "./details/autoWorkflow";
import { renderInLabelPdfDetail } from "./details/inLabelPdf";
import { renderOpRoundRobinDetail } from "./details/opRoundRobin";
import { renderBillsServerDetail } from "./details/billsServer";
import { renderCurtainDetail } from "./details/curtain";
import { renderVisualBriefDetail } from "./details/visualBrief";
import { renderTunnelMasterDetail } from "./details/tunnelMaster";
import { renderActionBridgeDetail } from "./details/actionBridge";
import { renderStockEscalationDetail } from "./details/stockEscalation";
import { renderRfidDetail } from "./details/rfid";
import { renderOdooProductCreationDetail } from "./details/odooProductCreation";
import { renderInternalOrderTrackingDetail } from "./details/internalOrderTracking";

const CUSTOM_PROJECT_RENDERERS: Record<
    string,
    (proj: Project, index: number) => string
> = {
    "bonario-stock-management": renderStockOnhandDetail,
    "ord-price-lookup": renderOrdPriceLookupDetail,
    "bonario-product-hub": renderBonarioHubDetail,
    "auto-workflow": renderAutoWorkflowDetail,
    "in-label-pdf": renderInLabelPdfDetail,
    "op-round-robin": renderOpRoundRobinDetail,
    "bills-server": renderBillsServerDetail,
    "calculate-curtain-size": renderCurtainDetail,
    "visual-brief-builder": renderVisualBriefDetail,
    "tunnel-master": renderTunnelMasterDetail,
    "action-local-bridge": renderActionBridgeDetail,
};

function renderTextSection(
    label: string,
    value: string | undefined,
    extraClass = "",
): string {
    if (!value) return "";
    return `
      <section class="detail-info-card ${extraClass}">
        <p class="detail-section-label">${escapeHtml(label)}</p>
        <p>${escapeHtml(value)}</p>
      </section>`;
}

function renderPeopleSection(
    value: string | ProjectPeople | undefined,
): string {
    if (!value) return "";
    if (typeof value === "string") {
        return renderTextSection("People", value);
    }
    return `
      <section class="detail-info-card">
        <p class="detail-section-label">People</p>
        ${value.intro ? `<p>${escapeHtml(value.intro)}</p>` : ""}
        ${
            value.items && value.items.length
                ? `<ul class="detail-bullet-list">${value.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
                : ""
        }
      </section>`;
}

function renderListSection(
    label: string,
    items: string[] | undefined,
    extraClass = "",
): string {
    if (!items || !items.length) return "";
    return `
      <section class="detail-info-card ${extraClass}">
        <p class="detail-section-label">${escapeHtml(label)}</p>
        <ul class="detail-bullet-list">
          ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>`;
}

function getProjectDetailProfile(proj: Project): ProjectDetailProfile {
    const projectProfiles = AppStore.getState().projectProfiles;
    return (
        projectProfiles[proj.id] || {
            timeline:
                "Đã triển khai trong giai đoạn 8 tháng vận hành tại Bonario.",
            people: "Người dùng chính là team nghiệp vụ liên quan đến project này.",
            pnl: "Cost chính là thời gian phát triển và vận hành trên hạ tầng nội bộ. P&L cần đo thêm bằng thời gian tiết kiệm và lỗi giảm được.",
            roi: "ROI thể hiện qua việc project đã chạy thật và có dữ liệu xác minh từ hệ thống.",
            strengths: [
                "Giải quyết một nghiệp vụ cụ thể bằng công cụ chạy thật.",
                "Có dữ liệu hoặc log để kiểm chứng.",
            ],
            weaknesses: [
                "Cần thêm số đo adoption dài hạn.",
                "Cần tài liệu vận hành để người khác tiếp quản dễ hơn.",
            ],
            description: proj.hook || proj.built || proj.problem || "",
        }
    );
}

export function renderPanelContent(groupId: string): string {
    const systemGroups = AppStore.getState().systemGroups;
    const group = systemGroups.find((g) => g.id === groupId);
    if (!group) return "";
    if (group.id === "rfid") {
        return `
  <header class="detail-hero">
    <h1 class="detail-title">${escapeHtml(group.label)}</h1>
  </header>
  <div class="detail-project-list">${renderRfidDetail()}</div>`;
    }
    if (group.id === "stock-escalation") {
        return `
  <header class="detail-hero">
    <h1 class="detail-title">${escapeHtml(group.label)}</h1>
  </header>
  <div class="detail-project-list">${renderStockEscalationDetail()}</div>`;
    }
    if (group.id === "local-server-infra") {
        // Renders visual overview page for local-server-infra
        // Instead of hardcoding details, let's call the custom renderer or mock it
        // Actually, renderLocalServerInfraDetail has a unique layout
        // Let's create visual html structure
        return `
  <header class="detail-hero infra-route-hero">
    <h1 class="detail-title">${escapeHtml(group.label)}</h1>
  </header>
  <section class="infra-page">
      <article class="infra-overview">
        <div class="infra-overview-copy">
          <p class="pd-kicker">06 · Platform</p>
          <h2>Biến máy tính nội bộ thành server vận hành</h2>
          <p>Hạ tầng này giúp các app nội bộ có domain rõ ràng, truy cập ổn định hơn và không cần thuê riêng một server cho từng công cụ nhỏ. Người dùng chỉ mở link, phần vận hành phía sau được gom về một lớp quản lý chung.</p>
        </div>
        <div class="infra-overview-stats" aria-label="Số liệu hạ tầng">
          <div><strong>6+</strong><span>app nội bộ có domain riêng</span></div>
          <div><strong>6.305</strong><span>lượt truy cập đã ghi nhận</span></div>
          <div><strong>11</strong><span>port mở trực tiếp trên router</span></div>
        </div>
      </article>

      <section class="infra-access-map" aria-label="Luồng truy cập app nội bộ">
        <div>
          <span>01</span>
          <strong>Người dùng mở link</strong>
          <p>Sales, SC, kho hoặc back office truy cập bằng domain bonstu.site.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Cổng truy cập chung</strong>
          <p>Domain được gom về một điểm điều phối thay vì mỗi app một cách mở riêng.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Máy chủ nội bộ</strong>
          <p>Máy tính local phục vụ app thật, tận dụng hạ tầng sẵn có.</p>
        </div>
        <div>
          <span>04</span>
          <strong>App vận hành</strong>
          <p>Action, Stock, Price, Bills, Workflow, Visual tiếp tục chạy cho từng nghiệp vụ.</p>
        </div>
      </section>

      <article class="infra-unit infra-unit-primary">
        <header>
          <p class="pd-kicker">01 · Internal Access</p>
          <h2>Cổng truy cập app nội bộ</h2>
          <p>Đưa nhiều app nội bộ lên domain riêng để các phòng ban mở nhanh bằng link, không phải nhớ IP, port hoặc máy nào đang chạy app.</p>
        </header>
        <div class="infra-domain-strip">
          <span>action.bonstu.site</span>
          <span>stock.bonstu.site</span>
          <span>price.bonstu.site</span>
          <span>curtain-calculator.bonstu.site</span>
          <span>label.bonstu.site</span>
          <span>visual.bonstu.site</span>
        </div>
        <div class="infra-unit-grid">
          <div>
            <p class="pd-section-label">Giá trị vận hành</p>
            <h3>Một cách truy cập thống nhất cho nhiều app.</h3>
            <ul class="pd-list">
              <li>Các phòng ban có link rõ ràng để mở app nội bộ.</li>
              <li>Không cần mở port trực tiếp trên mạng công ty.</li>
              <li>Dễ thêm app mới khi phát sinh công cụ vận hành mới.</li>
            </ul>
          </div>
          <div>
            <p class="pd-section-label">Cost P&amp;L</p>
            <h3>Tận dụng máy tính sẵn có thay vì thuê server riêng.</h3>
            <p>Cost vận hành thấp. P&amp;L nằm ở việc nhiều app có thể chạy bằng hạ tầng nội bộ, giảm chi phí thuê VPS và giảm rủi ro cấu hình mạng thủ công.</p>
          </div>
        </div>
        <div class="infra-analysis">
          <div class="pd-strength">
            <p class="pd-section-label">Điểm mạnh</p>
            <ul class="pd-list">
              <li>Truy cập dễ hơn cho người dùng không rành kỹ thuật.</li>
              <li>Không cần thuê server ngoài cho từng app nhỏ.</li>
              <li>Giữ quyền kiểm soát app nội bộ trên máy của công ty.</li>
            </ul>
          </div>
          <div class="pd-weakness">
            <p class="pd-section-label">Điểm yếu</p>
            <ul class="pd-list">
              <li>Máy chủ nội bộ tắt thì các app cũng bị ảnh hưởng.</li>
              <li>Cần thêm cảnh báo sớm khi domain hoặc máy chủ gặp lỗi.</li>
            </ul>
          </div>
        </div>
      </article>

      <article class="infra-unit infra-unit-secondary">
        <header>
          <p class="pd-kicker">02 · Action Product</p>
          <h2>Cầu nối cho Action Product</h2>
          <p>Một lớp hỗ trợ riêng để Action Product chạy ổn định sau domain nội bộ. Khi cần đổi cách host hoặc đường truy cập, app chính ít bị ảnh hưởng hơn.</p>
        </header>
        <div class="infra-mini-stats">
          <div><strong>1</strong><span>cầu nối riêng cho Action Product</span></div>
          <div><strong>0</strong><span>thay đổi logic app chính</span></div>
          <div><strong>Low cost</strong><span>chi phí duy trì gần như không đáng kể</span></div>
        </div>
        <div class="infra-unit-grid">
          <div>
            <p class="pd-section-label">Vai trò</p>
            <h3>Giữ đường truy cập ổn định mà không làm phức tạp app chính.</h3>
            <ul class="pd-list">
              <li>Tách phần truy cập domain khỏi logic nghiệp vụ.</li>
              <li>Khi đổi cách host, không cần sửa lại app chính.</li>
              <li>Giảm rủi ro khi đưa app nội bộ ra môi trường dùng thật.</li>
            </ul>
          </div>
          <div>
            <p class="pd-section-label">Giá trị vận hành</p>
            <h3>Thay đổi hạ tầng mà ít ảnh hưởng người dùng.</h3>
            <p>Project này không tạo tính năng mới cho người dùng cuối, nhưng giúp Action Product chạy ổn định hơn và giảm rủi ro mỗi khi cần điều chỉnh hạ tầng.</p>
          </div>
        </div>
        <div class="infra-analysis">
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
              <li>Giá trị chính là hỗ trợ Action Product, không phải một app độc lập.</li>
              <li>Cần tài liệu vận hành rõ để người khác tiếp quản dễ hơn.</li>
            </ul>
          </div>
        </div>
      </article>
  </section>`;
    }
    if (group.id === "odoo-product-creation") {
        return `
  <header class="detail-hero">
    <h1 class="detail-title">${escapeHtml(group.label)}</h1>
  </header>
  <div class="detail-project-list">${renderOdooProductCreationDetail()}</div>`;
    }
    if (group.id === "internal-order-tracking") {
        return `
  <header class="detail-hero">
    <h1 class="detail-title">${escapeHtml(group.label)}</h1>
  </header>
  <div class="detail-project-list">${renderInternalOrderTrackingDetail()}</div>`;
    }
    const projects = AppStore.getState().projects;
    const groupProjects = group.projectIds
        .map((id) => projects.find((p) => p.id === id))
        .filter((p): p is Project => !!p);
    const projectBlocks = groupProjects
        .map((proj, index) => {
            const customRenderer = CUSTOM_PROJECT_RENDERERS[proj.id];
            if (customRenderer) return customRenderer(proj, index);
            const profile = getProjectDetailProfile(proj);
            return `
    <article class="detail-project-card">
      <header class="detail-project-head">
        <span class="detail-project-index">${String(index + 1).padStart(2, "0")}</span>
        <div>
          <p class="detail-project-kicker">${escapeHtml(proj.chapter)}</p>
          <h2 class="detail-project-title">${escapeHtml(profile.title || proj.name)}</h2>
          <p class="detail-project-hook">${escapeHtml(proj.hook)}</p>
        </div>
      </header>
      <div class="detail-project-body">
        ${renderTextSection("Mô tả project", profile.description, "detail-info-card-wide")}
        <div class="detail-info-grid">
          ${renderTextSection("Timeline", profile.timeline)}
          ${renderPeopleSection(profile.people)}
        </div>
        ${renderTextSection("Cost P&L", profile.pnl, "detail-info-card-wide")}
        ${renderTextSection("Chi phí thị trường tham chiếu", profile.marketCost, "detail-info-card-wide")}
        ${renderTextSection("ROI", profile.roi, "detail-info-card-wide")}
        <div class="detail-analysis-grid">
          ${renderListSection("Điểm mạnh", profile.strengths, "detail-info-card-strength")}
          ${renderListSection("Điểm yếu", profile.weaknesses, "detail-info-card-weakness")}
        </div>
      </div>
    </article>`;
        })
        .join("");
    return `
  <header class="detail-hero">
    <h1 class="detail-title">${escapeHtml(group.label)}</h1>
  </header>
  <div class="detail-project-list">${projectBlocks}</div>`;
}

export function buildProjectRoute(groupId: string): string {
    const state = AppStore.getState();
    if (!state.isLoaded) {
        return `
  <main class="project-route" aria-label="Đang tải chi tiết dự án" tabindex="-1">
    <section class="project-route-shell" style="--detail-accent: var(--soft-line)">
      <button class="route-back" type="button" data-route-home aria-label="Quay lại Project breakdown">← Quay lại Project breakdown</button>
      <header class="detail-hero">
        <h1 class="detail-title"><span class="skeleton-loading" style="width: 250px; height: 36px; display: inline-block;"></span></h1>
      </header>
      <div class="detail-project-list">
        <article class="project-detail-panel">
          <div class="detail-overview">
            <p class="pd-kicker"><span class="skeleton-loading" style="width: 80px; height: 16px; display: inline-block;"></span></p>
            <h2><span class="skeleton-loading" style="width: 200px; height: 24px; margin-top: 8px; display: inline-block;"></span></h2>
            <p>
              <span class="skeleton-loading" style="width: 100%; height: 16px; margin-top: 12px; display: inline-block;"></span>
              <span class="skeleton-loading" style="width: 90%; height: 16px; margin-top: 4px; display: inline-block;"></span>
            </p>
          </div>
          <div class="detail-meta-grid" style="display: grid; gap: 16px; margin-top: 16px;">
            <section class="detail-info-card">
              <p class="detail-section-label">Timeline</p>
              <p><span class="skeleton-loading" style="width: 120px; height: 16px; display: inline-block;"></span></p>
            </section>
            <section class="detail-info-card">
              <p class="detail-section-label">ROI</p>
              <p><span class="skeleton-loading" style="width: 100px; height: 16px; display: inline-block;"></span></p>
            </section>
          </div>
        </article>
      </div>
    </section>
  </main>`;
    }
    const systemGroups = state.systemGroups;
    const group = systemGroups.find((g) => g.id === groupId);
    if (!group) {
        return `
  <main class="project-route" aria-label="Không tìm thấy project" tabindex="-1">
    <section class="project-route-shell">
      <button class="route-back" type="button" data-route-home aria-label="Quay lại Project breakdown">← Quay lại Project breakdown</button>
      <p class="eyebrow-label">Project breakdown</p>
      <h1 class="project-route-title">Không tìm thấy mục này.</h1>
      <p class="project-route-summary">Mục chi tiết không còn tồn tại hoặc URL đã bị sai.</p>
    </section>
  </main>`;
    }
    return `
  <main class="project-route" aria-label="Chi tiết ${escapeHtml(group.label)}" tabindex="-1">
    <section class="project-route-shell" style="--detail-accent:${escapeHtml(group.accent)}">
      <button class="route-back" type="button" data-route-home aria-label="Quay lại Project breakdown">← Quay lại Project breakdown</button>
      ${renderPanelContent(group.id)}
    </section>
  </main>`;
}
