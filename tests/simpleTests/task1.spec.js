const { test, expect } = require('@playwright/test');

test('Task 1: Vyhľadanie produktu a nákup', async ({ page }) => {
  
  // 1–2. Product search
  await page.goto('https://automationteststore.com/');
  await page.getByRole('textbox', { name: 'Search Keywords' }).fill('Skin');
  await page.getByTitle('Go').click();

  // 3–4. Find "Skinsheen Bronzer Stick" in the results
  await page.getByRole('link', { name: 'Skinsheen Bronzer Stick' }).click();

  // 5. Product verification
  const name = page.getByRole('heading', { name: 'Skinsheen Bronzer Stick' });
  const price = page.locator('.productfilneprice');

  await expect(name).toBeVisible();
  await expect(price).toBeVisible();

  // 6. Add to cart
  await page.getByRole('link', { name: 'Add to Cart' }).click();

  //7. Verify that the cart contains 1 item
  await page.locator('.block_7').hover();
  const product = page.locator('#top_cart_product_list').getByRole('cell', { name: 'Skinsheen Bronzer Stick' });
  await expect(product).toBeVisible();
  
  // 8. Cart
  await page.goto('https://automationteststore.com/index.php?rt=checkout/cart');

  const cartRows = page.locator('#cart table[class="table table-striped table-bordered"]').nth(0).locator('tbody tr');
  await expect(cartRows).toHaveCount(2); // 1 item + row with header

  // 9. Verify name and price in the cart
  const cartName = cartRows.nth(1).locator('td:nth-child(2) a');
  const cartPrice = cartRows.nth(1).locator('td:nth-child(4)');
  await expect(cartName).toContainText('Skinsheen Bronzer Stick');
  await expect(cartPrice).toContainText(await page.getByRole('cell', { name: '$' }).first().innerText());

  // 10. Remove item and verify that the cart is empty
  await cartRows.locator('a[class ^= "btn"]').click();
  await expect(page.getByText('Your shopping cart is empty!')).toBeVisible();
});
