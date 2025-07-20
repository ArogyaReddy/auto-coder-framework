# GPT-4.1/GPT-4o Optimization Guide for Test Artifacts Generation

## CRITICAL INSTRUCTIONS FOR GPT-4.1/GPT-4o

### 1. ALWAYS READ THE ACTUAL REQUIREMENT FILE FIRST
```
MANDATORY: Before generating ANY files, ALWAYS use read_file tool to read the actual requirement file content.
NEVER assume or reuse previous context.
NEVER generate files without reading the source requirement file.
```

### 2. EXACT FILE NAMING CONVENTIONS
```
RULE: Use the EXACT basename from the input file path for ALL generated files.
Example: 
- Input: /path/to/jira-story-cfc-bundle.txt
- Output files MUST be: jira-story-cfc-bundle-steps.js, jira-story-cfc-bundle-page.js, etc.
- NOT: jira-story-typeless-* or any other name
```

### 3. SBS_AUTOMATION PATTERN ENFORCEMENT
```javascript
// MANDATORY STRUCTURE FOR STEPS FILES:
const { assert } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');
const PageName = require('../../pages/exact-page-name');

// STEP FORMAT (EXACT):
Given('step description', { timeout: 240 * 1000 }, async function () {
  let result = await new PageName(this.page).methodName();
  assert.isTrue(result, 'Error message');
});

// PROHIBITED:
// ❌ NO Before/After hooks
// ❌ NO try/catch blocks  
// ❌ NO if/else statements
// ❌ NO console.log
// ❌ NO expect() - use assert.isTrue() and assert.equal() only
```

### 4. SBS_AUTOMATION PAGE OBJECT PATTERN
```javascript
// MANDATORY STRUCTURE FOR PAGE FILES:
const By = require('../../support/By');
const helpers = require('../../support/helpers');
let BasePage = require('../common/base-page');

// LOCATORS AT TOP (EXACT PATTERN):
const ELEMENT_NAME = By.xpath('//xpath-here');
const BUTTON_NAME = By.css('.css-selector-here');

class PageName extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async methodName() {
    return await this.isVisible(ELEMENT_NAME);
  }
}
module.exports = PageName;
```

### 5. IMAGE PROCESSING REQUIREMENTS
```
For IMAGE inputs:
1. Use fetch_webpage tool to analyze the image
2. Extract ALL visible UI elements, buttons, forms, labels
3. Generate REAL CSS/XPath selectors based on visible elements
4. Map each UI element to corresponding test actions
5. Create comprehensive scenarios covering all visible functionality
```

### 6. CURL API PROCESSING REQUIREMENTS  
```
For CURL inputs:
1. Parse the actual curl command structure
2. Extract endpoint, method, headers, payload
3. Generate API test scenarios for each endpoint
4. Include request/response validation
5. Create comprehensive error handling scenarios
```

### 7. VALIDATION CHECKLIST FOR GPT-4.1/GPT-4o
```
Before submitting generated files, GPT MUST verify:
✅ Read actual requirement file content using read_file tool
✅ File names match input file basename exactly
✅ No Before/After hooks in steps files
✅ No try/catch, if/else, console.log anywhere
✅ All steps use { timeout: 240 * 1000 } format
✅ All assertions use assert.isTrue() or assert.equal()
✅ Page objects extend BasePage with proper constructor
✅ Locators declared at top using By.xpath() or By.css()
✅ All feature steps have corresponding step implementations
✅ Real locators used (not mocked selectors)
```

### 8. STEP-BY-STEP PROCESS FOR GPT-4.1/GPT-4o
```
STEP 1: Read requirement file using read_file tool
STEP 2: Extract basename from input file path for naming
STEP 3: Analyze content and create comprehensive scenarios
STEP 4: Generate files using EXACT SBS_Automation patterns
STEP 5: Validate all files against checklist above
STEP 6: Save files with correct naming convention
```

### 9. SPECIFIC PROMPTING STRATEGIES
```
EFFECTIVE PROMPTS for GPT-4.1/GPT-4o:

"SYSTEM: You are a test automation expert. Follow SBS_Automation patterns exactly.

MANDATORY STEPS:
1. Read the requirement file: [FILE_PATH]
2. Use basename from file path for ALL generated file names
3. Generate 5 files following exact SBS_Automation patterns
4. No explanations - just code
5. Validate against SBS_Automation checklist

GENERATE FILES NOW."
```

### 10. QUALITY ENFORCEMENT TECHNIQUES
```
To improve GPT-4.1/GPT-4o quality:

1. EXPLICIT EXAMPLES: Provide exact SBS_Automation file examples
2. NEGATIVE EXAMPLES: Show what NOT to generate
3. VALIDATION RULES: Include checklist in every prompt
4. ITERATIVE REFINEMENT: Ask for corrections if output is wrong
5. CONTEXT ISOLATION: Clear previous context before new requests
```

## IMPLEMENTATION RECOMMENDATIONS

### For Image Processing:
- Always use fetch_webpage tool first
- Extract every visible UI element
- Map elements to real selectors
- Generate comprehensive test scenarios

### For API/CURL Processing:
- Parse actual curl command structure
- Extract all parameters and headers  
- Generate request/response validation
- Include error scenario testing

### For Text Requirements:
- Read actual file content first
- Extract all acceptance criteria
- Map to comprehensive test scenarios
- Use exact naming conventions

This guide should significantly improve GPT-4.1/GPT-4o test artifact generation quality.
