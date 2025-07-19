// Global setup for Playwright tests
// This file runs once before all tests across all test files

const { chromium } = require('@playwright/test');

async function globalSetup(config) {
    console.log('🚀 Setting up global test environment...');
    
    // Environment setup
    process.env.NODE_ENV = process.env.NODE_ENV || 'test';
    
    // Browser setup for shared context (optional)
    // Uncomment if you need shared browser state across tests
    /*
    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    // Perform any global authentication or setup here
    // Example: Login once and save state
    const page = await context.newPage();
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Save storage state for reuse
    await context.storageState({ path: 'generated/support/auth-state.json' });
    
    await browser.close();
    */
    
    console.log('✅ Global setup completed');
}

module.exports = globalSetup;
