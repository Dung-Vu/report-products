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
