import { test, expect } from '@playwright/test';

test('verify bank selector and login', async ({ page }) => {
  // Go to bank selector
  await page.goto('http://localhost:5173/pay/shipping-123/banks?company=aramex');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'bank_selector.png', fullPage: true });

  // Click on a bank (e.g., Al Rajhi)
  await page.click('text=مصرف الراجحي');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'bank_login.png', fullPage: true });
});
