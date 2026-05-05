const { test, expect } = require('@playwright/test');

test('Task 4: Breadcrumbs + URL', async ({ page }) => {
    await page.goto('https://automationteststore.com/');

    // 1. Fragrance
    await page.getByRole('link', { name: 'Fragrance' }).click();

    // 2. Men
    await page.locator('#maincontainer').getByRole('link', { name: 'Men', exact: true }).click();

    // 3. Breadcrumb
    const breadcrumb = page.locator('.breadcrumb');
    await expect(breadcrumb).toContainText('Home');
    await expect(breadcrumb).toContainText('Fragrance');
    await expect(breadcrumb).toContainText('Men');

    // 4. URL pattern
    expect(page.url()).toContain('category&path=49');
    expect(page.url().toLowerCase()).toContain('category&path=49_51');

    // 5. Back via breadcrumb
    await page.getByRole('link', { name: 'Fragrance' }).nth(1).click();

    // 6. "Verify that we are back in the Fragrance category
    await expect(breadcrumb).toContainText('Fragrance');
    await expect(page.locator('#maincontainer').getByText('Men Women')).toBeVisible();
});
