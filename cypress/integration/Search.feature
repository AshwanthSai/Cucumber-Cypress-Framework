Feature: SydneyKart Product Search
  As a customer
  I want to search for products
  So that I can find items I wish to purchase

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page

  @search @regression
  Scenario Outline: Search for products with different keywords
    When I enter "<keyword>" in the search field
    And I click the search button
    Then I should see products related to "<keyword>"

    Examples:
      | keyword    |
      | laptop     |
      | headphones |
      | camera     |