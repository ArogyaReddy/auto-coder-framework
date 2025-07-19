const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const CfcBundlePage = require('../pages/jira-story-cfc-bundle-page');

Given('the user is logged into the system', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).navigateToLoginPage();
    await new CfcBundlePage(this.page).performLogin('testuser', 'testpass');
});

Given('the user has access to order provisioning functionality', { timeout: 240 * 1000 }, async function () {
    const hasAccess = await new CfcBundlePage(this.page).verifyProvisioningAccess();
    assert.isTrue(hasAccess, 'User does not have access to order provisioning functionality');
});

Given('an ESO order exists without CFC bundle', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).navigateToOrderProvisioning();
    await new CfcBundlePage(this.page).createEsoOrderWithoutCfcBundle();
});

Given('the order contains major bundle {string}', { timeout: 240 * 1000 }, async function (bundleType) {
    await new CfcBundlePage(this.page).addMajorBundleToOrder(bundleType);
    const bundleAdded = await new CfcBundlePage(this.page).verifyBundleInOrder(bundleType);
    assert.isTrue(bundleAdded, `Major bundle ${bundleType} was not added to the order`);
});

Given('an ESO order exists with CFC bundle already included', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).navigateToOrderProvisioning();
    await new CfcBundlePage(this.page).createEsoOrderWithCfcBundle();
});

Given('the order provisioning process has completed successfully', { timeout: 240 * 1000 }, async function () {
    const provisioningCompleted = await new CfcBundlePage(this.page).verifyProvisioningCompleted();
    assert.isTrue(provisioningCompleted, 'Order provisioning process did not complete successfully');
});

Given('CFC bundle has been added to the order', { timeout: 240 * 1000 }, async function () {
    const cfcBundleAdded = await new CfcBundlePage(this.page).verifyCfcBundleInOrder();
    assert.isTrue(cfcBundleAdded, 'CFC bundle was not added to the order');
});

Given('CFC component becomes available after provisioning', { timeout: 240 * 1000 }, async function () {
    const componentAvailable = await new CfcBundlePage(this.page).verifyCfcComponentAvailable();
    assert.isTrue(componentAvailable, 'CFC component is not available after provisioning');
});

Given('the system has available bundles including CFC', { timeout: 240 * 1000 }, async function () {
    const availableBundlesExist = await new CfcBundlePage(this.page).verifyAvailableBundles();
    assert.isTrue(availableBundlesExist, 'System does not have available bundles including CFC');
});

Given('CFC bundle provisioning has been implemented', { timeout: 240 * 1000 }, async function () {
    const provisioningImplemented = await new CfcBundlePage(this.page).verifyProvisioningImplementation();
    assert.isTrue(provisioningImplemented, 'CFC bundle provisioning has not been implemented');
});

Given('an ESO order with invalid bundle configuration', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).createEsoOrderWithInvalidConfiguration();
});

Given('CFC bundle is being added during provisioning', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).initiateCfcBundleAddition();
});

When('the order provisioning process executes', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).executeOrderProvisioning();
});

When('checking the installation context', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).navigateToInstallationContext();
});

When('the system processes the component status change', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).processComponentStatusChange();
});

When('accessing the core context wrapper', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).navigateToCoreContextWrapper();
});

When('checking system model properties', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).navigateToSystemModelProperties();
});

When('the order provisioning process encounters an error', { timeout: 240 * 1000 }, async function () {
    await new CfcBundlePage(this.page).simulateProvisioningError();
});

When('the bundle addition process completes', { timeout: 240 * 1000 }, async function () {
    const bundleAdditionCompleted = await new CfcBundlePage(this.page).waitForBundleAdditionCompletion();
    assert.isTrue(bundleAdditionCompleted, 'Bundle addition process did not complete');
});

Then('CFC bundle should be automatically added for the IID', { timeout: 240 * 1000 }, async function () {
    const cfcBundleAdded = await new CfcBundlePage(this.page).verifyCfcBundleAutoAdded();
    assert.isTrue(cfcBundleAdded, 'CFC bundle was not automatically added for the IID');
});

Then('CFC component should be available but not activated', { timeout: 240 * 1000 }, async function () {
    const componentAvailable = await new CfcBundlePage(this.page).verifyCfcComponentAvailable();
    const componentNotActivated = await new CfcBundlePage(this.page).verifyCfcComponentNotActivated();
    assert.isTrue(componentAvailable, 'CFC component is not available');
    assert.isTrue(componentNotActivated, 'CFC component should not be activated');
});

Then('the availableBundles property should contain CFC bundle information', { timeout: 240 * 1000 }, async function () {
    const propertyContainsCfc = await new CfcBundlePage(this.page).verifyAvailableBundlesPropertyContainsCfc();
    assert.isTrue(propertyContainsCfc, 'availableBundles property does not contain CFC bundle information');
});

Then('logs should be generated by CFC component subscriber', { timeout: 240 * 1000 }, async function () {
    const logsGenerated = await new CfcBundlePage(this.page).verifyCfcSubscriberLogs();
    assert.isTrue(logsGenerated, 'Logs were not generated by CFC component subscriber');
});

Then('the system should successfully process the CFC bundle', { timeout: 240 * 1000 }, async function () {
    const bundleProcessed = await new CfcBundlePage(this.page).verifyCfcBundleProcessed();
    assert.isTrue(bundleProcessed, 'System did not successfully process the CFC bundle');
});

Then('no duplicate bundle entries should be created', { timeout: 240 * 1000 }, async function () {
    const noDuplicates = await new CfcBundlePage(this.page).verifyNoDuplicateBundleEntries();
    assert.isTrue(noDuplicates, 'Duplicate bundle entries were created');
});

Then('the availableBundles property should be updated correctly', { timeout: 240 * 1000 }, async function () {
    const propertyUpdated = await new CfcBundlePage(this.page).verifyAvailableBundlesPropertyUpdated();
    assert.isTrue(propertyUpdated, 'availableBundles property was not updated correctly');
});

Then('the availableBundles property should be present', { timeout: 240 * 1000 }, async function () {
    const propertyPresent = await new CfcBundlePage(this.page).verifyAvailableBundlesPropertyPresent();
    assert.isTrue(propertyPresent, 'availableBundles property is not present');
});

Then('the property should contain CFC bundle information', { timeout: 240 * 1000 }, async function () {
    const containsInfo = await new CfcBundlePage(this.page).verifyPropertyContainsCfcInfo();
    assert.isTrue(containsInfo, 'Property does not contain CFC bundle information');
});

Then('bundles should be in available state not activated state', { timeout: 240 * 1000 }, async function () {
    const bundlesAvailable = await new CfcBundlePage(this.page).verifyBundlesInAvailableState();
    const bundlesNotActivated = await new CfcBundlePage(this.page).verifyBundlesNotActivated();
    assert.isTrue(bundlesAvailable, 'Bundles are not in available state');
    assert.isTrue(bundlesNotActivated, 'Bundles should not be in activated state');
});

Then('the RequireActivation property should be properly configured', { timeout: 240 * 1000 }, async function () {
    const propertyConfigured = await new CfcBundlePage(this.page).verifyRequireActivationProperty();
    assert.isTrue(propertyConfigured, 'RequireActivation property is not properly configured');
});

Then('CFC task should be created in the system', { timeout: 240 * 1000 }, async function () {
    const taskCreated = await new CfcBundlePage(this.page).verifyCfcTaskCreated();
    assert.isTrue(taskCreated, 'CFC task was not created in the system');
});

Then('the task should be visible in to-do tasks', { timeout: 240 * 1000 }, async function () {
    const taskVisible = await new CfcBundlePage(this.page).verifyCfcTaskInTodoList();
    assert.isTrue(taskVisible, 'CFC task is not visible in to-do tasks');
});

Then('task should indicate component availability status', { timeout: 240 * 1000 }, async function () {
    const taskIndicatesStatus = await new CfcBundlePage(this.page).verifyTaskIndicatesAvailabilityStatus();
    assert.isTrue(taskIndicatesStatus, 'Task does not indicate component availability status');
});

Then('task creation logs should be recorded', { timeout: 240 * 1000 }, async function () {
    const logsRecorded = await new CfcBundlePage(this.page).verifyTaskCreationLogs();
    assert.isTrue(logsRecorded, 'Task creation logs were not recorded');
});

Then('available bundles should be displayed correctly', { timeout: 240 * 1000 }, async function () {
    const bundlesDisplayed = await new CfcBundlePage(this.page).verifyAvailableBundlesDisplayed();
    assert.isTrue(bundlesDisplayed, 'Available bundles are not displayed correctly');
});

Then('CFC bundle should appear in the available bundles list', { timeout: 240 * 1000 }, async function () {
    const cfcInList = await new CfcBundlePage(this.page).verifyCfcBundleInAvailableList();
    assert.isTrue(cfcInList, 'CFC bundle does not appear in the available bundles list');
});

Then('bundle status should show as available not activated', { timeout: 240 * 1000 }, async function () {
    const statusCorrect = await new CfcBundlePage(this.page).verifyBundleStatusAvailableNotActivated();
    assert.isTrue(statusCorrect, 'Bundle status does not show as available not activated');
});

Then('new property should be present in system model', { timeout: 240 * 1000 }, async function () {
    const propertyInSystemModel = await new CfcBundlePage(this.page).verifyPropertyInSystemModel();
    assert.isTrue(propertyInSystemModel, 'New property is not present in system model');
});

Then('index_Config file should display available bundles in top.run.context', { timeout: 240 * 1000 }, async function () {
    const configDisplaysBundles = await new CfcBundlePage(this.page).verifyIndexConfigDisplaysBundles();
    assert.isTrue(configDisplaysBundles, 'index_Config file does not display available bundles in top.run.context');
});

Then('nextgen installation context should include the new property', { timeout: 240 * 1000 }, async function () {
    const nextgenIncludesProperty = await new CfcBundlePage(this.page).verifyNextgenIncludesProperty();
    assert.isTrue(nextgenIncludesProperty, 'nextgen installation context does not include the new property');
});

Then('the provisioning should complete successfully', { timeout: 240 * 1000 }, async function () {
    const provisioningSuccess = await new CfcBundlePage(this.page).verifyProvisioningSuccess();
    assert.isTrue(provisioningSuccess, 'Provisioning did not complete successfully');
});

Then('the system should handle the error gracefully', { timeout: 240 * 1000 }, async function () {
    const errorHandled = await new CfcBundlePage(this.page).verifyErrorHandledGracefully();
    assert.isTrue(errorHandled, 'System did not handle the error gracefully');
});

Then('appropriate error messages should be logged', { timeout: 240 * 1000 }, async function () {
    const errorMessagesLogged = await new CfcBundlePage(this.page).verifyErrorMessagesLogged();
    assert.isTrue(errorMessagesLogged, 'Appropriate error messages were not logged');
});

Then('the order status should reflect the error condition', { timeout: 240 * 1000 }, async function () {
    const statusReflectsError = await new CfcBundlePage(this.page).verifyOrderStatusReflectsError();
    assert.isTrue(statusReflectsError, 'Order status does not reflect the error condition');
});

Then('no partial bundle additions should occur', { timeout: 240 * 1000 }, async function () {
    const noPartialAdditions = await new CfcBundlePage(this.page).verifyNoPartialBundleAdditions();
    assert.isTrue(noPartialAdditions, 'Partial bundle additions occurred');
});

Then('the component should be in available state only', { timeout: 240 * 1000 }, async function () {
    const componentAvailableOnly = await new CfcBundlePage(this.page).verifyComponentInAvailableStateOnly();
    assert.isTrue(componentAvailableOnly, 'Component is not in available state only');
});

Then('the component should not be in activated state', { timeout: 240 * 1000 }, async function () {
    const componentNotActivated = await new CfcBundlePage(this.page).verifyComponentNotActivated();
    assert.isTrue(componentNotActivated, 'Component should not be in activated state');
});

Then('the RequireActivation property should prevent auto-activation', { timeout: 240 * 1000 }, async function () {
    const propertyPreventsActivation = await new CfcBundlePage(this.page).verifyRequireActivationPreventsAutoActivation();
    assert.isTrue(propertyPreventsActivation, 'RequireActivation property does not prevent auto-activation');
});

Then('component status should be clearly distinguishable', { timeout: 240 * 1000 }, async function () {
    const statusDistinguishable = await new CfcBundlePage(this.page).verifyComponentStatusDistinguishable();
    assert.isTrue(statusDistinguishable, 'Component status is not clearly distinguishable');
});
