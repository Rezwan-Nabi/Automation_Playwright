class InventoryPage {
  
  constructor(page) {
    this.page = page;

    this.burgerMenuBtn   = page.locator('#react-burger-menu-btn');
    this.burgerMenu      = page.locator('.bm-menu-wrap');
    this.resetStateLink  = page.locator('#reset_sidebar_link');
    this.logoutLink      = page.locator('#logout_sidebar_link');
    this.closeBurgerBtn  = page.locator('#react-burger-cross-btn');
    this.cartBadge       = page.locator('.shopping_cart_badge');
    this.cartLink        = page.locator('.shopping_cart_link');
    this.sortDropdown    = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems  = page.locator('.inventory_item');
  }

  async openBurgerMenu() {
    await this.burgerMenuBtn.click();
    await this.burgerMenu.waitFor({ state: 'visible' });
  }

  async closeBurgerMenu() {
    await this.closeBurgerBtn.click();
    await this.burgerMenu.waitFor({ state: 'hidden' });
  }

  async resetAppState() {
    await this.openBurgerMenu();
    await this.resetStateLink.click();
    await this.closeBurgerMenu();
  }

  async logout() {
    await this.openBurgerMenu();
    await this.logoutLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartCount() {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    return parseInt(await this.cartBadge.innerText());
  }

  async addProductToCartByName(productName) {
    const card = this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
    const priceText = await card.locator('.inventory_item_price').innerText();
    await card.locator('button[data-test^="add-to-cart"]').click();
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  async addFirstProductToCart() {
    
    await this.page.waitForTimeout(1200);
    const firstCard  = this.inventoryItems.first();
    const name       = await firstCard.locator('.inventory_item_name').innerText();
    const priceText  = await firstCard.locator('.inventory_item_price').innerText();
    const price      = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    await firstCard.locator('button[data-test^="add-to-cart"]').click();
    return { name, price };
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }
}

module.exports = { InventoryPage };