Feature: User Profile Management
  As a registered user
  I want to manage my profile information and image
  So that I can personalize my account

  Background: 
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page
    Given I am logged in as a registered user
    And I navigate to my account profile page


  #Profile Name Update Scenarios
  Scenario: User successfully updates their profile name
    When I click on the Update Profile button
    And I enter a new name "John Doe" in the name field
    And I click on the Update button
    Then I should be navigated to Profile Page
    And I should see my name updated to "John Doe"