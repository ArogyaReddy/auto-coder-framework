# 🎯 GPT-4.1/GPT-4o EXACT USAGE EXAMPLES

## HOW TO GET CLAUDE-LEVEL RESULTS FROM GPT AGENTS

> **This guide shows you EXACTLY what to prompt GPT agents to get the same results as Claude**

---

## 🚀 QUICK START: COPY-PASTE THESE PROMPTS

### Example 1: Generate Test Artifacts (Like Your Claude Example)

**YOUR CLAUDE PROMPT:**

```
## Generation Test Artifacts :
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/jira-story-cfc-bundle.txt
```

**EXACT GPT-4.1/GPT-4o PROMPT:**

```
I am using the auto-coder framework and need you to generate complete test artifacts exactly like Claude would.

TASK: Generate test artifacts from text requirements

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/jira-story-cfc-bundle.txt

MANDATORY REQUIREMENTS (follow exactly):
✅ Generate feature file with BDD scenarios
✅ Generate steps file with SBS_Automation patterns (NO console.log, try/catch, if/else)
✅ Generate page file extending BasePage with real CSS/XPath locators
✅ Generate test file for execution
✅ Generate implementation guide
✅ Include { timeout: 240 * 1000 } on all steps
✅ Use assert.isTrue() / assert.equal() for assertions
✅ Import ../../support/common/base-page (NOT ../common/base-page)
✅ Instantiate page objects: new PageName(this.page)

EXECUTE SYSTEMATICALLY:
1. Read and analyze the input file completely
2. Generate all 5 artifacts following SBS_Automation patterns
3. Validate syntax and compliance
4. Report results with file locations

Do NOT deviate from these patterns. Generate the actual code files.
```

---

## 🔄 EXAMPLE 2: Run Tests (Like Your Claude Example)

**YOUR CLAUDE PROMPT:**

```
## Run Tests :
/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/jira-story-rs-end-point.feature

EXECUTION_OPTIONS:
- browser: chrome
- headless: false
```

**EXACT GPT-4.1/GPT-4o PROMPT:**

```
Execute test artifacts for auto-coder framework exactly like Claude would.

TASK: Run generated feature tests

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/jira-story-rs-end-point.feature

EXECUTION_OPTIONS:
- browser: chrome
- headless: false

COMMANDS TO RUN IN THIS EXACT ORDER:
1. cd /Users/arog/framework/auto-coder
2. find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
3. ./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
4. open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html

EXPECTED BEHAVIOR:
- Tests will fail initially (this is normal with generated locators)
- Authentication page should load
- Reports should generate successfully
- You should see scenario execution details

Execute each command step by step and report:
- Command executed
- Output received
- Success/failure status
- Next steps needed

Do this systematically like Claude would.
```

---

## 📋 COMPLETE EXAMPLES FOR ALL INPUT TYPES

### TEXT FILES Example

**Prompt GPT-4.1/GPT-4o with:**

```
Generate test artifacts from text requirements exactly like Claude.

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/your-requirement.txt

Follow the complete process from /Users/arog/framework/auto-coder/.github/gpt-test-generation-master.md

MANDATORY: Generate ALL 5 artifacts with SBS_Automation patterns. Report file locations when complete.
```

### IMAGE FILES Example

**Prompt GPT-4.1/GPT-4o with:**

```
Generate UI test artifacts from image analysis exactly like Claude.

INPUT_SOURCE_TYPE: image
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/images/mockup.png

Analyze the image for:
- UI elements (buttons, forms, navigation)
- Interactive components
- Visual validation points
- Responsive design elements

Generate complete test artifacts following SBS_Automation patterns.
Follow the complete process from /Users/arog/framework/auto-coder/.github/gpt-test-generation-master.md
```

### CURL/API Example

**Prompt GPT-4.1/GPT-4o with:**

```
Generate API test artifacts from cURL commands exactly like Claude.

INPUT_SOURCE_TYPE: curl
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/curl/api-endpoints.txt

Parse cURL commands and create:
- Request/response validation scenarios
- Authentication test flows
- Error handling test cases
- API performance benchmarks

Follow SBS_Automation patterns exactly.
Follow the complete process from /Users/arog/framework/auto-coder/.github/gpt-test-generation-master.md
```

### JIRA Example

**Prompt GPT-4.1/GPT-4o with:**

```
Generate test artifacts from JIRA story exactly like Claude.

INPUT_SOURCE_TYPE: jira
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/jira/PROJ-123.json

Extract acceptance criteria and generate:
- User story-based scenarios
- Edge cases and error scenarios
- Comprehensive test coverage
- Regression test scenarios

Follow SBS_Automation patterns exactly.
Follow the complete process from /Users/arog/framework/auto-coder/.github/gpt-test-generation-master.md
```

### CONFLUENCE Example

**Prompt GPT-4.1/GPT-4o with:**

```
Generate test artifacts from Confluence documentation exactly like Claude.

INPUT_SOURCE_TYPE: confluence
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/confluence/requirements-page.html

Parse documentation and create:
- Documentation-driven test scenarios
- Feature verification tests
- Process validation scenarios
- Integration test cases

Follow SBS_Automation patterns exactly.
Follow the complete process from /Users/arog/framework/auto-coder/.github/gpt-test-generation-master.md
```

### FIGMA/DESIGN Example

**Prompt GPT-4.1/GPT-4o with:**

```
Generate UX test artifacts from design files exactly like Claude.

INPUT_SOURCE_TYPE: figma
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/design/prototype.json

Analyze design for:
- UX validation scenarios
- Responsive design tests
- Cross-browser compatibility
- Accessibility compliance
- Visual regression tests

Follow SBS_Automation patterns exactly.
Follow the complete process from /Users/arog/framework/auto-coder/.github/gpt-test-generation-master.md
```

---

## 🛠️ CONFIGURATION & SETUP

### No Special Configuration Needed!

The GPT agents use the SAME files and structure as Claude:

```
Workspace: /Users/arog/framework/auto-coder/
Input: input/[type]/your-files
Output: generated/
Scripts: auto-coder.sh
Reports: generated/reports/
```

### Essential System Message for GPT

**Always start your GPT conversation with:**

```
You are an expert automation engineer using the auto-coder framework. You follow SBS_Automation patterns exactly and generate high-quality test artifacts. You work systematically like Claude and validate all outputs before reporting results.
```

---

## ⚡ ADVANCED USAGE

### Batch Processing Multiple Files

**Prompt GPT-4.1/GPT-4o with:**

```
Process multiple input files exactly like Claude would.

BATCH_PROCESS: true
INPUT_DIRECTORY: /Users/arog/framework/auto-coder/input/text/
FILE_PATTERN: *.txt

For each file:
1. Generate complete test artifacts
2. Validate SBS_Automation compliance
3. Report success/failure
4. Move to next file

Follow the complete batch process from /Users/arog/framework/auto-coder/.github/gpt-complete-workflows.md
```

### Complex Scenario Generation

**Prompt GPT-4.1/GPT-4o with:**

```
Generate complex test scenarios exactly like Claude.

COMPLEXITY_LEVEL: enterprise
INTEGRATION_POINTS: API, UI, Database
CROSS_BROWSER: chrome, firefox, webkit
PARALLEL_EXECUTION: true

Generate comprehensive test suite with:
- Multi-step user journeys
- API integration scenarios
- Database validation steps
- Cross-browser compatibility
- Performance benchmarks

Follow enterprise patterns from /Users/arog/framework/auto-coder/.github/gpt-test-generation-master.md
```

---

## 🎯 SUCCESS VALIDATION

### How to Know GPT is Working Like Claude

**✅ Success Indicators:**

- Generates ALL 5 artifacts (feature, steps, page, test, guide)
- Follows SBS_Automation patterns exactly
- No console.log, try/catch, or if/else statements
- Proper import paths (../../support/common/base-page)
- Real CSS/XPath locators
- Systematic execution and reporting

**❌ Failure Indicators:**

- Missing artifacts
- Anti-patterns in code
- Wrong import paths
- Generic/placeholder content
- Incomplete validation

### Validation Commands

**Run these to verify GPT output:**

```bash
# Check syntax
find generated/ -name "*.js" -exec node -c {} \;

# Check anti-patterns
grep -rn "console.log\|try {\|if (" generated/

# Check import paths
grep -rn "../common/base-page" generated/pages/

# Run tests
./auto-coder.sh test generated/features/your-feature.feature
```

---

## 🚨 TROUBLESHOOTING

### If GPT Doesn't Follow Instructions

**Re-prompt with:**

```
You did not follow the SBS_Automation patterns exactly. Please regenerate following these rules:

MANDATORY RULES:
- NO console.log statements anywhere
- NO try/catch blocks
- NO if/else conditions
- Import path: ../../support/common/base-page
- Timeout: { timeout: 240 * 1000 }
- Assertions: assert.isTrue() / assert.equal()
- Page instantiation: new PageName(this.page)

Regenerate ALL artifacts following these rules exactly.
```

### If Tests Fail

**This is EXPECTED! GPT should report:**

```
Tests failed as expected due to placeholder locators.
Generated reports available at: [report locations]
Authentication page loaded successfully.
Ready for locator updates with real UI elements.
```

---

## 🧠 MY BRAIN = YOUR GPT BRAIN

**The secret to making GPT work like me (Claude):**

1. **Be Explicit**: Don't assume GPT knows the patterns - spell them out
2. **Validate Everything**: Make GPT check its own work
3. **System Messages**: Set the context with detailed system messages
4. **Step-by-Step**: Break complex tasks into clear steps
5. **Examples**: Show GPT exactly what you expect
6. **Validation**: Always include success criteria

**Copy this mindset to GPT and you'll get Claude-level results!**

---

## 🎉 READY TO USE

Now you can make GPT-4.1/GPT-4o work EXACTLY like Claude by using these prompts and following these patterns. The GPT agents will:

- Generate test artifacts with the same quality
- Follow SBS_Automation patterns exactly
- Validate their own work
- Report results systematically
- Handle all input types (text, image, API, JIRA, etc.)

**Just copy-paste the prompts above and watch GPT perform like Claude!** 🚀
