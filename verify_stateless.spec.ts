import { test, expect } from '@playwright/test';

test('verify stateless payment page rendering', async ({ page }) => {
  // Encoded payload for: {company: 'aramex', country: 'SA', amount: 750, currency: 'SAR', type: 'shipping'}
  // Using the same logic as src/utils/urlState.ts
  const payload = {
    company: 'aramex',
    country: 'SA',
    amount: 750,
    currency: 'SAR',
    type: 'shipping',
    id: 'local-test-123'
  };

  const jsonString = JSON.stringify(payload);
  const d = Buffer.from(encodeURIComponent(jsonString)).toString('base64');

  const testUrl = `http://localhost:5173/r/SA/shipping/local-test-123?d=${d}`;

  console.log(`Testing URL: ${testUrl}`);

  await page.goto(testUrl);

  // Wait for page to load (it has a 3s timer in Microsite.tsx if data is slow)
  await page.waitForTimeout(4000);

  // Check if "Aramex" or "أرامكس" is visible
  const content = await page.textContent('body');
  expect(content).toMatch(/أرامكس|Aramex/);

  // Check if amount is visible
  expect(content).toContain('750');

  // Check if "ادفع الآن" button is present
  const payButton = await page.getByRole('button', { name: /ادفع الآن/i });
  expect(await payButton.isVisible()).toBe(true);

  await page.screenshot({ path: 'stateless-microsite.png' });

  // Click pay button and verify transition to recipient page
  await payButton.click();
  await page.waitForURL(/\/pay\/local-test-123\/recipient/);

  const recipientContent = await page.textContent('body');
  expect(recipientContent).toMatch(/بيانات مستلم الخدمة/i);

  await page.screenshot({ path: 'stateless-recipient.png' });
});
