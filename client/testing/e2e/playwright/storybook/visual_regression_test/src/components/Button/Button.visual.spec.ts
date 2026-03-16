import { test, expect } from '@playwright/test';

test.describe('Visual Regression: Button', () => {
  
  test('Primary Button should look correct', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--primary');
    
    const button = page.getByRole('button', { name: /Click Me/i }); 
    
    await expect(button).toBeVisible({ timeout: 10000 });

    await expect(page).toHaveScreenshot('button-primary.png');
  });

  test('Danger Button should look correct', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--danger');
    const myButton = page.getByRole('button', { name: /Delete/i });
    
    await expect(myButton).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveScreenshot('button-danger.png');
  });
});