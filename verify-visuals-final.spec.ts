import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 }, isMobile: true });

test('verify utility replicas', async ({ page }) => {
  // Check DEWA (UAE Utility)
  await page.goto('http://localhost:8080/local-payment?service=dewa&country=AE');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification-dewa.png', fullPage: true });

  // Check stc (Saudi Telecom)
  await page.goto('http://localhost:8080/local-payment?service=stc&country=SA');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification-stc.png', fullPage: true });
});

test('verify bank login replicas', async ({ page }) => {
  // Check FAB (UAE Bank)
  await page.goto('http://localhost:8080/pay/test-id/bank-login?bankId=fab');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification-bank-fab.png', fullPage: true });

  // Check Emirates NBD
  await page.goto('http://localhost:8080/pay/test-id/bank-login?bankId=emirates_nbd');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification-bank-enbd.png', fullPage: true });
});
