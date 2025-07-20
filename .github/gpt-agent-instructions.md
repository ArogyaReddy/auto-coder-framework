# GPT-4.1/GPT-4o Agent Instructions for Auto-Coder Framework

## IMPORTANT: Read This First

You are working with an auto-coder test framework. Your job is to follow these instructions EXACTLY. Do not improvise or skip steps.

## Step-by-Step Process for Test Execution

### STEP 1: Verify Current Directory

```bash
pwd
# Should show: /Users/arog/framework/auto-coder
# If not, run: cd /Users/arog/framework/auto-coder
```

### STEP 2: Check Test Target Exists

```bash
ls -la generated/features/jira-story-rs-end-point.feature
# If file doesn't exist, user needs to generate it first
```

### STEP 3: Fix Base Page Import (ALWAYS DO THIS)

```bash
# Edit the generated page file
sed -i '' 's|../common/base-page|../../support/common/base-page|g' generated/pages/*-page.js
```

### STEP 4: Run the Test

```bash
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
```

### STEP 5: Open Reports (After Test Completes)

```bash
# Custom detailed report
open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html

# Playwright report
open file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html
```

## Expected Results (THIS IS NORMAL)

- All tests will FAIL - this is expected and desired
- Failures indicate real locators are being used (not mocks)
- Authentication should load properly
- Reports should be generated

## Common Issues and Fixes

### Issue 1: "Cannot find module '../common/base-page'"

**Fix**: Run Step 3 above to fix import paths

### Issue 2: "this.init is not a function"

**Fix**: This is a known issue, tests still execute properly

### Issue 3: "Multiple step definitions match"

**Fix**: Edit the steps file to remove duplicate step definitions

### Issue 4: "Undefined step"

**Fix**: Add missing step implementations to steps file

## What To Tell User After Execution

1. **Test Status**: X scenarios executed, all failed (this is expected)
2. **Authentication**: Configuration loaded successfully
3. **Reports Generated**:
   - Custom report: file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html
   - Playwright report: file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html
4. **Next Steps**: Review reports to see which locators need updating

## CRITICAL: Do Not Skip Any Steps

Follow steps 1-5 in exact order. Do not modify any other files unless specifically instructed.

## If User Asks for Test Generation

Tell them to run:

```bash
./auto-coder.sh generate input/[their-input-file]
```

## If User Reports "Command Not Found"

Check they are in the right directory:

```bash
cd /Users/arog/framework/auto-coder
ls -la auto-coder.sh
```

## Configuration Details

- Browser: Chrome (non-headless)
- Authentication: MAX with ADP credentials
- Username: Arogya@24890183
- Password: Test0705
- URL: https://online-iat.adp.com/signin/v1/?APPID=RUN&productId=7bf1242e-2ff0-e324-e053-37004b0bc98c

## Success Indicators

✅ Tests execute (even if they fail)
✅ Configuration loads with MAX credentials
✅ Reports are generated in generated/reports/
✅ Browser opens in non-headless mode
✅ Real locator failures are reported
