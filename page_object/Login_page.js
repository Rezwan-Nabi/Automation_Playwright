class LoginPage {
  
  constructor(page) {
    this.page = page;
 
    this.usernameInput  = page.locator('#user-name');
    this.passwordInput  = page.locator('#password');
    this.loginButton    = page.locator('#login-button');
    this.errorContainer = page.locator('[data-test="error"]');
    this.errorDismissBtn= page.locator('[data-test="error"] button');
  }
 
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.loginButton.waitFor({ state: 'visible' });
  }
 
  async enterUsername(username) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }
 
  async enterPassword(password) {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }
 
  async clickLogin() {
    await this.loginButton.click();
  }
 
  async login(username, password) {
    await this.goto();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
 
  async dismissError() {
    await this.errorDismissBtn.click();
  }
 
  async getErrorMessage() {
    return await this.errorContainer.innerText();
  }
 
  async isErrorVisible() {
    return await this.errorContainer.isVisible();
  }
 
  async isErrorHidden() {
    return await this.errorContainer.isHidden();
  }
}
 
module.exports = { LoginPage };
 