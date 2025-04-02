const { When, Then } = require("cypress-cucumber-preprocessor/steps");

// Search steps
When('I enter {string} in the search field', (keyword) => {
  cy.log(`Entering search keyword: "${keyword || '[empty]'}"`);
  navBarActions.search(keyword);
});

When('I click the search button', () => {
  cy.log('Clicking search button');
  navBarActions.search();
});

// Pagination steps
When("I view the pagination component", () => {
  cy.log('Checking pagination component');
  paginationElementActions.paginationExists();
});

When("I click on the {string} button", (button) => {
  cy.log(`Clicking "${button}" button`);
  paginationElementActions.clickButton(button);
});

// Verification steps
Then('I should see products related to {string}', (keyword) => {
  cy.log(`Verifying search results for: "${keyword}"`);
  searchPageActions.verifySearchResults(keyword);
});

Then('I should not see any new products', () => {
  cy.log('Verifying no search action occurred');
  searchPageActions.verifyNoSearchAction();
});

Then("I should see the current page indicator showing {string}", (page) => {
  cy.log(`Verifying page indicator shows page ${page}`);
  paginationElementActions.verifyCurrentPage(page);
});

Then("I should see navigation options for multiple pages", () => {
  cy.log('Verifying multiple page navigation options');
  paginationElementActions.verifyMultiPageNavigation();
});

Then("I should be navigated to page {string}", (page) => {
  cy.log(`Verifying navigation to page ${page}`);
  paginationElementActions.verifyCurrentPage(page);
});

Then("the current page indicator should show {string}", (page) => {
  cy.log(`Verifying current page indicator shows ${page}`);
  paginationElementActions.verifyCurrentPage(page);
});