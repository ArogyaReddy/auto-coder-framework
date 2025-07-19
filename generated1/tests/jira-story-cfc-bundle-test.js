const { test, expect } = require('@playwright/test');
const CfcBundlePage = require('../pages/jira-story-cfc-bundle-page');

test.describe('CFC Bundle Provisioning Tests', () => {
    let cfcBundlePage;

    test.beforeEach(async ({ page }) => {
        cfcBundlePage = new CfcBundlePage(page);
        await cfcBundlePage.navigateToLoginPage();
        await cfcBundlePage.performLogin('testuser', 'testpass');
    });

    test('Should add CFC bundle automatically for ESO order with major bundles', async () => {
        await cfcBundlePage.navigateToOrderProvisioning();
        await cfcBundlePage.createEsoOrderWithoutCfcBundle();
        await cfcBundlePage.addMajorBundleToOrder('ADP Essential');
        
        await cfcBundlePage.executeOrderProvisioning();
        
        const cfcBundleAdded = await cfcBundlePage.verifyCfcBundleAutoAdded();
        const componentAvailable = await cfcBundlePage.verifyCfcComponentAvailable();
        const componentNotActivated = await cfcBundlePage.verifyCfcComponentNotActivated();
        
        expect(cfcBundleAdded).toBe(true);
        expect(componentAvailable).toBe(true);
        expect(componentNotActivated).toBe(true);
    });

    test('Should handle ESO order that already contains CFC bundle', async () => {
        await cfcBundlePage.navigateToOrderProvisioning();
        await cfcBundlePage.createEsoOrderWithCfcBundle();
        await cfcBundlePage.addMajorBundleToOrder('Run Complete and HR');
        
        await cfcBundlePage.executeOrderProvisioning();
        
        const bundleProcessed = await cfcBundlePage.verifyCfcBundleProcessed();
        const noDuplicates = await cfcBundlePage.verifyNoDuplicateBundleEntries();
        const componentNotActivated = await cfcBundlePage.verifyCfcComponentNotActivated();
        
        expect(bundleProcessed).toBe(true);
        expect(noDuplicates).toBe(true);
        expect(componentNotActivated).toBe(true);
    });

    test('Should verify installation context properties after provisioning', async () => {
        await cfcBundlePage.navigateToOrderProvisioning();
        await cfcBundlePage.createEsoOrderWithoutCfcBundle();
        await cfcBundlePage.addMajorBundleToOrder('HR PRO');
        await cfcBundlePage.executeOrderProvisioning();
        
        await cfcBundlePage.navigateToInstallationContext();
        
        const propertyPresent = await cfcBundlePage.verifyAvailableBundlesPropertyPresent();
        const containsCfcInfo = await cfcBundlePage.verifyPropertyContainsCfcInfo();
        const bundlesAvailable = await cfcBundlePage.verifyBundlesInAvailableState();
        const bundlesNotActivated = await cfcBundlePage.verifyBundlesNotActivated();
        const requireActivationConfigured = await cfcBundlePage.verifyRequireActivationProperty();
        
        expect(propertyPresent).toBe(true);
        expect(containsCfcInfo).toBe(true);
        expect(bundlesAvailable).toBe(true);
        expect(bundlesNotActivated).toBe(true);
        expect(requireActivationConfigured).toBe(true);
    });

    test('Should create CFC task when component becomes available', async () => {
        await cfcBundlePage.navigateToOrderProvisioning();
        await cfcBundlePage.createEsoOrderWithoutCfcBundle();
        await cfcBundlePage.addMajorBundleToOrder('Run Complete and HRPLUS');
        await cfcBundlePage.executeOrderProvisioning();
        
        await cfcBundlePage.processComponentStatusChange();
        
        const taskCreated = await cfcBundlePage.verifyCfcTaskCreated();
        const taskVisible = await cfcBundlePage.verifyCfcTaskInTodoList();
        const taskIndicatesStatus = await cfcBundlePage.verifyTaskIndicatesAvailabilityStatus();
        const logsRecorded = await cfcBundlePage.verifyTaskCreationLogs();
        
        expect(taskCreated).toBe(true);
        expect(taskVisible).toBe(true);
        expect(taskIndicatesStatus).toBe(true);
        expect(logsRecorded).toBe(true);
    });

    test('Should display available bundles in core context wrapper', async () => {
        await cfcBundlePage.navigateToOrderProvisioning();
        await cfcBundlePage.createEsoOrderWithCfcBundle();
        await cfcBundlePage.executeOrderProvisioning();
        
        await cfcBundlePage.navigateToCoreContextWrapper();
        
        const bundlesDisplayed = await cfcBundlePage.verifyAvailableBundlesDisplayed();
        const cfcInList = await cfcBundlePage.verifyCfcBundleInAvailableList();
        const statusCorrect = await cfcBundlePage.verifyBundleStatusAvailableNotActivated();
        
        expect(bundlesDisplayed).toBe(true);
        expect(cfcInList).toBe(true);
        expect(statusCorrect).toBe(true);
    });

    test('Should verify system model and configuration updates', async () => {
        await cfcBundlePage.navigateToSystemModelProperties();
        
        const propertyInSystemModel = await cfcBundlePage.verifyPropertyInSystemModel();
        const configDisplaysBundles = await cfcBundlePage.verifyIndexConfigDisplaysBundles();
        const nextgenIncludesProperty = await cfcBundlePage.verifyNextgenIncludesProperty();
        
        expect(propertyInSystemModel).toBe(true);
        expect(configDisplaysBundles).toBe(true);
        expect(nextgenIncludesProperty).toBe(true);
    });

    test('Should handle provisioning errors gracefully', async () => {
        await cfcBundlePage.navigateToOrderProvisioning();
        await cfcBundlePage.createEsoOrderWithInvalidConfiguration();
        
        await cfcBundlePage.simulateProvisioningError();
        
        const errorHandled = await cfcBundlePage.verifyErrorHandledGracefully();
        const errorMessagesLogged = await cfcBundlePage.verifyErrorMessagesLogged();
        const statusReflectsError = await cfcBundlePage.verifyOrderStatusReflectsError();
        const noPartialAdditions = await cfcBundlePage.verifyNoPartialBundleAdditions();
        
        expect(errorHandled).toBe(true);
        expect(errorMessagesLogged).toBe(true);
        expect(statusReflectsError).toBe(true);
        expect(noPartialAdditions).toBe(true);
    });

    test('Should ensure bundle addition does not trigger activation', async () => {
        await cfcBundlePage.navigateToOrderProvisioning();
        await cfcBundlePage.createEsoOrderWithoutCfcBundle();
        await cfcBundlePage.initiateCfcBundleAddition();
        
        await cfcBundlePage.waitForBundleAdditionCompletion();
        
        const componentAvailableOnly = await cfcBundlePage.verifyComponentInAvailableStateOnly();
        const componentNotActivated = await cfcBundlePage.verifyComponentNotActivated();
        const propertyPreventsActivation = await cfcBundlePage.verifyRequireActivationPreventsAutoActivation();
        const statusDistinguishable = await cfcBundlePage.verifyComponentStatusDistinguishable();
        
        expect(componentAvailableOnly).toBe(true);
        expect(componentNotActivated).toBe(true);
        expect(propertyPreventsActivation).toBe(true);
        expect(statusDistinguishable).toBe(true);
    });

    test.describe('Bundle Type Variations', () => {
        const bundleTypes = [
            'ADP Essential',
            'Run Complete and HR',
            'Run Complete and HRPLUS',
            'HR PRO'
        ];

        bundleTypes.forEach(bundleType => {
            test(`Should handle ${bundleType} major bundle`, async () => {
                await cfcBundlePage.navigateToOrderProvisioning();
                await cfcBundlePage.createEsoOrderWithoutCfcBundle();
                await cfcBundlePage.addMajorBundleToOrder(bundleType);
                
                await cfcBundlePage.executeOrderProvisioning();
                
                const cfcBundleAdded = await cfcBundlePage.verifyCfcBundleAutoAdded();
                const componentNotActivated = await cfcBundlePage.verifyCfcComponentNotActivated();
                const provisioningSuccess = await cfcBundlePage.verifyProvisioningSuccess();
                
                expect(cfcBundleAdded).toBe(true);
                expect(componentNotActivated).toBe(true);
                expect(provisioningSuccess).toBe(true);
            });
        });
    });

    test.describe('Integration Tests', () => {
        test('Should verify complete CFC bundle workflow', async () => {
            // Step 1: Create order with major bundle
            await cfcBundlePage.navigateToOrderProvisioning();
            await cfcBundlePage.createEsoOrderWithoutCfcBundle();
            await cfcBundlePage.addMajorBundleToOrder('ADP Essential');
            
            // Step 2: Execute provisioning
            await cfcBundlePage.executeOrderProvisioning();
            
            // Step 3: Verify bundle addition
            const cfcBundleAdded = await cfcBundlePage.verifyCfcBundleAutoAdded();
            expect(cfcBundleAdded).toBe(true);
            
            // Step 4: Verify installation context
            await cfcBundlePage.navigateToInstallationContext();
            const propertyPresent = await cfcBundlePage.verifyAvailableBundlesPropertyPresent();
            expect(propertyPresent).toBe(true);
            
            // Step 5: Verify task creation
            const taskCreated = await cfcBundlePage.verifyCfcTaskCreated();
            expect(taskCreated).toBe(true);
            
            // Step 6: Verify component status
            const componentAvailable = await cfcBundlePage.verifyCfcComponentAvailable();
            const componentNotActivated = await cfcBundlePage.verifyCfcComponentNotActivated();
            expect(componentAvailable).toBe(true);
            expect(componentNotActivated).toBe(true);
        });
    });
});
