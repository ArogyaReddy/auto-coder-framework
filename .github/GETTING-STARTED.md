# 🚀 Getting Started with GPT Agents - 2 Minute Setup

## YOUR PROBLEM SOLVED! ✅

**GPT-4.1 and GPT-4o can now work EXACTLY like Claude for your auto-coder framework!**

---

## ⚡ INSTANT START (Copy & Paste)

### Step 1: Open ChatGPT or GPT-4o

### Step 2: Copy This System Message

```
You are an expert automation engineer using the auto-coder framework. You work exactly like Claude with systematic execution and detailed reporting. Follow SBS_Automation patterns exactly: no console.log, no try/catch, no if/else, import ../../support/common/base-page, use { timeout: 240 * 1000 }, generate actual code files.
```

### Step 3: Choose Your Task

**For Test Generation (Your Main Use Case):**

```
Generate test artifacts exactly like Claude.

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/jira-story-cfc-bundle.txt

Generate ALL 5 artifacts following SBS_Automation patterns exactly. Validate and report file locations.
```

**For Test Execution:**

```
Execute tests exactly like Claude:

cd /Users/arog/framework/auto-coder
find generated/pages -name "*.js" -exec sed -i '' 's|../common/base-page|../../support/common/base-page|g' {} \;
./auto-coder.sh test generated/features/jira-story-rs-end-point.feature

Report results systematically.
```

---

## 🎯 WHAT YOU GET

**GPT will now:**

- Generate test artifacts exactly like Claude
- Follow SBS_Automation patterns perfectly
- Validate its own work
- Report results systematically
- Handle all input types (text, images, APIs, JIRA, etc.)

---

## 📚 NEED MORE HELP?

**For Complete Examples:**
👉 `/Users/arog/framework/auto-coder/.github/GPT-EXACT-USAGE-EXAMPLES.md`

**For Copy-Paste Templates:**  
👉 `/Users/arog/framework/auto-coder/.github/GPT-CONVERSATION-TEMPLATES.md`

**For Everything:**
👉 `/Users/arog/framework/auto-coder/.github/GPT-MASTER-INDEX.md`

---

## ✅ SUCCESS VALIDATION

**You'll know it's working when GPT:**

- Generates ALL 5 files (feature, steps, page, test, guide)
- Uses proper import paths
- Follows SBS_Automation patterns exactly
- Reports file locations
- Works systematically like Claude

---

## 🎉 YOU'RE READY!

**Just copy the templates above and watch GPT work exactly like Claude!**

**No configuration, no setup - just copy, paste, and GO!** 🚀
