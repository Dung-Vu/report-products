import { escapeHtml } from "../utils";
import { AppStore } from "../store";
import { buildEvidenceScale, getReportPeriodText } from "./evidence";

export function buildHookScene(): string {
    const state = AppStore.getState();
    const projectsCount = state.isLoaded ? state.projects.length : 0;
    const numDisplay = state.isLoaded 
        ? projectsCount 
        : `<span class="skeleton-loading" style="width:70px;height:70px;border-radius:50%;vertical-align:middle;display:inline-block;"></span>`;
    return `
  <section class="scene scene-hook" id="scene-0" aria-label="Mở đầu">
    <div class="sparkles-wrapper">
      <h1 class="sparkles-title"><span class="sparkles-num">${numDisplay}</span> <span class="sparkles-txt">Projects</span></h1>
      
      <div class="sparkles-container-box">
        <!-- Gradients -->
        <div class="sparkles-gradient-line sparkles-gradient-line-1"></div>
        <div class="sparkles-gradient-line sparkles-gradient-line-2"></div>
        <div class="sparkles-gradient-line sparkles-gradient-line-3"></div>
        <div class="sparkles-gradient-line sparkles-gradient-line-4"></div>
        
        <!-- Core canvas component -->
        <canvas id="sparkles-canvas"></canvas>
        
        <!-- Radial overlay to mask the edges -->
        <div class="sparkles-radial-overlay"></div>
      </div>
    </div>
  </section>`;
}

export function buildCounterScene(): string {
    return `
  <section class="scene scene-scale" id="scene-2" aria-label="Quy mô vận hành">
    <div class="scale-inner">
      ${buildEvidenceScale()}
    </div>
  </section>`;
}

export function buildTechBar(): string {
    const state = AppStore.getState();
    if (!state.isLoaded) {
        return `
  <div class="tech-bar">
    <span class="tech-bar-label">Stack kỹ thuật · <span class="skeleton-loading" style="width: 100px; height: 16px; vertical-align: middle;"></span></span>
    <div class="tech-cats">
      ${Array.from({ length: 3 })
          .map(
              () => `
        <div class="tech-row">
          <span class="tech-cat-label" style="display:inline-block;"><span class="skeleton-loading" style="width: 80px; height: 14px;"></span></span>
          <div class="tech-tags">
            <span class="tech-tag skeleton-loading" style="width: 60px; height: 18px;"></span>
            <span class="tech-tag skeleton-loading" style="width: 80px; height: 18px;"></span>
            <span class="tech-tag skeleton-loading" style="width: 50px; height: 18px;"></span>
          </div>
        </div>`,
          )
          .join("")}
    </div>
  </div>`;
    }
    const techStack = state.techStack;
    const totalTech = techStack.reduce((a, c) => a + c.items.length, 0);
    return `
  <div class="tech-bar">
    <span class="tech-bar-label">Stack kỹ thuật · ${totalTech} công nghệ</span>
    <div class="tech-cats">
      ${techStack
          .map(
              (cat) => `
        <div class="tech-row">
          <span class="tech-cat-label">${escapeHtml(cat.cat)}</span>
          <div class="tech-tags">${cat.items.map((item) => `<span class="tech-tag">${escapeHtml(item)}</span>`).join("")}</div>
        </div>`,
          )
          .join("")}
    </div>
  </div>`;
}

export function buildNodeMap(): string {
    const state = AppStore.getState();
    if (!state.isLoaded) {
        return Array.from({ length: 4 })
            .map(
                () => `
  <button class="node-btn" disabled style="--node-accent: var(--soft-line)" aria-label="Đang tải dữ liệu...">
    <span class="node-eyebrow"><span class="skeleton-loading" style="width: 50px; height: 12px;"></span></span>
    <strong class="node-label" style="display:block;"><span class="skeleton-loading" style="width: 120px; height: 18px; margin-top: 4px;"></span></strong>
    <p class="node-summary">
      <span class="skeleton-loading" style="width: 100%; height: 14px; margin-top: 8px;"></span>
      <span class="skeleton-loading" style="width: 80%; height: 14px; margin-top: 4px;"></span>
    </p>
  </button>`,
            )
            .join("");
    }
    const systemGroups = state.systemGroups;
    return systemGroups
        .map(
            (g) => `
  <button class="node-btn" data-route-project="${escapeHtml(g.id)}"
    style="--node-accent:${escapeHtml(g.accent)}"
    aria-label="Xem mục ${escapeHtml(g.label)}" role="listitem">
    <span class="node-eyebrow">${escapeHtml(g.eyebrow)}</span>
    <strong class="node-label">${escapeHtml(g.label)}</strong>
    <p class="node-summary">${escapeHtml(g.summary)}</p>
  </button>`,
        )
        .join("");
}

export function buildSystemScene(): string {
    return `
  <section class="scene scene-system" id="scene-1" aria-label="Bản đồ hệ thống">
    <div class="system-inner">
      <header class="system-header">
        <p class="eyebrow-label">Project breakdown</p>
        <h2 class="system-title">11 Projects đã triển khai và đang hoạt động trong 8 tháng qua.</h2>
        <p class="system-hint">Bấm vào từng mục để xem chi tiết →</p>
      </header>
      <div class="node-map" role="list">${buildNodeMap()}</div>
    </div>
  </section>`;
}

export function buildRoadmap(): string {
    const state = AppStore.getState();
    if (!state.isLoaded) {
        return `
  <div class="roadmap-block">
    <span class="roadmap-eyebrow">Kế hoạch tiếp theo</span>
    <h3 class="roadmap-title">Lộ trình 90 ngày để chuyển từ build app sang phụ trách vận hành số.</h3>
    <div class="roadmap-grid">
      ${Array.from({ length: 3 })
          .map(
              () => `
        <div class="rc" style="--rc-accent: var(--soft-line)">
          <div class="rc-top">
            <span class="rc-phase"><span class="skeleton-loading" style="width: 60px; height: 12px;"></span></span>
            <span class="rc-num"><span class="skeleton-loading" style="width: 20px; height: 12px;"></span></span>
          </div>
          <h4 class="rc-title" style="display:block;"><span class="skeleton-loading" style="width: 150px; height: 18px;"></span></h4>
          <div class="rc-why" style="display:block;"><span class="skeleton-loading" style="width: 120px; height: 14px;"></span></div>
          <p class="rc-desc">
            <span class="skeleton-loading" style="width: 100%; height: 14px;"></span>
            <span class="skeleton-loading" style="width: 90%; height: 14px; margin-top: 4px;"></span>
          </p>
          <hr class="rc-sep">
          <ul class="rc-items">
            <li><span class="skeleton-loading" style="width: 80%; height: 14px;"></span></li>
            <li><span class="skeleton-loading" style="width: 70%; height: 14px; margin-top: 4px;"></span></li>
          </ul>
          <div class="rc-footer">
            <span class="rc-effort" style="display:inline-block;"><span class="skeleton-loading" style="width: 50px; height: 12px;"></span></span>
          </div>
        </div>`,
          )
          .join("")}
    </div>
  </div>`;
    }
    const roadmap = state.roadmap;
    return `
  <div class="roadmap-block">
    <span class="roadmap-eyebrow">Kế hoạch tiếp theo</span>
    <h3 class="roadmap-title">Lộ trình 90 ngày để chuyển từ build app sang phụ trách vận hành số.</h3>
    <div class="roadmap-grid">
      ${roadmap
          .map(
              (r) => `
        <div class="rc" style="--rc-accent:${escapeHtml(r.accent)}">
          <div class="rc-top">
            <span class="rc-phase">${escapeHtml(r.phase)}</span>
            <span class="rc-num">${escapeHtml(r.num)}</span>
          </div>
          <h4 class="rc-title">${escapeHtml(r.title)}</h4>
          <div class="rc-why">${escapeHtml(r.why)}</div>
          <p class="rc-desc">${escapeHtml(r.desc)}</p>
          <hr class="rc-sep">
          <ul class="rc-items">
            ${r.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <div class="rc-footer">
            <span class="rc-effort">${escapeHtml(r.effort)}</span>
          </div>
        </div>`,
          )
          .join("")}
    </div>
  </div>`;
}

export function buildCloseScene(): string {
    const state = AppStore.getState();
    const storyArc = state.storyArc;
    const projectsCount = state.isLoaded ? state.projects.length : 0;
    
    let arcItems = "";
    if (!state.isLoaded) {
        arcItems = Array.from({ length: 3 })
            .map(
                (_, i) => `
      <div class="arc-item" style="--arc-delay:${i * 80}ms">
        <span class="arc-year"><span class="skeleton-loading" style="width: 40px; height: 14px;"></span></span>
        <strong class="arc-label" style="display:block;"><span class="skeleton-loading" style="width: 100px; height: 16px; margin-top: 4px;"></span></strong>
        <p class="arc-note"><span class="skeleton-loading" style="width: 150px; height: 14px; margin-top: 4px;"></span></p>
      </div>`,
            )
            .join("");
    } else {
        arcItems = storyArc
            .map(
                (item, i) => `
      <div class="arc-item${item.highlight ? " arc-highlight" : ""}" style="--arc-delay:${i * 80}ms">
        <span class="arc-year">${escapeHtml(item.year)}</span>
        <strong class="arc-label">${escapeHtml(item.label)}</strong>
        <p class="arc-note">${escapeHtml(item.note)}</p>
      </div>`,
            )
            .join("");
    }
    const d = new Date();
    const monthYear = d.toLocaleDateString("vi-VN", {
        month: "long",
        year: "numeric",
    });
    const personalStart = state.isLoaded ? getReportPeriodText() : "Tháng ...";

    return `
  <section class="scene scene-close" id="scene-3" aria-label="Kết">
    <div class="close-inner">
      <div class="arc-block">
        <p class="eyebrow-label">Hành trình đến đây</p>
        <div class="arc-track">${arcItems}</div>
      </div>
      <div class="close-statement">
        <h2 class="close-title">
          Không top trường.<br>
          Không nền IT vững.<br>
          <span class="close-title-accent">${state.isLoaded ? `8 tháng — ${projectsCount} hệ thống production.` : `<span class="skeleton-loading" style="width: 250px; height: 28px;"></span>`}</span>
        </h2>
        <div class="close-contrast">
          <div class="close-contrast-row">
            <span class="close-contrast-before">GPA 2.03</span>
            <span class="close-contrast-after">${state.isLoaded ? `${projectsCount} hệ thống production` : "..."}</span>
          </div>
          <div class="close-contrast-row">
            <span class="close-contrast-before">14 tháng không viết code</span>
            <span class="close-contrast-after">8 tháng stack chạy độc lập</span>
          </div>
          <div class="close-contrast-row">
            <span class="close-contrast-before">0 đội ops</span>
            <span class="close-contrast-after">Docker · Tunnel · scheduler tự vận hành</span>
          </div>
        </div>
        <p class="close-body">Số liệu lấy từ Odoo, Docker, SQLite, PostgreSQL, log và database ứng dụng. Có nguồn để verify, không viết cho đẹp báo cáo.</p>
        <hr class="close-divider" aria-hidden="true" />
        <p class="close-question">Điều em muốn tiếp tục không chỉ là build thêm app, mà là được nhận trách nhiệm rõ ràng hơn để biến những hệ thống này thành nền vận hành dài hạn cho công ty.</p>
        <div class="close-meta">
          <span>${escapeHtml(personalStart)} — ${monthYear}</span>
          <span>${state.isLoaded ? `${projectsCount} hệ thống production` : "..."}</span>
          <span>Dữ liệu đã xác minh</span>
        </div>
      </div>
      ${buildRoadmap()}
    </div>
  </section>`;
}

export function buildDotNav(): string {
    const labels = ["Mở đầu", "Hệ thống", "Quy mô", "Kết"];
    return `
  <nav class="dot-nav" id="dot-nav" aria-label="Điều hướng các phần">
    ${labels
        .map(
            (label, i) => `
      <button class="dot${i === 0 ? " dot-active" : ""}" data-scene="${i}"
        aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      </button>`,
        )
        .join("")}
  </nav>`;
}
