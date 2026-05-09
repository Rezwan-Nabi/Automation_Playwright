const { test, expect }       = require('@playwright/test');
const { LoginPage }          = require('../page_object/Login_page');
const { InventoryPage }      = require('../page_object/Inventory_page');
const { CartPage }           = require('../page_object/Cart_page');
const { CheckoutPage }       = require('../page_object/Checkout_page');
const { OrderCompletePage }  = require('../page_object/Order_page');
const { USERS, CHECKOUT_INFO, MESSAGES, URLS } = require('../page_Object/Users');

test.describe('Q3 — Performance Glitch User: Filter Z→A & Purchase', () => {

  test.setTimeout(120_000);

  test(
    'performance_glitch_user: reset → sort Z→A → add first item → checkout → verify → finish → reset → logout',
    {
      annotation: [
        { type: 'Feature',  description: 'E2E Purchase' },
        { type: 'Story',    description: 'performance_glitch_user purchases the Z→A first product' },
        { type: 'Severity', description: 'critical' },
      ],
    },
    async ({ page }) => {

      const loginPage         = new LoginPage(page);
      const inventoryPage     = new InventoryPage(page);
      const cartPage          = new CartPage(page);
      const checkoutPage      = new CheckoutPage(page);
      const orderCompletePage = new OrderCompletePage(page);

      await test.step('Login as performance_glitch_user', async () => {
        await loginPage.login(USERS.glitch.username, USERS.glitch.password);
        await expect(page).toHaveURL(URLS.inventory, { timeout: 25_000 });
        console.log('Logged in as performance_glitch_user');
      });

      await test.step('Reset App State via hamburger menu', async () => {
        await inventoryPage.resetAppState();
        await expect(inventoryPage.cartBadge).toHaveCount(0);
        console.log('App State reset — cart is empty');
      });

      await test.step('Apply sort filter: Name (Z to A)', async () => {
        await inventoryPage.sortBy('za');
        await expect(inventoryPage.sortDropdown).toHaveValue('za');
        console.log('Sort applied: Z to A');
      });

      
      let firstProduct = { name: '', price: 0 };

      await test.step('Read and add the first product from Z→A sorted list', async () => {
        firstProduct = await inventoryPage.addFirstProductToCart();
        console.log('First product (Z→A): "${firstProduct.name}" → $${firstProduct.price}');
        await expect(inventoryPage.cartBadge).toHaveText('1');
      });

      await test.step('Navigate to cart and verify the product is present', async () => {
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(URLS.cart);
        expect(await cartPage.isProductInCart(firstProduct.name)).toBeTruthy();
        console.log('"${firstProduct.name}" confirmed in cart');
      });

      await test.step('Click Checkout and fill personal information', async () => {
        await cartPage.clickCheckout();
        await expect(page).toHaveURL(URLS.checkoutOne);
        await checkoutPage.fillAndContinue(
          CHECKOUT_INFO.firstName,
          CHECKOUT_INFO.lastName,
          CHECKOUT_INFO.zip
        );
      });

      await test.step('Verify product name on checkout overview page', async () => {
        await expect(page).toHaveURL(URLS.checkoutTwo, { timeout: 20_000 });
        expect(await checkoutPage.isProductOnOverview(firstProduct.name)).toBeTruthy();
        console.log('Product verified on overview: "${firstProduct.name}"');
      });

      await test.step('Verify item subtotal, tax, and grand total on overview', async () => {
        const subtotal = await checkoutPage.getSubtotal();
        const tax      = await checkoutPage.getTax();
        const total    = await checkoutPage.getTotal();

        console.log('  Item total  : $${subtotal}');
        console.log('  Tax         : $${tax}');
        console.log('  Grand total : $${total}');

        expect(subtotal).toBeCloseTo(firstProduct.price, 2);
        expect(total).toBeCloseTo(subtotal + tax, 2);
      });

      await test.step('Click Finish to complete the purchase', async () => {
        await checkoutPage.clickFinish();
        await expect(page).toHaveURL(URLS.complete, { timeout: 25_000 });
      });

      await test.step('Verify "Thank you for your order!" success message', async () => {
        await expect(orderCompletePage.completeHeader).toBeVisible();
        await expect(orderCompletePage.completeHeader).toHaveText(MESSAGES.orderSuccess);
        await expect(orderCompletePage.completeText).toContainText(MESSAGES.orderDispatched);
        console.log('Success message verified');
      });

      await test.step('Reset App State via hamburger menu (after purchase)', async () => {
        await inventoryPage.resetAppState();
        console.log('App State reset after purchase');
      });

      await test.step('Logout via hamburger menu', async () => {
        await inventoryPage.logout();
        await expect(page).toHaveURL(URLS.login, { timeout: 20_000 });
        await expect(loginPage.loginButton).toBeVisible();
        console.log('Logged out successfully');
      });

    }
  );

});