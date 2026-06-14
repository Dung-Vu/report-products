const { test, expect } = require('@playwright/test');

test.describe('Tier 5: Adversarial Dynamic Data Integrity & Responsive Robustness', () => {
  // Test case 1: Dynamic Data Integrity verification
  test('should dynamically adapt UI components to mocked data arrays without hardcoding', async ({ page }) => {
    // 1. Prepare different mock data
    const mockSystemGroups = [
      {
        id: "mocked-group-alpha",
        label: "MOCKED GROUP ALPHA LABEL",
        eyebrow: "01 · ALPHA",
        summary: "This is a dynamic mock group for adversarial testing.",
        projectIds: ["bonario-stock-management"],
        accent: "#0369a1"
      },
      {
        id: "mocked-group-beta",
        label: "MOCKED GROUP BETA LABEL",
        eyebrow: "02 · BETA",
        summary: "This is another dynamic mock group.",
        projectIds: ["ord-price-lookup"],
        accent: "#2563eb"
      }
    ];

    // Intercept JSON fetch to return mocked system groups
    await page.route('**/src/data/system-groups.json', async route => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(mockSystemGroups)
      });
    });

    // 4. Navigate to the page
    await page.goto('/');

    // 5. Assertions

    // A. Assert Scene 1 (Node Map) count and labels
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

    // B. Assert details route renders project details from mocked array
    await bentoCards.nth(0).click();

    // Route should change to project-route
    await page.waitForFunction(() => window.location.hash.includes('#/projects/mocked-group-alpha'));
    const detailRoute = page.locator('.project-route');
    await expect(detailRoute).toBeVisible();

    // Verify page title is from mocked system groups
    const pageTitle = detailRoute.locator('.detail-title');
    await expect(pageTitle).toContainText('MOCKED GROUP ALPHA LABEL');
  });

  // Test case 2: Viewport responsiveness with dynamic mock data at 375px
  test('should render dynamic mocked layout cleanly at 375px viewport without horizontal overflow', async ({ page }) => {
    const mockSystemGroups = [
      {
        id: "overflow-test-group",
        label: "SUPER LONG GROUP NAME THAT MIGHT BREAK THE BENTO CARD TITLE ELEMENT AT 375PX WIDTH",
        eyebrow: "01 · OVERFLOW",
        summary: "Super long summary text description designed specifically to test text wrapping and prevent any horizontal scrollbar from appearing.",
        projectIds: ["bonario-stock-management"],
        accent: "#dc2626"
      }
    ];

    // Intercept JSON fetch to return mocked system groups
    await page.route('**/src/data/system-groups.json', async route => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(mockSystemGroups)
      });
    });

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
