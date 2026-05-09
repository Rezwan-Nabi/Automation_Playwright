class CheckoutPage { 
   
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput  = page.locator('[data-test="lastName"]');
    this.postalCodeInput= page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton   = page.locator('[data-test="cancel"]');
    this.summaryItems    = page.locator('.inventory_item_name');
    this.subtotalLabel   = page.locator('.summary_subtotal_label');
    this.taxLabel        = page.locator('.summary_tax_label');
    this.totalLabel      = page.locator('.summary_total_label');
    this.finishButton    = page.locator('[data-test="finish"]');
  }

  async fillPersonalInfo(firstName, lastName, zip) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zip);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async fillAndContinue(firstName, lastName, zip) {
    await this.fillPersonalInfo(firstName, lastName, zip);
    await this.clickContinue();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async getProductNames() {
    return await this.summaryItems.allInnerTexts();
  }

  async getSubtotal() {
    const text = await this.subtotalLabel.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getTax() {
    const text = await this.taxLabel.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getTotal() {
    const text = await this.totalLabel.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async isProductOnOverview(productName) {
    return await this.page
      .locator('.inventory_item_name', { hasText: productName })
      .isVisible();
  }
}

module.exports = { CheckoutPage };