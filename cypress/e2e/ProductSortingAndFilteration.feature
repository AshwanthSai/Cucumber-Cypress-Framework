@filter @product @search
Feature: Product Sorting & Filtering After Search
  As a customer
  I want to filter search results by various criteria
  So that I can find specific products matching my requirements

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page
    When I search for "apple"
    Then I should see search results for "apple"

  @price @smoke
  Scenario Outline: Filter search results by price range
    When I set minimum price to "<min_price>"
    And I set maximum price to "<max_price>"
    And I click the GO button
    Then I should see products with prices between <min_price> and <max_price>
    And all products should match my "apple" search term

    Examples:
      | min_price | max_price |
      | 0         | 50        |
      | 100       | 500       |
      | 500       | 1000      |

  @category @smoke
  Scenario Outline: Filter search results by category
    When I select the "<category>" category
    And I click the GO button
    # Product counts here reflect what's in our test database for each category
    Then I should see <expected_count> products from the "<category>" category
    And all products should match my "apple" search term

    Examples:
      | category    | expected_count |
      | Electronics | 1              |
      | Cameras     | 0              |
      | Laptops     | 1              |
      | Headphones  | 1              |
      | Books       | 1              |
      | Outdoor     | 0              |
      | Home        | 0              |

  @rating @smoke
  Scenario Outline: Filter search results by star rating
    When I select the <rating> star rating filter
    # These counts reflect the number of products with specific ratings in our test database
    Then I should see <expected_count> products with <rating> stars or higher
    And all products should match my "apple" search term

    Examples:
      | rating | expected_count |
      | 4      | 1              |
      | 3      | 1              |
      | 2      | 1              |
      | 1      | 1              |


  @combined @regression
  Scenario: Combine price and category filters on search results
    When I search for "camera"
    And I set minimum price to "50"
    And I set maximum price to "100"
    And I select the "Electronics" category
    And I click the GO button
    Then I should see 6 products from the "Electronics" category
    And I should see products with prices between 50 and 100
    And all products should match my "camera" search term
	
  @combined @regression
  Scenario: Combine price and rating filters on search results
    When I search for "camera"
    And I set minimum price to "50"
    And I set maximum price to "75"
    And I select the 4 star rating filter
    And I click the GO button
    Then I should see 1 products with 4 stars or higher
    And I should see products with prices between 50 and 75
    And all products should match my "camera" search term

  @newsearch @regression
  Scenario: Changing search term resets filters
    When I set minimum price to "100"
    And I set maximum price to "500"
    And I click the GO button
    When I search for "laptop" 
    Then I should see search results for "laptop"

  