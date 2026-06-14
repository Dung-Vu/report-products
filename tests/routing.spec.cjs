const { test, expect } = require('@playwright/test');

test.describe('Tier 3: Hash Routing & Data Contracts', () => {
  test('should navigate to project details and return to home', async ({ page }) => {
    await page.goto('/');

    // Navigate to System Map (Scene 1)
    await page.locator('#scene-1').scrollIntoViewIfNeeded();

    // Wait for entrance animations/transitions to settle
    await page.waitForTimeout(1000);

    // Click on Bonario Hub node
    const hubNode = page.locator('[data-route-project="bonario-hub"]');
    await hubNode.scrollIntoViewIfNeeded();
    await hubNode.click();

    // Verify hash update using page.waitForFunction for maximum reliability across browsers
    await page.waitForFunction(() => window.location.hash.includes('#/projects/bonario-hub'));
    const detailRoute = page.locator('.project-route');
    await expect(detailRoute).toBeVisible();

    // Verify project detail title
    const projectTitle = page.locator('.detail-title');
    await expect(projectTitle).toContainText('Bonario Hub');

    // Verify back navigation button
    const backBtn = page.locator('[data-route-home]');
    await page.waitForTimeout(600); // Wait for GSAP slide-in transition to settle
    await backBtn.click();

    // Verify return to home route using page.waitForFunction
    await page.waitForFunction(() => window.location.hash.includes('#/breakdown'));
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
    await page.goto('/');

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
      await page.evaluate((projectId) => {
        window.location.hash = `#/projects/${projectId}`;
      }, id);
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
