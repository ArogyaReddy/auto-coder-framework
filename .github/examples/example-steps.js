const { assert } = require('chai');
const { When, Then } = require('@cucumber/cucumber');
const ClassicFooterPage = require('../../pages/example/classic-footer-page');
const HomePage = require('../../pages/common/home-page');

/**
 * Step definitions for Classic Footer functionality
 * Follows SBS_Automation patterns exactly
 */

// Background
Given('the test environment is set up', { timeout: 240 * 1000 }, async function() {
  await new ClassicFooterPage(this.page).navigateToApplication();
});

// Scenario 1: Classic footer is not displayed when property is ON and NextGen is loaded
Given('the classic footer display property is set to {string}', { timeout: 240 * 1000 }, async function(value) {
  await new ClassicFooterPage(this.page).setClassicFooterProperty(value);
});

Given('the user is running NextGen', { timeout: 240 * 1000 }, async function() {
  await new ClassicFooterPage(this.page).navigateToApplication('nextgen');
  let isNextGen = await new ClassicFooterPage(this.page).isInNextGenMode();
  assert.isTrue(isNextGen, 'User is not in NextGen mode');
});

When('the user views any page in the application', { timeout: 240 * 1000 }, async function() {
  await new ClassicFooterPage(this.page).navigateToHomePage();
});

Then('the classic footer should not be displayed', { timeout: 240 * 1000 }, async function() {
  let isDisplayed = await new ClassicFooterPage(this.page).isClassicFooterDisplayed();
  assert.isFalse(isDisplayed, 'Classic footer is displayed when it should not be');
});

Then('only the NextGen footer should be visible', { timeout: 240 * 1000 }, async function() {
  let isNextGenFooterDisplayed = await new ClassicFooterPage(this.page).isNextGenFooterDisplayed();
  assert.isTrue(isNextGenFooterDisplayed, 'NextGen footer is not visible');
});

// Scenario 2: Classic footer is displayed when property is OFF
Then('the classic footer should be displayed', { timeout: 240 * 1000 }, async function() {
  let isDisplayed = await new ClassicFooterPage(this.page).isClassicFooterDisplayed();
  assert.isTrue(isDisplayed, 'Classic footer is not displayed when it should be');
});
