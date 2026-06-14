import { parseRoute } from "./router";
import { setupObservers } from "./observer";
import {
    buildDotNav,
    buildHookScene,
    buildSystemScene,
    buildCounterScene,
    buildCloseScene,
    buildProjectRoute,
} from "./renderer";
import { Route } from "./types";
import { AppStore } from "./store";
import { escapeHtml } from "./utils";

let sparklesCleanup: (() => void) | null = null;
let sparklesLoading = false;
let pathsCleanup: (() => void) | null = null;
let pathsLoading = false;
let globalEventsBound = false;
let isInitialLoad = true;

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timer: number | null = null;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay) as any;
    };
}

function handleResize(): void {
    const evidenceToggle = document.getElementById("evidence-toggle") as HTMLButtonElement | null;
    const evidenceStrip = document.getElementById("evidence-strip") as HTMLElement | null;
    if (evidenceToggle && evidenceStrip) {
        if (window.innerWidth > 480) {
            evidenceStrip.classList.remove("is-collapsed");
            evidenceToggle.setAttribute("aria-expanded", "true");
        } else {
            evidenceStrip.classList.add("is-collapsed");
            evidenceToggle.setAttribute("aria-expanded", "false");
        }
    }
}

function getCurrentSceneIndex(): number {
    const active = document.querySelector(
        ".dot.dot-active",
    ) as HTMLElement | null;
    if (active && active.dataset.scene) {
        return parseInt(active.dataset.scene, 10) || 0;
    }
    return 0;
}

function scrollToScene(index: number): void {
    const el = document.getElementById("scene-" + index);
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

function bindEvents(): void {
    document.querySelectorAll("[data-scroll-to]").forEach((el) => {
        const btn = el as HTMLElement;
        btn.addEventListener("click", () => {
            if (btn.dataset.scrollTo) {
                scrollToScene(parseInt(btn.dataset.scrollTo, 10));
            }
        });
    });

    document.querySelectorAll(".dot[data-scene]").forEach((el) => {
        const dot = el as HTMLElement;
        dot.addEventListener("click", () => {
            if (dot.dataset.scene) {
                scrollToScene(parseInt(dot.dataset.scene, 10));
            }
        });
    });

    document.querySelectorAll("[data-route-project]").forEach((el) => {
        const btn = el as HTMLElement;
        btn.addEventListener("click", () => {
            if (btn.dataset.routeProject) {
                window.location.hash = `#/projects/${encodeURIComponent(btn.dataset.routeProject)}`;
            }
        });
    });

    document.querySelectorAll("[data-route-home]").forEach((el) => {
        const btn = el as HTMLElement;
        btn.addEventListener("click", () => {
            window.location.hash = "#/breakdown";
        });
    });

    // ── Evidence strip toggle (mobile collapse) ──────────────────────────
    const evidenceToggle = document.getElementById(
        "evidence-toggle",
    ) as HTMLButtonElement | null;
    const evidenceStrip = document.getElementById(
        "evidence-strip",
    ) as HTMLElement | null;
    if (evidenceToggle && evidenceStrip) {
        if (window.innerWidth > 480) {
            evidenceStrip.classList.remove("is-collapsed");
            evidenceToggle.setAttribute("aria-expanded", "true");
        }
        evidenceToggle.addEventListener("click", () => {
            const collapsed = evidenceStrip.classList.toggle("is-collapsed");
            evidenceToggle.setAttribute("aria-expanded", String(!collapsed));
        });
    }

    // ── Keyboard: Arrow keys scroll scenes on the home route ─────────────
    if (!globalEventsBound) {
        globalEventsBound = true;
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (!document.querySelector(".scene")) return;
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
    }
}

function renderHome(app: HTMLElement, route: Route, resetScroll = true): void {
    const scrollTop = window.scrollY;

    app.innerHTML = `
  ${buildDotNav()}
  <main id="story-scroll" aria-label="Báo cáo phát triển hệ thống">
    ${buildHookScene()}
    ${buildSystemScene()}
    ${buildCounterScene()}
    ${buildCloseScene()}
  </main>`;
    setupObservers();
    bindEvents();
    requestAnimationFrame(async () => {
        const firstScene = document.getElementById("scene-0");
        if (firstScene) {
            firstScene.classList.add("scene-in");
        }

        // Dynamic import for sparkles.ts and paths-canvas.ts inside main.ts so they are only loaded on the homepage scene
        sparklesLoading = true;
        pathsLoading = true;
        try {
            const [sparklesMod, pathsMod] = await Promise.all([
                import("./sparkles"),
                import("./paths-canvas")
            ]);
            if (sparklesLoading && sparklesMod) {
                if (sparklesCleanup) {
                    sparklesCleanup();
                }
                sparklesCleanup = sparklesMod.initSparkles();
            }
            if (pathsLoading && pathsMod) {
                if (pathsCleanup) {
                    pathsCleanup();
                }
                pathsCleanup = pathsMod.initPathsCanvas();
            }
        } catch (error) {
            console.error("Failed to load dynamic canvas modules:", error);
        } finally {
            sparklesLoading = false;
            pathsLoading = false;
        }

        if (route.scrollToScene !== undefined) {
            scrollToScene(route.scrollToScene);
        } else if (resetScroll) {
            window.scrollTo({ top: 0, behavior: "auto" });
        } else {
            window.scrollTo({ top: scrollTop, behavior: "auto" });
        }
    });
}

function renderApp(resetScroll = true): void {
    const app = document.getElementById("app");
    if (!app) return;

    if (sparklesCleanup) {
        sparklesCleanup();
        sparklesCleanup = null;
    }
    sparklesLoading = false;

    if (pathsCleanup) {
        pathsCleanup();
        pathsCleanup = null;
    }
    pathsLoading = false;

    const state = AppStore.getState();
    if (state.error) {
        app.innerHTML = `
      <main class="error-route" style="display: flex; align-items: center; justify-content: center; min-height: 100svh; background: var(--bg); padding: 24px;">
        <div style="background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 32px; max-width: 450px; width: 100%; box-shadow: var(--shadow); text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
          <h2 style="font-size: 24px; color: var(--ink); margin-bottom: 8px;">Đã xảy ra lỗi tải dữ liệu</h2>
          <p style="color: var(--muted); font-size: 14px; margin-bottom: 24px; line-height: 1.5;">${escapeHtml(state.error)}</p>
          <button onclick="window.location.reload()" style="background: var(--accent); color: #ffffff; padding: 12px 24px; border-radius: var(--radius); font-weight: bold; width: 100%; border: none; cursor: pointer; transition: background 0.2s; font-family: inherit;">
            Tải lại trang
          </button>
        </div>
      </main>
    `;
        return;
    }

    const route = parseRoute();

    // On fresh page load, if #/breakdown is in URL, clear it and start at hook
    if (isInitialLoad) {
        isInitialLoad = false;
        if (route.name === "home" && route.scrollToScene === 1) {
            window.history.replaceState(null, "", window.location.pathname);
            renderHome(app, { name: "home" }, resetScroll);
            return;
        }
    }
    if (route.name === "project" && route.groupId) {
        const scrollTop = window.scrollY;
        app.innerHTML = buildProjectRoute(route.groupId);
        if (resetScroll) {
            window.scrollTo({ top: 0, behavior: "auto" });
        } else {
            window.scrollTo({ top: scrollTop, behavior: "auto" });
        }

        const projectMain = app.querySelector(".project-route") as HTMLElement | null;
        if (projectMain) {
            projectMain.focus();
        }

        bindEvents();
        return;
    }
    renderHome(app, route, resetScroll);
}

async function init(): Promise<void> {
    // 1. Initial synchronous render of skeleton layout
    renderApp(true);

    window.addEventListener("hashchange", () => renderApp(true));
    window.addEventListener("resize", debounce(handleResize, 150));

    // Subscribe to store updates
    AppStore.subscribe(() => renderApp(false));

    // 2. Asynchronous data load & update (preserving scroll)
    try {
        await AppStore.loadData();
    } catch (error) {
        console.error("Initialization failed:", error);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
