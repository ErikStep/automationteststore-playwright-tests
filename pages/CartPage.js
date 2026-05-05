const { expect } = require('@playwright/test');
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartRows = page.locator('div.container-fluid.cart-info.product-list table tbody tr');
  }

  async goto() {
    await this.page.goto('https://automationteststore.com/index.php?rt=checkout/cart');
  }

  async getRowCount() {
    return await this.cartRows.count();
  }

  row(n) {
    return {
      name: this.cartRows.nth(n).locator('td:nth-child(2) a'),
      unitPrice: this.cartRows.nth(n).locator('td:nth-child(4)'),
      quantity: this.cartRows.nth(n).locator('input[name*="quantity"]'),
      total: this.cartRows.nth(n).locator('td:nth-child(6)'),
      remove: this.cartRows.nth(n).locator('a[class="btn btn-sm btn-default"]'),
    };
  }
}

module.exports = { CartPage };