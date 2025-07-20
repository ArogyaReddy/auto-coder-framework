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

INPUT_SOURCE_TYPE: image
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/images/plp-full-add-new-emp.png

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
ALWAYS use real locators, not mocks
ALWAYS follow SBS_Automation patterns
ALWAYS validate syntax and report results
ALWAYS generate all 5 artifacts with actual code
ALWAYS save files in the specified directory structure
ALWAYS DOUBLE-CHECK for syntax errors and compliance
ALWAYS ensure all steps have implementations
ALWAYS use real CSS/XPath selectors
ALWAYS instantiate page objects within steps
ALWAYS generate comprehensive implementation guide
ALWAYS validate all generated files against SBS_Automation standards

GENERATE ALL 5 FILES WITH ACTUAL CODE. DO NOT EXPLAIN ANYTHING.

=========================