const { expect } = require('@playwright/test');
class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartLink = page.getByRole('link', { name: 'Add to Cart' });
    this.productName = page.locator('h1.productname');
    this.productPrice = page.locator('.productpageprice .productfilneprice, .productpageprice .price');
    this.productsGrid = page.locator('.thumbnails.grid.row.list-inline');
  }

  async selectProductByName(name) {
    const product = this.page.locator('.prdocutname', { hasText: name }).first();
    await product.click();
  }

  async getProductName() {
    return await this.productName.innerText();
  }

  async getProductPrice() {
    return await this.productPrice.first().innerText();
  }

  async addToCart() {
    await this.addToCartLink.click();
  }

  async getAllProductNamesFromGrid() {
    return await this.productsGrid.locator('.prdocutname').allInnerTexts();
  }

  async selectRandomProductFromGrid() {
    const products = this.productsGrid.locator('div.col-md-3');
    const count = await products.count();
    const index = Math.floor(Math.random() * count);
    const product = products.nth(index);
    const name = await product.locator('.prdocutname').innerText();
    await product.locator('.prdocutname').click();
    return name;
  }
}

module.exports = { ProductPage };