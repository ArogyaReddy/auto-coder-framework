# Test Artifact Execution Prompt

Use this prompt template to run and manage test artifacts generated from requirements.

## CRITICAL GROUND RULES FOR AUTO-CODER TEST EXECUTION

1. **PRE-EXECUTION VALIDATION**: Before running tests, verify all feature steps have corresponding step definitions implemented
2. **STEP COMPLETENESS CHECK**: Ensure no "undefined step" errors by validating step coverage
3. **DOUBLE CHECK and DOUBLE VALIDATE** all test executions and reports
4. **NO MOCKED TESTS**: Tests MUST NOT be mocked and MUST use real locators
5. **EXPECTED FAILURES**: Tests SHOULD fail if locators are invalid - this is EXPECTED and REQUIRED behavior
6. **REAL APPLICATION TESTING**: Tests MUST be able to run against the real application
7. **NO MOCKED DATA**: Tests MUST NOT rely on any mocked data or responses
8. **UI ELEMENT VALIDATION**: Tests MUST validate actual UI elements in the real application
9. **SBS_AUTOMATION INTEGRATION**: Use existing SBS_Automation framework for application launch and login procedures
10. **COMPREHENSIVE REPORTING**: Generate detailed custom reports that include:
    - Test steps, assertions, and error details with full context
    - Screenshots or videos of test execution for visual debugging
    - Clear explanation of failures and what needs to be fixed
    - Specific locator issues and exact steps users need to take
    - Missing step definitions (if any found)
    - Code locations where failures occur
    - Recommendations for locator updates
11. **REPORT QUALITY**: Reports MUST be easy to read, understand, and share
12. **PERFECT SBS_AUTOMATION MATCH**: We need to match 100% with the SBS_Automation framework
13. **SINGLE BROWSER EXECUTION**: Run tests in single browser only (Chrome/Chromium) - no need for multiple browsers with placeholder locators
14. **ENHANCED REPORT STORAGE**: Save all reports in structured directories:
    - HTML reports: `generated/reports/html-report/`
    - Custom detailed reports: `generated/reports/custom/`
    - JSON reports: `generated/reports/results.json`
    - Test artifacts: `generated/reports/artifacts/`
15. **NO AUTO-BROWSER SERVING**: Don't auto-serve HTML reports - save them for manual access
16. **DETAILED CUSTOM REPORTING**: Generate comprehensive custom reports explaining:
    - What the test is doing and expected behavior
    - What actual errors occurred and why
    - Which specific locators are failing
    - What users need to do to fix issues
    - Step-by-step guidance for locator updates
17. **CONFIGURATION INTEGRATION**: When running tests, use settings, configurations, and test data files (refer to SBS_Automation patterns)
18. **APPLICATION INTEGRATION**: Use existing SBS_Automation framework to:
    - Open applications and navigate to URLs
    - Handle login procedures and authentication
    - Provide real application context for tests
19. **FLEXIBLE TEST EXECUTION**: Enable running auto-coder tests against real applications through SBS_Automation integration

## IMPORTANT: Test Execution Notes

1. Tests will initially fail due to missing/incorrect locators - this is expected and required
2. Generated tests use real locators that should be used against actual UI elements
3. Generated tests follow SBS_Automation patterns exactly for compatibility
4. Test files can be copied directly to SBS_Automation framework after locator adjustments
5. Detailed error reports will help identify which locators need to be updated

## Supported Test Types by Input Source

The framework supports running tests generated from various input sources:

### 1. Text-based Tests (txt, md)
- **Focus**: Functional testing, business logic validation
- **Execution**: Feature files with step definitions

### 2. Image-based Tests (png, jpg, jpeg, gif)
- **Focus**: UI validation, visual regression testing
- **Execution**: Visual comparison tests, element interaction tests

### 3. API Tests (curl)
- **Focus**: API endpoint validation, integration testing
- **Execution**: Request/response validation, status code checks

### 4. JIRA-based Tests (jira)
- **Focus**: Story acceptance criteria, bug reproduction
- **Execution**: Feature tests mapped to JIRA requirements

### 5. Confluence Tests (confluence)
- **Focus**: Documentation-driven testing, requirement validation
- **Execution**: Comprehensive feature coverage tests

### 6. Design Tests (figma, adobe-xd, sketch)
- **Focus**: User experience validation, responsive design testing
- **Execution**: Multi-device tests, interaction flow validation

## Guidelines for Running Tests

1. Tests should be run against real application environments
2. Test failures should provide clear details about failed locators
3. Reports should include screenshots of failures for easy debugging
4. Reports should indicate exact locations in code where failures occur

## Standard Prompt Format

```
INSTRUCTION: Execute the specified test artifacts. Tests will fail initially due to placeholder locators.

TEST_TYPE: [Select one: feature, api, ui, integration, visual, all]
TEST_TARGET: [Provide file or directory path, e.g., /Users/arog/framework/auto-coder/generated/features/cfc-api-test.feature]
INPUT_SOURCE_TYPE: [Original source type: text, markdown, image, curl, jira, confluence, figma, adobe-xd, sketch]

EXECUTION_OPTIONS:
- browser: chrome (single browser only - no multi-browser testing needed for placeholder locators)
- headless: [true, false]
- parallel: 1 (single process recommended for initial testing)
- tags: [optional tag expression, e.g., "@api and not @wip"]
- timeout: [optional timeout in ms, default: 240000]
- debug: [true, false] - enables additional logging and screenshots
- screenshots: only-on-failure (capture failures for debugging)
- video: retain-on-failure (record failures for analysis)
- trace: on-first-retry (detailed trace for debugging)
- detailed_reports: true (MANDATORY - generates comprehensive reports with error analysis)
- save_artifacts: true (saves test artifacts for debugging)
- locator_highlighting: true (highlights locators in screenshots for easier debugging)
- report_directory: generated/reports (structured report storage)
- html_report_auto_open: false (don't auto-serve - save for manual access)
- custom_detailed_reporting: true (generate comprehensive analysis reports)

REPORT_FORMAT: [html, json, junit, custom] (custom detailed reporting is MANDATORY)
REPORT_DIRECTORY: /Users/arog/framework/auto-coder/generated/reports (structured directory with subfolders)

LOCATOR_VALIDATION: true (MANDATORY - Checks and reports real locators that fail with detailed analysis)
ERROR_ANALYSIS: true (MANDATORY - Provides comprehensive analysis of why tests failed)
FAILURE_GUIDANCE: true (MANDATORY - Provides step-by-step guidance for fixing failures)
INTEGRATION_SETTINGS: sbs-automation (Use SBS_Automation framework patterns for application launch and login)

SPECIAL_INSTRUCTIONS: [Any special requirements or test-specific configurations]

## MANDATORY PRE-EXECUTION VALIDATION

Before running any tests, perform these checks:

### ✅ Step Definition Coverage Validation:
1. Open the target .feature file and identify all Given/When/Then steps
2. Open the corresponding -steps.js file
3. Verify every feature step has a matching step definition
4. Check for parameterized steps (with `<parameter>` or `{string}` patterns)
5. Ensure regex patterns in step definitions match feature file syntax
6. Report any missing step implementations before execution

### ✅ File Structure Validation:
1. Verify all required files exist:
   - .feature file (scenarios)
   - -steps.js file (step definitions)  
   - -page.js file (page objects)
   - -test.js file (test runner)
2. Check file naming consistency (same base name)
3. Validate import/require statements resolve correctly

### ✅ Execution Environment Check:
1. Verify application accessibility (if testing against live app)
2. Check browser/environment configuration
3. Validate locators marked as placeholders need updates
4. Confirm test data availability

## Expected Test Results

### ⚠️ Initial Execution (Placeholder Locators):
- Tests WILL fail with "Element not found" errors
- This is EXPECTED and REQUIRED behavior
- Failure reports should identify specific selectors needing updates

### ✅ After Locator Updates:
- Tests should interact with real application elements
- May still fail on business logic (which provides valuable feedback)
- Should generate meaningful test reports with actual results

## Execution Examples by Input Source Type
```

## Example Usage

### Text/Markdown Source Tests
```
INSTRUCTION: Execute the specified test artifacts. Tests will fail initially due to placeholder locators.

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/jira-story-cfc-bundle.feature
INPUT_SOURCE_TYPE: text

EXECUTION_OPTIONS:
- browser: chrome
- headless: false
- parallel: 1
- timeout: 300000
- debug: true
- screenshots: on-failure
- video: on-failure
- detailed_reports: true

REPORT_FORMAT: html,json,allure
REPORT_DIRECTORY: /Users/arog/framework/auto-coder/test-results

LOCATOR_VALIDATION: true
ERROR_ANALYSIS: true

SPECIAL_INSTRUCTIONS: Expect failures due to placeholder locators from text-based requirements.
```

### Image Source Tests
```
INSTRUCTION: Execute the specified test artifacts. Tests will fail initially due to placeholder locators.

TEST_TYPE: ui
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/home-page-design.feature
INPUT_SOURCE_TYPE: image

EXECUTION_OPTIONS:
- browser: chrome
- headless: false
- screenshots: always
- video: always
- detailed_reports: true

SPECIAL_INSTRUCTIONS: Visual tests generated from image mockups. Expect locator failures until UI elements are mapped.
```

### API Source Tests
```
INSTRUCTION: Execute the specified test artifacts. Tests will fail initially due to placeholder locators.

TEST_TYPE: api
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/api-endpoints.feature
INPUT_SOURCE_TYPE: curl

EXECUTION_OPTIONS:
- parallel: 4
- timeout: 60000
- debug: true

SPECIAL_INSTRUCTIONS: API tests from cURL specifications. Verify endpoint configurations and authentication.
```

### JIRA Source Tests
```
INSTRUCTION: Execute the specified test artifacts. Tests will fail initially due to placeholder locators.

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/PROJ-123.feature
INPUT_SOURCE_TYPE: jira

EXECUTION_OPTIONS:
- browser: chrome
- headless: false
- tags: "@story and @acceptance"
- detailed_reports: true

SPECIAL_INSTRUCTIONS: Tests generated from JIRA story acceptance criteria. Map to actual implementation.
```

### Confluence Source Tests
```
INSTRUCTION: Execute the specified test artifacts. Tests will fail initially due to placeholder locators.

TEST_TYPE: integration
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/requirements-page.feature
INPUT_SOURCE_TYPE: confluence

EXECUTION_OPTIONS:
- browser: chrome
- parallel: 2
- detailed_reports: true

SPECIAL_INSTRUCTIONS: Comprehensive tests from Confluence documentation. Verify all documented features.
```

### Design Source Tests
```
INSTRUCTION: Execute the specified test artifacts. Tests will fail initially due to placeholder locators.

TEST_TYPE: visual
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/figma-prototype.feature
INPUT_SOURCE_TYPE: figma

EXECUTION_OPTIONS:
- browser: chrome,firefox,webkit
- headless: false
- screenshots: always
- video: always
- detailed_reports: true

SPECIAL_INSTRUCTIONS: UX validation tests from design prototypes. Test across multiple browsers and devices.
```

## Quick Reference

To use this prompt, simply refer to it like this:
`/run-test-artifacts.prompt.md`

Then provide your specific inputs:

- Test type and target
- Execution options
- Report format and location
- Any special instructions

## Understanding Test Failures

When you run tests generated by this framework, they will initially fail - this is expected behavior:

1. **Missing/Incorrect Locators**: Tests are generated with placeholder locators that need to be updated
2. **Application Differences**: Generated tests might not match your exact application structure
3. **Environment Setup**: Some environment-specific configuration may be needed

## Locator Debugging and Fixing

To update tests with correct locators:

1. Run tests with debug mode enabled (`debug: true`)
2. Review test failures and identify missing/incorrect locators
3. Update page object files with correct XPath or CSS selectors
4. Replace placeholder locators with real UI element selectors
5. Run tests again to verify fixes

Example locator update:
```javascript
// BEFORE: Placeholder locator
const CLASSIC_FOOTER = By.css('[data-testid="classic-footer"]');

// AFTER: Real locator
const CLASSIC_FOOTER = By.xpath('//footer[@class="classic-footer-container"]');
```

## Transition to SBS_Automation

Once locators are updated and tests are working, you can easily move them to SBS_Automation:

1. Copy generated feature files to SBS_Automation's features directory
2. Copy generated step files to SBS_Automation's steps directory
3. Copy generated page files to SBS_Automation's pages directory
4. Update any import paths as needed
5. Run tests using SBS_Automation's test runner

### Using Direct Cucumber.js

```bash
npx cucumber-js <feature-file-or-directory> --require generated/steps --format json:test-results/report.json
```

## Execution Methods

Tests can be executed in several ways:

### Using index.js Runner (Recommended)

```bash
node index.js <feature-file-or-directory>
```

### Using Environment Variables for Configuration

```bash
BROWSER=chrome HEADLESS=false TAGS="@api" DEBUG=true node index.js <feature-file-or-directory>
```

### Debugging Options

Add these environment variables for better debugging:

```bash
DEBUG=true SCREENSHOTS=true TIMEOUT=300000 node index.js <feature-file-or-directory>
```

## Example Commands

### Run a specific feature file:
```bash
node index.js generated/features/jira-story-classic-footer.feature
```

### Run with debug mode and screenshots:
```bash
DEBUG=true SCREENSHOTS=true node index.js generated/features/jira-story-classic-footer.feature
```

### Run all features with a specific tag:
```bash
TAGS="@api" node index.js generated/features
```

### Run in headless mode with parallel execution:
```bash
HEADLESS=true PARALLEL=2 node index.js generated/features
```

Remember: Tests will initially fail due to placeholder locators. This is expected behavior, not a framework issue.

```bash
```bash
# Auto-Coder Enhanced Test Execution Commands

# Run specific feature file with enhanced reporting
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature

# Run specific test with detailed custom reports
./auto-coder.sh test generated/tests/jira-story-rs-end-point-test.js

# Run all generated tests with comprehensive reporting
npm run test:generated

# View reports manually (no auto-serving)
npm run reports:open          # HTML report
npm run reports:detailed      # Custom detailed report

# Clean reports directory
npm run reports:clean

# Debug specific test with enhanced logging
npm run dev:debug -- generated/tests/jira-story-rs-end-point-test.js

# Trace test execution for detailed analysis
npm run dev:trace

# Quick test run commands
npm run auto-coder-run        # Run predefined test
npm run test:cfc             # Run CFC bundle test
npm run generate:cfc         # Generate CFC artifacts
```

## Expected Behavior and Next Steps

### ⚠️ Initial Test Execution (Expected Failures):
1. **All tests WILL fail** - This is EXPECTED and REQUIRED behavior
2. **Failure reasons**: Placeholder locators (data-testid) don't exist in real applications
3. **Success indicator**: Detailed failure reports are generated with specific locator issues
4. **Framework validation**: Failures confirm real tests were generated (not mocks)

### 📊 Enhanced Reporting Features:
1. **HTML Report**: `generated/reports/html-report/index.html`
2. **Custom Detailed Report**: `generated/reports/custom/detailed-test-report.html`
3. **JSON Results**: `generated/reports/custom/detailed-results.json`
4. **Failure Analysis**: Detailed breakdown of each failure with recommendations
5. **Locator Guidance**: Specific instructions for updating selectors

### 🛠️ Next Steps for Real Application Testing:
1. **Review Failure Reports**: Check detailed reports for specific locator issues
2. **Inspect Real Application**: Use browser dev tools to find actual element selectors
3. **Update Page Files**: Replace placeholder locators in `generated/pages/` directory
4. **Validate Selectors**: Test selectors in browser console before updating
5. **Re-run Tests**: Execute tests again with updated locators
6. **Copy to SBS_Automation**: Move working tests to SBS_Automation framework

### 🎯 Integration with SBS_Automation:
1. Generated test artifacts follow SBS_Automation patterns exactly
2. Files can be copied directly after locator updates
3. Framework handles application launch and login procedures
4. Tests integrate seamlessly with existing SBS_Automation infrastructure

Remember: Initial test failures indicate the framework is working correctly by generating real tests, not mocks.
```

==================