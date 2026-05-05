const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CategoryPage } = require('../pages/CategoryPage');
const { ProductPage } = require('../pages/ProductPage');

test('Task 2: Kategórie + filtrácia', async ({ page }) => {
  const home = new HomePage(page);
  const category = new CategoryPage(page);
  const product = new ProductPage(page);

  await home.goto();
  await home.goToCategory('Skincare');

  // Sort By Name A–Z
  await category.sortBy('pd.name-ASC');
  const names = await category.getAllProductNames();
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));

  // Select a random product
  const listName = await category.selectRandomProduct();

  const detailName = await product.getProductName();
  expect(detailName.trim().toLowerCase()).toContain(listName.trim().toLowerCase());
});