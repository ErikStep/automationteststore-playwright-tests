const { expect } = require('@playwright/test');
class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search Keywords' });
    this.searchButton = page.getByTitle('Go');
    this.topCart = page.locator('.block_7');
  }

  async goto() {
    await this.page.goto('https://automationteststore.com/');
  }

  async searchProduct(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async goToCategory(categoryName) {
    await this.page.getByRole('link', { name: categoryName }).click();
  }

  async hoverCart() {
    await this.topCart.hover();
  }
}

module.exports = { HomePage };