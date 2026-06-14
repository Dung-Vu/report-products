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

  test('should navigate using dot navigation clicks', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Dot navigation is hidden on mobile');

    // Scroll to Scene 1 to make dot navigation interactive
    await page.locator('#scene-1').scrollIntoViewIfNeeded();

    // Wait for dot nav to be visible and interactive
    const dotNav = page.locator('#dot-nav');
    await expect(dotNav).toHaveClass(/dot-nav-visible/);

    const dot3 = page.locator('.dot[data-scene="3"]');
    await dot3.click();

    // Verify that Scene 3 is visible in viewport
    const scene3 = page.locator('#scene-3');
    await expect(scene3).toBeInViewport({ ratio: 0.1 });

    // Verify that active dot class is updated
    await expect(dot3).toHaveClass(/dot-active/);
  });

  test('should support keyboard navigation (ArrowDown / ArrowUp)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard navigation is not applicable on mobile');

    // Focus page body to receive keyboard events by clicking top-left corner
    await page.mouse.click(1, 1);

    // Press ArrowDown to scroll to Scene 1
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('.dot[data-scene="1"]')).toHaveClass(/dot-active/);
    await page.waitForTimeout(500); // Allow scroll to settle

    // Press ArrowDown again to scroll to Scene 2
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('.dot[data-scene="2"]')).toHaveClass(/dot-active/);
    await page.waitForTimeout(500); // Allow scroll to settle

    // Press ArrowUp to scroll back to Scene 1
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('.dot[data-scene="1"]')).toHaveClass(/dot-active/);
  });

  test('should toggle evidence strip collapse state on click', async ({ page }) => {
    // Set to mobile layout for this test to ensure the toggle button is visible (display: flex)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const evidenceToggle = page.locator('#evidence-toggle');
    const evidenceStrip = page.locator('#evidence-strip');

    // Collapsed by default on mobile
    await expect(evidenceStrip).toHaveClass(/is-collapsed/);
    await expect(evidenceToggle).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await evidenceToggle.click();
    await expect(evidenceStrip).not.toHaveClass(/is-collapsed/);
    await expect(evidenceToggle).toHaveAttribute('aria-expanded', 'true');

    // Click again to collapse
    await evidenceToggle.click();
    await expect(evidenceStrip).toHaveClass(/is-collapsed/);
    await expect(evidenceToggle).toHaveAttribute('aria-expanded', 'false');
  });
});
