Feature: SydneyKart Main Page

  As a customer
  I want to browse the ecommerce website
  So that I can find products quickly

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page

  @single
  Scenario: Opening the Ecommerce Home Page
    Then I see "SydneyKart" in the title
    And the search field is visible
