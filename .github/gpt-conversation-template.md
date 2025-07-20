# GPT Agent Conversation Template for Auto-Coder Framework

## How to Start a Conversation with GPT-4.1/GPT-4o

Copy and paste this exact prompt to your GPT agent:

---

**SYSTEM**: You are an expert automation engineer. You will execute test artifacts for the Auto-Coder framework. Follow all instructions exactly without deviation.

**USER REQUEST**:

"I need you to execute test artifacts for the auto-coder framework. Here are the exact steps you must follow:

**TASK**: Execute `/run-test-artifacts.prompt.md` with the following configuration:

- TEST_TYPE: feature
- TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/jira-story-rs-end-point.feature
- EXECUTION_OPTIONS: browser: chrome, headless: false

**MANDATORY STEPS** (Do ALL steps in this exact order):

1. **Navigate to framework directory**:

   ```bash
   cd /Users/arog/framework/auto-coder
   pwd
   ```

2. **Fix import paths (CRITICAL - must run every time)**:

   ```bash
   find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
   ```

3. **Execute the test**:

   ```bash
   ./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
   ```

4. **Open the reports**:
   ```bash
   open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html
   open file:///Users/arog/framework/auto-coder/generated/reports/playwright-report/index.html
   ```

**IMPORTANT EXPECTATIONS**:

- All tests WILL fail - this is expected and desired
- Failures indicate real locators are being used (not mocks)
- Authentication should load with MAX credentials
- Reports must be generated even with failures

**REPORT FORMAT**: After execution, provide:

1. Number of scenarios executed
2. Confirmation that MAX authentication loaded
3. Report file paths
4. Explanation that failures are expected

Do you understand? Please execute these steps now."

---

## Alternative Short Version

If you need a shorter prompt:

---

"Execute auto-coder framework test with these commands:

```bash
cd /Users/arog/framework/auto-coder
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature
open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html
```

Expected result: All tests fail (this is normal). Reports should be generated. Tell me the results."

---

## For Test Generation (if needed first)

"Generate test artifacts first:

```bash
cd /Users/arog/framework/auto-coder
./auto-coder.sh generate input/jira/jira-story-rs-end-point.txt
```

Then execute the test steps above."

---

## Follow-up Questions You Can Ask GPT

After initial execution:

1. "Show me the content of the detailed report"
2. "What specific locators are failing?"
3. "Fix the duplicate step definitions in the steps file"
4. "Generate a summary of what needs to be updated"
5. "Check if authentication is working properly"

## If GPT Gets Confused

Reset with this prompt:

"Stop. Start over. Execute only these 4 commands in exact order:

1. `cd /Users/arog/framework/auto-coder`
2. `find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;`
3. `./auto-coder.sh test generated/features/jira-story-rs-end-point.feature`
4. `open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html`

Do not skip any command. Tell me the output of each command."

## Success Indicators to Look For

GPT should report:

- ✅ Commands executed without "command not found" errors
- ✅ Test scenarios executed (even if failed)
- ✅ MAX authentication configuration loaded
- ✅ HTML reports generated
- ✅ Browser opened in non-headless mode

## Red Flags (Tell GPT to Fix)

- ❌ "Command not found" errors
- ❌ "Cannot find module" errors (means step 2 was skipped)
- ❌ No reports generated
- ❌ GPT trying to modify code instead of running commands
