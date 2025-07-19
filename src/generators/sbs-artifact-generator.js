/**
 * FIXED: SBS-Aware Artifact Generator
 * This replaces the broken generic template system with requirement-aware generation
 */

const path = require('path');
const fs = require('fs-extra');
const Handlebars = require('handlebars');

class SBSArtifactGenerator {
    constructor() {
        this.sbsPatterns = null;
        this.sbsVocabulary = null;
    }

    async initialize() {
        // Load SBS patterns and vocabulary
        try {
            this.sbsPatterns = {
                features: await fs.readJSON('./knowledge-base/patterns/features.json'),
                steps: await fs.readJSON('./knowledge-base/patterns/steps.json'),
                pages: await fs.readJSON('./knowledge-base/patterns/pages.json')
            };
            
            this.sbsVocabulary = {
                roles: await fs.readJSON('./knowledge-base/vocabulary/roles.json'),
                actions: await fs.readJSON('./knowledge-base/vocabulary/actions.json'),
                entities: await fs.readJSON('./knowledge-base/vocabulary/entities.json')
            };
            
            console.log('✅ SBS patterns and vocabulary loaded');
        } catch (error) {
            console.log('⚠️ Using fallback patterns');
        }
    }

    /**
     * Generate artifacts based on requirement file
     */
    async generateArtifacts(requirementFile, outputDir) {
        const requirementText = await fs.readFile(requirementFile, 'utf8');
        const baseName = path.basename(requirementFile, path.extname(requirementFile));
        
        // Analyze requirement content
        const analysis = this.analyzeRequirement(requirementText);
        
        // Generate context for templates
        const context = this.buildContext(analysis, baseName, requirementText);
        
        // Generate artifacts
        const artifacts = {
            feature: this.generateFeatureFile(context),
            steps: this.generateStepDefinitions(context),
            page: this.generatePageObject(context)
        };
        
        // Save with proper naming
        await fs.ensureDir(outputDir);
        
        const files = {
            feature: path.join(outputDir, `${baseName}.feature`),
            steps: path.join(outputDir, `${baseName}-steps.js`),
            page: path.join(outputDir, `${baseName}-page.js`)
        };
        
        await fs.writeFile(files.feature, artifacts.feature);
        await fs.writeFile(files.steps, artifacts.steps);
        await fs.writeFile(files.page, artifacts.page);
        
        return { artifacts, files };
    }

    /**
     * Analyze requirement text to extract key information
     */
    analyzeRequirement(text) {
        const analysis = {
            featureName: this.extractFeatureName(text),
            domain: this.extractDomain(text),
            scenarios: this.extractScenarios(text),
            entities: this.extractEntities(text),
            actions: this.extractActions(text),
            roles: this.extractRoles(text),
            featureFlags: this.extractFeatureFlags(text),
            acceptanceCriteria: this.extractAcceptanceCriteria(text)
        };
        
        return analysis;
    }

    extractFeatureName(text) {
        // Extract feature name from first line or key phrases
        const firstLine = text.split('\n')[0].trim();
        
        // Look for key phrases that indicate the feature
        if (text.includes('Workers\' comp') && text.includes('Additional requirements')) {
            return 'Workers Comp Additional Requirements Step';
        }
        
        if (text.includes('CFC') && text.includes('landing')) {
            return 'CFC Landing Page Access';
        }
        
        // Fallback to first line
        return firstLine.length > 5 ? firstLine : 'Feature Implementation';
    }

    extractDomain(text) {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('tax') || lowerText.includes('payroll')) return 'tax';
        if (lowerText.includes('cfc') || lowerText.includes('cashflow')) return 'financial';
        if (lowerText.includes('employee') || lowerText.includes('hr')) return 'hr';
        if (lowerText.includes('client') || lowerText.includes('user')) return 'client';
        
        return 'application';
    }

    extractScenarios(text) {
        const scenarios = [];
        const acceptanceCriteria = text.match(/Acceptance criteria?:([\s\S]*?)(?=\n\n|$)/i);
        
        if (acceptanceCriteria) {
            const criteria = acceptanceCriteria[1];
            const lines = criteria.split('\n').filter(line => line.trim());
            
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine && !trimmedLine.includes(':') && trimmedLine.length > 10) {
                    scenarios.push({
                        name: this.generateScenarioName(trimmedLine),
                        description: trimmedLine,
                        originalText: trimmedLine
                    });
                }
            });
        }
        
        // Add feature flag scenarios if present
        const featureFlags = this.extractFeatureFlags(text);
        if (featureFlags.length > 0) {
            scenarios.push({
                name: 'Feature flag enabled behavior',
                description: 'Verify behavior when feature flag is enabled',
                tags: ['@feature-flag'],
                featureFlag: featureFlags[0]
            });
            
            scenarios.push({
                name: 'Feature flag disabled behavior', 
                description: 'Verify behavior when feature flag is disabled',
                tags: ['@legacy-behavior'],
                featureFlag: featureFlags[0]
            });
        }
        
        return scenarios;
    }

    generateScenarioName(description) {
        // Convert description to scenario name
        return description
            .replace(/^(When|If|With)\\s+/i, '')
            .replace(/\\s+/g, ' ')
            .trim()
            .toLowerCase()
            .replace(/^\\w/, c => c.toUpperCase());
    }

    extractFeatureFlags(text) {
        const flags = [];
        const flagMatches = text.match(/FF:\s*([^\n]+)/g);
        
        if (flagMatches) {
            flagMatches.forEach(match => {
                const flag = match.replace(/FF:\s*/, '').trim();
                flags.push(flag);
            });
        }
        
        return flags;
    }

    extractAcceptanceCriteria(text) {
        const criteriaMatch = text.match(/Acceptance criteria?:([\s\S]*?)(?=\n\n|$)/i);
        
        if (criteriaMatch) {
            return criteriaMatch[1]
                .split('\n')
                .filter(line => line.trim())
                .map(line => line.trim());
        }
        
        return [];
    }

    extractEntities(text) {
        const entities = new Set();
        const lowerText = text.toLowerCase();
        
        // SBS-specific entities
        if (this.sbsVocabulary?.entities) {
            this.sbsVocabulary.entities.forEach(entity => {
                if (lowerText.includes(entity.toLowerCase())) {
                    entities.add(entity);
                }
            });
        }
        
        // Common entities
        const commonEntities = ['page', 'step', 'button', 'form', 'menu', 'user', 'client', 'comp', 'requirement'];
        commonEntities.forEach(entity => {
            if (lowerText.includes(entity)) {
                entities.add(entity);
            }
        });
        
        return Array.from(entities);
    }

    extractActions(text) {
        const actions = new Set();
        const lowerText = text.toLowerCase();
        
        // SBS-specific actions
        if (this.sbsVocabulary?.actions) {
            this.sbsVocabulary.actions.forEach(action => {
                if (lowerText.includes(action.toLowerCase())) {
                    actions.add(action);
                }
            });
        }
        
        // Common actions
        const commonActions = ['access', 'navigate', 'show', 'hide', 'move', 'add', 'configure', 'view'];
        commonActions.forEach(action => {
            if (lowerText.includes(action)) {
                actions.add(action);
            }
        });
        
        return Array.from(actions);
    }

    extractRoles(text) {
        const roles = new Set();
        const lowerText = text.toLowerCase();
        
        // SBS-specific roles
        if (this.sbsVocabulary?.roles) {
            this.sbsVocabulary.roles.forEach(role => {
                if (lowerText.includes(role.toLowerCase())) {
                    roles.add(role);
                }
            });
        }
        
        // Common roles
        const commonRoles = ['user', 'client', 'admin', 'professional', 'employee'];
        commonRoles.forEach(role => {
            if (lowerText.includes(role)) {
                roles.add(role);
            }
        });
        
        return Array.from(roles);
    }

    buildContext(analysis, baseName, requirementText) {
        return {
            featureName: analysis.featureName,
            baseName: baseName,
            domain: analysis.domain,
            primaryRole: analysis.roles[0] || 'user',
            primaryAction: analysis.actions[0] || 'access',
            primaryEntity: analysis.entities[0] || 'system',
            scenarios: analysis.scenarios,
            featureFlags: analysis.featureFlags,
            acceptanceCriteria: analysis.acceptanceCriteria,
            requirementText: requirementText,
            className: this.toPascalCase(baseName),
            timestamp: new Date().toISOString()
        };
    }

    toPascalCase(str) {
        return str
            .split(/[-_\\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }

    /**
     * Generate feature file based on actual requirement content
     */
    generateFeatureFile(context) {
        let featureContent = `Feature: ${context.featureName}\n`;
        featureContent += `  As a ${context.primaryRole}\n`;
        featureContent += `  I want to ${context.primaryAction} ${context.primaryEntity}\n`;
        featureContent += `  So that I can achieve the business requirements\n\n`;
        
        // Add background if needed
        featureContent += `  Background:\n`;
        featureContent += `    Given I am on the ${context.domain} page\n`;
        featureContent += `    And the system is properly configured\n\n`;
        
        // Generate scenarios based on acceptance criteria
        if (context.scenarios.length > 0) {
            context.scenarios.forEach((scenario, index) => {
                if (scenario.tags) {
                    featureContent += `  ${scenario.tags.join(' ')}\n`;
                }
                featureContent += `  Scenario: ${scenario.name}\n`;
                
                // Generate scenario steps based on description
                const steps = this.generateScenarioSteps(scenario, context);
                steps.forEach(step => {
                    featureContent += `    ${step}\n`;
                });
                
                if (index < context.scenarios.length - 1) {
                    featureContent += `\n`;
                }
            });
        } else {
            // Fallback scenario
            featureContent += `  Scenario: ${context.featureName} implementation\n`;
            featureContent += `    When I ${context.primaryAction} the ${context.primaryEntity}\n`;
            featureContent += `    Then the system should respond appropriately\n`;
            featureContent += `    And I should see the expected results\n`;
        }
        
        return featureContent;
    }

    generateScenarioSteps(scenario, context) {
        const steps = [];
        
        // Feature flag scenarios
        if (scenario.tags?.includes('@feature-flag')) {
            if (context.featureFlags.length > 0) {
                steps.push(`Given the feature flag "${context.featureFlags[0]}" is enabled`);
            }
        }
        
        if (scenario.tags?.includes('@legacy-behavior')) {
            if (context.featureFlags.length > 0) {
                steps.push(`Given the feature flag "${context.featureFlags[0]}" is disabled`);
            }
        }
        
        // Add context-specific steps
        if (scenario.description.includes('show') || scenario.description.includes('visible')) {
            steps.push(`When I navigate to the relevant section`);
            steps.push(`Then the element should be visible`);
        }
        
        if (scenario.description.includes('hide') || scenario.description.includes('not show')) {
            steps.push(`When I navigate to the relevant section`);
            steps.push(`Then the element should not be visible`);
        }
        
        // Default steps if none generated
        if (steps.length === 0) {
            steps.push(`When I perform the required action`);
            steps.push(`Then the system should behave as expected`);
        }
        
        return steps;
    }

    /**
     * Generate step definitions with proper SBS patterns
     */
    generateStepDefinitions(context) {
        return `const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ${context.className}Page = require('../pages/${context.baseName}-page');

// Page object instance
const ${context.baseName.replace(/-/g, '')}Page = new ${context.className}Page(this.page);

// Background steps
Given('I am on the {word} page', async function (pageType) {
  await ${context.baseName.replace(/-/g, '')}Page.navigateToPage(pageType);
  await ${context.baseName.replace(/-/g, '')}Page.waitForPageLoad();
});

Given('the system is properly configured', async function () {
  await ${context.baseName.replace(/-/g, '')}Page.ensureSystemConfiguration();
});

${context.featureFlags.length > 0 ? `
// Feature flag steps
Given('the feature flag {string} is enabled', async function (flagName) {
  await ${context.baseName.replace(/-/g, '')}Page.enableFeatureFlag(flagName);
});

Given('the feature flag {string} is disabled', async function (flagName) {
  await ${context.baseName.replace(/-/g, '')}Page.disableFeatureFlag(flagName);
});
` : ''}

// Action steps
When('I navigate to the relevant section', async function () {
  await ${context.baseName.replace(/-/g, '')}Page.navigateToRelevantSection();
});

When('I perform the required action', async function () {
  await ${context.baseName.replace(/-/g, '')}Page.performRequiredAction();
});

// Verification steps
Then('the element should be visible', async function () {
  const isVisible = await ${context.baseName.replace(/-/g, '')}Page.isElementVisible();
  expect(isVisible).toBe(true);
});

Then('the element should not be visible', async function () {
  const isVisible = await ${context.baseName.replace(/-/g, '')}Page.isElementVisible();
  expect(isVisible).toBe(false);
});

Then('the system should behave as expected', async function () {
  const behaviorCorrect = await ${context.baseName.replace(/-/g, '')}Page.verifyExpectedBehavior();
  expect(behaviorCorrect).toBe(true);
});
`;
    }

    /**
     * Generate page object with proper SBS patterns
     */
    generatePageObject(context) {
        return `const helpers = require('../../support/helpers');
const By = require('../../support/By');

class ${context.className}Page {
  constructor(page) {
    this.page = page;
  }

  // Page locators following SBS patterns
  get mainContainer() {
    return this.page.locator('[data-testid="${context.baseName}-container"]');
  }

  get primaryElement() {
    return this.page.locator('[data-testid="${context.baseName}-primary"]');
  }

  // Navigation methods following SBS patterns
  async navigateToPage(pageType) {
    const url = this.getPageUrl(pageType);
    await helpers.retryGoto(this.page, url, { timeout: 30000 }, 2);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  getPageUrl(pageType) {
    const urls = {
      tax: '/tax',
      financial: '/financial',
      hr: '/hr',
      client: '/client',
      application: '/'
    };
    return urls[pageType] || '/';
  }

  // Configuration methods
  async ensureSystemConfiguration() {
    // Implement system configuration logic
    await this.waitForPageLoad();
  }

${context.featureFlags.length > 0 ? `
  // Feature flag methods
  async enableFeatureFlag(flagName) {
    // Implement feature flag enabling logic
    await this.page.evaluate((flag) => {
      window.featureFlags = window.featureFlags || {};
      window.featureFlags[flag] = true;
    }, flagName);
  }

  async disableFeatureFlag(flagName) {
    // Implement feature flag disabling logic
    await this.page.evaluate((flag) => {
      window.featureFlags = window.featureFlags || {};
      window.featureFlags[flag] = false;
    }, flagName);
  }
` : ''}

  // Action methods
  async navigateToRelevantSection() {
    await this.primaryElement.click();
    await this.waitForPageLoad();
  }

  async performRequiredAction() {
    // Implement the main action based on requirement
    await this.primaryElement.click();
  }

  // Verification methods following SBS patterns
  async isElementVisible() {
    try {
      await this.primaryElement.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyExpectedBehavior() {
    // Implement verification logic based on acceptance criteria
    return await this.isElementVisible();
  }
}

module.exports = ${context.className}Page;
`;
    }
}

module.exports = SBSArtifactGenerator;
