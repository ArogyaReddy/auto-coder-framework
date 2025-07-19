# Understanding Mock Implementations and Converting to Real UI Automation

Let me explain in detail how the mock implementations work in the auto-coder, and how you can transform them into real UI automation with proper locators and Playwright/Selenium calls.

## Mock Implementation: Behind the Scenes

The auto-coder currently generates test artifacts that use mock implementations instead of real UI interactions. Let's examine a concrete example using the CFC Bundle test we worked with: Let's also look at the steps file to understand how these mocked methods are used: Now, let's see how this would look with real Playwright implementation using actual UI locators:

## Example: Converting Mock Implementation to Real Playwright Automation

Here's how you would convert the mock implementation to use real Playwright automation:

### Step 1: Update the Page Object Class Constructor

```javascript
class CFCBundlePage {
  /**
   * Constructor for the CFC Bundle page object
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    
    // Define locators for the elements on the page
    this.locators = {
      // Navigation
      orderSetupButton: 'button[data-testid="order-setup"]',
      provisionButton: 'button[data-testid="provision-order"]',
      
      // Bundles
      bundleSelector: '.bundle-selector',
      bundleOption: (name) => `//li[contains(@class, "bundle-option") and contains(text(), "${name}")]`,
      cfcBundleCheckbox: 'input[data-testid="cfc-bundle-checkbox"]',
      
      // Order components
      orderComponentsList: '.order-components-list',
      componentItem: (name) => `.component-item[data-name="${name}"]`,
      activationToggle: '.activation-toggle',
      
      // Tasks
      tasksList: '.tasks-list',
      taskItem: (name) => `//li[contains(@class, "task-item") and contains(text(), "${name}")]`,
      
      // Context menu
      contextMenu: '.installation-context-menu',
      contextProperty: (name) => `.context-property[data-name="${name}"]`,
    };
  }

  // Rest of the class methods...
}
```

### Step 2: Convert Each Method to Use Real UI Interactions

Let's convert some key methods:

```javascript
/**
 * Sets up the ESO order for provisioning
 */
async setupESOOrderProvisioning() {
  // Navigate to order setup page
  await this.page.goto('/order-setup');
  
  // Verify the page loaded correctly
  await this.page.waitForSelector(this.locators.orderSetupButton);
  
  // Click the order setup button
  await this.page.click(this.locators.orderSetupButton);
  
  console.log('Setting up ESO order for provisioning');
}

/**
 * Adds a major bundle to the ESO order
 * @param {string} bundleName - Name of the major bundle to add
 */
async addMajorBundleToOrder(bundleName) {
  // Open bundle selector
  await this.page.click(this.locators.bundleSelector);
  
  // Select specific bundle from dropdown
  await this.page.click(this.locators.bundleOption(bundleName));
  
  // Wait for bundle to be added to the list
  await this.page.waitForSelector(
    this.locators.componentItem(bundleName)
  );
  
  console.log(`Added ${bundleName} bundle to ESO order`);
}

/**
 * Verifies that CFC bundle was added without activation
 */
async verifyCFCBundleAddedWithoutActivation() {
  // Wait for CFC bundle to appear in components list
  await this.page.waitForSelector(this.locators.componentItem('CFC'));
  
  // Check if component is visible (available)
  const isAvailable = await this.page.isVisible(this.locators.componentItem('CFC'));
  
  // Check if activation toggle is off
  const activationToggle = await this.page.$(this.locators.activationToggle);
  const isActivated = await activationToggle.isChecked();
  
  const result = isAvailable && !isActivated;
  console.log(`CFC bundle added without activation: ${result}`);
  
  // Assert the condition is true
  if (!result) {
    throw new Error('CFC bundle was not added without activation as expected');
  }
  
  return result;
}
```

### Step 3: Update the Steps File

To work with Playwright, you'll need to update the step definitions to handle the async nature of browser automation:

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CFCBundlePage = require('../pages/jira-story-cfc-bundle-page');

// Initialize the page in the World context
Given('the ESO order is being provisioned', async function() {
  this.cfcBundlePage = new CFCBundlePage(this.page);
  await this.cfcBundlePage.setupESOOrderProvisioning();
});

Given('the installation context is configured', async function() {
  await this.cfcBundlePage.configureInstallationContext();
});

// Scenario steps
Given('an ESO order contains {string} bundle', async function(bundleName) {
  await this.cfcBundlePage.addMajorBundleToOrder(bundleName);
});

// ... other step definitions

Then('the CFC bundle should be added without activation', async function() {
  await this.cfcBundlePage.verifyCFCBundleAddedWithoutActivation();
  
  // Additional assertions using Playwright's expect
  const cfcComponent = await this.page.$(this.cfcBundlePage.locators.componentItem('CFC'));
  expect(cfcComponent).not.toBeNull();
  
  const activationToggle = await this.page.$(this.cfcBundlePage.locators.activationToggle);
  expect(await activationToggle.isChecked()).toBeFalsy();
});
```

### Step 4: Update the World.js Setup

For Playwright to work correctly with Cucumber, you need to update the World.js file: The world.js file is already set up correctly for Playwright. This is where the browser context is initialized, which your page objects will use.

## Finding and Adding Real Locators

### 1. Identifying Element Locators

To find the right locators for elements in your application, you can use several strategies:

#### Using Browser DevTools

1. Open your application in Chrome or Firefox
2. Right-click on the element you want to interact with
3. Select "Inspect" or "Inspect Element"
4. In the Elements panel, right-click on the highlighted HTML and select "Copy" > "Copy selector" for a CSS selector
5. For XPath, right-click and select "Copy" > "Copy XPath"

#### Using Playwright Inspector

Playwright has a built-in element inspector:

```javascript
// Add this to a script for one-time use
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://your-application-url.com');
  
  // Open the inspector - this will pause execution and let you select elements
  await page.pause();
  
  // After you're done, continue execution and close the browser
  await browser.close();
})();
```

#### Best Practices for Selecting Locators (In Order of Preference)

1. **data-testid attributes** (most reliable): `[data-testid="login-button"]`
2. **Accessible selectors** (good practice): `[aria-label="Search"]`, `button[role="tab"]`
3. **CSS ID selectors** (if unique): `#login-button`
4. **CSS Class selectors** (if specific): `.primary-button.submit-form`
5. **Element attributes** (with unique values): `[name="username"]`
6. **Text content** (using XPath): `//button[contains(text(), "Login")]`
7. **Complex relationships** (last resort): `div.form-group > button:nth-child(2)`

### 2. Where to Add Locators in the Code

Locators should be defined in a central place in your page object:

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Define all locators in one place for easy maintenance
    this.locators = {
      // Form fields
      usernameInput: '[data-testid="username-input"]',
      passwordInput: '[data-testid="password-input"]',
      
      // Buttons
      loginButton: 'button[data-testid="login-button"]',
      forgotPasswordLink: 'a[data-testid="forgot-password"]',
      
      // Messages
      errorMessage: '.error-message',
      successMessage: '.success-message'
    };
  }
  
  // Methods use the locators defined above
  async login(username, password) {
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.loginButton);
  }
  
  async getErrorMessage() {
    return await this.page.textContent(this.locators.errorMessage);
  }
}
```

## Complete Example: Converting a Mock Test to Real Playwright Test

Let's take the CFC Bundle page and convert it to use real Playwright automation:

### Original Mock Implementation

```javascript
// Mock implementation
class CFCBundlePage {
  constructor() {
    this.order = {
      bundles: [],
      hasCFCBundle: false
    };
    this.installationContext = {};
    this.componentState = {
      available: false,
      activated: false
    };
    this.tasks = [];
  }
  
  addCFCBundle() {
    // Implementation to add CFC bundle
    this.componentState.available = true;
    this.componentState.activated = false;
    console.log('CFC bundle added without activation');
  }
  
  verifyCFCBundleAddedWithoutActivation() {
    // Implementation to verify CFC bundle added without activation
    const result = this.componentState.available && !this.componentState.activated;
    console.log(`CFC bundle added without activation: ${result}`);
    return result;
  }
}
```

### Real Playwright Implementation

```javascript
// Real implementation with Playwright
class CFCBundlePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    
    // Base URL for navigation
    this.baseUrl = 'https://your-application-url.com';
    
    // Define locators for all UI elements
    this.locators = {
      // Navigation elements
      orderSetupPage: '/order-setup',
      orderManagementTab: '[data-testid="order-management-tab"]',
      
      // Bundle selection elements
      bundleSelector: '.bundle-selector-dropdown',
      bundleOption: (name) => `//li[contains(@class, "bundle-option") and contains(text(), "${name}")]`,
      cfcBundleCheckbox: 'input[data-testid="cfc-bundle-checkbox"]',
      addBundleButton: '[data-testid="add-bundle-btn"]',
      
      // Order components
      orderComponentsList: '.order-components-list',
      cfcComponent: '[data-testid="cfc-component"]',
      componentActivationToggle: '[data-testid="activation-toggle"]',
      
      // Provisioning elements
      provisionButton: '[data-testid="provision-btn"]',
      provisionStatus: '.provision-status',
      
      // Task elements
      tasksList: '.tasks-list',
      cfcTask: '[data-testid="cfc-task"]',
      
      // Context menu elements
      contextPropertiesSection: '.context-properties',
      availableBundlesProperty: '[data-property="availableBundles"]'
    };
  }
  
  /**
   * Navigate to the order setup page
   */
  async navigateToOrderSetup() {
    await this.page.goto(`${this.baseUrl}${this.locators.orderSetupPage}`);
    await this.page.click(this.locators.orderManagementTab);
    
    // Wait for page to load completely
    await this.page.waitForSelector(this.locators.bundleSelector, { state: 'visible' });
  }
  
  /**
   * Sets up the ESO order for provisioning
   */
  async setupESOOrderProvisioning() {
    await this.navigateToOrderSetup();
    console.log('Setting up ESO order for provisioning');
  }
  
  /**
   * Configures the installation context
   */
  async configureInstallationContext() {
    // Click on context configuration button or tab
    await this.page.click('[data-testid="configure-context"]');
    
    // Set required context properties
    await this.page.click('[data-testid="require-activation-toggle"]');
    
    console.log('Installation context configured');
  }
  
  /**
   * Adds a major bundle to the ESO order
   * @param {string} bundleName - Name of the major bundle to add
   */
  async addMajorBundleToOrder(bundleName) {
    // Click bundle selector dropdown
    await this.page.click(this.locators.bundleSelector);
    
    // Wait for dropdown to open
    await this.page.waitForSelector(this.locators.bundleOption(bundleName), { state: 'visible' });
    
    // Select the bundle by name
    await this.page.click(this.locators.bundleOption(bundleName));
    
    // Click add button
    await this.page.click(this.locators.addBundleButton);
    
    // Wait for bundle to be added to the list
    await this.page.waitForSelector(`[data-testid="bundle-${bundleName}"]`, { state: 'visible' });
    
    console.log(`Added ${bundleName} bundle to ESO order`);
  }
  
  /**
   * Adds CFC bundle
   */
  async addCFCBundle() {
    // Check if CFC bundle checkbox exists
    const cfcCheckbox = await this.page.$(this.locators.cfcBundleCheckbox);
    
    // If checkbox exists and not checked, click it
    if (cfcCheckbox) {
      const isChecked = await cfcCheckbox.isChecked();
      if (!isChecked) {
        await cfcCheckbox.check();
      }
    } else {
      // Alternative: select from bundle list if not a checkbox
      await this.page.click(this.locators.bundleSelector);
      await this.page.click(this.locators.bundleOption('CFC'));
      await this.page.click(this.locators.addBundleButton);
    }
    
    // Wait for CFC component to appear in the list
    await this.page.waitForSelector(this.locators.cfcComponent);
    
    console.log('CFC bundle added without activation');
  }
  
  /**
   * Provisions the order
   */
  async provisionOrder() {
    // Click provision button
    await this.page.click(this.locators.provisionButton);
    
    // Wait for provisioning to complete
    await this.page.waitForSelector(this.locators.provisionStatus, { 
      state: 'visible',
      text: /completed|success/i 
    });
    
    console.log('Order provisioned');
  }
  
  /**
   * Verifies that CFC bundle was added without activation
   */
  async verifyCFCBundleAddedWithoutActivation() {
    // Wait for CFC component to be visible
    await this.page.waitForSelector(this.locators.cfcComponent, { state: 'visible' });
    
    // Check if component is visible (available)
    const isAvailable = await this.page.isVisible(this.locators.cfcComponent);
    
    // Get the activation toggle element
    const activationToggle = await this.page.$(this.locators.componentActivationToggle);
    
    // Check if the toggle is checked/activated
    const isActivated = await activationToggle.isChecked();
    
    const result = isAvailable && !isActivated;
    console.log(`CFC bundle added without activation: ${result}`);
    
    // Assertion
    if (!result) {
      throw new Error('CFC bundle was either not available or was activated');
    }
    
    return result;
  }
  
  /**
   * Verifies that CFC task was created
   */
  async verifyCFCTaskCreated() {
    // Wait for tasks list to be visible
    await this.page.waitForSelector(this.locators.tasksList);
    
    // Check if CFC task exists in the list
    const cfcTask = await this.page.$(this.locators.cfcTask);
    const result = cfcTask !== null;
    
    console.log(`CFC task created: ${result}`);
    
    // Assertion
    if (!result) {
      throw new Error('CFC task was not created');
    }
    
    return result;
  }
}

module.exports = CFCBundlePage;
```

## Steps to Integrate Real Tests with the SBS_Automation Framework

### 1. Update the World.js File (if needed)

The world.js file in the SBS_Automation framework already has the browser setup. You'll need to make sure your page objects receive the `page` object from the world context.

### 2. Update the Step Definition Files

Your step definition files need to be updated to use the real page objects:

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the ESO order is being provisioned', async function() {
  // 'this' refers to the World instance
  if (!this.cfcBundlePage) {
    const CFCBundlePage = require('../pages/jira-story-cfc-bundle-page');
    this.cfcBundlePage = new CFCBundlePage(this.page);
  }
  
  await this.cfcBundlePage.setupESOOrderProvisioning();
});

// ... other step definitions
```

### 3. Run the Tests Using the SBS_Automation Framework

Once you've updated your page objects and step definitions, you can run the tests using the SBS_Automation framework's test runner:

```bash
node index.js generated/features/jira-story-cfc-bundle.feature
```

## Tips for Converting Mock Tests to Real Tests

1. **Start with a template**: Create a template page object with real Playwright code that you can reuse across multiple page objects.

2. **Use data attributes**: Ask your developers to add `data-testid` attributes to elements for stable locators.

3. **Group related locators**: Organize your locators by feature or area of the page.

4. **Add waiting mechanisms**: Always wait for elements to be visible or enabled before interacting with them.

5. **Add error handling**: Use try-catch blocks for operations that might fail and provide meaningful error messages.

6. **Handle state transitions**: Wait for application state changes (like loading indicators appearing and disappearing).

7. **Validate real conditions**: Check actual UI states rather than just verifying the operations were performed.

8. **Use parameterized methods**: Create reusable methods that accept parameters to handle similar operations with different data.

## Example of a Template Page Object

Here's a template you can use as a starting point for converting page objects:

```javascript
/**
 * Base Page Object template for real UI automation with Playwright
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://your-application-url.com';
  }
  
  /**
   * Navigate to a specific path
   * @param {string} path - Path to navigate to
   */
  async navigate(path) {
    await this.page.goto(`${this.baseUrl}${path}`);
  }
  
  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { 
      state: 'visible', 
      timeout 
    });
  }
  
  /**
   * Click an element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }
  
  /**
   * Fill a form field
   * @param {string} selector - Input selector
   * @param {string} value - Value to enter
   */
  async fill(selector, value) {
    await this.waitForElement(selector);
    await this.page.fill(selector, value);
  }
  
  /**
   * Check if element exists
   * @param {string} selector - Element selector
   */
  async elementExists(selector) {
    const element = await this.page.$(selector);
    return element !== null;
  }
  
  /**
   * Get element text content
   * @param {string} selector - Element selector
   */
  async getText(selector) {
    await this.waitForElement(selector);
    return await this.page.textContent(selector);
  }
  
  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ 
      path: `./test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }
}

module.exports = BasePage;
```

Then each page object can extend this base class:

```javascript
const BasePage = require('./base-page');

class CFCBundlePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators specific to this page
    this.locators = {
      // ... locators here ...
    };
  }
  
  // Methods specific to this page
  async setupESOOrderProvisioning() {
    await this.navigate('/order-setup');
    await this.click(this.locators.orderManagementTab);
  }
  
  // ... other methods ...
}

module.exports = CFCBundlePage;
```

## Conclusion

Converting the mock tests to real UI automation requires:

1. Updating page objects to use actual Playwright methods with real locators
2. Modifying step definitions to handle asynchronous operations
3. Ensuring the World context provides the page object to your steps
4. Adding proper waiting and error handling mechanisms

The mock tests were designed to simulate UI interaction without actually performing it, which is why they pass despite not having real locators. By replacing these mock implementations with real Playwright code and proper locators, you'll create tests that actually interact with and validate your application's UI.

Would you like me to provide additional examples or clarification on any specific part of this process?

Similar code found with 1 license type