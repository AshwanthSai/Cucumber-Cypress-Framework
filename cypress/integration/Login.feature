Feature: SydneyKart Authentication

  As a customer
  I want to log into my account
  So that I can access my personal information

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page


  @login @smoke
  Scenario: Successful login
    When I click on the login button
    And I enter "test@admin.com" in the email field
    And I enter "test@admin.com" in the password field
    And I click the submit button
    Then the system should "Redirect to Home"
    

  @login @smoke
  Scenario Outline: Failed login attempts
    When I click on the login button
    And I enter "<email>" in the email field
    And I enter "<password>" in the password field
    And I click the submit button
    Then I should see message "<message>"
    And the system should "<redirect_action>"

    Examples:
      | email             | password         | message                             | redirect_action   |
      | test@example.com  | password123      | Invalid email or password           |  No Redirect      | 
      | test@admin.com    | password12345    | Invalid email or password           |  No Redirect      | 
      | test@admin.com    | test@admin.com   |                                     |  Redirect to Home | 
  

