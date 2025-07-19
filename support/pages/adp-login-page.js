/**
 * ADP Login Page - Handles ADP authentication
 * Specific implementation for ADP IAT environment
 */

const ConfigLoader = require('../config-loader.js');
const AuthenticationHelper = require('../auth-helper.js');

class ADPLoginPage {
    constructor(page) {
        this.page = page;
        this.configLoader = new ConfigLoader();
        this.authHelper = new AuthenticationHelper();
        
        // ADP-specific selectors (will be updated after inspecting actual page)
        this.selectors = {
            usernameField: 'input[name="user"], input[id="user"], #username, input[type="email"]',
            passwordField: 'input[name="password"], input[id="password"], input[type="password"]',
            loginButton: 'button[type="submit"], input[type="submit"], .signin-button, .login-btn, button:has-text("Sign In")',
            errorMessage: '.error, .alert-danger, .login-error, .error-message',
            loadingIndicator: '.loading, .spinner, .progress',
            forgotPasswordLink: 'a[href*="forgot"], .forgot-password'
        };
        
        this.config = this.configLoader.getConfig();
        this.authConfig = this.configLoader.getAuthConfig();
    }

    /**
     * Navigate to ADP login page
     */
    async navigate() {
        const loginUrl = this.configLoader.getBaseUrl();
        console.log(`🔗 Navigating to ADP login page: ${loginUrl}`);
        
        try {
            await this.page.goto(loginUrl, { 
                waitUntil: 'networkidle', 
                timeout: 60000 
            });
            console.log('✅ Successfully navigated to ADP login page');
            
            // Wait for page to be ready
            await this.waitForPageLoad();
            
        } catch (error) {
            console.error(`❌ Failed to navigate to ADP login page: ${error.message}`);
            throw error;
        }
    }

    /**
     * Wait for ADP page to load completely
     */
    async waitForPageLoad() {
        try {
            // Wait for login form elements to appear
            await this.page.waitForSelector(this.selectors.usernameField, { 
                timeout: 30000 
            });
            console.log('✅ ADP login form loaded');
            
            // Wait for any loading indicators to disappear
            await this.page.waitForFunction(() => {
                const loadingElements = document.querySelectorAll('.loading, .spinner, .progress');
                return loadingElements.length === 0 || 
                       Array.from(loadingElements).every(el => el.style.display === 'none');
            }, { timeout: 10000 }).catch(() => {
                console.log('ℹ️  No loading indicators found or they persisted');
            });
            
        } catch (error) {
            console.warn(`⚠️  Page load wait failed: ${error.message}`);
            // Continue anyway - the page might still be functional
        }
    }

    /**
     * Perform ADP login
     */
    async login(username = null, password = null) {
        const user = username || this.authConfig.username;
        const pass = password || this.authConfig.password;

        console.log(`🔑 Attempting ADP login with username: ${user}`);

        try {
            // Take screenshot before login
            await this.takeScreenshot('adp-before-login');

            // Fill username field
            console.log('📧 Filling username field...');
            await this.page.waitForSelector(this.selectors.usernameField, { timeout: 10000 });
            await this.page.fill(this.selectors.usernameField, user);
            console.log('✅ Username filled');
            
            // Fill password field
            console.log('🔑 Filling password field...');
            await this.page.waitForSelector(this.selectors.passwordField, { timeout: 10000 });
            await this.page.fill(this.selectors.passwordField, pass);
            console.log('✅ Password filled');
            
            // Take screenshot after filling credentials
            await this.takeScreenshot('adp-credentials-filled');
            
            // Click login button
            console.log('🚀 Clicking login button...');
            await this.page.click(this.selectors.loginButton);
            console.log('✅ Login button clicked');
            
            // Wait for navigation or error
            await this.handlePostLoginNavigation();
            
            return true;
            
        } catch (error) {
            console.error(`❌ ADP login failed: ${error.message}`);
            
            // Take screenshot for debugging
            await this.takeScreenshot('adp-login-error');
            
            // Check for specific error messages
            await this.checkForErrorMessages();
            
            throw error;
        }
    }

    /**
     * Handle navigation after login attempt
     */
    async handlePostLoginNavigation() {
        console.log('⏳ Waiting for post-login navigation...');
        
        try {
            // Wait for URL change or specific success indicators
            await Promise.race([
                // Wait for URL to change (successful login)
                this.page.waitForFunction(() => 
                    !window.location.href.includes('signin'), 
                    { timeout: 30000 }
                ),
                // Wait for error message (failed login)
                this.page.waitForSelector(this.selectors.errorMessage, { 
                    timeout: 10000 
                }).then(() => Promise.reject(new Error('Login error detected'))),
                // Wait for potential redirect
                this.page.waitForNavigation({ 
                    waitUntil: 'networkidle', 
                    timeout: 30000 
                })
            ]);
            
            console.log('✅ Post-login navigation completed');
            
            // Take screenshot of successful login
            await this.takeScreenshot('adp-login-success');
            
            const currentUrl = this.page.url();
            console.log(`🌐 Current URL after login: ${currentUrl}`);
            
        } catch (error) {
            console.warn(`⚠️  Post-login navigation issue: ${error.message}`);
            
            // Check current URL to determine if login was actually successful
            const currentUrl = this.page.url();
            if (!currentUrl.includes('signin')) {
                console.log('✅ Login appears successful despite navigation warning');
                return;
            }
            
            throw new Error('Login failed - still on signin page');
        }
    }

    /**
     * Check for error messages on the page
     */
    async checkForErrorMessages() {
        try {
            const errorElement = await this.page.$(this.selectors.errorMessage);
            if (errorElement) {
                const errorText = await errorElement.textContent();
                console.error(`🚨 ADP Login Error: ${errorText}`);
                return errorText;
            }
        } catch (error) {
            // No error message found
        }
        return null;
    }

    /**
     * Check if already logged in
     */
    async isLoggedIn() {
        try {
            const currentUrl = this.page.url();
            console.log(`🔍 Checking login status. Current URL: ${currentUrl}`);
            
            // If we're not on a signin page, likely logged in
            if (!currentUrl.includes('signin') && !currentUrl.includes('login')) {
                console.log('✅ User appears to be logged in');
                return true;
            }
            
            return false;
        } catch (error) {
            console.warn(`⚠️  Login status check failed: ${error.message}`);
            return false;
        }
    }

    /**
     * Take screenshot for debugging
     */
    async takeScreenshot(name = 'adp-screenshot') {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = `generated/reports/screenshots/${name}-${timestamp}.png`;
            await this.page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
            return screenshotPath;
        } catch (error) {
            console.warn(`⚠️  Screenshot failed: ${error.message}`);
        }
    }

    /**
     * Get page title for debugging
     */
    async getPageTitle() {
        try {
            const title = await this.page.title();
            console.log(`📄 Page title: ${title}`);
            return title;
        } catch (error) {
            console.warn(`⚠️  Could not get page title: ${error.message}`);
            return '';
        }
    }

    /**
     * Wait for specific element with enhanced logging
     */
    async waitForElement(selector, timeout = 10000) {
        console.log(`⏳ Waiting for element: ${selector}`);
        try {
            await this.page.waitForSelector(selector, { timeout });
            console.log(`✅ Element found: ${selector}`);
            return true;
        } catch (error) {
            console.error(`❌ Element not found: ${selector} (${error.message})`);
            return false;
        }
    }
}

module.exports = ADPLoginPage;
