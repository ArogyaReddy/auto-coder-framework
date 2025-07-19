/**
 * Base Page Object for Playwright tests
 * Contains common methods and properties used across page objects
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page
   */
  constructor(page) {
    this.page = page;
  }
  
  /**
   * Navigate to a URL
   * @param {string} url - URL to navigate to
   */
  async navigate(url) {
    await this.page.goto(url);
  }
  
  /**
   * Click on an element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    await this.page.click(selector);
  }
  
  /**
   * Fill an input field
   * @param {string} selector - Input selector
   * @param {string} value - Value to fill
   */
  async fill(selector, value) {
    await this.page.fill(selector, value);
  }
  
  /**
   * Get text from an element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} - Element text
   */
  async getText(selector) {
    return await this.page.innerText(selector);
  }
  
  /**
   * Check if an element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} - Whether the element is visible
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }
  
  /**
   * Wait for an element to be visible
   * @param {string} selector - Element selector
   * @param {Object} options - Waiting options
   */
  async waitForVisible(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'visible', ...options });
  }
  
  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = BasePage;
