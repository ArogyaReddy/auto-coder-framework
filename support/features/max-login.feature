@max-login @smoke
Feature: MAX Application Login with Digital Plus Test Credentials
  As a RunOnboarding client
  I want to login to MAX application with digital plus test credentials
  So that I can access the application features

  @login @critical
  Scenario: Successful login to MAX with digital plus test credentials
    Given RunOnboarding client is logged into MAX with digitalplus test credentials
    Then I should be successfully logged into MAX application

  @login-form
  Scenario: Verify MAX login form is displayed
    Then I should see the MAX login form

  @manual-login
  Scenario Outline: Login with different credentials
    When I enter MAX login credentials with username "<username>" and password "<password>"
    Then I should be successfully logged into MAX application

    Examples:
      | username          | password          |
      | digitalplus_user  | digitalplus_pass  |
      | Arogya@24890183   | Test0705 |

  # @page-verification
  # Scenario: Verify application loads correctly
  #   Given RunOnboarding client is logged into MAX with digitalplus test credentials
  #   Then the page title should contain "MAX"
