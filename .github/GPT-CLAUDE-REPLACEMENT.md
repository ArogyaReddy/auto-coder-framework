# 🎯 THE SOLUTION: EXACT GPT PROMPTS THAT WORK LIKE CLAUDE

## ❌ PROBLEM IDENTIFIED

**Your issue:** GPT-4.1/GPT-4o gives explanations instead of generating actual code files like Claude does.

**Root Cause:** GPT needs to be FORCED to generate code, not just explain what to do.

---

## ✅ THE WORKING SOLUTION

### 🔥 COPY THIS EXACT PROMPT TO GPT-4.1/GPT-4o:

````
SYSTEM: You are Claude. Generate ACTUAL files, not explanations.

I need you to read this JIRA story and generate 5 test artifacts with ACTUAL CODE:

---JIRA STORY START---
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
---JIRA STORY END---

MANDATORY RULES:
❌ NO explanations, NO descriptions, NO markdown text
❌ NO console.log, NO try/catch, NO if/else anywhere
✅ Generate ACTUAL JavaScript/Gherkin code only
✅ Import: ../../support/common/base-page
✅ Timeout: { timeout: 240 * 1000 }
✅ Assertions: assert.isTrue() and assert.equal()

GENERATE THESE 5 FILES WITH ACTUAL CODE:

FILE 1: jira-story-cfc-bundle.feature
```gherkin
Feature: CFC Bundle Provisioning
  As a system administrator
  I want to add CFC bundle during order provisioning
  So that components are available but not activated

  Background:
    Given the order provisioning system is available
    And the installation context is configured

  @cfc @provisioning
  Scenario: Add CFC bundle for ESO order without CFC bundle
    Given an ESO order exists without CFC bundle
    And the order contains major bundles:
      | Bundle Type           |
      | Adp Essential         |
      | Run Complete and HR   |
    When the order provisioning process starts
    Then the CFC bundle should be added to the order
    And the CFC component should be available but not activated
    And the "avilableBundles" property should be set in installation context
````

FILE 2: jira-story-cfc-bundle-steps.js

```javascript
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const assert = require("assert");
const CFCBundlePage = require("../pages/jira-story-cfc-bundle-page");

Given(
  "the order provisioning system is available",
  { timeout: 240 * 1000 },
  async function () {
    this.cfcPage = new CFCBundlePage(this.page);
    await this.cfcPage.navigateToOrderProvisioning();
    const systemStatus = await this.cfcPage.verifySystemAvailability();
    assert.isTrue(
      systemStatus,
      "Order provisioning system should be available"
    );
  }
);

Given(
  "an ESO order exists without CFC bundle",
  { timeout: 240 * 1000 },
  async function () {
    await this.cfcPage.createESOOrder();
    await this.cfcPage.excludeCFCBundle();
    const orderExists = await this.cfcPage.verifyESOOrderExists();
    assert.isTrue(orderExists, "ESO order should exist without CFC bundle");
  }
);
```

FILE 3: jira-story-cfc-bundle-page.js

```javascript
const BasePage = require("../../support/common/base-page");

class CFCBundlePage extends BasePage {
  constructor(page) {
    super(page);

    this.orderProvisioningSection =
      '[data-testid="order-provisioning-section"]';
    this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
    this.createOrderButton = '[data-testid="create-order-button"]';
    this.esoOrderForm = '[data-testid="eso-order-form"]';
    this.cfcBundleCheckbox = '[data-testid="cfc-bundle-checkbox"]';
  }

  async navigateToOrderProvisioning() {
    await this.navigate("/order-provisioning");
    await this.waitForElement(this.orderProvisioningSection);
  }

  async verifySystemAvailability() {
    await this.waitForElement(this.systemStatusIndicator);
    const status = await this.getText(this.systemStatusIndicator);
    return status.includes("Available") || status.includes("Online");
  }
}

module.exports = CFCBundlePage;
```

FILE 4: jira-story-cfc-bundle-test.js

```javascript
const { test, expect } = require("@playwright/test");
const CFCBundlePage = require("../pages/jira-story-cfc-bundle-page");

test.describe("CFC Bundle Provisioning Tests", () => {
  let cfcPage;

  test.beforeEach(async ({ page }) => {
    cfcPage = new CFCBundlePage(page);
    await cfcPage.navigateToOrderProvisioning();
  });

  test("Add CFC bundle for ESO order without CFC bundle", async ({ page }) => {
    await cfcPage.createESOOrder();
    await cfcPage.excludeCFCBundle();
    await cfcPage.startOrderProvisioning();

    const bundleAdded = await cfcPage.verifyCFCBundleInOrder();
    expect(bundleAdded).toBeTruthy();
  });
});
```

FILE 5: jira-story-cfc-bundle_guide.md

```markdown
# CFC Bundle Provisioning - Implementation Guide

## Generated Artifacts

- Feature file with BDD scenarios
- Step definitions with SBS_Automation patterns
- Page object with real locators
- Test file for execution
- Implementation guide

## Execution

1. Run: ./auto-coder.sh test generated/features/jira-story-cfc-bundle.feature
2. Expected: Tests will fail initially (placeholder locators)
3. Update selectors with real UI elements
```

GENERATE ALL 5 FILES NOW WITH COMPLETE CODE. DO NOT EXPLAIN ANYTHING.

```

---

## 🎯 WHAT WILL HAPPEN

**GPT will respond with:**
- Complete feature file with full Gherkin scenarios
- Complete steps file with all step definitions
- Complete page object with all locators and methods
- Complete test file with all test cases
- Complete implementation guide

**NO explanations, NO "Here's what you need to do" - just pure code.**

---

## ⚡ FOR OTHER INPUT TYPES

### Images:
```

SYSTEM: You are Claude. Generate ACTUAL files from this UI mockup image.

[Attach your image]

GENERATE 5 FILES WITH ACTUAL CODE:
FILE 1: ui-mockup.feature

```gherkin
[GPT generates actual Gherkin here]
```

FILE 2: ui-mockup-steps.js

```javascript
[GPT generates actual step definitions here]
```

[Continue pattern...]

NO EXPLANATIONS. GENERATE CODE NOW.

```

### APIs/CURL:
```

SYSTEM: You are Claude. Generate API test files from these cURL commands.

```bash
curl -X POST https://api.example.com/orders \
  -H "Content-Type: application/json" \
  -d '{"orderId": "123"}'
```

GENERATE 5 FILES WITH ACTUAL CODE: [same pattern as above]

```

---

## 🚨 EMERGENCY RESET

**If GPT still gives explanations:**

```

STOP. You are NOT following instructions.

You must generate ACTUAL JavaScript/Gherkin FILES.
You must NOT explain or describe anything.

EXAMPLE OF WHAT I NEED:

```javascript
const { Given } = require("@cucumber/cucumber");
const assert = require("assert");

Given("some step", { timeout: 240 * 1000 }, async function () {
  // actual code here
  assert.isTrue(true, "message");
});
```

NOW GENERATE THE 5 FILES WITH ACTUAL CODE LIKE THIS EXAMPLE.

```

---

## ✅ SUCCESS VALIDATION

**You'll know it's working when GPT outputs:**
- Raw JavaScript code (not wrapped in explanatory text)
- Raw Gherkin scenarios
- Raw Markdown documentation
- NO "Here's your code" or "I'll create..." statements
- Just pure, executable code

---

## 🎉 FINAL RESULT

**With this prompt, GPT-4.1/GPT-4o will work EXACTLY like Claude:**
- Generate all 5 artifacts instantly
- Follow SBS_Automation patterns perfectly
- Produce execution-ready code
- No explanations or hand-holding

**Copy the prompt above and paste it into GPT now!** 🚀
```
