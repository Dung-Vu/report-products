const { test, expect } = require('@playwright/test');
const path = require('path');

test('capture homepage sparkles screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Wait for sparkles canvas animation
  
  const screenshotPath = path.join('C:', 'Users', 'Admin', '.gemini', 'antigravity', 'brain', '43be28cd-089a-44e6-84ab-ec83e659b3e6', 'hero_sparkles.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Visual verification screenshot saved to: ${screenshotPath}`);
});
