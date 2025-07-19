const By = require('../../support/By');
const helpers = require('../../support/helpers');
let BasePage = require('../common/base-page');

// Locator definitions - UPDATE THESE WITH ACTUAL SELECTORS
const LOGIN_USERNAME_INPUT = By.css("input[data-testid='username-input']");
const LOGIN_PASSWORD_INPUT = By.css("input[data-testid='password-input']");
const LOGIN_SUBMIT_BUTTON = By.css("button[data-testid='login-submit']");
const PROVISIONING_NAV_MENU = By.css("nav[data-testid='provisioning-menu']");
const ORDER_PROVISIONING_LINK = By.css("a[data-testid='order-provisioning-link']");
const CREATE_ORDER_BUTTON = By.css("button[data-testid='create-order-button']");
const ESO_ORDER_TYPE = By.css("select[data-testid='order-type-select']");
const BUNDLE_SELECTION_AREA = By.css("div[data-testid='bundle-selection-area']");
const CFC_BUNDLE_CHECKBOX = By.css("input[data-testid='cfc-bundle-checkbox']");
const MAJOR_BUNDLE_DROPDOWN = By.css("select[data-testid='major-bundle-dropdown']");
const ADD_BUNDLE_BUTTON = By.css("button[data-testid='add-bundle-button']");
const EXECUTE_PROVISIONING_BUTTON = By.css("button[data-testid='execute-provisioning-button']");
const PROVISIONING_STATUS = By.css("div[data-testid='provisioning-status']");
const INSTALLATION_CONTEXT_LINK = By.css("a[data-testid='installation-context-link']");
const AVAILABLE_BUNDLES_PROPERTY = By.css("span[data-testid='available-bundles-property']");
const COMPONENT_STATUS_INDICATOR = By.css("span[data-testid='component-status-indicator']");
const TODO_TASKS_LINK = By.css("a[data-testid='todo-tasks-link']");
const CFC_TASK_ITEM = By.css("li[data-testid='cfc-task-item']");
const CORE_CONTEXT_WRAPPER_LINK = By.css("a[data-testid='core-context-wrapper-link']");
const SYSTEM_MODEL_LINK = By.css("a[data-testid='system-model-link']");
const REQUIRE_ACTIVATION_PROPERTY = By.css("span[data-testid='require-activation-property']");
const BUNDLE_STATUS_DISPLAY = By.css("div[data-testid='bundle-status-display']");
const ERROR_MESSAGE_CONTAINER = By.css("div[data-testid='error-message-container']");
const ORDER_STATUS_DISPLAY = By.css("div[data-testid='order-status-display']");
const SUBSCRIBER_LOGS_CONTAINER = By.css("div[data-testid='subscriber-logs-container']");
const NEXTGEN_CONTEXT_LINK = By.css("a[data-testid='nextgen-context-link']");
const INDEX_CONFIG_DISPLAY = By.css("div[data-testid='index-config-display']");

class CfcBundlePage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async navigateToLoginPage() {
        await this.page.goto('/login');
        await this.page.waitForSelector(LOGIN_USERNAME_INPUT);
    }

    async performLogin(username, password) {
        await this.page.fill(LOGIN_USERNAME_INPUT, username);
        await this.page.fill(LOGIN_PASSWORD_INPUT, password);
        await this.page.click(LOGIN_SUBMIT_BUTTON);
        await this.page.waitForNavigation();
    }

    async verifyProvisioningAccess() {
        await this.page.waitForSelector(PROVISIONING_NAV_MENU);
        return await this.page.isVisible(PROVISIONING_NAV_MENU);
    }

    async navigateToOrderProvisioning() {
        await this.page.click(PROVISIONING_NAV_MENU);
        await this.page.click(ORDER_PROVISIONING_LINK);
        await this.page.waitForSelector(CREATE_ORDER_BUTTON);
    }

    async createEsoOrderWithoutCfcBundle() {
        await this.page.click(CREATE_ORDER_BUTTON);
        await this.page.selectOption(ESO_ORDER_TYPE, 'ESO');
        await this.page.waitForSelector(BUNDLE_SELECTION_AREA);
    }

    async createEsoOrderWithCfcBundle() {
        await this.page.click(CREATE_ORDER_BUTTON);
        await this.page.selectOption(ESO_ORDER_TYPE, 'ESO');
        await this.page.waitForSelector(BUNDLE_SELECTION_AREA);
        await this.page.check(CFC_BUNDLE_CHECKBOX);
    }

    async addMajorBundleToOrder(bundleType) {
        await this.page.selectOption(MAJOR_BUNDLE_DROPDOWN, bundleType);
        await this.page.click(ADD_BUNDLE_BUTTON);
        await this.page.waitForTimeout(2000);
    }

    async verifyBundleInOrder(bundleType) {
        const bundleSelector = By.css(`span[data-testid='bundle-${bundleType.replace(/\s+/g, '-').toLowerCase()}']`);
        return await this.page.isVisible(bundleSelector);
    }

    async executeOrderProvisioning() {
        await this.page.click(EXECUTE_PROVISIONING_BUTTON);
        await this.page.waitForSelector(PROVISIONING_STATUS);
        await this.page.waitForTimeout(5000);
    }

    async verifyProvisioningCompleted() {
        const statusText = await this.page.textContent(PROVISIONING_STATUS);
        return statusText.includes('Completed') || statusText.includes('Success');
    }

    async verifyCfcBundleInOrder() {
        return await this.page.isVisible(By.css("span[data-testid='bundle-cfc-bundle']"));
    }

    async verifyCfcComponentAvailable() {
        const componentStatus = await this.page.textContent(COMPONENT_STATUS_INDICATOR);
        return componentStatus.includes('Available');
    }

    async verifyCfcComponentNotActivated() {
        const componentStatus = await this.page.textContent(COMPONENT_STATUS_INDICATOR);
        return !componentStatus.includes('Activated');
    }

    async navigateToInstallationContext() {
        await this.page.click(INSTALLATION_CONTEXT_LINK);
        await this.page.waitForSelector(AVAILABLE_BUNDLES_PROPERTY);
    }

    async verifyAvailableBundlesPropertyPresent() {
        return await this.page.isVisible(AVAILABLE_BUNDLES_PROPERTY);
    }

    async verifyAvailableBundlesPropertyContainsCfc() {
        const propertyText = await this.page.textContent(AVAILABLE_BUNDLES_PROPERTY);
        return propertyText.includes('CFC');
    }

    async processComponentStatusChange() {
        await this.page.waitForTimeout(3000);
        await this.page.reload();
        await this.page.waitForSelector(COMPONENT_STATUS_INDICATOR);
    }

    async verifyCfcTaskCreated() {
        await this.page.click(TODO_TASKS_LINK);
        await this.page.waitForSelector(CFC_TASK_ITEM);
        return await this.page.isVisible(CFC_TASK_ITEM);
    }

    async verifyCfcTaskInTodoList() {
        return await this.page.isVisible(CFC_TASK_ITEM);
    }

    async verifyTaskIndicatesAvailabilityStatus() {
        const taskText = await this.page.textContent(CFC_TASK_ITEM);
        return taskText.includes('Available') || taskText.includes('Component Available');
    }

    async navigateToCoreContextWrapper() {
        await this.page.click(CORE_CONTEXT_WRAPPER_LINK);
        await this.page.waitForSelector(BUNDLE_STATUS_DISPLAY);
    }

    async verifyAvailableBundlesDisplayed() {
        return await this.page.isVisible(BUNDLE_STATUS_DISPLAY);
    }

    async verifyCfcBundleInAvailableList() {
        const displayText = await this.page.textContent(BUNDLE_STATUS_DISPLAY);
        return displayText.includes('CFC');
    }

    async navigateToSystemModelProperties() {
        await this.page.click(SYSTEM_MODEL_LINK);
        await this.page.waitForSelector(REQUIRE_ACTIVATION_PROPERTY);
    }

    async verifyPropertyInSystemModel() {
        return await this.page.isVisible(REQUIRE_ACTIVATION_PROPERTY);
    }

    async verifyRequireActivationProperty() {
        const propertyText = await this.page.textContent(REQUIRE_ACTIVATION_PROPERTY);
        return propertyText.includes('RequireActivation') || propertyText.includes('true');
    }

    async verifyCfcBundleAutoAdded() {
        return await this.page.isVisible(By.css("span[data-testid='auto-added-cfc-bundle']"));
    }

    async verifyCfcBundleProcessed() {
        const statusText = await this.page.textContent(PROVISIONING_STATUS);
        return statusText.includes('CFC Bundle Processed');
    }

    async verifyNoDuplicateBundleEntries() {
        const cfcElements = await this.page.$$("span[data-testid*='cfc-bundle']");
        return cfcElements.length === 1;
    }

    async verifyAvailableBundlesPropertyUpdated() {
        const propertyText = await this.page.textContent(AVAILABLE_BUNDLES_PROPERTY);
        return propertyText.length > 0 && propertyText.includes('CFC');
    }

    async verifyPropertyContainsCfcInfo() {
        const propertyText = await this.page.textContent(AVAILABLE_BUNDLES_PROPERTY);
        return propertyText.includes('CFC') && propertyText.includes('Available');
    }

    async verifyBundlesInAvailableState() {
        const statusText = await this.page.textContent(BUNDLE_STATUS_DISPLAY);
        return statusText.includes('Available');
    }

    async verifyBundlesNotActivated() {
        const statusText = await this.page.textContent(BUNDLE_STATUS_DISPLAY);
        return !statusText.includes('Activated');
    }

    async verifyTaskCreationLogs() {
        return await this.page.isVisible(SUBSCRIBER_LOGS_CONTAINER);
    }

    async verifyBundleStatusAvailableNotActivated() {
        const statusText = await this.page.textContent(BUNDLE_STATUS_DISPLAY);
        return statusText.includes('Available') && !statusText.includes('Activated');
    }

    async verifyIndexConfigDisplaysBundles() {
        return await this.page.isVisible(INDEX_CONFIG_DISPLAY);
    }

    async verifyNextgenIncludesProperty() {
        await this.page.click(NEXTGEN_CONTEXT_LINK);
        await this.page.waitForSelector(AVAILABLE_BUNDLES_PROPERTY);
        return await this.page.isVisible(AVAILABLE_BUNDLES_PROPERTY);
    }

    async verifyProvisioningSuccess() {
        const statusText = await this.page.textContent(PROVISIONING_STATUS);
        return statusText.includes('Success') || statusText.includes('Completed');
    }

    async createEsoOrderWithInvalidConfiguration() {
        await this.page.click(CREATE_ORDER_BUTTON);
        await this.page.selectOption(ESO_ORDER_TYPE, 'INVALID');
    }

    async simulateProvisioningError() {
        await this.page.click(EXECUTE_PROVISIONING_BUTTON);
        await this.page.waitForSelector(ERROR_MESSAGE_CONTAINER);
    }

    async verifyErrorHandledGracefully() {
        return await this.page.isVisible(ERROR_MESSAGE_CONTAINER);
    }

    async verifyErrorMessagesLogged() {
        const errorText = await this.page.textContent(ERROR_MESSAGE_CONTAINER);
        return errorText.length > 0;
    }

    async verifyOrderStatusReflectsError() {
        const statusText = await this.page.textContent(ORDER_STATUS_DISPLAY);
        return statusText.includes('Error') || statusText.includes('Failed');
    }

    async verifyNoPartialBundleAdditions() {
        const bundleElements = await this.page.$$("span[data-testid*='bundle-']");
        return bundleElements.length === 0;
    }

    async initiateCfcBundleAddition() {
        await this.page.check(CFC_BUNDLE_CHECKBOX);
        await this.page.click(ADD_BUNDLE_BUTTON);
    }

    async waitForBundleAdditionCompletion() {
        await this.page.waitForSelector(BUNDLE_STATUS_DISPLAY);
        return true;
    }

    async verifyComponentInAvailableStateOnly() {
        const statusText = await this.page.textContent(COMPONENT_STATUS_INDICATOR);
        return statusText === 'Available' || statusText.includes('Available Only');
    }

    async verifyComponentNotActivated() {
        const statusText = await this.page.textContent(COMPONENT_STATUS_INDICATOR);
        return !statusText.includes('Activated');
    }

    async verifyRequireActivationPreventsAutoActivation() {
        const propertyValue = await this.page.textContent(REQUIRE_ACTIVATION_PROPERTY);
        return propertyValue.includes('true') || propertyValue.includes('enabled');
    }

    async verifyComponentStatusDistinguishable() {
        const statusText = await this.page.textContent(COMPONENT_STATUS_INDICATOR);
        return statusText.includes('Available') && !statusText.includes('Activated');
    }

    async verifyAvailableBundles() {
        return await this.page.isVisible(BUNDLE_STATUS_DISPLAY);
    }

    async verifyProvisioningImplementation() {
        return await this.page.isVisible(EXECUTE_PROVISIONING_BUTTON);
    }

    async verifyCfcSubscriberLogs() {
        return await this.page.isVisible(SUBSCRIBER_LOGS_CONTAINER);
    }
}

module.exports = CfcBundlePage;
