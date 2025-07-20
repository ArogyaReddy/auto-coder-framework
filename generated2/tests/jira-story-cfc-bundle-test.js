const { test, expect } = require('@playwright/test');
const CFCBundlePage = require('../pages/jira-story-cfc-bundle-page');

test.describe('CFC Bundle Provisioning Tests', () => {
    let cfcPage;

    test.beforeEach(async ({ page }) => {
        cfcPage = new CFCBundlePage(page);
        await cfcPage.navigateToOrderProvisioning();
    });

    test('Add CFC bundle for ESO order without CFC bundle', async ({ page }) => {
        // Given an ESO order exists without CFC bundle
        await cfcPage.createESOOrder();
        await cfcPage.excludeCFCBundle();
        
        // And the order contains major bundles
        const majorBundles = [
            { 'Bundle Type': 'Adp Essential' },
            { 'Bundle Type': 'Run Complete and HR' },
            { 'Bundle Type': 'Run Complete and HRPLUS' },
            { 'Bundle Type': 'HR PRO' }
        ];
        await cfcPage.addMajorBundles(majorBundles);
        
        // When the order provisioning process starts
        await cfcPage.startOrderProvisioning();
        
        // Then the CFC bundle should be added to the order
        const bundleAdded = await cfcPage.verifyCFCBundleInOrder();
        expect(bundleAdded).toBeTruthy();
        
        // And the CFC component should be available but not activated
        const componentAvailable = await cfcPage.verifyCFCComponentAvailable();
        const componentNotActivated = await cfcPage.verifyCFCComponentNotActivated();
        expect(componentAvailable).toBeTruthy();
        expect(componentNotActivated).toBeTruthy();
        
        // And the "avilableBundles" property should be set in installation context
        const propertySet = await cfcPage.verifyPropertyInInstallationContext('avilableBundles');
        expect(propertySet).toBeTruthy();
        
        // And the CFC task should appear in the to-do task list
        const taskExists = await cfcPage.verifyCFCTaskInTodoList();
        expect(taskExists).toBeTruthy();
    });

    test('Process ESO order with existing CFC bundle', async ({ page }) => {
        // Given an ESO order exists with CFC bundle already included
        await cfcPage.createESOOrderWithCFC();
        
        // And the order contains major bundles
        await cfcPage.addStandardMajorBundles();
        
        // When the order provisioning process starts
        await cfcPage.startOrderProvisioning();
        
        // Then the existing CFC bundle should remain unchanged
        const bundleUnchanged = await cfcPage.verifyExistingCFCBundleUnchanged();
        expect(bundleUnchanged).toBeTruthy();
        
        // And the CFC component should be available but not activated
        const componentAvailable = await cfcPage.verifyCFCComponentAvailable();
        const componentNotActivated = await cfcPage.verifyCFCComponentNotActivated();
        expect(componentAvailable).toBeTruthy();
        expect(componentNotActivated).toBeTruthy();
        
        // And the "avilableBundles" property should include the CFC bundle
        const propertyIncludesCFC = await cfcPage.verifyPropertyIncludesCFCBundle('avilableBundles');
        expect(propertyIncludesCFC).toBeTruthy();
    });

    test('Verify new properties in installation context', async ({ page }) => {
        // Given the installation context is initialized
        await cfcPage.initializeInstallationContext();
        
        // When the CFC bundle is added during provisioning
        await cfcPage.addCFCBundleDuringProvisioning();
        
        // Then the "avilableBundles" property should exist in installation context
        const propertyExists = await cfcPage.verifyPropertyExists('avilableBundles');
        expect(propertyExists).toBeTruthy();
        
        // And the property should contain non-activated bundles
        const containsNonActivated = await cfcPage.verifyPropertyContainsNonActivatedBundles();
        expect(containsNonActivated).toBeTruthy();
        
        // And the property should be available in core context wrapper
        const inCoreContext = await cfcPage.verifyPropertyInCoreContextWrapper();
        expect(inCoreContext).toBeTruthy();
        
        // And the property should be visible in system model
        const inSystemModel = await cfcPage.verifyPropertyInSystemModel();
        expect(inSystemModel).toBeTruthy();
        
        // And the property should be configured in index_Config file
        const inIndexConfig = await cfcPage.verifyPropertyInIndexConfig();
        expect(inIndexConfig).toBeTruthy();
        
        // And the property should be accessible in top.run.context
        const inTopRunContext = await cfcPage.verifyPropertyInTopRunContext();
        expect(inTopRunContext).toBeTruthy();
        
        // And the property should be present in nextgen installation context
        const inNextgenContext = await cfcPage.verifyPropertyInNextgenContext();
        expect(inNextgenContext).toBeTruthy();
    });

    test('Verify CFC component subscriber logging', async ({ page }) => {
        // Given the CFC component subscriber is active
        await cfcPage.activateCFCComponentSubscriber();
        
        // When the CFC bundle becomes available
        await cfcPage.waitForCFCBundleAvailability();
        
        // Then detailed logs should be generated for the CFC component
        const logsGenerated = await cfcPage.verifyDetailedLogsGenerated();
        expect(logsGenerated).toBeTruthy();
        
        // And the logs should include component availability events
        const availabilityEventsLogged = await cfcPage.verifyAvailabilityEventsInLogs();
        expect(availabilityEventsLogged).toBeTruthy();
        
        // And the logs should track the RequireActivation property
        const requireActivationTracked = await cfcPage.verifyRequireActivationInLogs();
        expect(requireActivationTracked).toBeTruthy();
    });

    test('CFC task creation on component availability', async ({ page }) => {
        // Given the CFC bundle has been added to the order
        await cfcPage.addCFCBundleToOrder();
        
        // When the CFC component becomes available
        await cfcPage.waitForCFCComponentAvailability();
        
        // Then a CFC task should be created automatically
        const taskCreated = await cfcPage.verifyCFCTaskCreated();
        expect(taskCreated).toBeTruthy();
        
        // And the task should appear in the to-do task list
        const taskInList = await cfcPage.verifyCFCTaskInTodoList();
        expect(taskInList).toBeTruthy();
        
        // And the task should be associated with the correct IID
        const taskAssociatedWithIID = await cfcPage.verifyTaskAssociatedWithIID();
        expect(taskAssociatedWithIID).toBeTruthy();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});
