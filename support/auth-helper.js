/**
 * Authentication Helper for Auto-Coder Framework
 * Integrates with SBS_Automation authentication patterns
 */

const fs = require('fs-extra');
const path = require('path');
const ConfigLoader = require('./config-loader.js');

class AuthenticationHelper {
    constructor() {
        this.configLoader = new ConfigLoader();
        this.config = this.configLoader.getConfig();
        this.authConfig = this.configLoader.getAuthConfig();
        this.authStatePath = path.join(__dirname, '..', 'generated/auth-state.json');
    }

    /**
     * Check if authentication is required
     */
    isAuthRequired() {
        return this.authConfig.enabled === true;
    }

    /**
     * Get login URL
     */
    getLoginUrl() {
        return this.configLoader.getBaseUrl() + (this.authConfig.loginUrl || '/login');
    }

    /**
     * Get authentication credentials
     */
    getCredentials() {
        return {
            username: this.authConfig.username || process.env.TEST_USERNAME || 'test@sbs-automation.com',
            password: this.authConfig.password || process.env.TEST_PASSWORD || 'TestPassword123'
        };
    }

    /**
     * Perform login for a Playwright page
     * Enhanced for ADP authentication flow
     */
    async performLogin(page, options = {}) {
        if (!this.isAuthRequired()) {
            console.log('🔓 Authentication not required, skipping login');
            return true;
        }

        const credentials = this.getCredentials();
        const loginUrl = this.getLoginUrl();

        console.log(`🔑 Performing ADP login at: ${loginUrl}`);

        try {
            // Navigate to login page if not already there
            const currentUrl = page.url();
            if (!currentUrl.includes('signin') && !currentUrl.includes('login')) {
                await page.goto(loginUrl, { waitUntil: 'networkidle', timeout: 60000 });
            }

            // Wait for login form (ADP specific)
            const loginSelectors = options.selectors || this.getADPLoginSelectors();

            // Fill username
            await page.waitForSelector(loginSelectors.username, { timeout: 15000 });
            await page.fill(loginSelectors.username, credentials.username);
            console.log(`📧 Filled username: ${credentials.username}`);

            // Fill password
            await page.fill(loginSelectors.password, credentials.password);
            console.log('🔑 Password filled');

            // Take screenshot before submitting
            const screenshotPath = path.join(__dirname, '..', 'generated/reports/screenshots/adp-before-submit.png');
            await fs.ensureDir(path.dirname(screenshotPath));
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`📸 Screenshot saved: ${screenshotPath}`);

            // Click login button
            await page.click(loginSelectors.submit);
            console.log('🚀 Login button clicked');

            // Wait for navigation or error (ADP specific)
            try {
                await Promise.race([
                    // Wait for URL to change (successful login)
                    page.waitForFunction(() => 
                        !window.location.href.includes('signin'), 
                        { timeout: 30000 }
                    ),
                    // Wait for navigation
                    page.waitForNavigation({ 
                        waitUntil: 'networkidle', 
                        timeout: 30000 
                    })
                ]);

                console.log('✅ ADP Login successful');
                
                // Take success screenshot
                const successScreenshot = path.join(__dirname, '..', 'generated/reports/screenshots/adp-login-success.png');
                await page.screenshot({ path: successScreenshot, fullPage: true });
                
                return true;

            } catch (navError) {
                console.warn('⚠️  Navigation timeout, checking current URL...');
                
                const newUrl = page.url();
                if (!newUrl.includes('signin')) {
                    console.log('✅ Login appears successful (URL changed)');
                    return true;
                } else {
                    throw new Error('Login failed - still on signin page');
                }
            }

        } catch (error) {
            console.error('❌ ADP Login failed:', error.message);
            
            // Save screenshot for debugging
            const errorScreenshot = path.join(__dirname, '..', 'generated/reports/screenshots/adp-login-failure.png');
            await fs.ensureDir(path.dirname(errorScreenshot));
            await page.screenshot({ path: errorScreenshot, fullPage: true });
            console.log(`📸 Error screenshot saved: ${errorScreenshot}`);
            
            return false;
        }
    }

    /**
     * Get default login selectors (customize based on actual application)
     */
    getDefaultLoginSelectors() {
        return {
            username: 'input[name="email"], input[name="username"], input[type="email"], #email, #username',
            password: 'input[name="password"], input[type="password"], #password',
            submit: 'button[type="submit"], input[type="submit"], .login-button, .btn-login'
        };
    }

    /**
     * Get ADP-specific login selectors
     */
    getADPLoginSelectors() {
        const authConfig = this.configLoader.getAuthConfig();
        
        // Use custom selectors from config if available
        if (authConfig.selectors) {
            return authConfig.selectors;
        }
        
        // ADP default selectors (will be updated after inspecting actual page)
        return {
            username: 'input[name="user"], input[id="user"], #username, input[type="email"], input[placeholder*="User"], input[placeholder*="Email"]',
            password: 'input[name="password"], input[id="password"], input[type="password"], input[placeholder*="Password"]',
            submit: 'button[type="submit"], input[type="submit"], .signin-button, .login-btn, button:has-text("Sign In"), button:has-text("Login")'
        };
    }

    /**
     * Load saved authentication state
     */
    async loadAuthState() {
        try {
            if (await fs.pathExists(this.authStatePath)) {
                return await fs.readJson(this.authStatePath);
            }
        } catch (error) {
            console.warn('⚠️  Could not load auth state:', error.message);
        }
        return null;
    }

    /**
     * Save authentication state
     */
    async saveAuthState(authData) {
        try {
            await fs.ensureDir(path.dirname(this.authStatePath));
            await fs.writeJson(this.authStatePath, {
                ...authData,
                timestamp: new Date().toISOString()
            });
            console.log('💾 Authentication state saved');
        } catch (error) {
            console.error('❌ Failed to save auth state:', error.message);
        }
    }

    /**
     * Create authenticated page context (for tests that need authentication)
     */
    async createAuthenticatedContext(browser, options = {}) {
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            ignoreHTTPSErrors: true,
            ...options
        });

        if (this.isAuthRequired()) {
            const page = await context.newPage();
            const loginSuccess = await this.performLogin(page);
            
            if (!loginSuccess) {
                console.warn('⚠️  Authentication failed, continuing with unauthenticated context');
            }
            
            return { context, page };
        }

        return { context, page: await context.newPage() };
    }

    /**
     * Get authentication headers for API requests (if needed)
     */
    getAuthHeaders() {
        // This is a placeholder - implement based on actual authentication method
        return {
            'Content-Type': 'application/json',
            // Add actual auth headers here (Authorization, API keys, etc.)
        };
    }

    /**
     * Log authentication configuration (for debugging)
     */
    logAuthConfig() {
        console.log('\n🔐 Authentication Configuration:');
        console.log(`   Enabled: ${this.isAuthRequired()}`);
        
        if (this.isAuthRequired()) {
            console.log(`   Login URL: ${this.getLoginUrl()}`);
            console.log(`   Username: ${this.getCredentials().username}`);
            console.log(`   Password: ${this.getCredentials().password ? '[SET]' : '[NOT SET]'}`);
        }
        console.log('');
    }
}

module.exports = AuthenticationHelper;
