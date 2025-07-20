# Simple GPT Agent Commands for Auto-Coder Framework

## For Test Execution (Copy and Paste These Commands)

### Command Set 1: Setup and Verify

```bash
cd /Users/arog/framework/auto-coder
pwd
ls -la auto-coder.sh
```

### Command Set 2: Fix Base Page Imports (Run Every Time)

```bash
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
```

### Command Set 3: Execute Test

```bash
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
```

### Command Set 4: Open Reports

```bash
open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html
open file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html
```

## One-Line Execution (All Commands Together)

```bash
cd /Users/arog/framework/auto-coder && find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \; && ./auto-coder.sh test generated/features/jira-story-rs-end-point.feature && open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html && open file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html
```

## Expected Output

- Tests will fail (this is normal and expected)
- Configuration will load MAX credentials
- Reports will be generated
- Browser will open in visible mode

## If User Needs Test Generation First

```bash
cd /Users/arog/framework/auto-coder
./auto-coder.sh generate input/[filename].txt
```

## Emergency Reset Commands

```bash
cd /Users/arog/framework/auto-coder
git status
git clean -fd generated/
```

## Package.json Scripts (Alternative)

```bash
npm run auto-coder-run
# or
npm run test
```

## Directory Check Commands

```bash
ls -la generated/features/
ls -la generated/pages/
ls -la generated/steps/
ls -la generated/reports/
```
