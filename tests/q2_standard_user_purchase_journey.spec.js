const { test, expect }       = require('@playwright/test');
const { LoginPage }          = require('../page_object/Login_page');
const { InventoryPage }      = require('../page_object/Inventory_page');
const { CartPage }           = require('../page_object/Cart_page');
const { CheckoutPage }       = require('../page_object/Checkout_page');
const { OrderCompletePage }  = require('../page_object/Order_page');
const { USERS, CHECKOUT_INFO, Q2_PRODUCTS, MESSAGES, URLS } = require('../page_object/Users');

test.describe('Q2 — Standard User Full Purchase Journey', () => {

  test(
    'standard_user: reset → add 3 items → checkout → verify names & total → finish → reset → logout',
    {
      annotation: [
        { type: 'Feature',  description: 'E2E Purchase' },
        { type: 'Story',    description: 'standard_user completes a 3-item purchase' },
        { type: 'Severity', description: 'blocker' },
      ],
    },
    async ({ page }) => {

      const loginPage         = new LoginPage(page);
      const inventoryPage     = new InventoryPage(page);
      const cartPage          = new CartPage(page);
      const checkoutPage      = new CheckoutPage(page);
      const orderCompletePage = new OrderCompletePage(page);

      await test.step('Login as standard_user', async () => {
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        await expect(page).toHaveURL(URLS.inventory);
        console.log('Logged in as standard_user');
      });

      await test.step('Reset App State via hamburger menu (before adding items)', async () => {
        await inventoryPage.resetAppState();
        await expect(inventoryPage.cartBadge).toHaveCount(0);
        console.log('App State reset — cart is empty');
      });

      const addedPrices = [];

      for (const productName of Q2_PRODUCTS) {
        await test.step(`Add "${productName}" to cart`, async () => {
          const price = await inventoryPage.addProductToCartByName(productName);
          addedPrices.push(price);
          console.log('Added: ${productName}  →  $${price}');
        });
      }

      await test.step('Verify cart badge displays count 3', async () => {
        await expect(inventoryPage.cartBadge).toHaveText('3');
      });

      await test.step('Navigate to cart and verify all 3 products are present', async () => {
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(URLS.cart);
        for (const name of Q2_PRODUCTS) {
          expect(await cartPage.isProductInCart(name)).toBeTruthy();
          console.log('Confirmed in cart: ${name}');
        }
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

      await test.step('Verify all 3 product names on checkout overview page', async () => {
        await expect(page).toHaveURL(URLS.checkoutTwo);
        for (const name of Q2_PRODUCTS) {
          expect(await checkoutPage.isProductOnOverview(name)).toBeTruthy();
          console.log('Verified on overview: ${name}');
        }
      });

      await test.step('Verify item subtotal, tax, and grand total prices', async () => {
        const expectedSubtotal = parseFloat(
          addedPrices.reduce((s, p) => s + p, 0).toFixed(2)
        );
        const subtotal = await checkoutPage.getSubtotal();
        const tax      = await checkoutPage.getTax();
        const total    = await checkoutPage.getTotal();

        console.log('  Item total  : $${subtotal}');
        console.log('  Tax         : $${tax}');
        console.log('  Grand total : $${total}');

        expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
        expect(total).toBeCloseTo(subtotal + tax, 2);
      });

      await test.step('Click Finish to complete the purchase', async () => {
        await checkoutPage.clickFinish();
        await expect(page).toHaveURL(URLS.complete);
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
        await expect(page).toHaveURL(URLS.login);
        await expect(loginPage.loginButton).toBeVisible();
        console.log('Logged out successfully');
      });

    }
  );

});