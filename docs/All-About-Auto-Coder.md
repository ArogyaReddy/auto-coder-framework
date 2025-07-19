# All About Auto-Coder-Framework

## Table of Contents

1. [What is Auto-Coder-Framework?](#what-is-auto-coder-framework)
2. [Why Auto-Coder-Framework?](#why-auto-coder-framework)
3. [Architecture & Design](#architecture--design)
4. [Installation & Setup](#installation--setup)
5. [How to Use Auto-Coder-Framework](#how-to-use-auto-coder-framework)
6. [Generating Test Artifacts](#generating-test-artifacts)
7. [Running Tests](#running-tests)
8. [Generating Reports](#generating-reports)
9. [Using with Real Applications](#using-with-real-applications)
10. [Working with Real Locators](#working-with-real-locators)
11. [SBS_Automation Integration](#sbs_automation-integration)
12. [Troubleshooting](#troubleshooting)
13. [Best Practices](#best-practices)

---

## What is Auto-Coder-Framework?

Auto-Coder-Framework is an intelligent test artifact generator designed to streamline the creation of automated test suites from various requirement sources. It leverages existing SBS_Automation framework patterns while introducing intelligent automation capabilities to reduce manual effort and increase productivity.

### Key Features:

- **Multi-Input Support**: Generates tests from text files, images, cURL requests, JIRA items, Confluence pages, and UX designs
- **SBS_Automation Compatibility**: 100% compatible with existing SBS_Automation patterns and structures
- **Intelligent Pattern Recognition**: Extracts and applies patterns from existing test frameworks
- **Comprehensive Artifact Generation**: Creates feature files, step definitions, page objects, and tests
- **Real Locator Integration**: Designed to work with actual UI elements (requires manual locator updates)

---

## Why Auto-Coder-Framework?

### The Problem

Traditional test automation development involves:

1. Manual analysis of requirements
2. Time-consuming creation of feature files
3. Writing step definitions from scratch
4. Creating page objects manually
5. Developing test scripts individually
6. Repetitive work across similar features

### The Solution

Auto-Coder-Framework addresses these challenges by:

1. **Automating Requirements Analysis**: Intelligently parses various requirement formats
2. **Dynamic Artifact Generation**: Creates all necessary test components automatically
3. **Pattern Reuse**: Leverages existing SBS_Automation patterns for consistency
4. **Time Reduction**: Reduces test creation time from hours to minutes
5. **Quality Assurance**: Ensures consistent structure and best practices
6. **Flexibility**: Supports multiple input sources and formats

---

## Architecture & Design

```
Auto-Coder-Framework Architecture

┌─────────────────────────────────────────────────────────────┐
│                    Input Sources                            │
├─────────────┬─────────────┬─────────────┬─────────────────────┤
│ Text Files  │ Images      │ cURL        │ JIRA/Confluence    │
│ (.txt,.md)  │ (.png,.jpg) │ Requests    │ Pages/Stories      │
└─────────────┴─────────────┴─────────────┴─────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│               Intelligent Parser                            │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│  │ NLP Engine  │ Image OCR   │ API Parser  │ Content     │   │
│  │             │ Extraction  │             │ Extractor   │   │
│  └─────────────┴─────────────┴─────────────┴─────────────┘   │
└─────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│              Pattern Extraction Engine                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │           SBS_Automation Pattern Library               │ │
│  │  • Feature Templates  • Step Patterns                 │ │
│  │  • Page Objects       • Test Structures               │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│               Artifact Generator                            │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│  │ Feature     │ Step        │ Page Object │ Test        │   │
│  │ Generator   │ Generator   │ Generator   │ Generator   │   │
│  └─────────────┴─────────────┴─────────────┴─────────────┘   │
└─────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                Generated Artifacts                          │
├─────────────┬─────────────┬─────────────┬─────────────────────┤
│ .feature    │ -steps.js   │ -page.js    │ -test.js           │
│ Files       │ Files       │ Files       │ Files              │
└─────────────┴─────────────┴─────────────┴─────────────────────┘
```

---

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git (for version control)

### Installation Steps

1. **Clone the Repository**

```bash
git clone <repository-url>
cd auto-coder-framework
```

2. **Install Dependencies**

```bash
npm install
```

3. **Verify Installation**

```bash
./auto-coder.sh help
```

4. **Setup Input Directories**

```bash
mkdir -p input/{text,images,curl,jira,confluence,design}
```

---

## How to Use Auto-Coder-Framework

### Command Line Interface

The framework provides a simple command-line interface through the `auto-coder.sh` script:

```bash
# General syntax
./auto-coder.sh <command> [parameters]

# Available commands
./auto-coder.sh generate <input_file>    # Generate test artifacts
./auto-coder.sh run <test_file>          # Run generated tests
./auto-coder.sh interactive              # Launch interactive CLI
./auto-coder.sh help                     # Show help information
```

### Agent Prompt System

For advanced usage, you can use agent prompts to communicate with the framework:

**Generate Test Artifacts:**

```markdown
/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /path/to/your/requirement/file.txt
SPECIAL_INSTRUCTIONS: Any specific requirements
```

**Run Test Artifacts:**

```markdown
/run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /path/to/generated/test/file.feature
EXECUTION_OPTIONS:

- browser: chrome
- headless: false
```

---

## Generating Test Artifacts

### Supported Input Sources

#### 1. Text Files (.txt, .md)

```bash
./auto-coder.sh generate input/text/user-story.txt
```

#### 2. Image Files (.png, .jpg, .jpeg, .gif)

```bash
./auto-coder.sh generate input/images/wireframe.png
```

#### 3. cURL API Requests

```bash
./auto-coder.sh generate input/curl/api-endpoint.txt
```

#### 4. JIRA Items (Stories, Epics, Tasks, Bugs)

```bash
./auto-coder.sh generate input/jira/epic-123.txt
```

#### 5. Confluence Pages

```bash
./auto-coder.sh generate input/confluence/requirements-page.txt
```

#### 6. UX Design Files (Figma, Adobe XD, Sketch)

```bash
./auto-coder.sh generate input/design/mockup.fig
```

### Generation Process

1. **Input Analysis**: Framework analyzes the input source
2. **Requirement Extraction**: Identifies key requirements and scenarios
3. **Pattern Matching**: Maps requirements to SBS_Automation patterns
4. **Artifact Creation**: Generates all necessary test components
5. **Validation**: Ensures generated code follows best practices
6. **Output**: Saves artifacts to `generated/` directory

### Generated Artifacts Structure

```
generated/
├── features/
│   └── requirement-name.feature
├── steps/
│   └── requirement-name-steps.js
├── pages/
│   └── requirement-name-page.js
├── tests/
│   └── requirement-name-test.js
└── summary/
    └── requirement-name.md
```

---

## Running Tests

### Basic Test Execution

```bash
# Run a specific test file
./auto-coder.sh run generated/tests/requirement-name-test.js

# Run all generated tests
npm run test

# Run with specific browser
BROWSER=chrome ./auto-coder.sh run generated/tests/requirement-name-test.js

# Run in headless mode
HEADLESS=true ./auto-coder.sh run generated/tests/requirement-name-test.js
```

### Advanced Test Execution

```bash
# Run with tags
TAGS='@smoke' npm run test

# Parallel execution
PARALLEL=2 npm run test

# Different browsers
BROWSER=firefox npm run test
BROWSER=webkit npm run test
```

### Expected Test Behavior

⚠️ **Important Note**: Generated tests are designed to fail initially because they use placeholder locators. This is intentional and expected behavior.

**Why Tests Fail:**

- Locators are placeholders (e.g., `//button[@id='placeholder-login-button']`)
- No real UI interactions are implemented yet
- Requires manual locator updates for actual applications

---

## Generating Reports

### Test Reports

The framework generates comprehensive test reports including:

1. **Cucumber HTML Reports**: Detailed step-by-step execution results
2. **JSON Reports**: Machine-readable test results
3. **Custom Reports**: Detailed analysis of failures and required actions

### Report Contents

- **Test Step Details**: Each step execution status
- **Assertion Results**: Pass/fail status with detailed messages
- **Error Analysis**: Specific locator failures and recommendations
- **Screenshots**: Visual evidence of test execution (when available)
- **Locator Information**: Which selectors need updating

### Accessing Reports

```bash
# Reports are generated in test-results/ directory
open test-results/cucumber-report.html
```

---

## Using with Real Applications

### Integration Steps

1. **Generate Initial Tests**: Create test artifacts from requirements
2. **Update Base Configuration**: Configure application URLs and settings
3. **Update Locators**: Replace placeholder selectors with real ones
4. **Add Authentication**: Implement login/logout procedures
5. **Validate Tests**: Run tests against real application

### Configuration Updates

Update `cucumber.config.json` with your application settings:

```json
{
  "baseUrl": "https://your-app.com",
  "timeout": 30000,
  "browser": "chrome",
  "headless": false,
  "screenshots": true
}
```

---

## Working with Real Locators

### Locator Update Process

#### 1. Identify Placeholder Locators

Generated page objects contain placeholder locators:

```javascript
// Generated placeholder (needs updating)
const LOGIN_BUTTON = By.xpath("//button[@id='placeholder-login-button']");

// Real locator (after update)
const LOGIN_BUTTON = By.xpath("//button[@data-testid='login-submit']");
```

#### 2. Update Page Objects

Replace placeholders with actual selectors from your application:

```javascript
// Before (placeholder)
const USERNAME_FIELD = By.xpath("//input[@placeholder='username-placeholder']");

// After (real locator)
const USERNAME_FIELD = By.css("input[name='username']");
```

#### 3. Locator Discovery Methods

**Browser DevTools:**

1. Right-click element → Inspect
2. Copy selector from Elements panel
3. Test selector in Console: `$('your-selector')`

**Recommended Selector Priority:**

1. `data-testid` attributes (most reliable)
2. `id` attributes (if stable)
3. `name` attributes (for form elements)
4. CSS classes (if specific to component)
5. XPath (as last resort)

#### 4. Validation Process

After updating locators:

```bash
# Test individual page object
node -e "const Page = require('./generated/pages/your-page.js'); console.log('Page loaded successfully');"

# Run specific feature
./auto-coder.sh run generated/features/your-feature.feature
```

---

## SBS_Automation Integration

### Framework Compatibility

Auto-Coder-Framework is designed for seamless integration with SBS_Automation:

#### 1. Pattern Matching

Generated code follows SBS_Automation conventions:

- Step definition structure
- Page object patterns
- Test organization
- Naming conventions

#### 2. Migration Process

```bash
# After generating and updating locators
cp generated/features/* /path/to/SBS_Automation/features/
cp generated/steps/* /path/to/SBS_Automation/steps/
cp generated/pages/* /path/to/SBS_Automation/pages/
```

#### 3. Base Class Integration

Generated page objects extend SBS_Automation's BasePage:

```javascript
const BasePage = require("../common/base-page");

class YourPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }
  // ... methods
}
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. Module Not Found Errors

**Problem**: `Cannot find module '../common/base-page'`

**Solution**:

```bash
# Ensure base-page exists in correct location
cp support/base-page.js support/common/base-page.js
```

#### 2. Test Failures (Expected)

**Problem**: All tests fail with locator errors

**Solution**: This is expected behavior. Update locators as described in "Working with Real Locators" section.

#### 3. Generation Errors

**Problem**: Artifact generation fails

**Solutions**:

- Check input file format and content
- Verify file permissions
- Ensure output directories exist
- Review error logs for specific issues

#### 4. CLI Issues

**Problem**: Interactive CLI behaves unexpectedly

**Solution**:

```bash
# Use stable CLI version
node stable-interactive-cli.js
```

---

## Best Practices

### 1. Input Preparation

**Text Requirements:**

- Use clear, structured language
- Include specific user actions and expected outcomes
- Provide detailed acceptance criteria
- Use consistent terminology

**Image Requirements:**

- High resolution screenshots or wireframes
- Clear UI element visibility
- Annotated mockups when possible

### 2. Locator Strategy

**Best Practices:**

- Use `data-testid` attributes for test stability
- Avoid fragile selectors (like index-based XPath)
- Create reusable locator patterns
- Document locator update requirements

### 3. Test Organization

**Recommended Structure:**

```
tests/
├── smoke/          # Critical path tests
├── regression/     # Full feature coverage
├── integration/    # Cross-feature tests
└── api/           # API-specific tests
```

### 4. Maintenance

**Regular Tasks:**

- Update locators when UI changes
- Refresh test data periodically
- Review and update test scenarios
- Monitor test execution performance

---

## Advanced Usage Examples

### Example 1: Complete Workflow

```bash
# 1. Generate from JIRA story
./auto-coder.sh generate input/jira/user-login-story.txt

# 2. Review generated artifacts
ls generated/

# 3. Update locators in page object
vim generated/pages/user-login-page.js

# 4. Run tests
./auto-coder.sh run generated/tests/user-login-test.js

# 5. Review reports
open test-results/cucumber-report.html
```

### Example 2: Multi-Input Generation

```bash
# Generate from multiple sources
./auto-coder.sh generate input/text/requirements.txt
./auto-coder.sh generate input/images/wireframe.png
./auto-coder.sh generate input/jira/epic-story.txt

# Combine and organize results
mkdir -p organized-tests/feature-x/
cp generated/features/requirements.feature organized-tests/feature-x/
cp generated/features/wireframe.feature organized-tests/feature-x/
cp generated/features/epic-story.feature organized-tests/feature-x/
```

---

## Conclusion

Auto-Coder-Framework provides a powerful, intelligent solution for automated test artifact generation. By leveraging existing SBS_Automation patterns and supporting multiple input sources, it significantly reduces the time and effort required to create comprehensive test suites.

### Key Benefits:

- **Time Savings**: Reduce test creation time by 70-80%
- **Consistency**: Ensure all tests follow established patterns
- **Flexibility**: Support for diverse requirement sources
- **Quality**: Built-in validation and best practices
- **Integration**: Seamless compatibility with existing frameworks

### Next Steps:

1. Set up the framework in your environment
2. Generate your first test artifacts
3. Update locators for your application
4. Integrate with your existing test suite
5. Scale across your project requirements

For additional support and advanced configurations, refer to the generated documentation and example files in the `docs/` directory.
