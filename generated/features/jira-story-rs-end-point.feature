Feature: RS Endpoint Employee Type Management
  As a system administrator
  I want to handle employee creation when type is unknown
  And-so manage employee type conversions in the EE app
  So that employees can be properly classified and managed

  Background:
    Given the system is configured with feature flags
    And the runservices_employee endpoint is available
    And the EE app is accessible

  @typeless-creation @critical
  Scenario: Create employee with unknown type from Driver's License
    Given an employee extraction from Driver's License document
    And the employee type cannot be determined
    When the system processes the extraction
    Then the runservices_employee endpoint should be used
    And the employee should be created without a defined type
    And the system should log "typeless employee creation"
    And the data should be mapped to the runservices_employee schema

  @type-conversion @primary
  Scenario: Convert W2 employee to contractor in EE app
    Given a W2 employee has been created from extraction
    And the employee is visible in the EE app
    When the user selects the employee type conversion option
    And chooses to switch to contractor type
    And confirms the conversion
    Then the employee should be converted to contractor
    And the change should be logged in audit trail
    And the employee details should reflect contractor status

  @type-conversion @secondary
  Scenario: Convert contractor to W2 employee in EE app
    Given a contractor has been created from extraction
    And the contractor is visible in the EE app
    When the user selects the employee type conversion option
    And chooses to switch to W2 employee type
    And confirms the conversion
    Then the contractor should be converted to W2 employee
    And the change should be logged in audit trail
    And the employee details should reflect W2 employee status

  @feature-flags @configuration
  Scenario: Feature flag enableWorkerCreationWithoutType controls typeless creation
    Given the feature flag enableWorkerCreationWithoutType is enabled
    And an employee extraction with unknown type is processed
    When the system evaluates the extraction
    Then the typeless employee creation workflow should be activated
    And the runservices_employee endpoint should be used

  @feature-flags @configuration
  Scenario: Feature flag enableWorkerCreationForGenStruct controls extraction behavior
    Given the feature flag enableWorkerCreationForGenStruct is enabled
    And service_doc_extraction processes a Driver's License
    When the employee type cannot be determined
    Then the service should not set the employee type
    And the extraction should proceed without type assignment

  @schema-validation @integration
  Scenario: Validate data mapping to runservices_employee schema
    Given employee data from a typeless extraction
    And the data includes personal information and document details
    When mapping the data to runservices_employee endpoint
    Then the data should conform to the endpoint schema
    And all required fields should be properly mapped
    And optional fields should be handled appropriately

  @error-handling @negative
  Scenario: Handle runservices_employee endpoint failure
    Given an employee extraction with unknown type
    And the runservices_employee endpoint is unavailable
    When the system attempts to create the employee
    Then an appropriate error should be logged
    And the system should attempt fallback processing
    And the user should be notified of the issue

  @concurrent-operations @edge-case
  Scenario: Handle concurrent type conversion attempts
    Given a W2 employee exists in the system
    And multiple users attempt type conversion simultaneously
    When the conversion operations are processed
    Then only one conversion should succeed
    And subsequent attempts should be rejected with appropriate message
    And data integrity should be maintained

  @audit-trail @compliance
  Scenario: Maintain audit trail for employee type changes
    Given an employee with type conversion history
    When viewing the employee audit trail
    Then all type changes should be recorded
    And each change should include timestamp and user information
    And the original creation method should be preserved

  @data-integrity @validation
  Scenario: Verify employee data consistency during type conversion
    Given an employee with existing records and associations
    When the employee type is converted
    Then all related data should remain consistent
    And dependent records should be updated appropriately
    And no data corruption should occur
