/**
 * Cucumber Hooks for Auto-Coder Framework
 * Handles setup and teardown for test execution
 * Integrates with SBS_Automation patterns and configuration
 */

const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs-extra');
const path = require('path');
const ConfigLoader = require('./config-loader.js');

// Set default timeout to match SBS_Automation patterns
setDefaultTimeout(180000);

// Load configuration once for all tests
let globalConfig = null;

BeforeAll(async function () {
    console.log('🚀 Auto-Coder Framework - Initializing test environment...');
    
    // Load configuration using ConfigLoader
    const configLoader = new ConfigLoader();
    globalConfig = configLoader.getConfig();
    
    // Ensure report directories exist
    const reportDirs = [
        'generated/reports',
        'generated/reports/custom',
        'generated/reports/screenshots',
        'generated/reports/videos'
    ];
    
    for (const dir of reportDirs) {
        await fs.ensureDir(dir);
    }
    
    console.log(`📁 Environment: ${globalConfig.environment}`);
    console.log(`🌐 Base URL: ${globalConfig.baseUrl}`);
    console.log(`🔐 Authentication: ${globalConfig.auth?.enabled ? 'Enabled' : 'Disabled'}`);
});

Before(async function () {
    // Initialize the world with configuration
    if (!this.data) {
        this.data = {};
    }
    
    // Set configuration and environment data
    this.data.config = globalConfig;
    this.data.environment = globalConfig.environment;
    
    // Initialize browser context
    await this.init();
    
    console.log(`🎭 Test started: ${this.pickle.name}`);
});

After(async function (scenario) {
    // Take screenshot on failure
    if (scenario.result.status === 'FAILED') {
        const screenshotName = `failed-${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '-')}`;
        await this.takeScreenshot(screenshotName);
        console.log(`📸 Screenshot taken: ${screenshotName}`);
    }
    
    // Cleanup browser context
    await this.cleanup();
    
    console.log(`✅ Test completed: ${this.pickle.name} - ${scenario.result.status}`);
});

AfterAll(async function () {
    console.log('🏁 Auto-Coder Framework - Test execution completed');
});