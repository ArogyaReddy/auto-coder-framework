# Test Artifact Generation Prompt

Use this prompt template to generate comprehensive test artifacts from requirements that match 100% with SBS_Automation framework patterns.

## CRITICAL GROUND RULES FOR AUTO-CODER FRAMEWORK

1. **MANDATORY STEP COMPLETENESS**: Every single step in the feature file MUST have a corresponding implementation in the step definitions file. NO MISSING STEPS ALLOWED.
2. **STEP VALIDATION**: Verify that every Given/When/Then step in .feature file has exact matching implementation in -steps.js file
3. **DOUBLE CHECK and DOUBLE VALIDATE** all generated code and test artifacts with all points listed below
4. **FRAMEWORK CONSISTENCY**: All generated files MUST be consistent with the existing SBS_Automation framework
5. **NAMING CONVENTIONS**: All generated files MUST follow the naming conventions and generation patterns used in the SBS_Automation framework
6. **FUNCTIONAL COMPLETENESS**: All generated files MUST be functional, properly structured, and require no corrections
7. **SYNTAX VALIDATION**: All generated files MUST be free of syntax errors and coding issues
8. **SBS_AUTOMATION STRICT COMPLIANCE**: Follow the SBS_Automation pattern STRICTLY when generating test artifacts
9. **NO CONSOLE LOGS**: Remove any console.log statements from generated code
10. **DETAILED DOCUMENTATION**: Include detailed summary, comments and documentation explaining how to edit, what to edit, where to edit, and how to run tests when real UI/application is available
11. **REAL LOCATORS ONLY**: Use real locators and selectors instead of mock implementations
12. **REAL APPLICATION TESTING**: Ensure all tests are written to run against the real application
13. **VALIDATION AND COMPLIANCE**: Validate all generated test artifacts to ensure they follow best practices and patterns
14. **FRAMEWORK ALIGNMENT**: Validate all page objects, steps, and feature files against the existing SBS_Automation framework
15. **EXPECTED FAILURE DESIGN**: Tests MUST be designed to fail if locators are invalid, indicating users need to update them
16. **NO MOCKED DATA**: Generated tests MUST NOT rely on any mocked data or responses
17. **PERFECT SBS_AUTOMATION MATCH**: We need to match 100% with the SBS_Automation framework
18. **FINAL VERIFICATION**: Before completing generation, cross-check every feature step against step definitions to ensure 100% coverage
19. **REAL APPLICATION READY**: Tests should be ready to run against real applications (will fail until locators updated)
20. **SBS_AUTOMATION INTEGRATION**: Use existing SBS_Automation framework patterns for application launch and login procedures
21. **DETAILED CUSTOM REPORTS**: Generate comprehensive reports with:
    - Test steps, assertions, and error details
    - Screenshots or videos of test execution  
    - Clear explanation of failures and required fixes
    - Specific locator issues and user action requirements
22. **REPORT ACCESSIBILITY**: Reports MUST be easy to read, understand, and share
23. **LOCATOR FAILURE EXPECTATION**: Tests will initially fail due to missing/incorrect locators - this is REQUIRED behavior
24. **COMPATIBILITY DESIGN**: Generated tests follow SBS_Automation patterns exactly for direct compatibility
25. **DIRECT PORTABILITY**: Test files can be copied directly to SBS_Automation framework after locator adjustments

## IMPORTANT: SBS_Automation Pattern Requirements

1. **Step Files:**
   - NO Before hooks
   - NO try/catch blocks
   - NO if/else conditions
   - NO console.log statements
   - INCLUDE timeouts (e.g., `{ timeout: 240 * 1000 }`)
   - Use page objects directly in steps (e.g., `new HomePage(this.page).method()`)
   - Use assert from chai (NOT expect)
   - Example: `assert.isTrue(result, 'Error message')`

2. **Page Files:**
   - Include proper imports at top:
     ```javascript
     const By = require('../../support/By');
     const helpers = require('../../support/helpers');
     let BasePage = require('../common/base-page');
     ```
   - Define locators at top using By.xpath or By.css:
     ```javascript
     const BTN_ELEMENT = (btnName) => By.xpath(`//sdf-button[text() = "${btnName}"]`);
     const MENU_ITEM = (menuName) => By.xpath(`//div[contains(@class, "menu-item")][.//span[text()="${menuName}"]]`);
     ```
   - Class MUST extend BasePage
   - Constructor MUST call super(page)
   - NO console.log statements
   - NO direct this.locators usage

## Supported Input Sources

The framework supports generating test artifacts from the following input sources:

### 1. Text Files
- **Types**: txt, md
- **Usage**: Plain text requirements, markdown documentation
- **Example**: `/Users/arog/framework/auto-coder/input/text/jira-story-workers-comp.txt`

### 2. Image Files
- **Types**: png, jpg, jpeg, gif
- **Usage**: UI mockups, wireframes, screenshots, design images
- **Example**: `/Users/arog/framework/auto-coder/input/images/home-page-mockup.png`

### 3. cURL API Requests
- **Types**: curl
- **Usage**: API endpoint specifications, REST API documentation
- **Example**: `/Users/arog/framework/auto-coder/input/curl/api-endpoints.txt`

### 4. JIRA Integration
- **Types**: jira
- **Usage**: JIRA Features, Stories, Epics, Tasks, Bugs
- **Example**: `/Users/arog/framework/auto-coder/input/jira/PROJ-123.json`

### 5. Confluence Pages
- **Types**: confluence
- **Usage**: Confluence documentation, requirements pages
- **Example**: `/Users/arog/framework/auto-coder/input/confluence/requirements-page.html`

### 6. UX Design Files
- **Types**: figma, adobe-xd, sketch
- **Usage**: Figma designs, Adobe XD prototypes, Sketch files
- **Example**: `/Users/arog/framework/auto-coder/input/design/figma-prototype.json`

## Standard Prompt Format

```
INSTRUCTION: Generate comprehensive test artifacts that match 100% with SBS_Automation framework patterns.

INPUT_SOURCE_TYPE: [Select one: text, markdown, image, curl, jira, confluence, figma, adobe-xd, sketch]
INPUT_FILE_PATH: [Provide full path to input file, e.g., /Users/arog/framework/auto-coder/input/text/requirement-file.txt]

REQUIRED_ARTIFACTS:
- summary [.md]: Detailed requirement analysis with scenarios and test cases
- feature [.feature]: Cucumber feature file with BDD scenarios matching requirements
- steps [-steps.js]: Step definitions that match SBS_Automation patterns (see requirements)

## MANDATORY PRE-COMPLETION VALIDATION CHECKLIST

Before declaring generation complete, VERIFY:

### ✅ Step Coverage Validation:
1. Count total Given/When/Then steps in .feature file
2. Count corresponding step implementations in -steps.js file  
3. Verify 1:1 mapping - every feature step MUST have step definition
4. Check for parameterized steps and ensure proper regex matching
5. Verify no steps are missing, incomplete, or incorrectly mapped

### ✅ SBS_Automation Pattern Compliance:
1. Step definitions use proper timeout: `{ timeout: 240 * 1000 }`
2. No Before/After hooks in step files
3. No try/catch blocks in steps
4. No console.log statements anywhere
5. Assert statements use `assert.isTrue()`, NOT expect()
6. Page objects called correctly: `new PageName(this.page).method()`

### ✅ File Structure Validation:
1. Page objects extend BasePage with proper constructor
2. Locators defined at top using By.xpath/By.css
3. Required imports present in all files
4. Naming convention: base-filename used for all artifacts
5. All files syntactically correct and runnable

### ✅ Functional Completeness:
1. Every requirement scenario has corresponding test coverage
2. All acceptance criteria addressed in feature steps
3. Proper error handling scenarios included
4. Real locators (not mocks) used for UI interactions
5. Tests designed to fail with placeholder selectors
- page [-page.js]: Page object that matches SBS_Automation patterns (see requirements)
- test [-test.js]: Test file matching page, steps, and feature

OUTPUT_DIRECTORY: [Provide path to output directory, e.g., /Users/arog/framework/auto-coder/generated]

IMPLEMENTATION_TYPE: sbs-automation  # Important: Follows exact SBS_Automation patterns

SPECIAL_INSTRUCTIONS: [Any special requirements or considerations]

NAMING_CONVENTION: Use source file basename (without extension) for all generated artifacts
```

## Example Usage

### Text File Input
```
INSTRUCTION: Generate comprehensive test artifacts that match 100% with SBS_Automation framework patterns.

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/jira-story-cfc-bundle.txt

REQUIRED_ARTIFACTS:
- summary [.md]: Detailed requirement analysis with scenarios and test cases
- feature [.feature]: Cucumber feature file with BDD scenarios matching requirements
- steps [-steps.js]: Step definitions that match SBS_Automation patterns (NO try/catch, NO Before hooks, WITH timeouts)
- page [-page.js]: Page object that matches SBS_Automation patterns (extends BasePage, locators at top)
- test [-test.js]: Test file matching page, steps, and feature
- guide [_guide.md]: Detailed guide for locator updates and test execution

OUTPUT_DIRECTORY: /Users/arog/framework/auto-coder/generated

IMPLEMENTATION_TYPE: sbs-automation  # Important: Follows exact SBS_Automation patterns

SPECIAL_INSTRUCTIONS: 
- Ensure proper BDD structure with Given/When/Then steps that match EXACTLY the SBS_Automation framework patterns
- Use real locators that will fail against non-existent elements
- Include detailed guide for updating locators with real UI elements
- Remove all console.log statements, try/catch blocks, and if/else conditions
- Double validate all generated artifacts match SBS_Automation patterns 100%

NAMING_CONVENTION: Use source file basename (without extension) for all generated artifacts
```

### Image File Input
```
INSTRUCTION: Generate comprehensive test artifacts that match 100% with SBS_Automation framework patterns.

INPUT_SOURCE_TYPE: image
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/images/home-page-design.png

REQUIRED_ARTIFACTS: [same as above]

SPECIAL_INSTRUCTIONS: 
- Analyze UI elements visible in the image
- Generate locators based on common UI patterns
- Create test scenarios for visual elements and user interactions shown
- Include accessibility testing scenarios where applicable
```

### cURL API Input
```
INSTRUCTION: Generate comprehensive test artifacts that match 100% with SBS_Automation framework patterns.

INPUT_SOURCE_TYPE: curl
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/curl/api-endpoints.txt

REQUIRED_ARTIFACTS: [same as above]

SPECIAL_INSTRUCTIONS: 
- Generate API testing scenarios
- Include request/response validation
- Create page objects for API interactions
- Focus on status codes, headers, and response body validation
```

### JIRA Input
```
INSTRUCTION: Generate comprehensive test artifacts that match 100% with SBS_Automation framework patterns.

INPUT_SOURCE_TYPE: jira
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/jira/PROJ-123.json

REQUIRED_ARTIFACTS: [same as above]

SPECIAL_INSTRUCTIONS: 
- Extract acceptance criteria from JIRA story
- Generate scenarios based on story requirements
- Include edge cases and negative scenarios
- Map JIRA labels to test tags
```

### Confluence Input
```
INSTRUCTION: Generate comprehensive test artifacts that match 100% with SBS_Automation framework patterns.

INPUT_SOURCE_TYPE: confluence
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/confluence/requirements-page.html

REQUIRED_ARTIFACTS: [same as above]

SPECIAL_INSTRUCTIONS: 
- Parse structured requirements from Confluence content
- Extract user stories and acceptance criteria
- Generate comprehensive test coverage for all documented features
```

### UX Design Input
```
INSTRUCTION: Generate comprehensive test artifacts that match 100% with SBS_Automation framework patterns.

INPUT_SOURCE_TYPE: figma
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/design/prototype.json

REQUIRED_ARTIFACTS: [same as above]

SPECIAL_INSTRUCTIONS: 
- Analyze interactive elements and user flows
- Generate tests for responsive design scenarios
- Include user experience validation steps
- Create scenarios for different device types and screen sizes
```

## Quick Reference

To use this prompt, simply refer to it like this:
`/generate-test-artifacts.prompt.md`

Then provide your specific inputs:

- Input source type
- Input file path
- Any special instructions

## SBS_Automation Pattern Details

### Step Files Requirements

1. **Simplified Structure**
   ```javascript
   const { assert } = require('chai');
   const { When, Then } = require('@cucumber/cucumber');
   const ExamplePage = require('../../pages/example-page');

   Then('verification step description', { timeout: 240 * 1000 }, async function () {
     let result = await new ExamplePage(this.page).methodName();
     assert.isTrue(result, 'Error message if assertion fails');
   });
   ```

2. **Key Patterns**
   - Include timeout: `{ timeout: 240 * 1000 }`
   - Create page object instance in each step: `new ExamplePage(this.page)`
   - Use chai assertions: `assert.isTrue()`, `assert.equal()`, etc.
   - NO try/catch blocks
   - NO console.log statements
   - NO if/else conditions
   - NO Before hooks

### Page Files Requirements

1. **Required Structure**
   ```javascript
   const By = require('../../support/By');
   const helpers = require('../../support/helpers');
   let BasePage = require('../common/base-page');

   const BUTTON_LOCATOR = (btnName) => By.xpath(`//button[text()="${btnName}"]`);
   const ELEMENT_LOCATOR = By.css('.element-class');

   class ExamplePage extends BasePage {
     constructor(page) {
       super(page);
       this.page = page;
     }

     async methodName() {
       // Implementation using locators
       await this.click(BUTTON_LOCATOR('Submit'));
       return await this.isVisible(ELEMENT_LOCATOR);
     }
   }

   module.exports = ExamplePage;
   ```

2. **Key Patterns**
   - Define locators at top using By.xpath or By.css
   - Class MUST extend BasePage
   - Constructor MUST call super(page)
   - Use locators directly, not in this.locators object
   - NO console.log statements
   - NO try/catch blocks unless absolutely necessary

## Example Files

### Example Step Definition (Following SBS_Automation Patterns):

```javascript
const { assert } = require('chai');
const { When, Then } = require('@cucumber/cucumber');
const ClassicFooterPage = require('../../pages/example/classic-footer-page');

// Background
Given('the test environment is set up', { timeout: 240 * 1000 }, async function() {
  await new ClassicFooterPage(this.page).navigateToApplication();
});

// Scenario: Classic footer is not displayed when property is ON
Given('the classic footer display property is set to {string}', { timeout: 240 * 1000 }, async function(value) {
  await new ClassicFooterPage(this.page).setClassicFooterProperty(value);
});

Then('the classic footer should not be displayed', { timeout: 240 * 1000 }, async function() {
  let isDisplayed = await new ClassicFooterPage(this.page).isClassicFooterDisplayed();
  assert.isFalse(isDisplayed, 'Classic footer is displayed when it should not be');
});
```

### Example Page Object (Following SBS_Automation Patterns):

```javascript
const By = require('../../support/By');
const helpers = require('../../support/helpers');
let BasePage = require('../common/base-page');

// Define locators at the top level
const CLASSIC_FOOTER = By.xpath('//footer[@class="classic-footer"]');
const NEXTGEN_FOOTER = By.xpath('//footer[@class="nextgen-footer"]');
const SYSTEM_PROPERTY_TABLE = By.css('table.system-properties');
const PROPERTY_VALUE_FIELD = By.css('input[name="property-value"]');
const SAVE_BUTTON = By.css('button[type="submit"]');

class ClassicFooterPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async setClassicFooterProperty(value) {
    await this.navigate('/admin/system-properties');
    await this.waitForElement(SYSTEM_PROPERTY_TABLE);
    await this.click(PROPERTY_VALUE_FIELD);
    await this.fill(PROPERTY_VALUE_FIELD, value);
    await this.click(SAVE_BUTTON);
  }

  async isClassicFooterDisplayed() {
    return await this.isVisible(CLASSIC_FOOTER);
  }
}

## Naming Conventions

All generated files will follow consistent naming based on the source file:

- `{basename}.md` - Summary file
- `{basename}.feature` - Feature file
- `{basename}-steps.js` - Step definitions
- `{basename}-page.js` - Page object
- `{basename}-test.js` - Test file
- `{basename}_guide.md` - Detailed guide for editing and running tests

Where `{basename}` is the name of the source file without extension.

## Guide Document Requirements

The `{basename}_guide.md` file MUST include:

1. Detailed explanation of the generated test artifacts
2. Instructions for how to edit locators when the real UI is available
3. Specific guidance on what locators need to be updated and where
4. Step-by-step instructions for running the tests against a real application
5. Troubleshooting information for common issues
6. Examples of valid locators that might work in the real application

This guide is crucial for users to successfully transition from generated test artifacts to working tests against the real application.
