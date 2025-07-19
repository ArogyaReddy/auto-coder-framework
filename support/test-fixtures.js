/**
 * Test Fixtures for Auto-Coder Framework
 * Handles authentication and setup before each test
 */

const { test: base } = require('@playwright/test');
const ConfigLoader = require('./config-loader');
const MaxLoginPage = require('./pages/max-login-page');

// Extend base test with authentication
const test = base.extend({
  // Authenticated page fixture
  authenticatedPage: async ({ browser }, use) => {
    const configLoader = new ConfigLoader();
    const config = configLoader.getConfig();
    const envConfig = config.environments[config.environment];

    // Create new context and page
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();

    try {
      if (envConfig?.auth?.enabled) {
        console.log('🔐 Setting up authentication...');
        
        const maxLoginPage = new MaxLoginPage(page);
        const baseUrl = envConfig.baseUrl || config.baseUrl;
        
        console.log(`🌐 Navigating to: ${baseUrl}`);
        await page.goto(baseUrl);
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        const username = envConfig.auth.username;
        const password = envConfig.auth.password;
        
        if (username && password) {
          console.log(`🔑 Attempting to login with user: ${username}`);
          await maxLoginPage.performMAXLogin(username, password);
          
          // Verify login success
          const isLoginSuccessful = await maxLoginPage.verifyLoginSuccess();
          if (isLoginSuccessful) {
            console.log('✅ Authentication successful');
          } else {
            console.log('⚠️  Authentication may have failed, continuing with tests');
          }
        } else {
          console.log('⚠️  No credentials configured, skipping authentication');
        }
      } else {
        // Just navigate to base URL without authentication
        const baseUrl = envConfig?.baseUrl || config.baseUrl;
        console.log(`🌐 Navigating to: ${baseUrl} (no authentication)`);
        await page.goto(baseUrl);
      }
      
      await use(page);
    } catch (error) {
      console.log(`⚠️  Authentication setup failed: ${error.message}`);
      console.log('📝 Tests will continue with current page state');
      await use(page);
    } finally {
      await context.close();
    }
  }
});

module.exports = { test };
