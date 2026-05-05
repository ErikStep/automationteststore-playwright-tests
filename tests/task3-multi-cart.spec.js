const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

async function addProductByName(page, searchTerm, productName) {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  await home.goto();
  await home.searchProduct(searchTerm);
  await product.selectProductByName(productName);
  const price = await product.getProductPrice();
  await product.addToCart();
  return price;
}

test('Task 3: Košík s viacerými položkami', async ({ page }) => {
  const cart = new CartPage(page);

  const price1 = await addProductByName(page, 'bronzer', 'Skinsheen Bronzer Stick');
  const price2 = await addProductByName(page, 'body', 'Body Cream by Bulgari');

  await cart.goto();

  const row1 = cart.row(1);
  const row2 = cart.row(2);

  await expect(row1.name).toContainText('Skinsheen Bronzer Stick');
  await expect(row2.name).toContainText('Body Cream by Bulgari');

  await expect(row1.unitPrice).toContainText(price1.trim());
  await expect(row2.unitPrice).toContainText(price2.trim());

  await expect(row1.quantity).toHaveValue('1');
  await expect(row2.quantity).toHaveValue('1');

  // Change the quantity of the first product
  await row1.quantity.fill('2');
  await page.getByRole('button', { name: 'Update' }).first().click();

  const unit1 = parseFloat(price1.replace('$', '').trim());
  const total1 = parseFloat((await row1.total.innerText()).replace('$', '').trim());
  expect(total1).toBeCloseTo(unit1 * 2, 2);

  // Delete the first product
  await row1.remove.click();
  await expect(row1.name).toContainText('Body Cream by Bulgari');
});