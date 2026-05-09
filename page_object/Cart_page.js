class CartPage {
  
  constructor(page) {
    this.page = page;

    this.cartItems      = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async getCartItemNames() {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async isProductInCart(productName) {
    return await this.page
      .locator('.inventory_item_name', { hasText: productName })
      .isVisible();
  }
}

module.exports = { CartPage };