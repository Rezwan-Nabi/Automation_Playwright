# Project Overview

This project contains automated test scenarios for the website  
https://www.saucedemo.com/

The automation framework was developed using Playwright with JavaScript to validate login functionality, cart operations, checkout process, product verification, and successful order completion workflow.

The project supports:

- Running individual test cases
- Running all test scenarios sequentially
- Allure report generation after every execution

---

# Technologies Used

- Language: JavaScript
- Automation Tool: Playwright
- Test Runner: Playwright Test
- Reporting Tool: Allure Report
- Design Pattern: Page Object Model (POM)
- Package Manager: Node.js / npm

---

# Test Scenarios

## Q1 – Locked User Login Validation

### Steps:

1. Navigate to SauceDemo website
2. Login using:
   - Username: `locked_out_user`
   - Password: `secret_sauce`
3. Verify the error message

### Expected Result:

User should see the following error message:

```text
Sorry, this user has been locked out.
```

---

## Q2 – Standard User Purchase Flow

### Steps:

1. Login using `standard_user`
2. Reset App State from the hamburger menu
3. Add any three items to the cart
4. Navigate to checkout
5. Verify:
   - Product names
   - Total price
6. Finish the checkout process
7. Verify successful order message
8. Reset App State again
9. Logout successfully

### Expected Result:

Order should complete successfully and confirmation message should appear.

---

## Q3 – Performance Glitch User Flow

### Steps:

1. Login using `performance_glitch_user`
2. Reset App State
3. Filter products by `Name (Z to A)`
4. Add the first product to the cart
5. Navigate to checkout
6. Verify:
   - Product name
   - Total price
7. Complete the checkout process
8. Verify successful order message
9. Reset App State again
10. Logout successfully

### Expected Result:

Purchase should complete successfully even with delayed performance.

---

# Run All Test Scenarios

```bash
npx playwright test
```

---

# Run Individual Test Files

## Run Q1

```bash
npx playwright test tests/q1.spec.js
```

## Run Q2

```bash
npx playwright test tests/q2.spec.js
```

## Run Q3

```bash
npx playwright test tests/q3.spec.js
```

---

# Generate Allure Report

## Generate Report

```bash
allure generate ./allure-results --clean
```

## Open Report

```bash
allure open ./allure-report
```

OR

```bash
allure serve allure-results
```

---

# Author

Md Rezwan Nabi
