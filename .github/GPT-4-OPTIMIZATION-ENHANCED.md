# GPT-4.1/GPT-4o OPTIMIZATION GUIDE - ENHANCED VERSION

## ROOT CAUSES OF GPT-4.1/GPT-4o FAILURES

### 1. FILE NAMING FAILURES
**Problem**: GPT models use generic names instead of input file basename
**Solution**: ENFORCE mandatory file reading with explicit basename extraction

### 2. REQUIREMENT READING FAILURES  
**Problem**: GPT models generate template code without reading actual requirements
**Solution**: Make file reading the FIRST mandatory step with validation

### 3. SBS_AUTOMATION PATTERN VIOLATIONS
**Problem**: GPT models add prohibited patterns (console.log, try/catch, if/else)
**Solution**: Explicit pattern enforcement with negative examples

### 4. IMAGE/CURL PROCESSING WEAKNESSES
**Problem**: GPT models struggle with visual analysis and API parsing
**Solution**: Step-by-step processing guides for each input type

## ENHANCED SYSTEM PROMPT STRUCTURE

### CRITICAL SUCCESS FACTORS

#### Factor 1: MANDATORY TOOL USAGE ENFORCEMENT
```
SYSTEM: You MUST use these tools in this EXACT sequence:

1. read_file tool - Read the actual requirement file content
2. Extract basename from file path for naming (CRITICAL)
3. Generate 5 files using SBS_Automation patterns
4. Validate against checklist before submission

FAILURE to use read_file tool = AUTOMATIC FAILURE
```

#### Factor 2: EXPLICIT NEGATIVE EXAMPLES
```
❌ NEVER GENERATE:
- console.log anywhere
- try { ... } catch blocks  
- if/else statements
- Before/After hooks in steps
- expect() assertions
- Generic file names like "typeless" or "template"

✅ ALWAYS GENERATE:
- assert.isTrue() and assert.equal() only
- { timeout: 240 * 1000 } format
- Exact basename from input file path
- Real locators using By.xpath/css
```

#### Factor 3: INPUT-SPECIFIC PROCESSING

##### For IMAGE Files:
```
MANDATORY SEQUENCE for IMAGE inputs:
1. Use read_file or file analysis to understand image content
2. List ALL visible UI elements (buttons, forms, labels, fields)
3. Generate REAL CSS/XPath selectors for each element
4. Create test scenarios for every visible component
5. Map each UI element to specific test actions

EXAMPLE - If image shows "Add Employee" button:
✅ Correct: By.xpath('//button[@data-testid="add-employee"]')
❌ Wrong: By.xpath('//button[contains(text(),"Add")]')
```

##### For CURL/API Files:
```
MANDATORY SEQUENCE for CURL inputs:
1. Parse actual curl command syntax
2. Extract method, endpoint, headers, payload
3. Generate API test scenarios with proper validation
4. Include authentication and error handling tests
5. Use real endpoint URLs and parameters

EXAMPLE - If curl shows POST /api/users:
✅ Correct: Test POST /api/users endpoint with validation
❌ Wrong: Generic API template tests
```

#### Factor 4: QUALITY VALIDATION GATES
```
BEFORE submitting ANY files, verify:

GATE 1 - FILE NAMING:
✅ basename = extract from actual input file path
✅ All 5 files use EXACT same basename
✅ No "typeless", "template", or generic names

GATE 2 - CONTENT QUALITY:
✅ Actually read and analyzed requirement file
✅ Generated content matches specific requirements
✅ No template or placeholder content

GATE 3 - SBS_AUTOMATION COMPLIANCE:
✅ Zero prohibited patterns (console.log, try/catch, if/else)
✅ Only allowed assertions (assert.isTrue, assert.equal)
✅ Proper timeout format: { timeout: 240 * 1000 }

GATE 4 - COMPLETENESS:
✅ All feature steps have implementations
✅ Real locators (no mock selectors)
✅ Comprehensive test coverage
```

## SPECIFIC GPT-4.1/GPT-4o PROMPT TEMPLATE

### SYSTEM MESSAGE:
```
You are a test automation expert. Your task is to generate 5 SBS_Automation compliant test files.

CRITICAL RULE: You MUST first use the read_file tool to read the actual requirement file content.

MANDATORY EXECUTION SEQUENCE:
1. Use read_file tool on the provided INPUT_FILE_PATH
2. Extract exact basename from file path (e.g., "jira-story-cfc-bundle" from "/path/to/jira-story-cfc-bundle.txt")
3. Generate 5 files using that EXACT basename for all file names
4. Follow SBS_Automation patterns precisely (no console.log, try/catch, if/else)
5. Validate against quality checklist

FAILURE to read the file = AUTOMATIC FAILURE
FAILURE to use exact basename = AUTOMATIC FAILURE
```

### USER MESSAGE TEMPLATE:
```
INPUT_SOURCE_TYPE: [type]
INPUT_FILE_PATH: [full_path_to_requirement_file]

REQUIRED DELIVERABLES:
1. [basename]-summary.md - Requirement analysis
2. [basename].feature - Cucumber BDD scenarios  
3. [basename]-steps.js - Step definitions with SBS_Automation patterns
4. [basename]-page.js - Page object with real locators
5. [basename]-test.js - Test execution file

SBS_AUTOMATION RULES:
❌ NO console.log, try/catch, if/else anywhere
❌ NO Before/After hooks in steps
❌ NO expect() assertions
✅ ONLY assert.isTrue() and assert.equal()
✅ Timeout format: { timeout: 240 * 1000 }
✅ Real locators using By.xpath/css

OUTPUT_DIRECTORY: /Users/arog/framework/auto-coder/generated

EXECUTE NOW. NO EXPLANATIONS. GENERATE 5 FILES.
```

## SUCCESS METRICS

### Before vs After Comparison:
```
BEFORE (Failed GPT outputs):
- Generic names: jira-story-typeless-*
- Template content not matching requirements  
- SBS_Automation violations
- Poor image/curl processing

AFTER (Target GPT outputs):
- Exact names: jira-story-cfc-bundle-*
- Requirement-matched content
- Perfect SBS_Automation compliance
- Comprehensive image/curl analysis
```

### Quality Validation:
```
EXPECTED OUTPUT QUALITY = CLAUDE LEVEL
- File naming: EXACT basename usage
- Content quality: Requirement-matched, not generic
- Pattern compliance: Zero violations  
- Test coverage: Comprehensive and realistic
```

This enhanced guide should significantly improve GPT-4.1/GPT-4o performance to match Claude's output quality.
