const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('chai').assert;
const RSEndPointPage = require('../pages/jira-story-rs-end-point-page');

Given('the system is configured with feature flags', { timeout: 240 * 1000 }, async function () {
    let systemConfigured = await new RSEndPointPage(this.page).isSystemConfiguredWithFeatureFlags();
    assert.isTrue(systemConfigured, 'System is not configured with feature flags');
});

Given('the runservices_employee endpoint is available', { timeout: 240 * 1000 }, async function () {
    let endpointAvailable = await new RSEndPointPage(this.page).isRunservicesEmployeeEndpointAvailable();
    assert.isTrue(endpointAvailable, 'Runservices_employee endpoint is not available');
});

Given('the EE app is accessible', { timeout: 240 * 1000 }, async function () {
    let appAccessible = await new RSEndPointPage(this.page).isEEAppAccessible();
    assert.isTrue(appAccessible, 'EE app is not accessible');
});

Given('an employee extraction from Driver\'s License document', { timeout: 240 * 1000 }, async function () {
    let extractionCreated = await new RSEndPointPage(this.page).createDriversLicenseExtraction();
    assert.isTrue(extractionCreated, 'Driver\'s License extraction was not created');
});

Given('the employee type cannot be determined', { timeout: 240 * 1000 }, async function () {
    let typeUndetermined = await new RSEndPointPage(this.page).isEmployeeTypeUndetermined();
    assert.isTrue(typeUndetermined, 'Employee type was determined when it should not have been');
});

Given('a W2 employee has been created from extraction', { timeout: 240 * 1000 }, async function () {
    let w2EmployeeCreated = await new RSEndPointPage(this.page).createW2EmployeeFromExtraction();
    assert.isTrue(w2EmployeeCreated, 'W2 employee was not created from extraction');
});

Given('the employee is visible in the EE app', { timeout: 240 * 1000 }, async function () {
    let employeeVisible = await new RSEndPointPage(this.page).isEmployeeVisibleInEEApp();
    assert.isTrue(employeeVisible, 'Employee is not visible in EE app');
});

Given('a contractor has been created from extraction', { timeout: 240 * 1000 }, async function () {
    let contractorCreated = await new RSEndPointPage(this.page).createContractorFromExtraction();
    assert.isTrue(contractorCreated, 'Contractor was not created from extraction');
});

Given('the contractor is visible in the EE app', { timeout: 240 * 1000 }, async function () {
    let contractorVisible = await new RSEndPointPage(this.page).isContractorVisibleInEEApp();
    assert.isTrue(contractorVisible, 'Contractor is not visible in EE app');
});

Given('the feature flag enableWorkerCreationWithoutType is enabled', { timeout: 240 * 1000 }, async function () {
    let flagEnabled = await new RSEndPointPage(this.page).enableWorkerCreationWithoutTypeFlag();
    assert.isTrue(flagEnabled, 'EnableWorkerCreationWithoutType flag is not enabled');
});

Given('an employee extraction with unknown type is processed', { timeout: 240 * 1000 }, async function () {
    let extractionProcessed = await new RSEndPointPage(this.page).processUnknownTypeExtraction();
    assert.isTrue(extractionProcessed, 'Employee extraction with unknown type was not processed');
});

Given('the feature flag enableWorkerCreationForGenStruct is enabled', { timeout: 240 * 1000 }, async function () {
    let flagEnabled = await new RSEndPointPage(this.page).enableWorkerCreationForGenStructFlag();
    assert.isTrue(flagEnabled, 'EnableWorkerCreationForGenStruct flag is not enabled');
});

Given('service_doc_extraction processes a Driver\'s License', { timeout: 240 * 1000 }, async function () {
    let serviceProcessed = await new RSEndPointPage(this.page).processDriversLicenseInDocExtraction();
    assert.isTrue(serviceProcessed, 'Service_doc_extraction did not process Driver\'s License');
});

Given('employee data from a typeless extraction', { timeout: 240 * 1000 }, async function () {
    let dataAvailable = await new RSEndPointPage(this.page).getTypelessExtractionData();
    assert.isTrue(dataAvailable, 'Employee data from typeless extraction is not available');
});

Given('the data includes personal information and document details', { timeout: 240 * 1000 }, async function () {
    let dataComplete = await new RSEndPointPage(this.page).validateExtractionDataCompleteness();
    assert.isTrue(dataComplete, 'Extraction data is not complete with personal information and document details');
});

Given('the runservices_employee endpoint is unavailable', { timeout: 240 * 1000 }, async function () {
    let endpointUnavailable = await new RSEndPointPage(this.page).makeRunservicesEmployeeEndpointUnavailable();
    assert.isTrue(endpointUnavailable, 'Runservices_employee endpoint could not be made unavailable');
});

Given('a W2 employee exists in the system', { timeout: 240 * 1000 }, async function () {
    let employeeExists = await new RSEndPointPage(this.page).ensureW2EmployeeExists();
    assert.isTrue(employeeExists, 'W2 employee does not exist in the system');
});

Given('multiple users attempt type conversion simultaneously', { timeout: 240 * 1000 }, async function () {
    let concurrentAttempts = await new RSEndPointPage(this.page).initiateConcurrentTypeConversions();
    assert.isTrue(concurrentAttempts, 'Concurrent type conversion attempts were not initiated');
});

Given('an employee with type conversion history', { timeout: 240 * 1000 }, async function () {
    let employeeWithHistory = await new RSEndPointPage(this.page).createEmployeeWithConversionHistory();
    assert.isTrue(employeeWithHistory, 'Employee with type conversion history was not created');
});

Given('an employee with existing records and associations', { timeout: 240 * 1000 }, async function () {
    let employeeWithRecords = await new RSEndPointPage(this.page).createEmployeeWithExistingRecords();
    assert.isTrue(employeeWithRecords, 'Employee with existing records and associations was not created');
});

When('the system processes the extraction', { timeout: 240 * 1000 }, async function () {
    let extractionProcessed = await new RSEndPointPage(this.page).processExtraction();
    assert.isTrue(extractionProcessed, 'System did not process the extraction');
});

When('the user selects the employee type conversion option', { timeout: 240 * 1000 }, async function () {
    let conversionOptionSelected = await new RSEndPointPage(this.page).selectEmployeeTypeConversionOption();
    assert.isTrue(conversionOptionSelected, 'Employee type conversion option was not selected');
});

When('chooses to switch to contractor type', { timeout: 240 * 1000 }, async function () {
    let contractorTypeSelected = await new RSEndPointPage(this.page).selectContractorType();
    assert.isTrue(contractorTypeSelected, 'Contractor type was not selected');
});

When('confirms the conversion', { timeout: 240 * 1000 }, async function () {
    let conversionConfirmed = await new RSEndPointPage(this.page).confirmTypeConversion();
    assert.isTrue(conversionConfirmed, 'Type conversion was not confirmed');
});

When('chooses to switch to W2 employee type', { timeout: 240 * 1000 }, async function () {
    let w2TypeSelected = await new RSEndPointPage(this.page).selectW2EmployeeType();
    assert.isTrue(w2TypeSelected, 'W2 employee type was not selected');
});

When('the system evaluates the extraction', { timeout: 240 * 1000 }, async function () {
    let extractionEvaluated = await new RSEndPointPage(this.page).evaluateExtraction();
    assert.isTrue(extractionEvaluated, 'System did not evaluate the extraction');
});

When('the employee type cannot be determined', { timeout: 240 * 1000 }, async function () {
    let typeIndeterminate = await new RSEndPointPage(this.page).validateEmployeeTypeIndeterminate();
    assert.isTrue(typeIndeterminate, 'Employee type was determined when it should not have been');
});

When('mapping the data to runservices_employee endpoint', { timeout: 240 * 1000 }, async function () {
    let dataMapped = await new RSEndPointPage(this.page).mapDataToRunservicesEmployeeEndpoint();
    assert.isTrue(dataMapped, 'Data was not mapped to runservices_employee endpoint');
});

When('the system attempts to create the employee', { timeout: 240 * 1000 }, async function () {
    let creationAttempted = await new RSEndPointPage(this.page).attemptEmployeeCreation();
    assert.isTrue(creationAttempted, 'System did not attempt to create the employee');
});

When('the conversion operations are processed', { timeout: 240 * 1000 }, async function () {
    let operationsProcessed = await new RSEndPointPage(this.page).processConcurrentConversionOperations();
    assert.isTrue(operationsProcessed, 'Conversion operations were not processed');
});

When('viewing the employee audit trail', { timeout: 240 * 1000 }, async function () {
    let auditTrailViewed = await new RSEndPointPage(this.page).viewEmployeeAuditTrail();
    assert.isTrue(auditTrailViewed, 'Employee audit trail was not viewed');
});

When('the employee type is converted', { timeout: 240 * 1000 }, async function () {
    let typeConverted = await new RSEndPointPage(this.page).convertEmployeeType();
    assert.isTrue(typeConverted, 'Employee type was not converted');
});

Then('the runservices_employee endpoint should be used', { timeout: 240 * 1000 }, async function () {
    let endpointUsed = await new RSEndPointPage(this.page).verifyRunservicesEmployeeEndpointUsed();
    assert.isTrue(endpointUsed, 'Runservices_employee endpoint was not used');
});

Then('the employee should be created without a defined type', { timeout: 240 * 1000 }, async function () {
    let employeeCreatedTypeless = await new RSEndPointPage(this.page).verifyEmployeeCreatedWithoutType();
    assert.isTrue(employeeCreatedTypeless, 'Employee was not created without a defined type');
});

Then('the system should log "typeless employee creation"', { timeout: 240 * 1000 }, async function () {
    let logEntryFound = await new RSEndPointPage(this.page).verifyTypelessEmployeeCreationLog();
    assert.isTrue(logEntryFound, 'Typeless employee creation log entry was not found');
});

Then('the data should be mapped to the runservices_employee schema', { timeout: 240 * 1000 }, async function () {
    let schemaMapped = await new RSEndPointPage(this.page).verifyRunservicesEmployeeSchemaMapping();
    assert.isTrue(schemaMapped, 'Data was not mapped to runservices_employee schema');
});

Then('the employee should be converted to contractor', { timeout: 240 * 1000 }, async function () {
    let convertedToContractor = await new RSEndPointPage(this.page).verifyEmployeeConvertedToContractor();
    assert.isTrue(convertedToContractor, 'Employee was not converted to contractor');
});

Then('the change should be logged in audit trail', { timeout: 240 * 1000 }, async function () {
    let changeLogged = await new RSEndPointPage(this.page).verifyChangeLoggedInAuditTrail();
    assert.isTrue(changeLogged, 'Change was not logged in audit trail');
});

Then('the employee details should reflect contractor status', { timeout: 240 * 1000 }, async function () {
    let contractorStatusReflected = await new RSEndPointPage(this.page).verifyEmployeeDetailsShowContractorStatus();
    assert.isTrue(contractorStatusReflected, 'Employee details do not reflect contractor status');
});

Then('the contractor should be converted to W2 employee', { timeout: 240 * 1000 }, async function () {
    let convertedToW2Employee = await new RSEndPointPage(this.page).verifyContractorConvertedToW2Employee();
    assert.isTrue(convertedToW2Employee, 'Contractor was not converted to W2 employee');
});

Then('the employee details should reflect W2 employee status', { timeout: 240 * 1000 }, async function () {
    let w2StatusReflected = await new RSEndPointPage(this.page).verifyEmployeeDetailsShowW2Status();
    assert.isTrue(w2StatusReflected, 'Employee details do not reflect W2 employee status');
});

Then('the typeless employee creation workflow should be activated', { timeout: 240 * 1000 }, async function () {
    let workflowActivated = await new RSEndPointPage(this.page).verifyTypelessCreationWorkflowActivated();
    assert.isTrue(workflowActivated, 'Typeless employee creation workflow was not activated');
});

Then('the service should not set the employee type', { timeout: 240 * 1000 }, async function () {
    let typeNotSet = await new RSEndPointPage(this.page).verifyEmployeeTypeNotSetByService();
    assert.isTrue(typeNotSet, 'Service incorrectly set the employee type');
});

Then('the extraction should proceed without type assignment', { timeout: 240 * 1000 }, async function () {
    let extractionProceededWithoutType = await new RSEndPointPage(this.page).verifyExtractionProceedsWithoutTypeAssignment();
    assert.isTrue(extractionProceededWithoutType, 'Extraction did not proceed without type assignment');
});

Then('the data should conform to the endpoint schema', { timeout: 240 * 1000 }, async function () {
    let schemaConformance = await new RSEndPointPage(this.page).verifyDataConformsToEndpointSchema();
    assert.isTrue(schemaConformance, 'Data does not conform to endpoint schema');
});

Then('all required fields should be properly mapped', { timeout: 240 * 1000 }, async function () {
    let requiredFieldsMapped = await new RSEndPointPage(this.page).verifyRequiredFieldsProperlyMapped();
    assert.isTrue(requiredFieldsMapped, 'Required fields were not properly mapped');
});

Then('optional fields should be handled appropriately', { timeout: 240 * 1000 }, async function () {
    let optionalFieldsHandled = await new RSEndPointPage(this.page).verifyOptionalFieldsHandledAppropriately();
    assert.isTrue(optionalFieldsHandled, 'Optional fields were not handled appropriately');
});

Then('an appropriate error should be logged', { timeout: 240 * 1000 }, async function () {
    let errorLogged = await new RSEndPointPage(this.page).verifyAppropriateErrorLogged();
    assert.isTrue(errorLogged, 'Appropriate error was not logged');
});

Then('the system should attempt fallback processing', { timeout: 240 * 1000 }, async function () {
    let fallbackAttempted = await new RSEndPointPage(this.page).verifyFallbackProcessingAttempted();
    assert.isTrue(fallbackAttempted, 'System did not attempt fallback processing');
});

Then('the user should be notified of the issue', { timeout: 240 * 1000 }, async function () {
    let userNotified = await new RSEndPointPage(this.page).verifyUserNotifiedOfIssue();
    assert.isTrue(userNotified, 'User was not notified of the issue');
});

Then('only one conversion should succeed', { timeout: 240 * 1000 }, async function () {
    let singleConversionSucceeded = await new RSEndPointPage(this.page).verifySingleConversionSucceeded();
    assert.isTrue(singleConversionSucceeded, 'More than one conversion succeeded');
});

Then('subsequent attempts should be rejected with appropriate message', { timeout: 240 * 1000 }, async function () {
    let subsequentAttemptsRejected = await new RSEndPointPage(this.page).verifySubsequentAttemptsRejected();
    assert.isTrue(subsequentAttemptsRejected, 'Subsequent attempts were not rejected with appropriate message');
});

Then('data integrity should be maintained', { timeout: 240 * 1000 }, async function () {
    let dataIntegrityMaintained = await new RSEndPointPage(this.page).verifyDataIntegrityMaintained();
    assert.isTrue(dataIntegrityMaintained, 'Data integrity was not maintained');
});

Then('all type changes should be recorded', { timeout: 240 * 1000 }, async function () {
    let allChangesRecorded = await new RSEndPointPage(this.page).verifyAllTypeChangesRecorded();
    assert.isTrue(allChangesRecorded, 'All type changes were not recorded');
});

Then('each change should include timestamp and user information', { timeout: 240 * 1000 }, async function () {
    let changeDetailsComplete = await new RSEndPointPage(this.page).verifyChangeDetailsIncludeTimestampAndUser();
    assert.isTrue(changeDetailsComplete, 'Change details do not include timestamp and user information');
});

Then('the original creation method should be preserved', { timeout: 240 * 1000 }, async function () {
    let creationMethodPreserved = await new RSEndPointPage(this.page).verifyOriginalCreationMethodPreserved();
    assert.isTrue(creationMethodPreserved, 'Original creation method was not preserved');
});

Then('all related data should remain consistent', { timeout: 240 * 1000 }, async function () {
    let relatedDataConsistent = await new RSEndPointPage(this.page).verifyRelatedDataRemainsConsistent();
    assert.isTrue(relatedDataConsistent, 'Related data is not consistent');
});

Then('dependent records should be updated appropriately', { timeout: 240 * 1000 }, async function () {
    let dependentRecordsUpdated = await new RSEndPointPage(this.page).verifyDependentRecordsUpdatedAppropriately();
    assert.isTrue(dependentRecordsUpdated, 'Dependent records were not updated appropriately');
});

Then('no data corruption should occur', { timeout: 240 * 1000 }, async function () {
    let noDataCorruption = await new RSEndPointPage(this.page).verifyNoDataCorruptionOccurred();
    assert.isTrue(noDataCorruption, 'Data corruption occurred');
});
