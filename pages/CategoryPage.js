const { expect } = require('@playwright/test');
class CategoryPage {
  constructor(page) {
    this.page = page;
    this.productsGrid = page.locator('.thumbnails.grid.row.list-inline');
    this.sortDropdown = page.locator('#sort');
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

async getAllProductNames() {
  const products = this.productsGrid.locator('.prdocutname');
  await products.first().waitFor({ state: 'visible', timeout: 10000 });
  
  return await products.allInnerTexts();
}

  async selectRandomProduct() {
    const products = this.productsGrid.locator('div.col-md-3');
    const count = await products.count();
    const index = Math.floor(Math.random() * count);
    const product = products.nth(index);
    const name = await product.locator('.prdocutname').innerText();
    await product.locator('.prdocutname').click();
    return name;
  }
}

module.exports = { CategoryPage };