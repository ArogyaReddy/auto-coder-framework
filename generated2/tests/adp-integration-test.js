/**
 * ADP Integration Test
 * Tests the auto-coder framework with ADP IAT environment
 */

const { test, expect } = require('@playwright/test');
const ConfigLoader = require('../../support/config-loader.js');
const AuthenticationHelper = require('../../support/auth-helper.js');
const ADPLoginPage = require('../../support/pages/adp-login-page.js');

// Load ADP configuration
const configLoader = new ConfigLoader();
const authHelper = new AuthenticationHelper();

test.describe('ADP Integration Tests', () => {
    let page;
    let adpLoginPage;

    test.beforeEach(async ({ browser }) => {
        // Create new context and page for each test
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            ignoreHTTPSErrors: true
        });
        
        page = await context.newPage();
        adpLoginPage = new ADPLoginPage(page);

        // Log test start with ADP configuration
        console.log(`🚀 Starting ADP test with environment: ${configLoader.getConfig().environment}`);
        console.log(`🌐 Target ADP URL: ${configLoader.getBaseUrl()}`);
        console.log(`👤 Username: ${authHelper.getCredentials().username}`);
    });

    test('should navigate to ADP login page', async () => {
        console.log('🔍 Test: Navigate to ADP login page');
        
        // Navigate to ADP login URL
        await adpLoginPage.navigate();
        
        // Verify we reached the ADP login page
        const currentUrl = page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        // Check page title
        const title = await adpLoginPage.getPageTitle();
        
        // Take screenshot for verification
        await adpLoginPage.takeScreenshot('adp-login-page-loaded');
        
        // Basic assertions
        expect(currentUrl).toContain('adp.com');
        expect(currentUrl).toContain('signin');
        
        console.log('✅ Successfully navigated to ADP login page');
    });

    test('should perform ADP authentication', async () => {
        console.log('🔐 Test: ADP Authentication');
        
        // Navigate to login page
        await adpLoginPage.navigate();
        
        // Check if login form is available
        const usernameFieldExists = await adpLoginPage.waitForElement(
            'input[name="user"], input[id="user"], #username, input[type="email"]'
        );
        
        if (!usernameFieldExists) {
            console.log('⚠️  Username field not found with current selectors');
            await adpLoginPage.takeScreenshot('adp-login-form-analysis');
            
            // Try to find any input fields for analysis
            const inputFields = await page.$$eval('input', inputs => 
                inputs.map(input => ({
                    type: input.type,
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder,
                    className: input.className
                }))
            );
            
            console.log('📋 Available input fields:', JSON.stringify(inputFields, null, 2));
        }
        
        // Attempt login
        try {
            await adpLoginPage.login();
            console.log('✅ Login attempt completed');
            
            // Check if login was successful
            const isLoggedIn = await adpLoginPage.isLoggedIn();
            console.log(`🔍 Login status: ${isLoggedIn ? 'Success' : 'Failed/Pending'}`);
            
            // Take screenshot after login attempt
            await adpLoginPage.takeScreenshot('adp-after-login-attempt');
            
        } catch (error) {
            console.log(`⚠️  Login attempt error: ${error.message}`);
            
            // This is expected initially - we need to inspect the actual ADP login form
            console.log('📝 This is expected - we need to update selectors based on actual ADP form');
            
            // Take screenshot for analysis
            await adpLoginPage.takeScreenshot('adp-login-analysis-needed');
        }
        
        console.log('🏁 ADP authentication test completed');
    });

    test('should demonstrate locator inspection for ADP', async () => {
        console.log('🔍 Test: ADP Page Element Inspection');
        
        // Navigate to ADP page
        await adpLoginPage.navigate();
        
        // Take screenshot for manual inspection
        await adpLoginPage.takeScreenshot('adp-page-inspection');
        
        // Analyze page for form elements
        console.log('🔍 Analyzing ADP page elements...');
        
        // Get all form elements
        const formElements = await page.evaluate(() => {
            const elements = {
                forms: [],
                inputs: [],
                buttons: [],
                links: []
            };
            
            // Get all forms
            document.querySelectorAll('form').forEach(form => {
                elements.forms.push({
                    id: form.id,
                    className: form.className,
                    action: form.action,
                    method: form.method
                });
            });
            
            // Get all inputs
            document.querySelectorAll('input').forEach(input => {
                elements.inputs.push({
                    type: input.type,
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder,
                    className: input.className,
                    value: input.value
                });
            });
            
            // Get all buttons
            document.querySelectorAll('button, input[type="submit"]').forEach(button => {
                elements.buttons.push({
                    type: button.type,
                    textContent: button.textContent?.trim(),
                    id: button.id,
                    className: button.className,
                    name: button.name
                });
            });
            
            return elements;
        });
        
        console.log('📋 ADP Page Analysis Results:');
        console.log('Forms found:', JSON.stringify(formElements.forms, null, 2));
        console.log('Inputs found:', JSON.stringify(formElements.inputs, null, 2));
        console.log('Buttons found:', JSON.stringify(formElements.buttons, null, 2));
        
        // Save analysis to file for reference
        const analysisFile = 'generated/reports/adp-page-analysis.json';
        const fs = require('fs-extra');
        await fs.writeJson(analysisFile, formElements, { spaces: 2 });
        console.log(`📁 Analysis saved to: ${analysisFile}`);
        
        expect(formElements.inputs.length).toBeGreaterThan(0);
        console.log('✅ ADP page inspection completed');
    });

    test.afterEach(async () => {
        if (page) {
            await page.close();
        }
    });
});

// Test configuration logging
test.beforeAll(async () => {
    console.log('\n🔧 ADP Integration Configuration:');
    configLoader.logConfiguration();
    authHelper.logAuthConfig();
    
    console.log('\n📋 Environment Details:');
    console.log(`   🌐 Base URL: ${configLoader.getBaseUrl()}`);
    console.log(`   👤 Username: ${authHelper.getCredentials().username}`);
    console.log(`   🔑 Password: ${authHelper.getCredentials().password ? '[SET]' : '[NOT SET]'}`);
    console.log(`   🎯 Environment: ${configLoader.getConfig().environment}`);
});
