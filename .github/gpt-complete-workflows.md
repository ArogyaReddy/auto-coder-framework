# GPT Agent Complete Workflow Guide

## OVERVIEW: Making GPT-4.1/GPT-4o Work Like Claude

This guide provides complete workflows for GPT agents to handle ALL aspects of the auto-coder framework with Claude-level quality and precision.

## WORKFLOW 1: COMPLETE TEST ARTIFACT GENERATION

### Input Requirements:

```
INPUT_SOURCE_TYPE: [text|markdown|image|curl|jira|confluence|figma|adobe-xd|sketch]
INPUT_FILE_PATH: [Full absolute path to input file]
```

### Step-by-Step Process:

#### Phase 1: Environment Setup & Analysis

```
TASK: Generate test artifacts from [input_type] source

STEP 1: Verify Environment
- Confirm working directory: /Users/arog/framework/auto-coder
- Check input file exists at provided path
- Verify generated/ directory structure

STEP 2: Analyze Input Source
- Read and parse input file completely
- Extract all requirements, UI elements, workflows
- Identify test scenarios and acceptance criteria
- Document findings in structured format

STEP 3: Plan Artifact Generation
- Determine feature scenarios needed
- Map UI elements to locators
- Plan step definitions and page objects
- Identify integration points and dependencies
```

#### Phase 2: Artifact Creation

```
STEP 4: Generate Feature File
Path: generated/features/[basename].feature

Requirements:
- Use proper Gherkin syntax (Given/When/Then)
- Cover all identified scenarios
- Include both happy path and edge cases
- Add appropriate tags (@api, @ui, @integration)

STEP 5: Generate Steps File
Path: generated/steps/[basename]-steps.js

Requirements:
- Import: const { Given, When, Then } = require('@cucumber/cucumber');
- Import: const assert = require('assert');
- Import: const PageName = require('../pages/[basename]-page');
- All steps include { timeout: 240 * 1000 }
- Use assert.isTrue() / assert.equal() (never expect())
- Instantiate page objects: new PageName(this.page)
- NO console.log, try/catch, if/else blocks

STEP 6: Generate Page Object File
Path: generated/pages/[basename]-page.js

Requirements:
- Import: const By = require('../../support/By');
- Import: const helpers = require('../../support/helpers');
- Import: let BasePage = require('../../support/common/base-page');
- Declare all locators at top with real CSS/XPath selectors
- Class extends BasePage
- Constructor calls super(page) and sets this.page
- NO console.log statements
- Real locators (not mocks or placeholders)

STEP 7: Generate Test File
Path: generated/tests/[basename]-test.js

Requirements:
- Proper Playwright test structure
- Uses page objects correctly
- Includes authentication setup
- Has proper test cleanup

STEP 8: Generate Documentation
Path: generated/summary/[basename]_guide.md

Requirements:
- Complete requirement analysis
- Implementation instructions
- Locator update guidance
- Troubleshooting section
```

#### Phase 3: Validation & Quality Assurance

```
STEP 9: Syntax Validation
Commands to run:
- node -c generated/steps/[basename]-steps.js
- node -c generated/pages/[basename]-page.js
- node -c generated/tests/[basename]-test.js

STEP 10: Pattern Compliance Check
Verify:
- No console.log statements: grep -rn "console.log" generated/
- No try/catch blocks: grep -rn "try {" generated/
- No expect() usage: grep -rn "expect(" generated/
- Proper timeouts included
- Real locators used

STEP 11: Completeness Verification
Confirm:
- All feature steps have implementations
- All page methods are defined
- All imports are correct
- Documentation is complete

STEP 12: Generate Quality Report
Report should include:
- Files generated (paths)
- Syntax validation results
- Pattern compliance status
- Issues found and fixed
- Recommendations for next steps
```

### Complete GPT Prompt for Test Generation:

```
I need you to generate complete test artifacts for the auto-coder framework.

INPUT_SOURCE_TYPE: [specify type]
INPUT_FILE_PATH: [provide full path]

EXECUTE ALL PHASES:

PHASE 1 - SETUP & ANALYSIS:
1. Verify working directory and input file
2. Analyze input source completely
3. Extract all requirements and test scenarios

PHASE 2 - GENERATION:
4. Generate .feature file with comprehensive BDD scenarios
5. Generate -steps.js file following SBS_Automation patterns exactly
6. Generate -page.js file with real locators and proper inheritance
7. Generate -test.js file with proper structure
8. Generate _guide.md with complete documentation

PHASE 3 - VALIDATION:
9. Validate syntax of all JavaScript files
10. Check SBS_Automation pattern compliance
11. Verify completeness of implementations
12. Generate quality assurance report

REQUIREMENTS:
- Follow SBS_Automation patterns EXACTLY
- Use real CSS/XPath locators (not mocks)
- Include { timeout: 240 * 1000 } on all steps
- Use assert.isTrue()/assert.equal() for assertions
- No console.log, try/catch, or if/else blocks
- Proper BasePage inheritance and imports

DELIVERABLES:
1. All 5 artifact files generated
2. Syntax validation confirmation
3. Pattern compliance report
4. Quality assurance summary
5. Next steps recommendations

Execute all steps systematically and report results for each phase.
```

## WORKFLOW 2: COMPREHENSIVE TEST EXECUTION

### Complete GPT Prompt for Test Execution:

```
I need you to execute test artifacts with full reporting and analysis.

TEST_TYPE: feature
TEST_TARGET: [provide specific path or directory]
EXECUTION_OPTIONS:
- browser: chrome
- headless: false

EXECUTE ALL PHASES:

PHASE 1 - PRE-EXECUTION SETUP:
1. Navigate to /Users/arog/framework/auto-coder
2. Fix base-page imports: find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
3. Verify all required files exist
4. Check configuration and authentication setup

PHASE 2 - TEST EXECUTION:
5. Execute: ./auto-coder.sh test [test-target]
6. Monitor execution and capture all output
7. Record any errors or failures
8. Confirm reports are generated

PHASE 3 - ANALYSIS & REPORTING:
9. Open generated reports:
   - file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html
   - file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html
10. Analyze test results and failure patterns
11. Identify specific locators needing updates
12. Generate comprehensive execution summary

EXPECTED RESULTS:
- Tests will fail initially (this is expected with placeholder locators)
- Authentication should load successfully
- Reports should be generated with detailed error information
- Specific guidance should be provided for fixing locators

REPORT FORMAT:
- Number of scenarios executed
- Pass/fail breakdown
- Configuration validation
- Report locations
- Specific issues identified
- Recommended next steps

Execute systematically and provide detailed analysis of results.
```

## WORKFLOW 3: COMPLETE CODE ANALYSIS & FIXING

### Complete GPT Prompt for Code Analysis:

```
I need comprehensive code analysis and fixing for auto-coder generated artifacts.

SCOPE: Analyze ALL files in generated/ directory

EXECUTE ALL PHASES:

PHASE 1 - SYNTAX ANALYSIS:
1. Check syntax of all .js files: find generated/ -name "*.js" -exec node -c {} \;
2. Identify and catalog all syntax errors
3. Check import paths and dependencies
4. Verify class structures and method definitions

PHASE 2 - PATTERN COMPLIANCE:
5. Scan for anti-patterns:
   - grep -rn "console.log" generated/
   - grep -rn "try {" generated/
   - grep -rn "expect(" generated/
   - grep -rn "if (" generated/
6. Verify SBS_Automation pattern compliance
7. Check timeout usage and assertion patterns
8. Validate page object inheritance

PHASE 3 - ISSUE RESOLUTION:
9. Fix all syntax errors found
10. Remove anti-pattern violations
11. Correct import paths (especially ../common/base-page)
12. Implement missing step definitions
13. Remove duplicate step definitions
14. Update placeholder locators where possible

PHASE 4 - VALIDATION:
15. Re-run syntax checks on all fixed files
16. Verify pattern compliance
17. Test file loading and basic execution
18. Generate comprehensive fix report

DELIVERABLES:
1. Complete issue inventory (before fixes)
2. Detailed fix implementation log
3. Validation results (after fixes)
4. Remaining issues requiring manual attention
5. Quality improvement recommendations

QUALITY STANDARDS:
- All syntax errors must be resolved
- SBS_Automation patterns must be enforced
- No anti-patterns should remain
- All imports must be correct
- Step implementations must be complete

Execute all phases systematically and provide detailed reporting.
```

## WORKFLOW 4: COMPREHENSIVE DOCUMENTATION

### Complete GPT Prompt for Documentation:

```
I need complete documentation for auto-coder framework artifacts.

SCOPE: Document all generated artifacts and provide implementation guidance

EXECUTE ALL PHASES:

PHASE 1 - REQUIREMENT ANALYSIS:
1. Analyze original input source
2. Extract all functional requirements
3. Identify acceptance criteria
4. Map business rules and workflows
5. Document technical specifications

PHASE 2 - ARTIFACT DOCUMENTATION:
6. Analyze generated feature file
7. Document step implementations
8. Review page object structure
9. Assess test coverage
10. Evaluate quality metrics

PHASE 3 - IMPLEMENTATION GUIDANCE:
11. Create locator update instructions
12. Document troubleshooting procedures
13. Provide debugging guidance
14. Generate quality checklists
15. Create maintenance procedures

PHASE 4 - USER GUIDANCE:
16. Write clear implementation steps
17. Create troubleshooting FAQ
18. Document common issues and solutions
19. Provide examples and templates
20. Generate quick reference guides

DELIVERABLES:
1. Comprehensive requirement analysis
2. Complete implementation guide
3. Detailed troubleshooting documentation
4. Quality assurance checklists
5. User reference materials

DOCUMENTATION STANDARDS:
- Clear, actionable instructions
- Specific examples and code snippets
- Troubleshooting for common issues
- Quality metrics and success criteria
- Regular update and maintenance guidance

Execute systematically to create complete documentation suite.
```

## SUCCESS CRITERIA FOR GPT AGENTS

### Test Generation Success:

- ✅ All 5 artifacts generated correctly
- ✅ SBS_Automation patterns followed exactly
- ✅ Real locators used (not mocks)
- ✅ Syntax validation passed
- ✅ Complete documentation provided

### Test Execution Success:

- ✅ Commands executed without errors
- ✅ Test scenarios ran (even if failed)
- ✅ Authentication loaded successfully
- ✅ Reports generated and accessible
- ✅ Detailed analysis provided

### Code Analysis Success:

- ✅ All issues identified and cataloged
- ✅ Fixes applied systematically
- ✅ Pattern compliance enforced
- ✅ Validation confirmed improvements
- ✅ Comprehensive reporting provided

### Documentation Success:

- ✅ Complete requirement coverage
- ✅ Clear implementation instructions
- ✅ Specific troubleshooting guidance
- ✅ Quality metrics included
- ✅ Usable reference materials created

## EMERGENCY RESET COMMANDS

If GPT agent gets confused or stuck:

```bash
# Reset to clean state
cd /Users/arog/framework/auto-coder
git status
git clean -fd generated/

# Fix common issues
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
chmod +x auto-coder.sh

# Validate environment
npm install
./auto-coder.sh help
```

## FINAL RECOMMENDATIONS

1. **Always use complete workflow prompts** - Don't skip phases
2. **Validate each phase before proceeding** - Ensure quality at each step
3. **Follow SBS_Automation patterns exactly** - No deviations allowed
4. **Provide comprehensive reporting** - Document everything done
5. **Use emergency resets when needed** - Don't struggle with broken state

These workflows ensure GPT-4.1 and GPT-4o agents can work with the same quality and completeness as Claude for ALL aspects of the auto-coder framework.
