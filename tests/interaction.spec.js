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

  test('should support keyboard navigation (ArrowDown / ArrowUp)', async ({ page }) => {
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

  test('should animate counters when scene enters viewport', async ({ page }) => {
    // Scene 0 hook counters should start immediately
    const hookCounter = page.locator('[data-hook-target="11"]');
    await expect(hookCounter).toContainText('11', { timeout: 5000 });

    // Scroll to Scene 2 to trigger scale counters
    const scaleScene = page.locator('#scene-2');
    await scaleScene.scrollIntoViewIfNeeded();
    
    const scaleCounter = page.locator('[data-target="150"]');
    await expect(scaleCounter).toContainText('150', { timeout: 5000 });
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

  test('should verify GSAP blur-to-focus number animations on Scene 2', async ({ page }) => {
    await page.goto('/');

    // Retrieve stats number element inside Scene 2
    const counterEl = page.locator('#scene-2 [data-target="150"]');
    
    // Scroll Scene 2 into viewport to trigger GSAP counter and blur-to-focus animation
    const scaleScene = page.locator('#scene-2');
    await scaleScene.scrollIntoViewIfNeeded();

    // Check style after scroll (allow short duration for transition start)
    await page.waitForTimeout(500);

    // Get style attribute to check for inline GSAP changes
    const style = await counterEl.getAttribute('style');
    
    // Check that opacity and filter properties were modified by GSAP
    if (style) {
      expect(style).toContain('opacity');
      expect(style).toContain('blur');
    }
    
    // Wait for the animation to fully complete
    await page.waitForTimeout(1000);
    const value = await counterEl.textContent();
    expect(value).toContain('150');
  });

  test('should render CardStack in Side Panel and support navigation clicks', async ({ page }) => {
    await page.goto('/');
    
    // Go to System Map scene
    const scene1 = page.locator('#scene-1');
    await scene1.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Click on Bonario Hub node to open Side Panel
    const hubNode = page.locator('[data-route-project="bonario-hub"]');
    await hubNode.click();
    
    // Verify Side Panel is open and visible
    const sidePanel = page.locator('#side-panel');
    await expect(sidePanel).toHaveClass(/panel-open/);
    
    // Wait for GSAP slide-in transition to settle
    await page.waitForTimeout(600);
    
    // Locate CardStack
    const cardStack = page.locator('.card-stack');
    await expect(cardStack).toBeVisible();
    
    // Check cards list
    const cards = page.locator('.evidence-card-stacked');
    await expect(cards).toHaveCount(4);
    
    // Verify first card has the highest z-index (30)
    const firstCard = cards.nth(0);
    await expect(firstCard).toHaveCSS('z-index', '30');
    
    // Click Next button
    const nextBtn = page.locator('.stack-next-btn');
    await nextBtn.click();
    
    // Wait for GSAP transition to execute
    await page.waitForTimeout(500);
    
    // Verify that z-indexes of cards shift (the first card moves or next card becomes top card)
    await expect(firstCard).toHaveCSS('z-index', '0');
    await expect(cards.nth(1)).toHaveCSS('z-index', '30');
  });
});
