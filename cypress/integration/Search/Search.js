const { Given, When, Then, And } = require("cypress-cucumber-preprocessor/steps");
const NavBarActions = require("../../../PageObjects/PageActions/NavBarActions");
const SearchPageActions = require("../../../PageObjects/PageActions/SearchPageActions");

let navBarAction = new NavBarActions();
let searchPageActions = new SearchPageActions();

const url = 'https://portfoliosai.link/sydneykart/';

// Simple global handler for uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Background steps
Given('I have opened my web browser', () => {
  cy.log('Web browser is open by default in Cypress');
});

Given('my internet connection is active', () => {
  cy.log('Internet connection is assumed to be active');
});

Given('I open Home Page', { timeout: 10000 }, () => {
  cy.visit(url, { 
    timeout: 10000,
    failOnStatusCode: false,
  });
});


When('I enter {string} in the search field', (keyword) => {
  navBarAction.search(keyword)
});

And('I click the search button', () => {
  navBarAction.search()
});

Then('I should see products related to {string}', (keyword) => {
   searchPageActions.verifySearchResults(keyword)
});

