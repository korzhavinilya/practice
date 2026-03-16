import test, { chromium } from '@playwright/test';

test('login test', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await page.hover(
    "//a[@role='button']//span[@class='title'][normalize-space()='My account']"
  );
  await page.click('"Login"');

  await page.fill("input[name='email']", 'cerber941@gmail.com');
  await page.fill("input[type='password']", '123456');
  await page.click("input[type='submit']");

  await page.waitForTimeout(2000);
  await page.close();
});
