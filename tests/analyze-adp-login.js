/**
 * ADP Login Page Analysis - Find the actual selectors
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function analyzeADPLoginPage() {
    console.log('🔍 Starting ADP login page analysis...');
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        // Navigate to ADP login
        const adpUrl = 'https://online-iat.adp.com/signin/v1/?APPID=RUN&productId=7bf1242e-2ff0-e324-e053-37004b0bc98c';
        console.log('🌐 Navigating to:', adpUrl);
        await page.goto(adpUrl);
        await page.waitForLoadState('load');
        await page.waitForTimeout(3000);
        
        // Take screenshot
        await page.screenshot({ path: 'generated/reports/screenshots/adp-login-analysis.png', fullPage: true });
        console.log('📸 Screenshot saved');
        
        // Get page HTML
        const html = await page.content();
        fs.writeFileSync('generated/reports/adp-login-page.html', html);
        console.log('💾 HTML saved');
        
        // Find input elements
        console.log('\n🔍 Looking for input elements...');
        const inputs = await page.$$eval('input', elements => 
            elements.map(el => ({
                type: el.type,
                name: el.name,
                id: el.id,
                placeholder: el.placeholder,
                className: el.className,
                value: el.value,
                outerHTML: el.outerHTML.substring(0, 200)
            }))
        );
        
        console.log('📝 Found inputs:', inputs.length);
        inputs.forEach((input, index) => {
            console.log(`  ${index + 1}. Type: ${input.type}, Name: ${input.name}, ID: ${input.id}, Placeholder: ${input.placeholder}`);
        });
        
        // Find sdf-input elements (custom ADP elements)
        console.log('\n🔍 Looking for sdf-input elements...');
        const sdfInputs = await page.$$eval('sdf-input', elements => 
            elements.map(el => ({
                name: el.getAttribute('name'),
                id: el.id,
                type: el.getAttribute('type'),
                className: el.className,
                outerHTML: el.outerHTML.substring(0, 300)
            }))
        );
        
        console.log('📝 Found sdf-inputs:', sdfInputs.length);
        sdfInputs.forEach((sdf, index) => {
            console.log(`  ${index + 1}. Name: ${sdf.name}, ID: ${sdf.id}, Type: ${sdf.type}`);
        });
        
        // Find buttons
        console.log('\n🔍 Looking for buttons...');
        const buttons = await page.$$eval('button, sdf-button', elements => 
            elements.map(el => ({
                type: el.type || 'sdf-button',
                id: el.id,
                className: el.className,
                textContent: el.textContent?.trim().substring(0, 50),
                disabled: el.disabled,
                ariaLabel: el.getAttribute('aria-label'),
                outerHTML: el.outerHTML.substring(0, 200)
            }))
        );
        
        console.log('📝 Found buttons:', buttons.length);
        buttons.forEach((btn, index) => {
            console.log(`  ${index + 1}. ID: ${btn.id}, Text: "${btn.textContent}", Disabled: ${btn.disabled}, AriaLabel: ${btn.ariaLabel}`);
        });
        
        // Save analysis to file
        const analysis = {
            inputs,
            sdfInputs,
            buttons,
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync('generated/reports/adp-analysis.json', JSON.stringify(analysis, null, 2));
        console.log('💾 Analysis saved to adp-analysis.json');
        
        console.log('\n✅ Analysis complete. Press Enter to close browser...');
        
        // Wait for user input before closing
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', () => {
            process.exit();
        });
        
    } catch (error) {
        console.error('❌ Analysis failed:', error.message);
        await browser.close();
        process.exit(1);
    }
}

analyzeADPLoginPage();
