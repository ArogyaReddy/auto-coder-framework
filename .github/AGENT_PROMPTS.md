# Auto-Coder Framework - Agent Mode Prompts

## 🤖 Agent Operating Instructions

### Primary Mission

Build and maintain an intelligent test artifact generator that learns from SBS_Automation patterns to create dynamic, adaptable test automation assets from any requirement source.

## 🎯 Agent Responsibilities

### Core Functions:

1. **Pattern Learning**: Extract and analyze patterns from SBS_Automation framework
2. **Intelligent Generation**: Create test artifacts using learned patterns
3. **Dynamic Adaptation**: Ensure framework works across different domains
4. **Quality Assurance**: Validate outputs against established standards
5. **Continuous Improvement**: Learn from user feedback and expand capabilities

### Operational Guidelines:

```
ALWAYS → Check FRAMEWORK_STATE.md first
ALWAYS → Reference SBS_Automation patterns
ALWAYS → Validate against constraints
ALWAYS → Test with multiple requirement types
ALWAYS → Update documentation after changes
```

## 🚫 Critical Constraints

### Absolutely Prohibited:

- Hard-coding business-specific terms, keywords, or patterns
- Creating requirement-specific logic that won't generalize
- Using static templates that don't adapt to different domains
- Implementing solutions that require manual updates for new requirements
- Breaking existing functionality when adding new features

### Required Approach:

- Extract patterns dynamically from knowledge base
- Use configurable, domain-agnostic templates
- Implement adaptive algorithms that learn from existing data
- Create flexible solutions that scale across different requirement types
- Maintain backward compatibility and extensibility

## 🏗️ Architecture Mandates

### Knowledge Base Integration:

```
auto-coder/
├── knowledge-base/
│   ├── patterns/          # SBS_Automation extracted patterns
│   │   ├── features/      # Feature file patterns
│   │   ├── steps/         # Step definition patterns
│   │   ├── pages/         # Page object patterns
│   │   └── common/        # Shared patterns
│   ├── templates/         # Dynamic, configurable templates
│   │   ├── feature-templates/
│   │   ├── step-templates/
│   │   ├── page-templates/
│   │   └── test-templates/
│   ├── vocabulary/        # Domain dictionaries
│   │   ├── roles.json     # User roles from SBS
│   │   ├── actions.json   # Action verbs from SBS
│   │   ├── entities.json  # Domain entities from SBS
│   │   └── domains.json   # Business domain mappings
│   └── mappings/          # Intelligence mappings
│       ├── intent-mapping.json
│       ├── pattern-mapping.json
│       └── template-mapping.json
```

### Processing Pipeline:

```
Input → Classification → Pattern Matching → Template Selection → Population → Validation → Output
```

## 🔧 Implementation Standards

### Code Quality Requirements:

1. **Modularity**: Each component should be independently testable
2. **Configurability**: All patterns and templates must be configurable
3. **Extensibility**: Easy to add new input types and output formats
4. **Maintainability**: Clear separation of concerns and documentation
5. **Performance**: Efficient processing of large pattern databases

### Testing Standards:

1. **Multi-Input Testing**: Test with diverse requirement types
2. **Pattern Validation**: Verify extracted patterns are accurate
3. **Output Quality**: Ensure generated artifacts meet SBS standards
4. **Regression Testing**: Verify existing functionality remains intact
5. **Performance Testing**: Validate acceptable processing times

## 🎭 Agent Behavior Protocols

### When Implementing Features:

1. **Analyze SBS_Automation** for existing patterns
2. **Design configurable solution** using extracted patterns
3. **Implement with flexibility** for different requirement types
4. **Test across multiple domains** to ensure adaptability
5. **Document patterns and decisions** for future reference

### When Debugging Issues:

1. **Identify constraint violations** (usually hard-coded patterns)
2. **Trace through processing pipeline** to find root cause
3. **Design dynamic replacement** using knowledge base
4. **Implement fix** without breaking existing functionality
5. **Validate fix** with comprehensive testing

### When Responding to Feedback:

1. **Acknowledge specific concerns** raised by user
2. **Explain current limitations** and why they exist
3. **Propose improvement plan** aligned with framework principles
4. **Implement changes** following established patterns
5. **Validate improvements** and update documentation

## 📊 Success Metrics

### Quality Indicators:

- **Pattern Accuracy**: Generated artifacts follow SBS patterns
- **Adaptability Score**: Framework works across different requirement types
- **Vocabulary Compliance**: Generated content uses established domain terms
- **Structural Integrity**: Outputs follow proper Gherkin and code structure
- **User Satisfaction**: Generated artifacts require minimal manual editing

### Performance Indicators:

- **Processing Speed**: Acceptable generation times for various input sizes
- **Memory Efficiency**: Reasonable resource usage for pattern databases
- **Scalability**: Performance maintained as knowledge base grows
- **Reliability**: Consistent outputs for same inputs

## 🔄 Continuous Improvement Protocol

### Learning Cycle:

1. **Monitor User Feedback** on generated artifact quality
2. **Analyze Failure Patterns** to identify improvement areas
3. **Extract New Patterns** from SBS_Automation updates
4. **Update Knowledge Base** with learned patterns
5. **Validate Improvements** through comprehensive testing

### Documentation Updates:

- Update FRAMEWORK_STATE.md with current capabilities
- Document new patterns in knowledge base
- Record lessons learned from user interactions
- Maintain examples of successful artifact generation

## 🎯 Agent Success Formula

```
SBS Pattern Intelligence + Dynamic Templates + Configurable Processing = Adaptive Test Artifact Generation
```

## 📋 Pre-Execution Checklist

- [ ] FRAMEWORK_STATE.md reviewed
- [ ] SBS_Automation patterns consulted
- [ ] No hard-coded patterns introduced
- [ ] Solution tested with multiple requirement types
- [ ] Documentation updated
- [ ] Backward compatibility maintained
