(function () {
    "use strict";

    const projects = window.impactProjects || [];
    const impactEvidence = window.impactEvidence || {};
    const companyScale = Array.isArray(impactEvidence.companyScale)
        ? impactEvidence.companyScale
        : [];
    const repoRelevantOdoo = Array.isArray(impactEvidence.repoRelevantOdoo)
        ? impactEvidence.repoRelevantOdoo
        : [];
    const adoptionEvidence = impactEvidence.adoption || {};
    const runtimeEvidence = Array.isArray(impactEvidence.runtime)
        ? impactEvidence.runtime
        : [];
    const reportPeriod = impactEvidence.period || {};

    const PROJECT_RUNTIME_ALIASES = {
        "bonario-product-hub": ["action-product"],
        "bonario-stock-management": ["bonario-stock"],
        "ord-price-lookup": ["ord-price-lookup"],
        "in-label-pdf": ["in-label-pdf"],
        "auto-workflow": ["auto-workflow"],
        "op-round-robin": ["op-round-robin"],
        "bills-server": ["bills-server"],
        "calculate-curtain-size": ["curtain-calculator"],
        "visual-brief-builder": ["visual-brief-builder"],
        "tunnel-master": ["tunnel-master"],
        "action-local-bridge": ["action-local-bridge"],
    };

    function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function animateCounter(el, target, suffix, duration) {
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(easeOut(progress) * target);
            el.textContent =
                new Intl.NumberFormat("vi-VN").format(current) + (suffix || "");
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const SYSTEM_GROUPS = [
        {
            id: "product-data",
            label: "Dữ liệu sản phẩm",
            eyebrow: "Product Ops",
            summary:
                "Quản trị product, BOM, cost, giá và daily scan qua hub tập trung.",
            projectIds: ["bonario-product-hub", "ord-price-lookup"],
            accent: "#0f766e",
        },
        {
            id: "warehouse-qc",
            label: "Kho / QC",
            eyebrow: "Warehouse",
            summary:
                "Tra tồn kho, in label, QC batch nhập kho và nền tảng kiểm kho.",
            projectIds: ["bonario-stock-management", "in-label-pdf"],
            accent: "#0369a1",
        },
        {
            id: "bills-docs",
            label: "Chứng từ",
            eyebrow: "Back Office",
            summary:
                "Bill archive 983 PDF, round-robin OP, VAT và web file server nội bộ.",
            projectIds: ["op-round-robin", "bills-server"],
            accent: "#7c3aed",
        },
        {
            id: "automation",
            label: "Automation",
            eyebrow: "Integration",
            summary:
                "Webhook, scheduler daily, Zalo ZNS auto-refresh, Telegram RFID, 9 routes live.",
            projectIds: ["auto-workflow"],
            accent: "#c2410c",
        },
        {
            id: "infrastructure",
            label: "Hạ tầng",
            eyebrow: "Platform",
            summary:
                "Cloudflare tunnel, Docker network, TCP bridge — publish app nội bộ không cần mở port.",
            projectIds: ["tunnel-master", "action-local-bridge"],
            accent: "#334155",
        },
        {
            id: "production-tools",
            label: "Sản xuất",
            eyebrow: "Production",
            summary:
                "Tính kích thước rèm, xử lý Excel/PDF sản xuất và export layout BON.",
            projectIds: ["calculate-curtain-size"],
            accent: "#0891b2",
        },
        {
            id: "marketing-ai",
            label: "Creative AI",
            eyebrow: "Marketing",
            summary:
                "Brief builder, model selection, ratio logic, reference và refinement preset cho hình lifestyle.",
            projectIds: ["visual-brief-builder"],
            accent: "#be123c",
        },
    ];

    const COUNTERS = [
        {
            value: 983,
            suffix: "",
            label: "Chứng từ PDF tự động hóa",
            sub: "op-round-robin xử lý · bills-server serve · 201MB",
            large: true,
        },
        {
            value: 6305,
            suffix: "",
            label: "Lượt truy cập domain",
            sub: "6 subdomain Bonario · Cloudflare Analytics Sep~May",
        },
        {
            value: 50,
            suffix: "/50",
            label: "Workflow tự động (0 thất bại)",
            sub: "42 Stock Monitor + 8 Daily Scan · workflow_history.json · 2026-05-07~05-15",
        },
        {
            value: 9,
            suffix: "",
            label: "Webhook routes đang live",
            sub: "Shopify · Odoo · Zalo · Telegram · auto-workflow · action.bonstu.site: 4,570 req",
        },
    ];

    const TECH_STACK = [
        {
            cat: "Backend",
            items: ["Python · Flask", "Node.js · Express", "Odoo XML-RPC"],
        },
        { cat: "Frontend", items: ["React 18", "Vanilla JS", "Recharts"] },
        { cat: "Database", items: ["PostgreSQL", "SQLite", "Odoo ORM"] },
        {
            cat: "Infra",
            items: ["Docker · Compose", "Nginx", "Cloudflare Tunnel"],
        },
        {
            cat: "Tích hợp",
            items: [
                "Shopify Webhook",
                "Zalo ZNS API",
                "Telegram Bot",
                "PDF · OCR",
            ],
        },
    ];

    const ROADMAP = [
        {
            phase: "Ưu tiên cao",
            accent: "#0f766e",
            title: "Monitoring tập trung",
            desc: "11 service chạy riêng lẻ — chưa có lớp quan sát thống nhất. Một service lỗi có thể không phát hiện kịp.",
            items: [
                "Prometheus + Grafana cho toàn Docker stack",
                "Telegram alert tự động khi service down",
                "Log aggregation tập trung",
            ],
        },
        {
            phase: "Trung hạn",
            accent: "#2563eb",
            title: "AI Agent tự động hóa sâu",
            desc: "Hệ thống hiện collect data tốt — bước tiếp là để AI xử lý thay vì chỉ báo cáo.",
            items: [
                "AI tự classify & fix ~800 lỗi sản phẩm/ngày từ Daily Scan",
                "AI draft báo cáo tồn kho cuối tháng tự động",
                "NLP query kho: ‘còn bao nhiêu SKU X?’",
            ],
        },
        {
            phase: "Team scale",
            accent: "#7c3aed",
            title: "Tài liệu hóa & Handoff",
            desc: "Hiện tại một người vận hành toàn bộ stack. Để mở rộng hoặc chuyển giao an toàn cần layer tài liệu.",
            items: [
                "API docs + runbook cho từng service",
                "Incident playbook chuẩn hóa",
                "Onboarding guide cho developer mới",
            ],
        },
    ];

    const STORY_ARC = [
        {
            year: "2019–05/2024",
            label: "Kỹ sư CNTT, GPA 2.03",
            note: "FE căn bản. IT thực tế chưa bao giờ chạm.",
        },
        {
            year: "06/2024–08/2025",
            label: "Gap · chuẩn bị du học",
            note: "14 tháng. Không viết một dòng code production.",
        },
        {
            year: "22/09/2025",
            label: "Vào Bonario · thử việc",
            note: "Học Odoo, đọc codebase, hiểu quy trình kho.",
        },
        {
            year: "Tháng 10/2025",
            label: "Deploy đầu tiên",
            note: "ORD Price Lookup live — React + Flask + PostgreSQL.",
        },
        {
            year: "Tháng 11–12/2025",
            label: "Automation stack",
            note: "9 webhook routes, scheduler daily, Telegram bot.",
        },
        {
            year: "Tháng 1–3/2026",
            label: "Infrastructure layer",
            note: "Docker Compose, Cloudflare Tunnel, bills archive.",
        },
        {
            year: "Tháng 5/2026",
            label: "11 hệ thống production",
            note: "Odoo · Docker · PostgreSQL · Verified.",
            highlight: true,
        },
    ];

    function findRuntimeEntries(projectId) {
        const aliases = PROJECT_RUNTIME_ALIASES[projectId] || [];
        return runtimeEvidence.filter((entry) =>
            aliases.includes(entry.service),
        );
    }

    function buildEvidenceScale() {
        if (!companyScale.length && !repoRelevantOdoo.length) return "";
        const renderEvidenceCards = (items) =>
            items
                .map(
                    (item) => `
              <article class="evidence-card">
                <span class="evidence-card-label">${escapeHtml(item.label)}</span>
                <strong class="evidence-card-value">${escapeHtml(item.display)}</strong>
                <p class="evidence-card-desc">${escapeHtml(item.description)}</p>
                <small class="evidence-card-source">${escapeHtml(item.source)}</small>
              </article>`,
                )
                .join("");
        return `
      <section class="evidence-strip is-collapsed" id="evidence-strip" aria-label="Bằng chứng đã xác minh">
        <div class="evidence-strip-header">
          <p class="eyebrow-label">Usage signals</p>
          <h3 class="evidence-strip-title">3 tín hiệu sử dụng không trùng hero counters.</h3>
          <p class="evidence-strip-note">Nguồn lấy từ log, database, Cloudflare và Odoo aggregate có liên quan trực tiếp tới repo/tool đang vận hành.</p>
        </div>
        <button class="evidence-strip-toggle" id="evidence-toggle" aria-expanded="true" aria-controls="evidence-body">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Xem usage signals (${companyScale.length + repoRelevantOdoo.length})
        </button>
        <div class="evidence-strip-body" id="evidence-body">
          <div class="evidence-strip-body-inner">
            ${
                companyScale.length
                    ? `<p class="evidence-subgroup-title">Usage từ app/log</p>
            <div class="evidence-grid">
              ${renderEvidenceCards(companyScale)}
            </div>`
                    : ""
            }
            ${
                repoRelevantOdoo.length
                    ? `<p class="evidence-subgroup-title">Odoo aggregate gắn với repo</p>
            <div class="evidence-grid evidence-grid-secondary">
              ${renderEvidenceCards(repoRelevantOdoo)}
            </div>`
                    : ""
            }
          </div>
        </div>
      </section>`;
    }

    function buildHookScene() {
        return `
      <section class="scene scene-hook" id="scene-0" aria-label="Mở đầu">
        <div class="hook-inner">
          <div class="hook-text">
            <p class="hook-line1">Hai năm không chạm code.</p>
            <p class="hook-line2">Tám tháng tại Bonario — 11 hệ thống đang chạy.</p>
          </div>
          <p class="hook-sub">Từ ${escapeHtml(reportPeriod.personalStartLabel || "22/09/2025")} &nbsp;·&nbsp; Bonario</p>
          <div class="hook-stats">
            ${COUNTERS.map(
                (c) => `
            <div class="hook-stat">
              <strong class="hook-stat-num" data-hook-target="${c.value}" data-suffix="${escapeHtml(c.suffix || "")}">0</strong>
              <span class="hook-stat-label">${escapeHtml(c.label)}</span>
            </div>`,
            ).join("")}
          </div>
          <button class="scroll-cue" aria-label="Cuộn xuống" data-scroll-to="1">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M11 4v14M5 12l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </section>`;
    }

    function buildMonthlyChart() {
        const monthly = (impactEvidence.monthly || {}).customerInvoices;
        if (!monthly || !monthly.length) return "";
        const W = 900,
            TOP_PAD = 30,
            BAR_H = 140,
            LABEL_H = 28;
        const H = TOP_PAD + BAR_H + LABEL_H;
        const BAR_W = 64,
            STEP = 100,
            OFFSET_X = 18;
        const maxCount = Math.max(...monthly.map((m) => m[1]));
        const bars = monthly
            .map((m, i) => {
                const bh = Math.round((m[1] / maxCount) * BAR_H);
                const x = OFFSET_X + i * STEP;
                const y = TOP_PAD + (BAR_H - bh);
                const isPeak = m[1] === maxCount;
                const isPartial = i === monthly.length - 1;
                const lbl = m[0]
                    .replace(" 2025", " '25")
                    .replace(" 2026", " '26");
                const vnd = (m[2] / 1e9).toFixed(1);
                return `
    <g class="chart-bar-group" style="--bar-delay:${i * 55}ms">
      <rect class="chart-bar${isPeak ? " chart-bar--peak" : ""}${isPartial ? " chart-bar--partial" : ""}"
        x="${x}" y="${y}" width="${BAR_W}" height="${bh}" rx="3" />
      <text class="chart-count${isPeak ? " chart-count--peak" : ""}"
        x="${x + BAR_W / 2}" y="${y - 6}" text-anchor="middle">${m[1]}</text>
      <text class="chart-month"
        x="${x + BAR_W / 2}" y="${TOP_PAD + BAR_H + LABEL_H - 4}" text-anchor="middle">${lbl}</text>
      <title>${m[0]}: ${m[1]} hóa đơn — ${vnd}B VND</title>
    </g>`;
            })
            .join("");
        return `
  <div class="monthly-chart">
    <p class="monthly-chart-label">Invoice trend · Sep 2025 – May 2026 <span>· 997 tổng · Odoo 2026-05-15</span></p>
    <svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      ${bars}
    </svg>
  </div>`;
    }

    function buildCounterScene() {
        const cards = COUNTERS.map(
            (c) => `
      <article class="counter-card${c.large ? " counter-large" : ""}">
        <span class="counter-eyebrow">${escapeHtml(c.label)}</span>
        <strong class="counter-num" data-target="${c.value}" data-suffix="${escapeHtml(c.suffix || "")}">0</strong>
        <small class="counter-source">${escapeHtml(c.sub)}</small>
      </article>`,
        ).join("");
        return `
      <section class="scene scene-scale" id="scene-1" aria-label="Quy mô vận hành">
        <div class="scale-inner">
          <header class="scale-header">
            <p class="eyebrow-label">Output từ 11 repo</p>
            <h2 class="scale-title">Không số Odoo công ty.<br>Đây là output của hệ thống.</h2>
            <p class="scale-note">Số liệu trực tiếp từ log, database và file — không phải bối cảnh vận hành chung.</p>
          </header>
          <div class="counter-grid">${cards}</div>
          ${buildMonthlyChart()}
          <div class="scale-pills">
            <span>98 lần cập nhật giá, BOM và pricelist</span>
            <span>Scanner tự động phát hiện ~800 vấn đề sản phẩm mỗi ngày</span>
            <span>7+ đợt QC hàng nhập kho được xử lý và lưu</span>
            <span>5 file sản xuất được tính toán và xuất layout</span>
            <span>Lưu chứng từ đều đặn: 312 · 156 · 222 · 266 file/tháng</span>
            <span>6 subdomain Bonario qua Cloudflare Tunnel · action 4,570 · stock 1,359 · label 98 · curtain 250 · price 17 · workflow 11</span>
          </div>
          <div class="value-callout">
            <p class="value-callout-label">Quy đổi sang giá trị thực</p>
            <div class="value-callout-items">
              <span><strong>~82h</strong> lưu bill thủ công/năm → automation xử lý toàn bộ</span>
              <span><strong>~2.7h</strong> kiểm tra thủ công/ngày</span>
              <span><strong>100%</strong> scheduler không thất bại — 50/50 lần chạy</span>
              <span><strong>6,305</strong> request qua 6 subdomain — Cloudflare Analytics Sep~May</span>
            </div>
          </div>
          ${buildEvidenceScale()}
        </div>
      </section>`;
    }

    function buildTechBar() {
        return `
      <div class="tech-bar">
        <span class="tech-bar-label">Stack kỹ thuật · ${TECH_STACK.reduce((a, c) => a + c.items.length, 0)} công nghệ</span>
        <div class="tech-cats">
          ${TECH_STACK.map(
              (cat) => `
            <div class="tech-row">
              <span class="tech-cat-label">${escapeHtml(cat.cat)}</span>
              <div class="tech-tags">${cat.items.map((item) => `<span class="tech-tag">${escapeHtml(item)}</span>`).join("")}</div>
            </div>`,
          ).join("")}
        </div>
      </div>`;
    }

    function buildNodeMap() {
        return SYSTEM_GROUPS.map(
            (g) => `
      <button class="node-btn" data-group="${escapeHtml(g.id)}"
        style="--node-accent:${escapeHtml(g.accent)}"
        aria-label="Xem nhóm ${escapeHtml(g.label)}" role="listitem">
        <span class="node-eyebrow">${escapeHtml(g.eyebrow)}</span>
        <strong class="node-label">${escapeHtml(g.label)}</strong>
        <p class="node-summary">${escapeHtml(g.summary)}</p>
        <small class="node-count">${g.projectIds.length} hệ thống</small>
      </button>`,
        ).join("");
    }

    function buildSystemScene() {
        return `
      <section class="scene scene-system" id="scene-2" aria-label="Bản đồ hệ thống">
        <div class="system-inner">
          <header class="system-header">
            <p class="eyebrow-label">Lớp vận hành đang hình thành</p>
            <h2 class="system-title">11 hệ thống, 7 nhóm nghiệp vụ.</h2>
            <p class="system-hint">Chọn một nhóm để xem chi tiết →</p>
          </header>
          <div class="node-map" role="list">${buildNodeMap()}</div>
          ${buildTechBar()}
        </div>
        <aside class="side-panel" id="side-panel" aria-label="Chi tiết hệ thống" aria-hidden="true">
          <button class="panel-close" aria-label="Đóng panel" data-close-panel>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="panel-content" id="panel-content"></div>
        </aside>
      </section>`;
    }

    function buildRoadmap() {
        return `
      <div class="roadmap-block">
        <span class="roadmap-eyebrow">Kế hoạch tiếp theo</span>
        <h3 class="roadmap-title">3 hướng phát triển.</h3>
        <div class="roadmap-grid">
          ${ROADMAP.map(
              (r) => `
            <div class="roadmap-card" style="--rc-accent:${escapeHtml(r.accent)}">
              <span class="roadmap-card-phase">${escapeHtml(r.phase)}</span>
              <h4 class="roadmap-card-title">${escapeHtml(r.title)}</h4>
              <p class="roadmap-card-desc">${escapeHtml(r.desc)}</p>
              <ul class="roadmap-card-items">
                ${r.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>`,
          ).join("")}
        </div>
      </div>`;
    }

    function buildCloseScene() {
        const arcItems = STORY_ARC.map(
            (item, i) => `
      <div class="arc-item${item.highlight ? " arc-highlight" : ""}" style="--arc-delay:${i * 80}ms">
        <span class="arc-year">${escapeHtml(item.year)}</span>
        <strong class="arc-label">${escapeHtml(item.label)}</strong>
        <p class="arc-note">${escapeHtml(item.note)}</p>
      </div>`,
        ).join("");
        const d = new Date();
        const monthYear = d.toLocaleDateString("vi-VN", {
            month: "long",
            year: "numeric",
        });
        return `
      <section class="scene scene-close" id="scene-3" aria-label="Kết">
        <div class="close-inner">
          <div class="arc-block">
            <p class="eyebrow-label">Hành trình đến đây</p>
            <div class="arc-track">${arcItems}</div>
          </div>
          <div class="close-statement">
            <h2 class="close-title">
              Không top trường. Không background IT vững.<br>
              Tám tháng tập trung vào bài toán thật<br>
              — kết quả là hệ thống thật.
            </h2>
            <ul class="close-points">
              <li>FE căn bản + hơn một năm gap → tự học lại từ đầu → ${projects.length} hệ thống đang chạy production.</li>
              <li>Biết tách số thật khỏi ước lượng — không vẽ đẹp, chỉ nói được phần đã làm được.</li>
              <li>Kết hợp AI không phải để claim nhiều hơn, mà để làm được nhiều hơn với ít người hơn.</li>
            </ul>
            <p class="close-body">
              GPA 2.03. Hơn một năm không viết code production trước khi vào Bonario.
              ${projects.length} hệ thống đang chạy từ ${escapeHtml(reportPeriod.personalStartLabel || "22/09/2025")}.
              Số liệu từ Odoo, Docker, SQLite, PostgreSQL — có thể kiểm tra.
            </p>
            <p class="close-question">Hiện tại chỉ một người vận hành, sửa và mở rộng toàn bộ stack. Không team, không tài liệu handoff. Roadmap phía trên là bước tiếp theo — nếu được tiếp tục. Sếp muốn xây tiếp không?</p>
            <div class="close-meta">
              <span>${escapeHtml(reportPeriod.personalStartLabel || "22/09/2025")} — ${monthYear}</span>
              <span>11 hệ thống production</span>
              <span>Dữ liệu đã xác minh</span>
            </div>
          </div>
          ${buildRoadmap()}
        </div>
      </section>`;
    }

    function buildDotNav() {
        const labels = ["Mở đầu", "Quy mô", "Hệ thống", "Kết"];
        return `
      <nav class="dot-nav" id="dot-nav" aria-label="Điều hướng các phần" aria-hidden="true">
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

    function renderPanelContent(groupId) {
        const group = SYSTEM_GROUPS.find((g) => g.id === groupId);
        if (!group) return "";
        const groupProjects = group.projectIds
            .map((id) => projects.find((p) => p.id === id))
            .filter(Boolean);
        const projectBlocks = groupProjects
            .map((proj) => {
                const metrics = (proj.verifiedMetrics || [])
                    .map((m) => `<li>${escapeHtml(m)}</li>`)
                    .join("");
                const proofItems = (adoptionEvidence[proj.id] || [])
                    .map(
                        (item) => `
        <li>
          <strong>${escapeHtml(item.value)}</strong> ${escapeHtml(item.label)}
          ${item.confidence === "verified" ? `<span class="panel-badge-verified">✓ Verified</span>` : ""}
          <span class="panel-proof-source">${escapeHtml(item.source)}</span>
        </li>`,
                    )
                    .join("");
                const runtimeItems = findRuntimeEntries(proj.id)
                    .map(
                        (item) => `
        <li>
          <strong>${escapeHtml(item.status)}</strong> · ${escapeHtml(item.health)} · port ${escapeHtml(item.port)}
        </li>`,
                    )
                    .join("");
                return `
        <article class="panel-project">
          <p class="panel-proj-eyebrow">${escapeHtml(proj.chapter)}</p>
          <h3 class="panel-proj-name">${escapeHtml(proj.name)}</h3>
          <p class="panel-proj-hook">${escapeHtml(proj.hook)}</p>
          ${proj.problem ? `<div class="panel-proj-section"><p class="panel-proj-section-label">Vấn đề</p><p class="panel-proj-problem">${escapeHtml(proj.problem)}</p></div>` : ""}
          <div class="panel-proj-section"><p class="panel-proj-section-label">Đã xây</p><p class="panel-proj-built">${escapeHtml(proj.built)}</p></div>
          ${metrics ? `<ul class="panel-metrics">${metrics}</ul>` : ""}
          ${proofItems ? `<div class="panel-proj-section"><p class="panel-proj-section-label">Nguồn xác minh</p><ul class="panel-proof-list">${proofItems}</ul></div>` : ""}
          ${runtimeItems ? `<div class="panel-proj-section"><p class="panel-proj-section-label">Runtime</p><ul class="panel-runtime-list">${runtimeItems}</ul></div>` : ""}
        </article>`;
            })
            .join("");
        return `
      <header class="panel-header" style="--panel-accent:${escapeHtml(group.accent)}">
        <p class="panel-eyebrow">${escapeHtml(group.eyebrow)}</p>
        <h2 class="panel-group-title">${escapeHtml(group.label)}</h2>
        <p class="panel-group-summary">${escapeHtml(group.summary)}</p>
      </header>
      <div class="panel-projects">${projectBlocks}</div>`;
    }

    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        document.querySelectorAll("[data-target]").forEach((el) => {
            animateCounter(
                el,
                parseInt(el.dataset.target, 10),
                el.dataset.suffix || "",
                1800,
            );
        });
    }

    function startHookCounters() {
        document.querySelectorAll("[data-hook-target]").forEach((el) => {
            animateCounter(
                el,
                parseInt(el.dataset.hookTarget, 10),
                el.dataset.suffix || "",
                1600,
            );
        });
    }

    function updateDots(sceneIndex) {
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("dot-active", i === sceneIndex);
        });
    }

    function getCurrentSceneIndex() {
        // Return the scene index whose dot is currently active
        const active = document.querySelector(".dot.dot-active");
        if (active) return parseInt(active.dataset.scene, 10) || 0;
        return 0;
    }

    function scrollToScene(index) {
        const el = document.getElementById("scene-" + index);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    function openPanel(groupId) {
        const panel = document.getElementById("side-panel");
        const content = document.getElementById("panel-content");
        if (!panel || !content) return;
        content.innerHTML = renderPanelContent(groupId);
        panel.classList.add("panel-open");
        document
            .getElementById("panel-backdrop")
            ?.classList.add("backdrop-open");
        panel.removeAttribute("aria-hidden");
        document.querySelectorAll(".node-btn").forEach((btn) => {
            btn.classList.toggle("node-active", btn.dataset.group === groupId);
        });
        panel.querySelector("[data-close-panel]")?.focus();
    }

    function closePanel() {
        const panel = document.getElementById("side-panel");
        if (!panel) return;
        panel.classList.remove("panel-open");
        document
            .getElementById("panel-backdrop")
            ?.classList.remove("backdrop-open");
        panel.setAttribute("aria-hidden", "true");
        document
            .querySelectorAll(".node-btn")
            .forEach((btn) => btn.classList.remove("node-active"));
    }

    function setupObservers() {
        const dotNav = document.getElementById("dot-nav");
        const hook = document.getElementById("scene-0");
        if (hook && dotNav) {
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            dotNav.setAttribute("aria-hidden", "true");
                            dotNav.classList.remove("dot-nav-visible");
                        } else {
                            dotNav.removeAttribute("aria-hidden");
                            dotNav.classList.add("dot-nav-visible");
                        }
                    });
                },
                { threshold: 0.4 },
            ).observe(hook);
        }
        const scale = document.getElementById("scene-1");
        if (scale) {
            new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) startCounters();
                },
                { threshold: 0.3 },
            ).observe(scale);
        }
        document.querySelectorAll(".scene").forEach((scene) => {
            new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        const idx = parseInt(
                            scene.id.replace("scene-", ""),
                            10,
                        );
                        if (!isNaN(idx)) updateDots(idx);
                    }
                },
                { threshold: 0.5 },
            ).observe(scene);
        });
        // Entrance animations: add scene-in when scene enters viewport
        document.querySelectorAll(".scene").forEach((scene) => {
            new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting)
                        scene.classList.add("scene-in");
                },
                { threshold: 0.12 },
            ).observe(scene);
        });
    }

    function bindEvents() {
        document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
            btn.addEventListener("click", () =>
                scrollToScene(parseInt(btn.dataset.scrollTo, 10)),
            );
        });
        document.querySelectorAll(".dot[data-scene]").forEach((dot) => {
            dot.addEventListener("click", () =>
                scrollToScene(parseInt(dot.dataset.scene, 10)),
            );
        });
        document.querySelectorAll(".node-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const panel = document.getElementById("side-panel");
                if (
                    panel?.classList.contains("panel-open") &&
                    btn.classList.contains("node-active")
                ) {
                    closePanel();
                } else {
                    openPanel(btn.dataset.group);
                }
            });
        });
        document.querySelectorAll("[data-close-panel]").forEach((btn) => {
            btn.addEventListener("click", closePanel);
        });
        document
            .getElementById("panel-backdrop")
            ?.addEventListener("click", closePanel);

        // ── Evidence strip toggle (mobile collapse) ──────────────────────────
        const evidenceToggle = document.getElementById("evidence-toggle");
        const evidenceStrip = document.getElementById("evidence-strip");
        if (evidenceToggle && evidenceStrip) {
            // Expanded by default on desktop; collapsed on mobile
            if (window.innerWidth > 480) {
                evidenceStrip.classList.remove("is-collapsed");
                evidenceToggle.setAttribute("aria-expanded", "true");
            }
            evidenceToggle.addEventListener("click", () => {
                const collapsed =
                    evidenceStrip.classList.toggle("is-collapsed");
                evidenceToggle.setAttribute(
                    "aria-expanded",
                    String(!collapsed),
                );
            });
        }

        // ── Keyboard: Escape closes panel; Arrow keys scroll scenes ─────────
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closePanel();
                return;
            }
            const panel = document.getElementById("side-panel");
            if (panel?.classList.contains("panel-open")) return; // don't hijack while panel open
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                const cur = getCurrentSceneIndex();
                if (cur < 3) scrollToScene(cur + 1);
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                const cur = getCurrentSceneIndex();
                if (cur > 0) scrollToScene(cur - 1);
            }
        });

        // ── Touch: swipe left on panel to close ──────────────────────────────
        const panel = document.getElementById("side-panel");
        if (panel) {
            let touchStartX = 0;
            let touchStartY = 0;
            panel.addEventListener(
                "touchstart",
                (e) => {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                },
                { passive: true },
            );
            panel.addEventListener(
                "touchend",
                (e) => {
                    const dx = e.changedTouches[0].clientX - touchStartX;
                    const dy = Math.abs(
                        e.changedTouches[0].clientY - touchStartY,
                    );
                    // swipe right (positive dx) at least 60px, horizontal dominant
                    if (dx > 60 && dy < 80) closePanel();
                },
                { passive: true },
            );
        }
    }

    function init() {
        const app = document.getElementById("app");
        if (!app) return;
        app.innerHTML = `
      ${buildDotNav()}
      <div id="panel-backdrop" class="panel-backdrop"></div>
      <main id="story-scroll" aria-label="Báo cáo tác động Bonario">
        ${buildHookScene()}
        ${buildCounterScene()}
        ${buildSystemScene()}
        ${buildCloseScene()}
      </main>`;
        setupObservers();
        bindEvents();
        // Hook scene animates immediately on load
        requestAnimationFrame(() => {
            document.getElementById("scene-0")?.classList.add("scene-in");
            startHookCounters();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
