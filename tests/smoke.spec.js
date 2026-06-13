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
