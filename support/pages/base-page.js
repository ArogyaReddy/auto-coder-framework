/**
 * Base Page Object for Auto-Coder Framework with SBS_Automation Integration
 * Provides common functionality for all page objects
 */

const ConfigLoader = require('../config-loader.js');
const AuthenticationHelper = require('../auth-helper.js');

class BasePage {
    constructor(page) {
        this.page = page;
        this.configLoader = new ConfigLoader();
        this.authHelper = new AuthenticationHelper();
        this.baseUrl = this.configLoader.getBaseUrl();
    }

    /**
     * Navigate to a specific path
     */
    async navigateTo(path = '') {
        const url = this.baseUrl + path;
        console.log(`🔗 Navigating to: ${url}`);
        await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        return this;
    }

    /**
     * Wait for element to be visible
     */
    async waitForElement(selector, timeout = 10000) {
        console.log(`⏳ Waiting for element: ${selector}`);
        await this.page.waitForSelector(selector, { timeout });
        return this;
    }

    /**
     * Click element with enhanced logging
     */
    async clickElement(selector, options = {}) {
        console.log(`🖱️  Clicking element: ${selector}`);
        await this.page.waitForSelector(selector, { timeout: 10000 });
        await this.page.click(selector, options);
        return this;
    }

    /**
     * Fill input field with enhanced logging
     */
    async fillField(selector, value, options = {}) {
        console.log(`✏️  Filling field ${selector} with: ${value}`);
        await this.page.waitForSelector(selector, { timeout: 10000 });
        await this.page.fill(selector, value, options);
        return this;
    }

    /**
     * Get text content from element
     */
    async getText(selector) {
        await this.page.waitForSelector(selector, { timeout: 10000 });
        const text = await this.page.textContent(selector);
        console.log(`📝 Got text from ${selector}: ${text}`);
        return text;
    }

    /**
     * Check if element is visible
     */
    async isVisible(selector) {
        try {
            const isVisible = await this.page.isVisible(selector);
            console.log(`👁️  Element ${selector} visible: ${isVisible}`);
            return isVisible;
        } catch (error) {
            console.log(`👁️  Element ${selector} visible: false (error: ${error.message})`);
            return false;
        }
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoad() {
        console.log('⏳ Waiting for page load...');
        await this.page.waitForLoadState('networkidle');
        return this;
    }

    /**
     * Ensure authentication (login if needed)
     */
    async ensureAuthenticated() {
        if (this.authHelper.isAuthRequired()) {
            console.log('🔐 Checking authentication status...');
            
            // Simple check: if current URL is login page, need to authenticate
            const currentUrl = this.page.url();
            const loginUrl = this.authHelper.getLoginUrl();
            
            if (currentUrl.includes('login') || !currentUrl.includes(this.baseUrl)) {
                console.log('🔑 Authentication required, performing login...');
                const success = await this.authHelper.performLogin(this.page);
                
                if (!success) {
                    throw new Error('Authentication failed');
                }
            } else {
                console.log('✅ Already authenticated');
            }
        }
        return this;
    }

    /**
     * Take screenshot for debugging/reporting
     */
    async takeScreenshot(name = 'page-screenshot') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = `generated/reports/screenshots/${name}-${timestamp}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
        return screenshotPath;
    }

    /**
     * Scroll element into view
     */
    async scrollToElement(selector) {
        console.log(`📜 Scrolling to element: ${selector}`);
        await this.page.waitForSelector(selector, { timeout: 10000 });
        await this.page.locator(selector).scrollIntoViewIfNeeded();
        return this;
    }

    /**
     * Select option from dropdown
     */
    async selectOption(selector, value) {
        console.log(`📋 Selecting option ${value} from ${selector}`);
        await this.page.waitForSelector(selector, { timeout: 10000 });
        await this.page.selectOption(selector, value);
        return this;
    }

    /**
     * Upload file to input
     */
    async uploadFile(selector, filePath) {
        console.log(`📁 Uploading file ${filePath} to ${selector}`);
        await this.page.waitForSelector(selector, { timeout: 10000 });
        await this.page.setInputFiles(selector, filePath);
        return this;
    }

    /**
     * Get current page URL
     */
    getCurrentUrl() {
        const url = this.page.url();
        console.log(`🌐 Current URL: ${url}`);
        return url;
    }

    /**
     * Get page title
     */
    async getPageTitle() {
        const title = await this.page.title();
        console.log(`📄 Page title: ${title}`);
        return title;
    }

    /**
     * Wait for element to contain specific text
     */
    async waitForText(selector, text, timeout = 10000) {
        console.log(`⏳ Waiting for ${selector} to contain text: ${text}`);
        await this.page.waitForFunction(
            ({ selector, text }) => {
                const element = document.querySelector(selector);
                return element && element.textContent.includes(text);
            },
            { selector, text },
            { timeout }
        );
        return this;
    }

    /**
     * Handle common page errors
     */
    async checkForErrors() {
        const errorSelectors = [
            '.error', '.alert-danger', '.alert-error', 
            '[role="alert"]', '.notification-error'
        ];
        
        for (const selector of errorSelectors) {
            if (await this.isVisible(selector)) {
                const errorText = await this.getText(selector);
                console.warn(`⚠️  Page error detected: ${errorText}`);
                return errorText;
            }
        }
        
        return null;
    }

    /**
     * Get element count
     */
    async getElementCount(selector) {
        const count = await this.page.locator(selector).count();
        console.log(`🔢 Element count for ${selector}: ${count}`);
        return count;
    }

    /**
     * Execute custom JavaScript
     */
    async executeScript(script, ...args) {
        console.log('🟨 Executing custom JavaScript');
        return await this.page.evaluate(script, ...args);
    }
}

module.exports = BasePage;
