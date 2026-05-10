Project Overview

This project contains automated test scenarios for the website
SauceDemo

The automation framework was developed using Playwright with JavaScript to validate login functionality, cart operations, checkout process, product verification, and successful order completion workflow.

The project supports:

Running individual test cases
Running all test scenarios sequentially
Allure report generation after every execution
Technologies Used
Language: JavaScript
Automation Tool: Playwright
Test Runner: Playwright Test
Reporting Tool: Allure Report
Design Pattern: Page Object Model (POM)
Package Manager: Node.js / npm
Test Scenarios
Q1 – Locked User Login Validation
Steps:
Navigate to SauceDemo website
Login using:
Username: locked_out_user
Password: secret_sauce
Verify the error message
Expected Result:

User should see the following error message:

"Sorry, this user has been locked out."

Q2 – Standard User Purchase Flow
Steps:
Login using standard_user
Reset App State from the hamburger menu
Add any three items to the cart
Navigate to checkout
Verify:
Product names
Total price
Finish the checkout process
Verify successful order message
Reset App State again
Logout successfully
Expected Result:

Order should complete successfully and confirmation message should appear.

Q3 – Performance Glitch User Flow
Steps:
Login using performance_glitch_user
Reset App State
Filter products by Name (Z to A)
Add the first product to the cart
Navigate to checkout
Verify:
Product name
Total price
Complete the checkout process
Verify successful order message
Reset App State again
Logout successfully
Expected Result:

Purchase should complete successfully even with delayed performance.

Run All Test Scenarios

npx playwright test

Author

Md Rezwan Nabi
