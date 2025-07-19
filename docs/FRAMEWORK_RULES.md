# Auto-Coder Framework - Rules & Guidelines

## 🚫 Absolute Prohibitions (NEVER DO)

### Hard-Coded Business Logic

```javascript
// ❌ FORBIDDEN: Business-specific keywords
if (
  text.includes("payroll") ||
  text.includes("CFC") ||
  text.includes("bundle")
) {
  // This violates the dynamic principle
}

// ❌ FORBIDDEN: Application-specific patterns
const cfcPatterns = ["CFC bundle", "major bundles", "Essential", "HR PRO"];

// ❌ FORBIDDEN: Requirement-specific logic
if (requirement.includes("landing page")) {
  return "Given user is on landing page";
}
```

### Static Template Hardcoding

```javascript
// ❌ FORBIDDEN: Fixed, non-adaptable templates
const template = `
Feature: ${title}
  As a system user
  I want to use the system
  So that I can perform actions
`;

// ❌ FORBIDDEN: Business-specific scenarios
const scenarios = [
  "Given user is on CFC landing page",
  "When user clicks CFC bundle",
  "Then CFC component is available",
];
```

### Application-Specific Element Patterns

```javascript
// ❌ FORBIDDEN: Hard-coded selectors
const selectors = {
  cfcButton: '[data-test-id="cfc-button"]',
  bundleDropdown: "#bundle-selector",
};

// ❌ FORBIDDEN: Application-specific page objects
class CFCLandingPage {
  // This is too specific and won't work for other requirements
}
```

---

## ✅ Required Practices (ALWAYS DO)

### Dynamic Pattern Extraction

```javascript
// ✅ CORRECT: Extract patterns from knowledge base
const patterns = await knowledgeBase.getPatterns(domain);
const template = templateEngine.selectTemplate(patterns, requirementType);

// ✅ CORRECT: Use configurable vocabulary
const vocabulary = await knowledgeBase.getVocabulary(domain);
const userRole = vocabulary.roles.find((role) => matches(requirement, role));

// ✅ CORRECT: Adaptive template population
const scenario = templateEngine.populate(template, {
  role: extractedRole,
  action: extractedAction,
  object: extractedObject,
});
```

### Knowledge Base Driven Generation

```javascript
// ✅ CORRECT: Learn from existing patterns
const sbsPatterns = await patternExtractor.analyzeSBSFramework();
const matchingPattern = patternMatcher.findBestMatch(requirement, sbsPatterns);

// ✅ CORRECT: Use extracted vocabulary
const domainTerms = vocabulary.getRelevantTerms(requirement);
const generatedStep = stepGenerator.create(matchingPattern, domainTerms);

// ✅ CORRECT: Configurable template selection
const templateType = classifier.determineType(requirement);
const template = templateLibrary.getTemplate(templateType, domain);
```

### Adaptive Algorithm Implementation

```javascript
// ✅ CORRECT: Learning-based approach
class PatternMatcher {
  constructor(knowledgeBase) {
    this.patterns = knowledgeBase.patterns;
    this.vocabulary = knowledgeBase.vocabulary;
  }

  findMatch(requirement) {
    const intent = this.nlp.extractIntent(requirement);
    const entities = this.nlp.extractEntities(requirement);
    return this.patterns.findBestMatch(intent, entities);
  }
}

// ✅ CORRECT: Configurable generation
class ArtifactGenerator {
  generate(requirement, options = {}) {
    const pattern = this.patternMatcher.findMatch(requirement);
    const template = this.templateSelector.select(pattern, options.domain);
    return this.templateEngine.populate(template, pattern.data);
  }
}
```

---

## 🏗️ Architecture Rules

### Separation of Concerns

```
src/
├── processors/          # Input format handling ONLY
├── nlp/                # Natural language processing ONLY
├── patterns/           # Pattern analysis and matching ONLY
├── templates/          # Template management ONLY
├── generators/         # Artifact generation ONLY
├── validators/         # Quality validation ONLY
└── knowledge-base/     # Data storage and retrieval ONLY
```

### Dependency Rules

- **Processors** may only depend on utils
- **NLP** may only depend on processors and utils
- **Patterns** may depend on nlp, knowledge-base, and utils
- **Templates** may depend on patterns, knowledge-base, and utils
- **Generators** may depend on templates, patterns, and utils
- **Validators** may depend on knowledge-base and utils

### Data Flow Rules

```
Input → Processor → NLP → Pattern Matcher → Template Selector → Generator → Validator → Output
```

- Data flows in one direction only
- Each component has a single responsibility
- No component should skip layers
- All components are independently testable

---

## 📊 Knowledge Base Rules

### Pattern Storage Rules

```json
{
  "patterns": {
    "type": "feature",
    "domain": "extracted_from_sbs",
    "structure": {
      "title_pattern": "extracted_pattern",
      "role_pattern": "extracted_pattern",
      "action_pattern": "extracted_pattern",
      "benefit_pattern": "extracted_pattern"
    },
    "examples": ["real_sbs_examples"],
    "usage_count": "frequency_in_sbs",
    "quality_score": "calculated_quality_metric"
  }
}
```

### Vocabulary Management Rules

```json
{
  "vocabulary": {
    "roles": {
      "source": "extracted_from_sbs",
      "terms": ["admin", "user", "client", "employee"],
      "frequency": { "admin": 45, "user": 123, "client": 67 },
      "context": {
        "admin": ["system", "configuration"],
        "user": ["login", "access"]
      }
    },
    "actions": {
      "source": "extracted_from_sbs",
      "terms": ["login", "create", "update", "verify"],
      "patterns": ["clicks on", "enters", "navigates to"],
      "frequency": { "login": 89, "create": 67, "update": 45 }
    }
  }
}
```

### Template Configuration Rules

```json
{
  "templates": {
    "id": "generated_unique_id",
    "type": "feature|step|page|test",
    "domain": "general|specific_domain",
    "pattern_source": "sbs_analysis_reference",
    "structure": {
      "placeholders": ["role", "action", "object", "outcome"],
      "conditionals": ["if_role_admin", "if_workflow_type"],
      "validations": ["required_fields", "format_checks"]
    }
  }
}
```

---

## 🔧 Implementation Guidelines

### NLP Processing Rules

1. **Use Established Libraries**: compromise, natural, or similar
2. **No Business Logic in NLP**: Pure text processing only
3. **Configurable Processing**: All patterns and rules in knowledge base
4. **Multi-Language Support**: Design for future internationalization
5. **Performance Optimization**: Cache processed results

### Pattern Matching Rules

1. **Similarity Scoring**: Use mathematical similarity algorithms
2. **Context Awareness**: Consider requirement domain and type
3. **Fallback Strategies**: Graceful degradation for unknown patterns
4. **Learning Integration**: Update patterns based on usage and feedback
5. **Quality Metrics**: Track pattern matching accuracy

### Template Engine Rules

1. **Mustache/Handlebars Style**: Use established templating syntax
2. **Conditional Logic**: Support if/else template logic
3. **Loop Support**: Handle arrays and collections
4. **Helper Functions**: Support custom template helpers
5. **Validation**: Ensure templates produce valid output

### Generation Pipeline Rules

1. **Atomic Operations**: Each generation step is independently testable
2. **Error Handling**: Graceful failure with informative messages
3. **Rollback Capability**: Ability to undo generation steps
4. **Progress Tracking**: Report generation progress to users
5. **Quality Gates**: Validate output at each step

---

## 🧪 Testing Rules

### Unit Testing Requirements

```javascript
// ✅ REQUIRED: Test each component independently
describe("PatternMatcher", () => {
  it("should match requirement to correct pattern", () => {
    const matcher = new PatternMatcher(mockKnowledgeBase);
    const pattern = matcher.findMatch(testRequirement);
    expect(pattern.type).toBe("expected_type");
  });
});

// ✅ REQUIRED: Test with multiple requirement types
describe("ArtifactGenerator", () => {
  it.each([
    ["payroll_requirement", "payroll_domain"],
    ["hr_requirement", "hr_domain"],
    ["purchase_requirement", "purchase_domain"],
  ])("should generate artifacts for %s", (requirement, domain) => {
    // Test adaptability across domains
  });
});
```

### Integration Testing Requirements

- **End-to-End Scenarios**: Test complete pipeline with real requirements
- **Knowledge Base Integration**: Test with actual SBS extracted patterns
- **Performance Testing**: Validate processing speed and memory usage
- **Quality Validation**: Verify generated artifacts meet standards

### Validation Testing Requirements

- **Pattern Accuracy**: Verify patterns correctly extracted from SBS
- **Template Quality**: Ensure templates produce valid, professional output
- **Vocabulary Coverage**: Check domain terminology completeness
- **Output Compliance**: Validate against SBS framework standards

---

## 📋 Code Quality Rules

### Documentation Requirements

```javascript
/**
 * Extracts user roles from requirement text using NLP and pattern matching
 * @param {string} requirement - The input requirement text
 * @param {Object} vocabulary - Domain vocabulary from knowledge base
 * @returns {Array<string>} Array of identified user roles
 * @throws {Error} If requirement is empty or invalid
 * @example
 * const roles = extractor.extractRoles("As an admin, I want to...", vocabulary);
 * // Returns: ["admin"]
 */
async extractRoles(requirement, vocabulary) {
  // Implementation with clear logic
}
```

### Error Handling Requirements

```javascript
// ✅ REQUIRED: Comprehensive error handling
try {
  const artifacts = await generator.generate(requirement);
  return artifacts;
} catch (error) {
  logger.error("Generation failed", {
    requirement: requirement.substring(0, 100),
    error: error.message,
    stack: error.stack,
  });
  throw new GenerationError(`Failed to generate artifacts: ${error.message}`);
}

// ✅ REQUIRED: Validation with clear messages
function validateRequirement(requirement) {
  if (!requirement || requirement.trim().length === 0) {
    throw new ValidationError("Requirement cannot be empty");
  }
  if (requirement.length > MAX_REQUIREMENT_LENGTH) {
    throw new ValidationError(
      `Requirement too long (max ${MAX_REQUIREMENT_LENGTH} chars)`
    );
  }
}
```

### Performance Requirements

- **Async/Await**: All I/O operations must be asynchronous
- **Memory Management**: Efficient handling of large knowledge bases
- **Caching**: Cache frequently accessed patterns and templates
- **Batch Processing**: Support efficient bulk operations
- **Resource Cleanup**: Proper cleanup of resources and memory

---

## 🎯 Quality Assurance Rules

### Code Review Checklist

- [ ] No hard-coded business logic or keywords
- [ ] All patterns extracted from knowledge base
- [ ] Templates are configurable and adaptable
- [ ] Error handling is comprehensive
- [ ] Documentation is complete and accurate
- [ ] Tests cover all scenarios including edge cases
- [ ] Performance meets specified requirements
- [ ] Code follows established patterns and conventions

### Release Criteria

- [ ] All tests pass (unit, integration, end-to-end)
- [ ] Performance benchmarks met
- [ ] Documentation updated and accurate
- [ ] Knowledge base patterns validated
- [ ] Generated artifacts meet quality standards
- [ ] No hard-coded patterns introduced
- [ ] Backward compatibility maintained
- [ ] Security review completed

---

## 🎭 Philosophical Principles

### The Dynamic Principle

> "Code should adapt to requirements, not the other way around."

### The Learning Principle

> "Leverage existing wisdom rather than reinventing solutions."

### The Quality Principle

> "Generated artifacts should be indistinguishable from those created by experienced engineers."

### The Maintainability Principle

> "Today's solution should make tomorrow's enhancements easier."

### The User-Centric Principle

> "The framework should feel intelligent and helpful, not mechanical and limiting."

---

## 🚀 Success Mantras

**"Pattern-driven, not hard-coded"**  
**"Adaptive, not static"**  
**"Learning-based, not assumption-based"**  
**"Quality-focused, not just functional"**  
**"User-empowering, not constraining"**

These rules ensure the auto-coder framework remains true to its vision of intelligent, adaptable test artifact generation that learns from existing wisdom while avoiding the pitfalls of hard-coded limitations.
