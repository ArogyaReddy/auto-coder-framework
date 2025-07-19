@max-login @smoke
Feature: MAX Application Login with Digital Plus Test Credentials
  As a RunOnboarding client
  I want to login to MAX application with digital plus test credentials
  So that I can access the application features

  @login @critical
  Scenario: Successful login to MAX with digital plus test credentials
    Given RunOnboarding client is logged into MAX with digitalplus test credentials
    Then I should be successfully logged into MAX application
