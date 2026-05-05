const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { BreadcrumbsPage } = require('../pages/BreadcrumbsPage');

test('Task 4: Breadcrumbs + URL', async ({ page }) => {
  const home = new HomePage(page);
  const breadcrumb = new BreadcrumbsPage(page);

  await home.goto();
  await home.goToCategory('Fragrance');
  await page.getByRole('link', { name: 'Men' }).first().click();

  await breadcrumb.checkBreadcrumbContains('Home');
  await breadcrumb.checkBreadcrumbContains('Fragrance');
  await breadcrumb.checkBreadcrumbContains('Men');

  expect(page.url()).toContain('category&path=49');
  expect(page.url().toLowerCase()).toContain('category&path=49_51');

  // Повернення через breadcrumb
  await page.getByRole('link', { name: 'Fragrance' }).nth(1).click();
  await breadcrumb.checkBreadcrumbContains('Fragrance');
});