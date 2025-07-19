const By = require('../../support/By');
const helpers = require('../../support/helpers');
let BasePage = require('../common/base-page');

// Locators for RS Endpoint functionality
const FEATURE_FLAG_PANEL = By.xpath('//div[@data-testid="feature-flag-panel"]');
const RUNSERVICES_EMPLOYEE_ENDPOINT = By.xpath('//div[@data-testid="runservices-employee-endpoint"]');
const EE_APP_CONTAINER = By.xpath('//div[@data-testid="ee-app-container"]');
const DRIVERS_LICENSE_EXTRACTION = By.xpath('//input[@data-testid="drivers-license-upload"]');
const EMPLOYEE_TYPE_FIELD = By.xpath('//select[@data-testid="employee-type-selector"]');
const W2_EMPLOYEE_OPTION = By.xpath('//option[@value="w2-employee"]');
const CONTRACTOR_OPTION = By.xpath('//option[@value="contractor"]');
const TYPE_CONVERSION_BUTTON = By.xpath('//button[@data-testid="type-conversion-btn"]');
const CONFIRM_CONVERSION_BUTTON = By.xpath('//button[@data-testid="confirm-conversion-btn"]');
const EMPLOYEE_DETAILS_PANEL = By.xpath('//div[@data-testid="employee-details-panel"]');
const AUDIT_TRAIL_TAB = By.xpath('//tab[@data-testid="audit-trail-tab"]');
const SYSTEM_LOGS_PANEL = By.xpath('//div[@data-testid="system-logs-panel"]');
const ERROR_MESSAGE_CONTAINER = By.xpath('//div[@data-testid="error-message-container"]');
const EXTRACTION_DATA_FORM = By.xpath('//form[@data-testid="extraction-data-form"]');
const SCHEMA_VALIDATION_STATUS = By.xpath('//div[@data-testid="schema-validation-status"]');

class RSEndPointPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async isSystemConfiguredWithFeatureFlags() {
        await this.page.waitForSelector('[data-testid="feature-flag-panel"]');
        return await this.page.isVisible('[data-testid="feature-flag-panel"]');
    }

    async isRunservicesEmployeeEndpointAvailable() {
        await this.page.waitForSelector('[data-testid="runservices-employee-endpoint"]');
        return await this.page.isVisible('[data-testid="runservices-employee-endpoint"]');
    }

    async isEEAppAccessible() {
        await this.page.waitForSelector('[data-testid="ee-app-container"]');
        return await this.page.isVisible('[data-testid="ee-app-container"]');
    }

    async createDriversLicenseExtraction() {
        await this.page.waitForSelector('[data-testid="drivers-license-upload"]');
        await this.page.click('[data-testid="drivers-license-upload"]');
        await this.page.waitForSelector('[data-testid="extraction-created"]');
        return await this.page.isVisible('[data-testid="extraction-created"]');
    }

    async isEmployeeTypeUndetermined() {
        await this.page.waitForSelector('[data-testid="employee-type-selector"]');
        const selectedValue = await this.page.getAttribute('[data-testid="employee-type-selector"]', 'value');
        return selectedValue === '' || selectedValue === 'unknown';
    }

    async createW2EmployeeFromExtraction() {
        await this.page.waitForSelector('[data-testid="employee-type-selector"]');
        await this.page.selectOption('[data-testid="employee-type-selector"]', 'w2-employee');
        await this.page.click('[data-testid="create-employee-btn"]');
        await this.page.waitForSelector('[data-testid="w2-employee-created"]');
        return await this.page.isVisible('[data-testid="w2-employee-created"]');
    }

    async isEmployeeVisibleInEEApp() {
        await this.page.waitForSelector('[data-testid="employee-details-panel"]');
        return await this.page.isVisible('[data-testid="employee-details-panel"]');
    }

    async createContractorFromExtraction() {
        await this.page.waitForSelector('[data-testid="employee-type-selector"]');
        await this.page.selectOption('[data-testid="employee-type-selector"]', 'contractor');
        await this.page.click('[data-testid="create-employee-btn"]');
        await this.page.waitForSelector('[data-testid="contractor-created"]');
        return await this.page.isVisible('[data-testid="contractor-created"]');
    }

    async isContractorVisibleInEEApp() {
        await this.page.waitForSelector('[data-testid="employee-details-panel"]');
        const contractorStatus = await this.page.textContent('[data-testid="employee-type-display"]');
        return contractorStatus.includes('Contractor');
    }

    async enableWorkerCreationWithoutTypeFlag() {
        await this.page.waitForSelector('[data-testid="enableWorkerCreationWithoutType-toggle"]');
        await this.page.click('[data-testid="enableWorkerCreationWithoutType-toggle"]');
        return await this.page.isChecked('[data-testid="enableWorkerCreationWithoutType-toggle"]');
    }

    async processUnknownTypeExtraction() {
        await this.page.waitForSelector('[data-testid="process-extraction-btn"]');
        await this.page.click('[data-testid="process-extraction-btn"]');
        await this.page.waitForSelector('[data-testid="extraction-processed"]');
        return await this.page.isVisible('[data-testid="extraction-processed"]');
    }

    async enableWorkerCreationForGenStructFlag() {
        await this.page.waitForSelector('[data-testid="enableWorkerCreationForGenStruct-toggle"]');
        await this.page.click('[data-testid="enableWorkerCreationForGenStruct-toggle"]');
        return await this.page.isChecked('[data-testid="enableWorkerCreationForGenStruct-toggle"]');
    }

    async processDriversLicenseInDocExtraction() {
        await this.page.waitForSelector('[data-testid="doc-extraction-service"]');
        await this.page.click('[data-testid="process-drivers-license-btn"]');
        await this.page.waitForSelector('[data-testid="drivers-license-processed"]');
        return await this.page.isVisible('[data-testid="drivers-license-processed"]');
    }

    async getTypelessExtractionData() {
        await this.page.waitForSelector('[data-testid="extraction-data-form"]');
        return await this.page.isVisible('[data-testid="extraction-data-form"]');
    }

    async validateExtractionDataCompleteness() {
        const personalInfoFields = await this.page.locator('[data-testid^="personal-info-"]').count();
        const documentFields = await this.page.locator('[data-testid^="document-detail-"]').count();
        return personalInfoFields > 0 && documentFields > 0;
    }

    async makeRunservicesEmployeeEndpointUnavailable() {
        await this.page.waitForSelector('[data-testid="endpoint-control-panel"]');
        await this.page.click('[data-testid="disable-runservices-endpoint-btn"]');
        return await this.page.isVisible('[data-testid="endpoint-unavailable-status"]');
    }

    async ensureW2EmployeeExists() {
        await this.page.waitForSelector('[data-testid="employee-search"]');
        await this.page.fill('[data-testid="employee-search"]', 'W2Employee');
        await this.page.click('[data-testid="search-btn"]');
        return await this.page.isVisible('[data-testid="w2-employee-found"]');
    }

    async initiateConcurrentTypeConversions() {
        // Simulate multiple concurrent conversion attempts
        await this.page.waitForSelector('[data-testid="concurrent-conversion-test"]');
        await this.page.click('[data-testid="start-concurrent-conversions-btn"]');
        return await this.page.isVisible('[data-testid="concurrent-conversions-initiated"]');
    }

    async createEmployeeWithConversionHistory() {
        await this.page.waitForSelector('[data-testid="create-test-employee-btn"]');
        await this.page.click('[data-testid="create-test-employee-btn"]');
        await this.page.click('[data-testid="add-conversion-history-btn"]');
        return await this.page.isVisible('[data-testid="employee-with-history-created"]');
    }

    async createEmployeeWithExistingRecords() {
        await this.page.waitForSelector('[data-testid="create-employee-with-records-btn"]');
        await this.page.click('[data-testid="create-employee-with-records-btn"]');
        await this.page.waitForSelector('[data-testid="employee-records-created"]');
        return await this.page.isVisible('[data-testid="employee-records-created"]');
    }

    async processExtraction() {
        await this.page.waitForSelector('[data-testid="process-extraction-btn"]');
        await this.page.click('[data-testid="process-extraction-btn"]');
        return await this.page.waitForSelector('[data-testid="extraction-processing-complete"]');
    }

    async selectEmployeeTypeConversionOption() {
        await this.page.waitForSelector('[data-testid="type-conversion-btn"]');
        await this.page.click('[data-testid="type-conversion-btn"]');
        return await this.page.isVisible('[data-testid="conversion-options-panel"]');
    }

    async selectContractorType() {
        await this.page.waitForSelector('[data-testid="contractor-type-option"]');
        await this.page.click('[data-testid="contractor-type-option"]');
        return await this.page.isVisible('[data-testid="contractor-type-selected"]');
    }

    async confirmTypeConversion() {
        await this.page.waitForSelector('[data-testid="confirm-conversion-btn"]');
        await this.page.click('[data-testid="confirm-conversion-btn"]');
        return await this.page.waitForSelector('[data-testid="conversion-confirmed"]');
    }

    async selectW2EmployeeType() {
        await this.page.waitForSelector('[data-testid="w2-employee-type-option"]');
        await this.page.click('[data-testid="w2-employee-type-option"]');
        return await this.page.isVisible('[data-testid="w2-employee-type-selected"]');
    }

    async evaluateExtraction() {
        await this.page.waitForSelector('[data-testid="evaluate-extraction-btn"]');
        await this.page.click('[data-testid="evaluate-extraction-btn"]');
        return await this.page.waitForSelector('[data-testid="extraction-evaluated"]');
    }

    async validateEmployeeTypeIndeterminate() {
        const typeStatus = await this.page.textContent('[data-testid="employee-type-status"]');
        return typeStatus === 'Indeterminate' || typeStatus === 'Unknown';
    }

    async mapDataToRunservicesEmployeeEndpoint() {
        await this.page.waitForSelector('[data-testid="map-data-btn"]');
        await this.page.click('[data-testid="map-data-btn"]');
        return await this.page.waitForSelector('[data-testid="data-mapping-complete"]');
    }

    async attemptEmployeeCreation() {
        await this.page.waitForSelector('[data-testid="create-employee-attempt-btn"]');
        await this.page.click('[data-testid="create-employee-attempt-btn"]');
        return await this.page.waitForSelector('[data-testid="creation-attempt-made"]');
    }

    async processConcurrentConversionOperations() {
        await this.page.waitForSelector('[data-testid="process-concurrent-operations-btn"]');
        await this.page.click('[data-testid="process-concurrent-operations-btn"]');
        return await this.page.waitForSelector('[data-testid="concurrent-operations-processed"]');
    }

    async viewEmployeeAuditTrail() {
        await this.page.waitForSelector('[data-testid="audit-trail-tab"]');
        await this.page.click('[data-testid="audit-trail-tab"]');
        return await this.page.isVisible('[data-testid="audit-trail-content"]');
    }

    async convertEmployeeType() {
        await this.page.waitForSelector('[data-testid="execute-conversion-btn"]');
        await this.page.click('[data-testid="execute-conversion-btn"]');
        return await this.page.waitForSelector('[data-testid="type-conversion-complete"]');
    }

    async verifyRunservicesEmployeeEndpointUsed() {
        const logEntries = await this.page.textContent('[data-testid="system-logs-panel"]');
        return logEntries.includes('runservices_employee endpoint used');
    }

    async verifyEmployeeCreatedWithoutType() {
        const employeeType = await this.page.textContent('[data-testid="employee-type-display"]');
        return employeeType === 'Undefined' || employeeType === 'None';
    }

    async verifyTypelessEmployeeCreationLog() {
        const logEntries = await this.page.textContent('[data-testid="system-logs-panel"]');
        return logEntries.includes('typeless employee creation');
    }

    async verifyRunservicesEmployeeSchemaMapping() {
        const schemaStatus = await this.page.textContent('[data-testid="schema-validation-status"]');
        return schemaStatus.includes('runservices_employee schema validated');
    }

    async verifyEmployeeConvertedToContractor() {
        const employeeType = await this.page.textContent('[data-testid="employee-type-display"]');
        return employeeType === 'Contractor';
    }

    async verifyChangeLoggedInAuditTrail() {
        await this.page.click('[data-testid="audit-trail-tab"]');
        const auditEntries = await this.page.textContent('[data-testid="audit-trail-content"]');
        return auditEntries.includes('Type conversion:');
    }

    async verifyEmployeeDetailsShowContractorStatus() {
        const statusElement = await this.page.textContent('[data-testid="employee-status-badge"]');
        return statusElement.includes('Contractor');
    }

    async verifyContractorConvertedToW2Employee() {
        const employeeType = await this.page.textContent('[data-testid="employee-type-display"]');
        return employeeType === 'W2 Employee';
    }

    async verifyEmployeeDetailsShowW2Status() {
        const statusElement = await this.page.textContent('[data-testid="employee-status-badge"]');
        return statusElement.includes('W2 Employee');
    }

    async verifyTypelessCreationWorkflowActivated() {
        const workflowStatus = await this.page.textContent('[data-testid="workflow-status"]');
        return workflowStatus.includes('Typeless creation workflow: Active');
    }

    async verifyEmployeeTypeNotSetByService() {
        const serviceLog = await this.page.textContent('[data-testid="service-doc-extraction-log"]');
        return serviceLog.includes('Employee type not set by service');
    }

    async verifyExtractionProceedsWithoutTypeAssignment() {
        const extractionStatus = await this.page.textContent('[data-testid="extraction-status"]');
        return extractionStatus.includes('Proceeded without type assignment');
    }

    async verifyDataConformsToEndpointSchema() {
        const schemaValidation = await this.page.textContent('[data-testid="schema-validation-result"]');
        return schemaValidation.includes('Schema validation: PASSED');
    }

    async verifyRequiredFieldsProperlyMapped() {
        const requiredFieldsStatus = await this.page.textContent('[data-testid="required-fields-status"]');
        return requiredFieldsStatus.includes('All required fields mapped');
    }

    async verifyOptionalFieldsHandledAppropriately() {
        const optionalFieldsStatus = await this.page.textContent('[data-testid="optional-fields-status"]');
        return optionalFieldsStatus.includes('Optional fields handled appropriately');
    }

    async verifyAppropriateErrorLogged() {
        const errorLog = await this.page.textContent('[data-testid="error-log-panel"]');
        return errorLog.includes('Endpoint unavailable error logged');
    }

    async verifyFallbackProcessingAttempted() {
        const fallbackStatus = await this.page.textContent('[data-testid="fallback-processing-status"]');
        return fallbackStatus.includes('Fallback processing attempted');
    }

    async verifyUserNotifiedOfIssue() {
        const notificationPanel = await this.page.isVisible('[data-testid="user-notification-panel"]');
        return notificationPanel;
    }

    async verifySingleConversionSucceeded() {
        const conversionCount = await this.page.textContent('[data-testid="successful-conversions-count"]');
        return conversionCount === '1';
    }

    async verifySubsequentAttemptsRejected() {
        const rejectionMessage = await this.page.textContent('[data-testid="rejection-message"]');
        return rejectionMessage.includes('Concurrent conversion attempt rejected');
    }

    async verifyDataIntegrityMaintained() {
        const integrityStatus = await this.page.textContent('[data-testid="data-integrity-status"]');
        return integrityStatus.includes('Data integrity: MAINTAINED');
    }

    async verifyAllTypeChangesRecorded() {
        await this.page.click('[data-testid="audit-trail-tab"]');
        const auditEntries = await this.page.locator('[data-testid^="audit-entry-"]').count();
        return auditEntries > 0;
    }

    async verifyChangeDetailsIncludeTimestampAndUser() {
        const auditEntry = await this.page.textContent('[data-testid="audit-entry-1"]');
        return auditEntry.includes('Timestamp:') && auditEntry.includes('User:');
    }

    async verifyOriginalCreationMethodPreserved() {
        const creationMethod = await this.page.textContent('[data-testid="original-creation-method"]');
        return creationMethod.includes('Original creation method preserved');
    }

    async verifyRelatedDataRemainsConsistent() {
        const consistencyStatus = await this.page.textContent('[data-testid="data-consistency-status"]');
        return consistencyStatus.includes('Related data: CONSISTENT');
    }

    async verifyDependentRecordsUpdatedAppropriately() {
        const dependentRecordsStatus = await this.page.textContent('[data-testid="dependent-records-status"]');
        return dependentRecordsStatus.includes('Dependent records updated appropriately');
    }

    async verifyNoDataCorruptionOccurred() {
        const corruptionStatus = await this.page.textContent('[data-testid="data-corruption-check"]');
        return corruptionStatus.includes('No data corruption detected');
    }
}

module.exports = RSEndPointPage;
