Feature: Board functionality

Scenario: Create a board
  Given I am on the home page
  When I create a new board called "My Test Board"
  Then I should see the board "My Test Board" in my boards list
  And I should be able to open the board "My Test Board"
  
Scenario: Add items to board
  Given I have a board called "My Test Board"
  When I add a new item "Task 1" to the board
  Then I should see "Task 1" in the board items
  And I should be able to mark "Task 1" as complete