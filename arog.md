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

## ********************************\*********************************

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

## ********************************\*********************************

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
