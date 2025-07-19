/**
 * MAX Login Page - Digital Plus Test Credentials
 * Handles authentication for MAX application with digital plus test credentials
 * Based on SBS_Automation framework patterns
 */

const By = require('../By');
const helpers = require('../helpers');
const BasePage = require('./base-page');

// MAX Login Locators for ADP
const USERNAME = By.css('#USER');  // ADP username field
const PASSWORD = By.css('#PASSWORD');  // ADP password field
const USERNAME_SDF = By.css('sdf-input[name="user-id"]');  // ADP custom username element
const PASSWORD_SDF = By.css('sdf-input[name="password"]');  // ADP custom password element
const USERNAME_INPUT = By.css('#USER, sdf-input[name="user-id"] input, sdf-input[name="user-id"]');
const PASSWORD_INPUT = By.css('#PASSWORD, sdf-input[name="password"] input, sdf-input[name="password"]');
const VERIFY_USERID_BUTTON = By.css('#verifUseridBtn, #btnNext');
const REMIND_ME_LATER_BUTTON = By.xpath("//*[text() = 'Remind me later']");
const SIGN_IN_BUTTON = By.css('#signBtn, #btnNext');

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
            await this.page.waitForTimeout(2000);
            
            // Handle ADP custom sdf-input elements for username
            console.log('🔍 Looking for username field...');
            await this.fillCustomInput(USERNAME_INPUT, username, 'username');
            
            // Small delay between username and proceeding
            await this.page.waitForTimeout(1000);
            
            // Click verify user ID button (Next button) - it should be enabled now
            const verifyButton = this.page.locator(VERIFY_USERID_BUTTON);
            if (await verifyButton.isVisible()) {
                console.log('🔘 Clicking Next/Verify button...');
                await verifyButton.click();
                await this.page.waitForTimeout(2000);
                
                // Wait for password field to appear
                await this.page.waitForLoadState('load');
                await this.page.waitForTimeout(2000);
                
                // Handle password field if it appears on next screen
                console.log('🔍 Looking for password field...');
                await this.fillCustomInput(PASSWORD_INPUT, password, 'password');
                
                // Click sign in button
                const signInButton = this.page.locator(SIGN_IN_BUTTON);
                if (await signInButton.isVisible()) {
                    console.log('🔘 Clicking Sign In button...');
                    await signInButton.click();
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
     * Fill custom ADP sdf-input elements with fallback methods
     * @param {string} selector - CSS selector for the input
     * @param {string} value - Value to fill
     * @param {string} fieldName - Name for logging
     */
    async fillCustomInput(selector, value, fieldName) {
        try {
            const element = this.page.locator(selector).first();
            
            if (await element.isVisible()) {
                console.log(`📝 Filling ${fieldName} field...`);
                
                // Method 1: Try standard fill
                try {
                    await element.fill(value);
                    console.log(`✅ Standard fill worked for ${fieldName}`);
                    return;
                } catch (fillError) {
                    console.log(`⚠️ Standard fill failed for ${fieldName}, trying alternatives...`);
                }
                
                // Method 2: Try click and type
                try {
                    await element.click();
                    await this.page.keyboard.type(value);
                    console.log(`✅ Click and type worked for ${fieldName}`);
                    return;
                } catch (typeError) {
                    console.log(`⚠️ Click and type failed for ${fieldName}, trying direct input...`);
                }
                
                // Method 3: Try finding inner input element
                try {
                    const innerInput = this.page.locator(`${selector} input`).first();
                    if (await innerInput.isVisible()) {
                        await innerInput.fill(value);
                        console.log(`✅ Inner input fill worked for ${fieldName}`);
                        return;
                    }
                } catch (innerError) {
                    console.log(`⚠️ Inner input method failed for ${fieldName}`);
                }
                
                // Method 4: Force evaluation for sdf-input
                try {
                    await element.evaluate((el, val) => {
                        if (el.value !== undefined) {
                            el.value = val;
                        }
                        if (el.setAttribute) {
                            el.setAttribute('value', val);
                        }
                        // Trigger change event
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                    }, value);
                    console.log(`✅ Direct evaluation worked for ${fieldName}`);
                    return;
                } catch (evalError) {
                    console.log(`⚠️ Direct evaluation failed for ${fieldName}:`, evalError.message);
                }
                
                console.log(`❌ All methods failed for ${fieldName}`);
                throw new Error(`Could not fill ${fieldName} field with any method`);
            } else {
                throw new Error(`${fieldName} field not visible`);
            }
        } catch (error) {
            throw new Error(`Failed to fill ${fieldName}: ${error.message}`);
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
