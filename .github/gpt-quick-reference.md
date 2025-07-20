# GPT Agent Quick Reference Card

## INSTANT COMMANDS FOR GPT-4.1/GPT-4o

### 🚀 QUICK START - TEST EXECUTION

```bash
cd /Users/arog/framework/auto-coder && find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \; && ./auto-coder.sh test generated/features/jira-story-rs-end-point.feature && open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html
```

### 🔧 QUICK START - TEST GENERATION

```
PROMPT: Generate test artifacts from [input_type] source at [path]. Follow SBS_Automation patterns exactly. Use real locators. Generate all 5 artifacts (feature, steps, page, test, guide). Validate syntax and report results.
```

### 🩺 QUICK START - CODE ANALYSIS

```bash
find generated/ -name "*.js" -exec node -c {} \; && grep -rn "console.log\|try {\|expect(\|../common/base-page" generated/
```

---

## CONVERSATION STARTERS FOR EACH TASK

### 1. TEST ARTIFACT GENERATION

**Copy-paste this prompt to GPT:**

```
I need you to generate complete test artifacts for the auto-coder framework.

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/your-requirement.txt

MANDATORY REQUIREMENTS:
✅ Generate feature file with BDD scenarios
✅ Generate steps file with SBS_Automation patterns (no console.log, try/catch, if/else)
✅ Generate page file extending BasePage with real CSS/XPath locators
✅ Generate test file for execution
✅ Generate implementation guide
✅ Include { timeout: 240 * 1000 } on all steps
✅ Use assert.isTrue() / assert.equal() for assertions
✅ Import ../../support/common/base-page (not ../common/base-page)

Execute systematically: analyze input → generate artifacts → validate syntax → report results.
```

### 2. TEST EXECUTION

**Copy-paste this prompt to GPT:**

```
Execute test artifacts for auto-coder framework:

COMMANDS TO RUN IN ORDER:
1. cd /Users/arog/framework/auto-coder
2. find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
3. ./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
4. open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html

EXPECTED: Tests will fail (normal). Authentication should load. Reports should generate.
REPORT: Number of scenarios, pass/fail status, report locations, issues found.

Execute each command and tell me the results.
```

### 3. CODE FIXING & DEBUGGING

**Copy-paste this prompt to GPT:**

```
Analyze and fix all issues in auto-coder generated code:

TASKS:
1. Check syntax: find generated/ -name "*.js" -exec node -c {} \;
2. Find anti-patterns: grep -rn "console.log\|try {\|expect(\|if (" generated/
3. Fix import paths: grep -rn "../common/base-page" generated/pages/
4. Remove duplicate step definitions
5. Implement missing steps
6. Validate all fixes

REQUIREMENTS:
- Fix ALL syntax errors
- Remove ALL anti-patterns
- Correct ALL import paths
- Implement ALL missing steps
- Follow SBS_Automation patterns exactly

Report all issues found and fixes applied.
```

### 4. DOCUMENTATION & ANALYSIS

**Copy-paste this prompt to GPT:**

```
Create comprehensive documentation for auto-coder artifacts:

ANALYZE:
- Requirements from input source
- Generated feature scenarios
- Step implementations
- Page object structure
- Test coverage gaps

DOCUMENT:
- Complete implementation guide
- Locator update instructions
- Troubleshooting procedures
- Quality checklists
- Next steps recommendations

OUTPUT: Complete user guide with specific, actionable instructions.
```

---

## TROUBLESHOOTING QUICK FIXES

### ❌ "Cannot find module '../common/base-page'"

```bash
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
```

### ❌ "Command not found: ./auto-coder.sh"

```bash
cd /Users/arog/framework/auto-coder && chmod +x auto-coder.sh
```

### ❌ "Multiple step definitions match"

```
TASK: Find and remove duplicate steps in generated/steps/*.js files. Keep most comprehensive implementation.
```

### ❌ "Undefined step"

```javascript
// Template for missing steps:
Given("[step text]", { timeout: 240 * 1000 }, async function () {
  let pageObject = new PageName(this.page);
  await pageObject.performAction();
  let result = await pageObject.validateResult();
  assert.isTrue(result, "Expected condition message");
});
```

### ❌ No reports generated

```bash
ls -la generated/reports/custom/
ls -la generated/reports/playwright-report/
```

---

## QUALITY VALIDATION COMMANDS

### Syntax Check:

```bash
find generated/ -name "*.js" -exec node -c {} \;
```

### Anti-pattern Detection:

```bash
grep -rn "console.log\|try {\|expect(\|if (" generated/
```

### Import Validation:

```bash
grep -rn "../common/base-page" generated/pages/
```

### Step Coverage Check:

```bash
grep -rn "return 'pending'" generated/steps/
```

---

## SUCCESS INDICATORS

### ✅ Test Generation Success:

- All 5 files generated (feature, steps, page, test, guide)
- No syntax errors in JavaScript files
- SBS_Automation patterns followed
- Real locators used
- Complete documentation provided

### ✅ Test Execution Success:

- Commands run without "not found" errors
- Authentication configuration loads
- Test scenarios execute (even if failing)
- HTML reports generated
- Specific failure analysis provided

### ✅ Code Analysis Success:

- All issues identified and fixed
- Pattern compliance enforced
- Duplicate steps removed
- Missing implementations added
- Validation confirms improvements

### ✅ Documentation Success:

- Complete requirement analysis
- Clear implementation steps
- Specific troubleshooting guidance
- Quality metrics included
- Actionable next steps provided

---

## EMERGENCY RESET

If GPT gets completely stuck:

```bash
cd /Users/arog/framework/auto-coder
git clean -fd generated/
npm install
./auto-coder.sh help
```

Then restart with fresh prompts from above.

---

**📋 Keep this reference handy when working with GPT-4.1/GPT-4o agents on the auto-coder framework!**
