const { test, expect } = require('@playwright/test');

test('Task 2: Kategórie + filtrácia', async ({ page }) => {
    await page.goto('https://automationteststore.com/');

    // 1. Skincare
    await page.getByRole('link', { name: 'Skincare' }).click();

    // 2. Products
    const products = page.locator('div[class="thumbnails grid row list-inline"]');
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);

    // 3. Sort By Name A–Z
    await page.locator('#sort').selectOption('pd.name-ASC');

    // 4. Verify sorting
    await products.first().waitFor({ state: 'visible' });
    const names = await products.locator('.prdocutname').allInnerTexts();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);

    // 5. Random product and detail verification
    const productElements = products.locator('div.col-md-3'); // Всі окремі продукти
    const count = await productElements.count();
    const index = Math.floor(Math.random() * count);

    // Вибираємо конкретний продукт
    const product = productElements.nth(index);
    const productNameLocator = product.locator('div.fixed_wrapper div.fixed a.prdocutname');
    const listName = await productNameLocator.innerText();

    await productNameLocator.click();

    const detailName = await page.locator('h1.productname').innerText();
    expect(detailName.trim().toLowerCase()).toContain(listName.trim().toLowerCase());
});
