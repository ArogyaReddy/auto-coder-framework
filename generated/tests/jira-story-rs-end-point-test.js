const { test } = require('../../support/test-fixtures');
const { expect } = require('@playwright/test');

test.describe('RS Endpoint Employee Type Management Tests', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        // Page is already authenticated and at the application URL
        // Wait for application to be ready
        await authenticatedPage.waitForLoadState('networkidle');
        
        // Try to ensure system is ready (expected to fail with placeholder locators)
        try {
            await authenticatedPage.waitForSelector('[data-testid="system-ready-indicator"]', { timeout: 5000 });
        } catch (error) {
            // Expected to fail - placeholder locator needs to be updated with real selectors
            console.log('Expected failure: Placeholder locator needs updating with real application selectors');
        }
    });

    test('should create employee with unknown type from Driver\'s License', async ({ authenticatedPage: page }) => {
        // Arrange: Set up feature flags and prepare extraction
        await page.click('[data-testid="enableWorkerCreationWithoutType-toggle"]');
        await page.click('[data-testid="drivers-license-upload"]');
        
        // Act: Process extraction with unknown type
        await page.click('[data-testid="process-extraction-btn"]');
        
        // Assert: Verify typeless creation
        await expect(page.locator('[data-testid="runservices-endpoint-used"]')).toBeVisible();
        await expect(page.locator('[data-testid="employee-type-display"]')).toContainText('Undefined');
        
        const logPanel = page.locator('[data-testid="system-logs-panel"]');
        await expect(logPanel).toContainText('typeless employee creation');
    });

    test('should convert W2 employee to contractor in EE app', async ({ authenticatedPage: page }) => {
        // Arrange: Create W2 employee
        await page.selectOption('[data-testid="employee-type-selector"]', 'w2-employee');
        await page.click('[data-testid="create-employee-btn"]');
        await page.waitForSelector('[data-testid="w2-employee-created"]');
        
        // Act: Navigate to EE app and convert type
        await page.click('[data-testid="ee-app-link"]');
        await page.click('[data-testid="type-conversion-btn"]');
        await page.click('[data-testid="contractor-type-option"]');
        await page.click('[data-testid="confirm-conversion-btn"]');
        
        // Assert: Verify conversion
        await expect(page.locator('[data-testid="employee-type-display"]')).toContainText('Contractor');
        await expect(page.locator('[data-testid="employee-status-badge"]')).toContainText('Contractor');
        
        // Verify audit trail
        await page.click('[data-testid="audit-trail-tab"]');
        await expect(page.locator('[data-testid="audit-trail-content"]')).toContainText('Type conversion:');
    });

    test('should convert contractor to W2 employee in EE app', async ({ authenticatedPage: page }) => {
        // Arrange: Create contractor
        await page.selectOption('[data-testid="employee-type-selector"]', 'contractor');
        await page.click('[data-testid="create-employee-btn"]');
        await page.waitForSelector('[data-testid="contractor-created"]');
        
        // Act: Navigate to EE app and convert type
        await page.click('[data-testid="ee-app-link"]');
        await page.click('[data-testid="type-conversion-btn"]');
        await page.click('[data-testid="w2-employee-type-option"]');
        await page.click('[data-testid="confirm-conversion-btn"]');
        
        // Assert: Verify conversion
        await expect(page.locator('[data-testid="employee-type-display"]')).toContainText('W2 Employee');
        await expect(page.locator('[data-testid="employee-status-badge"]')).toContainText('W2 Employee');
        
        // Verify audit trail
        await page.click('[data-testid="audit-trail-tab"]');
        await expect(page.locator('[data-testid="audit-trail-content"]')).toContainText('Type conversion:');
    });

    test('should activate typeless creation workflow when feature flag enabled', async ({ authenticatedPage: page }) => {
        // Arrange: Enable feature flag
        await page.click('[data-testid="enableWorkerCreationWithoutType-toggle"]');
        
        // Act: Process unknown type extraction
        await page.click('[data-testid="unknown-type-extraction-btn"]');
        await page.click('[data-testid="evaluate-extraction-btn"]');
        
        // Assert: Verify workflow activation
        const workflowStatus = page.locator('[data-testid="workflow-status"]');
        await expect(workflowStatus).toContainText('Typeless creation workflow: Active');
        
        await expect(page.locator('[data-testid="runservices-employee-endpoint"]')).toBeVisible();
    });

    test('should prevent employee type setting when enableWorkerCreationForGenStruct enabled', async ({ authenticatedPage: page }) => {
        // Arrange: Enable feature flag
        await page.click('[data-testid="enableWorkerCreationForGenStruct-toggle"]');
        
        // Act: Process Driver's License in doc extraction service
        await page.click('[data-testid="process-drivers-license-btn"]');
        
        // Assert: Verify type not set by service
        const serviceLog = page.locator('[data-testid="service-doc-extraction-log"]');
        await expect(serviceLog).toContainText('Employee type not set by service');
        
        const extractionStatus = page.locator('[data-testid="extraction-status"]');
        await expect(extractionStatus).toContainText('Proceeded without type assignment');
    });

    test('should validate schema mapping to runservices_employee endpoint', async ({ authenticatedPage: page }) => {
        // Arrange: Prepare typeless extraction data
        await page.fill('[data-testid="personal-info-name"]', 'John Doe');
        await page.fill('[data-testid="document-detail-license"]', 'DL123456789');
        
        // Act: Map data to endpoint
        await page.click('[data-testid="map-data-btn"]');
        
        // Assert: Verify schema conformance
        const schemaValidation = page.locator('[data-testid="schema-validation-result"]');
        await expect(schemaValidation).toContainText('Schema validation: PASSED');
        
        const requiredFields = page.locator('[data-testid="required-fields-status"]');
        await expect(requiredFields).toContainText('All required fields mapped');
        
        const optionalFields = page.locator('[data-testid="optional-fields-status"]');
        await expect(optionalFields).toContainText('Optional fields handled appropriately');
    });

    test('should handle runservices_employee endpoint failure gracefully', async ({ authenticatedPage: page }) => {
        // Arrange: Make endpoint unavailable
        await page.click('[data-testid="disable-runservices-endpoint-btn"]');
        
        // Act: Attempt employee creation
        await page.click('[data-testid="create-employee-attempt-btn"]');
        
        // Assert: Verify error handling
        const errorLog = page.locator('[data-testid="error-log-panel"]');
        await expect(errorLog).toContainText('Endpoint unavailable error logged');
        
        const fallbackStatus = page.locator('[data-testid="fallback-processing-status"]');
        await expect(fallbackStatus).toContainText('Fallback processing attempted');
        
        await expect(page.locator('[data-testid="user-notification-panel"]')).toBeVisible();
    });

    test('should handle concurrent type conversion attempts', async ({ authenticatedPage: page }) => {
        // Arrange: Create employee and initiate concurrent conversions
        await page.click('[data-testid="create-test-employee-btn"]');
        await page.click('[data-testid="start-concurrent-conversions-btn"]');
        
        // Act: Process concurrent operations
        await page.click('[data-testid="process-concurrent-operations-btn"]');
        
        // Assert: Verify only one conversion succeeded
        const conversionCount = page.locator('[data-testid="successful-conversions-count"]');
        await expect(conversionCount).toContainText('1');
        
        const rejectionMessage = page.locator('[data-testid="rejection-message"]');
        await expect(rejectionMessage).toContainText('Concurrent conversion attempt rejected');
        
        const integrityStatus = page.locator('[data-testid="data-integrity-status"]');
        await expect(integrityStatus).toContainText('Data integrity: MAINTAINED');
    });

    test('should maintain comprehensive audit trail for type changes', async ({ authenticatedPage: page }) => {
        // Arrange: Create employee with conversion history
        await page.click('[data-testid="create-test-employee-btn"]');
        await page.click('[data-testid="add-conversion-history-btn"]');
        
        // Act: View audit trail
        await page.click('[data-testid="audit-trail-tab"]');
        
        // Assert: Verify audit trail completeness
        const auditEntries = await page.locator('[data-testid^="audit-entry-"]').count();
        expect(auditEntries).toBeGreaterThan(0);
        
        const firstEntry = page.locator('[data-testid="audit-entry-1"]');
        await expect(firstEntry).toContainText('Timestamp:');
        await expect(firstEntry).toContainText('User:');
        
        const creationMethod = page.locator('[data-testid="original-creation-method"]');
        await expect(creationMethod).toContainText('Original creation method preserved');
    });

    test('should maintain data integrity during type conversion', async ({ authenticatedPage: page }) => {
        // Arrange: Create employee with existing records
        await page.click('[data-testid="create-employee-with-records-btn"]');
        await page.waitForSelector('[data-testid="employee-records-created"]');
        
        // Act: Convert employee type
        await page.click('[data-testid="execute-conversion-btn"]');
        
        // Assert: Verify data integrity
        const consistencyStatus = page.locator('[data-testid="data-consistency-status"]');
        await expect(consistencyStatus).toContainText('Related data: CONSISTENT');
        
        const dependentRecords = page.locator('[data-testid="dependent-records-status"]');
        await expect(dependentRecords).toContainText('Dependent records updated appropriately');
        
        const corruptionCheck = page.locator('[data-testid="data-corruption-check"]');
        await expect(corruptionCheck).toContainText('No data corruption detected');
    });
});

test.describe('RS Endpoint Integration Tests', () => {
    test('should integrate with existing SBS_Automation framework', async ({ authenticatedPage: page }) => {
        // Use the same base URL as configured - should already be logged in via global setup
        await page.goto('/');
        
        // Verify framework integration (expected to fail with placeholder locators)
        await expect(page.locator('[data-testid="sbs-integration-status"]')).toContainText('Connected');
        
        // Test cross-system employee creation
        await page.click('[data-testid="cross-system-create-btn"]');
        
        await expect(page.locator('[data-testid="cross-system-success"]')).toBeVisible();
    });

    test('should support real locator updates for actual UI testing', async ({ authenticatedPage: page }) => {
        // This test demonstrates how to update placeholder locators for real UI testing
        // When connecting to actual application, update the data-testid selectors below
        
        // Example real locator updates:
        // Replace '[data-testid="employee-type-selector"]' with actual selector like:
        // '#employeeTypeDropdown' or '.employee-type-field select'
        
        console.log('LOCATOR UPDATE REQUIRED: Update placeholder selectors with actual UI elements');
        console.log('Expected failures until locators are updated with real application selectors');
        
        // This will fail until real locators are provided
        await expect(page.locator('REAL_SELECTOR_NEEDED')).toBeVisible();
    });
});
