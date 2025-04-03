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


  #Profile Image Upload Scenarios
  Scenario: User successfully uploads a valid profile image
    When I select the Upload Avatar option
    And I upload a valid image file profile.jpg
    And I click on the upload button
    Then I should be navigated to Profile Page
    And my profile picture should be updated with the new image


  #Profile Name Update Scenarios
  Scenario: User successfully updates their profile name
    When I click on the Update Profile button
    And I enter a new name "John Doe" in the name field
    And I click on the Update button
    Then I should be navigated to Profile Page
    And I should see my name updated to "John Doe"