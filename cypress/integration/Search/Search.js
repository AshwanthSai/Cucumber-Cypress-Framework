const { Given, When, Then, And, Before } = require("cypress-cucumber-preprocessor/steps");

// Search steps
When('I enter {string} in the search field', (keyword) => {
  navBarAction.search(keyword)
});

When('I click the search button', () => {
  navBarAction.search()
});

// Pagination steps
When("I view the pagination component", () => {
  paginationElementActions.paginationExists()
});

When("I click on the {string} button", (button) => {
  paginationElementActions.clickButton(button)
});

// Verification steps
Then('I should see products related to {string}', (keyword) => {
   searchPageActions.verifySearchResults(keyword)
});

Then('I should not see any new products', () => {
  searchPageActions.verifyNoSearchAction()
});

Then("I should see the current page indicator showing {string}", (page) => {
  paginationElementActions.verifyCurrentPage(page)
});

Then("I should see navigation options for multiple pages", () => {
  paginationElementActions.verifyMultiPageNavigation()
});

Then("I should be navigated to page {string}", (page) => {
  paginationElementActions.verifyCurrentPage(page)
});

Then("the current page indicator should show {string}", (page) => {
  paginationElementActions.verifyCurrentPage(page)
});