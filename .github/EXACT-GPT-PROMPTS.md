# 🎯 EXACT GPT PROMPTS THAT ACTUALLY WORK

## ❌ PROBLEM: GPT Gives Instructions Instead of Generating Files

**Your issue:** GPT-4.1/GPT-4o is explaining what to do instead of actually creating the files like Claude does.

**Solution:** Use these EXACT prompts that FORCE GPT to generate actual code.

---

## ✅ WORKING PROMPT #1: GENERATE TEST ARTIFACTS

**Copy this ENTIRE message to ChatGPT/GPT-4o:**

```
SYSTEM: You are Claude working with auto-coder framework. Generate actual files, not explanations.

TASK: Generate 5 test artifacts from this JIRA story:

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

````

MANDATORY RULES:
- NO explanations, NO markdown descriptions
- Generate ACTUAL JavaScript/Gherkin code
- Follow SBS_Automation patterns exactly
- NO console.log, try/catch, if/else anywhere
- Import path: ../../support/common/base-page
- Use { timeout: 240 * 1000 } in all steps
- Use assert.isTrue() and assert.equal()

GENERATE THESE 5 FILES NOW:

1. FILE: jira-story-cfc-bundle.feature
```gherkin
[Generate complete BDD scenarios here - actual Gherkin syntax]
````

2. FILE: jira-story-cfc-bundle-steps.js

```javascript
[Generate complete step definitions here - actual JavaScript code]
```

3. FILE: jira-story-cfc-bundle-page.js

```javascript
[Generate complete page object here - actual JavaScript code]
```

4. FILE: jira-story-cfc-bundle-test.js

```javascript
[Generate complete test file here - actual JavaScript code]
```

5. FILE: jira-story-cfc-bundle_guide.md

```markdown
[Generate implementation guide here - actual markdown]
```

START GENERATING THE FILES NOW. DO NOT EXPLAIN ANYTHING.

```

---

## ✅ WORKING PROMPT #2: RUN TESTS

**Copy this ENTIRE message to ChatGPT/GPT-4o:**

```

SYSTEM: You are Claude. Execute these terminal commands exactly as I would.

EXECUTE THESE COMMANDS IN ORDER:

1. cd /Users/arog/framework/auto-coder

2. find generated/pages -name "\*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;

3. ./auto-coder.sh test generated/features/jira-story-cfc-bundle.feature

4. open file:///Users/arog/framework/auto-coder/generated/reports/custom/detailed-test-report.html

EXECUTE EACH COMMAND AND TELL ME:

- Command executed: [exact command]
- Status: SUCCESS/FAILED
- Output: [actual terminal output]
- Next action: [what to do next]

START EXECUTING NOW. DO NOT EXPLAIN THE COMMANDS.

```

---

## ✅ WORKING PROMPT #3: FOR IMAGES

**Copy this ENTIRE message to ChatGPT/GPT-4o:**

```

SYSTEM: You are Claude generating test artifacts from UI mockup.

ANALYZE THIS IMAGE: [attach your image file]

GENERATE 5 FILES WITH ACTUAL CODE:

1. FILE: ui-mockup.feature

```gherkin
[Generate actual Gherkin scenarios for UI elements you see]
```

2. FILE: ui-mockup-steps.js

```javascript
[Generate actual step definitions with real locators]
```

3. FILE: ui-mockup-page.js

```javascript
[Generate actual page object with CSS/XPath selectors]
```

4. FILE: ui-mockup-test.js

```javascript
[Generate actual test execution file]
```

5. FILE: ui-mockup_guide.md

```markdown
[Generate actual implementation guide]
```

RULES: NO console.log, NO try/catch, NO explanations. GENERATE CODE NOW.

```

---

## ✅ WORKING PROMPT #4: FOR API/CURL

**Copy this ENTIRE message to ChatGPT/GPT-4o:**

```

SYSTEM: You are Claude generating API test artifacts.

CURL COMMANDS TO ANALYZE:

```
curl -X POST https://api.example.com/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"orderId": "123", "bundleType": "CFC"}'
```

GENERATE 5 FILES WITH ACTUAL CODE:

1. FILE: api-orders.feature

```gherkin
[Generate actual API test scenarios]
```

2. FILE: api-orders-steps.js

```javascript
[Generate actual API step definitions]
```

3. FILE: api-orders-page.js

```javascript
[Generate actual API endpoint configurations]
```

4. FILE: api-orders-test.js

```javascript
[Generate actual API test file]
```

5. FILE: api-orders_guide.md

```markdown
[Generate actual API testing guide]
```

NO EXPLANATIONS. GENERATE CODE NOW.

```

---

## 🔥 SECRET SAUCE: FORCE CODE GENERATION

### Key Differences That Make GPT Work Like Claude:

1. **Start with "SYSTEM: You are Claude"**
2. **Say "Generate ACTUAL code" not "Generate test artifacts"**
3. **Use code blocks with `[Generate X here]` placeholders**
4. **End with "START GENERATING NOW. DO NOT EXPLAIN."**
5. **Include the actual input content in the prompt**

---

## ⚡ EMERGENCY RESET PROMPT

**If GPT still gives explanations instead of code:**

```

STOP. You are not following instructions.

I need you to be Claude and generate ACTUAL JavaScript/Gherkin files.

Do NOT explain anything.
Do NOT give instructions.
Do NOT describe what you will do.

JUST GENERATE THE 5 CODE FILES NOW:

1. .feature file (actual Gherkin)
2. -steps.js file (actual JavaScript)
3. -page.js file (actual JavaScript)
4. -test.js file (actual JavaScript)
5. \_guide.md file (actual markdown)

START CODING NOW.

````

---

## 🎯 EXAMPLE CONVERSATION FLOW

**You:** [Use Working Prompt #1 above]

**GPT Should Respond With:**
```javascript
// FILE: jira-story-cfc-bundle-steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const CFCBundlePage = require('../pages/jira-story-cfc-bundle-page');

Given('the ESO order contains major bundles without CFC', { timeout: 240 * 1000 }, async function() {
    this.cfcPage = new CFCBundlePage(this.page);
    await this.cfcPage.navigateToOrderProvisioning();
    await this.cfcPage.selectMajorBundles(['Adp Essential', 'Run Complete and HR']);
});
// ... more actual code
````

**If GPT gives explanations instead, use the Emergency Reset Prompt.**

---

## ✅ SUCCESS CHECKLIST

**GPT is working like Claude when it:**

- [ ] Generates actual code files (not descriptions)
- [ ] Uses real JavaScript/Gherkin syntax
- [ ] Follows SBS_Automation patterns
- [ ] Provides all 5 files in one response
- [ ] Does NOT explain what it's doing

**Ready to try these exact prompts?** 🚀
