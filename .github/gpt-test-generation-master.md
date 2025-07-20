# GPT Agent Master Guide: Test Artifact Generation

## SYSTEM MESSAGE FOR GPT AGENTS

You are an expert test automation engineer specializing in the Auto-Coder framework. You generate high-quality test artifacts that match SBS_Automation patterns exactly. You follow instructions precisely and validate all outputs.

## CORE TASK: Generate Test Artifacts

### Step-by-Step Generation Process

#### Phase 1: Input Analysis

```
1. Read and analyze the input file completely
2. Identify key requirements, UI elements, and test scenarios
3. Extract acceptance criteria and business rules
4. Document all findings in a structured format
```

#### Phase 2: Artifact Generation

```
1. Generate .feature file with BDD scenarios
2. Generate -steps.js file with SBS_Automation patterns
3. Generate -page.js file with real locators
4. Generate -test.js file for execution
5. Generate _guide.md documentation
```

#### Phase 3: Validation

```
1. Verify all files follow SBS_Automation patterns
2. Check for syntax errors and missing imports
3. Ensure all steps have implementations
4. Validate naming conventions
5. Generate summary report
```

## PROMPT TEMPLATES FOR EACH INPUT TYPE

### 1. Text Files (.txt, .md)

```
TASK: Generate test artifacts from text requirements

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: [provided path]

INSTRUCTIONS:
1. Read the text file and extract all requirements
2. Create BDD scenarios covering all functionality
3. Generate page objects with placeholder locators (CSS/XPath)
4. Create step definitions following SBS_Automation patterns:
   - No console.log statements
   - No try/catch blocks
   - No if/else conditions
   - Include { timeout: 240 * 1000 }
   - Use assertions like assert.isTrue()
   - Instantiate page objects within steps: new PageName(this.page)
5. Generate comprehensive documentation

OUTPUT FILES:
- generated/features/[basename].feature
- generated/steps/[basename]-steps.js
- generated/pages/[basename]-page.js
- generated/tests/[basename]-test.js
- generated/summary/[basename]_guide.md

VALIDATION: Check all files for SBS_Automation compliance and syntax errors
```

### 2. Image Files (.png, .jpg, .jpeg, .gif)

```
TASK: Generate UI test artifacts from image analysis

INPUT_SOURCE_TYPE: image
INPUT_FILE_PATH: [provided path]

INSTRUCTIONS:
1. Analyze the image for UI elements, buttons, forms, navigation
2. Create visual validation scenarios
3. Generate locators for identified elements:
   - Buttons: By.css('button[data-testid="button-name"]')
   - Forms: By.css('#form-id input[name="field-name"]')
   - Navigation: By.xpath('//nav//a[text()="Menu Item"]')
4. Create responsive design test scenarios
5. Follow SBS_Automation patterns exactly

SPECIAL FOCUS:
- Identify all interactive elements
- Create accessibility test scenarios
- Generate mobile responsiveness tests
- Include visual regression checkpoints
```

### 3. cURL API Requests

```
TASK: Generate API test artifacts from cURL commands

INPUT_SOURCE_TYPE: curl
INPUT_FILE_PATH: [provided path]

INSTRUCTIONS:
1. Parse cURL commands for endpoints, headers, payloads
2. Create API testing scenarios with request/response validation
3. Generate authentication test scenarios
4. Create error handling test cases
5. Follow API testing best practices

API TEST PATTERNS:
- Validate response status codes
- Check response schemas
- Test authentication flows
- Verify error responses
- Include performance benchmarks
```

### 4. JIRA Integration

```
TASK: Generate test artifacts from JIRA stories/epics

INPUT_SOURCE_TYPE: jira
INPUT_FILE_PATH: [provided path]

INSTRUCTIONS:
1. Extract acceptance criteria from JIRA content
2. Create comprehensive test coverage for all criteria
3. Generate user story-based scenarios
4. Include edge cases and error scenarios
5. Map to existing UI/API patterns

JIRA-SPECIFIC PATTERNS:
- Story: Create feature scenarios
- Epic: Create comprehensive test suites
- Bug: Create regression test scenarios
- Task: Create verification scenarios
```

### 5. Confluence Pages

```
TASK: Generate test artifacts from Confluence documentation

INPUT_SOURCE_TYPE: confluence
INPUT_FILE_PATH: [provided path]

INSTRUCTIONS:
1. Parse structured requirements from Confluence
2. Extract business rules and workflows
3. Create documentation-driven test scenarios
4. Generate integration test scenarios
5. Include all documented features

CONFLUENCE PATTERNS:
- Requirements: Create functional tests
- Workflows: Create process validation tests
- APIs: Create integration tests
- User guides: Create acceptance tests
```

### 6. Design Files (Figma, Adobe XD, Sketch)

```
TASK: Generate UX validation test artifacts from design files

INPUT_SOURCE_TYPE: [figma|adobe-xd|sketch]
INPUT_FILE_PATH: [provided path]

INSTRUCTIONS:
1. Extract design specifications and interactions
2. Create UX validation test scenarios
3. Generate responsive design tests
4. Create accessibility compliance tests
5. Include cross-browser compatibility tests

DESIGN-SPECIFIC PATTERNS:
- Layout validation
- Color and typography checks
- Interactive element testing
- Animation and transition validation
- Mobile/tablet responsiveness
```

## UNIVERSAL GENERATION TEMPLATE

Use this template for ANY input source:

```
I need you to generate test artifacts for the auto-coder framework.

INPUT_SOURCE_TYPE: [type]
INPUT_FILE_PATH: [path]

MANDATORY REQUIREMENTS:
1. Generate ALL required artifacts (feature, steps, page, test, guide)
2. Follow SBS_Automation patterns EXACTLY
3. Use real locators (CSS selectors, XPath)
4. No console.log, try/catch, or if/else blocks
5. Include timeouts: { timeout: 240 * 1000 }
6. Use proper assertions: assert.isTrue(), assert.equal()
7. Instantiate page objects in steps: new PageName(this.page)

STEP-BY-STEP PROCESS:
1. Analyze input and extract requirements
2. Generate feature file with BDD scenarios
3. Generate steps file with SBS_Automation patterns
4. Generate page file with real locators and BasePage extension
5. Generate test file for execution
6. Generate guide with implementation details
7. Validate all files for syntax and patterns
8. Report file paths and any issues found

EXPECTED OUTPUT:
List all generated file paths and confirm SBS_Automation compliance.
```

## QUALITY VALIDATION CHECKLIST

After generation, GPT agents should verify:

### Feature Files (.feature)

- [ ] Uses proper Gherkin syntax
- [ ] Scenarios cover all requirements
- [ ] Steps are clear and actionable
- [ ] Background and Examples used appropriately

### Steps Files (-steps.js)

- [ ] Imports: const { Given, When, Then } = require('@cucumber/cucumber');
- [ ] Imports: const assert = require('assert');
- [ ] Imports: const PageName = require('../pages/page-name');
- [ ] No Before/After hooks (unless specifically needed)
- [ ] No console.log statements
- [ ] No try/catch blocks
- [ ] No if/else conditions
- [ ] Includes { timeout: 240 \* 1000 } for each step
- [ ] Uses assert.isTrue() instead of expect()
- [ ] Instantiates page objects: new PageName(this.page)

### Page Files (-page.js)

- [ ] Imports: const By = require('../../support/By');
- [ ] Imports: const helpers = require('../../support/helpers');
- [ ] Imports: let BasePage = require('../../support/common/base-page');
- [ ] Class extends BasePage
- [ ] Locators declared at top of file
- [ ] Constructor calls super(page) and sets this.page
- [ ] No console.log statements
- [ ] Real CSS/XPath selectors (not mocks)

### Test Files (-test.js)

- [ ] Proper Playwright test structure
- [ ] Uses page objects correctly
- [ ] Includes authentication setup
- [ ] Has proper test cleanup

### Guide Files (\_guide.md)

- [ ] Complete requirement analysis
- [ ] Implementation instructions
- [ ] Locator update guidance
- [ ] Known issues and solutions

## ERROR PREVENTION

### Common GPT Mistakes to Avoid:

1. **Missing imports** - Always include all required imports
2. **Wrong base-page path** - Use ../../support/common/base-page
3. **Console.log usage** - Remove all console statements
4. **Missing timeouts** - Always include { timeout: 240 \* 1000 }
5. **Mock locators** - Use real CSS/XPath selectors
6. **Try/catch blocks** - Remove all error handling blocks
7. **Expect() usage** - Use assert.isTrue() instead

### Validation Commands for GPT:

```bash
# Check syntax
node -c generated/steps/[filename]-steps.js
node -c generated/pages/[filename]-page.js

# Verify patterns
grep -n "console.log" generated/**/*.js
grep -n "try {" generated/**/*.js
grep -n "expect(" generated/**/*.js
```

## SUCCESS INDICATORS

GPT agent should report:

- ✅ All 5 artifacts generated
- ✅ SBS_Automation patterns followed
- ✅ Real locators used
- ✅ No syntax errors
- ✅ All imports correct
- ✅ Documentation complete

## FINAL VALIDATION PROMPT

After generation, use this prompt:

```
Validate all generated files:
1. Check syntax of all .js files
2. Verify SBS_Automation pattern compliance
3. Ensure all steps have implementations
4. Confirm real locators are used
5. Validate all imports are correct
6. Generate validation report

Report any issues found and provide fixes.
```
