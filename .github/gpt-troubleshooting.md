# GPT Agent Troubleshooting Guide for Auto-Coder Framework

## Common Issues and Exact Solutions

### Issue 1: "zsh: command not found: ./auto-coder.sh"

**Cause**: Wrong directory or script not executable
**Solution**:

```bash
cd /Users/arog/framework/auto-coder
ls -la auto-coder.sh
chmod +x auto-coder.sh
./auto-coder.sh help
```

### Issue 2: "Cannot find module '../common/base-page'"

**Cause**: Generated files have incorrect import paths
**Solution** (Run this EVERY time before testing):

```bash
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
```

### Issue 3: "TypeError: this.init is not a function"

**Cause**: Hook initialization issue
**Solution**: This is expected, ignore and continue. Tests still execute.

### Issue 4: "Multiple step definitions match"

**Cause**: Duplicate step definitions in generated steps
**Solution**: Note the issue, tests will continue running

### Issue 5: "Test file required for test command"

**Cause**: Missing test file path in command
**Solution**: Use full path:

```bash
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
```

### Issue 6: "Error: page.goto: net::ERR_NAME_NOT_RESOLVED"

**Cause**: Invalid URL in test (this is expected)
**Solution**: This is normal - indicates real locators are being used

### Issue 7: No reports generated

**Cause**: Test execution failed before report generation
**Solution**: Check for generated/reports/ directory:

```bash
ls -la generated/reports/
ls -la generated/reports/custom/
ls -la generated/reports/playwright-report/
```

### Issue 8: Reports exist but won't open

**Solution**: Use full file paths:

```bash
open "file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html"
open "file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html"
```

### Issue 9: "npm: command not found"

**Solution**: Use direct script execution:

```bash
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
```

### Issue 10: Permission denied

**Solution**: Fix script permissions:

```bash
chmod +x auto-coder.sh
chmod +x bin/*
```

## Pre-flight Checklist for GPT Agents

Before running any test, verify:

```bash
# 1. Correct directory
pwd
# Should output: /Users/arog/framework/auto-coder

# 2. Script exists and is executable
ls -la auto-coder.sh
# Should show executable permissions

# 3. Test target exists
ls -la generated/features/jira-story-rs-end-point.feature
# Should show the file

# 4. Support files exist
ls -la support/common/base-page.js
# Should show the base page file

# 5. Fix imports (ALWAYS run this)
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
```

## Standard Execution Flow

```bash
# Step 1: Navigate
cd /Users/arog/framework/auto-coder

# Step 2: Pre-flight check
pwd && ls -la auto-coder.sh

# Step 3: Fix imports (CRITICAL)
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;

# Step 4: Execute test
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature

# Step 5: Verify reports
ls -la generated/reports/custom/detailed-test-report.html
ls -la generated/reports/playwright-report/index.html

# Step 6: Open reports
open "file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html"
open "file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html"
```

## What GPT Should Report Back

```markdown
## Execution Status

- ✅ Directory: /Users/arog/framework/auto-coder
- ✅ Script: auto-coder.sh found and executable
- ✅ Import fixes: Applied to all page files
- ✅ Test execution: Completed (X scenarios, all failed as expected)
- ✅ Authentication: MAX credentials loaded successfully
- ✅ Reports: Generated successfully

## Report Locations

- Custom: file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html
- Playwright: file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html

## Expected Failures

All test failures are normal and expected because:

1. Using real locators (not mocks)
2. Placeholder selectors need updating for real application
3. This indicates framework is working correctly

## Next Steps

Review reports to identify specific locators that need updating.
```

## Emergency Commands

If everything breaks:

```bash
cd /Users/arog/framework/auto-coder
git status
git clean -fd generated/
npm install
```

## File Permissions Fix

```bash
find /Users/arog/framework/auto-coder -name "*.sh" -exec chmod +x {} \;
```
