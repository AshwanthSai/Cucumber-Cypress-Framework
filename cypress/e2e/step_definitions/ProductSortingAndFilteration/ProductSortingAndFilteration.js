const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { getPageObject } = require("../common/hooks");

When('I search for {string}', function(keyword) {
  cy.log(`Entering search keyword: "${keyword || '[empty]'}"`);
  getPageObject('navBarActions').search(keyword);
  cy.log('Clicking search button');
  getPageObject('navBarActions').clickSearch();
});

Then('I should see search results for {string}', function(keyword) {
  cy.log(`Verifying Search Keyword : ${keyword}`);
  getPageObject('filteredProductsPageActions').verifySearchResults(keyword, count = 1);
});

 
When('I set minimum price to {string}', function(min_price) {
  cy.log(`Setting minimum price to ${min_price}`);
  getPageObject('filteredProductsPageActions').setMinimumPrice(parseInt(min_price));
});

When('I set maximum price to {string}', function(max_price) {
  cy.log(`Setting minimum price to ${max_price}`);
  getPageObject('filteredProductsPageActions').setMaximumPrice(parseInt(max_price));
});

When('I click the GO button', function() {
  cy.log(`Setting Price Filters`);
  getPageObject('filteredProductsPageActions').clickGoButton();
});

Then('I should see products with prices between {int} and {int}', function(minPrice, maxPrice) {
  cy.log(`Verifying products have prices between ${minPrice} and ${maxPrice}`);
  getPageObject('filteredProductsPageActions').verifyPriceRange(minPrice, maxPrice);
});

Then('all products should match my {string} search term', function(searchTerm) {
  cy.log(`checking if all products have search term : ${searchTerm}`);
  getPageObject('filteredProductsPageActions').verifyProductsMatchSearchTerm(searchTerm)
});

When('I select the {string} category', function(category) {
  cy.log(`Selecting Category ${category}`);
  getPageObject('filteredProductsPageActions').selectCategory(category)
});

Then('I should see {int} products from the {string} category', function(expectedProducts, category) {
  cy.log(`Verifying number of Products on Screen`);
  getPageObject('filteredProductsPageActions').verifyNumberOfProductsOnPage(expectedProducts)
});

 When('I select the {int} star rating filter', function(rating) {
  cy.log(`Selecting the ${rating} rating filter`);
  getPageObject('filteredProductsPageActions').selectRating(rating)
});

 Then('I should see {int} products with {int} stars or higher', function(expectedCount, rating) {
  cy.log(`Verifying number of products that meet the ${rating}`);
  getPageObject('filteredProductsPageActions').verifyRatingRange(expectedCount, rating)
 })


 

