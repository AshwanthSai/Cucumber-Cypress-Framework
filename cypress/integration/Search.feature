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

  @search @smoke
  Scenario: Empty search validation
    When I enter "" in the search field
    And I click the search button


  # The assumption here is that, we have a seperate Test DB and Production DB
  @search @pagination
  Scenario: Pagination navigation for search results
    Given I enter "laptop" in the search field
    And I click the search button

    When I view the pagination component
    Then I should see the current page indicator showing "1"
    And I should see navigation options for multiple pages

    When I click on the "Next" button
    Then I should be navigated to page "2"
    And the current page indicator should show "2"

    When I click on the "Previous" button
    Then I should be navigated to page "1"
    And the current page indicator should show "1"
    
    When I click on the "3" button
    Then I should be navigated to page "3"
    And the current page indicator should show "3"