const { test, expect } = require('@playwright/test');

test('Task 5: Negatívne vyhľadávanie neexistujúceho produktu', async ({ page }) => {
  await page.goto('https://automationteststore.com/');

  await page.getByRole('textbox', { name: 'Search Keywords' }).fill('qwertynonsensesuperproduct123');
  await page.getByTitle('Go').click();

  // 2. Хто не знайдено
  const noResults = page.getByText('There is no product that matches the search criteria.');
  await expect(noResults).toBeVisible();

  // 2. Порожній грід
  const products = page.locator('.thumbnails .thumbnail');
  await expect(products).toHaveCount(0);

  // 3. Немає старих результатів
  await expect(page.locator('.prdocutname')).toHaveCount(0);

  // 4. Сторінка в нормальному стані
  await expect(page.locator('#maincontainer')).toBeVisible();
});
