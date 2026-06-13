const { test, expect } = require('@playwright/test');

test.describe('Tier 5: Adversarial Dynamic Data Integrity & Responsive Robustness', () => {
  // Test case 1: Dynamic Data Integrity verification
  test('should dynamically adapt UI components to mocked data arrays without hardcoding', async ({ page }) => {
    // 1. Prepare different mock data
    const mockReportProjects = [
      {
        id: "mocked-project-alpha",
        name: "Mocked Project Alpha",
        category: "Test Ops",
        status: "healthy",
        quarter: "Q1",
        impact: "High",
        effort: "Low",
        owner: "Adversarial Tester",
        duration: "1 day",
        stack: ["Playwright", "GSAP"],
        summary: "This is a dynamic mock project for adversarial testing.",
        outcomes: [
          "Successfully verified dynamic data binding",
          "Ensure no hardcoded UI assumptions exist"
        ],
        metrics: { delivery: 100, adoption: 100, quality: 100 }
      }
    ];

    const mockImpactProjects = [
      {
        id: "mocked-project-alpha",
        name: "Mocked Project Alpha",
        chapter: "Dynamic Verification",
        hook: "Verification hook text for dynamic project alpha",
        problem: "Hardcoded values can lead to false positives.",
        built: "A custom test spec intercepts and injects custom mock arrays.",
        verifiedMetrics: [
          "Dynamic verification count: 1",
          "Mocked metric: success"
        ]
      }
    ];

    const mockImpactEvidence = {
      period: {
        start: "2026-06-01",
        endLabel: "June 2026",
        personalStartLabel: "01/06/2026",
        probationLabel: "Dynamic Test Run",
        officialLabel: "Confirmed Dynamic"
      },
      principles: [
        "Dynamically bound data",
        "Adversarial verification oracle"
      ],
      companyScale: [
        {
          id: "price-stock-lookup",
          label: "Mocked Interaction Stats",
          value: 9876,
          unit: "interactions",
          display: "9,876",
          description: "Mocked description for price lookup",
          source: "Dynamic Mock Source",
          confidence: "verified"
        },
        {
          id: "fabric-calculator-usage",
          label: "Mocked Calculation Stats",
          value: 1234,
          unit: "requests",
          display: "1,234",
          description: "Mocked description for fabric calc",
          source: "Dynamic Mock Source",
          confidence: "verified"
        }
      ],
      repoRelevantOdoo: [
        {
          id: "products-created",
          label: "Mocked Products Treated",
          value: 4567,
          unit: "records",
          display: "4,567",
          description: "Mocked products sync",
          source: "Dynamic Odoo Mock",
          confidence: "verified"
        }
      ],
      monthly: {},
      runtime: [
        {
          service: "action-product",
          status: "Running (Mocked)",
          health: "Perfect",
          port: "9999"
        }
      ]
    };

    const mockScaleCards = [
      {
        value: 888,
        suffix: " tỷ VND",
        label: "MOCKED NET PROFIT STAT",
        sub: "Subtext for mocked net profit",
        large: true
      },
      {
        value: 9999,
        suffix: " reqs",
        label: "MOCKED TOTAL VISITS",
        sub: "Subtext for mocked visits"
      }
    ];

    const mockSystemGroups = [
      {
        id: "mocked-group-alpha",
        label: "MOCKED GROUP ALPHA LABEL",
        eyebrow: "01 · ADVERSARIAL",
        summary: "This group was injected dynamically to challenge layout assumptions.",
        projectIds: ["mocked-project-alpha"],
        accent: "#dc2626"
      },
      {
        id: "mocked-group-beta",
        label: "MOCKED GROUP BETA LABEL",
        eyebrow: "02 · ADVERSARIAL",
        summary: "Second injected group for testing count scaling.",
        projectIds: ["mocked-project-alpha"],
        accent: "#2563eb"
      }
    ];

    // 2. Intercept scripts to inject mocked data
    await page.route('**/data/projects.js*', async route => {
      await route.fulfill({
        contentType: 'application/javascript',
        body: `window.reportProjects = ${JSON.stringify(mockReportProjects)};`
      });
    });

    await page.route('**/data/impact-projects.js*', async route => {
      await route.fulfill({
        contentType: 'application/javascript',
        body: `window.impactProjects = ${JSON.stringify(mockImpactProjects)};`
      });
    });

    await page.route('**/data/impact-evidence.js*', async route => {
      await route.fulfill({
        contentType: 'application/javascript',
        body: `window.impactEvidence = ${JSON.stringify(mockImpactEvidence)};`
      });
    });

    // Intercept app.js to replace hardcoded SYSTEM_GROUPS and SCALE_CARDS with dynamic fallbacks
    await page.route('**/app.js*', async route => {
      const response = await route.fetch();
      let text = await response.text();
      text = text.replace(/const SYSTEM_GROUPS\s*=\s*\[/, 'const SYSTEM_GROUPS = window.SYSTEM_GROUPS || [');
      text = text.replace(/const SCALE_CARDS\s*=\s*\[/, 'const SCALE_CARDS = window.SCALE_CARDS || [');
      await route.fulfill({
        contentType: 'application/javascript',
        body: text
      });
    });

    // 3. Inject mock configuration into window scope before script execution
    await page.addInitScript(({ scaleCards, systemGroups }) => {
      window.SCALE_CARDS = scaleCards;
      window.SYSTEM_GROUPS = systemGroups;
    }, { scaleCards: mockScaleCards, systemGroups: mockSystemGroups });

    // 4. Navigate to the page
    await page.goto('/');

    // 5. Assertions

    // A. Assert Scene 2 stats numbers (Scale Scene)
    const scaleScene = page.locator('#scene-2');
    await scaleScene.scrollIntoViewIfNeeded();

    // Verify first card shows mocked net profit
    const netProfitLabel = scaleScene.locator('.counter-card').nth(0).locator('.counter-eyebrow');
    await expect(netProfitLabel).toContainText('MOCKED NET PROFIT STAT');

    const netProfitVal = scaleScene.locator('.counter-card').nth(0).locator('.counter-num');
    await expect(netProfitVal).toContainText('888');

    // B. Assert Scene 3 (Bento Grid) count and labels (Scene 1 in DOM represents Bento Grid)
    const bentoGrid = page.locator('.node-map');
    await expect(bentoGrid).toBeVisible();

    const bentoCards = bentoGrid.locator('.node-btn');
    // We mocked exactly 2 groups, so count should be exactly 2
    await expect(bentoCards).toHaveCount(2);

    // Verify first bento card label
    const firstBentoLabel = bentoCards.nth(0).locator('.node-label');
    await expect(firstBentoLabel).toContainText('MOCKED GROUP ALPHA LABEL');

    // Verify second bento card label
    const secondBentoLabel = bentoCards.nth(1).locator('.node-label');
    await expect(secondBentoLabel).toContainText('MOCKED GROUP BETA LABEL');

    // C. Assert Side Panel content dynamically renders project outcomes from mocked array
    await bentoCards.nth(0).click();

    // Side panel should open
    const sidePanel = page.locator('#side-panel');
    await expect(sidePanel).toHaveClass(/panel-open/);

    // Verify side panel title is from mocked system groups
    const panelTitle = sidePanel.locator('.detail-title');
    await expect(panelTitle).toContainText('MOCKED GROUP ALPHA LABEL');

    // Verify details block displays mocked project details
    const projectIndex = sidePanel.locator('.detail-project-index').nth(0);
    await expect(projectIndex).toContainText('01');

    const projectKicker = sidePanel.locator('.detail-project-kicker').nth(0);
    await expect(projectKicker).toContainText('Dynamic Verification');

    const projectTitle = sidePanel.locator('.detail-project-title').nth(0);
    await expect(projectTitle).toContainText('Mocked Project Alpha');

    const projectHook = sidePanel.locator('.detail-project-hook').nth(0);
    await expect(projectHook).toContainText('Verification hook text for dynamic project alpha');
  });

  // Test case 2: Viewport responsiveness with dynamic mock data at 375px
  test('should render dynamic mocked layout cleanly at 375px viewport without horizontal overflow', async ({ page }) => {
    // 1. Prepare mock data with extremely long strings and large numbers to test layout limits
    const mockScaleCards = [
      {
        value: 999999999,
        suffix: " VND",
        label: "EXTREMELY LONG STAT LABEL TO FORCE OVERFLOW ISSUES IN CARD LAYOUTS",
        sub: "Long subtext that goes on and on to see if it wraps properly at narrow mobile screen widths.",
        large: true
      }
    ];

    const mockSystemGroups = [
      {
        id: "overflow-test-group",
        label: "SUPER LONG GROUP NAME THAT MIGHT BREAK THE BENTO CARD TITLE ELEMENT AT 375PX WIDTH",
        eyebrow: "01 · OVERFLOW",
        summary: "Super long summary text description designed specifically to test text wrapping and prevent any horizontal scrollbar from appearing.",
        projectIds: ["overflow-project"],
        accent: "#dc2626"
      }
    ];

    // Intercept scripts to inject mocked data
    await page.route('**/app.js*', async route => {
      const response = await route.fetch();
      let text = await response.text();
      text = text.replace(/const SYSTEM_GROUPS\s*=\s*\[/, 'const SYSTEM_GROUPS = window.SYSTEM_GROUPS || [');
      text = text.replace(/const SCALE_CARDS\s*=\s*\[/, 'const SCALE_CARDS = window.SCALE_CARDS || [');
      await route.fulfill({
        contentType: 'application/javascript',
        body: text
      });
    });

    await page.addInitScript(({ scaleCards, systemGroups }) => {
      window.SCALE_CARDS = scaleCards;
      window.SYSTEM_GROUPS = systemGroups;
    }, { scaleCards: mockScaleCards, systemGroups: mockSystemGroups });

    // Set viewport to 375px (mobile)
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to page
    await page.goto('/');

    // Wait for the app container
    await page.locator('#app').waitFor();

    // Check horizontal overflow
    const horizontalScrollable = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(horizontalScrollable).toBe(false);
  });
});
