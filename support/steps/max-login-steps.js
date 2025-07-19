/**
 * MAX Login Steps - Digital Plus Test Credentials
 * Step definitions for MAX application login functionality
 * Following SBS_Automation framework patterns
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const MaxLoginPage = require('../pages/max-login-page');
const ConfigLoader = require('../config-loader');

/**
 * Login to MAX with digital plus test credentials
 * This step handles the complete login flow for MAX application
 */
Given('RunOnboarding client is logged into MAX with digitalplus test credentials', { timeout: 180 * 1000 }, async function () {
    // Load configuration if not already available
    if (!this.data || !this.data.config) {
        const configLoader = new ConfigLoader();
        this.data = { config: configLoader.getConfig() };
    }
    
    const maxLoginPage = new MaxLoginPage(this.page);
    
    // Get base URL from current environment configuration
    const envConfig = this.data.config.environments[this.data.config.environment];
    const baseUrl = envConfig?.baseUrl || this.data.config.baseUrl;
    
    if (!baseUrl) {
        throw new Error('Base URL not configured. Please check web.config.json');
    }
    
    console.log(`🌐 Navigating to: ${baseUrl}`);
    await maxLoginPage.navigateTo(baseUrl);
    
    // Get credentials from environment configuration
    const username = envConfig?.auth?.username;
    const password = envConfig?.auth?.password;
    
    if (!username || !password) {
        throw new Error(`Authentication credentials not configured for environment: ${this.data.config.environment}`);
    }
    
    console.log(`🔐 Attempting login with user: ${username}`);
    await maxLoginPage.performMAXLogin(username, password);
    
    // Verify login success
    const isLoginSuccessful = await maxLoginPage.verifyLoginSuccess();
    assert.isTrue(isLoginSuccessful, 'MAX login with digital plus test credentials failed');
    
    console.log('✅ MAX login successful');
});

/**
 * Navigate to MAX application
 */
Given('I navigate to MAX application', { timeout: 60 * 1000 }, async function () {
    const maxLoginPage = new MaxLoginPage(this.page);
    const baseUrl = this.data.config.baseUrl || this.data.config.environments[this.data.config.environment]?.baseUrl;
    await maxLoginPage.navigateTo(baseUrl);
    
    const isLoginFormPresent = await maxLoginPage.isLoginFormPresent();
    assert.isTrue(isLoginFormPresent, 'MAX login form is not present on the page');
});

/**
 * Verify successful login to MAX
 */
Then('I should be successfully logged into MAX application', { timeout: 60 * 1000 }, async function () {
    const maxLoginPage = new MaxLoginPage(this.page);
    const isLoginSuccessful = await maxLoginPage.verifyLoginSuccess();
    assert.isTrue(isLoginSuccessful, 'Login to MAX application was not successful');
});
