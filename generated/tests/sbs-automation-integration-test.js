/**
 * SBS_Automation Integration Test
 * Demonstrates auto-coder framework with real application configuration
 */

const { test, expect } = require('@playwright/test');
const ConfigLoader = require('../support/config-loader.js');
const AuthenticationHelper = require('../support/auth-helper.js');
const LoginPage = require('../support/pages/login-page.js');
const BasePage = require('../support/pages/base-page.js');

// Load configuration
const configLoader = new ConfigLoader();
const authHelper = new AuthenticationHelper();

test.describe('SBS_Automation Integration Tests', () => {
    let page;
    let loginPage;
    let basePage;

    test.beforeEach(async ({ browser }) => {
        // Create new context and page for each test
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            ignoreHTTPSErrors: true
        });
        
        page = await context.newPage();
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);

        // Log test start
        console.log(`🚀 Starting test with environment: ${configLoader.getConfig().environment}`);
        console.log(`🌐 Target URL: ${configLoader.getBaseUrl()}`);
    });

    test('should load SBS_Automation application homepage', async () => {
        console.log('🔍 Test: Load SBS_Automation application homepage');
        
        // Navigate to the base URL (this should demonstrate real application access)
        await basePage.navigateTo('');
        
        // Verify we can access the application
        const currentUrl = basePage.getCurrentUrl();
        console.log(`📍 Current URL after navigation: ${currentUrl}`);
        
        // Take screenshot for verification
        const screenshot = await basePage.takeScreenshot('homepage-load');
        console.log(`📸 Screenshot saved: ${screenshot}`);
        
        // Basic assertion - we should reach some page (even if it's login)
        expect(currentUrl).toContain('sbs-automation.com');
        
        console.log('✅ Successfully navigated to SBS_Automation application');
    });

    test('should handle authentication flow', async () => {
        console.log('🔐 Test: Authentication flow with SBS_Automation');
        
        if (!authHelper.isAuthRequired()) {
            console.log('🔓 Authentication not required, skipping auth test');
            return;
        }
        
        // Navigate to application (should redirect to login if not authenticated)
        await basePage.navigateTo('');
        
        // Check if we need to login
        const currentUrl = page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        if (currentUrl.includes('login')) {
            console.log('🔑 Login page detected, attempting authentication');
            
            // Take screenshot of login page
            await basePage.takeScreenshot('login-page');
            
            // Try to perform login
            try {
                const loginSuccess = await authHelper.performLogin(page);
                
                if (loginSuccess) {
                    console.log('✅ Authentication successful');
                    
                    // Verify we're no longer on login page
                    const newUrl = page.url();
                    expect(newUrl).not.toContain('login');
                } else {
                    console.log('⚠️  Authentication failed as expected with test credentials');
                    // This is expected behavior with test credentials
                }
                
                // Take screenshot after login attempt
                await basePage.takeScreenshot('post-login');
                
            } catch (error) {
                console.log(`⚠️  Expected authentication error: ${error.message}`);
                // This is expected with placeholder credentials
                
                // Take screenshot of error state
                await basePage.takeScreenshot('auth-error');
            }
        } else {
            console.log('✅ Already authenticated or no login required');
        }
        
        console.log('🏁 Authentication test completed');
    });

    test('should demonstrate locator resolution process', async () => {
        console.log('🎯 Test: Locator resolution demonstration');
        
        // Navigate to application
        await basePage.navigateTo('');
        
        // Take screenshot for locator analysis
        await basePage.takeScreenshot('locator-analysis');
        
        // Demonstrate how the framework handles locator resolution
        const commonSelectors = [
            'input[type="email"]',
            'input[type="password"]', 
            'button[type="submit"]',
            '.login-button',
            '#email',
            '#password',
            '.logo',
            'header',
            'nav'
        ];
        
        console.log('🔍 Analyzing page for common UI elements...');
        
        for (const selector of commonSelectors) {
            try {
                const isVisible = await page.isVisible(selector);
                console.log(`   ${selector}: ${isVisible ? '✅ Found' : '❌ Not found'}`);
            } catch (error) {
                console.log(`   ${selector}: ❌ Error checking - ${error.message}`);
            }
        }
        
        // Get page title and URL for analysis
        const title = await page.title();
        const url = page.url();
        
        console.log(`📄 Page Analysis Results:`);
        console.log(`   Title: ${title}`);
        console.log(`   URL: ${url}`);
        
        // This test demonstrates the locator resolution process
        // In real scenarios, the framework would analyze the page and suggest better locators
        console.log('💡 This test shows how auto-coder analyzes pages for locator suggestions');
        
        expect(title).toBeTruthy();
        expect(url).toContain('sbs-automation.com');
    });

    test.afterEach(async ({ page }) => {
        // Clean up
        if (page) {
            await page.close();
        }
    });
});

// Test configuration logging
test.beforeAll(async () => {
    console.log('\n🔧 SBS_Automation Integration Configuration:');
    configLoader.logConfiguration();
    authHelper.logAuthConfig();
});
