const By = require('../../support/By');
const helpers = require('../../support/helpers');
let BasePage = require('../common/base-page');

// Define locators at the top level
const CLASSIC_FOOTER = By.xpath('//footer[@class="classic-footer"]');
const NEXTGEN_FOOTER = By.xpath('//footer[@class="nextgen-footer"]');
const NEXTGEN_INDICATOR = By.xpath('//div[@data-testid="nextgen-indicator"]');
const CLASSIC_MODE_INDICATOR = By.xpath('//div[@data-testid="classic-mode-indicator"]');
const SYSTEM_PROPERTY_TABLE = By.css('table.system-properties');
const CLASSIC_FOOTER_PROPERTY_ROW = By.xpath('//tr[@data-property="classic-footer-display"]');
const PROPERTY_VALUE_FIELD = By.css('input[name="property-value"]');
const SAVE_PROPERTIES_BUTTON = By.css('button[type="submit"]');

class ClassicFooterPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.baseUrl = 'https://example.adp.com';
  }

  async navigateToApplication(mode = 'nextgen') {
    const url = mode === 'nextgen' ? `${this.baseUrl}/nextgen/home` : `${this.baseUrl}/classic/home`;
    await this.navigate(url);
    
    if (mode === 'nextgen') {
      await this.waitForElement(NEXTGEN_INDICATOR);
    } else {
      await this.waitForElement(CLASSIC_MODE_INDICATOR);
    }
  }

  async navigateToHomePage() {
    await this.navigate(`${this.baseUrl}/home`);
  }

  async setClassicFooterProperty(value) {
    await this.navigate(`${this.baseUrl}/admin/system-properties`);
    await this.waitForElement(SYSTEM_PROPERTY_TABLE);
    
    await this.waitForElement(CLASSIC_FOOTER_PROPERTY_ROW);
    await this.click(PROPERTY_VALUE_FIELD);
    await this.fill(PROPERTY_VALUE_FIELD, value);
    
    await this.click(SAVE_PROPERTIES_BUTTON);
  }

  async isClassicFooterDisplayed() {
    return await this.isVisible(CLASSIC_FOOTER);
  }

  async isNextGenFooterDisplayed() {
    return await this.isVisible(NEXTGEN_FOOTER);
  }

  async isInNextGenMode() {
    return await this.isVisible(NEXTGEN_INDICATOR);
  }

  async getClassicFooterPropertyDefaultValue() {
    await this.navigate(`${this.baseUrl}/admin/system-properties`);
    await this.waitForElement(SYSTEM_PROPERTY_TABLE);
    await this.waitForElement(CLASSIC_FOOTER_PROPERTY_ROW);
    return await this.getValue(PROPERTY_VALUE_FIELD);
  }
}

module.exports = ClassicFooterPage;
