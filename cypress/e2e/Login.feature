Feature: SydneyKart Authentication

  As a customer
  I want to log into my account
  So that I can access my personal information

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page

  @login @smoke
  
  Scenario Outline: Login with different credentials
    When I click on the login button
    And I enter "<email>" in the email field
    And I enter "<password>" in the password field
    And I click the submit button
    Then I should see message "<message>"
    And the system should "<redirect_action>"
    And the user status should be "<login_status>"

    Examples:
      | email           | password        | message                            | redirect_action   | login_status |
      | test@admin.com  | test@admin.com  |                                    | Redirect to Home  | logged in    |
      | test@example.com| password123     | Invalid email or password          | No Redirect       | not logged in|
      | test@admin.com  | password12345   | Invalid email or password          | No Redirect       | not logged in|
      |                 | password123     | Please enter email & password      | No Redirect       | not logged in|
      | test@example.com|                 | Please enter email & password      | No Redirect       | not logged in|