const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const assert = require('assert');
const CFCBundlePage = require('../pages/jira-story-cfc-bundle-page');

Given('the order provisioning system is available', { timeout: 240 * 1000 }, async function() {
    this.cfcPage = new CFCBundlePage(this.page);
    await this.cfcPage.navigateToOrderProvisioning();
    const systemStatus = await this.cfcPage.verifySystemAvailability();
    assert.isTrue(systemStatus, 'Order provisioning system should be available');
});

Given('the installation context is configured', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.configureInstallationContext();
    const contextStatus = await this.cfcPage.verifyInstallationContext();
    assert.isTrue(contextStatus, 'Installation context should be properly configured');
});

Given('an ESO order exists without CFC bundle', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.createESOOrder();
    await this.cfcPage.excludeCFCBundle();
    const orderExists = await this.cfcPage.verifyESOOrderExists();
    assert.isTrue(orderExists, 'ESO order should exist without CFC bundle');
});

Given('the order contains major bundles:', { timeout: 240 * 1000 }, async function(dataTable) {
    const bundles = dataTable.hashes();
    await this.cfcPage.addMajorBundles(bundles);
    const bundlesAdded = await this.cfcPage.verifyMajorBundles(bundles);
    assert.isTrue(bundlesAdded, 'Major bundles should be added to the order');
});

Given('an ESO order exists with CFC bundle already included', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.createESOOrderWithCFC();
    const orderWithCFC = await this.cfcPage.verifyESOOrderWithCFC();
    assert.isTrue(orderWithCFC, 'ESO order should exist with CFC bundle included');
});

Given('the order contains major bundles', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.addStandardMajorBundles();
    const bundlesPresent = await this.cfcPage.verifyMajorBundlesPresent();
    assert.isTrue(bundlesPresent, 'Order should contain major bundles');
});

Given('the installation context is initialized', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.initializeInstallationContext();
    const contextInitialized = await this.cfcPage.verifyContextInitialization();
    assert.isTrue(contextInitialized, 'Installation context should be initialized');
});

Given('the CFC component subscriber is active', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.activateCFCComponentSubscriber();
    const subscriberActive = await this.cfcPage.verifyCFCSubscriberActive();
    assert.isTrue(subscriberActive, 'CFC component subscriber should be active');
});

Given('the CFC bundle has been added to the order', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.addCFCBundleToOrder();
    const cfcBundleAdded = await this.cfcPage.verifyCFCBundleInOrder();
    assert.isTrue(cfcBundleAdded, 'CFC bundle should be added to the order');
});

When('the order provisioning process starts', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.startOrderProvisioning();
    const provisioningStarted = await this.cfcPage.verifyProvisioningStarted();
    assert.isTrue(provisioningStarted, 'Order provisioning process should start');
});

When('the CFC bundle is added during provisioning', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.addCFCBundleDuringProvisioning();
    const bundleAdded = await this.cfcPage.verifyCFCBundleAddedDuringProvisioning();
    assert.isTrue(bundleAdded, 'CFC bundle should be added during provisioning');
});

When('the CFC bundle becomes available', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.waitForCFCBundleAvailability();
    const bundleAvailable = await this.cfcPage.verifyCFCBundleAvailable();
    assert.isTrue(bundleAvailable, 'CFC bundle should become available');
});

When('the CFC component becomes available', { timeout: 240 * 1000 }, async function() {
    await this.cfcPage.waitForCFCComponentAvailability();
    const componentAvailable = await this.cfcPage.verifyCFCComponentAvailable();
    assert.isTrue(componentAvailable, 'CFC component should become available');
});

Then('the CFC bundle should be added to the order', { timeout: 240 * 1000 }, async function() {
    const bundleInOrder = await this.cfcPage.verifyCFCBundleInOrder();
    assert.isTrue(bundleInOrder, 'CFC bundle should be present in the order');
});

Then('the CFC component should be available but not activated', { timeout: 240 * 1000 }, async function() {
    const componentAvailable = await this.cfcPage.verifyCFCComponentAvailable();
    const componentNotActivated = await this.cfcPage.verifyCFCComponentNotActivated();
    assert.isTrue(componentAvailable, 'CFC component should be available');
    assert.isTrue(componentNotActivated, 'CFC component should not be activated');
});

Then('the {string} property should be set in installation context', { timeout: 240 * 1000 }, async function(propertyName) {
    const propertyExists = await this.cfcPage.verifyPropertyInInstallationContext(propertyName);
    assert.isTrue(propertyExists, `Property ${propertyName} should exist in installation context`);
});

Then('the CFC task should appear in the to-do task list', { timeout: 240 * 1000 }, async function() {
    const taskExists = await this.cfcPage.verifyCFCTaskInTodoList();
    assert.isTrue(taskExists, 'CFC task should appear in to-do task list');
});

Then('the existing CFC bundle should remain unchanged', { timeout: 240 * 1000 }, async function() {
    const bundleUnchanged = await this.cfcPage.verifyExistingCFCBundleUnchanged();
    assert.isTrue(bundleUnchanged, 'Existing CFC bundle should remain unchanged');
});

Then('the {string} property should include the CFC bundle', { timeout: 240 * 1000 }, async function(propertyName) {
    const propertyIncludesCFC = await this.cfcPage.verifyPropertyIncludesCFCBundle(propertyName);
    assert.isTrue(propertyIncludesCFC, `Property ${propertyName} should include CFC bundle`);
});

Then('the {string} property should exist in installation context', { timeout: 240 * 1000 }, async function(propertyName) {
    const propertyExists = await this.cfcPage.verifyPropertyExists(propertyName);
    assert.isTrue(propertyExists, `Property ${propertyName} should exist in installation context`);
});

Then('the property should contain non-activated bundles', { timeout: 240 * 1000 }, async function() {
    const containsNonActivatedBundles = await this.cfcPage.verifyPropertyContainsNonActivatedBundles();
    assert.isTrue(containsNonActivatedBundles, 'Property should contain non-activated bundles');
});

Then('the property should be available in core context wrapper', { timeout: 240 * 1000 }, async function() {
    const availableInCoreContext = await this.cfcPage.verifyPropertyInCoreContextWrapper();
    assert.isTrue(availableInCoreContext, 'Property should be available in core context wrapper');
});

Then('the property should be visible in system model', { timeout: 240 * 1000 }, async function() {
    const visibleInSystemModel = await this.cfcPage.verifyPropertyInSystemModel();
    assert.isTrue(visibleInSystemModel, 'Property should be visible in system model');
});

Then('the property should be configured in index_Config file', { timeout: 240 * 1000 }, async function() {
    const configuredInIndexConfig = await this.cfcPage.verifyPropertyInIndexConfig();
    assert.isTrue(configuredInIndexConfig, 'Property should be configured in index_Config file');
});

Then('the property should be accessible in top.run.context', { timeout: 240 * 1000 }, async function() {
    const accessibleInTopRunContext = await this.cfcPage.verifyPropertyInTopRunContext();
    assert.isTrue(accessibleInTopRunContext, 'Property should be accessible in top.run.context');
});

Then('the property should be present in nextgen installation context', { timeout: 240 * 1000 }, async function() {
    const presentInNextgenContext = await this.cfcPage.verifyPropertyInNextgenContext();
    assert.isTrue(presentInNextgenContext, 'Property should be present in nextgen installation context');
});

Then('detailed logs should be generated for the CFC component', { timeout: 240 * 1000 }, async function() {
    const logsGenerated = await this.cfcPage.verifyDetailedLogsGenerated();
    assert.isTrue(logsGenerated, 'Detailed logs should be generated for CFC component');
});

Then('the logs should include component availability events', { timeout: 240 * 1000 }, async function() {
    const availabilityEventsLogged = await this.cfcPage.verifyAvailabilityEventsInLogs();
    assert.isTrue(availabilityEventsLogged, 'Logs should include component availability events');
});

Then('the logs should track the RequireActivation property', { timeout: 240 * 1000 }, async function() {
    const requireActivationTracked = await this.cfcPage.verifyRequireActivationInLogs();
    assert.isTrue(requireActivationTracked, 'Logs should track RequireActivation property');
});

Then('a CFC task should be created automatically', { timeout: 240 * 1000 }, async function() {
    const taskCreated = await this.cfcPage.verifyCFCTaskCreated();
    assert.isTrue(taskCreated, 'CFC task should be created automatically');
});

Then('the task should be associated with the correct IID', { timeout: 240 * 1000 }, async function() {
    const taskAssociatedWithIID = await this.cfcPage.verifyTaskAssociatedWithIID();
    assert.isTrue(taskAssociatedWithIID, 'Task should be associated with correct IID');
});
