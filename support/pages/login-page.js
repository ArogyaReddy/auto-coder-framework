/**
 * Login Page - SBS_Automation Integration
 * Handles authentication for the SBS application
 */

const ConfigLoader = require('../config-loader.js');
const AuthenticationHelper = require('../auth-helper.js');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.configLoader = new ConfigLoader();
        this.authHelper = new AuthenticationHelper();
        
        // Selectors for login form (customize based on actual application)
        this.selectors = {
            usernameField: 'input[name="email"], input[name="username"], input[type="email"], #email, #username',
            passwordField: 'input[name="password"], input[type="password"], #password',
            loginButton: 'button[type="submit"], input[type="submit"], .login-button, .btn-login',
            errorMessage: '.error-message, .alert-danger, .login-error',
            forgotPasswordLink: 'a[href*="forgot"], .forgot-password'
        };
    }

    /**
     * Navigate to the login page
     */
    async navigate() {
        const loginUrl = this.authHelper.getLoginUrl();
        console.log(`🔗 Navigating to login page: ${loginUrl}`);
        await this.page.goto(loginUrl, { waitUntil: 'networkidle', timeout: 30000 });
        await this.page.waitForSelector(this.selectors.usernameField, { timeout: 10000 });
    }

    /**
     * Perform login with credentials
     */
    async login(username = null, password = null) {
        const credentials = this.authHelper.getCredentials();
        const user = username || credentials.username;
        const pass = password || credentials.password;

        console.log(`🔑 Logging in with username: ${user}`);

        // Fill username
        await this.page.fill(this.selectors.usernameField, user);
        
        // Fill password
        await this.page.fill(this.selectors.passwordField, pass);
        
        // Click login button
        await this.page.click(this.selectors.loginButton);
        
        // Wait for navigation or error
        try {
            await this.page.waitForURL(this.configLoader.getBaseUrl(), { timeout: 15000 });
            console.log('✅ Login successful');
            return true;
        } catch (error) {
            console.warn('⚠️  Login may have failed or redirected differently');
            
            // Check for error messages
            const errorVisible = await this.page.isVisible(this.selectors.errorMessage);
            if (errorVisible) {
                const errorText = await this.page.textContent(this.selectors.errorMessage);
                console.error(`❌ Login error: ${errorText}`);
                return false;
            }
            
            return true; // Assume success if no error message
        }
    }

    /**
     * Check if user is already logged in
     */
    async isLoggedIn() {
        try {
            // Check current URL - if we're not on login page, likely logged in
            const currentUrl = this.page.url();
            const loginUrl = this.authHelper.getLoginUrl();
            
            if (!currentUrl.includes('login') && currentUrl.includes(this.configLoader.getBaseUrl())) {
                return true;
            }
            
            // Additional checks can be added here based on the actual application
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get login form validation errors
     */
    async getValidationErrors() {
        const errors = [];
        
        try {
            const errorElements = await this.page.$$eval(this.selectors.errorMessage, 
                elements => elements.map(el => el.textContent.trim())
            );
            errors.push(...errorElements);
        } catch (error) {
            // No error messages found
        }
        
        return errors;
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        await this.page.click(this.selectors.forgotPasswordLink);
    }

    /**
     * Take screenshot for debugging
     */
    async takeScreenshot(name = 'login-page') {
        const screenshotPath = `generated/reports/screenshots/${name}-${Date.now()}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
        return screenshotPath;
    }
}

module.exports = LoginPage;
