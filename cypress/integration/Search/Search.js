const { Given, When, Then, And, But } = require("cypress-cucumber-preprocessor/steps");
const NavBarActions = require("../../../PageObjects/PageActions/NavBarActions");

const url = 'https://portfoliosai.link/sydneykart/';

let navBarAction = new NavBarActions();

// Simple global handler for uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing the test when
  // uncaught exceptions occur in the application code
  return false;
});

// Background steps
Given('I have opened my web browser', () => {
  cy.log('Web browser is open by default in Cypress');
});

Given('my internet connection is active', () => {
  cy.log('Internet connection is assumed to be active');
});

Given('I open Home Page', { timeout: 10000 }, async () => {
  await cy.visit(url, { 
    timeout: 10000,
    failOnStatusCode: false, // Necessary for SPA, React Application
  })
});


/* 
  Scenario: Basic search functionality
*/
When('I type {string} into the search field', (searchTerm) => {
  
});

And('I click the search button', () => {
  // Stub implementation
});

Then('I should see search results for {string}', (searchTerm) => {
  // Stub implementation
});

But('I should not see {string}', (content) => {
  // Stub implementation
});