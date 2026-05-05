const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test('Task 1: Vyhľadanie produktu a nákup', async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.searchProduct('Skin');

    // Select a product
    await product.selectProductByName('Skinsheen Bronzer Stick');
    
    // Check product details
    await expect(product.productName).toBeVisible();
    // await expect(product.productPrice).toBeVisible();
    
    // Add to cart
    await product.addToCart();

    // Check in the header
    await home.hoverCart();
    const cartProduct = page.locator('#top_cart_product_list').getByRole('cell', { name: 'Skinsheen Bronzer Stick' });
    await expect(cartProduct).toBeVisible();

    // Check in the cart
    await cart.goto();
    const cartRow = cart.row(1);
    await expect(cartRow.name).toContainText('Skinsheen Bronzer Stick');
    // await expect(cartRow.unitPrice).toContainText(await product.getProductPrice());

    // Deletting the product from the cart
    await cart.row(1).remove.click();
    await expect(page.getByText('Your shopping cart is empty!')).toBeVisible();
});