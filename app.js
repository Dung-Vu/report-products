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
                "Cùng lúc giữ sạch 6,677 sản phẩm, 3,540 BOM — daily scan tự phát hiện lỗi.",
            projectIds: ["bonario-product-hub", "ord-price-lookup"],
            accent: "#0f766e",
        },
        {
            id: "warehouse-qc",
            label: "Kho / QC",
            eyebrow: "Warehouse",
            summary:
                "Tra tồn kho, in label nhập kho, QC batch — sẵn sàng kiểm kho nhiều người cùng lúc.",
            projectIds: ["bonario-stock-management", "in-label-pdf"],
            accent: "#0369a1",
        },
        {
            id: "bills-docs",
            label: "Chứng từ",
            eyebrow: "Back Office",
            summary:
                "Lưu trữ 983 PDF, gán OP, xuất VAT — không làm tay nữa.",
            projectIds: ["op-round-robin", "bills-server"],
            accent: "#7c3aed",
        },
        {
            id: "automation",
            label: "Automation",
            eyebrow: "Integration",
            summary:
                "9 webhook đang live, scheduler không hỏng, ZNS tự refresh hàng ngày.",
            projectIds: ["auto-workflow"],
            accent: "#c2410c",
        },
        {
            id: "infrastructure",
            label: "Hạ tầng",
            eyebrow: "Platform",
            summary:
                "Cloudflare Tunnel tập trung — 6 subdomain nội bộ ra ngoài, không mở port.",
            projectIds: ["tunnel-master", "action-local-bridge"],
            accent: "#334155",
        },
        {
            id: "production-tools",
            label: "Sản xuất",
            eyebrow: "Production",
            summary:
                "Tính vải và kích thước rèm — xử lý file Excel/PDF sản xuất, xuất layout cho xưởng.",
            projectIds: ["calculate-curtain-size"],
            accent: "#0891b2",
        },
        {
            id: "marketing-ai",
            label: "Creative AI",
            eyebrow: "Marketing",
            summary:
                "Chuẩn hóa brief AI image — không phụ thuộc kỹ năng prompt của từng người.",
            projectIds: ["visual-brief-builder"],
            accent: "#be123c",
        },
    ];

    const COUNTERS = [
        {
            value: 983,
            suffix: "",
            label: "Chứng từ PDF đã xử lý",
            sub: "Xử lý tự động + web xem chứng từ · 201MB · từ tháng 12/2025",
            large: true,
        },
        {
            value: 6305,
            suffix: "",
            label: "Lượt truy cập 6 subdomain",
            sub: "Cloudflare Analytics · Sep 2025 – May 2026",
        },
        {
            value: 50,
            suffix: "/50",
            label: "Workflow chạy tự động, 0 thất bại",
            sub: "42 lần kiểm kho + 8 lần quét hàng ngày · 07–15/05/2026",
        },
        {
            value: 9,
            suffix: "",
            label: "Webhook routes đang hoạt động",
            sub: "Shopify · Odoo · Zalo · Telegram · action.bonstu.site: 4,570 req",
        },
    ];

    const TECH_STACK = [
        {
            cat: "Backend",
            items: ["Python · Flask · FastAPI", "Node.js · Express", "Odoo XML-RPC", "APScheduler"],
        },
        { cat: "Frontend", items: ["React 18", "Vanilla JS", "Recharts"] },
        { cat: "Database", items: ["PostgreSQL", "SQLite", "Odoo ORM"] },
        {
            cat: "Infra",
            items: ["Docker · Compose", "Nginx", "Cloudflare Tunnel"],
        },
        {
            cat: "Xử lý file",
            items: ["pandas · openpyxl", "PyMuPDF · OCR"],
        },
        {
            cat: "Tích hợp",
            items: [
                "Shopify Webhook",
                "Zalo ZNS API",
                "Telegram Bot",
                "WebSocket",
            ],
        },
    ];

    const ROADMAP = [
        {
            num: "01",
            phase: "Đang triển khai",
            accent: "#0f766e",
            title: "HR Onboarding tự động — không qua IT",
            why: "Nhân viên mới chờ 2–3 ngày. Quyền bị sai do gán thủ công.",
            desc: "Hệ thống tự tạo account Odoo và gán phân quyền theo vị trí. Đã phân tích 46 user thực tế trên 3 công ty — HR thao tác, không cần IT can thiệp.",
            items: [
                "HR chọn vị trí → account tạo + phân quyền đúng trong vài giây — áp dụng cho Bonario, Ordinaire, Furny",
                "Role profile xây từ 46 user thực tế + kiểm tra chéo với phân quyền đang chạy trên hệ thống",
                "Audit log đầy đủ: ai được tạo, khi nào, quyền gì — truy vết được khi review nội bộ hoặc kiểm toán",
            ],
            effort: "Đang xây · ~3 tuần",
        },
        {
            num: "02",
            phase: "Tiếp theo",
            accent: "#2563eb",
            title: "Quan sát hệ thống — chủ động thay vì thụ động",
            why: "11 service đang chạy — biết có vấn đề khi user báo.",
            desc: "Chuyển từ vận hành thụ động sang full visibility. Alert tức thì, dashboard tổng quan, báo cáo vận hành tự động gửi cho quản lý.",
            items: [
                "Telegram alert trong 1 phút khi container down — không cần đăng nhập server để biết",
                "Health dashboard qua trình duyệt — trạng thái tất cả service trong 1 trang, không cần SSH",
                "Monthly ops digest tự động: uptime %, incident, scheduler health — quản lý nhận được không cần hỏi IT",
            ],
            effort: "3–5 ngày",
        },
        {
            num: "03",
            phase: "Không thể bỏ",
            accent: "#7c3aed",
            title: "Nền tảng vững để scale thêm người và service",
            why: "Server hỏng = mất hết. Chưa có backup, chưa có môi trường test.",
            desc: "Backup tự động, staging environment, deploy an toàn — ba thứ này không có thì mỗi lần cập nhật là một lần đánh cược với dữ liệu thật.",
            items: [
                "Backup tự động hàng ngày: PostgreSQL + SQLite + 983 PDF lên cloud — phục hồi được trong vài tiếng",
                "Staging environment để test trước khi đẩy production — tránh incident từ thay đổi code",
                "Auto-deploy từ Git: cập nhật service không cần SSH vào từng container thủ công",
            ],
            effort: "1 tuần",
        },
    ];

    const STORY_ARC = [
        {
            year: "2019–05/2024",
            label: "Kỹ sư CNTT, GPA 2.03",
            note: "5 năm học lý thuyết. GPA 2.03. Chưa một lần deploy thật.",
        },
        {
            year: "06/2024–08/2025",
            label: "Gap · chuẩn bị du học",
            note: "14 tháng dừng lại — không viết code, cân nhắc đi học tiếp.",
        },
        {
            year: "22/09/2025",
            label: "Vào Bonario · thử việc",
            note: "Anh Hà tận tình hướng dẫn hệ thống Odoo, tạo cơ hội phát triển và tiếp cận sâu AI.",
        },
        {
            year: "Tháng 10/2025",
            label: "Deploy đầu tiên",
            note: "Lần đầu code thật sự chạy trên production — ORD Price Lookup. React · Flask · PostgreSQL.",
        },
        {
            year: "Tháng 11–12/2025",
            label: "Automation stack",
            note: "Không ai giao — tự đề xuất, tự xây. Webhook, scheduler daily, Telegram bot.",
        },
        {
            year: "Tháng 1–3/2026",
            label: "Infrastructure layer",
            note: "Tự thiết kế từ đầu. Docker stack, Cloudflare Tunnel, archive chứng từ.",
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
          <p class="eyebrow-label">Dữ liệu có nguồn</p>
          <h3 class="evidence-strip-title">Tín hiệu sử dụng thực tế — từ hệ thống đang chạy.</h3>
          <p class="evidence-strip-note">Phân tách riêng khỏi số vận hành của công ty — lấy từ lịch sử truy cập, cơ sở dữ liệu và Odoo.</p>
        </div>
        <button class="evidence-strip-toggle" id="evidence-toggle" aria-expanded="false" aria-controls="evidence-body">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Xem usage signals (${companyScale.length + repoRelevantOdoo.length})
        </button>
        <div class="evidence-strip-body" id="evidence-body">
          <div class="evidence-strip-body-inner">
            ${
                companyScale.length
                    ? `<p class="evidence-subgroup-title">Từ log & database</p>
            <div class="evidence-grid">
              ${renderEvidenceCards(companyScale)}
            </div>`
                    : ""
            }
            ${
                repoRelevantOdoo.length
                    ? `<p class="evidence-subgroup-title">Từ Odoo aggregate</p>
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
            <p class="scale-note">Lấy thẳng từ log, database và file — không lẫn vào số vận hành chung của công ty.</p>
          </header>
          <div class="counter-grid">${cards}</div>
          ${buildMonthlyChart()}
          <div class="scale-pills">
            <span>104 thao tác thật ghi trong audit log — cost, BOM, pricelist</span>
            <span>Daily scan chạy mỗi ngày — tự rà soát toàn bộ sản phẩm và gửi báo cáo qua Telegram, không cần ai nhớ check</span>
            <span>7+ đợt QC nhập kho đã xử lý trong Docker session này</span>
            <span>5 file sản xuất được tính và xuất layout trong 2 ngày gần nhất</span>
            <span>Bill ghi đều: 312 · 156 · 222 · 266 chứng từ mỗi tháng</span>
            <span>action 4,570 · stock 1,359 · curtain 250 · label 98 · price 17 · workflow 11 req</span>
          </div>
          <div class="value-callout">
            <p class="value-callout-label">Nếu tính ra giờ công</p>
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
            <p class="system-hint">Bấm vào nhóm để xem chi tiết →</p>
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
        <h3 class="roadmap-title">3 bước cụ thể tiếp theo.</h3>
        <div class="roadmap-grid">
          ${ROADMAP.map(
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
              Không top trường.<br>
              Không background IT vững.<br>
              <span class="close-title-accent">Tám tháng — ${projects.length} hệ thống đang chạy.</span>
            </h2>
            <div class="close-contrast">
              <div class="close-contrast-row">
                <span class="close-contrast-before">GPA 2.03 · chưa chạm production</span>
                <span class="close-contrast-sep">→</span>
                <span class="close-contrast-after">${projects.length} hệ thống production · dữ liệu xác minh</span>
              </div>
              <div class="close-contrast-row">
                <span class="close-contrast-before">14 tháng không viết code</span>
                <span class="close-contrast-sep">→</span>
                <span class="close-contrast-after">8 tháng · stack đang chạy độc lập</span>
              </div>
              <div class="close-contrast-row">
                <span class="close-contrast-before">0 đội ops · 0 managed service</span>
                <span class="close-contrast-sep">→</span>
                <span class="close-contrast-after">983 PDF tự động · 50/50 scheduler</span>
              </div>
            </div>
            <ul class="close-points">
              <li>Mỗi con số trong báo cáo đều có nguồn — log, database hoặc Odoo. Không ước tính, không vẽ đẹp.</li>
              <li>${projects.length} repo chạy song song mà không có đội ops — Docker, Cloudflare Tunnel, scheduler tự vận hành.</li>
              <li>AI tích hợp vào quy trình để làm được nhiều hơn với ít người hơn — không phải để báo cáo đẹp hơn.</li>
            </ul>
            <p class="close-body">8 tháng tại Bonario. Số liệu lấy từ Odoo, Docker, SQLite, PostgreSQL — muốn verify thì hỏi.</p>
            <hr class="close-divider" aria-hidden="true" />
            <p class="close-question">Số liệu đã có. Stack đang chạy.
Em sẵn sàng cho giai đoạn tiếp theo — Sếp chỉ hướng là em chạy.</p>
            <div class="close-meta">
              <span>${escapeHtml(reportPeriod.personalStartLabel || "22/09/2025")} — ${monthYear}</span>
              <span>${projects.length} hệ thống production</span>
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
          <strong>${escapeHtml(item.status)}</strong> · ${escapeHtml(item.health)}
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
          ${runtimeItems ? `<div class="panel-proj-section"><p class="panel-proj-section-label">Trạng thái hoạt động</p><ul class="panel-runtime-list">${runtimeItems}</ul></div>` : ""}
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
