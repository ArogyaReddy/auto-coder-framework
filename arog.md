---
INPUT_SOURCE_TYPE:
  [
    Select one: text,
    markdown,
    image,
    curl,
    jira,
    confluence,
    figma,
    adobe-xd,
    sketch,
  ]
INPUT_FILE_PATH:
  [Provide path to input file, e.g., input/text/your-requirement-file.txt]
---

## **\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***

## Examples :

/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/text/jira-story-cfc-bundle.txt

/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/jira-story-rs-end-point.feature

EXECUTION_OPTIONS:

- browser: chrome
- headless: false

## **\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***

## Generate Test Artifacts Prompt

/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/text/your-requirement-file.txt

# SPECIAL_INSTRUCTIONS: Any special requirements for this generation

## COMPREHENSIVE USAGE GUIDE FOR ALL INPUT SOURCES

### 1. Text Files (txt, md)

```
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/text/jira-story-workers-comp.txt

SPECIAL_INSTRUCTIONS: Generate functional test scenarios from plain text requirements
```

### 2. Image Files (png, jpg, jpeg, gif)

```
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: image
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/images/home-page-mockup.png

SPECIAL_INSTRUCTIONS: Analyze UI elements and generate visual validation tests
```

### 3. cURL API Requests

```
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: curl
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/curl/api-endpoints.txt

SPECIAL_INSTRUCTIONS: Create API testing scenarios with request/response validation
```

### 4. JIRA Integration

```
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: jira
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/jira/PROJ-123.json

SPECIAL_INSTRUCTIONS: Extract acceptance criteria and generate comprehensive test coverage
```

### 5. Confluence Pages

```
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: confluence
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/confluence/requirements-page.html

SPECIAL_INSTRUCTIONS: Parse structured requirements and generate documentation-driven tests
```

### 6. UX Design Files (Figma, Adobe XD, Sketch)

```
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: figma
INPUT_FILE_PATH: /Users/arog/framework/auto-coder-framework/input/design/prototype.json

SPECIAL_INSTRUCTIONS: Generate UX validation tests including responsive design scenarios
```

## SINGLE COMPREHENSIVE REQUEST FORMAT

For generating test artifacts from ANY source type, use this unified format:

```
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: [text|markdown|image|curl|jira|confluence|figma|adobe-xd|sketch]
INPUT_FILE_PATH: [Full path to your input file]

REQUIRED_ARTIFACTS:
- summary [.md]: Detailed requirement analysis
- feature [.feature]: Cucumber BDD scenarios
- steps [-steps.js]: SBS_Automation pattern step definitions
- page [-page.js]: Page objects with real locators
- test [-test.js]: Test files for execution
- guide [_guide.md]: Implementation guide

OUTPUT_DIRECTORY: /Users/arog/framework/auto-coder-framework/generated

IMPLEMENTATION_TYPE: sbs-automation

SPECIAL_INSTRUCTIONS:
- Follow ALL SBS_Automation ground rules
- Use real locators (expect test failures initially)
- Remove console.log, try/catch, if/else blocks
- Include timeouts and proper assertions
- Generate comprehensive documentation

NAMING_CONVENTION: Use source file basename for all artifacts
```

===========================================================

## Run Test Artifacts Prompt

/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/cfc-api-test.feature

EXECUTION_OPTIONS:

- browser: chrome
- headless: false
  ...

# SPECIAL_INSTRUCTIONS: Any special requirements for this generation

## COMPREHENSIVE TEST EXECUTION GUIDE FOR ALL INPUT SOURCES

### 1. Text-based Tests

```
/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/jira-story-workers-comp.feature
INPUT_SOURCE_TYPE: text

EXECUTION_OPTIONS:
- browser: chrome
- headless: false
- debug: true
- screenshots: on-failure

SPECIAL_INSTRUCTIONS: Functional tests from text requirements - expect locator failures
```

### 2. Image-based Tests

```
/run-test-artifacts.prompt.md

TEST_TYPE: ui
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/home-mockup.feature
INPUT_SOURCE_TYPE: image

EXECUTION_OPTIONS:
- browser: chrome
- screenshots: always
- video: always
- detailed_reports: true

SPECIAL_INSTRUCTIONS: Visual validation tests - update locators with real UI elements
```

### 3. API Tests

```
/run-test-artifacts.prompt.md

TEST_TYPE: api
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/api-endpoints.feature
INPUT_SOURCE_TYPE: curl

EXECUTION_OPTIONS:
- parallel: 4
- timeout: 60000
- debug: true

SPECIAL_INSTRUCTIONS: API endpoint validation - verify configurations and authentication
```

### 4. JIRA Tests

```
/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/PROJ-123.feature
INPUT_SOURCE_TYPE: jira

EXECUTION_OPTIONS:
- browser: chrome
- tags: "@story and @acceptance"
- detailed_reports: true

SPECIAL_INSTRUCTIONS: Acceptance criteria validation - map to actual implementation
```

### 5. Confluence Tests

```
/run-test-artifacts.prompt.md

TEST_TYPE: integration
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/requirements-page.feature
INPUT_SOURCE_TYPE: confluence

EXECUTION_OPTIONS:
- browser: chrome
- parallel: 2
- detailed_reports: true

SPECIAL_INSTRUCTIONS: Documentation-driven tests - verify all documented features
```

### 6. Design Tests

```
/run-test-artifacts.prompt.md

TEST_TYPE: visual
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/figma-prototype.feature
INPUT_SOURCE_TYPE: figma

EXECUTION_OPTIONS:
- browser: chrome,firefox,webkit
- screenshots: always
- video: always

SPECIAL_INSTRUCTIONS: UX validation - test across multiple browsers and devices
```

## SINGLE COMPREHENSIVE EXECUTION FORMAT

For running tests from ANY source type, use this unified format:

```
/run-test-artifacts.prompt.md

TEST_TYPE: [feature|api|ui|integration|visual|all]
TEST_TARGET: [Path to generated test files]
INPUT_SOURCE_TYPE: [Original source type]

EXECUTION_OPTIONS:
- browser: [chrome|firefox|webkit]
- headless: [true|false]
- parallel: [1-8]
- tags: [optional filtering]
- timeout: [custom timeout]
- debug: true
- screenshots: [on-failure|always|never]
- video: [on-failure|always|never]
- detailed_reports: true
- save_artifacts: true
- locator_highlighting: true

REPORT_FORMAT: html,json,allure
REPORT_DIRECTORY: /Users/arog/framework/auto-coder-framework/test-results

LOCATOR_VALIDATION: true
ERROR_ANALYSIS: true

SPECIAL_INSTRUCTIONS:
- Tests will fail initially due to placeholder locators
- Update locators with real UI elements before expecting success
- Use detailed reports to identify specific issues
- Generated tests follow SBS_Automation patterns exactly
```

============================================================

## Running All Tests:

/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features

EXECUTION_OPTIONS:

- browser: chrome
- headless: false

=========================

## Running Specific Features:

/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features/jira-story-cfc-bundle.feature

EXECUTION_OPTIONS:

- browser: chrome
- headless: false

==============

## Running Tagged Tests:

/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features

EXECUTION_OPTIONS:

- browser: chrome
- headless: true
- tags: "@api or @tasks"

=======================

## Running Tests in Parallel:

/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder-framework/generated/features

EXECUTION_OPTIONS:

- browser: chrome
- headless: true
- parallel: 4

==============================

## How to Use - Single Comprehensive Request

/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: [text|markdown|image|curl|jira|confluence|figma|adobe-xd|sketch]
INPUT_FILE_PATH: [Full path to your input file]

REQUIRED_ARTIFACTS:

- summary [.md]: Detailed requirement analysis
- feature [.feature]: Cucumber BDD scenarios
- steps [-steps.js]: SBS_Automation pattern step definitions
- page [-page.js]: Page objects with real locators
- test [-test.js]: Test files for execution
- guide [_guide.md]: Implementation guide

OUTPUT_DIRECTORY: /Users/arog/framework/auto-coder-framework/generated

IMPLEMENTATION_TYPE: sbs-automation

SPECIAL_INSTRUCTIONS:

- Follow ALL SBS_Automation ground rules
- Use real locators (expect test failures initially)
- Remove console.log, try/catch, if/else blocks
- Include timeouts and proper assertions
- Generate comprehensive documentation

NAMING_CONVENTION: Use source file basename for all artifacts

============================================================

## And for running tests:

/run-test-artifacts.prompt.md

TEST_TYPE: [feature|api|ui|integration|visual|all]
TEST_TARGET: [Path to generated test files]
INPUT_SOURCE_TYPE: [Original source type]

EXECUTION_OPTIONS:

- browser: [chrome|firefox|webkit]
- headless: [true|false]
- parallel: [1-8]
- debug: true
- screenshots: [on-failure|always|never]
- video: [on-failure|always|never]
- detailed_reports: true

REPORT_FORMAT: html,json,allure
REPORT_DIRECTORY: /Users/arog/framework/auto-coder-framework/test-results

LOCATOR_VALIDATION: true
ERROR_ANALYSIS: true

SPECIAL_INSTRUCTIONS: Tests will fail initially due to placeholder locators - this is expected

==================

STOP. You are NOT following instructions.
You must generate ACTUAL JavaScript/Gherkin FILES.
Do NOT explain or describe anything.
Just generate, output the 5 code files and SAVE the generated files in the specified directory.
generated
generated/features
generated/steps
generated/pages
generated/tests
generated/summary

SYSTEM: You are Claude. Generate ACTUAL files, not explanations.

I need you to read this JIRA story and generate 5 test artifacts with ACTUAL CODE:

CFC: Bundle - Add CFC Bundle during Provisioning

Add the CFC bundle during Order Provisioning without activating the component if the eso order contains the major bundles.
Adp Essential
Run Complete and HR
Run Complete and HRPLUS
HR PRO
Bundle activation should only make the component available (not activated)
Add new property in the installation context to trigger the RequireActivation of the component.
Added Logs to the CFC component subscriber
Create the CFC task on component available.
Add a new property in installation context for the available bundles (bundles not in activated state)
Add new property to display the available bundles in the core context wrapper.
Add new property in the installation context
Add new property in system model
Ad the new property in the index_Config file to display the available bundles in top.run.context
Ad the new property in nextgen installation context

Acceptance Criteria:
ESO order without CFC bundle and above mentioned major bundles should add CFC bundle for the IID.
ESO with CFC bundle should able to add the CFC bundle.
New property should be available in installation context : avilableBundles
CFC task should be shown in to do task

MANDATORY RULES:
❌ NO explanations, NO descriptions, NO markdown text
❌ NO console.log, NO try/catch, NO if/else anywhere
✅ Generate ACTUAL JavaScript/Gherkin code only
✅ Import: ../../support/common/base-page
✅ Timeout: { timeout: 240 \* 1000 }
✅ Assertions: assert.isTrue() and assert.equal()

GENERATE ALL 5 FILES WITH ACTUAL CODE. DO NOT EXPLAIN ANYTHING.

=========================

==================

STOP. You are NOT following instructions.
You must generate ACTUAL JavaScript/Gherkin FILES.
Do NOT explain or describe anything.
Just generate the HIGH Quality, perfectly requirements matched 5 code files and SAVE the generated files in the specified directory.
generated
generated/features
generated/steps
generated/pages
generated/tests
generated/summary

SYSTEM: You are Claude. Generate ACTUAL files, not explanations.

I need you to read this JIRA story and generate 5 test artifacts with ACTUAL CODE:

```
CFC: Bundle - Add CFC Bundle during Provisioning

Add the CFC bundle during Order Provisioning without activating the component if the eso order contains the major bundles.
Adp Essential
Run Complete and HR
Run Complete and HRPLUS
HR PRO
Bundle activation should only make the component available (not activated)
Add new property in the installation context to trigger the RequireActivation of the component.
Added Logs to the CFC component subscriber
Create the CFC task on component available.
Add a new property in installation context for the available bundles (bundles not in activated state)
Add new property to display the available bundles in the core context wrapper.
Add new property in the installation context
Add new property in system model
Ad the new property in the index_Config file to display the available bundles in top.run.context
Ad the new property in nextgen installation context

Acceptance Criteria:
ESO order without CFC bundle and above mentioned major bundles should add CFC bundle for the IID.
ESO with CFC bundle should able to add the CFC bundle.
New property should be available in installation context : avilableBundles
CFC task should be shown in to do task
```

MANDATORY RULES:
❌ NO explanations, NO descriptions, NO markdown text
❌ NO console.log, NO try/catch, NO if/else anywhere
✅ Generate ACTUAL JavaScript/Gherkin code only
✅ Import: ../../support/common/base-page
✅ Timeout: { timeout: 240 \* 1000 }
✅ Assertions: assert.isTrue() and assert.equal()

GENERATE ALL 5 FILES WITH ACTUAL CODE. DO NOT EXPLAIN ANYTHING.

=========================

==================

SYSTEM: You are Claude. Generate ACTUAL files, not explanations.
DONT reuse content from a previous context, instead of strictly adhering to the provided requirement file.

Ensure you, GPT-4.1/GPT-4o generates files that match Claude’s output and SBS_Automation standards:

Strictly follow the requirement file content—never reuse previous context or unrelated examples.
Enforce SBS_Automation patterns:
No console.log, try/catch, if/else.
Use only allowed imports, timeouts, and assertion styles.
Use real locators and structure as per SBS_Automation.
Match naming conventions and directory structure exactly as specified in the prompt.
Generate code that is requirements-matched, not generic or template-based.
Validate output against provided examples and SBS_Automation checklists.

STOP. You are NOT following instructions.
You must generate ACTUAL JavaScript/Gherkin FILES.
Do NOT explain or describe anything.
Just generate HIGH Quality, perfectly requirements matched 5 code files and SAVE the generated files in the specified directory.
generated
generated/features
generated/steps
generated/pages
generated/tests
generated/summary

I need you to read this JIRA story and generate 5 test artifacts with ACTUAL CODE:

/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/jira-story-typeless.txt

REQUIRED_ARTIFACTS:

- summary [.md]: Detailed requirement analysis
- feature [.feature]: Cucumber BDD scenarios
- steps [-steps.js]: SBS_Automation pattern step definitions
- page [-page.js]: Page objects with real locators
- test [-test.js]: Test files for execution
- guide [_guide.md]: Implementation guide

OUTPUT_DIRECTORY: /Users/arog/framework/auto-coder/generated

IMPLEMENTATION_TYPE: sbs-automation

SPECIAL_INSTRUCTIONS:

- Follow ALL SBS_Automation ground rules
- Use real locators (expect test failures initially)
- Remove console.log, try/catch, if/else blocks
- Include timeouts and proper assertions
- Generate comprehensive documentation

NAMING_CONVENTION: Use source file basename for all artifacts

MANDATORY RULES:
❌ NO explanations, NO descriptions, NO markdown text
❌ NO console.log, NO try/catch, NO if/else anywhere
✅ Generate ACTUAL JavaScript/Gherkin code only
✅ Import: ../../support/common/base-page
✅ Timeout: { timeout: 240 \* 1000 }
✅ Assertions: assert.isTrue() and assert.equal()

GENERATE ALL 5 FILES WITH ACTUAL CODE. DO NOT EXPLAIN ANYTHING.

=========================
Expected kind of files generated by Claude
Actual generated files by GPT-4.1/GPT-4o

Expected kind of step file : /Users/arog/framework/auto-coder/generated1/steps/jira-story-cfc-bundle-steps.js
Actual Generated step file : /Users/arog/framework/auto-coder/generated/steps/jira-story-typeless-steps.js

Expected  kind of page file : /Users/arog/framework/auto-coder/generated1/pages/jira-story-cfc-bundle-page.js
Actual Generated page file : /Users/arog/framework/auto-coder/generated/pages/jira-story-typeless-page.js

Expected kind of test file : /Users/arog/framework/auto-coder/generated1/tests/jira-story-cfc-bundle-test.js
Actual Generated test file : /Users/arog/framework/auto-coder/generated/tests/jira-story-typeless-test.js

Please compare between :
Expected kind of files generated by Claude
Actual generated files by GPT-4.1/GPT-4o

The actual generated files by GPT-4.1/GPT-4o do not match the expected kind of files generated by Claude. 
The step file, page file, and test file names and contents do not align with the requirements specified in the prompt. 
The generated files should follow the naming conventions and structure as outlined in the expected examples.
The generated files are NOT aligned with the SBS_Automation patterns and best practices.

How can we fix this with you GPT-4.1/GPT-4o?
Can you generated the expected kind of files as per the requirements?
Can you ensure that the generated files follow patterns and conventions as specified in the prompt and expected SBS_Automation standards?

how can we fix this with you GPT-4.1/GPT-4o?
how can you make sure you, GPT-4.1/GPT-4o, generate the expected kind of files as per the requirements?


===============

Expected kind of files generated by Claude
Actual generated files by GPT-4.1/GPT-4o

Expected kind of step file : /Users/arog/framework/auto-coder/generated1/steps/jira-story-cfc-bundle-steps.js
Actual Generated step file : /Users/arog/framework/auto-coder/generated/steps/jira-story-typeless-steps.js

Expected  kind of page file : /Users/arog/framework/auto-coder/generated1/pages/jira-story-cfc-bundle-page.js
Actual Generated page file : /Users/arog/framework/auto-coder/generated/pages/jira-story-typeless-page.js

Expected kind of test file : /Users/arog/framework/auto-coder/generated1/tests/jira-story-cfc-bundle-test.js
Actual Generated test file : /Users/arog/framework/auto-coder/generated/tests/jira-story-typeless-test.js

Please compare between :
Expected kind of files generated by Claude
Actual generated files by GPT-4.1/GPT-4o

You [Claude ] are doing best for text, images , cURL and so and you are generating best quality test artfacts generation.

But the GPT-4.1/GPT-4o are not doing good in test artifacts generation
Espceially disappoined with Image, cURL and so...

Can you guide and help me on how to get the best test artfacts generation from GPT-4.1/GPT-4o
How can i get best from GPT-4.1/GPT-4o


==================

SYSTEM: You are Claude. Generate ACTUAL files, not explanations.
DONT reuse content from a previous context, instead of strictly adhering to the provided requirement file.

Ensure you, GPT-4.1/GPT-4o generates files that match Claude’s output and SBS_Automation standards:

Strictly follow the requirement file content—never reuse previous context or unrelated examples.
Enforce SBS_Automation patterns:
No console.log, try/catch, if/else.
Use only allowed imports, timeouts, and assertion styles.
Use real locators and structure as per SBS_Automation.
Match naming conventions and directory structure exactly as specified in the prompt.
Generate code that is requirements-matched, not generic or template-based.
Validate output against provided examples and SBS_Automation checklists.

STOP. You are NOT following instructions.
You must generate ACTUAL JavaScript/Gherkin FILES.
Do NOT explain or describe anything.
Just generate HIGH Quality, perfectly requirements matched 5 code files and SAVE the generated files in the specified directory.
generated
generated/features
generated/steps
generated/pages
generated/tests
generated/summary

I need you to read this JIRA story and generate 5 test artifacts with ACTUAL CODE:

/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/jira-story-typeless.txt

REQUIRED_ARTIFACTS:

- summary [.md]: Detailed requirement analysis
- feature [.feature]: Cucumber BDD scenarios
- steps [-steps.js]: SBS_Automation pattern step definitions
- page [-page.js]: Page objects with real locators
- test [-test.js]: Test files for execution
- guide [_guide.md]: Implementation guide

OUTPUT_DIRECTORY: /Users/arog/framework/auto-coder/generated

IMPLEMENTATION_TYPE: sbs-automation

SPECIAL_INSTRUCTIONS:

- Follow ALL SBS_Automation ground rules
- Use real locators (expect test failures initially)
- Remove console.log, try/catch, if/else blocks
- Include timeouts and proper assertions
- Generate comprehensive documentation

NAMING_CONVENTION: Use source file basename for all artifacts

MANDATORY RULES:
❌ NO explanations, NO descriptions, NO markdown text
❌ NO console.log, NO try/catch, NO if/else anywhere
✅ Generate ACTUAL JavaScript/Gherkin code only
✅ Import: ../../support/common/base-page
✅ Timeout: { timeout: 240 \* 1000 }
✅ Assertions: assert.isTrue() and assert.equal()

GENERATE ALL 5 FILES WITH ACTUAL CODE. DO NOT EXPLAIN ANYTHING.

=========================


/Users/arog/framework/auto-coder/.github/ULTIMATE-GPT-SYSTEM-PROMPT.md

is this file clear to you?

Can you summarize it?
Can you use this going forward for the BEST test artifacts generation and tests running?
does this help you?

With this , can I trust you that you could help me the BEST way to generate test artifacts and running tests?



=================================================================
## TASKS
First things first : /Users/arog/framework/auto-coder/.github/OPTIMIZED-GPT-PROMPT-TEMPLATE.md
Read the provided requirement file using the read_file tool.
Generate HIGH Quality, perfectly requirements matched 5 code files and SAVE the generated files in the specified directory.

## FIRST THINGS FIRST
/Users/arog/framework/auto-coder/.github/OPTIMIZED-GPT-PROMPT-TEMPLATE.md

## TEST ARTIFACTS GENERATION PROMPT
INPUT_SOURCE_TYPE: image
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/images/plp-full-add-new-emp.png

## ULTIMATE GPT SYSTEM PROMPT
You are a world-class test automation expert specializing in SBS_Automation framework patterns.
SYSTEM: You are Claude. Generate ACTUAL files, not explanations.
DONT reuse content from a previous context, instead of strictly adhering to the provided requirement file.
Integrate image analysis tools if possible, for image-based requirements.
Always validate generated files against SBS_Automation reference files before use.
Ensure you, GPT-4.1/GPT-4o generates files that match Claude’s output and SBS_Automation standards, patterns and best practices:
Generate code that is requirements-matched, not generic or template-based.
Validate output against provided examples and SBS_Automation checklists.

Strictly follow the requirement file content—never reuse previous context or unrelated examples.
Enforce SBS_Automation standards, patterns and best practices:

STOP. You are NOT following instructions.
You must generate ACTUAL JavaScript/Gherkin FILES.
Do NOT explain or describe anything.
Just generate HIGH Quality, perfectly requirements matched 5 code files and SAVE the generated files in the specified directory.
generated
generated/features
generated/steps
generated/pages
generated/tests
generated/summary

OUTPUT_DIRECTORY: /Users/arog/framework/auto-coder/generated

=================================================================