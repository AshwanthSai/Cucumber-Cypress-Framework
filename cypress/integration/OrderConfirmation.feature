Feature: SydneyKart Order Confirmation
  As a customer
  I want to receive confirmation of my order
  So that I can be assured my purchase was successful and track my delivery

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page

  @order @smoke
  Scenario: View order confirmation after successful purchase
    Given I am logged in as a registered user
    And I have added "Wireless Headphones" to my cart
    And I have completed the checkout process
    Then I should be redirected to the shipping details page
    When I enter my shipping details    