const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CategoryPage } = require('../pages/CategoryPage');

test('Task 5: Negatívne vyhľadávanie neexistujúceho produktu', async ({ page }) => {
  const home = new HomePage(page);
  const category = new CategoryPage(page);

  await home.goto();
  await home.searchProduct('qwertynonsensesuperproduct123');

  const noResults = page.getByText('There is no product that matches the search criteria.');
  await expect(noResults).toBeVisible();

  await expect(category.productsGrid.locator('.thumbnail')).toHaveCount(0);
  await expect(page.locator('.prdocutname')).toHaveCount(0);
  await expect(page.locator('#maincontainer')).toBeVisible();
});