const { expect } = require('@playwright/test');
class BreadcrumbsPage {
  constructor(page) {
    this.page = page;
    this.breadcrumb = page.locator('.breadcrumb');
  }

  async checkBreadcrumbContains(text) {
    await expect(this.breadcrumb).toContainText(text);
  }
}

module.exports = { BreadcrumbsPage };