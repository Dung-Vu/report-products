# E2E Test Infrastructure Specification

This document outlines the End-to-End (E2E) testing design for the **Bonario Impact Report** project. The test suite is designed to ensure visual integrity, user interaction reliability, correct routing, and data contract compliance, following a systematic **4-Tier Approach**.

---

## 1. Environment & Architecture Analysis

### Available Environment Tools
- **Node.js**: v24.11.1
- **npm**: v11.6.2
- **Python**: v3.12.10
- **Git**: v2.45.2.windows.1

### Recommended Test Runner: Playwright
We recommend **Playwright (Node.js)** as the E2E test runner.
- **Why Playwright?**
  1. **Built-in Web Server Handling**: Playwright can automatically spin up a local development web server before running tests and tear it down afterward.
  2. **Viewport Emulation**: Playwright has built-in mobile viewport and browser emulation (Chromium, Firefox, WebKit) to verify mobile responsiveness.
  3. **Console Logging Diagnostics**: Playwright allows subscribing to page events like `console` and `pageerror` to guarantee console integrity.
  4. **Complex Scroll & Keyboard Actions**: Provides robust APIs to trigger keyboard events (`PageDown`, `ArrowDown`) and wait for elements to scroll into view.
  5. **Fast & Parallel Execution**: Native parallel execution out of the box.

### Test Web Server
Since the repository is a pure static frontend project without a `package.json` or server backend, we recommend serving the static files using a zero-dependency server during tests:
- **Option A**: Use Python's built-in module: `python -m http.server 8080`.
- **Option B**: Use Playwright's built-in static serving configuration or standard Node.js server.
In our design, we configure Playwright to run a simple, zero-dependency static file server using Python or a simple Node script, making it robust and lightweight.

---

## 2. The Systematic 4-Tier E2E Testing Design

The test suite is structured into four distinct tiers, progressing from basic document health to complex cross-device layouts.

```
┌─────────────────────────────────────────────────────────┐
│        Tier 4: Responsive Design & Viewports            │
│  - Verify no horizontal overflow across screens         │
│  - Mobile vs. Desktop evidence strip state checks       │
├─────────────────────────────────────────────────────────┤
│        Tier 3: Hash Routing & Data Contracts            │
│  - Verify hash routing: #/projects/:groupId             │
│  - Verify back button and invalid routes rendering      │
├─────────────────────────────────────────────────────────┤
│        Tier 2: Interactive Flows & Animations            │
│  - Verify dot navigation, scene scrolling, keypresses  │
│  - Validate counter animations & collapsible components │
├─────────────────────────────────────────────────────────┐
│        Tier 1: Smoke Tests & Console Integrity          │
│  - Check document load, file preloads, script execution  │
│  - Intercept page console errors and syntax failures    │
└─────────────────────────────────────────────────────────┘
```

---

### Tier 1: Smoke Tests & Console Integrity
**Objective**: Ensure the basic application environment loads correctly, files are served, and no JavaScript runtime exceptions are thrown during initial render.

*   **Verifications**:
    *   `index.html` loads with HTTP 200.
    *   Critical resources (fonts, `styles.css`, `app.js`, `data/`) are successfully preloaded/loaded.
    *   The `#app` element is populated, and the main scroll container `#story-scroll` is rendered.
    *   No `console.error` or unhandled exceptions occur during initial load.

---

### Tier 2: Interactive Flows & Animations
**Objective**: Ensure all interactive behaviors (scrolling, dots navigation, keyboard shortcuts, counter animations, and accordion toggles) function exactly as specified.

*   **Verifications**:
    *   **Dot Navigation Visibility**: The dot navigation container `#dot-nav` has `aria-hidden="true"` and lacks `dot-nav-visible` class when on `scene-0` (the hook scene). It becomes visible (`dot-nav-visible` added) when the user scrolls down to subsequent scenes.
    *   **Dot Navigation Scrolling**: Clicking a navigation dot trigger (`.dot[data-scene="X"]`) scrolls the viewport to target `#scene-X`.
    *   **Keyboard Navigation**: Pressing `ArrowDown` or `PageDown` scrolls the page down to the next scene. Pressing `ArrowUp` or `PageUp` scrolls up.
    *   **Counter Animations**: On initial page load, hook counters in `scene-0` (`[data-hook-target]`) animate up from 0 to their final values. When `scene-2` is scrolled into view, scale counters (`[data-target]`) trigger their counter animations.
    *   **Collapsible Accordion**: Clicking the evidence toggle button `#evidence-toggle` toggles the `is-collapsed` class on the `#evidence-strip` container and toggles the `aria-expanded` state.

---

### Tier 3: Hash Routing & Data Contracts
**Objective**: Validate the SPA hash-based routing mechanics and confirm the presentation matches the data structure contract.

*   **Verifications**:
    *   **Hash Transition to Project Detail**: Clicking a project node button (`.node-btn` or `[data-route-project]`) in the System Map (`scene-1`) updates the URL hash to `#/projects/:groupId` and transitions the UI to render the project detail layout (`.project-route`).
    *   **Project Detail Content Verification**: The detail page properly displays the project's title, timeline, P&L cost metrics, ROI numbers, strengths list, and weaknesses list matching the data contracts defined in `data/projects.js` and `data/impact-projects.js`.
    *   **Back Navigation**: Clicking the back button `[data-route-home]` transitions the hash back to `#/breakdown` (or home) and scrolls the page back to the System Map (`scene-1`).
    *   **Invalid Route Fallback**: Navigating directly to an invalid hash (e.g., `#/projects/non-existent-id`) displays the fallback error message ("Không tìm thấy mục này").

---

### Tier 4: Responsive Design & Viewports
**Objective**: Verify the presentation layout functions across all target resolutions without layout breakage, text overlaps, or horizontal overflows.

*   **Verifications**:
    *   **Horizontal Scroll Prevention**: Across all screen widths (**375px**, **768px**, **1024px**, **1440px**), verify that `window.innerWidth` matches the viewport width and that there is no horizontal scrollbar on the main document.
    *   **Responsive Default States**:
        *   On screens wider than **480px** (Desktop/Tablet), the evidence strip `#evidence-strip` must be expanded by default (`is-collapsed` class is absent, `aria-expanded="true"`).
        *   On screens **480px** or narrower (Mobile), the evidence strip must be collapsed by default (`is-collapsed` class is present, `aria-expanded="false"`).

---

## 3. Recommended E2E Test Implementation Plan

We recommend setting up a standard testing directory inside the project containing the Playwright configs and test files.

### Folder Structure Proposal
```
d:\report-products\
├── .agents\
├── data\
│   ├── impact-evidence.js
│   ├── impact-projects.js
│   └── projects.js
├── tests\
│   ├── smoke.spec.js          # Tier 1 Tests
│   ├── interaction.spec.js    # Tier 2 Tests
│   ├── routing.spec.js        # Tier 3 Tests
│   └── responsive.spec.js     # Tier 4 Tests
├── app.js
├── index.html
├── styles.css
├── package.json               # Development dependency configurations
├── playwright.config.js       # Playwright execution configuration
└── TEST_INFRA.md              # Test Design Specification
```

### 3.1 Draft configurations

#### `package.json`
```json
{
  "name": "bonario-impact-report-tests",
  "version": "2.0.0",
  "description": "E2E testing suite for Bonario Impact Report v2",
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.0"
  }
}
```

#### `playwright.config.js`
```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'python -m http.server 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
```

---

### 3.2 E2E Test Code Drafts

#### `tests/smoke.spec.js` (Tier 1: Smoke & Console Integrity)
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Tier 1: Smoke & Console Integrity', () => {
  test('should load index.html successfully with no console errors or exceptions', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Capture unhandled exceptions
    page.on('pageerror', exception => {
      pageErrors.push(exception.message);
    });

    // Navigate to homepage
    const response = await page.goto('/');
    expect(response.status()).toBe(200);

    // Verify main components are present in DOM
    const appContainer = page.locator('#app');
    await expect(appContainer).toBeVisible();

    const scrollContainer = page.locator('#story-scroll');
    await expect(scrollContainer).toBeVisible();

    // Verify critical scenes are rendered
    await expect(page.locator('#scene-0')).toBeVisible();
    await expect(page.locator('#scene-1')).toBeVisible();
    await expect(page.locator('#scene-2')).toBeVisible();
    await expect(page.locator('#scene-3')).toBeVisible();

    // Assert no JavaScript errors occurred during initial render
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
});
```

#### `tests/interaction.spec.js` (Tier 2: Interactive Flows)
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Tier 2: Interactive Flows & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should manage dot navigation visibility based on active scene', async ({ page }) => {
    const dotNav = page.locator('#dot-nav');

    // On Scene 0 (Hook scene), dot nav is hidden
    await expect(dotNav).toHaveAttribute('aria-hidden', 'true');
    await expect(dotNav).not.toHaveClass(/dot-nav-visible/);

    // Scroll to Scene 1 (System Map)
    const scene1 = page.locator('#scene-1');
    await scene1.scrollIntoViewIfNeeded();

    // Dot nav should now be visible
    await expect(dotNav).not.toHaveAttribute('aria-hidden', 'true');
    await expect(dotNav).toHaveClass(/dot-nav-visible/);
  });

  test('should navigate using dot navigation clicks', async ({ page }) => {
    // Scroll to Scene 1 to make dot navigation interactive
    await page.locator('#scene-1').scrollIntoViewIfNeeded();

    const dot3 = page.locator('.dot[data-scene="3"]');
    await dot3.click();

    // Wait for scrolling animation to settle
    await page.waitForTimeout(1000);

    // Verify that Scene 3 is visible in viewport
    const scene3 = page.locator('#scene-3');
    await expect(scene3).toBeInViewport({ ratio: 0.5 });

    // Verify that active dot class is updated
    await expect(dot3).toHaveClass(/dot-active/);
  });

  test('should support keyboard navigation (ArrowDown / ArrowUp)', async ({ page }) => {
    // Focus page body to receive keyboard events
    await page.locator('body').click();

    // Press ArrowDown to scroll to Scene 1
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await expect(page.locator('.dot[data-scene="1"]')).toHaveClass(/dot-active/);

    // Press ArrowDown again to scroll to Scene 2
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await expect(page.locator('.dot[data-scene="2"]')).toHaveClass(/dot-active/);

    // Press ArrowUp to scroll back to Scene 1
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(1000);
    await expect(page.locator('.dot[data-scene="1"]')).toHaveClass(/dot-active/);
  });

  test('should animate counters when scene enters viewport', async ({ page }) => {
    // Scene 0 hook counters should start immediately
    const hookCounter = page.locator('[data-hook-target="11"]');
    // Allow animation duration to finish
    await page.waitForTimeout(2000);
    const value = await hookCounter.textContent();
    expect(value).toContain('11');

    // Scroll to Scene 2 to trigger scale counters
    const scaleScene = page.locator('#scene-2');
    await scaleScene.scrollIntoViewIfNeeded();
    
    const scaleCounter = page.locator('[data-target="150"]');
    await page.waitForTimeout(2000);
    const scaleValue = await scaleCounter.textContent();
    expect(scaleValue).toContain('150');
  });

  test('should toggle evidence strip collapse state on click', async ({ page }) => {
    // Set to desktop layout for this test to ensure default expanded state
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');

    const evidenceToggle = page.locator('#evidence-toggle');
    const evidenceStrip = page.locator('#evidence-strip');

    // Expanded by default on desktop
    await expect(evidenceStrip).not.toHaveClass(/is-collapsed/);
    await expect(evidenceToggle).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    await evidenceToggle.click();
    await expect(evidenceStrip).toHaveClass(/is-collapsed/);
    await expect(evidenceToggle).toHaveAttribute('aria-expanded', 'false');

    // Click again to expand
    await evidenceToggle.click();
    await expect(evidenceStrip).not.toHaveClass(/is-collapsed/);
    await expect(evidenceToggle).toHaveAttribute('aria-expanded', 'true');
  });
});
```

#### `tests/routing.spec.js` (Tier 3: Hash Routing & Data Contracts)
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Tier 3: Hash Routing & Data Contracts', () => {
  test('should navigate to project details and return to home', async ({ page }) => {
    await page.goto('/');

    // Navigate to System Map (Scene 1)
    await page.locator('#scene-1').scrollIntoViewIfNeeded();

    // Click on Bonario Hub node
    const hubNode = page.locator('[data-route-project="bonario-hub"]');
    await hubNode.click();

    // Verify hash update and route component rendering
    await expect(page).toHaveURL(/#\/projects\/bonario-hub/);
    const detailRoute = page.locator('.project-route');
    await expect(detailRoute).toBeVisible();

    // Verify project detail title
    const projectTitle = page.locator('.detail-title');
    await expect(projectTitle).toContainText('Bonario Hub');

    // Verify back navigation button
    const backBtn = page.locator('[data-route-home]');
    await backBtn.click();

    // Verify return to home route
    await expect(page).toHaveURL(/#\/breakdown/);
    await expect(page.locator('#scene-1')).toBeInViewport();
  });

  test('should handle invalid project routes gracefully', async ({ page }) => {
    await page.goto('/#/projects/non-existent-id');

    // Expect fallback route messages
    const errorTitle = page.locator('.project-route-title');
    await expect(errorTitle).toContainText('Không tìm thấy mục này.');

    const backBtn = page.locator('[data-route-home]');
    await expect(backBtn).toBeVisible();
  });

  test('should verify all 11 data contract projects are loadable', async ({ page }) => {
    const projectIds = [
      'stock-price-ord',
      'bonario-hub',
      'curtain-tools',
      'odoo-pdf-documents',
      'sc-op-in-charge',
      'local-server-infra',
      'marketing-image-gen',
      'odoo-product-creation',
      'internal-order-tracking',
      'rfid',
      'stock-escalation'
    ];

    for (const id of projectIds) {
      await page.goto(`/#/projects/${id}`);
      const detailRoute = page.locator('.project-route');
      await expect(detailRoute).toBeVisible();
      
      // Verify no 'Không tìm thấy' error is displayed
      const errorTitle = page.locator('.project-route-title');
      await expect(errorTitle).not.toBeVisible();

      // Check that header or project titles exist
      await expect(page.locator('.detail-title')).toBeVisible();
    }
  });
});
```

#### `tests/responsive.spec.js` (Tier 4: Responsive Design & Viewports)
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Tier 4: Responsive Design & Viewports', () => {
  const resolutions = [
    { width: 375, height: 667, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1024, height: 768, name: 'Desktop Small' },
    { width: 1440, height: 900, name: 'Desktop Large' }
  ];

  for (const res of resolutions) {
    test(`should render cleanly at ${res.name} (${res.width}x${res.height}) without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: res.width, height: res.height });
      await page.goto('/');

      // Wait for page load
      await page.locator('#app').waitFor();

      // Measure horizontal scrollbar footprint
      const horizontalScrollable = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      // Assert no horizontal scrolling occurs
      expect(horizontalScrollable).toBe(false);
    });
  }

  test('should verify responsive default states of the evidence strip', async ({ page }) => {
    // 1. Check Mobile behavior (<= 480px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const mobileStrip = page.locator('#evidence-strip');
    const mobileToggle = page.locator('#evidence-toggle');
    // Must be collapsed by default on mobile
    await expect(mobileStrip).toHaveClass(/is-collapsed/);
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');

    // 2. Check Desktop behavior (> 480px)
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');

    const desktopStrip = page.locator('#evidence-strip');
    const desktopToggle = page.locator('#evidence-toggle');
    // Must be expanded by default on desktop
    await expect(desktopStrip).not.toHaveClass(/is-collapsed/);
    await expect(desktopToggle).toHaveAttribute('aria-expanded', 'true');
  });
});
```
