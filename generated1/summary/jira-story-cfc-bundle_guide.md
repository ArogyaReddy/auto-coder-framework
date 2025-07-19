# CFC Bundle Provisioning - Locator Update Guide

## Overview

This guide provides detailed instructions for updating placeholder locators in the generated CFC Bundle test artifacts with real application selectors.

## Current Status: ⚠️ LOCATORS NEED UPDATING

The generated test artifacts contain placeholder selectors that must be replaced with actual application locators before the tests can run successfully against your real application.

## Files Requiring Locator Updates

### Primary File: `jira-story-cfc-bundle-page.js`

**Location**: `/Users/arog/framework/auto-coder-framework/generated/pages/jira-story-cfc-bundle-page.js`

## Locator Categories & Update Instructions

### 1. Authentication & Navigation Locators

#### Login Elements

```javascript
// CURRENT PLACEHOLDERS (Lines 8-10)
const LOGIN_USERNAME_INPUT = By.css("input[data-testid='username-input']");
const LOGIN_PASSWORD_INPUT = By.css("input[data-testid='password-input']");
const LOGIN_SUBMIT_BUTTON = By.css("button[data-testid='login-submit']");

// UPDATE WITH YOUR APPLICATION'S ACTUAL SELECTORS:
// Examples of what to look for:
// - input[name="username"] or #usernameField
// - input[type="password"] or #passwordField
// - button[type="submit"] or .login-button
```

#### Navigation Elements

```javascript
// CURRENT PLACEHOLDERS (Lines 11-12)
const PROVISIONING_NAV_MENU = By.css("nav[data-testid='provisioning-menu']");
const ORDER_PROVISIONING_LINK = By.css(
  "a[data-testid='order-provisioning-link']"
);

// UPDATE WITH YOUR APPLICATION'S ACTUAL SELECTORS:
// Examples: .main-navigation, #provisioningMenu, a[href*='provisioning']
```

### 2. Order Management Locators

#### Order Creation Elements

```javascript
// CURRENT PLACEHOLDERS (Lines 13-16)
const CREATE_ORDER_BUTTON = By.css("button[data-testid='create-order-button']");
const ESO_ORDER_TYPE = By.css("select[data-testid='order-type-select']");
const BUNDLE_SELECTION_AREA = By.css(
  "div[data-testid='bundle-selection-area']"
);
const CFC_BUNDLE_CHECKBOX = By.css("input[data-testid='cfc-bundle-checkbox']");

// UPDATE INSTRUCTIONS:
// 1. Find the "Create Order" or "New Order" button
// 2. Locate the order type dropdown/select element
// 3. Find the bundle selection container/form area
// 4. Identify the CFC bundle checkbox or selection control
```

#### Bundle Configuration Elements

```javascript
// CURRENT PLACEHOLDERS (Lines 17-19)
const MAJOR_BUNDLE_DROPDOWN = By.css(
  "select[data-testid='major-bundle-dropdown']"
);
const ADD_BUNDLE_BUTTON = By.css("button[data-testid='add-bundle-button']");
const EXECUTE_PROVISIONING_BUTTON = By.css(
  "button[data-testid='execute-provisioning-button']"
);

// CRITICAL ELEMENTS TO FIND:
// - Dropdown for selecting bundle types (ADP Essential, HR PRO, etc.)
// - Button to add selected bundles to order
// - Button to start/execute the provisioning process
```

### 3. Status & Verification Locators

#### Provisioning Status Elements

```javascript
// CURRENT PLACEHOLDERS (Lines 20-22)
const PROVISIONING_STATUS = By.css("div[data-testid='provisioning-status']");
const COMPONENT_STATUS_INDICATOR = By.css(
  "span[data-testid='component-status-indicator']"
);
const BUNDLE_STATUS_DISPLAY = By.css(
  "div[data-testid='bundle-status-display']"
);

// WHAT TO LOOK FOR:
// - Status messages showing "In Progress", "Completed", "Success"
// - Component availability indicators ("Available", "Activated")
// - Bundle status displays showing current bundle states
```

### 4. Context & Property Verification Locators

#### Installation Context Elements

```javascript
// CURRENT PLACEHOLDERS (Lines 23-25)
const INSTALLATION_CONTEXT_LINK = By.css(
  "a[data-testid='installation-context-link']"
);
const AVAILABLE_BUNDLES_PROPERTY = By.css(
  "span[data-testid='available-bundles-property']"
);
const REQUIRE_ACTIVATION_PROPERTY = By.css(
  "span[data-testid='require-activation-property']"
);

// CRITICAL FOR TESTING:
// These verify the new properties mentioned in requirements:
// - availableBundles property in installation context
// - RequireActivation property configuration
// - Property values and states
```

### 5. Task Management Locators

#### Task & Todo Elements

```javascript
// CURRENT PLACEHOLDERS (Lines 26-27)
const TODO_TASKS_LINK = By.css("a[data-testid='todo-tasks-link']");
const CFC_TASK_ITEM = By.css("li[data-testid='cfc-task-item']");

// REQUIREMENTS VERIFICATION:
// - Navigate to to-do tasks or task list page
// - Find CFC-specific tasks created during provisioning
// - Verify task shows "component available" status
```

## Step-by-Step Locator Update Process

### Step 1: Setup Development Environment

1. Ensure your application is running in development mode
2. Open browser developer tools (F12)
3. Have the generated page object file open for editing

### Step 2: Login & Navigation Locators

1. Navigate to your application's login page
2. Right-click username field → Inspect Element
3. Look for stable attributes:
   - `data-testid` (preferred)
   - `name` attribute
   - `id` attribute
   - CSS classes (if component-specific)
4. Update `LOGIN_USERNAME_INPUT` with actual selector

**Example Process:**

```html
<!-- If you see this in your app: -->
<input name="username" class="form-control" id="loginUsername" />

<!-- Update the locator to: -->
const LOGIN_USERNAME_INPUT = By.css("input[name='username']"); // or const
LOGIN_USERNAME_INPUT = By.css("#loginUsername");
```

### Step 3: Order Provisioning Locators

1. Navigate to Order Provisioning section
2. Identify all bundle-related elements:
   - Order creation buttons
   - Bundle selection controls
   - Bundle type dropdowns
   - Provisioning execution buttons

### Step 4: Status Verification Locators

1. Execute a sample provisioning process
2. Observe status messages and indicators
3. Note the selectors for:
   - Provisioning progress/status
   - Component availability states
   - Bundle status displays

### Step 5: Context Property Locators

1. Navigate to Installation Context or System Configuration
2. Find where the new properties are displayed:
   - `availableBundles` property
   - `RequireActivation` property
   - Bundle state information

## Locator Selection Best Practices

### Priority Order for Selector Types

1. **data-testid attributes** (Most Reliable)

   ```javascript
   By.css("[data-testid='specific-element']");
   ```

2. **Unique IDs** (If stable)

   ```javascript
   By.css("#uniqueElementId");
   ```

3. **Name attributes** (For form elements)

   ```javascript
   By.css("input[name='fieldName']");
   ```

4. **Component-specific CSS classes**

   ```javascript
   By.css(".component-specific-class");
   ```

5. **XPath** (Last resort)
   ```javascript
   By.xpath("//button[contains(text(),'Execute Provisioning')]");
   ```

### Selectors to Avoid

- Index-based selectors: `:nth-child(3)`
- Generic class names: `.button`, `.form-control`
- Position-dependent XPath: `//div[1]/span[2]`
- Text-dependent selectors (unless text is guaranteed stable)

## Testing Your Locator Updates

### Quick Validation Method

```javascript
// Test in browser console:
document.querySelector("your-selector-here");
// Should return the element (not null)

// Test multiple elements:
document.querySelectorAll("your-selector-here");
// Should return expected number of elements
```

### Step-by-Step Validation

1. Update 3-5 locators at a time
2. Run a quick test: `./auto-coder.sh run generated/tests/jira-story-cfc-bundle-test.js`
3. Check which locators are still failing
4. Continue updating remaining selectors
5. Repeat until all critical locators work

## Critical Locators for Core Functionality

### High Priority (Must Fix First)

- Login elements (blocks all other tests)
- Navigation to order provisioning
- Order creation and bundle selection
- Provisioning execution button
- Status/completion indicators

### Medium Priority

- Installation context navigation
- Property verification elements
- Task creation and display
- Bundle status displays

### Low Priority

- Error handling elements
- Secondary verification points
- Logging and audit trail elements

## Expected Test Behavior After Updates

### Before Locator Updates

- ❌ All tests fail with "Element not found" errors
- ❌ Cannot interact with application elements
- ❌ Tests timeout waiting for non-existent selectors

### After Correct Locator Updates

- ✅ Tests can navigate and interact with application
- ✅ Can verify CFC bundle provisioning functionality
- ✅ Can validate property creation and context updates
- ⚠️ May still fail on business logic issues (this is expected and valuable)

## Troubleshooting Common Issues

### Issue: Element Found But Not Interactable

**Cause**: Element is present but hidden, disabled, or covered
**Solution**:

- Check element visibility: `await page.isVisible(selector)`
- Wait for element state: `await page.waitForSelector(selector, {state: 'visible'})`
- Check for overlaying elements

### Issue: Selector Works in Console But Not in Test

**Cause**: Timing issues or dynamic content loading
**Solution**:

- Add explicit waits: `await page.waitForSelector(selector)`
- Wait for network requests: `await page.waitForLoadState('networkidle')`
- Use more specific selectors

### Issue: Test Passes But Doesn't Actually Verify Functionality

**Cause**: Locators point to wrong elements or verification logic is incorrect
**Solution**:

- Manually verify the elements do what they should
- Check element text content and attributes
- Validate that interactions produce expected results

## Integration with SBS_Automation Framework

After updating locators and verifying tests work:

1. **Copy working files to SBS_Automation:**

   ```bash
   cp generated/features/jira-story-cfc-bundle.feature /path/to/SBS_Automation/features/
   cp generated/steps/jira-story-cfc-bundle-steps.js /path/to/SBS_Automation/steps/
   cp generated/pages/jira-story-cfc-bundle-page.js /path/to/SBS_Automation/pages/
   ```

2. **Update import paths if necessary**
3. **Run within SBS_Automation test suite**
4. **Integrate with existing CI/CD pipelines**

## Maintenance Notes

### Regular Updates Required

- UI changes will break locators
- New features may require additional selectors
- Bundle types and workflows may change

### Monitoring Points

- Test execution success rates
- New element identification failures
- Performance issues with complex selectors

---

**Remember**: The goal is not just to make tests pass, but to create reliable, maintainable automated tests that accurately verify the CFC Bundle provisioning functionality described in the original JIRA story.

**Next Steps**:

1. Start with login and navigation locators
2. Move to order creation and bundle selection
3. Focus on provisioning execution and status verification
4. Complete with context property and task verification
5. Test complete workflows end-to-end
