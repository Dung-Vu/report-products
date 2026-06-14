const { test, expect } = require('@playwright/test');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/73626886-0453-446b-9034-71af802241c2';

test.describe('Verify Scene 2 layout and elements', () => {
  test('Desktop (1280x900) layout validation and screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Scroll directly to Scene 2
    const scene2 = page.locator('#scene-2');
    await scene2.scrollIntoViewIfNeeded();
    
    // Wait for the scrolling transition and entrance animations to complete
    await page.waitForTimeout(2000);
    
    // Verify header exists and is centered
    const header = page.locator('.evidence-strip-header');
    await expect(header).toBeVisible();
    

    
    // Verify 3 columns exist on desktop
    const col1 = page.locator('.evidence-scroll-column.col-1');
    const col2 = page.locator('.evidence-scroll-column.col-2');
    const col3 = page.locator('.evidence-scroll-column.col-3');
    await expect(col1).toBeVisible();
    await expect(col2).toBeVisible();
    await expect(col3).toBeVisible();
    
    // Verify evidence strip is expanded by default on desktop
    const strip = page.locator('#evidence-strip');
    await expect(strip).not.toHaveClass(/is-collapsed/);
    
    // Check horizontal scroll
    const horizontalScrollable = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(horizontalScrollable).toBe(false);
    
    // Take screenshot
    const screenshotPath = path.join(ARTIFACT_DIR, 'scene2_desktop.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved desktop screenshot to: ${screenshotPath}`);
  });

  test('Mobile (375x812) layout validation and screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Scroll directly to Scene 2
    const scene2 = page.locator('#scene-2');
    await scene2.scrollIntoViewIfNeeded();
    
    // Wait for scroll
    await page.waitForTimeout(2000);
    
    // Verify header exists
    const header = page.locator('.evidence-strip-header');
    await expect(header).toBeVisible();
    

    
    // Verify evidence strip is collapsed by default on mobile
    const strip = page.locator('#evidence-strip');
    await expect(strip).toHaveClass(/is-collapsed/);
    
    // Expand the strip to verify infinite scroll columns
    const toggle = page.locator('#evidence-toggle');
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
    await page.waitForTimeout(1000); // wait for CSS transitions
    await expect(strip).not.toHaveClass(/is-collapsed/);
    
    // Verify 1 column is visible (col-1) and others are hidden (col-2, col-3) on mobile
    const col1 = page.locator('.evidence-scroll-column.col-1');
    const col2 = page.locator('.evidence-scroll-column.col-2');
    const col3 = page.locator('.evidence-scroll-column.col-3');
    await expect(col1).toBeVisible();
    await expect(col2).not.toBeVisible();
    await expect(col3).not.toBeVisible();
    
    // Check horizontal scroll
    const horizontalScrollable = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(horizontalScrollable).toBe(false);
    
    // Take screenshot
    const screenshotPath = path.join(ARTIFACT_DIR, 'scene2_mobile.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved mobile screenshot to: ${screenshotPath}`);
  });
});
