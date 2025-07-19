/**
 * MAX Login Page - Digital Plus Test Credentials
 * Handles authentication for MAX application with digital plus test credentials
 * Based on SBS_Automation framework patterns
 */

const By = require('../By');
const helpers = require('../helpers');
const BasePage = require('./base-page');

// MAX Login Locators for ADP - Multiple selector strategies
const USERNAME_SELECTORS = [
    '#USER',
    'input[name="user"]', 
    'input[name="username"]',
    'input[name="userId"]',
    'input[name="USER"]',
    'input[type="text"]',
    'input[type="email"]',
    'sdf-input[name="user-id"]',
    'sdf-input[name="username"]',
    'sdf-input input',
    '[data-testid="username"]',
    '[data-testid="user-id"]',
    '.username-input',
    '.user-input'
];

const PASSWORD_SELECTORS = [
    '#PASSWORD',
    'input[name="password"]',
    'input[name="PASSWORD"]', 
    'input[type="password"]',
    'sdf-input[name="password"]',
    'sdf-input[type="password"]',
    '[data-testid="password"]',
    '.password-input'
];

const VERIFY_USERID_BUTTON = By.css('#verifUseridBtn, #btnNext, button[type="submit"], .submit-btn, .next-btn');
const REMIND_ME_LATER_BUTTON = By.xpath("//*[text() = 'Remind me later']");
const SIGN_IN_BUTTON = By.css('#signBtn, #btnNext, button[type="submit"], .signin-btn, .login-btn');

class MaxLoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    /**
     * Navigate to the MAX application URL
     * @param {string} url - Application URL from configuration
     */
    async navigateTo(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    /**
     * Perform MAX login with digital plus test credentials
     * @param {string} username - Login username
     * @param {string} password - Login password
     */
    async performMAXLogin(username, password) {
        try {
            // Wait for login page to load
            await this.page.waitForLoadState('load');
            await this.page.waitForTimeout(3000);
            
            console.log('🔍 Looking for username field with multiple strategies...');
            const usernameField = await this.findInputField(USERNAME_SELECTORS, 'username');
            if (usernameField) {
                await this.fillInputField(usernameField, username, 'username');
                
                // Small delay between username and proceeding
                await this.page.waitForTimeout(1000);
                
                // Click verify user ID button (Next button) - it should be enabled now
                console.log('🔘 Looking for Next/Verify button...');
                const verifyButton = this.page.locator(VERIFY_USERID_BUTTON);
                if (await verifyButton.isVisible()) {
                    console.log('🔘 Clicking Next/Verify button...');
                    await verifyButton.click();
                    await this.page.waitForTimeout(3000);
                    
                    // Wait for next screen and password field
                    await this.page.waitForLoadState('load');
                    await this.page.waitForTimeout(2000);
                    
                    // Look for password field
                    console.log('🔍 Looking for password field...');
                    const passwordField = await this.findInputField(PASSWORD_SELECTORS, 'password');
                    if (passwordField) {
                        await this.fillInputField(passwordField, password, 'password');
                        
                        // Click sign in button
                        const signInButton = this.page.locator(SIGN_IN_BUTTON);
                        if (await signInButton.isVisible()) {
                            console.log('🔘 Clicking Sign In button...');
                            await signInButton.click();
                            await this.page.waitForTimeout(2000);
                        }
                    }
                }
            }
            
            // Handle "Remind me later" button if present
            const remindLaterButton = this.page.locator(REMIND_ME_LATER_BUTTON);
            if (await remindLaterButton.isVisible()) {
                await remindLaterButton.click();
                await this.page.waitForTimeout(1000);
            }
            
            // Wait for navigation after login
            await this.page.waitForLoadState('networkidle', { timeout: 30000 });
            
            console.log('✅ Login process completed');
            return true;
            
        } catch (error) {
            console.log('❌ Login failed:', error.message);
            throw new Error(`MAX login failed: ${error.message}`);
        }
    }

    /**
     * Find an input field using multiple selector strategies
     * @param {Array} selectors - Array of CSS selectors to try
     * @param {string} fieldName - Name of the field for logging
     */
    async findInputField(selectors, fieldName) {
        for (const selector of selectors) {
            try {
                const element = this.page.locator(selector).first();
                if (await element.isVisible()) {
                    console.log(`✅ Found ${fieldName} field with selector: ${selector}`);
                    return element;
                }
            } catch (error) {
                // Continue to next selector
                continue;
            }
        }
        
        console.log(`❌ Could not find ${fieldName} field with any selector`);
        return null;
    }

    /**
     * Fill an input field using multiple methods
     * @param {object} element - Playwright locator
     * @param {string} value - Value to fill
     * @param {string} fieldName - Name for logging
     */
    async fillInputField(element, value, fieldName) {
        console.log(`📝 Filling ${fieldName} field...`);
        
        // Method 1: Standard fill
        try {
            await element.fill(value);
            console.log(`✅ Standard fill worked for ${fieldName}`);
            return;
        } catch (fillError) {
            console.log(`⚠️ Standard fill failed for ${fieldName}, trying alternatives...`);
        }
        
        // Method 2: Clear and type
        try {
            await element.click();
            await element.clear();
            await element.type(value);
            console.log(`✅ Clear and type worked for ${fieldName}`);
            return;
        } catch (typeError) {
            console.log(`⚠️ Clear and type failed for ${fieldName}, trying click and keyboard...`);
        }
        
        // Method 3: Click and keyboard
        try {
            await element.click();
            await this.page.keyboard.type(value);
            console.log(`✅ Click and keyboard worked for ${fieldName}`);
            return;
        } catch (keyboardError) {
            console.log(`⚠️ Click and keyboard failed for ${fieldName}, trying evaluation...`);
        }
        
        // Method 4: JavaScript evaluation
        try {
            await element.evaluate((el, val) => {
                if (el.value !== undefined) {
                    el.value = val;
                }
                if (el.setAttribute) {
                    el.setAttribute('value', val);
                }
                // Trigger events
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
                el.dispatchEvent(new Event('blur', { bubbles: true }));
            }, value);
            console.log(`✅ JavaScript evaluation worked for ${fieldName}`);
            return;
        } catch (evalError) {
            console.log(`❌ All methods failed for ${fieldName}:`, evalError.message);
            throw new Error(`Could not fill ${fieldName} field`);
        }
    }

    /**
     * Verify if login was successful by checking for post-login elements
     */
    async verifyLoginSuccess() {
        try {
            // Wait for post-login navigation or specific elements
            await this.page.waitForTimeout(3000);
            
            // Check if we're redirected from login page (basic verification)
            const currentUrl = this.page.url();
            const isLoginPage = currentUrl.includes('login') || currentUrl.includes('signin');
            
            return !isLoginPage;
            
        } catch (error) {
            return false;
        }
    }

    /**
     * Get current page title for verification
     */
    async getPageTitle() {
        return await this.page.title();
    }

    /**
     * Check if login form is present
     */
    async isLoginFormPresent() {
        try {
            const usernameField = await this.page.locator(USERNAME_INPUT);
            const passwordField = await this.page.locator(PASSWORD_INPUT);
            
            return await usernameField.isVisible() || await passwordField.isVisible();
        } catch (error) {
            return false;
        }
    }

    /**
     * Handle any login errors
     */
    async getLoginError() {
        try {
            // Common error selectors
            const errorSelectors = [
                '.error-message',
                '.alert-danger',
                '.login-error',
                '[class*="error"]',
                '[class*="invalid"]'
            ];
            
            for (const selector of errorSelectors) {
                const errorElement = await this.page.locator(selector);
                if (await errorElement.isVisible()) {
                    return await errorElement.textContent();
                }
            }
            
            return null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = MaxLoginPage;
