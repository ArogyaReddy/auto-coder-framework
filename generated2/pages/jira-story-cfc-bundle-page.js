const BasePage = require('../../support/common/base-page');

class CFCBundlePage extends BasePage {
    constructor(page) {
        super(page);
        
        // Order Provisioning Elements
        this.orderProvisioningSection = '[data-testid="order-provisioning-section"]';
        this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
        this.createOrderButton = '[data-testid="create-order-button"]';
        this.esoOrderForm = '[data-testid="eso-order-form"]';
        
        // Bundle Selection Elements
        this.bundleSelectionPanel = '[data-testid="bundle-selection-panel"]';
        this.cfcBundleCheckbox = '[data-testid="cfc-bundle-checkbox"]';
        this.adpEssentialCheckbox = '[data-testid="adp-essential-checkbox"]';
        this.runCompleteHRCheckbox = '[data-testid="run-complete-hr-checkbox"]';
        this.runCompleteHRPlusCheckbox = '[data-testid="run-complete-hrplus-checkbox"]';
        this.hrProCheckbox = '[data-testid="hr-pro-checkbox"]';
        
        // Installation Context Elements
        this.installationContextPanel = '[data-testid="installation-context-panel"]';
        this.availableBundlesProperty = '[data-testid="available-bundles-property"]';
        this.requireActivationProperty = '[data-testid="require-activation-property"]';
        this.contextConfigurationButton = '[data-testid="context-configuration-button"]';
        
        // Component Status Elements
        this.componentStatusPanel = '[data-testid="component-status-panel"]';
        this.cfcComponentStatus = '[data-testid="cfc-component-status"]';
        this.componentAvailabilityIndicator = '[data-testid="component-availability-indicator"]';
        this.componentActivationStatus = '[data-testid="component-activation-status"]';
        
        // Task Management Elements
        this.todoTaskList = '[data-testid="todo-task-list"]';
        this.cfcTask = '[data-testid="cfc-task"]';
        this.taskCreationPanel = '[data-testid="task-creation-panel"]';
        this.taskIIDAssociation = '[data-testid="task-iid-association"]';
        
        // Logging Elements
        this.logViewerPanel = '[data-testid="log-viewer-panel"]';
        this.cfcComponentLogs = '[data-testid="cfc-component-logs"]';
        this.availabilityEventLogs = '[data-testid="availability-event-logs"]';
        this.requireActivationLogs = '[data-testid="require-activation-logs"]';
        
        // Context Property Elements
        this.coreContextWrapper = '[data-testid="core-context-wrapper"]';
        this.systemModelViewer = '[data-testid="system-model-viewer"]';
        this.indexConfigDisplay = '[data-testid="index-config-display"]';
        this.topRunContextPanel = '[data-testid="top-run-context-panel"]';
        this.nextgenContextViewer = '[data-testid="nextgen-context-viewer"]';
        
        // Provisioning Process Elements
        this.startProvisioningButton = '[data-testid="start-provisioning-button"]';
        this.provisioningStatusIndicator = '[data-testid="provisioning-status-indicator"]';
        this.provisioningProgressBar = '[data-testid="provisioning-progress-bar"]';
    }
    
    async navigateToOrderProvisioning() {
        await this.navigate('/order-provisioning');
        await this.waitForElement(this.orderProvisioningSection);
    }
    
    async verifySystemAvailability() {
        await this.waitForElement(this.systemStatusIndicator);
        const status = await this.getText(this.systemStatusIndicator);
        return status.includes('Available') || status.includes('Online');
    }
    
    async configureInstallationContext() {
        await this.click(this.contextConfigurationButton);
        await this.waitForElement(this.installationContextPanel);
    }
    
    async verifyInstallationContext() {
        const contextPanel = await this.isElementVisible(this.installationContextPanel);
        return contextPanel;
    }
    
    async createESOOrder() {
        await this.click(this.createOrderButton);
        await this.waitForElement(this.esoOrderForm);
        await this.fillForm(this.esoOrderForm, {
            orderType: 'ESO',
            orderPriority: 'Standard'
        });
    }
    
    async excludeCFCBundle() {
        await this.waitForElement(this.cfcBundleCheckbox);
        const isChecked = await this.isChecked(this.cfcBundleCheckbox);
        await this.click(this.cfcBundleCheckbox);
    }
    
    async verifyESOOrderExists() {
        const orderForm = await this.isElementVisible(this.esoOrderForm);
        const cfcNotSelected = !(await this.isChecked(this.cfcBundleCheckbox));
        return orderForm && cfcNotSelected;
    }
    
    async addMajorBundles(bundles) {
        await this.waitForElement(this.bundleSelectionPanel);
        for (const bundle of bundles) {
            const bundleType = bundle['Bundle Type'];
            switch (bundleType) {
                case 'Adp Essential':
                    await this.click(this.adpEssentialCheckbox);
                    break;
                case 'Run Complete and HR':
                    await this.click(this.runCompleteHRCheckbox);
                    break;
                case 'Run Complete and HRPLUS':
                    await this.click(this.runCompleteHRPlusCheckbox);
                    break;
                case 'HR PRO':
                    await this.click(this.hrProCheckbox);
                    break;
            }
        }
    }
    
    async verifyMajorBundles(bundles) {
        for (const bundle of bundles) {
            const bundleType = bundle['Bundle Type'];
            let checkbox;
            switch (bundleType) {
                case 'Adp Essential':
                    checkbox = this.adpEssentialCheckbox;
                    break;
                case 'Run Complete and HR':
                    checkbox = this.runCompleteHRCheckbox;
                    break;
                case 'Run Complete and HRPLUS':
                    checkbox = this.runCompleteHRPlusCheckbox;
                    break;
                case 'HR PRO':
                    checkbox = this.hrProCheckbox;
                    break;
            }
            const isSelected = await this.isChecked(checkbox);
            assert.isTrue(isSelected, `Bundle ${bundleType} should be selected`);
        }
        return true;
    }
    
    async createESOOrderWithCFC() {
        await this.createESOOrder();
        await this.click(this.cfcBundleCheckbox);
    }
    
    async verifyESOOrderWithCFC() {
        const orderExists = await this.isElementVisible(this.esoOrderForm);
        const cfcSelected = await this.isChecked(this.cfcBundleCheckbox);
        return orderExists && cfcSelected;
    }
    
    async addStandardMajorBundles() {
        await this.click(this.adpEssentialCheckbox);
        await this.click(this.runCompleteHRCheckbox);
        await this.click(this.hrProCheckbox);
    }
    
    async verifyMajorBundlesPresent() {
        const adpSelected = await this.isChecked(this.adpEssentialCheckbox);
        const hrSelected = await this.isChecked(this.runCompleteHRCheckbox);
        const proSelected = await this.isChecked(this.hrProCheckbox);
        return adpSelected && hrSelected && proSelected;
    }
    
    async initializeInstallationContext() {
        await this.click(this.contextConfigurationButton);
        await this.waitForElement(this.installationContextPanel);
    }
    
    async verifyContextInitialization() {
        return await this.isElementVisible(this.installationContextPanel);
    }
    
    async activateCFCComponentSubscriber() {
        await this.waitForElement(this.componentStatusPanel);
        const subscriberButton = '[data-testid="activate-cfc-subscriber-button"]';
        await this.click(subscriberButton);
    }
    
    async verifyCFCSubscriberActive() {
        const subscriberStatus = '[data-testid="cfc-subscriber-status"]';
        await this.waitForElement(subscriberStatus);
        const status = await this.getText(subscriberStatus);
        return status.includes('Active') || status.includes('Running');
    }
    
    async addCFCBundleToOrder() {
        await this.waitForElement(this.cfcBundleCheckbox);
        await this.click(this.cfcBundleCheckbox);
    }
    
    async verifyCFCBundleInOrder() {
        return await this.isChecked(this.cfcBundleCheckbox);
    }
    
    async startOrderProvisioning() {
        await this.click(this.startProvisioningButton);
        await this.waitForElement(this.provisioningStatusIndicator);
    }
    
    async verifyProvisioningStarted() {
        const status = await this.getText(this.provisioningStatusIndicator);
        return status.includes('In Progress') || status.includes('Started');
    }
    
    async addCFCBundleDuringProvisioning() {
        await this.waitForElement(this.provisioningProgressBar);
        await this.click(this.cfcBundleCheckbox);
    }
    
    async verifyCFCBundleAddedDuringProvisioning() {
        const bundleSelected = await this.isChecked(this.cfcBundleCheckbox);
        const provisioningActive = await this.isElementVisible(this.provisioningProgressBar);
        return bundleSelected && provisioningActive;
    }
    
    async waitForCFCBundleAvailability() {
        await this.waitForElement(this.componentAvailabilityIndicator);
        await this.waitForText(this.componentAvailabilityIndicator, 'Available');
    }
    
    async verifyCFCBundleAvailable() {
        const indicator = await this.getText(this.componentAvailabilityIndicator);
        return indicator.includes('Available');
    }
    
    async waitForCFCComponentAvailability() {
        await this.waitForElement(this.cfcComponentStatus);
        await this.waitForText(this.cfcComponentStatus, 'Available');
    }
    
    async verifyCFCComponentAvailable() {
        const status = await this.getText(this.cfcComponentStatus);
        return status.includes('Available');
    }
    
    async verifyCFCComponentNotActivated() {
        const activationStatus = await this.getText(this.componentActivationStatus);
        return activationStatus.includes('Not Activated') || activationStatus.includes('Inactive');
    }
    
    async verifyPropertyInInstallationContext(propertyName) {
        const propertyElement = `[data-testid="${propertyName}-property"]`;
        await this.waitForElement(propertyElement);
        return await this.isElementVisible(propertyElement);
    }
    
    async verifyCFCTaskInTodoList() {
        await this.waitForElement(this.todoTaskList);
        return await this.isElementVisible(this.cfcTask);
    }
    
    async verifyExistingCFCBundleUnchanged() {
        const bundleStatus = await this.getText(this.cfcComponentStatus);
        return bundleStatus.includes('Unchanged') || bundleStatus.includes('Existing');
    }
    
    async verifyPropertyIncludesCFCBundle(propertyName) {
        const propertyElement = `[data-testid="${propertyName}-property"]`;
        const propertyValue = await this.getText(propertyElement);
        return propertyValue.includes('CFC') || propertyValue.includes('cfc');
    }
    
    async verifyPropertyExists(propertyName) {
        const propertyElement = `[data-testid="${propertyName}-property"]`;
        return await this.isElementVisible(propertyElement);
    }
    
    async verifyPropertyContainsNonActivatedBundles() {
        const propertyValue = await this.getText(this.availableBundlesProperty);
        return propertyValue.includes('non-activated') || propertyValue.includes('available');
    }
    
    async verifyPropertyInCoreContextWrapper() {
        await this.waitForElement(this.coreContextWrapper);
        return await this.isElementVisible(this.availableBundlesProperty);
    }
    
    async verifyPropertyInSystemModel() {
        await this.waitForElement(this.systemModelViewer);
        return await this.isElementVisible(this.availableBundlesProperty);
    }
    
    async verifyPropertyInIndexConfig() {
        await this.waitForElement(this.indexConfigDisplay);
        return await this.isElementVisible(this.availableBundlesProperty);
    }
    
    async verifyPropertyInTopRunContext() {
        await this.waitForElement(this.topRunContextPanel);
        return await this.isElementVisible(this.availableBundlesProperty);
    }
    
    async verifyPropertyInNextgenContext() {
        await this.waitForElement(this.nextgenContextViewer);
        return await this.isElementVisible(this.availableBundlesProperty);
    }
    
    async verifyDetailedLogsGenerated() {
        await this.waitForElement(this.logViewerPanel);
        return await this.isElementVisible(this.cfcComponentLogs);
    }
    
    async verifyAvailabilityEventsInLogs() {
        await this.waitForElement(this.availabilityEventLogs);
        const logContent = await this.getText(this.availabilityEventLogs);
        return logContent.includes('availability') || logContent.includes('component available');
    }
    
    async verifyRequireActivationInLogs() {
        await this.waitForElement(this.requireActivationLogs);
        const logContent = await this.getText(this.requireActivationLogs);
        return logContent.includes('RequireActivation') || logContent.includes('activation required');
    }
    
    async verifyCFCTaskCreated() {
        await this.waitForElement(this.taskCreationPanel);
        return await this.isElementVisible(this.cfcTask);
    }
    
    async verifyTaskAssociatedWithIID() {
        const taskIID = await this.getText(this.taskIIDAssociation);
        return taskIID && taskIID.length > 0;
    }
}

module.exports = CFCBundlePage;
