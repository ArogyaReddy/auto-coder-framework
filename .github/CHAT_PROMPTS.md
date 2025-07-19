# Auto-Coder Framework - Chat Mode Prompts

## 🎯 Core Mission

The auto-coder framework reads, understands, extracts, and generates test artifacts from various requirement sources using patterns learned from the existing SBS_Automation framework.

## 📋 Pre-Work Checklist

Before starting ANY work on auto-coder framework, ALWAYS:

1. ✅ Read and confirm understanding of `FRAMEWORK_STATE.md`
2. ✅ Review the current project constraints and rules
3. ✅ Check existing SBS_Automation patterns for reference
4. ✅ Verify no hard-coded business logic will be introduced
5. ✅ Confirm the change aligns with dynamic/adaptable principles

## 🚫 Absolute Constraints (NEVER VIOLATE)

### ❌ Forbidden Practices:

- **NO hard-coded business-specific keywords** (e.g., `'CFC'`, `'bundle'`, `'payroll'`)
- **NO hard-coded application statements** (e.g., `if (line.includes('Essential'))`)
- **NO static requirement-specific patterns** (e.g., `'major bundles'`)
- **NO fixed user stories or scenarios** that only work for specific requirements
- **NO application-specific element selectors or page patterns**

### ✅ Required Practices:

- **Dynamic pattern extraction** from SBS_Automation knowledge base
- **Configurable templates** that adapt to any domain
- **Vocabulary-driven generation** using extracted domain dictionaries
- **Pattern-based intelligence** learned from existing artifacts
- **Flexible, adaptable code** that works across different requirements

## 🔧 Framework Architecture Principles

### Core Pipeline:

```
Requirements → Classification → Pattern Matching → Template Selection → Smart Population → Validation → Artifacts
```

### Knowledge Base Structure:

```
knowledge-base/
├── patterns/           # Extracted from SBS_Automation
├── templates/          # Domain-agnostic templates
├── vocabulary/         # Dynamic domain dictionaries
└── mappings/          # Intelligent requirement-to-pattern mappings
```

## 💬 Chat Interaction Guidelines

### When User Requests Changes:

1. **Acknowledge the request** and confirm understanding
2. **Reference FRAMEWORK_STATE.md** for current status
3. **Explain the approach** before implementing
4. **Highlight any constraints** that apply
5. **Provide implementation plan** with clear steps
6. **Update FRAMEWORK_STATE.md** after changes

### When Debugging Issues:

1. **Identify the root cause** (often hard-coded patterns)
2. **Explain why the issue occurred**
3. **Propose dynamic solution** using knowledge base approach
4. **Implement fix** without breaking existing functionality
5. **Validate fix** against framework principles

### When Adding Features:

1. **Check SBS_Automation** for existing patterns
2. **Design solution** using extracted patterns
3. **Ensure flexibility** for different requirement types
4. **Test with multiple** requirement examples
5. **Document new capabilities** in FRAMEWORK_STATE.md

## 🎭 Communication Style

### Always:

- Be transparent about constraints and limitations
- Explain the reasoning behind architectural decisions
- Reference SBS_Automation patterns when applicable
- Provide clear implementation steps
- Acknowledge when hard-coded patterns need to be removed

### Never:

- Implement hard-coded solutions without mentioning the constraint violation
- Make changes that break existing functionality
- Create requirement-specific code that won't work for other inputs
- Ignore the dynamic/adaptable principles

## 🔍 Quality Validation

### Before Delivering Code:

1. **Scan for hard-coded patterns** - Remove any found
2. **Test with multiple requirements** - Ensure adaptability
3. **Validate against SBS patterns** - Check compliance
4. **Verify no regressions** - Existing features still work
5. **Update documentation** - Reflect current state

### Success Criteria:

- Generated artifacts use proper business terminology
- Code adapts to different requirement types without modification
- No hard-coded business logic exists
- Follows SBS_Automation patterns and standards
- Framework remains extensible and maintainable

## 📚 Reference Materials

- `FRAMEWORK_STATE.md` - Current project status
- `FRAMEWORK_EXPECTATIONS.md` - Detailed requirements
- `FRAMEWORK_RULES.md` - Technical constraints
- `/Users/arog/framework/qa_automation/SBS_Automation/` - Pattern reference source

## 🎯 Success Mantra

"Dynamic, adaptable, pattern-driven generation that learns from existing wisdom without hard-coded constraints."
