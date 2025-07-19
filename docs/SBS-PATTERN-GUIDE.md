# SBS Automation Pattern Generator

This guide explains how to use the `generate-sbs-pattern.sh` script to generate test artifacts that follow the SBS_Automation framework pattern.

## Overview

The `generate-sbs-pattern.sh` script generates test artifacts that match the SBS_Automation framework pattern, ensuring compatibility between auto-coder-framework and SBS_Automation. This script can be used to generate new artifacts or update existing ones to match the SBS_Automation pattern.

## Usage

### Generate SBS-compatible Test Artifacts

```bash
./generate-sbs-pattern.sh [base-name]
```

Example:
```bash
./generate-sbs-pattern.sh jira-story-workers-comp
```

This will generate:
- Page object: `generated/pages/jira-story-workers-comp-page.js`
- Steps file: `generated/steps/jira-story-workers-comp-steps.js`
- Feature file: `generated/features/jira-story-workers-comp.feature`
- Test file: `generated/tests/jira-story-workers-comp-test.js`

### Key Features

1. **SBS-compatible Page Objects**:
   - Locators defined at the top level
   - Class properly extends BasePage
   - Proper camelCase naming convention for hyphenated base names

2. **SBS-compatible Step Files**:
   - Proper timeout constants (240s)
   - Assertions using chai assert
   - No Before hooks, try/catch blocks, or console.logs

3. **SBS-compatible Feature Files**:
   - Standard Gherkin syntax
   - Background section for common setup steps

4. **SBS-compatible Test Files**:
   - Clean test structure
   - Proper variable naming conventions

## Integration with auto-coder

To integrate with the auto-coder workflow, you can:

1. Add the following to your auto-coder.sh script:
```bash
# Generate SBS-compatible artifacts
./generate-sbs-pattern.sh $BASE_NAME
```

2. Update package.json with convenience scripts:
```json
"scripts": {
  "generate-sbs": "bash generate-sbs-pattern.sh"
}
```

## SBS Automation Pattern Requirements

The SBS_Automation pattern follows these conventions:

1. **Page Objects**:
   - Element locators defined at the top level (constants)
   - Class extends BasePage
   - No try/catch blocks or console.logs
   - Methods return values for assertions

2. **Step Files**:
   - Timeout constants (TIMEOUT = 240 * 1000)
   - chai assert statements instead of expect
   - No Before hooks or try/catch blocks
   - Clean step definitions

## Troubleshooting

If you encounter issues:

1. Make sure the script is executable:
   ```bash
   chmod +x generate-sbs-pattern.sh
   ```

2. Verify the `generated/` directory exists or can be created

3. Check for proper path references in the generated files
