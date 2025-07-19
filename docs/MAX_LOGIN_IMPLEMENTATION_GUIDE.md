# MAX Login Implementation Guide

## Overview
This document describes the implementation of MAX application login functionality with digital plus test credentials in the auto-coder framework.

## Files Created/Modified

### 1. MAX Login Page Object
**File**: `/Users/arog/framework/auto-coder/support/max-login.js`

**Purpose**: Handles all login-related operations for MAX application
**Key Features**:
- Navigate to MAX application
- Perform login with digital plus test credentials
- Verify login success
- Handle login errors
- Form validation

**Key Methods**:
- `navigateTo(url)` - Navigate to MAX application URL
- `performMAXLogin(username, password)` - Execute login flow
- `verifyLoginSuccess()` - Confirm successful authentication
- `isLoginFormPresent()` - Check if login form is available
- `getLoginError()` - Retrieve any error messages

### 2. MAX Login Step Definitions
**File**: `/Users/arog/framework/auto-coder/support/steps/max-login-steps.js`

**Purpose**: Cucumber step definitions for MAX login scenarios
**Key Steps**:
- `Given RunOnboarding client is logged into MAX with digitalplus test credentials`
- `Given I navigate to MAX application`
- `When I enter MAX login credentials with username {string} and password {string}`
- `Then I should be successfully logged into MAX application`
- `Then I should see the MAX login form`
- `Then the page title should contain {string}`

### 3. MAX Login Feature Template
**File**: `/Users/arog/framework/auto-coder/templates/features/max-login.feature`

**Purpose**: Sample feature file demonstrating MAX login scenarios
**Test Scenarios**:
- Successful login with digital plus credentials
- Login form verification
- Manual login with different credentials
- Page verification after login

### 4. Configuration Update
**File**: `/Users/arog/framework/auto-coder/web.config.json`

**Added Environment**: `max-digitalplus`
**Configuration**:
- Base URL for MAX application
- Authentication credentials
- Selector mappings for login elements

## Locators Used

Following the SBS_Automation pattern, these locators are defined for MAX login:

```javascript
const USERNAME = By.css('#login-form_username');
const PASSWORD = By.css('#login-form_password');
const VERIFY_USERID_BUTTON = By.css('#verifUseridBtn, #btnNext');
const REMIND_ME_LATER_BUTTON = By.xpath("//*[text() = 'Remind me later']");
const SIGN_IN_BUTTON = By.css('#signBtn, #btnNext');
```

## Usage Instructions

### 1. Basic Login Step
Use this step in your feature files to login with digital plus credentials:

```gherkin
Given RunOnboarding client is logged into MAX with digitalplus test credentials
```

### 2. Configuration Setup
Update the `web.config.json` file with your actual MAX application details:

```json
"max-digitalplus": {
  "baseUrl": "https://your-max-application.com",
  "auth": {
    "username": "your_digitalplus_username",
    "password": "your_digitalplus_password"
  }
}
```

### 3. Environment Selection
Set the environment to use MAX configuration:

```bash
export TEST_ENV=max-digitalplus
```

### 4. Running Tests
Execute tests with MAX login functionality:

```bash
./auto-coder.sh test generated/tests/your-max-test.js
```

## Integration with Auto-Coder Framework

### How it Works
1. **Configuration Loading**: The framework loads MAX-specific configuration from `web.config.json`
2. **Page Object Instantiation**: `MaxLoginPage` is created with the current browser page
3. **Navigation**: System navigates to the configured MAX application URL
4. **Authentication**: Login credentials are entered and form is submitted
5. **Verification**: System confirms successful authentication
6. **Test Execution**: Your auto-generated tests run against the authenticated session

### Step Implementation Pattern
Following SBS_Automation patterns:
- Timeout of 180 seconds for login operations
- No try-catch blocks (errors bubble up naturally)
- Simple, direct assertions using `assert` module
- Page object instantiation within step functions
- Proper error messages for failed assertions

### Error Handling
- Login failures throw descriptive error messages
- Form validation errors are captured and reported
- Network timeouts are handled with appropriate wait strategies
- Post-login verification prevents false positives

## Customization

### Updating Locators
If your MAX application uses different selectors, update them in `/Users/arog/framework/auto-coder/support/max-login.js`:

```javascript
// Update these constants with your actual selectors
const USERNAME = By.css('your-username-selector');
const PASSWORD = By.css('your-password-selector');
// ... etc
```

### Adding New Login Methods
Extend the `MaxLoginPage` class with additional methods:

```javascript
async performAdvancedLogin() {
    // Your custom login logic
}
```

### Environment-Specific Configuration
Add different MAX environments in `web.config.json`:

```json
"max-production": {
  "baseUrl": "https://max-prod.yourcompany.com",
  // ... configuration
},
"max-staging": {
  "baseUrl": "https://max-staging.yourcompany.com",
  // ... configuration
}
```

## Best Practices

1. **Selector Reliability**: Use stable selectors (IDs, data attributes) over fragile ones (text, position)
2. **Wait Strategies**: Implement proper waits for dynamic content loading
3. **Error Handling**: Provide clear, actionable error messages
4. **Configuration**: Keep environment-specific data in configuration files
5. **Reusability**: Design page objects for maximum reuse across different test scenarios

## Troubleshooting

### Common Issues
1. **Login Form Not Found**: Check if selectors match your application
2. **Timeout Errors**: Increase timeout values for slow-loading applications
3. **Authentication Failures**: Verify credentials in configuration
4. **Navigation Issues**: Ensure base URL is correct and accessible

### Debug Tips
1. Use browser developer tools to inspect actual selectors
2. Add temporary console.log statements for debugging (remove in production)
3. Take screenshots on failures for visual debugging
4. Check network requests for API-based authentication

## Next Steps

1. Update the actual MAX application URL in configuration
2. Replace placeholder credentials with real digital plus test credentials
3. Verify and update selectors based on your actual MAX application
4. Test the login functionality in your environment
5. Create additional test scenarios as needed

This implementation provides a solid foundation for MAX application testing within your auto-coder framework while following established SBS_Automation patterns.
