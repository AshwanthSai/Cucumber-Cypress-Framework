Feature: SydneyKart Ecommerce Search Functionality

  As a customer
  I want to browse the ecommerce website
  So that I can find and purchase products quickly

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I am on the SydneyKart homepage

  @regression
  Scenario: Basic search functionality
    When I type "apple" into the search field
    And I click the search button
    Then I should see search results for "apple"
    But I should not see "orange"