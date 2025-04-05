const {When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { getPageObject } = require("../common/hooks");

// Search steps
When('I enter {string} in the search field', function(keyword) {
  cy.log(`Entering search keyword: "${keyword || '[empty]'}"`);
    getPageObject('navBarActions').search(keyword);
  }
);

When('I click the search button', function() {
  cy.log('Clicking search button');
  getPageObject('navBarActions').clickSearch();
});

// Pagination steps
When("I view the pagination component", function() {
  cy.log('Checking pagination component');
  getPageObject('paginationElementActions').paginationExists();
});

When("I click on the {string} button", function(button) {
  cy.log(`Clicking "${button}" button`);
  getPageObject('paginationElementActions').clickButton(button);
});

// Verification steps
Then('I should see products related to {string}', function(keyword) {
  cy.log(`Verifying search results for: "${keyword}"`);
  getPageObject('searchPageActions').verifySearchResults(keyword);
});

Then('I should not see any new products', function() {
  cy.log('Verifying no search action occurred');
  getPageObject('searchPageActions').verifyNoSearchAction();
});

Then("I should see the current page indicator showing {string}", function(page) {
  cy.log(`Verifying page indicator shows page ${page}`);
  getPageObject('paginationElementActions').verifyCurrentPage(page);
});

Then("I should see navigation options for multiple pages", function() {
  cy.log('Verifying multiple page navigation options');
  getPageObject('paginationElementActions').verifyMultiPageNavigation();
});

Then("I should be navigated to page {string}", function(page) {
  cy.log(`Verifying navigation to page ${page}`);
  getPageObject('paginationElementActions').verifyCurrentPage(page);
});

Then("the current page indicator should show {string}", function(page) {
  cy.log(`Verifying current page indicator shows ${page}`);
  getPageObject('paginationElementActions').verifyCurrentPage(page);
});