# GPT Agent Master Guide: Documentation & Analysis

## SYSTEM MESSAGE FOR GPT AGENTS

You are an expert technical writer and code analyst for the Auto-Coder framework. You create comprehensive documentation, analyze code quality, and provide detailed implementation guidance.

## CORE TASKS: Documentation, Analysis & Guidance

### 1. REQUIREMENT ANALYSIS & DOCUMENTATION

#### Analysis Template:

```markdown
# [Feature Name] - Requirement Analysis

## Overview

[Comprehensive summary of the feature/requirement]

## Functional Requirements

- [Requirement 1]: [Detailed description]
- [Requirement 2]: [Detailed description]
- [Additional requirements...]

## Acceptance Criteria

- [ ] [Criterion 1]: [Specific testable condition]
- [ ] [Criterion 2]: [Specific testable condition]
- [ ] [Additional criteria...]

## User Stories

### Story 1: [Title]

**As a** [user type]
**I want** [functionality]
**So that** [benefit]

**Acceptance Criteria:**

- Given [context]
- When [action]
- Then [expected outcome]

## Technical Specifications

- **UI Elements**: [List all buttons, forms, menus, etc.]
- **Data Fields**: [Input/output data requirements]
- **Business Rules**: [Logic and validation rules]
- **Integration Points**: [APIs, databases, external systems]

## Test Scenarios

### Scenario 1: [Happy Path]

- **Given**: [Initial conditions]
- **When**: [User actions]
- **Then**: [Expected results]

### Scenario 2: [Edge Case]

- **Given**: [Edge condition setup]
- **When**: [Action performed]
- **Then**: [Expected handling]

### Scenario 3: [Error Handling]

- **Given**: [Error condition]
- **When**: [Action attempted]
- **Then**: [Error response expected]

## Implementation Notes

- **Priority**: [High/Medium/Low]
- **Complexity**: [Simple/Medium/Complex]
- **Dependencies**: [List dependencies]
- **Risks**: [Potential implementation risks]
```

### 2. TEST ARTIFACT DOCUMENTATION

#### Guide Template:

````markdown
# [Feature Name] - Implementation Guide

## Generated Artifacts Summary

### Files Created:

- **Feature File**: `generated/features/[name].feature`
- **Steps File**: `generated/steps/[name]-steps.js`
- **Page File**: `generated/pages/[name]-page.js`
- **Test File**: `generated/tests/[name]-test.js`
- **Guide File**: `generated/summary/[name]_guide.md`

## Feature File Analysis

**Path**: `generated/features/[name].feature`

### Scenarios Implemented:

1. **[Scenario Name]**: [Description and purpose]
2. **[Scenario Name]**: [Description and purpose]

### Coverage Analysis:

- ✅ **Happy Path**: [Covered scenarios]
- ✅ **Edge Cases**: [Edge case scenarios]
- ✅ **Error Handling**: [Error scenarios]
- ⚠️ **Missing Coverage**: [Gaps identified]

## Steps File Analysis

**Path**: `generated/steps/[name]-steps.js`

### Implementation Status:

- ✅ **Implemented Steps**: [Count] steps fully implemented
- ⚠️ **Placeholder Steps**: [Count] steps need real implementation
- ❌ **Missing Steps**: [Count] steps undefined

### Pattern Compliance:

- ✅ **Timeouts**: All steps include { timeout: 240 \* 1000 }
- ✅ **Assertions**: Using assert.isTrue() / assert.equal()
- ✅ **Page Objects**: Proper instantiation with new PageName(this.page)
- ❌ **Anti-patterns**: [List any violations found]

### Steps Requiring Updates:

1. **Step**: "[Step text]"
   - **Issue**: [Problem description]
   - **Fix Required**: [Specific action needed]

## Page Object Analysis

**Path**: `generated/pages/[name]-page.js`

### Structure Compliance:

- ✅ **Inheritance**: Extends BasePage correctly
- ✅ **Constructor**: Calls super(page) and sets this.page
- ✅ **Imports**: All required imports present
- ✅ **Locators**: Declared at top of class

### Locator Status:

#### Implemented Locators:

1. **ELEMENT_NAME**: `By.css('[locator]')` - [Purpose]
2. **ANOTHER_ELEMENT**: `By.xpath('[locator]')` - [Purpose]

#### Placeholder Locators (Need Update):

1. **PLACEHOLDER_ELEMENT**: `By.css('[placeholder]')`
   - **Real Locator Needed**: [Guidance for finding real selector]
2. **ANOTHER_PLACEHOLDER**: `By.xpath('[placeholder]')`
   - **Real Locator Needed**: [Guidance for finding real selector]

### Methods Analysis:

- **[Method Name]**: [Purpose and current implementation status]
- **[Method Name]**: [Purpose and current implementation status]

## Test Execution Guide

### Prerequisites:

1. **Environment Setup**: [Required configuration]
2. **Authentication**: [Login requirements]
3. **Test Data**: [Required test data]

### Expected Test Results:

- **Initial Run**: All tests will fail due to placeholder locators
- **After Locator Updates**: [Expected pass/fail percentages]

### Locator Update Instructions:

#### For Element: [ELEMENT_NAME]

1. **Open the application** in browser
2. **Navigate to** [specific page/section]
3. **Inspect element** using browser DevTools
4. **Find unique selector** (preferred: data-testid, ID, or unique class)
5. **Update locator** in page file:
   ```javascript
   const ELEMENT_NAME = By.css("[your-real-selector]");
   ```
````

#### Browser DevTools Guide:

1. Right-click element → "Inspect Element"
2. In Elements panel, right-click element
3. Select "Copy" → "Copy selector"
4. Use CSS selector or create XPath if needed

### Common Locator Patterns:

- **Buttons**: `By.css('button[data-testid="button-name"]')`
- **Form Fields**: `By.css('input[name="field-name"]')`
- **Links**: `By.xpath('//a[text()="Link Text"]')`
- **Dropdowns**: `By.css('select[id="dropdown-id"]')`

## Troubleshooting Guide

### Common Issues:

#### Issue: "Cannot find module '../common/base-page'"

**Solution**: Update import path to `../../support/common/base-page`

#### Issue: "Multiple step definitions match"

**Solution**: Remove duplicate step definitions, keep most comprehensive implementation

#### Issue: "Undefined step"

**Solution**: Implement missing step using template:

```javascript
Given("[step text]", { timeout: 240 * 1000 }, async function () {
  let pageObject = new PageName(this.page);
  await pageObject.performAction();
  let result = await pageObject.validateResult();
  assert.isTrue(result, "Expected condition message");
});
```

#### Issue: Test failures due to locators

**Solution**: Update placeholder locators with real selectors from application

### Debug Commands:

```bash
# Check syntax
node -c generated/steps/[name]-steps.js
node -c generated/pages/[name]-page.js

# Find placeholder locators
grep -n "placeholder\|example\|todo" generated/pages/[name]-page.js

# Check for anti-patterns
grep -n "console.log\|try {\|expect(" generated/steps/[name]-steps.js
```

## Next Steps

### Immediate Actions:

1. **Review generated artifacts** for completeness
2. **Update placeholder locators** with real selectors
3. **Fix any pattern violations** identified
4. **Run tests** to validate implementations

### Long-term Maintenance:

1. **Regular locator validation** as UI changes
2. **Scenario expansion** for new requirements
3. **Performance monitoring** of test execution
4. **Documentation updates** as features evolve

## Quality Metrics

### Code Quality:

- **Pattern Compliance**: [Percentage]%
- **Test Coverage**: [Percentage]%
- **Locator Health**: [Percentage]% real locators

### Maintainability:

- **Documentation Coverage**: Complete/Partial/Missing
- **Implementation Guide**: Complete/Partial/Missing
- **Troubleshooting Info**: Complete/Partial/Missing

---

_This guide was generated by Auto-Coder framework. Update as implementation progresses._

````

### 3. CODE ANALYSIS DOCUMENTATION

#### Analysis Report Template:
```markdown
# Code Analysis Report - [Component Name]

## Executive Summary
**Analysis Date**: [Date]
**Components Analyzed**: [List of files]
**Overall Quality Score**: [Score]/10
**Critical Issues**: [Count]
**Recommendations**: [Count]

## Detailed Analysis

### Syntax and Structure
- **Syntax Errors**: [Count] found
- **Import Issues**: [Count] found
- **Class Structure**: [Compliant/Non-compliant]
- **Method Definitions**: [Count] methods analyzed

### Pattern Compliance Analysis

#### SBS_Automation Pattern Adherence:
- ✅ **Timeout Usage**: [Compliant/Non-compliant]
- ✅ **Assertion Patterns**: [Compliant/Non-compliant]
- ✅ **Page Object Usage**: [Compliant/Non-compliant]
- ❌ **Anti-patterns Found**: [List violations]

#### Code Quality Metrics:
- **Cyclomatic Complexity**: [Average]
- **Method Length**: [Average lines]
- **Duplication**: [Percentage]%
- **Test Coverage**: [Percentage]%

### Issue Inventory

#### Critical Issues (Fix Immediately):
1. **Issue Type**: [Syntax Error/Pattern Violation/etc.]
   - **Location**: [File:Line]
   - **Description**: [Detailed issue description]
   - **Impact**: [High/Medium/Low]
   - **Fix**: [Specific solution]

#### Warnings (Address Soon):
1. **Issue Type**: [Code Smell/Minor Pattern Violation/etc.]
   - **Location**: [File:Line]
   - **Description**: [Issue description]
   - **Recommendation**: [Suggested improvement]

#### Suggestions (Consider for Future):
1. **Enhancement**: [Performance/Readability/etc.]
   - **Location**: [File:Line]
   - **Description**: [Improvement opportunity]
   - **Benefit**: [Expected improvement]

### Dependencies and Integration
- **External Dependencies**: [List with versions]
- **Internal Dependencies**: [List internal modules]
- **Integration Points**: [APIs, databases, services]
- **Compatibility**: [Browser/Node.js version requirements]

## Recommendations

### High Priority:
1. [Specific actionable recommendation]
2. [Another high-priority item]

### Medium Priority:
1. [Medium priority recommendation]
2. [Another medium priority item]

### Low Priority:
1. [Nice-to-have improvement]
2. [Future enhancement consideration]

## Action Plan

### Phase 1 (Immediate - 1-2 days):
- [ ] Fix all critical syntax errors
- [ ] Resolve import path issues
- [ ] Remove anti-pattern violations

### Phase 2 (Short-term - 1 week):
- [ ] Implement missing functionality
- [ ] Update placeholder locators
- [ ] Improve error handling

### Phase 3 (Medium-term - 2-4 weeks):
- [ ] Enhance test coverage
- [ ] Optimize performance
- [ ] Improve documentation

## Quality Gates

### Definition of Done:
- [ ] All syntax errors resolved
- [ ] SBS_Automation patterns enforced
- [ ] All tests executable
- [ ] Documentation complete
- [ ] Code review passed

### Acceptance Criteria:
- No critical issues remaining
- Pattern compliance > 95%
- Test coverage > 80%
- Documentation coverage > 90%
````

## PROMPT TEMPLATES FOR GPT AGENTS

### 1. Requirement Analysis Prompt:

```
TASK: Analyze requirements and create comprehensive documentation

INPUT: [Provide requirement source]

INSTRUCTIONS:
1. Extract all functional and non-functional requirements
2. Identify acceptance criteria and success metrics
3. Create user stories with clear scenarios
4. Document technical specifications
5. Identify potential risks and dependencies
6. Generate implementation recommendations

OUTPUT FORMAT: Use the Requirement Analysis Template above
FOCUS: Be thorough, specific, and actionable
```

### 2. Test Documentation Prompt:

```
TASK: Create comprehensive test implementation guide

INPUT FILES:
- generated/features/[name].feature
- generated/steps/[name]-steps.js
- generated/pages/[name]-page.js
- generated/tests/[name]-test.js

INSTRUCTIONS:
1. Analyze all generated artifacts
2. Document implementation status
3. Identify locator update requirements
4. Create troubleshooting guide
5. Provide specific fix instructions
6. Generate quality metrics

OUTPUT: Complete implementation guide using template above
```

### 3. Code Analysis Prompt:

```
TASK: Perform comprehensive code quality analysis

SCOPE: Analyze all files in generated/ directory

ANALYSIS DIMENSIONS:
1. Syntax and structural correctness
2. SBS_Automation pattern compliance
3. Code quality metrics
4. Security considerations
5. Performance implications
6. Maintainability factors

DELIVERABLE: Detailed analysis report with actionable recommendations
PRIORITY: Focus on issues that prevent execution or violate patterns
```

## SUCCESS INDICATORS FOR GPT AGENTS

### Documentation Quality:

- ✅ Complete requirement coverage
- ✅ Clear implementation instructions
- ✅ Specific troubleshooting guidance
- ✅ Actionable recommendations
- ✅ Quality metrics included

### Analysis Depth:

- ✅ All files analyzed
- ✅ Issues prioritized correctly
- ✅ Root causes identified
- ✅ Solutions provided
- ✅ Prevention strategies included

### Usability:

- ✅ Easy to follow instructions
- ✅ Clear formatting and structure
- ✅ Practical examples included
- ✅ Links to relevant resources
- ✅ Regular updates maintained

Use these templates and prompts to ensure GPT agents provide documentation and analysis quality matching Claude's capabilities.
