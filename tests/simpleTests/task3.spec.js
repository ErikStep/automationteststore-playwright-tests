const { test, expect } = require('@playwright/test');

async function addProductByName(page, searchTerm, productName) {
  await page.goto('https://automationteststore.com/');
  await page.getByRole('textbox', { name: 'Search Keywords' }).fill(searchTerm);
  await page.getByTitle('Go').click();

  const productLink = page.locator('.prdocutname', { hasText: productName });
  await productLink.first().click();

  const priceLocator = page.locator('.productpageprice .productfilneprice, .productpageprice .price').first();
  const priceText = await priceLocator.innerText();

  await page.getByRole('link', { name: 'Add to Cart' }).click();

  return priceText;
}

test('Task 3: Košík s viacerými položkami', async ({ page }) => {
  const price1 = await addProductByName(page, 'bronzer', 'Skinsheen Bronzer Stick');
  const price2 = await addProductByName(page, 'body', 'Body Cream by Bulgari');

  await page.goto('https://automationteststore.com/index.php?rt=checkout/cart');

  const rows = page.locator('div.container-fluid.cart-info.product-list table tbody tr');
  await expect(rows).toHaveCount(3); // 2 produkty + řádek s celkem

  // Перевірка назв і цін
  const names = rows.locator('td:nth-child(2) a');
  const unitPrices = rows.locator('td:nth-child(4)');
  const qtyInputs = rows.locator('input[name*="quantity"]');
  const totals = rows.locator('td:nth-child(6)');

  await expect(names.nth(0)).toContainText('Skinsheen Bronzer Stick');
  await expect(names.nth(1)).toContainText('Body Cream by Bulgari');

  await expect(unitPrices.nth(0)).toContainText(price1.trim());
  await expect(unitPrices.nth(1)).toContainText(price2.trim());

  await expect(qtyInputs.nth(0)).toHaveValue('1');
  await expect(qtyInputs.nth(1)).toHaveValue('1');

  // Змінити кількість першого
  await qtyInputs.nth(0).fill('2');
  await page.getByRole('button', { name: 'Update' }).first().click();

  const unit1 = parseFloat(price1.replace('$', '').trim());
  const total1Text = await totals.nth(0).innerText();
  const total1 = parseFloat(total1Text.replace('$', '').trim());

  expect(total1).toBeCloseTo(unit1 * 2, 2);

  // Видалити тільки перший продукт
  await rows.nth(1).getByRole('link').filter({ hasText: /^$/ }).nth(1).click();

  await expect(rows).toHaveCount(2); // 1 продукт + řádek s celkem
  await expect(names.nth(0)).toContainText('Body Cream by Bulgari');
});
