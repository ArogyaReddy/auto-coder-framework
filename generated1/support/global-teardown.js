// Global teardown for Playwright tests  
// This file runs once after all tests across all test files

async function globalTeardown(config) {
    console.log('🧹 Cleaning up global test environment...');
    
    // Cleanup any global resources
    // Example: Close database connections, clean temp files, etc.
    
    // Clean up auth state file if it exists
    const fs = require('fs');
    const authStatePath = 'generated/support/auth-state.json';
    
    if (fs.existsSync(authStatePath)) {
        fs.unlinkSync(authStatePath);
        console.log('🗑️  Cleaned up auth state file');
    }
    
    // Additional cleanup can be added here
    
    console.log('✅ Global teardown completed');
}

module.exports = globalTeardown;
