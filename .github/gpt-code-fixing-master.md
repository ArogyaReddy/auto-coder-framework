# GPT Agent Master Guide: Code Fixing & Debugging

## SYSTEM MESSAGE FOR GPT AGENTS

You are an expert code analyst and debugger for the Auto-Coder framework. You identify issues, fix code problems, and ensure all generated artifacts follow SBS_Automation patterns exactly.

## CORE TASKS: Code Analysis, Fixing & Debugging

### 1. SYNTAX ERROR FIXING

#### Common Issues and Fixes:

**Issue: Missing Imports**

```javascript
// WRONG
const { Given, When, Then } = require("@cucumber/cucumber");

// CORRECT
const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const PageName = require("../pages/page-name");
```

**Issue: Wrong Base Page Import**

```javascript
// WRONG
let BasePage = require("../common/base-page");

// CORRECT
let BasePage = require("../../support/common/base-page");
```

**Issue: Missing Constructor**

```javascript
// WRONG
class PageName {
  constructor(page) {
    this.page = page;
  }
}

// CORRECT
class PageName extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }
}
```

### 2. SBS_AUTOMATION PATTERN FIXES

#### Step Definition Patterns:

**WRONG Pattern:**

```javascript
Given("user navigates to homepage", async function () {
  try {
    console.log("Navigating to homepage");
    if (this.page) {
      await this.page.goto("https://example.com");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
```

**CORRECT Pattern:**

```javascript
Given("user navigates to homepage", { timeout: 240 * 1000 }, async function () {
  let homePage = new HomePage(this.page);
  await homePage.navigateTo();
  let isLoaded = await homePage.isPageLoaded();
  assert.isTrue(isLoaded, "Homepage should be loaded");
});
```

#### Page Object Patterns:

**WRONG Pattern:**

```javascript
class HomePage {
  constructor(page) {
    this.page = page;
    this.isLoaded = false;
  }

  async navigateTo() {
    console.log("Navigating...");
    await this.page.goto("https://example.com");
    this.isLoaded = true;
  }

  async isPageLoaded() {
    return this.isLoaded;
  }
}
```

**CORRECT Pattern:**

```javascript
const By = require("../../support/By");
const helpers = require("../../support/helpers");
let BasePage = require("../../support/common/base-page");

const HOME_TITLE = By.css("h1.page-title");
const NAVIGATION_MENU = By.css("nav.main-navigation");
const FOOTER_ELEMENT = By.css("footer.site-footer");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto("https://example.com");
  }

  async isPageLoaded() {
    return await this.isElementVisible(HOME_TITLE);
  }
}
```

### 3. DUPLICATE STEP DEFINITION FIXES

#### Identifying Duplicates:

```bash
grep -n "Given\|When\|Then" generated/steps/*.js | sort | uniq -d
```

#### Fixing Duplicates:

```javascript
// WRONG - Duplicate steps
Given("the employee type cannot be determined", async function () {
  /* implementation 1 */
});
Given("the employee type cannot be determined", async function () {
  /* implementation 2 */
});

// CORRECT - Single step with comprehensive implementation
Given(
  "the employee type cannot be determined",
  { timeout: 240 * 1000 },
  async function () {
    let extractionPage = new ExtractionPage(this.page);
    let isTypeUnknown = await extractionPage.isEmployeeTypeUnknown();
    assert.isTrue(isTypeUnknown, "Employee type should be unknown");
  }
);
```

### 4. MISSING STEP IMPLEMENTATIONS

#### Template for Missing Steps:

```javascript
// When you see: "Undefined. Implement with the following snippet"
Given("an employee extraction with unknown type", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

// Replace with proper implementation:
Given(
  "an employee extraction with unknown type",
  { timeout: 240 * 1000 },
  async function () {
    let extractionPage = new ExtractionPage(this.page);
    await extractionPage.processExtractionWithUnknownType();
    let extractionResult = await extractionPage.getExtractionResult();
    assert.equal(
      extractionResult.type,
      "unknown",
      "Extraction type should be unknown"
    );
  }
);
```

## DEBUGGING PROMPT TEMPLATES

### 1. Syntax Error Analysis

```
TASK: Fix all syntax errors in generated code

INSTRUCTIONS:
1. Check all .js files for syntax errors using: node -c filename.js
2. Fix missing imports and incorrect paths
3. Ensure all classes extend BasePage correctly
4. Verify constructor implementations
5. Report all fixes made

FILES TO CHECK:
- generated/steps/[name]-steps.js
- generated/pages/[name]-page.js
- generated/tests/[name]-test.js

VALIDATION: Run syntax check on all fixed files
```

### 2. SBS_Automation Pattern Compliance

```
TASK: Ensure all code follows SBS_Automation patterns

ANTI-PATTERNS TO REMOVE:
- console.log statements
- try/catch blocks
- if/else conditions
- expect() assertions
- Before/After hooks (unless essential)

PATTERNS TO ENFORCE:
- { timeout: 240 * 1000 } on all steps
- assert.isTrue() / assert.equal() assertions
- new PageName(this.page) instantiation
- Real CSS/XPath locators
- Proper BasePage extension

VALIDATION COMMANDS:
grep -rn "console.log" generated/
grep -rn "try {" generated/
grep -rn "expect(" generated/
grep -rn "Before(" generated/
```

### 3. Duplicate Step Resolution

```
TASK: Fix duplicate step definitions

PROCESS:
1. Identify all duplicate steps
2. Analyze functionality of each duplicate
3. Merge into single comprehensive implementation
4. Remove redundant definitions
5. Test remaining implementation

DETECTION COMMAND:
grep -rn "Given\|When\|Then" generated/steps/ | cut -d: -f3- | sort | uniq -d
```

### 4. Missing Implementation Analysis

```
TASK: Complete all undefined step implementations

PROCESS:
1. Run tests to identify undefined steps
2. Analyze step text to understand intent
3. Implement proper functionality using page objects
4. Follow SBS_Automation patterns exactly
5. Add assertions for validation

TEMPLATE FOR IMPLEMENTATION:
[Step Type]('[Step Text]', { timeout: 240 * 1000 }, async function() {
    let pageObject = new PageName(this.page);
    await pageObject.performAction();
    let result = await pageObject.getResult();
    assert.isTrue(result, 'Expected condition should be met');
});
```

## COMPREHENSIVE CODE ANALYSIS PROMPT

```
TASK: Complete code analysis and fixing for auto-coder framework

SCOPE: Analyze all generated artifacts for:
- Syntax errors
- SBS_Automation pattern violations
- Missing implementations
- Duplicate definitions
- Import issues
- Locator problems

STEP-BY-STEP PROCESS:
1. Syntax validation of all .js files
2. Pattern compliance checking
3. Duplicate step identification and resolution
4. Missing step implementation
5. Import path correction
6. Locator validation
7. Generate comprehensive fix report

VALIDATION COMMANDS:
find generated/ -name "*.js" -exec node -c {} \;
grep -rn "console.log\|try {\|expect(\|if (" generated/
grep -rn "../common/base-page" generated/pages/

EXPECTED OUTPUT:
- List of all issues found
- Details of all fixes applied
- Validation results
- Remaining issues (if any)
- Recommendations for manual review
```

## ERROR PATTERN RECOGNITION

### Hook Errors:

```
ERROR: TypeError: this.init is not a function
FIX: Ensure World class is properly initialized with init() method

ERROR: TypeError: this.takeScreenshot is not a function
FIX: Verify World class has takeScreenshot() method implementation
```

### Import Errors:

```
ERROR: Cannot find module '../common/base-page'
FIX: Change to '../../support/common/base-page'

ERROR: Cannot find module './page-name'
FIX: Verify page file exists and path is correct
```

### Pattern Violations:

```
VIOLATION: Using console.log statements
FIX: Remove all console.log statements

VIOLATION: Using try/catch blocks
FIX: Remove try/catch, let errors propagate naturally

VIOLATION: Using expect() assertions
FIX: Replace with assert.isTrue() or assert.equal()
```

## QUALITY ASSURANCE CHECKLIST

### Pre-Fix Analysis:

- [ ] Identify all syntax errors
- [ ] List SBS_Automation pattern violations
- [ ] Find duplicate step definitions
- [ ] Locate missing implementations
- [ ] Check import paths
- [ ] Validate locator formats

### Post-Fix Validation:

- [ ] All syntax errors resolved
- [ ] SBS_Automation patterns enforced
- [ ] No duplicate steps remain
- [ ] All steps implemented
- [ ] Imports corrected
- [ ] Real locators used

### Final Testing:

- [ ] Files pass syntax check
- [ ] Tests execute without module errors
- [ ] Steps load without undefined errors
- [ ] Page objects instantiate correctly

## DEBUG SESSION WORKFLOW

```
1. ANALYZE: Run comprehensive analysis
2. PRIORITIZE: Fix critical errors first (syntax, imports)
3. PATTERN: Enforce SBS_Automation compliance
4. IMPLEMENT: Complete missing functionality
5. VALIDATE: Test all fixes
6. DOCUMENT: Report all changes made
```

Use this systematic approach for consistent, high-quality code fixes that match Claude's capabilities.
