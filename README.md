# Auto-Coder

Intelligent test artifact generator that leverages SBS_Automation patterns to automatically create comprehensive test suites from various requirement sources.

## 🚀 Quick Start

```bash
# Generate test artifacts from a text requirement
./auto-coder.sh generate input/text/your-requirement.txt

# Run generated tests
./auto-coder.sh run generated/tests/your-requirement-test.js

# Launch interactive CLI
./auto-coder.sh interactive
```

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [How to Generate Test Artifacts](#how-to-generate-test-artifacts)
- [How to Run Tests](#how-to-run-tests)
- [How to Generate Reports](#how-to-generate-reports)
- [Using with Real Applications](#using-with-real-applications)
- [Working with Real Locators](#working-with-real-locators)
- [Supported Input Sources](#supported-input-sources)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

Auto-Coder bridges the gap between requirements and automated tests by intelligently generating test artifacts that follow established SBS_Automation patterns. Instead of manually creating feature files, step definitions, page objects, and tests, the framework analyzes your requirements and generates everything automatically.

### Why Auto-Coder?

- **Reduces Development Time**: Generate complete test suites in minutes instead of hours
- **Ensures Consistency**: All generated code follows SBS_Automation best practices
- **Supports Multiple Inputs**: Works with text, images, APIs, JIRA, Confluence, and design files
- **Real-World Ready**: Generated tests are designed to work with actual applications (with locator updates)
- **Seamless Integration**: Direct compatibility with existing SBS_Automation frameworks

## ✨ Features

- 🔄 **Multi-Input Support**: Text files, images, cURL requests, JIRA stories, Confluence pages, UX designs
- 🎭 **Complete Artifact Generation**: Features, steps, page objects, tests, and documentation
- 🔧 **SBS_Automation Patterns**: 100% compatible with existing framework structures
- 🎯 **Real Locator Integration**: Designed for actual UI testing (requires locator updates)
- 📊 **Comprehensive Reports**: Detailed test execution and failure analysis
- 🖥️ **Interactive CLI**: User-friendly command-line interface
- 📝 **Agent Prompts**: Structured communication system for advanced usage

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Steps

1. **Clone and Install**

```bash
git clone <repository-url>
cd auto-coder
npm install
```

2. **Verify Installation**

```bash
./auto-coder.sh help
```

3. **Create Input Directories**

```bash
mkdir -p input/{text,images,curl,jira,confluence,design}
```

## 📝 How to Generate Test Artifacts

### Command Line Generation

```bash
# Basic generation
./auto-coder.sh generate input/text/requirement.txt

# Using npm scripts
npm run generate:simple input/text/requirement.txt
```

### Agent Prompt Generation

Create or use the agent prompt file:

```markdown
## /generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/your-requirement.txt
SPECIAL_INSTRUCTIONS: Generate with focus on user authentication flows
```

### Supported Input Types

#### 1. Text Requirements (.txt, .md)

```bash
./auto-coder.sh generate input/text/user-story.txt
```

#### 2. Image Wireframes/Mockups (.png, .jpg, .gif)

```bash
./auto-coder.sh generate input/images/login-wireframe.png
```

#### 3. API Documentation (cURL)

```bash
./auto-coder.sh generate input/curl/api-endpoints.txt
```

#### 4. JIRA Items (Stories, Epics, Tasks, Bugs)

```bash
./auto-coder.sh generate input/jira/PROJ-123-user-login.txt
```

#### 5. Confluence Pages

```bash
./auto-coder.sh generate input/confluence/requirements-doc.txt
```

#### 6. UX Design Files (Figma, Adobe XD, Sketch)

```bash
./auto-coder.sh generate input/design/prototype.figma
```

### Generated Artifacts Structure

Each generation creates a complete test suite:

```
generated/
├── features/
│   └── your-requirement.feature          # Cucumber BDD scenarios
├── steps/
│   └── your-requirement-steps.js         # Step definitions
├── pages/
│   └── your-requirement-page.js          # Page object model
├── tests/
│   └── your-requirement-test.js          # Test execution file
└── summary/
    └── your-requirement-guide.md         # Documentation & guidance
```

## 🧪 How to Run Tests

### Basic Test Execution

```bash
# Run specific test
./auto-coder.sh run generated/tests/requirement-test.js

# Run all tests
npm run test

# Run with browser selection
BROWSER=chrome ./auto-coder.sh run generated/tests/requirement-test.js
BROWSER=firefox npm run test
```

### Advanced Test Options

```bash
# Headless execution
HEADLESS=true npm run test

# Parallel execution
PARALLEL=2 npm run test

# Run with tags
TAGS='@smoke' npm run test

# Run specific feature
npm run test:single generated/features/login.feature
```

### Agent Prompt Test Execution

```markdown
## /run-test-artifacts.prompt.md

TEST_TYPE: feature
TEST_TARGET: /Users/arog/framework/auto-coder/generated/features/login.feature
EXECUTION_OPTIONS:

- browser: chrome
- headless: false
- screenshot: true
```

### Expected Test Behavior

⚠️ **Important**: Generated tests are designed to fail initially because they use placeholder locators. This is intentional and indicates where real UI selectors need to be added.

**Initial Test Results:**

- ❌ Tests fail with locator errors
- 📝 Reports show which selectors need updating
- 🎯 Provides guidance for locator updates

## 📊 How to Generate Reports

### Automatic Report Generation

Every test run generates comprehensive reports:

```bash
# Reports are automatically created in test-results/
ls test-results/
# cucumber-report.html    - Visual HTML report
# cucumber-results.json   - Machine-readable results
# report.json            - Custom detailed report
```

### View Reports

```bash
# Open HTML report
open test-results/cucumber-report.html

# View JSON results
cat test-results/cucumber-results.json | jq .
```

### Report Contents

Reports include:

- **Step-by-Step Execution**: Detailed test step results
- **Failure Analysis**: Specific reasons for test failures
- **Locator Information**: Which selectors need updating
- **Screenshots**: Visual evidence (when available)
- **Performance Metrics**: Execution times and statistics
- **Recommendations**: Specific guidance for fixing issues

### Custom Reports

```bash
# Generate custom report format
npm run report:custom generated/tests/

# Generate summary report
npm run report:summary
```

## 🖥️ Using with Real Applications

### Integration Workflow

1. **Generate Initial Tests**

```bash
./auto-coder.sh generate input/text/login-requirements.txt
```

2. **Update Configuration**

```javascript
// Update cucumber.config.json
{
  "baseUrl": "https://your-app.com",
  "timeout": 30000,
  "browser": "chrome"
}
```

3. **Update Locators** (see next section)

4. **Run Against Real App**

```bash
./auto-coder.sh run generated/tests/login-test.js
```

### Environment Configuration

```bash
# Development environment
ENVIRONMENT=dev npm run test

# Staging environment
ENVIRONMENT=staging npm run test

# Production environment
ENVIRONMENT=prod npm run test
```

## 🎯 Working with Real Locators

### Understanding Placeholder Locators

Generated page objects contain placeholder selectors that need updating:

```javascript
// Generated placeholder (NEEDS UPDATING)
const LOGIN_BUTTON = By.xpath("//button[@id='placeholder-login-button']");

// Updated with real locator
const LOGIN_BUTTON = By.css("button[data-testid='login-submit']");
```

### Locator Update Process

#### 1. Identify Elements in Your Application

Use browser DevTools:

1. Right-click element → Inspect
2. Find stable attributes (`data-testid`, `id`, `name`)
3. Test selector: `$('your-selector')` in Console

#### 2. Update Page Object Files

```javascript
// Before (in generated/pages/login-page.js)
const USERNAME_INPUT = By.xpath("//input[@placeholder='username-placeholder']");
const PASSWORD_INPUT = By.xpath("//input[@placeholder='password-placeholder']");
const LOGIN_BUTTON = By.xpath("//button[@id='placeholder-login-button']");

// After (updated with real selectors)
const USERNAME_INPUT = By.css("input[name='username']");
const PASSWORD_INPUT = By.css("input[name='password']");
const LOGIN_BUTTON = By.css("button[data-testid='login-submit']");
```

#### 3. Recommended Selector Priority

1. **data-testid** attributes (most stable)

```javascript
By.css("[data-testid='login-button']");
```

2. **id** attributes (if stable)

```javascript
By.css("#login-submit");
```

3. **name** attributes (for forms)

```javascript
By.css("input[name='username']");
```

4. **CSS classes** (component-specific)

```javascript
By.css(".login-form__submit-button");
```

5. **XPath** (last resort)

```javascript
By.xpath("//button[contains(@class,'submit') and contains(text(),'Login')]");
```

#### 4. Validation After Updates

```bash
# Test updated page object
node -e "const LoginPage = require('./generated/pages/login-page.js'); console.log('✓ Page object loads successfully');"

# Run specific test
./auto-coder.sh run generated/tests/login-test.js
```

### Locator Update Tools

```bash
# Use interactive mode to test selectors
./auto-coder.sh interactive

# Validate all page objects
npm run validate:pages

# Test locator connectivity
npm run test:locators
```

## 📁 Supported Input Sources

### 1. Text Files

**Formats**: `.txt`, `.md`
**Best for**: User stories, requirements documents, acceptance criteria

**Example Input**:

```text
User Login Feature

As a user, I want to log into the application
So that I can access my dashboard

Acceptance Criteria:
- User enters username and password
- System validates credentials
- User is redirected to dashboard on success
- Error message shown on invalid credentials
```

### 2. Image Files

**Formats**: `.png`, `.jpg`, `.jpeg`, `.gif`
**Best for**: Wireframes, mockups, UI designs, screenshots

**Supported Image Types**:

- UI wireframes
- Application mockups
- Design prototypes
- Screenshot requirements

### 3. cURL API Requests

**Format**: Text files containing cURL commands
**Best for**: API testing, integration tests

**Example Input**:

```bash
curl -X POST https://api.example.com/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "pass"}'
```

### 4. JIRA Integration

**Supported Types**: Stories, Epics, Tasks, Bugs
**Format**: Exported JIRA content or structured text

**Example Structure**:

```text
JIRA Story: PROJ-123
Title: User Authentication
Type: Story
Priority: High

Description: Implement user login functionality...
Acceptance Criteria: [...]
```

### 5. Confluence Pages

**Format**: Exported content or structured documentation
**Best for**: Requirements specifications, process documentation

### 6. UX Design Files

**Formats**: `.figma`, `.xd`, `.sketch` (exported content)
**Best for**: Design specifications, user flows, prototypes

## 🏗️ Project Structure

```
auto-coder/
├── .github/                    # Agent prompt templates
│   ├── generate-test-artifacts.prompt.md
│   └── run-test-artifacts.prompt.md
├── src/                       # Core framework code
├── support/                   # Test support files
│   ├── base-page.js          # Base page object class
│   ├── helpers.js            # Utility functions
│   └── hooks.js              # Test hooks
├── templates/                # Generation templates
├── input/                    # Input source files
│   ├── text/                # Text requirements
│   ├── images/              # Image files
│   ├── curl/                # API requests
│   ├── jira/                # JIRA exports
│   ├── confluence/          # Confluence content
│   └── design/              # Design files
├── generated/               # Generated test artifacts
│   ├── features/           # Cucumber feature files
│   ├── steps/              # Step definitions
│   ├── pages/              # Page objects
│   ├── tests/              # Test files
│   └── summary/            # Documentation
├── test-results/           # Test execution reports
├── auto-coder.sh          # Main CLI script
├── index.js               # Framework entry point
├── package.json           # Dependencies and scripts
└── cucumber.config.json   # Test configuration
```

## ⚙️ Configuration

### Main Configuration (cucumber.config.json)

```json
{
  "baseUrl": "https://your-app.com",
  "timeout": 30000,
  "browser": "chrome",
  "headless": false,
  "screenshots": true,
  "retries": 1,
  "parallel": 1,
  "tags": "@smoke or @regression"
}
```

### Package.json Scripts

The framework includes predefined npm scripts:

```json
{
  "scripts": {
    "test": "node index.js",
    "test:headless": "HEADLESS=true node index.js",
    "test:chrome": "BROWSER=chrome node index.js",
    "test:firefox": "BROWSER=firefox node index.js",
    "test:parallel": "PARALLEL=2 node index.js",
    "test:tags": "TAGS='@smoke' node index.js"
  }
}
```

## 💡 Examples

### Complete Workflow Example

```bash
# 1. Create requirement file
echo "User Login: User enters credentials and accesses dashboard" > input/text/login.txt

# 2. Generate test artifacts
./auto-coder.sh generate input/text/login.txt

# 3. Review generated files
ls generated/features/  # login.feature
ls generated/pages/     # login-page.js
ls generated/steps/     # login-steps.js

# 4. Update locators in page object
vim generated/pages/login-page.js

# 5. Run tests
./auto-coder.sh run generated/tests/login-test.js

# 6. View results
open test-results/cucumber-report.html
```

### Agent Prompt Example

```markdown
## Generate E-commerce Tests

/generate-test-artifacts.prompt.md

INPUT_SOURCE_TYPE: text
INPUT_FILE_PATH: /Users/arog/framework/auto-coder/input/text/ecommerce-checkout.txt
SPECIAL_INSTRUCTIONS: Focus on payment flow validation and error handling
```

### Multi-Source Generation

```bash
# Generate from different input types
./auto-coder.sh generate input/text/requirements.txt
./auto-coder.sh generate input/images/wireframe.png
./auto-coder.sh generate input/jira/story-456.txt

# Organize results
mkdir project-tests/
cp generated/features/*.feature project-tests/
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Module Not Found Errors

```bash
# Error: Cannot find module '../common/base-page'
# Solution: Ensure base-page.js exists in support/common/
cp support/base-page.js support/common/base-page.js
```

#### 2. Test Failures (Expected Behavior)

```bash
# Error: Element not found - //button[@id='placeholder-login']
# Solution: This is expected. Update locators in page objects.
```

#### 3. Generation Failures

```bash
# Check input file format
cat input/text/your-file.txt

# Verify permissions
chmod 644 input/text/your-file.txt

# Check output directory
ls -la generated/
```

#### 4. CLI Issues

```bash
# Reset CLI
rm -rf .auto-coder/cache/
./auto-coder.sh help
```

### Debug Mode

```bash
# Run with debug output
DEBUG=true ./auto-coder.sh generate input/text/test.txt

# Verbose logging
VERBOSE=true npm run test
```

### Getting Help

```bash
# Show available commands
./auto-coder.sh help

# Check framework status
./auto-coder.sh status

# Validate setup
./auto-coder.sh validate
```

## 📚 Documentation

- **Complete Guide**: [All-About-Auto-Coder.md](./All-About-Auto-Coder.md)
- **Agent Prompts**: [.github/](.github/)
- **Examples**: [input/](input/) directory
- **Templates**: [templates/](templates/) directory

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Ready to get started?**

```bash
./auto-coder.sh generate input/text/your-first-requirement.txt
```

For detailed information, see [All-About-Auto-Coder.md](./All-About-Auto-Coder.md)
