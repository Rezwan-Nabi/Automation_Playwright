class OrderCompletePage {

  constructor(page) {
    this.page = page;

    this.completeHeader   = page.locator('[data-test="complete-header"]');
    this.completeText     = page.locator('[data-test="complete-text"]');
    this.backHomeButton   = page.locator('[data-test="back-to-products"]');
    //this.ponyExpressImage = page.locator('.pony_express');
  }

  async clickBackToHome() {
    await this.backHomeButton.click();
  }

  async getHeaderText() {
    return await this.completeHeader.innerText();
  }

  async getBodyText() {
    return await this.completeText.innerText();
  }

  async isSuccessVisible() {
    return await this.completeHeader.isVisible();
  }
}

module.exports = { OrderCompletePage };