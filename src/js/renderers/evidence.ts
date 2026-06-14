import { escapeHtml } from "../utils";
import { CompanyScaleItem, OdooRepoItem, EvidencePeriod } from "../types";
import { AppStore } from "../store";

const getCompanyScale = (): CompanyScaleItem[] =>
    Array.isArray(AppStore.getState().evidence.companyScale)
        ? AppStore.getState().evidence.companyScale
        : [];

const getRepoRelevantOdoo = (): OdooRepoItem[] =>
    Array.isArray(AppStore.getState().evidence.repoRelevantOdoo)
        ? AppStore.getState().evidence.repoRelevantOdoo
        : [];

const getReportPeriod = (): Partial<EvidencePeriod> =>
    AppStore.getState().evidence.period || {};

export function buildEvidenceScale(): string {
    const state = AppStore.getState();
    if (!state.isLoaded) {
        const skeletonCards = Array.from({ length: 4 }).map(() => `
          <article class="evidence-card">
            <div class="evidence-card-header">
              <span class="evidence-card-label"><span class="skeleton-loading" style="width: 80px; height: 12px; display: inline-block;"></span></span>
            </div>
            <strong class="evidence-card-value"><span class="skeleton-loading" style="width: 120px; height: 24px; margin-top: 4px; display: inline-block;"></span></strong>
            <p class="evidence-card-desc">
              <span class="skeleton-loading" style="width: 100%; height: 14px; margin-top: 8px; display: inline-block;"></span>
            </p>
            <div class="evidence-card-footer">
              <span class="skeleton-loading" style="width: 60px; height: 10px; display: inline-block;"></span>
            </div>
          </article>`);
        return `
  <section class="evidence-strip is-collapsed" id="evidence-strip" aria-label="Bằng chứng đã xác minh">
    <div class="evidence-strip-header">
      <p class="eyebrow-label">CÁC SỐ LIỆU ĐÁNG CHÚ Ý</p>
      <h3 class="evidence-strip-title">Những tín hiệu cho thấy hệ thống đang được dùng thật.</h3>
      <p class="evidence-strip-note">Các số này lấy từ log truy cập, database ứng dụng và dữ liệu Odoo. Đây là bằng chứng vận hành, tách riêng khỏi phần ước tính ROI.</p>
    </div>
    <button class="evidence-strip-toggle" id="evidence-toggle" aria-expanded="false" aria-controls="evidence-body">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Xem số liệu xác minh (...)
    </button>
    <div class="evidence-strip-body" id="evidence-body">
      <div class="evidence-strip-body-inner">
        <div class="evidence-scroll-container">
          <div class="evidence-scroll-column col-1">
            <div class="evidence-scroll-inner">
              ${skeletonCards.slice(0, 2).join("")}
            </div>
          </div>
          <div class="evidence-scroll-column col-2">
            <div class="evidence-scroll-inner">
              ${skeletonCards.slice(2, 3).join("")}
            </div>
          </div>
          <div class="evidence-scroll-column col-3">
            <div class="evidence-scroll-inner">
              ${skeletonCards.slice(3).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
    }
    const companyScale = getCompanyScale();
    const repoRelevantOdoo = getRepoRelevantOdoo();

    if (!companyScale.length && !repoRelevantOdoo.length) return "";
    const allItems: (CompanyScaleItem | OdooRepoItem)[] = [
        ...companyScale,
        ...repoRelevantOdoo,
    ];
    const col1: (CompanyScaleItem | OdooRepoItem)[] = [];
    const col2: (CompanyScaleItem | OdooRepoItem)[] = [];
    const col3: (CompanyScaleItem | OdooRepoItem)[] = [];
    allItems.forEach((item, index) => {
        if (index % 3 === 0) col1.push(item);
        else if (index % 3 === 1) col2.push(item);
        else col3.push(item);
    });

    const renderCard = (item: CompanyScaleItem | OdooRepoItem): string => `
          <article class="evidence-card" data-id="${item.id}">
            <div class="evidence-card-header">
              <span class="evidence-card-label">${escapeHtml(item.label)}</span>
            </div>
            <strong class="evidence-card-value">${escapeHtml(item.display)}</strong>
            <p class="evidence-card-desc">${escapeHtml(item.description)}</p>
            <div class="evidence-card-footer">
              <svg class="evidence-card-footer-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="10" height="10" rx="1.5"></rect>
                <path d="M4 5h6M4 8h4"></path>
              </svg>
              <small class="evidence-card-source">${escapeHtml(item.source)}</small>
            </div>
          </article>`;

    const renderColumn = (
        columnItems: (CompanyScaleItem | OdooRepoItem)[],
    ): string => {
        if (!columnItems.length) return "";
        return columnItems.map(renderCard).join("");
    };

    return `
  <section class="evidence-strip is-collapsed" id="evidence-strip" aria-label="Bằng chứng đã xác minh">
    <div class="evidence-strip-header">
      <p class="eyebrow-label">CÁC SỐ LIỆU ĐÁNG CHÚ Ý</p>
      <h3 class="evidence-strip-title">Những tín hiệu cho thấy hệ thống đang được dùng thật.</h3>
      <p class="evidence-strip-note">Các số này lấy từ log truy cập, database ứng dụng và dữ liệu Odoo. Đây là bằng chứng vận hành, tách riêng khỏi phần ước tính ROI.</p>
    </div>
    <button class="evidence-strip-toggle" id="evidence-toggle" aria-expanded="false" aria-controls="evidence-body">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Xem số liệu xác minh (${companyScale.length + repoRelevantOdoo.length})
    </button>
    <div class="evidence-strip-body" id="evidence-body">
      <div class="evidence-strip-body-inner">
        <div class="evidence-scroll-container">
          <div class="evidence-scroll-column col-1">
            <div class="evidence-scroll-inner">
              ${renderColumn(col1)}
            </div>
          </div>
          <div class="evidence-scroll-column col-2">
            <div class="evidence-scroll-inner">
              ${renderColumn(col2)}
            </div>
          </div>
          <div class="evidence-scroll-column col-3">
            <div class="evidence-scroll-inner">
              ${renderColumn(col3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function buildMonthlyChart(): string {
    const state = AppStore.getState();
    const monthly = (state.evidence.monthly || {}).customerInvoices;
    if (!state.isLoaded || !monthly || !monthly.length) {
        return `
  <div class="monthly-chart">
    <p class="monthly-chart-label">Invoice trend · Sep 2025 – May 2026 <span>· 997 tổng · Odoo 2026-05-15</span></p>
    <div class="skeleton-loading" style="width: 100%; height: 180px; border-radius: var(--radius);"></div>
  </div>`;
    }
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
            const lbl = m[0].replace(" 2025", " '25").replace(" 2026", " '26");
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

export function getReportPeriodText(): string {
    const reportPeriod = getReportPeriod();
    return reportPeriod.personalStartLabel || "22/09/2025";
}
