Feature: CFC Bundle Provisioning
    As a system administrator
    I want to add CFC bundle during order provisioning
    So that components are available but not activated

    Background:
        Given the order provisioning system is available
        And the installation context is configured

    @cfc @provisioning
    Scenario: Add CFC bundle for ESO order without CFC bundle
        Given an ESO order exists without CFC bundle
        And the order contains major bundles:
            | Bundle Type             |
            | Adp Essential           |
            | Run Complete and HR     |
            | Run Complete and HRPLUS |
            | HR PRO                  |
        When the order provisioning process starts
        Then the CFC bundle should be added to the order
        And the CFC component should be available but not activated
        And the "avilableBundles" property should be set in installation context
        And the CFC task should appear in the to-do task list

    @cfc @provisioning
    Scenario: Process ESO order with existing CFC bundle
        Given an ESO order exists with CFC bundle already included
        And the order contains major bundles
        When the order provisioning process starts
        Then the existing CFC bundle should remain unchanged
        And the CFC component should be available but not activated
        And the "avilableBundles" property should include the CFC bundle

    @cfc @context @properties
    Scenario: Verify new properties in installation context
        Given the installation context is initialized
        When the CFC bundle is added during provisioning
        Then the "avilableBundles" property should exist in installation context
        And the property should contain non-activated bundles
        And the property should be available in core context wrapper
        And the property should be visible in system model
        And the property should be configured in index_Config file
        And the property should be accessible in top.run.context
        And the property should be present in nextgen installation context

    @cfc @logging
    Scenario: Verify CFC component subscriber logging
        Given the CFC component subscriber is active
        When the CFC bundle becomes available
        Then detailed logs should be generated for the CFC component
        And the logs should include component availability events
        And the logs should track the RequireActivation property

    @cfc @tasks
    Scenario: CFC task creation on component availability
        Given the CFC bundle has been added to the order
        When the CFC component becomes available
        Then a CFC task should be created automatically
        And the task should appear in the to-do task list
        And the task should be associated with the correct IID
